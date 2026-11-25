import type { Rec } from './i18n';

export interface NavItem {
  /** Language-neutral path, e.g. "/about/". */
  path: string;
  label: Rec;
}

/** Everything the shared header and footer need to know about a site. */
export interface SiteCfg {
  id: string;
  /** URL folder of the site when it differs from `id` ('' for the portfolio at the root). */
  base?: string;
  name: string;
  tagline: Rec;
  nav: NavItem[];
  /** split: nav either side of a centred brand; left: brand left, nav right; stack: brand centred over the nav row */
  header: 'split' | 'left' | 'stack';
  cta?: NavItem;
  themeColor: string;
  contact?: { phone?: string; email?: string; address?: Rec; hours?: Rec };
  footerNote: Rec;
  /** extra footer column(s) */
  footerCols?: { title: Rec; links: NavItem[] }[];
  /** label of the language dropdown's accessible name */
  strings: { menu: Rec; language: Rec; skip: Rec; explore: Rec; contact: Rec; demo: Rec };
}
