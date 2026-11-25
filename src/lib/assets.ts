// Image lookup: every site keeps its pictures in src/assets/<site>/ (photographs, logo.webp and icons/i1..i6.webp).
const all = import.meta.glob('../assets/**/*.webp', { eager: true, import: 'default' }) as Record<string, ImageMetadata>;

/** A photograph of a site, e.g. photo('law', 'hero'). */
export function photo(site: string, name: string): ImageMetadata {
  const m = all[`../assets/${site}/${name}.webp`];
  if (!m) throw new Error(`Missing image ${site}/${name}.webp`);
  return m;
}

/** Icon mask number 1-6 of a site. */
export function icon(site: string, n: number): ImageMetadata {
  const m = all[`../assets/${site}/icons/i${n}.webp`];
  if (!m) throw new Error(`Missing icon ${site}/icons/i${n}.webp`);
  return m;
}

/** The logo mark of a site (a transparent mask; CSS colours it). */
export function logo(site: string): ImageMetadata {
  const m = all[`../assets/${site}/logo.webp`];
  if (!m) throw new Error(`Missing logo for ${site}`);
  return m;
}

/** True when an image exists (lets a page degrade gracefully while artwork is still being generated). */
export const has = (site: string, name: string): boolean => `../assets/${site}/${name}.webp` in all;
