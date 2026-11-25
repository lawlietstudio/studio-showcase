// Serves _site/ the way GitHub Pages would, so sub-path problems show up locally.
// Usage: node scripts/preview-pages.mjs [port] [basePath]   (defaults: 4400, studio-showcase)
// Pass the base WITHOUT a leading slash: Git Bash on Windows rewrites "/x" into a Windows path.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.argv[2]) || 4400;
const baseArg = (process.argv[3] ?? 'studio-showcase').replace(/^\/+|\/+$/g, '');
const base = baseArg ? `/${baseArg}` : '';

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff',
};

async function send404(res) {
  const body = await readFile(join(root, '404.html')).catch(() => 'Not found');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(body);
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  if (base && pathname !== base && !pathname.startsWith(`${base}/`)) return send404(res);
  const rel = decodeURIComponent(pathname.slice(base.length) || '/');
  const file = join(root, normalize(rel));
  if (!file.startsWith(root)) return send404(res);
  try {
    const s = await stat(file);
    if (s.isDirectory()) {
      // GitHub Pages redirects /dir to /dir/
      if (!pathname.endsWith('/')) return res.writeHead(301, { Location: `${pathname}/` }).end();
      return res.writeHead(200, { 'Content-Type': types['.html'] }).end(await readFile(join(file, 'index.html')));
    }
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }).end(await readFile(file));
  } catch {
    send404(res);
  }
}).listen(port, () => console.log(`Serving _site/ at http://localhost:${port}${base}/`));
