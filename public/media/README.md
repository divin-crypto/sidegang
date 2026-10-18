# Hero media + 3D assets

| File | Role |
| ---- | ---- |
| `hero-figure-1920.jpg` / `.webp` | hero still, wide (MODE B) — **F–Human–F composition anchor** |
| `hero-figure-1280.jpg` / `.webp` | hero still, small screens / save-data (MODE B) |
| `hero-poster.jpg` | video poster, boot-veil plate, OG fallback |
| `hero-motion.webm` / `.mp4` | cinematic loop, 9 s · 720p · ≈250–300 kbps (MODE A) |
| `og-cover.jpg` | 1200×630 social card |
| `favicon.svg` | `F > F` favicon |

## Figure plate provenance
The figure plate is art-directed campaign imagery generated for this build (the
repository contained no brand photography). Replace these files with the brand's own
campaign shoot, keeping the same names — nothing in the code needs to change, only
`heroMedia.composition` in `src/config/site.ts` may need re-tuning.

Calibration: `convert public/media/hero-figure-1920.jpg -colorspace Gray -resize 72x32! txt:-`

## 3D sculptural mark — Monolithic Minimalism

The hero's **F–Human–F** emblem is implemented as layered 2.5D SVG (extruded bevel,
brushed-titanium rim, stone inner gradient, ambient occlusion, specular sweep) +
optional Three.js extrusion (`src/components/HeroSceneCanvas.tsx`).

### Optional GLB asset
For a fully volumetric build, supply:

```
public/media/f-human-f.glb
```

- **Format:** GLB / GLTF 2.0, ≤1.2 MB (Draco compressed)
- **Contents:** Two extruded F meshes + chevron + frame, centred at origin, Y-up,
  ~3.5 units wide, PBR materials (metalness 0.68–0.75, roughness 0.28–0.34, base
  colour #0A0A0A / #F5F5F7 accents)
- **Human figure:** Low-poly (≈12k tris) streetwear model with baked AO, or
  reference the photographic plate as a plane with depth map
- **Fallback:** If the GLB is absent or fails to load, the page automatically
  uses the SVG + photographic plate composite — never empty

Document the missing asset here; do not claim it is rendered when absent.

## Material palette (Architectural Sculptural Mark)
- Deep graphite #0A0A0A · Pure white #FFFFFF · Off-white #F5F5F7 · Industrial grey #7E7E80
- Brushed titanium, dark stone, matte rubber, heavy cotton, restrained reflective metal
- Luxury editorial lighting: rim + key + fill, contact shadows, ambient occlusion

## Swapping imagery
No code changes required — drop files with the same names and re-tune
`heroMedia.composition` (focusX/Y, scale, markCenterY) so the head clears the mark.
