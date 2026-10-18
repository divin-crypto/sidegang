import { memo, useId } from 'react';
import { cx } from '../lib/format';

/**
 * FAITH OVER FEAR — the `F > F` mark.
 *
 * Monumental, architectural letterforms inspired by Concept C (sculptural)
 * and Concept E (restrained metallic). Hand-built geometry on a 356×200 grid
 * with bespoke chevron. Layers: volumetric bloom → deep extrusion →
 * brushed-titanium bevel → dark-stone face → chamfer → rim light → specular.
 */

const F_LETTER = 'M10,25 H140 V62 H54 V90 H124 V122 H54 V175 H10 Z';
const CHEVRON = 'M150,58 L182,100 L150,142 L172,142 L204,100 L172,58 Z';

const EXTRUSION_STEPS = 10;

export type BrandSymbolProps = {
  className?: string;
  width?: string;
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

        {/* Architectural face: deep graphite with stone undertone, denser at crown */}
        <linearGradient id={id('face')} x1="0" y1="0" x2="0.28" y2="1">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.96" />
          <stop offset="22%" stopColor="#111111" stopOpacity="0.88" />
          <stop offset="52%" stopColor="#0D0D0D" stopOpacity="0.76" />
          <stop offset="100%" stopColor="#080808" stopOpacity="0.58" />
        </linearGradient>

        {/* Brushed titanium bevel — cool, restrained metallic */}
        <linearGradient id={id('bevel')} x1="0" y1="0" x2="0.85" y2="0.9">
          <stop offset="0%" stopColor="#e8e6e3" stopOpacity="0.22" />
          <stop offset="28%" stopColor="#c2bfbb" stopOpacity="0.14" />
          <stop offset="62%" stopColor="#a8a5a1" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#7E7E80" stopOpacity="0.04" />
        </linearGradient>

        {/* Rim light — brushed titanium edge, warmer on key side */}
        <linearGradient id={id('rim')} x1="0" y1="0" x2="1" y2="0.45">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="18%" stopColor="#F5F5F7" stopOpacity="0.92" />
          <stop offset="42%" stopColor="#e8e6e3" stopOpacity="0.58" />
          <stop offset="72%" stopColor="#a8a5a1" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.72" />
        </linearGradient>

        {/* Inner stone highlight */}
        <linearGradient id={id('inner')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Specular sweep — restrained */}
        <linearGradient id={id('sheen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="44%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff8ec" stopOpacity="0.18" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Soft volumetric bloom */}
        <filter id={id('bloom')} x="-35%" y="-45%" width="170%" height="200%">
          <feGaussianBlur stdDeviation="11" result="b" />
          <feColorMatrix
            in="b"
            type="matrix"
            values="0 0 0 0 0.96  0 0 0 0 0.96  0 0 0 0 0.97  0 0 0 0.45 0"
          />
        </filter>

        {/* Deep cast shadow with ambient occlusion */}
        <filter id={id('cast')} x="-50%" y="-40%" width="200%" height="210%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000000" floodOpacity="0.82" />
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.95" />
        </filter>

        {/* AO inside letterforms */}
        <filter id={id('ao')} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset dx="0" dy="2" result="off" />
          <feComposite in="off" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadow" />
          <feColorMatrix in="shadow" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
        </filter>

        <clipPath id={id('clip')}>
          <path d={F_LETTER} />
          <path d={F_LETTER} transform="translate(206 0)" />
          <path d={CHEVRON} />
        </clipPath>

        <pattern id={id('grain')} width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill="transparent" />
          <circle cx="20" cy="30" r="0.4" fill="#fff" opacity="0.12" />
          <circle cx="80" cy="60" r="0.5" fill="#fff" opacity="0.08" />
          <circle cx="50" cy="90" r="0.3" fill="#fff" opacity="0.10" />
        </pattern>
      </defs>

      {/* 0 — Distant volumetric bloom */}
      <g filter={`url(#${id('bloom')})`} opacity="0.42">
        <use href={`#${id('glyphs')}`} fill="#F5F5F7" />
      </g>

      {/* 1 — Deep extrusion: architectural side walls */}
      <g fill={`url(#${id('bevel')})`}>
        {Array.from({ length: EXTRUSION_STEPS }, (_, i) => {
          const step = EXTRUSION_STEPS - i;
          // Deeper extrusion for monumentality — perspective-correct offsets
          return (
            <g key={i} transform={`translate(${step * 0.95} ${step * 1.18})`}>
              <use href={`#${id('glyphs')}`} />
            </g>
          );
        })}
      </g>

      {/* 2 — Face with deep cast */}
      <g filter={`url(#${id('cast')})`}>
        <use href={`#${id('glyphs')}`} fill={`url(#${id('face')})`} />
      </g>

      {/* 3 — Inner stone gradient for depth */}
      <g clipPath={`url(#${id('clip')})`} opacity="0.9">
        <use href={`#${id('glyphs')}`} fill={`url(#${id('inner')})`} />
      </g>

      {/* 4 — AO */}
      <g filter={`url(#${id('ao')})`} opacity="0.5">
        <use href={`#${id('glyphs')}`} fill="#000" />
      </g>

      {/* 5 — Top chamfer — subtle machined edge */}
      <g clipPath={`url(#${id('clip')})`}>
        <use
          href={`#${id('glyphs')}`}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.38"
          strokeWidth="2.8"
          transform="translate(0 1.6)"
          strokeLinejoin="miter"
        />
        <use
          href={`#${id('glyphs')}`}
          fill="none"
          stroke="#F5F5F7"
          strokeOpacity="0.14"
          strokeWidth="0.9"
          transform="translate(-0.6 -0.6)"
        />
      </g>

      {/* 6 — Rim light — the defining titanium edge */}
      <use
        href={`#${id('glyphs')}`}
        fill="none"
        stroke={`url(#${id('rim')})`}
        strokeWidth="1.9"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        shapeRendering="geometricPrecision"
      />

      {/* 7 — Micro grain on face for stone/metal texture */}
      <g clipPath={`url(#${id('clip')})`} opacity="0.07">
        <use href={`#${id('glyphs')}`} fill={`url(#${id('grain')})`} />
      </g>

      {/* 8 — Specular sweep */}
      {!quiet && (
        <g clipPath={`url(#${id('clip')})`}>
          <rect className="brand-symbol__sheen" x="-480" y="-50" width="340" height="300" fill={`url(#${id('sheen')})`} />
        </g>
      )}
    </svg>
  );
}

export default memo(BrandSymbol);
