// A tiny demo cart for the Kumoya Atelier shop: items live in localStorage, nothing is sent anywhere.
type Line = { slug: string; qty: number };
const KEY = 'kumoya-cart';

const read = (): Line[] => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
};
const write = (lines: Line[]) => {
  try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* ignore */ }
  document.dispatchEvent(new CustomEvent('cart:change'));
};

const paintCount = () => {
  const n = read().reduce((s, l) => s + l.qty, 0);
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => { el.textContent = String(n); el.hidden = n === 0; });
};
document.addEventListener('cart:change', paintCount);
paintCount();

// "Add to cart" buttons
document.querySelectorAll<HTMLButtonElement>('[data-add]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const slug = btn.dataset.add!;
    const lines = read();
    const line = lines.find((l) => l.slug === slug);
    if (line) line.qty += 1; else lines.push({ slug, qty: 1 });
    write(lines);
    const label = btn.querySelector<HTMLElement>('[data-label]') ?? btn;
    const original = label.textContent;
    label.textContent = btn.dataset.added ?? '✓';
    btn.classList.add('is-added');
    setTimeout(() => { label.textContent = original; btn.classList.remove('is-added'); }, 1600);
  });
});

// Cart page
const root = document.querySelector<HTMLElement>('[data-cart-root]');
if (root) {
  const products: Record<string, { name: string; price: number; image: string; href: string }> = JSON.parse(root.dataset.products ?? '{}');
  const list = root.querySelector<HTMLElement>('[data-cart-lines]')!;
  const empty = root.querySelector<HTMLElement>('[data-cart-empty]')!;
  const full = root.querySelector<HTMLElement>('[data-cart-full]')!;
  const total = root.querySelector<HTMLElement>('[data-cart-total]')!;
  const removeLabel = root.dataset.remove ?? 'Remove';

  const paint = () => {
    const lines = read().filter((l) => products[l.slug]);
    empty.hidden = lines.length > 0;
    full.hidden = lines.length === 0;
    list.innerHTML = '';
    let sum = 0;
    for (const l of lines) {
      const p = products[l.slug];
      sum += p.price * l.qty;
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `<a class="thumb" href="${p.href}"><img src="${p.image}" alt="" width="96" height="96" /></a>
        <div class="info"><a href="${p.href}">${p.name}</a><span>$${p.price}</span></div>
        <div class="qty"><button type="button" aria-label="−" data-d="-1">−</button><b>${l.qty}</b><button type="button" aria-label="+" data-d="1">+</button></div>
        <div class="line-total">$${p.price * l.qty}</div>
        <button type="button" class="remove" data-remove>${removeLabel}</button>`;
      row.querySelectorAll<HTMLButtonElement>('[data-d]').forEach((b) => b.addEventListener('click', () => {
        const next = read().map((x) => (x.slug === l.slug ? { ...x, qty: Math.max(1, x.qty + Number(b.dataset.d)) } : x));
        write(next); paint();
      }));
      row.querySelector('[data-remove]')!.addEventListener('click', () => { write(read().filter((x) => x.slug !== l.slug)); paint(); });
      list.append(row);
    }
    total.textContent = `$${sum}`;
  };
  paint();
}
