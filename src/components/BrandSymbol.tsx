import { memo, useId } from 'react';
import { cx } from '../lib/format';

/**
 * FAITH OVER FEAR — the `F > F` mark.
 *
 * This is not text: the two counterforms are hand-built geometry, drawn to a
 * 356 × 200 grid, with a bespoke chevron cut between them. The mark is built
 * from stacked layers (bloom → extruded bevel → smoked-glass face → rim light
 * → specular sweep) so it reads as a physical, dimensional object floating in
 * front of the figure.
 */

/** Left counterform. Stem 44 wide, 150 tall, arms cut at the same angle. */
const F_LETTER = 'M10,25 H140 V62 H54 V90 H124 V122 H54 V175 H10 Z';
/** The hand-drawn `>` that separates the two letters. */
const CHEVRON = 'M150,58 L182,100 L150,142 L172,142 L204,100 L172,58 Z';

const EXTRUSION_STEPS = 9;

export type BrandSymbolProps = {
  className?: string;
  /** Rendered as CSS width; height follows the 356:200 ratio. */
  width?: string;
  /** Disable the moving specular sweep (reduced motion / mobile). */
  quiet?: boolean;
  title?: string;
};

function BrandSymbol({
  className,
  width = '100%',
  quiet = false,
  title = 'Faith Over Fear — F greater than F',
}: BrandSymbolProps) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9_-]/g, '');
  const id = (name: string) => `${uid}-${name}`;

  return (
    <svg
      className={cx('block w-full', className)}
      style={{ width }}
      viewBox="0 0 356 200"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
    >
      <title>{title}</title>

      <defs>
        <g id={id('glyphs')}>
          <path d={F_LETTER} />
          <path d={F_LETTER} transform="translate(206 0)" />
          <path d={CHEVRON} />
        </g>

        {/* Smoked-glass face: dense at the top (where the head sits) and more
            transparent toward the base so the shoulders glow through. */}
        <linearGradient id={id('face')} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#0b0b0a" stopOpacity="0.88" />
          <stop offset="46%" stopColor="#0a0a09" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#080807" stopOpacity="0.5" />
        </linearGradient>

        {/* Rim light — cooler and brighter on the key-light side. */}
        <linearGradient id={id('rim')} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="#f6f2ea" stopOpacity="0.96" />
          <stop offset="38%" stopColor="#ece7dd" stopOpacity="0.72" />
          <stop offset="72%" stopColor="#9c968a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ece7dd" stopOpacity="0.68" />
        </linearGradient>

        {/* Bevel side faces. */}
        <linearGradient id={id('bevel')} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#d8d2c6" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#6f6a60" stopOpacity="0.05" />
        </linearGradient>

        {/* Moving specular sweep across the face. */}
        <linearGradient id={id('sheen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff8ec" stopOpacity="0.16" />
          <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id={id('bloom')} x="-30%" y="-40%" width="160%" height="190%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feColorMatrix
            in="b"
            type="matrix"
            values="0 0 0 0 0.92  0 0 0 0 0.90  0 0 0 0 0.86  0 0 0 0.5 0"
          />
        </filter>

        <filter id={id('cast')} x="-40%" y="-40%" width="190%" height="200%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.72" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.9" />
        </filter>

        <clipPath id={id('clip')}>
          <path d={F_LETTER} />
          <path d={F_LETTER} transform="translate(206 0)" />
          <path d={CHEVRON} />
        </clipPath>
      </defs>

      {/* 1 — Bloom: light escaping around the silhouette. */}
      <g filter={`url(#${id('bloom')})`} opacity="0.55">
        <use href={`#${id('glyphs')}`} fill="#ece7dd" />
      </g>

      {/* 2 — Extruded bevel: stacked offsets build a real side wall. */}
      <g fill={`url(#${id('bevel')})`}>
        {Array.from({ length: EXTRUSION_STEPS }, (_, i) => {
          const step = EXTRUSION_STEPS - i;
          return (
            <g key={i} transform={`translate(${step * 0.85} ${step * 1.05})`}>
              <use href={`#${id('glyphs')}`} />
            </g>
          );
        })}
      </g>

      {/* 3 — The face itself, casting onto the figure behind it. */}
      <g filter={`url(#${id('cast')})`}>
        <use href={`#${id('glyphs')}`} fill={`url(#${id('face')})`} />
      </g>

      {/* 4 — Chamfer highlight along the top edges. */}
      <g clipPath={`url(#${id('clip')})`}>
        <use
          href={`#${id('glyphs')}`}
          fill="none"
          stroke="#fbf7ef"
          strokeOpacity="0.4"
          strokeWidth="4"
          transform="translate(0 2.4)"
        />
      </g>

      {/* 5 — Rim light. */}
      <use
        href={`#${id('glyphs')}`}
        fill="none"
        stroke={`url(#${id('rim')})`}
        strokeWidth="1.7"
        strokeLinejoin="miter"
        strokeMiterlimit="8"
      />

      {/* 6 — Specular sweep, clipped to the face. */}
      {!quiet && (
        <g clipPath={`url(#${id('clip')})`}>
          <rect className="brand-symbol__sheen" x="-420" y="-40" width="300" height="280" fill={`url(#${id('sheen')})`} />
        </g>
      )}
    </svg>
  );
}

export default memo(BrandSymbol);
