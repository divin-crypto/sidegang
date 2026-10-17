import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** travel distance in px */
  y?: number;
  delay?: number;
  duration?: number;
  /** clip-path wipe instead of a slide (used for imagery) */
  wipe?: boolean;
  start?: string;
};

/**
 * One-shot scroll reveal. Falls back to fully visible content when the visitor
 * prefers reduced motion, when GSAP is unavailable, or if the element is
 * already inside the viewport on load.
 */
export default function Reveal({
  children,
  className,
  as: Tag = 'div',
  y = 44,
  delay = 0,
  duration = 1.05,
  wipe = false,
  start = 'top 88%',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      const from = wipe
        ? { clipPath: 'inset(0% 0% 100% 0%)', opacity: 1, y: 0 }
        : { y, opacity: 0 };
      const to = wipe
        ? { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration, delay, ease: 'power3.inOut' }
        : { y: 0, opacity: 1, duration, delay, ease: 'expo.out' };

      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, duration, reduced, start, wipe, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
