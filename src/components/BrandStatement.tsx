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
    <section id="statement" ref={rootRef} className="relative overflow-hidden border-t border-bone/[0.07] bg-ink py-28 md:py-40" aria-labelledby="statement-title">
      <span
        ref={ghostRef}
        aria-hidden="true"
        className="u-display pointer-events-none absolute left-[-4vw] top-1/2 -z-0 select-none whitespace-nowrap text-[26vw] leading-none text-bone/[0.038] md:text-[19vw]"
      >
        FAITH OVER FEAR
      </span>

      {/* Stone texture hint */}
      <span className="pointer-events-none absolute inset-0 opacity-[0.018]" aria-hidden="true" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />

      <div className="u-fluid-gutter relative">
        <Reveal>
          <p className="u-label text-bone/40">{statement.index}</p>
        </Reveal>
        <h2 id="statement-title" className="u-display mt-8 max-w-[16ch] text-[clamp(2.6rem,9.4vw,8.2rem)] tracking-[-0.05em] text-bone md:mt-12">
          {statement.lines.map((line, i) => (
            <Reveal key={line} as="span" className="block" delay={0.06 * i} y={64}>
              {line}
            </Reveal>
          ))}
          <Reveal as="span" className="block text-bone" delay={0.22} y={64}>
            <span className="text-ember">{statement.emphasis}</span>
          </Reveal>
        </h2>
        <div className="mt-12 h-px w-full max-w-4xl bg-gradient-to-r from-bone/20 via-bone/6 to-transparent" aria-hidden="true" />
        <div className="mt-14 grid grid-cols-12 gap-8 md:mt-20">
          <Reveal className="col-span-12 md:col-span-6 md:col-start-7" delay={0.12}>
            <p className="u-body max-w-xl text-bone/75">{statement.body}</p>
            <p className="u-label u-label--tight mt-8 text-bone/30">{statement.meta}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
