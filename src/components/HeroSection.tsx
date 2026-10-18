import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroMedia from './HeroMedia';
import AtmosphereCanvas from './AtmosphereCanvas';
import BrandFrame from './BrandFrame';
import { heroMedia, site } from '../config/site';
import { useReducedMotion, useIsCompact } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const { hero } = site;

/**
 * HeroSection — the signature F–Human–F experience.
 * Layers (z order):
 * 0 wash → 1 figure behind → 3 mark (SVG + optional Three.js) → 4 interlace → 5 haze → 6 grain → 7 vignette → 8 frame → 9 copy
 * Timing per research report:
 * 0.0–0.5 atmosphere · 0.5–1.2 frame · 1.0–2.0 sculptural Fs · 1.5–2.5 human · 2.0–3.0 final settle
 */
export default function HeroSection({ onReady }: { onReady?: () => void } = {}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const markRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const interlaceRef = useRef<HTMLDivElement | null>(null);
  const washRef = useRef<HTMLDivElement | null>(null);

  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  const handleReady = useCallback(() => {
    setReady(true);
    onReady?.();
  }, [onReady]);
  const reduced = useReducedMotion();
  const compact = useIsCompact();

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pointer-responsive depth (desktop only)
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

  // Intro + scroll choreography — matches spec timings
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>('[data-reveal]');

      if (reduced) {
        gsap.set(lines, { opacity: 1, y: 0, yPercent: 0 });
        gsap.set(markRef.current, { opacity: 1, scale: 1, y: 0 });
        gsap.set(interlaceRef.current, { opacity: 0.55 });
        gsap.set(frameRef.current, { opacity: 1 });
        gsap.set(washRef.current, { opacity: 1 });
        return;
      }

      // --- opening state (0.0s) ---
      gsap.set(washRef.current, { opacity: 0 });
      gsap.set(frameRef.current, { opacity: 0 });
      if (frameRef.current) {
        const rect = frameRef.current.querySelector('.hero-frame__rect') as SVGElement | null;
        if (rect) gsap.set(rect, { strokeDashoffset: 1 });
      }
      gsap.set(lines, { yPercent: 118, opacity: 0 });
      gsap.set(markRef.current, { opacity: 0, scale: 0.82, y: 44, rotationY: -8 });
      gsap.set(figureRef.current, { opacity: 0, scale: 1.16, filter: 'brightness(0.2) saturate(0)' });
      gsap.set(interlaceRef.current, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, paused: true });

      // 0.0–0.5 atmosphere
      tl.to(washRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
        // 0.5–1.2 frame reveal (stroke draw)
        .to(frameRef.current, { opacity: 1, duration: 0.35 }, 0.4)
        .to(
          frameRef.current?.querySelector('.hero-frame__rect') as unknown as HTMLElement,
          { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' },
          0.5,
        )
        // 1.0–2.0 sculptural forms emerge
        .to(markRef.current, { opacity: 1, scale: 1, y: 0, rotationY: 0, duration: 1.45, ease: 'expo.out' }, 0.95)
        .to(figureRef.current, { opacity: 1, scale: 1, filter: 'brightness(1) saturate(0)', duration: 1.6, ease: 'power2.out' }, 0.85)
        // 1.5–2.5 human emergence via interlace + lighting
        .to(interlaceRef.current, { opacity: 0.55, duration: 1.4, ease: 'power2.out' }, 1.45)
        // 2.0–3.0 final composition — headline settles
        .to(lines, { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.1, ease: 'expo.out' }, 1.85);

      if (ready) tl.play();
      (root as HTMLElement & { __heroIntro?: gsap.core.Timeline }).__heroIntro = tl;

      // --- scroll: monumental parallax dive into collection ---
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        })
        .to(markRef.current, { y: -84, scale: 1.16, opacity: 0.22, rotationY: 6, ease: 'none' }, 0)
        .to(figureRef.current, { scale: 1.12, y: -38, opacity: 0.32, ease: 'none' }, 0)
        .to(interlaceRef.current, { opacity: 0.12, ease: 'none' }, 0)
        .to(copyRef.current, { y: -72, opacity: 0, ease: 'none' }, 0)
        .to(frameRef.current, { opacity: 0.12, scale: 1.04, ease: 'none' }, 0)
        .to(washRef.current, { opacity: 0.35, ease: 'none' }, 0);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (ready) return;
    const t = window.setTimeout(() => setReady(true), 2800);
    return () => window.clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current as (HTMLElement & { __heroIntro?: gsap.core.Timeline }) | null;
    root?.__heroIntro?.play();
  }, [ready]);

  return (
    <section id="hero" ref={rootRef} className="hero-stage" aria-label="Faith Over Fear RW — hero">
      <div ref={washRef} className="hero-wash" aria-hidden="true" />

      {/* Layer 1 — figure behind the mark */}
      <div ref={figureRef} className="hero-figure-wrap">
        <HeroMedia onReady={handleReady} reducedMotion={reduced} paused={!inView} />
      </div>

      {/* Layer 4 — interlace: must stay DIRECT child of stage for screen blend */}
      <div
        ref={interlaceRef}
        className="hero-figure hero-figure--interlace"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${heroMedia.type === 'video' ? heroMedia.video.poster : heroMedia.image.src})`,
        }}
      />

      {/* Layer 5 — volumetric haze (direct child, additive) */}
      <AtmosphereCanvas intensity={compact ? 0.68 : 0.95} />

      {/* Layer 3 — monumental F>F — SVG mark is always rendered, Three.js enhances behind */}
      <div className="hero-mark-anchor">
        <div className="hero-mark-tilt">
          <div ref={markRef} className="hero-mark-scale relative">
            <div className="hero-mark-shadow" aria-hidden="true" />
            {/* Lazy 3D canvas would sit behind but SVG mark stays primary for readability */}
            <div className="relative">
              {/* BrandSymbol is the guaranteed readable mark */}
              <div className="relative z-[1]">
                {/* Import dynamically to avoid circular; BrandSymbol directly */}
                <HeroMark />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 8 — architectural frame */}
      <div ref={frameRef} className="hero-frame__wrap">
        <BrandFrame quiet={reduced} />
      </div>

      {/* Grain + vignette */}
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* Messaging */}
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
              <a className="link-underline u-label u-label--tight text-bone/70 hover:text-bone" href={hero.secondaryCta.href}>
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

// Keep mark import isolated to avoid circular chunk issues
import BrandSymbol from './BrandSymbol';
function HeroMark() {
  return <BrandSymbol quiet={false} />;
}
