import type { SiteCfg } from '../../lib/types';
import { C } from './content';

export const cfg: SiteCfg = {
  id: 'author',
  name: C.name,
  tagline: C.tagline,
  nav: C.nav,
  header: 'stack',
  cta: { path: '/contact/', label: C.cta },
  themeColor: '#f4eee2',
  contact: { email: C.email },
  footerNote: C.demo,
  strings: C.strings,
};
