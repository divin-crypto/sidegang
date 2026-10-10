/**
 * Real FAITH OVER FEAR RW catalogue.
 *
 * Snapshot taken from the brand's live storefront API
 * (https://faithoverfearrw.netlify.app/api/products) so every name,
 * description, price, colour and photograph below is authentic.
 *
 * The page prefers this snapshot (it always renders, even offline) and will
 * transparently upgrade itself with the live catalogue at runtime — see
 * `src/data/useCatalog.ts`.
 */

export type ProductTier = 'feature' | 'standard' | 'accessory';

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Price in Rwandan francs. `null` when the store has not published one. */
  price: number | null;
  currency: 'FRW';
  colors: string[];
  sizes: string[];
  /** Cloudinary paths (everything after `/image/upload/`). */
  imagePaths: string[];
  status: 'live' | 'draft' | 'archived';
  quantity: number;
  tier: ProductTier;
  /** Alt text fallback derived from the real product description. */
  alt?: string;
};

export const CLOUDINARY_BASE = 'https://res.cloudinary.com/dae1z71ru/image/upload';

/**
 * Build a responsive Cloudinary URL. `f_auto` + `q_auto` let Cloudinary pick
 * WebP/AVIF and the right quality per browser.
 */
export function cloudinary(path: string, width: number, opts: { dpr?: number; crop?: boolean } = {}): string {
  const transforms = [`w_${Math.round(width)}`, 'f_auto', 'q_auto'];
  if (opts.dpr) transforms.push(`dpr_${opts.dpr}`);
  if (opts.crop) transforms.push('c_fill', 'g_auto');
  return `${CLOUDINARY_BASE}/${transforms.join(',')}/${path}`;
}

export const products: Product[] = [
  {
    id: '3c378761-0887-4fef-b916-0906aad3f186',
    slug: 'faith-over-fear-classic-crest-long-sleeve',
    name: 'Faith Over Fear Classic Crest Long Sleeve',
    description:
      'A heavyweight streetwear long-sleeve featuring a bold chest crest logo that combines signature typography with an emblem of endurance.',
    price: 23000,
    currency: 'FRW',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: [
      'v1786201265/fof/admin/d7fsuugtgnbj20nd6fk2.png',
      'v1786201272/fof/admin/idhd5ti1qlzzuugty3wj.png',
    ],
    status: 'live',
    quantity: 1564321,
    tier: 'feature',
  },
  {
    id: '101d28c7-6671-4a76-a3f3-6f875a2d8b48',
    slug: 'jesus-walks-beside-me-every-day',
    name: 'Jesus Walks Beside Me Every Day',
    description:
      'A faith-inspired, vintage-washed streetwear t-shirt featuring the uplifting message "Jesus Walks Beside Me Every Day". Relaxed oversized fit with bold typography.',
    price: 17000,
    currency: 'FRW',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: ['v1786203520/fof/admin/hfe0iao2mefgrjv9wea2.png'],
    status: 'live',
    quantity: 154321,
    tier: 'feature',
  },
  {
    id: 'd38bfc40-b10e-451a-808f-8fb8c628611a',
    slug: 'abide-script-outline-tee',
    name: 'Abide Script Outline Tee',
    description:
      'A sleek, modern apparel piece featuring stylized Abide branding with clean lines for everyday casual faith wear.',
    price: 17000,
    currency: 'FRW',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: [
      'v1786104902/fof/admin/j5k3wvobobz3uhibhor0.jpg',
      'v1786136465/fof/admin/rdh3z46dtl7geimxjloq.png',
    ],
    status: 'live',
    quantity: 1432,
    tier: 'standard',
  },
  {
    id: '364ea36d-882c-4718-92c6-3183c5cb0e86',
    slug: 'all-we-love-is-god-tee',
    name: 'All We Love Is God Tee',
    description:
      'A statement back-print graphic tee featuring heavy block typography with a pixelated "God" effect and a signature red accent circle.',
    price: 17000,
    currency: 'FRW',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: [
      'v1786127695/fof/admin/s3ud0p6tfraooare1pbk.jpg',
      'v1786136469/fof/admin/gk20zuaskiswnc9xxzn6.png',
    ],
    status: 'live',
    quantity: 1432,
    tier: 'standard',
  },
  {
    id: '655de73c-9a94-409b-a653-3446f5eb0c4b',
    slug: 'the-gaze-long-crop',
    name: 'The Gaze Long Crop',
    description:
      'A modern graphic tee centred around a striking eye graphic alongside a sleek "F > F" badge layout, representing keeping your focus anchored above.',
    price: 17000,
    currency: 'FRW',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: ['v1786129670/fof/admin/sw6zlewrleat5s34ygo9.png'],
    status: 'live',
    quantity: 154321,
    tier: 'standard',
  },
  {
    id: 'ea21427f-0d52-4b83-a07d-4dde76668c83',
    slug: 'heritage-script-signature-tee',
    name: 'Heritage Script Signature Tee',
    description:
      'A classic casual tee with bold, script-style branding designed for everyday wear and comfort.',
    price: 17000,
    currency: 'FRW',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: [
      'v1786131336/fof/admin/ms6sxd7xhqrcjucvpd61.jpg',
      'v1786131529/fof/admin/qoolmih3g70toufpksao.png',
    ],
    status: 'live',
    quantity: 14321,
    tier: 'standard',
  },
  {
    id: 'd82b3907-969e-47e1-ad61-49942164d249',
    slug: 'faith-over-fear-minimalist-emblem-tee',
    name: 'Faith Over Fear Minimalist Emblem Tee',
    description:
      'A clean, modern streetwear tee featuring a compact chest emblem centred around the core "Faith Over Fear" lifestyle message.',
    price: 17000,
    currency: 'FRW',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: [
      'v1786135659/fof/admin/kull5anp0x6qdsngijr9.png',
      'v1786136601/fof/admin/fylkolqc8ppxjusds6g2.png',
    ],
    status: 'live',
    quantity: 123432,
    tier: 'standard',
  },
  {
    id: '5f0edb29-17d0-4e4c-8d68-9824b39a58b0',
    slug: 'oval-logo-minimalist-tee',
    name: 'Oval Logo Minimalist Tee',
    description:
      'A clean, minimalist streetwear tee showcasing the iconic "faithoverfear" lettering encapsulated in a bold oval outline. Available in cropped and oversized fits.',
    price: 17000,
    currency: 'FRW',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: [
      'v1786135598/fof/admin/fwkib1qpp6n9ajk22ynv.png',
      'v1786136616/fof/admin/t7t10ydmxxcjboafuoix.png',
    ],
    status: 'live',
    quantity: 15678,
    tier: 'standard',
  },
  {
    id: '47c0fab5-a0cb-4862-aca4-1b2fc3e05df6',
    slug: 'property-of-faith-crop-1',
    name: 'Property of Faith Crop',
    description:
      'A collegiate-style varsity graphic tee featuring bold, distressed lettering reading "Property of Faith" with an established year stamp.',
    price: 13000,
    currency: 'FRW',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: [
      'v1786135545/fof/admin/qcselgpxf3ovc7xy1ym1.png',
      'v1786136606/fof/admin/n79772io2k9n0zkpztee.png',
    ],
    status: 'live',
    quantity: 16789,
    tier: 'standard',
  },
  {
    id: 'a8880afa-1065-4385-9dd1-d679c04ea529',
    slug: 'psalm-23-1-3-flock-tee',
    name: 'Psalm 23:1-3 Flock Tee',
    description:
      'A minimalist white graphic tee featuring a pastoral illustration of a flock of sheep grazing, underlined by the comforting words of Psalm 23.',
    price: 17000,
    currency: 'FRW',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: [
      'v1786132217/fof/admin/miqq3d8ygnhiioexfrxv.png',
      'v1786136622/fof/admin/pnwdfc99wpimdkufkyyq.png',
    ],
    status: 'live',
    quantity: 145678,
    tier: 'standard',
  },
  {
    id: '8e173806-0520-456d-91f9-afb0a8e0d261',
    slug: 'abide-classic-script-tee',
    name: 'Abide Classic Script Tee',
    description:
      'A minimalist apparel piece featuring clean Abide branding, styled for quiet moments of daily prayer and meditation.',
    price: 17000,
    currency: 'FRW',
    colors: ['Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: [
      'v1786104165/fof/admin/swoiysvw01ynagwxzr0o.jpg',
      'v1786136478/fof/admin/c4oiualbw3v6koqw2wdh.png',
    ],
    status: 'live',
    quantity: 1123454289,
    tier: 'standard',
  },
  {
    id: '8b518a23-9685-473b-ab9d-214bcae8ee2f',
    slug: 'oval-logo-minimalist-crop',
    name: 'Oval Logo Minimalist Crop',
    description:
      'A clean, minimalist streetwear crop showcasing the iconic "faithoverfear" lettering encapsulated in a bold oval outline.',
    price: 13000,
    currency: 'FRW',
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imagePaths: ['v1786132478/fof/admin/ift2rtkrni7ihckjcpm9.png'],
    status: 'live',
    quantity: 14299,
    tier: 'standard',
  },
  {
    id: '80b37b52-2079-4b2f-83ae-317720705c11',
    slug: 'oval-logo-socks',
    name: 'Oval Logo Socks',
    description:
      'Minimalist streetwear socks showcasing the iconic "faithoverfear" logo lettering encapsulated in a bold oval outline.',
    price: 5000,
    currency: 'FRW',
    colors: ['Black'],
    sizes: [],
    imagePaths: [
      'v1786136638/fof/admin/opttvnuvdya7n289giym.png',
      'v1786136647/fof/admin/t7scyysut2bmzhy2msve.png',
    ],
    status: 'live',
    quantity: 15661,
    tier: 'accessory',
  },
  {
    id: '67c78928-b63d-463b-b115-dac54235dfe4',
    slug: 'f-f-stickers-4-stickers',
    name: 'F>F Stickers (Pack of 4)',
    description: 'Faith Over Fear pack of stickers.',
    price: 2500,
    currency: 'FRW',
    colors: ['Black'],
    sizes: [],
    imagePaths: ['v1786118746/fof/admin/ga2my8bkmv7yk5jj5ekf.png'],
    status: 'live',
    quantity: 1772,
    tier: 'accessory',
  },
];

/** Drop campaign imagery — authentic brand assets from the live site. */
export const dropAssets = {
  abide: 'v1786045986/fof/admin/rlfa87evirubxclh0aqu.jpg',
  genesis: 'v1784644907/fof/admin/ihiqqicew89edcqdyobn.jpg',
} as const;

export const features = products.filter((p) => p.tier === 'feature');
export const standards = products.filter((p) => p.tier === 'standard');
export const accessories = products.filter((p) => p.tier === 'accessory');

/** Availability is derived from real data only — never invented. */
export function availability(p: Product): { label: string; inStock: boolean } {
  const inStock = p.status === 'live' && (p.quantity === null || p.quantity > 0);
  return { label: inStock ? 'In stock' : 'Unavailable', inStock };
}
