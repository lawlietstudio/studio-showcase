import { LANGS, slugFor } from '../../lib/i18n';
import Home from './views/Home.astro';
import Priorities from './views/Priorities.astro';
import News from './views/News.astro';
import Article from './views/Article.astro';
import About from './views/About.astro';
import GetInvolved from './views/GetInvolved.astro';
import { C } from './content';

export function campaignRoutes() {
  const pages: [string, any, Record<string, unknown>?][] = [
    ['/', Home], ['/priorities/', Priorities], ['/news/', News], ['/about/', About], ['/get-involved/', GetInvolved],
    ...C.news.map((a) => [`/news/${a.slug}/`, Article, { slug: a.slug }] as [string, any, Record<string, unknown>]),
  ];
  return LANGS.flatMap((lang) => pages.map(([path, View, extra]) => ({ params: { slug: slugFor(path, lang) }, props: { View, lang, ...extra } })));
}
