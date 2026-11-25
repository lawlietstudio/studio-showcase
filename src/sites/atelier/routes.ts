import { LANGS, slugFor } from '../../lib/i18n';
import Home from './views/Home.astro';
import Shop from './views/Shop.astro';
import Product from './views/Product.astro';
import Story from './views/Story.astro';
import Cart from './views/Cart.astro';
import Contact from './views/Contact.astro';
import { C } from './content';

export function atelierRoutes() {
  const pages: [string, any, Record<string, unknown>?][] = [
    ['/', Home], ['/shop/', Shop], ['/story/', Story], ['/cart/', Cart], ['/contact/', Contact],
    ...C.products.map((p) => [`/shop/${p.slug}/`, Product, { slug: p.slug }] as [string, any, Record<string, unknown>]),
  ];
  return LANGS.flatMap((lang) => pages.map(([path, View, extra]) => ({ params: { slug: slugFor(path, lang) }, props: { View, lang, ...extra } })));
}
