import { LANGS, slugFor } from '../../lib/i18n';
import Home from './views/Home.astro';
import Practice from './views/Practice.astro';
import Attorneys from './views/Attorneys.astro';
import Insights from './views/Insights.astro';
import Article from './views/Article.astro';
import Contact from './views/Contact.astro';
import { C } from './content';

/** Every page of the site in both languages, for the [...slug] route. */
export function lawRoutes() {
  const pages: [string, any, Record<string, unknown>?][] = [
    ['/', Home],
    ['/practice/', Practice],
    ['/attorneys/', Attorneys],
    ['/insights/', Insights],
    ['/contact/', Contact],
    ...C.articles.map((a) => [`/insights/${a.slug}/`, Article, { slug: a.slug }] as [string, any, Record<string, unknown>]),
  ];
  return LANGS.flatMap((lang) =>
    pages.map(([path, View, extra]) => ({ params: { slug: slugFor(path, lang) }, props: { View, lang, ...extra } })),
  );
}
