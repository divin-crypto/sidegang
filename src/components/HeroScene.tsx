import { Suspense, lazy, useEffect, useState } from 'react';
import BrandSymbol from './BrandSymbol';

const LazyCanvas = lazy(() => import('./HeroSceneCanvas'));

function canUseWebGL() {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl') || c.getContext('webgl2'));
  } catch {
    return false;
  }
}

/**
 * HeroScene — orchestrates the F-Human-F composition.
 * - On capable devices: loads a Three.js extruded F>F with studio lighting
 * - On reduced-motion / no-WebGL / mobile save-data: falls back to SVG layers
 * Never blocks the hero: fallback is always rendered underneath.
 */
export default function HeroScene({ quiet = false }: { quiet?: boolean }) {
  const [use3D, setUse3D] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as unknown as { connection?: { saveData?: boolean } })?.connection?.saveData;

    if (reduced || saveData) {
      setChecked(true);
      return;
    }

    // Avoid 3D on small screens — composition is recomposed, not shrunk
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) {
      setChecked(true);
      return;
    }

    if (!canUseWebGL()) {
      setChecked(true);
      return;
    }

    // Defer check until idle to avoid blocking first paint
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const start = () => {
      // Extra guard: DPR > 2.5 often means low-end Android with fake WebGL
      if ((window.devicePixelRatio || 1) > 2.8) {
        setChecked(true);
        return;
      }
      setUse3D(true);
      setChecked(true);
    };
    if (idle) idle(start);
    else window.setTimeout(start, 800);
  }, []);

  // Always render the SVG mark — it's the guaranteed readable emblem.
  // The 3D scene, when active, renders behind it as volumetric depth.
  return (
    <>
      {use3D && checked && (
        <Suspense fallback={null}>
          <LazyCanvas quiet={quiet} />
        </Suspense>
      )}
      <div className="hero-mark-anchor">
        <div className="hero-mark-tilt">
          <div className="hero-mark-scale relative">
            <div className="hero-mark-shadow" aria-hidden="true" />
            <BrandSymbol quiet={quiet} />
          </div>
        </div>
      </div>
    </>
  );
}
