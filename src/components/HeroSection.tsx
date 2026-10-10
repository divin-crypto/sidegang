import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrandSymbol from './BrandSymbol';
import HeroMedia from './HeroMedia';
import AtmosphereCanvas from './AtmosphereCanvas';
import { heroMedia, site } from '../config/site';
import { useReducedMotion, useIsCompact } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const { hero } = site;

export default function HeroSection({ onReady }: { onReady?: () => void } = {}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const interlaceRef = useRef<HTMLDivElement | null>(null);

  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  const handleReady = useCallback(() => {
    setReady(true);
    onReady?.();
  }, [onReady]);
  const reduced = useReducedMotion();
  const compact = useIsCompact();

  /* ---------------------------------------------------------------- *
   * Pause everything expensive once the hero leaves the viewport.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ---------------------------------------------------------------- *
   * Pointer-responsive depth (desktop only, never on touch).
   * Written as CSS variables so it never fights the GSAP transforms.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx;
      targetY = ny;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      el.style.setProperty('--hero-px', `${(-curX * 16).toFixed(2)}px`);
      el.style.setProperty('--hero-py', `${(-curY * 12).toFixed(2)}px`);
      el.style.setProperty('--hero-ry', `${(curX * 7).toFixed(2)}deg`);
      el.style.setProperty('--hero-rx', `${(-curY * 5).toFixed(2)}deg`);
      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  /* ---------------------------------------------------------------- *
   * Intro + scroll choreography
   * ---------------------------------------------------------------- */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-reveal]');

      if (reduced) {
        gsap.set(lines, { opacity: 1, y: 0, yPercent: 0 });
        gsap.set(markRef.current, { opacity: 1, scale: 1, y: 0 });
        gsap.set(interlaceRef.current, { opacity: 0.55 });
        return;
      }

      // --- opening state ---
      gsap.set(lines, { yPercent: 118, opacity: 0 });
      gsap.set(markRef.current, { opacity: 0, scale: 0.86, y: 34 });
      gsap.set(figureRef.current, { opacity: 0, scale: 1.14 });
      gsap.set(interlaceRef.current, { opacity: 0 });
      gsap.set(frameRef.current, { opacity: 0, scale: 1.02 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, paused: true });

      tl.to(figureRef.current, { opacity: 1, scale: 1, duration: 2.1, ease: 'power2.out' }, 0)
        .to(frameRef.current, { opacity: 1, scale: 1, duration: 1.6 }, 0.25)
        .to(markRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.9, ease: 'expo.out' }, 0.45)
        .to(interlaceRef.current, { opacity: 0.55, duration: 2.2, ease: 'power2.out' }, 0.7)
        .to(
          lines,
          { yPercent: 0, opacity: 1, duration: 1.25, stagger: 0.11, ease: 'expo.out' },
          0.85,
        );

      if (ready) tl.play();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      (root as HTMLElement & { __heroIntro?: gsap.core.Timeline }).__heroIntro = tl;

      // --- scroll: a controlled dive from the mark into the collection ---
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        .to(markRef.current, { y: -70, scale: 1.14, opacity: 0.28, ease: 'none' }, 0)
        .to(figureRef.current, { scale: 1.1, y: -30, opacity: 0.35, ease: 'none' }, 0)
        .to(interlaceRef.current, { opacity: 0.18, ease: 'none' }, 0)
        .to(copyRef.current, { y: -60, opacity: 0, ease: 'none' }, 0)
        .to(frameRef.current, { opacity: 0.15, scale: 1.03, ease: 'none' }, 0);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  // Play the intro once the first frame is on screen — with a hard ceiling so
  // a slow network can never leave the hero invisible.
  useEffect(() => {
    if (ready) return;
    const t = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current as (HTMLElement & { __heroIntro?: gsap.core.Timeline }) | null;
    root?.__heroIntro?.play();
  }, [ready]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="hero-stage"
      aria-label="Faith Over Fear RW — hero"
    >
      <div className="hero-wash" aria-hidden="true" />

      {/* Layer 1 — figure behind the mark */}
      <div ref={figureRef} className="hero-figure-wrap">
        <HeroMedia onReady={handleReady} reducedMotion={reduced} paused={!inView} />
      </div>

      {/* Layer 4 — the same figure screened back over the mark. It must stay a
          DIRECT child of the stage: any wrapper that forms an isolated group
          (z-index, will-change, opacity) would cut the blend off from the mark
          underneath and flatten the effect. */}
      <div
        ref={interlaceRef}
        className="hero-figure hero-figure--interlace"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${
            heroMedia.type === 'video' ? heroMedia.video.poster : heroMedia.image.src
          })`,
        }}
      />

      {/* Layer 5 — volumetric haze */}
      <AtmosphereCanvas intensity={compact ? 0.68 : 0.95} />

      {/* Layer 3 — the monumental F > F */}
      <div className="hero-mark-anchor">
        <div className="hero-mark-tilt">
          <div ref={markRef} className="hero-mark-scale relative">
            <div className="hero-mark-shadow" aria-hidden="true" />
            <BrandSymbol quiet={reduced} />
          </div>
        </div>
      </div>

      {/* Layer 8 — the frame from the original sketch */}
      <div ref={frameRef} className="hero-frame" aria-hidden="true">
        <span className="hero-frame__border" />
        <span className="hero-frame__tick hero-frame__tick--tl" />
        <span className="hero-frame__tick hero-frame__tick--tr" />
        <span className="hero-frame__tick hero-frame__tick--bl" />
        <span className="hero-frame__tick hero-frame__tick--br" />
      </div>

      {/* Layer 6/7 — grain + vignette */}
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* Layer 9 — messaging */}
      <div className="hero-eyebrow">
        <p className="u-label text-bone/60" data-reveal>
          {hero.eyebrow}
        </p>
      </div>

      <div ref={copyRef} className="hero-copy">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h1 className="u-display text-[clamp(2.4rem,min(7.4vw,11.5vh),7.5rem)] text-bone">
            {hero.headline.map((line) => (
              <span key={line} className="reveal-line">
                <span data-reveal>{line}</span>
              </span>
            ))}
          </h1>

          <div className="flex max-w-sm flex-col gap-7 lg:items-end lg:pb-2">
            <p className="u-body lg:text-right" data-reveal>
              {hero.support}
            </p>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end" data-reveal>
              <a className="btn-outline" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </a>
              <a
                className="link-underline u-label u-label--tight text-bone/70 hover:text-bone"
                href={hero.secondaryCta.href}
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scrollcue hidden md:block" aria-hidden="true">
        <span className="u-label u-label--tight text-bone/45">{hero.scrollHint}</span>
        <span className="mx-auto mt-3 block h-10 w-px bg-gradient-to-b from-bone/50 to-transparent" />
      </div>
    </section>
  );
}
