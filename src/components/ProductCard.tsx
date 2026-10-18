import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cloudinary, availability, type Product } from '../data/products';
import { cx, formatPrice } from '../lib/format';

type Size = 'lg' | 'md' | 'sm';

const RATIO: Record<Size, string> = {
  lg: 'aspect-[4/5]',
  md: 'aspect-[4/5]',
  sm: 'aspect-square',
};

function ProductCard({ product, size = 'md', priority = false }: { product: Product; size?: Size; priority?: boolean }) {
  const [primary, secondary] = product.imagePaths;
  const { label: stockLabel, inStock } = availability(product);
  const href = `/product/${product.slug}`;

  const widths = size === 'lg' ? [640, 960, 1400] : size === 'md' ? [480, 760, 1080] : [320, 520, 760];
  const srcSet = (path: string) => widths.map((w) => `${cloudinary(path, w)} ${w}w`).join(', ');
  const sizesAttr =
    size === 'lg'
      ? '(max-width: 767px) 92vw, (max-width: 1279px) 58vw, 46vw'
      : size === 'md'
        ? '(max-width: 767px) 92vw, (max-width: 1279px) 44vw, 30vw'
        : '(max-width: 767px) 44vw, 22vw';

  return (
    <article className={cx('group relative flex flex-col', size === 'lg' && 'lg:flex-row-reverse lg:items-end lg:gap-8')}>
      <Link
        to={href}
        className={cx('relative block overflow-hidden bg-ink-700', RATIO[size], size === 'lg' ? 'w-full lg:w-[76%]' : 'w-full')}
        aria-label={`${product.name} — view product`}
      >
        <span className="absolute inset-0 bg-gradient-to-br from-ink-600 to-ink-800" aria-hidden="true" />

        <img
          src={cloudinary(primary, widths[1])}
          srcSet={srcSet(primary)}
          sizes={sizesAttr}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center transition-[transform,filter] duration-[1400ms] ease-editorial will-change-transform group-hover:scale-[1.04] group-hover:brightness-[1.06]"
        />

        {secondary && (
          <img
            src={cloudinary(secondary, widths[1])}
            srcSet={srcSet(secondary)}
            sizes={sizesAttr}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-[900ms] ease-editorial group-hover:opacity-100"
          />
        )}

        {!inStock && (
          <span className="absolute left-4 top-4 bg-ink/85 px-3 py-1.5 u-label u-label--tight text-bone/80">Unavailable</span>
        )}

        {/* Monolithic hover bar — brushed titanium feel */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full border-t border-bone/10 bg-ink/90 px-5 py-3.5 text-center u-label u-label--tight tracking-[0.28em] text-bone backdrop-blur-[8px] transition-transform duration-500 ease-editorial group-hover:translate-y-0">
          View product →
        </span>

        {/* Subtle inner frame on hover */}
        <span className="pointer-events-none absolute inset-[10px] border border-white/0 transition-colors duration-700 group-hover:border-white/[0.07]" aria-hidden="true" />
      </Link>

      <div className={cx('flex flex-col gap-3 pt-5', size === 'lg' && 'lg:w-[24%] lg:pb-2')}>
        <div className="flex items-start justify-between gap-4">
          <h3
            className={cx(
              'font-headline font-extrabold uppercase leading-[1.02] tracking-tightest text-bone',
              size === 'lg' ? 'text-[clamp(1.32rem,2.4vw,2.0rem)]' : 'text-[0.96rem]',
            )}
          >
            <Link to={href} className="hover:text-bone/80 transition-colors">
              {product.name}
            </Link>
          </h3>
          <span className={cx('shrink-0 font-mono tabular-nums text-bone', size === 'lg' ? 'text-[1.05rem]' : 'text-[0.84rem]')}>
            {formatPrice(product.price, product.currency)}
          </span>
        </div>

        {size === 'lg' && <p className="u-body max-w-md text-[0.94rem] leading-[1.65]">{product.description}</p>}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="u-label u-label--tight text-bone/40">{product.colors.join(' / ')}</span>
          {product.sizes.length > 0 && <span className="u-label u-label--tight text-bone/25">{product.sizes.join(' · ')}</span>}
        </div>

        <span className="inline-flex items-center gap-2 u-label u-label--tight text-bone/50">
          <span className={cx('block h-1.5 w-1.5 rounded-full', inStock ? 'bg-emerald-400/80' : 'bg-bone/30')} aria-hidden="true" />
          {stockLabel}
        </span>
      </div>
    </article>
  );
}

export default memo(ProductCard);
