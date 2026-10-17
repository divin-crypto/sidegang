# Hero media

| File | Role |
| ---- | ---- |
| `hero-figure-1920.jpg` / `.webp` | hero still, wide (MODE B) |
| `hero-figure-1280.jpg` / `.webp` | hero still, small screens / save-data (MODE B) |
| `hero-poster.jpg` | video poster, boot-veil plate, OG fallback |
| `hero-motion.webm` / `.mp4` | cinematic loop, 9 s · 720p · ≈250–300 kbps (MODE A) |
| `og-cover.jpg` | 1200×630 social card |
| `favicon.svg` | `F > F` favicon |

The figure plate is art-directed campaign imagery generated for this build (the
repository contained no brand photography). Replace these files with the brand's own
campaign shoot, keeping the same names — nothing in the code needs to change, only
`heroMedia.composition` in `src/config/site.ts` may need re-tuning.
