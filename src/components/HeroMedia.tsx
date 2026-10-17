import { useEffect, useRef, useState } from 'react';
import { heroMedia } from '../config/site';

const { image, video } = heroMedia;

/** `play()` can reject (autoplay policy) or throw (non-browser envs). */
function safePlay(el: HTMLVideoElement) {
  try {
    const res = el.play();
    if (res && typeof res.catch === 'function') res.catch(() => undefined);
  } catch {
    /* autoplay blocked — the poster stays visible */
  }
}

type Props = {
  /** Fires once the first hero frame is painted so the veil can lift. */
  onReady?: () => void;
  /** Skip autoplaying video for reduced-motion visitors. */
  reducedMotion?: boolean;
  paused?: boolean;
};

/**
 * The figure plate.
 *
 * MODE A (`heroMedia.type = "video"`)  → local cinematic loop, muted, inline,
 *                                        with poster + automatic image fallback.
 * MODE B (`heroMedia.type = "image"`)  → high-resolution still, with the same
 *                                        depth treatment driven by CSS.
 *
 * Two plates are produced:
 *   • back       — the body standing BEHIND the F > F mark
 *   • interlace  — the same frame screened back over the mark so the shoulders
 *                  and head genuinely wrap around the letterforms
 */
export default function HeroMedia({ onReady, reducedMotion = false, paused = false }: Props) {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readyFired = useRef(false);

  const wantsVideo = heroMedia.type === 'video' && !videoFailed && !reducedMotion;

  const signalReady = () => {
    if (readyFired.current) return;
    readyFired.current = true;
    onReady?.();
  };

  // Never let a missing/decoding video leave an empty hero.
  useEffect(() => {
    if (!wantsVideo) return;
    const el = videoRef.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      if (el.readyState < 2) setVideoFailed(true);
    }, 4500);
    return () => window.clearTimeout(t);
  }, [wantsVideo]);

  // Pause when the tab is hidden or the hero is scrolled away.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !wantsVideo) return;
    if (paused || document.hidden) {
      if (!el.paused) el.pause();
    } else {
      safePlay(el);
    }
  }, [paused, wantsVideo]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !wantsVideo) return;
    const onVisibility = () => {
      if (document.hidden) el.pause();
      else if (!paused) safePlay(el);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [paused, wantsVideo]);

  return (
    <>
      {/* ---------------- back plate ---------------- */}
      <div className="hero-figure" data-layer="back" aria-hidden="true">
        {wantsVideo ? (
          <video
            ref={videoRef}
            className="hero-figure__media"
            poster={video.poster}
            autoPlay
            muted
            loop={video.loop}
            playsInline
            preload="auto"
            disablePictureInPicture
            onError={() => setVideoFailed(true)}
            onLoadedData={signalReady}
            onCanPlay={signalReady}
          >
            <source src={video.webm} type="video/webm" onError={() => setVideoFailed(true)} />
            <source src={video.mp4} type="video/mp4" onError={() => setVideoFailed(true)} />
          </video>
        ) : (
          <picture>
            <source
              type="image/webp"
              sizes="100vw"
              srcSet={`${image.smallWebp} 1280w, ${image.webp} 1920w`}
            />
            <img
              className="hero-figure__media"
              src={image.src}
              sizes="100vw"
              srcSet={`${image.small} 1280w, ${image.src} 1920w`}
              alt=""
              decoding="async"
              data-hero-still="true"
              onLoad={signalReady}
              onError={signalReady}
            />
          </picture>
        )}
      </div>

    </>
  );
}
