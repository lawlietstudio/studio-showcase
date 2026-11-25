// Crawls a deployed (or locally served) site and reports every broken internal link or asset.
// Usage: node tools/check-links.mjs <start-url>
//   e.g. node tools/check-links.mjs http://localhost:4400/studio-showcase/
//        node tools/check-links.mjs https://lawlietstudio.github.io/studio-showcase/
// Exits with code 1 if anything is broken or if a link escapes the start path (a classic sub-path bug).
const start = new URL(process.argv[2] ?? '');
if (!process.argv[2]) {
  console.error('Usage: node tools/check-links.mjs <start-url>');
  process.exit(2);
}
const scope = start.pathname.endsWith('/') ? start.pathname : `${start.pathname}/`;

const seenPages = new Set();
const checked = new Map(); // url -> status
const problems = [];
const queue = [start.href];

// Attribute values may be double-quoted, single-quoted or unquoted (minified HTML drops the quotes).
const attrRe = /\b(?:href|src|poster|data-src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'<>=`]+))/gi;
const srcsetRe = /\bsrcset\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'<>=`]+))/gi;

function refsOf(html) {
  const refs = new Set();
  for (const m of html.matchAll(attrRe)) refs.add((m[1] ?? m[2] ?? m[3] ?? '').trim());
  for (const m of html.matchAll(srcsetRe)) {
    for (const part of (m[1] ?? m[2] ?? m[3] ?? '').split(',')) refs.add(part.trim().split(/\s+/)[0]);
  }
  // ignore template-literal text inside inline scripts (e.g. the demo cart's row markup)
  return [...refs].filter((r) => r && !r.includes('${'));
}

async function status(url) {
  if (checked.has(url)) return checked.get(url);
  let code;
  try {
    let r = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (r.status === 405 || r.status === 501) r = await fetch(url, { redirect: 'follow' });
    code = r.status;
  } catch (e) {
    code = `ERR ${e.cause?.code ?? e.message}`;
  }
  checked.set(url, code);
  return code;
}

while (queue.length) {
  const pageUrl = queue.shift();
  if (seenPages.has(pageUrl)) continue;
  seenPages.add(pageUrl);

  const res = await fetch(pageUrl, { redirect: 'follow' });
  if (res.status !== 200) {
    problems.push(`${res.status}  page ${pageUrl}`);
    continue;
  }
  if (!(res.headers.get('content-type') ?? '').includes('text/html')) continue;
  const html = await res.text();

  // A page that only redirects (meta refresh) can loop forever or hide a missing page.
  if (/http-equiv\s*=\s*["']?refresh/i.test(html) || /content\s*=\s*["']?\d+;\s*url=/i.test(html)) {
    problems.push(`REDIRECT PAGE  ${pageUrl}  (meta refresh instead of real content)`);
    continue;
  }

  for (const ref of refsOf(html)) {
    if (/^(mailto:|tel:|javascript:|data:|#)/i.test(ref)) continue;
    let target;
    try {
      target = new URL(ref, res.url);
    } catch {
      problems.push(`bad URL "${ref}" on ${pageUrl}`);
      continue;
    }
    if (target.origin !== start.origin) continue; // external links are not checked here
    target.hash = '';
    if (!target.pathname.startsWith(scope)) {
      problems.push(`ESCAPES BASE  ${target.pathname}  (linked from ${pageUrl})`);
      continue;
    }
    const code = await status(target.href);
    if (code !== 200) problems.push(`${code}  ${target.pathname}  (linked from ${pageUrl})`);
    else if (/\.html?$|\/$/.test(target.pathname) || !/\.[a-z0-9]{2,5}$/i.test(target.pathname)) queue.push(target.href);
  }
}

console.log(`Checked ${seenPages.size} pages and ${checked.size} links/assets under ${start.origin}${scope}`);
if (process.env.VERBOSE) for (const p of seenPages) console.log('  page', p);
if (problems.length) {
  const unique = [...new Set(problems)];
  console.log(`\n${unique.length} problem(s):`);
  for (const p of unique) console.log('  ' + p);
  process.exit(1);
}
console.log('All internal links and assets resolve.');
