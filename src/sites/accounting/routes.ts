import { LANGS, slugFor } from '../../lib/i18n';
import Home from './views/Home.astro';
import Services from './views/Services.astro';
import Team from './views/Team.astro';
import Resources from './views/Resources.astro';
import Article from './views/Article.astro';
import Contact from './views/Contact.astro';
import { C } from './content';

export function accountingRoutes() {
  const pages: [string, any, Record<string, unknown>?][] = [
    ['/', Home], ['/services/', Services], ['/team/', Team], ['/resources/', Resources], ['/contact/', Contact],
    ...C.articles.map((a) => [`/resources/${a.slug}/`, Article, { slug: a.slug }] as [string, any, Record<string, unknown>]),
  ];
  return LANGS.flatMap((lang) => pages.map(([path, View, extra]) => ({ params: { slug: slugFor(path, lang) }, props: { View, lang, ...extra } })));
}
