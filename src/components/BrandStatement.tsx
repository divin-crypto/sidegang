import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '../config/site';
import { useReducedMotion } from '../hooks/useMediaQuery';
import Reveal from './Reveal';

gsap.registerPlugin(ScrollTrigger);

const { statement } = site;

export default function BrandStatement() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ghostRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const ghost = ghostRef.current;
    if (!root || !ghost || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ghost,
        { xPercent: 6 },
        {
          xPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="statement"
      ref={rootRef}
      className="relative overflow-hidden border-t border-bone/10 bg-ink py-28 md:py-40"
      aria-labelledby="statement-title"
    >
      {/* oversized drifting ghost word — the "editorial visual transition" */}
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="u-display pointer-events-none absolute left-[-4vw] top-1/2 -z-0 select-none whitespace-nowrap text-[26vw] leading-none text-bone/[0.045] md:text-[19vw]"
      >
        FAITH OVER FEAR
      </span>

      <div className="u-fluid-gutter relative">
        <Reveal>
          <p className="u-label text-bone/45">{statement.index}</p>
        </Reveal>

        <h2
          id="statement-title"
          className="u-display mt-8 max-w-[16ch] text-[clamp(2.6rem,9.4vw,8.5rem)] text-bone md:mt-12"
        >
          {statement.lines.map((line, i) => (
            <Reveal key={line} as="span" className="block" delay={0.06 * i} y={64}>
              {line}
            </Reveal>
          ))}
          <Reveal as="span" className="block text-ember" delay={0.2} y={64}>
            {statement.emphasis}
          </Reveal>
        </h2>

        <div className="mt-14 grid grid-cols-12 gap-8 md:mt-20">
          <Reveal className="col-span-12 md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="u-body max-w-xl">{statement.body}</p>
            <p className="u-label u-label--tight mt-8 text-bone/35">{statement.meta}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
