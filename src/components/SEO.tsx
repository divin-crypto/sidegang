import { useEffect } from 'react';

type Props = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noIndex?: boolean;
};

const SITE_URL = 'https://faithoverfearrw.netlify.app';
const DEFAULT_IMAGE = '/media/og-cover.jpg';
const DEFAULT_TITLE = 'FAITH OVER FEAR RW — Walk by faith. Live without fear.';
const DEFAULT_DESC =
  'Faith-inspired streetwear from Kigali, Rwanda. Premium heavyweight tees, long sleeves and essentials built as armour for the bold. Wear your conviction.';

export default function SEO({ title, description, canonical, image, noIndex }: Props) {
  const fullTitle = title ? `${title} — FAITH OVER FEAR RW` : DEFAULT_TITLE;
  const desc = description ?? DEFAULT_DESC;
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL + '/';
  const img = image ?? DEFAULT_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    const set = (selector: string, content: string, attr: 'content' | 'href' = 'content') => {
      let el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!el) {
        if (selector.startsWith('meta')) {
          el = document.createElement('meta');
          if (selector.includes('property')) {
            const prop = selector.match(/property="([^"]+)"/)?.[1];
            if (prop) (el as HTMLMetaElement).setAttribute('property', prop);
          } else if (selector.includes('name=')) {
            const name = selector.match(/name="([^"]+)"/)?.[1];
            if (name) (el as HTMLMetaElement).setAttribute('name', name);
          }
          document.head.appendChild(el);
        } else if (selector.startsWith('link')) {
          el = document.createElement('link');
          const rel = selector.match(/rel="([^"]+)"/)?.[1];
          if (rel) (el as HTMLLinkElement).setAttribute('rel', rel);
          document.head.appendChild(el);
        }
      }
      if (el) el.setAttribute(attr, content);
    };

    set('meta[name="description"]', desc);
    set('meta[property="og:title"]', fullTitle);
    set('meta[property="og:description"]', desc);
    set('meta[property="og:url"]', url);
    set('meta[property="og:image"]', img.startsWith('http') ? img : SITE_URL + img);
    set('meta[name="twitter:title"]', fullTitle);
    set('meta[name="twitter:description"]', desc);
    set('meta[name="twitter:image"]', img.startsWith('http') ? img : SITE_URL + img);
    set('link[rel="canonical"]', url, 'href');

    if (noIndex) {
      set('meta[name="robots"]', 'noindex, nofollow');
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots && robots.getAttribute('content') === 'noindex, nofollow') robots.remove();
    }
  }, [fullTitle, desc, url, img, noIndex]);

  return null;
}

// Helper for JSON-LD
export function ProductJsonLd({ product }: { product: { name: string; description: string; image: string; price: number | null; slug: string } }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { '@type': 'Brand', name: 'FAITH OVER FEAR RW' },
    offers: product.price
      ? {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'RWF',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/product/${product.slug}`,
        }
      : undefined,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbsJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
