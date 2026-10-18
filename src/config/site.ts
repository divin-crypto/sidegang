/**
 * FAITH OVER FEAR RW — single source of truth for brand content, links and
 * hero media. Everything the page renders is driven from here so copy,
 * destinations and media can be swapped without touching components.
 */

export type HeroMediaType = 'video' | 'image';

export type HeroMediaConfig = {
  /**
   * ONE switch for the whole hero.
   *   "video" → uses the local cinematic loop (WebM + MP4 + poster)
   *   "image" → uses the high-resolution still with CSS/WebGL depth treatment
   *
   * If the configured video cannot be decoded the hero automatically falls
   * back to the still, so the section is never empty.
   */
  type: HeroMediaType;
  video: {
    webm: string;
    mp4: string;
    poster: string;
    /** seconds of playback before the loop restarts; 0 = play through */
    loop: boolean;
  };
  image: {
    /** wide desktop still (avif/webp/jpg are all generated) */
    src: string;
    webp: string;
    /** lighter still used below the fold-width breakpoints / save-data */
    small: string;
    smallWebp: string;
    poster: string;
  };
  /**
   * Composition controls, calibrated against the luminance map of the figure
   * plate so that:
   *   • the head sits in the clear space ABOVE the mark (never cropped)
   *   • the shoulder line crosses the mark's upper half and is screened back
   *     over it, so the body genuinely wraps the letterforms
   * Mobile re-stages these in index.css rather than just scaling them down.
   */
  composition: {
    /** `object-position` of the figure inside the hero frame */
    focusX: string;
    focusY: string;
    /** extra scale applied to the figure layer (depth push) */
    scale: number;
    /** vertical centre of the mark, as a % of the hero height */
    markCenterY: number;
    /** width of the mark as a % of the viewport width (desktop) */
    markWidthVw: number;
    /** width of the mark as a % of the viewport width (mobile) */
    markWidthVwMobile: number;
  };
};

/**
 * Build-time override, e.g. `VITE_HERO_TYPE=video npm run build`.
 * The value in `type` below always wins when the variable is not set.
 */
const envHeroType = import.meta.env?.VITE_HERO_TYPE as HeroMediaType | undefined;

export const heroMedia: HeroMediaConfig = {
  type: envHeroType ?? 'image',
  video: {
    webm: '/media/hero-motion.webm',
    mp4: '/media/hero-motion.mp4',
    poster: '/media/hero-poster.jpg',
    loop: true,
  },
  image: {
    src: '/media/hero-figure-1920.jpg',
    webp: '/media/hero-figure-1920.webp',
    small: '/media/hero-figure-1280.jpg',
    smallWebp: '/media/hero-figure-1280.webp',
    poster: '/media/hero-poster.jpg',
  },
  composition: {
    focusX: '70%',
    focusY: '34%',
    scale: 1.05,
    markCenterY: 55,
    markWidthVw: 42,
    markWidthVwMobile: 68,
  },
};

/** The live storefront. Every shopping action points at the real shop. */
export const STORE_ORIGIN = 'https://faithoverfearrw.netlify.app';

export const site = {
  name: 'FAITH OVER FEAR RW',
  shortName: 'F>F',
  tagline: 'Walk by faith. Live without fear.',
  wordmark: ['FAITH', 'OVER', 'FEAR'],
  location: 'Kigali, Rwanda',

  hero: {
    eyebrow: 'FAITH OVER FEAR RW — EST. KIGALI',
    headline: ['WALK BY FAITH.', 'LIVE WITH COURAGE.'],
    support: 'Wear your conviction. Move with purpose.',
    primaryCta: { label: 'SHOP THE COLLECTION', href: '#collection' },
    secondaryCta: { label: 'OUR PURPOSE', href: '#purpose' },
    scrollHint: 'SCROLL',
  },

  nav: {
    links: [
      { label: 'Collection', href: '#collection' },
      { label: 'Campaign', href: '#campaign' },
      { label: 'Purpose', href: '#purpose' },
    ],
    shop: { label: 'SHOP', href: `${STORE_ORIGIN}/shop` },
  },

  statement: {
    index: '01 — THE DECLARATION',
    lines: ['FAITH OVER', 'FEAR IS NOT', 'A LABEL.'],
    emphasis: "IT'S A DECLARATION.",
    body: 'Born in the streets of Rwanda and designed for the global movement, we bridge the gap between spiritual conviction and streetwear culture. Every piece carries a message. Every stitch represents a stand.',
    meta: 'FAITH OVER FEAR RW · KIGALI',
  },

  collection: {
    index: '02 — THE COLLECTION',
    title: 'JUST DROPPED',
    lede: 'Limited production. Real inventory, real prices, shipped from Kigali.',
    cta: 'SHOP ALL',
  },

  campaign: {
    index: '03 — THE CAMPAIGN',
    title: 'ABIDE',
    scripture: 'JOHN 15 · JOHN 3:30',
    body: 'Elevate your daily walk with the Abide Collection — thoughtfully designed faith apparel and lifestyle goods rooted in Scripture. Featuring premium, ethically sourced materials and subtle, intentional designs, each piece serves as a tangible, quiet reminder to rest in His presence throughout your day.',
    secondaryTitle: 'GENESIS',
    secondaryBody:
      'Step into the foundation of purpose. Inspired by creation, faith, and timeless design, the Genesis drop marks a fresh start for modern streetwear centered around a higher calling. Built with premium fabrics, bold minimalist aesthetics, and intentional details, every piece serves as a wearable testimony.',
  },

  purpose: {
    index: '04 — OUR PURPOSE',
    title: 'WE CREATE ARMOUR FOR THE BOLD',
    blocks: [
      {
        label: 'Our Conviction',
        body: "Faith Over Fear isn't just a label; it's a declaration. Born in the streets of Rwanda and designed for the global movement, we bridge the gap between spiritual conviction and streetwear culture.",
      },
      {
        label: 'The Quality',
        body: 'Every piece is engineered for longevity and comfort. From our 400GSM heavyweight hoodies to our precision-cut essential tees, we prioritize the fabric that carries our message.',
      },
      {
        label: 'The Stand',
        body: "We don't just make clothing; we create armor for the bold, the believers, and the brave. Designed in Kigali. Crafted for the world. F>F represents more than fashion; it's a mindset that refuses to be silenced.",
      },
    ],
    cta: { label: 'GET IN TOUCH', href: `${STORE_ORIGIN}/contact` },
  },

  finalCta: {
    index: '05 — THE INVITATION',
    title: 'WEAR YOUR CONVICTION.',
    body: 'The collection is live. Sizes move fast and production runs are limited.',
    cta: { label: 'SHOP THE COLLECTION', href: `${STORE_ORIGIN}/shop` },
    secondary: { label: 'JOIN THE WAITLIST', href: `${STORE_ORIGIN}/shop` },
  },

  contact: {
    email: 'faithoverfearsupport@gmail.com',
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/faithoverfear.rw__/' },
      { label: 'TikTok', href: 'https://tiktok.com/@faithoverfear_brand' },
    ],
    location: 'Kigali, Rwanda',
  },

  footer: {
    note: 'Designed in Kigali. Crafted for the world.',
    links: [
      { label: 'Shop', href: `${STORE_ORIGIN}/shop` },
      { label: 'About', href: `${STORE_ORIGIN}/about` },
      { label: 'Contact', href: `${STORE_ORIGIN}/contact` },
      { label: 'Sign Up', href: `${STORE_ORIGIN}/signup` },
      { label: 'Login', href: `${STORE_ORIGIN}/login` },
    ],
  },
} as const;

/** Live catalogue endpoint (same API the production storefront reads). */
export const CATALOG_API = `${STORE_ORIGIN}/api/products`;
