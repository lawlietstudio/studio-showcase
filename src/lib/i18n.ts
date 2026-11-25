// Language helpers shared by every site. English lives at each site's root, Traditional Chinese under /zh/.
export type Lang = 'en' | 'zh';
export const LANGS: Lang[] = ['en', 'zh'];

/** A string, or an {en, zh} pair. */
export type Rec = string | { en: string; zh?: string };

/** Text in the given language (falls back to English, then to ''). */
export const t = (v: Rec | undefined | null, lang: Lang): string =>
  v == null ? '' : typeof v === 'string' ? v : (v[lang] ?? v.en ?? '');

/** Deployment base path without a trailing slash ('' at a domain root). */
export const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * URL of a page. `site` is the demo's folder ('law', 'campaign', ...) or '' for the portfolio;
 * `path` is language-neutral and starts and ends with a slash ("/about/").
 */
export const href = (site: string, path: string, lang: Lang): string =>
  `${BASE}${site ? `/${site}` : ''}${lang === 'zh' ? '/zh' : ''}${path}`;

/** Static asset (from /public) with the deployment base. */
export const asset = (p: string): string => `${BASE}${p}`;

/** Static paths for a `[...slug]` route: one per language and page. Home has an undefined slug. */
export function slugFor(path: string, lang: Lang): string | undefined {
  const clean = path.replace(/^\/|\/$/g, '');
  const parts = [lang === 'zh' ? 'zh' : '', clean].filter(Boolean);
  return parts.length ? parts.join('/') : undefined;
}

export const telHref = (phone: string): string => 'tel:' + phone.replace(/[^\d+]/g, '');
