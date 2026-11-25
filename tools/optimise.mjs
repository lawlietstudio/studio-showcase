// Turns the raw Codex output in art-raw/<site>/ into the web assets in src/assets/<site>/:
//   <name>.png          -> <name>.webp         photographs (resized, WebP)
//   logo.png            -> logo.webp           transparent mask of the logo mark (colour comes from CSS)
//   icons.png (3 x 2)   -> icons/i1..i6.webp   six transparent icon masks
//
// Logo and icons are drawn light-on-black, so brightness becomes opacity; CSS then colours them with
// `mask-image`, which lets one asset work on light and dark sections and in any theme colour.
//
// Usage: node tools/optimise.mjs [site ...]      (only files newer than their output are processed)
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sharp = createRequire(join(root, 'package.json'))('sharp');
const wanted = process.argv.slice(2);

const stale = (src, dest) => !existsSync(dest) || statSync(src).mtimeMs > statSync(dest).mtimeMs;

/** Contiguous runs of indices whose profile value is above `min`, merging gaps shorter than `gap`. */
function segments(profile, min, gap) {
  const runs = [];
  let start = -1;
  for (let i = 0; i <= profile.length; i++) {
    const on = i < profile.length && profile[i] > min;
    if (on && start < 0) start = i;
    if (!on && start >= 0) { runs.push([start, i - 1]); start = -1; }
  }
  const merged = [];
  for (const r of runs) {
    const last = merged[merged.length - 1];
    if (last && r[0] - last[1] < gap) last[1] = r[1];
    else merged.push([...r]);
  }
  return merged;
}

/** Cuts a square region around a bounding box out of a light-on-black raster and returns a transparent WebP mask. */
async function maskFrom(data, W, H, C, box, size, pad, thicken, dest) {
  const red = (x, y) => data[(y * W + x) * C];
  const { minX, maxX, minY, maxY } = box;
  const side = Math.round(Math.max(maxX - minX + 1, maxY - minY + 1) * (1 + pad * 2));
  const left = Math.round((minX + maxX) / 2 - side / 2);
  const top = Math.round((minY + maxY) / 2 - side / 2);
  // brightest values in the region define "full opacity"
  const values = [];
  for (let y = minY; y <= maxY; y += 2) for (let x = minX; x <= maxX; x += 2) values.push(red(x, y));
  values.sort((a, b) => a - b);
  const hi = Math.max(120, values[Math.floor(values.length * 0.995)] ?? 255);
  const alpha = Buffer.alloc(side * side);
  for (let y = 0; y < side; y++)
    for (let x = 0; x < side; x++) {
      const sx = left + x, sy = top + y;
      const v = sx >= 0 && sy >= 0 && sx < W && sy < H ? red(sx, sy) : 0;
      alpha[y * side + x] = Math.max(0, Math.min(255, Math.round(((v - 8) / (hi - 8)) * 255)));
    }
  let img = sharp(alpha, { raw: { width: side, height: side, channels: 1 } });
  if (thicken) img = img.blur(Math.max(0.8, side / 260)).linear(2.1, -20);
  const { data: a, info } = await img.resize(size, size, { kernel: 'lanczos3' }).toColourspace('b-w').raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    rgba[i * 4] = 255; rgba[i * 4 + 1] = 255; rgba[i * 4 + 2] = 255; rgba[i * 4 + 3] = a[i * info.channels];
  }
  await sharp(rgba, { raw: { width: size, height: size, channels: 4 } }).webp({ lossless: true, effort: 6 }).toFile(dest);
}

async function loadRaw(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, W: info.width, H: info.height, C: info.channels };
}

function bbox(raw, x0, y0, x1, y1) {
  const { data, W, C } = raw;
  let minX = x1, maxX = x0, minY = y1, maxY = y0;
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++)
      if (data[(y * W + x) * C] > 40) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
  return { minX, maxX, minY, maxY };
}

let count = 0;
for (const site of readdirSync(join(root, 'art-raw'), { withFileTypes: true }).filter((d) => d.isDirectory() && !d.name.startsWith('_')).map((d) => d.name)) {
  if (wanted.length && !wanted.includes(site)) continue;
  const src = join(root, 'art-raw', site);
  const out = join(root, 'src', 'assets', site);
  mkdirSync(join(out, 'icons'), { recursive: true });

  for (const file of readdirSync(src).filter((f) => f.endsWith('.png'))) {
    const { name } = parse(file);
    const from = join(src, file);

    if (name === 'logo') {
      const dest = join(out, 'logo.webp');
      if (!stale(from, dest)) continue;
      const raw = await loadRaw(from);
      await maskFrom(raw.data, raw.W, raw.H, raw.C, bbox(raw, 0, 0, raw.W - 1, raw.H - 1), 512, 0.06, false, dest);
      console.log(`${site}/logo`); count++;
      continue;
    }

    if (name === 'icons') {
      const dest = join(out, 'icons', 'i6.webp');
      if (!stale(from, dest)) continue;
      const raw = await loadRaw(from);
      const { data, W, H, C } = raw;
      const cols = new Array(W).fill(0);
      const rows = new Array(H).fill(0);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (data[(y * W + x) * C] > 40) { cols[x]++; rows[y]++; }
      const colSegs = segments(cols, 2, 30);
      const rowSegs = segments(rows, 2, 30);
      if (colSegs.length !== 3 || rowSegs.length !== 2) {
        console.error(`${site}/icons: expected a 3 x 2 grid, found ${colSegs.length} x ${rowSegs.length}; re-run the generator for this sheet`);
        continue;
      }
      let n = 0;
      for (const [y0, y1] of rowSegs)
        for (const [x0, x1] of colSegs) {
          n++;
          await maskFrom(data, W, H, C, bbox(raw, x0, y0, x1, y1), 320, 0.1, true, join(out, 'icons', `i${n}.webp`));
        }
      console.log(`${site}/icons x6`); count++;
      continue;
    }

    const dest = join(out, `${name}.webp`);
    if (!stale(from, dest)) continue;
    const meta = await sharp(from).metadata();
    const landscape = (meta.width ?? 0) > (meta.height ?? 0) * 1.1;
    await sharp(from).resize({ width: landscape ? 1800 : 1100, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(dest);
    console.log(`${site}/${name}  ${meta.width}x${meta.height}`); count++;
  }
}
console.log(`${count} asset(s) written`);
