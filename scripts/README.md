# Test & calibration scripts

```bash
node scripts/smoke.mjs                  # whole page boots in jsdom — 23 assertions
node scripts/test-hero-modes.mjs image  # MODE B: still imagery
node scripts/test-hero-modes.mjs video  # MODE A: local video + failure fallback
```

`scripts/lib/harness.mjs` bundles the real app with esbuild and boots it in jsdom with
WebGL, `IntersectionObserver` and `matchMedia` stubbed — i.e. the degraded environment
the page must survive.

## Calibrating the hero composition

The figure is positioned so the head clears the mark and the shoulders cross it. To
re-tune after swapping the plate, render the plate as an ASCII luminance map and read
the silhouette off it:

```bash
convert public/media/hero-figure-1920.jpg -colorspace Gray -resize 72x32! -depth 8 txt:-
# → plot the values as characters; the head is the upper central mass,
#   the shoulders the two masses spreading below it.
```

Then solve for the mapping
`viewportY(imageY) = boxTop + originY + (coverScale · imageY + offset − originY) · scale + shift`
and set `focusX` / `focusY` / `scale` / `markCenterY` accordingly. The current values put
the head in the clear space above the mark with the shoulder line crossing its upper half
at 1440×900, 1024×768 and 390×844.
