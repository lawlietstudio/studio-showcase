import { LANGS, slugFor } from '../../lib/i18n';
import Home from './views/Home.astro';
import Books from './views/Books.astro';
import Book from './views/Book.astro';
import About from './views/About.astro';
import Events from './views/Events.astro';
import Contact from './views/Contact.astro';
import { C } from './content';

export function authorRoutes() {
  const pages: [string, any, Record<string, unknown>?][] = [
    ['/', Home], ['/books/', Books], ['/about/', About], ['/events/', Events], ['/contact/', Contact],
    ...C.books.map((b) => [`/books/${b.slug}/`, Book, { slug: b.slug }] as [string, any, Record<string, unknown>]),
  ];
  return LANGS.flatMap((lang) => pages.map(([path, View, extra]) => ({ params: { slug: slugFor(path, lang) }, props: { View, lang, ...extra } })));
}
