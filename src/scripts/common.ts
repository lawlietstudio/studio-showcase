// Behaviour shared by every site: remembered language, solid header after scrolling, dropdown/drawer
// housekeeping, reveal on scroll. All of it is optional; the pages work without JavaScript.
const root = document.documentElement;
const calm = root.classList.contains('calm');

// ---- remembered language (shared by all the demos, so choosing 中文 once switches them all) ----
try {
  const saved = localStorage.getItem('studio-lang');
  const here = root.lang.startsWith('zh') ? 'zh' : 'en';
  if (saved && saved !== here && !sessionStorage.getItem('studio-lang-seen')) {
    const link = document.querySelector<HTMLAnchorElement>(`[data-lang-switch] a[data-lang-link="${saved}"]`);
    if (link) {
      sessionStorage.setItem('studio-lang-seen', '1');
      location.replace(link.href);
    }
  }
  sessionStorage.setItem('studio-lang-seen', '1');
} catch { /* storage unavailable */ }
document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) => {
  a.addEventListener('click', () => {
    try { localStorage.setItem('studio-lang', a.dataset.langLink ?? 'en'); } catch { /* ignore */ }
  });
});

// ---- header turns solid after the first scroll ----
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-solid', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- dropdown and drawer housekeeping ----
const toggle = document.getElementById('menu-toggle') as HTMLInputElement | null;
const closeLang = (except?: EventTarget | null) =>
  document.querySelectorAll<HTMLDetailsElement>('details[data-lang-switch][open]').forEach((d) => { if (!except || !d.contains(except as Node)) d.removeAttribute('open'); });
document.addEventListener('click', (e) => closeLang(e.target));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeLang(); if (toggle) toggle.checked = false; }
});
document.querySelectorAll('.drawer a').forEach((a) => a.addEventListener('click', () => { if (toggle) toggle.checked = false; }));

// ---- reveal on scroll ----
const items = document.querySelectorAll('.reveal');
if (!calm && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('is-in'));
}

// ---- Chinese pages: break lines between words, never inside one ("決策", "法律", "回望") ----
if (root.lang.startsWith('zh') && 'Segmenter' in Intl) {
  const seg = new Intl.Segmenter('zh-Hant', { granularity: 'word' });
  const nodes: Text[] = [];
  document.querySelectorAll('h1, h2, h3, .lead, .lead-p, .sec-head > p, .page-head p').forEach((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) if (/[一-鿿]/.test(n.textContent ?? '')) nodes.push(n as Text);
  });
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    let cur = '';
    const flush = () => {
      if (!cur) return;
      const s = document.createElement('span');
      s.className = 'nb';
      s.textContent = cur;
      frag.append(s);
      cur = '';
    };
    for (const part of seg.segment(node.textContent ?? '')) {
      if (/^\s+$/.test(part.segment)) { flush(); frag.append(part.segment); continue; }
      if (part.isWordLike) { flush(); cur = part.segment; } else cur += part.segment; // punctuation stays with the word before it
    }
    flush();
    node.replaceWith(frag);
  }
}
