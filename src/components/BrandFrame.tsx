type Props = {
  quiet?: boolean;
};

/**
 * Monolithic frame — architectural border drawn from the original hand sketch.
 * Implements SVG stroke-dash animation for the required 0.5–1.2s frame reveal.
 */
export default function BrandFrame(_props: Props) {

  return (
    <div className="hero-frame" aria-hidden="true">
      {/* SVG border with animated stroke */}
      <svg
        className="hero-frame__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          className="hero-frame__rect"
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          fill="none"
          stroke="rgba(245,245,247,0.14)"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 0,
          } as React.CSSProperties}
        />
        {/* Inner hairline for depth */}
        <rect
          x="1.2"
          y="1.2"
          width="97.6"
          height="97.6"
          fill="none"
          stroke="rgba(245,245,247,0.04)"
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Corner ticks — monumental, like stone joints */}
      <span className="hero-frame__tick hero-frame__tick--tl" />
      <span className="hero-frame__tick hero-frame__tick--tr" />
      <span className="hero-frame__tick hero-frame__tick--bl" />
      <span className="hero-frame__tick hero-frame__tick--br" />

      {/* Subtle inner glow */}
      <span className="hero-frame__glow" aria-hidden="true" />
    </div>
  );
}
