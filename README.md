# FAITH OVER FEAR RW — landing experience

An immersive, production landing page for **FAITH OVER FEAR RW**, the faith-inspired
streetwear brand from Kigali, Rwanda.

The signature moment is the hero: a monumental, hand-built **`F > F`** mark floating in
front of a figure that stands *behind* it, with the head clearing the mark and the
shoulder line screened back *over* the letterforms so the body genuinely wraps the
symbol — volumetric haze, film grain and a controlled scroll dive into the collection.

Live reference brand site: <https://faithoverfearrw.netlify.app/>

---

## Stack

| Concern         | Choice                                                            |
| --------------- | ----------------------------------------------------------------- |
| Framework       | React 18 + TypeScript + Vite                                       |
| Styling         | Tailwind CSS (custom editorial tokens, no component library)        |
| Motion          | GSAP + ScrollTrigger (scrub-linked, never scroll-hijacked)          |
| Atmosphere      | Hand-written WebGL2 fragment shader (≈120 lines, no 3D dependency)  |
| Fonts           | Self-hosted via `@fontsource` (Anton, Archivo Variable, Inter, Space Mono) |

**No Three.js / React Three Fiber.** The brief allows it, but the composition is a
2.5D art-directed composite: a real dimensional effect (layered bevel, cast shadow,
specular sweep, pointer-responsive tilt, parallax plates) is achieved with SVG + CSS 3D
+ WebGL haze at a fraction of the weight, with a guaranteed fallback. Adding a
multi-megabyte GLB human model would have made the first screen slower and *less*
reliable, and no licensable model was available to bundle.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit && vite build  → dist/
npm run preview
```

### Tests

```bash
node scripts/smoke.mjs              # full page boots in jsdom, 23 assertions
node scripts/test-hero-modes.mjs image   # MODE B — still imagery
node scripts/test-hero-modes.mjs video   # MODE A — local video + failure fallback
```

---

## Hero media: one switch, two modes

`src/config/site.ts` → `heroMedia`

```ts
heroMedia.type = 'image';   // or 'video'
```

* **MODE A — `video`**: local cinematic loop (`/media/hero-motion.webm` + `.mp4`),
  muted, `playsInline`, poster-backed. If the file is missing or undecodable the hero
  silently swaps to the still — it is never empty.
* **MODE B — `image`**: high-resolution still with responsive `srcSet` (WebP + JPEG
  at 1280/1920), plus CSS/WebGL depth, parallax and the interlace plate.

Both modes can also be chosen at build time without editing source:

```bash
VITE_HERO_TYPE=video npm run build
```

`prefers-reduced-motion: reduce` forces MODE B (no autoplay) everywhere.

### Composition controls

Everything about the staging lives in `heroMedia.composition`:

| Key                | Meaning                                                     |
| ------------------ | ----------------------------------------------------------- |
| `focusX` / `focusY`| `object-position` of the figure inside the hero frame        |
| `scale`            | depth push applied to the figure plate                       |
| `markCenterY`      | vertical centre of the `F > F` mark, % of hero height        |
| `markWidthVw`      | mark width, % of viewport width (desktop / mobile)           |

Mobile **re-composes** rather than shrinks: `index.css` re-stages the figure scale,
shift, focus and mark size at `max-width: 767px`, plus short-viewport guards that keep
the mark clear of the headline.

---

## Layering (z-index → purpose)

| z | Layer |
| - | ----- |
| 0 | `.hero-wash` — always-on atmospheric gradient (works without JS/WebGL) |
| 1 | back figure plate — body standing **behind** the mark |
| 3 | `F > F` mark — bloom → extruded bevel → smoked-glass face → chamfer → rim light → specular sweep |
| 4 | interlace plate — same frame, `mix-blend-mode: screen`, masked to the shoulder band |
| 5 | WebGL volumetric haze (additive) |
| 6 | film grain |
| 7 | vignette |
| 8 | the frame from the original sketch, with corner ticks |
| 9 | eyebrow, headline, CTAs, scroll cue |

> The interlace plate must stay a **direct child** of `.hero-stage`. Any wrapper that
> forms an isolated group (`z-index`, `will-change`, `opacity`, `transform`) severs the
> blend from the mark underneath.

---

## Authentic brand data

All content is the brand's own, pulled from the live storefront:

* **Products** — names, descriptions, prices (FRW), colours, sizes and Cloudinary
  photography come from `https://faithoverfearrw.netlify.app/api/products`. A verified
  snapshot lives in `src/data/products.ts` so the page always renders; at runtime
  `useCatalog()` refreshes from the live API and falls back silently on any failure
  (offline, CORS, timeout).
* **Copy** — `Our Conviction`, `The Quality`, `The Stand`, the ABIDE and GENESIS drop
  descriptions and all contact details are taken verbatim from the brand's About,
  Contact and drops pages.
* **Shopping** — every CTA and product card links to the real, functioning storefront
  (`/shop`). No checkout is invented.
* **Nothing is fabricated** — no invented prices, stock counts, reviews, discounts,
  testimonials, founders, history or policy pages.

---

## Performance & accessibility

* Fonts self-hosted and subsetted by `unicode-range`; no third-party font CDN.
* Hero still: WebP + JPEG at two widths, `sizes` + `srcSet`, preloaded.
* Below-fold imagery is `loading="lazy"`; product art is served through Cloudinary
  `f_auto,q_auto`.
* The WebGL haze is capped at DPR 1.35, renders one static frame under reduced motion,
  and stops on `visibilitychange`.
* Hero video (MODE A) pauses when the hero scrolls out of view or the tab is hidden.
* `prefers-reduced-motion` disables the intro timeline, scrubs, parallax, the specular
  sweep, the grain drift and video autoplay.
* Semantic landmarks, one `<h1>`, skip link, visible `:focus-visible` rings, keyboard
  operable mobile menu (Escape closes), decorative plates `aria-hidden`, the brand mark
  exposed as `role="img"` with a text label, no autoplay audio, no flashing.
* No scroll hijacking — every effect is scrub-linked to native scrolling.

### First screen without JS / WebGL / video

`index.html` paints a branded loading state (poster plate + wordmark + progress rule)
immediately and removes it once React reports the first hero frame. `<noscript>` renders
the full headline, the brand statement, the real contact details and a working
SHOP link.

---

## Media assets (`public/media/`)

| File | Purpose |
| ---- | ------- |
| `hero-figure-1920.{jpg,webp}` | hero still, wide |
| `hero-figure-1280.{jpg,webp}` | hero still, small screens / save-data |
| `hero-poster.jpg` | video poster + OG/no-JS fallback |
| `hero-motion.{webm,mp4}` | MODE A cinematic loop (9 s, 720p, ≈300 kbps) |
| `og-cover.jpg` | 1200×630 social card |
| `favicon.svg` | `F > F` favicon |

### Provenance of the figure plate

The repository shipped with **no** brand photography, so the hero figure plate
(`hero-figure-*`, `hero-poster`, `hero-motion.*`) was **art-directed and generated for
this campaign** — backlit, near-black, monochrome, graded to the brand palette, then
denoised and looped with a slow Ken-Burns drift for MODE A. It is a stand-in for real
campaign photography, and it is the one asset that is not the brand's own.

**Swapping in real photography** requires no code changes — drop the files in using the
same names, then re-tune `heroMedia.composition` (`focusX` / `focusY` / `scale` /
`markCenterY`) so the head clears the mark and the shoulders cross it. The calibration
method used here is in `scripts/README.md`.

All *product* and *campaign* imagery is the brand's real Cloudinary photography, loaded
responsively through `f_auto,q_auto`.

---

## Deployment (Netlify)

`netlify.toml` sets the build (`npm run build` → `dist`), Node 20, immutable caching for
hashed `/assets/*` and `/media/*`, and baseline security headers. Publishing is a
standard Netlify deploy from this repository; `npm run build` must pass (it runs
`tsc --noEmit` first).

---

## Project layout

```
src/
  config/site.ts          brand copy, links, hero media + composition config
  data/products.ts        verified catalogue snapshot + Cloudinary helper
  data/useCatalog.ts      live catalogue refresh with silent fallback
  hooks/                  media queries, page visibility, parallax
  components/
    SiteNavigation.tsx    wordmark, links, SHOP, mobile sheet
    HeroSection.tsx       layer orchestration, intro + scroll choreography
    HeroMedia.tsx         MODE A / MODE B plates + fallback
    BrandSymbol.tsx       the hand-built F > F mark (SVG)
    AtmosphereCanvas.tsx  WebGL volumetric haze
    BrandStatement.tsx    declaration
    ProductShowcase.tsx   editorial product grid
    ProductCard.tsx       product card
    CampaignSection.tsx   ABIDE / GENESIS campaign plates
    BrandStory.tsx        brand purpose
    CollectionCTA.tsx     final invitation
    SiteFooter.tsx        identity, contact, verified links
    Reveal.tsx            one-shot scroll reveal
```
