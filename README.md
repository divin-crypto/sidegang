# FAITH OVER FEAR RW — Monolithic Minimalism landing

An immersive, production landing page for **FAITH OVER FEAR RW**, faith-inspired streetwear from **Kigali, Rwanda**.

**Creative direction:** Monolithic Minimalism + Architectural Sculptural Mark (Concept C × Concept E) — monumental F–Human–F emblem, restrained metallic/stone materials, cinematic studio lighting, luxury editorial minimalism.

The signature hero: a hand-built **`F > F`** mark floating in front of a figure that stands *behind* it, head clearing the mark, shoulders screened back *over* the letterforms so the body genuinely wraps the symbol — volumetric haze, film grain, controlled scroll dive.

Live reference: https://faithoverfearrw.netlify.app/

---

## Stack

| Concern | Choice |
| ------- | ------ |
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS (monolithic tokens: graphite #0A0A0A / white #FFFFFF / off-white #F5F5F7 / industrial grey #7E7E80) |
| Motion | GSAP + ScrollTrigger (scrub-linked, never hijacked) |
| 3D | Three.js + React Three Fiber + drei (optional extruded F>F, studio lights) + SVG sculpture fallback |
| Atmosphere | Hand-written WebGL fragment shader + Canvas fallback |
| Fonts | Self-hosted via `@fontsource` (Anton / Archivo Variable / Inter / Space Mono) |

**2.5D + optional 3D:** The primary emblem is SVG sculpture (bloom → 10-step extruded bevel → brushed-titanium face → stone gradient → AO → chamfer → rim light → specular sweep) with CSS 3D perspective + pointer tilt. On capable desktops `HeroSceneCanvas` loads a real Three.js extrusion behind it; on mobile/reduced-motion/save-data the SVG composite is the hero — never empty, never slow.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit && vite build → dist/
npm run preview
```

### Tests

```bash
node scripts/smoke.mjs                         # 23 assertions
node scripts/test-hero-modes.mjs image          # MODE B still
node scripts/test-hero-modes.mjs video          # MODE A video + fallback
```

---

## Hero media: one switch

`src/config/site.ts` → `heroMedia`

```ts
heroMedia.type = 'image';   // or 'video'
heroMedia.type = 'video';   // VITE_HERO_TYPE=video npm run build also works
```

- **MODE A video:** local cinematic loop (`/media/hero-motion.webm` + `.mp4`), muted, playsInline, poster-backed. If missing/undecodable → still.
- **MODE B image:** high-res still with WebP/JPEG at 1280/1920, srcSet, depth treatment, interlace plate.

`prefers-reduced-motion: reduce` forces image mode (no autoplay).

### Composition

| Key | Meaning |
| --- | ------- |
| `focusX/Y` | object-position of figure inside frame |
| `scale` | depth push of figure plate |
| `markCenterY` | vertical centre of F>F, % hero height |
| `markWidthVw` | width of mark, % viewport |

Mobile **re-composes**, not shrinks — `index.css` re-stages scale/shift/focus/mark at `max-width:767px` plus short-viewport guards.

### Cinematic opening (research report sequence)

```
0.0–0.5s  Atmosphere — deep graphite wash fades in
0.5–1.2s  Frame — SVG stroke-dash draws the rectangular border
1.0–2.0s  Sculptural Fs — scale + depth + rim light emerge
1.5–2.5s  Human — interlace plate + rim lighting reveal
2.0–3.0s  Settle — headline lines stagger into place
```

All timings are GSAP; reduced-motion skips to final state. The hero never traps navigation — 2.8s hard ceiling + veil fallback.

---

## Layering (z → purpose)

| z | Layer |
| - | ----- |
| 0 | `.hero-wash` — graphite atmospheric wash |
| 1 | back figure plate — body **behind** mark |
| 3 | F>F mark — SVG sculpture + optional Three.js extrusion |
| 4 | interlace plate — same frame, `mix-blend-mode: screen`, shoulder-band mask |
| 5 | WebGL volumetric haze (additive) |
| 6 | film grain |
| 7 | vignette |
| 8 | frame from sketch (SVG rect + corner ticks) |
| 9 | eyebrow, headline `WALK BY FAITH. LIVE WITH COURAGE.`, CTAs (`SHOP THE COLLECTION` / `OUR PURPOSE`), scroll cue |

> Interlace & haze must be **direct children** of `.hero-stage` — isolated wrappers break the blend.

---

## 3D — Three.js enhancement

- `src/components/HeroScene.tsx` — capability check (WebGL, DPR ≤2.8, desktop ≥1024px, no save-data, no reduced-motion) then lazy-loads `HeroSceneCanvas.tsx`
- `HeroSceneCanvas.tsx` — Three.js: hand-built F shapes as `THREE.Shape` → `Extrude` with bevel, metalness 0.72, roughness 0.28, studio lights (key + rim + fill), contact shadows, fog
- Fallback is always the SVG sculpture — the page is never dependent on a GLB

**Optional GLB:** `public/media/f-human-f.glb` (GLB ≤1.2 MB, Draco, F meshes + chevron + frame, PBR). Documented in `public/media/README.md`; if absent the site is complete with SVG.

---

## Authentic brand data

- **Products:** names, descriptions, prices (FRW), colours, sizes, Cloudinary photography from `https://faithoverfearrw.netlify.app/api/products`. Snapshot in `src/data/products.ts`; runtime `useCatalog()` refreshes live, falls back on offline/CORS/timeout.
- **Copy:** Our Conviction / The Quality / The Stand, ABIDE/GENESIS descriptions, contact — verbatim from brand's About/Contact/drops.
- **Shopping:** every CTA → real storefront (`/shop`). No checkout invented.
- **Nothing fabricated:** no invented prices, stock, reviews, discounts, testimonials, founders.

---

## Performance & accessibility

- Self-hosted subsetted fonts; no CDN
- Hero still WebP+JPEG, responsive `srcSet`+`sizes`, preloaded; below-fold `loading="lazy"`; Cloudinary `f_auto,q_auto`
- WebGL haze DPR cap 1.35, single static frame on reduced-motion, stops on `visibilitychange`
- Video pauses when hero out of view or tab hidden
- `prefers-reduced-motion` disables intro, scrubs, parallax, sheen, grain, autoplay
- Semantic landmarks, one `<h1>`, skip link, visible focus rings, Esc-closes mobile menu, decorative plates `aria-hidden`, mark `role="img"` with label, no audio/flashing
- No scroll hijacking — scrub-linked only

**No-JS:** `index.html` paints poster-plate + veil; `<noscript>` renders headline, brand statement, contact, SHOP link.

---

## Responsive

- Desktop: full cinematic scene, monumentality, pointer tilt
- Tablet: frame/camera/text re-tuned to prevent collisions
- Mobile: recomposed F–Human–F (mark 68vw, figure 50/34), legible `WALK BY FAITH. LIVE WITH COURAGE.`, touch-friendly cards, reduced effects, no cursor interactions, no overflow

---

## Deployment (Netlify)

`netlify.toml`: `npm run build` → `dist`, Node 20, immutable `/assets/*` + `/media/*` caching, security headers. `npm run build` must pass (`tsc --noEmit` first).

---

## Project layout

```
src/
  config/site.ts            brand copy, links, heroMedia + composition
  data/products.ts          verified catalogue snapshot + Cloudinary helper
  data/useCatalog.ts        live refresh with silent fallback
  hooks/                    media queries, parallax
  components/
    SiteNavigation.tsx      wordmark, SHOP, mobile sheet
    HeroSection.tsx         layer orchestration + cinematic intro + scroll dive
    HeroMedia.tsx           MODE A/B plates + fallback
    BrandSymbol.tsx         hand-built F>F SVG sculpture (Concept C×E)
    SculpturalFMark.tsx     alias re-export
    BrandFrame.tsx          rectangular frame with stroke-dash reveal
    HumanFigure.tsx         figure wrapper (rim + contact)
    HeroScene.tsx           capability-gated 3D orchestrator
    HeroSceneCanvas.tsx     Three.js extruded Fs + studio lighting
    HeroMediaFallback.tsx   static fallback
    AtmosphereCanvas.tsx    WebGL volumetric haze
    BrandStatement.tsx      FAITH OVER FEAR IS NOT A LABEL...
    ProductShowcase.tsx     FeaturedCollection — editorial grid
    ProductCard.tsx         card with Cloudinary + hover + availability
    CampaignSection.tsx     ABIDE / GENESIS large-format plates
    BrandStory.tsx          WE CREATE ARMOUR FOR THE BOLD
    CollectionCTA.tsx       WEAR YOUR CONVICTION.
    SiteFooter.tsx          identity, verified links, contact
    ShoppingInterface.tsx   honest commerce bridge (no fake checkout)
    Reveal.tsx              one-shot scroll reveal
```

---

## Media assets (`public/media/`)

| File | Purpose |
| ---- | ------- |
| `hero-figure-1920.{jpg,webp}` | wide still |
| `hero-figure-1280.{jpg,webp}` | small still |
| `hero-poster.jpg` | poster + veil + OG |
| `hero-motion.{webm,mp4}` | MODE A loop |
| `og-cover.jpg` | 1200×630 social card |
| `favicon.svg` | F>F favicon |

Figure plate is generated stand-in (no brand photography shipped). Swap with brand's campaign shoot, same names, re-tune `heroMedia.composition`. See `public/media/README.md` & `scripts/README.md`.

---

## Design tokens — Monolithic Minimalism

- Deep graphite #0A0A0A · Pure white #FFFFFF · Off-white #F5F5F7 · Industrial grey #7E7E80
- Materials: brushed titanium, dark stone, matte rubber, heavy cotton, restrained metal
- Type: Anton (display, condensed architectural) + Archivo Variable (headline) + Inter (body)
- Motion: purposeful, sequenced, never simultaneous; `ease-editorial` cubic-bezier(0.16,1,0.3,1)
