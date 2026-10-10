import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrub-linked vertical drift for imagery. Purely decorative, never affects
 * layout, and disabled entirely under `prefers-reduced-motion`.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  distance = 70,
  options: { scale?: number } = {},
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -distance / 10, scale: options.scale ?? 1.08 },
        {
          yPercent: distance / 10,
          scale: options.scale ?? 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [distance, options.scale, reduced, ref]);
}
