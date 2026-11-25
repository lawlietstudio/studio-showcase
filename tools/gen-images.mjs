// Generates the artwork for every site with Codex CLI's image generation tool.
//
// Reads tools/manifests/<site>.json (photos, a logo mark and one icon sheet per site), groups the jobs
// into batches of three per Codex session, runs up to N sessions at a time and moves the PNG files to
// art-raw/<site>/. Files that already exist are skipped, so the script can simply be run again to fill
// gaps. Raw PNGs stay out of git; `npm run images` / `npm run icons` turn them into the site's assets.
//
// Usage: node tools/gen-images.mjs [--concurrency 4] [site ...]
import { spawn } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, openSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
let concurrency = 4;
const wanted = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--concurrency') concurrency = Number(args[++i]) || 4;
  else wanted.push(args[i]);
}

const shapes = {
  landscape: 'LANDSCAPE 3:2',
  portrait: 'PORTRAIT, taller than wide (about 2:3)',
  square: 'SQUARE 1:1',
};

const files = readdirSync(join(root, 'tools', 'manifests')).filter((f) => f.endsWith('.json'));
const jobs = [];
for (const f of files) {
  const m = JSON.parse(readFileSync(join(root, 'tools', 'manifests', f), 'utf8'));
  if (wanted.length && !wanted.includes(m.site)) continue;
  const out = join(root, 'art-raw', m.site);
  mkdirSync(out, { recursive: true });
  const add = (file, text) => {
    if (!existsSync(join(out, `${file}.png`))) jobs.push({ site: m.site, art: m.art, file, text });
  };
  if (m.logo) {
    add('logo', `SQUARE 1:1. A minimalist logo mark: ${m.logo.concept}. Pure white (#ffffff) lines and shapes on a perfectly flat pure black (#000000) background, centred with generous empty margin (at least 20% on every side). Crisp vector look, even line weights. No text, no letters, no gradients, no shadows, no glow, no 3D, no outer frame.`);
  }
  if (m.icons) {
    const list = m.icons.items.map((t, i) => `${i + 1}. ${t}`).join('\n      ');
    add('icons', `LANDSCAPE 3:2. A bespoke icon set: six icons in a clean grid of 3 columns and 2 rows, each centred in its own cell, about 55% of the cell width, with at least 20% empty black space around it so that no icon touches another or the image edge. Style: ${m.icons.style}. Each icon is drawn in light cream-white (#f5f0e6) on a perfectly flat pure black (#000000) background everywhere; no gradients, no shadows, no glow, no 3D, no frames or circles around the icons, no text. All six share the same stroke weight, style and visual size. The six icons in reading order (top row left to right, then bottom row):\n      ${list}`);
  }
  for (const j of m.jobs ?? []) add(j.file, `${shapes[j.shape] ?? shapes.landscape}. ${j.prompt}`);
}

// batches of three jobs from the same site
const batches = [];
for (const site of [...new Set(jobs.map((j) => j.site))]) {
  const mine = jobs.filter((j) => j.site === site);
  for (let i = 0; i < mine.length; i += 3) batches.push(mine.slice(i, i + 3));
}
console.log(`${jobs.length} images in ${batches.length} Codex sessions (concurrency ${concurrency})`);

function runBatch(batch, n) {
  return new Promise((resolve) => {
    const site = batch[0].site;
    const dir = join(root, 'art-raw', site, `_batch${n}`);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });
    const items = batch
      .map((j, i) => `${i + 1}. Filename: ${j.file}.png\n   ${j.text}`)
      .join('\n\n');
    const prompt = `Use your built-in image generation tool to create the images below, ONE AT A TIME, each as its own separate generation. After each one, make sure the final file exists in the current directory with the exact filename given (copy or move it here if the tool saved it elsewhere). Do not create any other files here and do not touch anything outside this directory.

ART DIRECTION (identical for every image in this series): ${batch[0].art}

Images to create:

${items}

When all are done, reply with one line per file: filename, pixel dimensions, format.
`;
    writeFileSync(join(dir, 'prompt.txt'), prompt);
    const logFd = openSync(join(dir, 'run.log'), 'w');
    const inFd = openSync(join(dir, 'prompt.txt'), 'r');
    const child = spawn('codex', ['exec', '--skip-git-repo-check', '-s', 'workspace-write', '-C', `"${dir}"`, '-'], {
      shell: true,
      stdio: [inFd, logFd, logFd],
    });
    child.on('exit', (code) => {
      let ok = 0;
      for (const j of batch) {
        const src = join(dir, `${j.file}.png`);
        if (existsSync(src)) {
          copyFileSync(src, join(root, 'art-raw', site, `${j.file}.png`));
          ok++;
        }
      }
      console.log(`[${site} #${n}] codex exit ${code}; ${ok}/${batch.length} images`);
      resolve();
    });
  });
}

let next = 0;
async function worker() {
  while (next < batches.length) {
    const n = next++;
    await runBatch(batches[n], n);
  }
}
await Promise.all(Array.from({ length: Math.min(concurrency, batches.length) }, worker));
console.log('done');
