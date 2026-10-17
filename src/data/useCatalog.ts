import { useEffect, useState } from 'react';
import { CATALOG_API } from '../config/site';
import { products as snapshot, type Product } from './products';

type ApiVariant = { size?: string | null; color?: string | null; stock?: number | null };
type ApiProduct = {
  id?: string;
  slug?: string;
  name?: string;
  description?: string;
  price?: number | null;
  sizes?: string[] | null;
  colors?: string[] | null;
  image_urls?: string[] | null;
  status?: string | null;
  quantity?: number | null;
  product_variants?: ApiVariant[] | null;
};

const CLOUDINARY_PREFIX = 'https://res.cloudinary.com/dae1z71ru/image/upload/';

/** Keep only the Cloudinary path so we can re-apply our own responsive transforms. */
function toImagePath(url: string): string | null {
  if (!url.startsWith(CLOUDINARY_PREFIX)) return null;
  const rest = url.slice(CLOUDINARY_PREFIX.length);
  // Drop the `v1234567890/` version segment.
  return rest.replace(/^v\d+\//, '');
}

function normalise(raw: ApiProduct, index: number): Product | null {
  if (!raw?.id || !raw?.slug || !raw?.name) return null;

  const imagePaths = (raw.image_urls ?? []).map(toImagePath).filter((p): p is string => Boolean(p));
  const variants = raw.product_variants ?? [];

  const sizes =
    raw.sizes?.length
      ? raw.sizes
      : Array.from(new Set(variants.map((v) => v.size).filter((s): s is string => Boolean(s))));
  const colors =
    raw.colors?.length
      ? raw.colors
      : Array.from(new Set(variants.map((v) => v.color).filter((c): c is string => Boolean(c))));

  // Preserve the editorial tier assigned in the snapshot; new items default to standard.
  const known = snapshot.find((p) => p.id === raw.id || p.slug === raw.slug);
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    description: raw.description ?? known?.description ?? '',
    price: typeof raw.price === 'number' ? raw.price : (known?.price ?? null),
    currency: 'FRW',
    colors: colors.length ? colors : ['—'],
    sizes: sizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b)),
    imagePaths: imagePaths.length ? imagePaths : (known?.imagePaths ?? []),
    status: (raw.status as Product['status']) ?? 'live',
    quantity: typeof raw.quantity === 'number' ? raw.quantity : 0,
    tier: known?.tier ?? (index < 2 ? 'feature' : 'standard'),
  };
}

export type CatalogState = {
  products: Product[];
  /** true once the page is showing data fetched from the live storefront */
  live: boolean;
};

/**
 * Starts from the bundled snapshot (guaranteed to render) and tries to refresh
 * from the brand's live catalogue API. Any failure — offline, blocked, CORS,
 * timeout — leaves the authentic snapshot in place.
 */
export function useCatalog(): CatalogState {
  const [state, setState] = useState<CatalogState>({ products: snapshot, live: false });

  useEffect(() => {
    if (typeof fetch !== 'function') return;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 6000);

    fetch(CATALOG_API, { signal: controller.signal, mode: 'cors', credentials: 'omit' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((json: { products?: ApiProduct[] }) => {
        const list = Array.isArray(json?.products) ? json.products : [];
        const mapped = list
          .map(normalise)
          .filter((p): p is Product => Boolean(p && p.imagePaths.length));

        if (mapped.length === 0) return;

        // Keep the art-directed snapshot ordering, then append anything new.
        const order = snapshot.map((p) => p.id);
        mapped.sort((a, b) => {
          const ai = order.indexOf(a.id);
          const bi = order.indexOf(b.id);
          if (ai === -1 && bi === -1) return 0;
          if (ai === -1) return 1;
          if (bi === -1) return -1;
          return ai - bi;
        });

        setState({ products: mapped, live: true });
      })
      .catch(() => {
        /* keep the snapshot — nothing to do */
      })
      .finally(() => window.clearTimeout(timer));

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
