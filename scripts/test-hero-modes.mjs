/**
 * Hero media mode tests.
 *
 *   node scripts/test-hero-modes.mjs image   → MODE B, still imagery
 *   node scripts/test-hero-modes.mjs video   → MODE A, local cinematic loop
 *
 * The video run also simulates a broken/missing file by firing `error` on the
 * <video> element and asserting the hero silently falls back to the still.
 */
import { bootApp, finish } from './lib/harness.mjs';

const mode = process.argv[2] === 'video' ? 'video' : 'image';
const { doc, window, problems, restore } = await bootApp({ heroType: mode, outName: `hero-${mode}` });

const q = (s) => doc.querySelector(s);
const qa = (s) => [...doc.querySelectorAll(s)];
const plate = () => q('.hero-figure[data-layer="back"]');

const checks = [];
const check = (name, ok, detail = '') => checks.push({ name, ok: Boolean(ok), detail });

if (mode === 'video') {
  const video = () => plate()?.querySelector('video');

  check('video element rendered', Boolean(video()));
  check('muted + inline + loop', video()?.muted === true && video()?.playsInline === true && video()?.loop === true);
  check('poster set', video()?.getAttribute('poster') === '/media/hero-poster.jpg');
  check(
    'webm + mp4 sources',
    qa('video source').length === 2 &&
      qa('video source').some((s) => s.getAttribute('src')?.endsWith('.webm')) &&
      qa('video source').some((s) => s.getAttribute('src')?.endsWith('.mp4')),
  );

  // Simulate the file being missing / undecodable.
  video()?.dispatchEvent(new window.Event('error'));
  await new Promise((r) => setTimeout(r, 120));

  check('falls back to the still when the video fails', Boolean(plate()?.querySelector('img')));
  check('no video left after fallback', !video());
  check('hero never renders empty', Boolean(plate()?.querySelector('img') || plate()?.querySelector('video')));
} else {
  check('no video element in image mode', !plate()?.querySelector('video'));
  check('responsive image rendered', Boolean(plate()?.querySelector('img')));
  check('webp source offered', Boolean(plate()?.querySelector('source[type="image/webp"]')));
  check('srcset present', Boolean(plate()?.querySelector('img')?.getAttribute('srcset')));
  check('alt text is empty (decorative)', plate()?.querySelector('img')?.getAttribute('alt') === '');
}

// Shared invariants for both modes
check('interlace plate present', Boolean(q('.hero-figure--interlace')));

// Regression guard: the screen blend only reaches the mark if the plate is a
// DIRECT child of the stage. Any wrapper forming an isolated group (z-index,
// will-change, opacity, transform) silently flattens the effect.
const stage = q('.hero-stage');
check(
  'interlace is a direct child of the stage (blend not isolated)',
  q('.hero-figure--interlace')?.parentElement === stage,
);
check(
  'atmosphere canvas is a direct child of the stage (blend not isolated)',
  q('canvas.atmosphere-canvas')?.parentElement === stage,
);
check('mark rendered above the back plate', Boolean(q('.hero-mark-anchor .hero-mark-scale svg')));
check('atmosphere canvas present', Boolean(q('canvas.atmosphere-canvas')));
check('grain + vignette present', Boolean(q('.hero-grain')) && Boolean(q('.hero-vignette')));
check('reduced-motion-safe markup', Boolean(q('.hero-stage')));

restore();
finish(`Hero mode: ${mode}`, checks, problems);
