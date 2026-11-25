import type { SiteCfg } from '../../lib/types';
import { C } from './content';

export const cfg: SiteCfg = {
  id: 'atelier',
  name: C.name,
  tagline: C.tagline,
  nav: C.nav,
  header: 'split',
  cta: { path: '/shop/', label: C.cta },
  themeColor: '#f3ede0',
  contact: { phone: C.phone, email: C.email, address: C.address, hours: C.hours },
  footerNote: C.demo,
  strings: C.strings,
  footerCols: [{ title: { en: 'Shop', zh: '商品' }, links: C.categories.map((c) => ({ path: `/shop/#${c.id}`, label: c.name })) }],
};
