// Static audit of the built site (dist/): looks for the kinds of mistakes that are easy to miss by eye.
//   - empty links and buttons, images without alt, pages without exactly one <h1>, wrong <html lang>
//   - missing hreflang alternates, empty <title>
//   - untranslated text: English sentences on Chinese pages (the translation helper silently falls back to English)
//   - Chinese text on English pages
// Usage: node tools/audit.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})(dist);

// Words that may legitimately appear in English on a Chinese page (brand names, product names, codes, units).
const allow = new Set(['Aldridge', 'Wren', 'LLP', 'Marlowe', 'Finch', 'CPA', 'FCPA', 'Elena', 'Voss', 'Riverside', 'Kumoya', 'Atelier', 'Iris', 'Calloway', 'Arden', 'Studio', 'Sample', 'Mobile', 'Notary', 'Harbourview', 'Granite', 'Row', 'Lantern', 'Street', 'Mill', 'Paper', 'Lane', 'Mei', 'Ling', 'Tan', 'Helena', 'Robert', 'Jonathan', 'Margaret', 'Daniel', 'Cho', 'Priya', 'Nair', 'Eastbrook', 'Kingsmere', 'Westfield', 'University', 'College', 'Orchard', 'Year', 'Small', 'Weather', 'Salt', 'Road', 'Letters', 'Lighthouse', 'The', 'To', 'A', 'Rivermere', 'Corner', 'Books', 'Literary', 'Festival', 'Library', 'Café', 'Lantern', 'Hall', 'Community', 'Route', 'Ward', 'City', 'Council', 'Jordan', 'Marcus', 'Amara', 'Rosa', 'Haruka', 'Review', 'Northern', 'Coastline', 'Daily', 'Page', 'Harbourview', 'Town', 'Main', 'Parks', 'Essentials', 'Growth', 'Full', 'service', 'USD', 'LED', 'PM', 'AM', 'Fiction', 'Award', 'Essay', 'Prize', 'First', 'Novel', 'Reading', 'Society', 'Spring', 'Pick', 'Longlisted', 'Finalist', 'Winner', 'Bookshop', 'EN', 'Wi', 'Fi', 'T', 'M', 'Q', 'LL', 'IBM', 'Plex', 'Mono', 'Manrope', 'Instrument', 'Serif', 'Sans', 'Newsreader', 'Figtree', 'Jost', 'Shippori', 'Mincho', 'Barlow', 'Condensed', 'Source', 'Cormorant', 'Garamond', 'Inter', 'Pro', 'Ward']);

const problems = [];
const add = (file, msg) => problems.push(`${relative(dist, file).replace(/\\/g, '/')}: ${msg}`);
const stripTags = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&amp;|&#\d+;|&[a-z]+;/g, ' ');

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  if (file.endsWith('404.html')) continue;
  const lang = (html.match(/<html[^>]*\blang="?([\w-]+)/i) ?? [])[1];
  const rel = relative(dist, file).replace(/\\/g, '/');
  const isZh = /(^|\/)zh\//.test(rel);
  if (isZh && lang !== 'zh-Hant') add(file, `html lang is ${lang}, expected zh-Hant`);
  if (!isZh && lang !== 'en') add(file, `html lang is ${lang}, expected en`);
  const title = (html.match(/<title>([^<]*)<\/title>/i) ?? [])[1];
  if (!title || !title.trim()) add(file, 'empty <title>');
  const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1 !== 1) add(file, `${h1} <h1> elements`);
  if (!/hreflang="zh-Hant"/.test(html) || !/hreflang="en"/.test(html)) add(file, 'missing hreflang alternates');

  // images without alt
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) if (!/\balt\b/.test(m[0])) add(file, 'img without alt'); // a bare `alt` is the minified form of alt=""

  // links / buttons with no accessible text
  for (const m of html.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const attrs = m[2];
    if (attrs.includes('${')) continue; // template literal inside an inline script
    const inner = stripTags(m[3]).trim();
    const hasName = /aria-label=|title=/.test(attrs);
    const hasMask = /class="[^"]*\bico\b/.test(m[3]);
    if (!inner && !hasName && !hasMask && !/<img\b[^>]*alt="[^"]+"/.test(m[3]) && !/<picture/.test(m[3]) && !/class="[^"]*(burger|cover)/.test(m[3])) {
      if (/hidden/.test(attrs)) continue; // hidden until JavaScript shows it
      add(file, `empty <${m[1]}> ${attrs.slice(0, 60).trim()}`);
    }
  }

  // untranslated text
  const text = stripTags(html);
  if (isZh) {
    const runs = [...text.matchAll(/(?:[A-Za-z’'][A-Za-z’'\-.,:;&!?()$%]*\s+){4,}[A-Za-z’']+/g)].map((r) => r[0].trim());
    for (const r of runs) {
      const words = r.split(/\s+/).filter((w) => /^[A-Za-z]{3,}/.test(w) && !allow.has(w.replace(/[^A-Za-z]/g, '')));
      if (words.length >= 4) add(file, `English on a Chinese page: "${r.slice(0, 80)}"`);
    }
  } else {
    const han = (text.match(/[一-鿿]{3,}/g) ?? []).filter((h) => !['繁體中文'].includes(h)); // the language menu names the language in Chinese
    for (const h of han.slice(0, 3)) add(file, `Chinese on an English page: "${h}"`);
  }
}
console.log(`${files.length} pages audited, ${problems.length} problem(s)`);
for (const p of problems.slice(0, 80)) console.log(' - ' + p);
process.exit(problems.length ? 1 : 0);
