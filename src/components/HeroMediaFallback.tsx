import { heroMedia } from '../config/site';

type Props = {
  onReady?: () => void;
};

/**
 * HeroMediaFallback — guaranteed static image when WebGL/video unavailable.
 * High-quality, poster-anchored, never leaves hero empty.
 */
export default function HeroMediaFallback({ onReady }: Props) {
  const { image } = heroMedia;
  return (
    <div className="hero-figure" data-layer="back" aria-hidden="true">
      <picture>
        <source type="image/webp" sizes="100vw" srcSet={`${image.smallWebp} 1280w, ${image.webp} 1920w`} />
        <img
          className="hero-figure__media"
          src={image.src}
          sizes="100vw"
          srcSet={`${image.small} 1280w, ${image.src} 1920w`}
          alt=""
          decoding="async"
          data-hero-still="true"
          onLoad={onReady}
          onError={onReady}
        />
      </picture>
    </div>
  );
}
