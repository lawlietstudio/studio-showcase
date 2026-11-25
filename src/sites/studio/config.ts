import type { SiteCfg } from '../../lib/types';
import { C } from './content';

export const cfg: SiteCfg = {
  id: 'studio',
  base: '',
  name: C.name,
  tagline: C.tagline,
  nav: C.nav,
  header: 'left',
  cta: { path: '/contact/', label: C.cta },
  themeColor: '#0d0f13',
  contact: { email: C.email },
  footerNote: C.demo,
  strings: C.strings,
  footerCols: [{ title: { en: 'Demos', zh: '示範' }, links: [
    { path: '/work/law/', label: 'Aldridge & Wren' }, { path: '/work/accounting/', label: 'Marlowe & Finch' }, { path: '/work/campaign/', label: 'Elena Voss' },
    { path: '/work/atelier/', label: 'Kumoya Atelier' }, { path: '/work/author/', label: 'Iris Calloway' }, { path: '/work/notary/', label: 'Sample Mobile Notary' },
  ] }],
};
