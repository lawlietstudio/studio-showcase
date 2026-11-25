import type { SiteCfg } from '../../lib/types';
import { C } from './content';

export const cfg: SiteCfg = {
  id: 'campaign',
  name: C.name,
  tagline: C.tagline,
  nav: C.nav,
  header: 'left',
  cta: { path: '/get-involved/', label: C.cta },
  themeColor: '#0b2a4a',
  contact: { phone: C.phone, email: C.email, address: C.address, hours: C.hours },
  footerNote: C.demo,
  strings: C.strings,
};
