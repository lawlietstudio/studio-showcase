import { defineConfig } from 'astro/config';

// BASE_PATH and SITE_ORIGIN are set for the GitHub Pages build (a project site under /studio-showcase/).
// BASE_PATH may be given with or without slashes ("studio-showcase" is safest in Git Bash on Windows).
const base = (process.env.BASE_PATH ?? '').replace(/^\/+|\/+$/g, '');

export default defineConfig({
  site: process.env.SITE_ORIGIN || undefined,
  base: base ? `/${base}` : '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  server: { port: Number(process.env.PORT) || 4330 },
  devToolbar: { enabled: false },
});
