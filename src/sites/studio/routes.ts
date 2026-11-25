import { LANGS, slugFor } from '../../lib/i18n';
import Home from './views/Home.astro';
import Work from './views/Work.astro';
import Case from './views/Case.astro';
import Approach from './views/Approach.astro';
import Contact from './views/Contact.astro';
import { C } from './content';

export function studioRoutes() {
  const pages: [string, any, Record<string, unknown>?][] = [
    ['/', Home], ['/work/', Work], ['/approach/', Approach], ['/contact/', Contact],
    ...C.projects.map((p) => [`/work/${p.id}/`, Case, { id: p.id }] as [string, any, Record<string, unknown>]),
  ];
  return LANGS.flatMap((lang) => pages.map(([path, View, extra]) => ({ params: { slug: slugFor(path, lang) }, props: { View, lang, ...extra } })));
}
