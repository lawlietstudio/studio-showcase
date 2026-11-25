import type { SiteCfg } from '../../lib/types';
import { C } from './content';

export const cfg: SiteCfg = {
  id: 'law',
  name: C.name,
  tagline: C.tagline,
  nav: C.nav,
  header: 'stack',
  cta: { path: '/contact/', label: C.cta },
  themeColor: '#0c1714',
  contact: { phone: C.phone, email: C.email, address: C.address, hours: C.hours },
  footerNote: C.demo,
  strings: C.strings,
};
