# Lawliet Studio: portfolio and demo websites

One repository, one build, one GitHub Pages site. It holds the studio's portfolio (at the root) and five
demonstration websites, each in English and Traditional Chinese with its own art direction:

| Path | Site | Look |
| --- | --- | --- |
| `/` | **Lawliet Studio** portfolio | dark, cinematic, brass |
| `/law/` | Aldridge & Wren LLP (law firm) | classical: ivory, deep green, Cormorant Garamond |
| `/accounting/` | Marlowe & Finch CPA (accounting firm) | bright and rounded: emerald, Manrope, tabular numerals |
| `/campaign/` | Elena Voss for Riverside (politician, with news) | bold civic: navy and orange, Barlow Condensed |
| `/atelier/` | Kumoya Atelier (Japanese art-supply shop) | washi paper, vermilion, Shippori Mincho; product pages, filters, cart |
| `/author/` | Iris Calloway (novelist) | literary: cream, ink green, Newsreader; book pages |

The sixth case study, the mobile-notary design, lives in its own repository and is linked from the portfolio.
**Everything in the demos is fictional**: names, firms, candidates, books, prices, phone numbers and addresses.

Every page exists in both languages (English at the site's root, 中文 under `/zh/`). A language dropdown switches
to the same page in the other language and remembers the choice across all the demos.

## How it is built

* [Astro](https://astro.build) (static output, no client framework). One project builds every site.
* `src/sites/<site>/` holds each site's content (`content.ts`, English and Chinese side by side), `theme.css`,
  `Layout.astro`, views and a `routes.ts` that lists every page in both languages. `src/pages/<site>/[...slug].astro`
  turns those routes into pages.
* `src/styles/kit.css` is the shared structure (header, drawer, language dropdown, buttons, grids, forms, footer);
  each theme sets colour, type and corners through custom properties and adds its own components.
* `src/components/Shell.astro` renders the head, header (three layouts), footer and language links for any site.
* Fonts are self-hosted through Fontsource. Chinese fonts are split by unicode-range, so English pages never
  download them.
* Forms compose an email in the visitor's own mail app; nothing is sent to a server. The shop's cart is stored in
  the browser (`localStorage`) and checkout is a stub.

## Artwork

All photographs, logo marks and icon sets were generated with Codex CLI's image generation tool and then
optimised. Prompts are in `tools/manifests/<site>.json`.

```powershell
npm run gen                      # generate any missing art into art-raw/ (needs Codex CLI; raw PNGs are not committed)
npm run images                   # photos -> WebP; logos and icon sheets -> transparent masks (src/assets/<site>/)
```

Logos and icons are light-on-black sheets; `tools/optimise.mjs` cuts the 3 × 2 icon sheets apart and turns brightness
into opacity, so CSS can colour them with `mask-image` in any theme.

## Develop and deploy

```powershell
npm install --ignore-scripts
npm run dev                      # http://localhost:4330
npm run build                    # dist/
$env:BASE_PATH='studio-showcase'; npm run build; npm run preview; npm run check   # rehearse the GitHub Pages build and crawl every link
```

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds with the repository name as the base path and
publishes `dist/` to GitHub Pages. Previews set `PUBLIC_DEMO=1`, which adds `noindex`.

## Adding another demo

1. Add `tools/manifests/<site>.json` and run `npm run gen` then `npm run images`.
2. Copy a folder in `src/sites/`, edit `content.ts`, `config.ts`, `theme.css` and the views.
3. Add `src/pages/<site>/[...slug].astro`, and a card in `src/sites/studio/content.ts`.

## Credits

Astro (MIT). Fonts via Fontsource (SIL Open Font License): Cormorant Garamond, Inter, Manrope, IBM Plex Mono,
Barlow, Barlow Condensed, Source Serif 4, Shippori Mincho, Jost, Newsreader, Figtree, Instrument Serif and Sans,
Noto Serif TC and Noto Sans TC. Imagery generated with AI; check the usage and disclosure rules that apply to your
client before reusing it commercially.
