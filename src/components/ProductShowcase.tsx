import { site } from '../config/site';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';
import Reveal from './Reveal';

type Props = { products: Product[]; live: boolean };

export default function ProductShowcase({ products, live }: Props) {
  const features = products.filter((p) => p.tier === 'feature');
  const rest = products.filter((p) => p.tier === 'standard');
  const extras = products.filter((p) => p.tier === 'accessory');

  const [heroA, heroB] = features;
  const rows = [rest.slice(0, 3), rest.slice(3, 6), rest.slice(6, 10)].filter((r) => r.length > 0);

  return (
    <section id="collection" className="relative border-t border-bone/[0.08] bg-ink py-24 md:py-32">
      {/* Subtle stone texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]" aria-hidden="true" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")` }} />

      <div className="u-fluid-gutter relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="u-label text-bone/45">{site.collection.index}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="u-display mt-5 text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">{site.collection.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="md:max-w-xs md:pb-2">
            <p className="u-body md:text-right">{site.collection.lede}</p>
          </Reveal>
        </div>

        <span className="rule mt-10" aria-hidden="true" />

        {/* Featured pair — monolithic scale difference */}
        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-16 md:gap-x-8">
          {heroA && (
            <Reveal className="col-span-12 lg:col-span-7" wipe>
              <ProductCard product={heroA} size="lg" priority />
            </Reveal>
          )}
          {heroB && (
            <Reveal className="col-span-12 lg:col-span-5 lg:mt-[7.5rem]" wipe delay={0.1}>
              <ProductCard product={heroB} size="lg" />
            </Reveal>
          )}
        </div>

        {rows.map((row, i) => (
          <div key={row.map((p) => p.id).join('-')} className="mt-20 grid grid-cols-2 gap-x-6 gap-y-14 md:mt-24 md:grid-cols-12 md:gap-x-8">
            {row.map((p, j) => (
              <Reveal key={p.id} className={row.length === 4 ? 'col-span-1 md:col-span-3' : 'col-span-1 md:col-span-4'} delay={j * 0.07}>
                <ProductCard product={p} size="md" />
              </Reveal>
            ))}
            {i === 0 && (
              <Reveal className="col-span-2 mt-2 md:col-span-12" delay={0.2}>
                <p className="u-label u-label--tight max-w-xl text-bone/30">Every piece is cut, printed and finished in limited runs — when a size moves, it moves.</p>
              </Reveal>
            )}
          </div>
        ))}

        <div className="mt-24 grid grid-cols-12 items-end gap-x-6 gap-y-12 md:mt-32">
          {extras[0] && (
            <Reveal className="col-span-6 md:col-span-3">
              <ProductCard product={extras[0]} size="sm" />
            </Reveal>
          )}

          <Reveal className="col-span-12 md:col-span-6" delay={0.08}>
            <div className="border-y border-bone/[0.07] bg-bone/[0.015] py-8 md:px-8">
              <p className="u-label text-bone/40">ESSENTIALS</p>
              <p className="u-headline mt-4 max-w-md text-[clamp(1.4rem,3vw,2.25rem)] text-bone">Small pieces. Same conviction.</p>
              <p className="u-body mt-4 max-w-md text-[0.95rem]">Socks and sticker packs from the ABIDE drop — the quietest way to carry the mark.</p>
            </div>
          </Reveal>

          {extras[1] && (
            <Reveal className="col-span-6 md:col-span-3" delay={0.14}>
              <ProductCard product={extras[1]} size="sm" />
            </Reveal>
          )}
        </div>

        <Reveal className="mt-20 flex flex-wrap items-center gap-6 md:mt-24">
          <a className="btn-solid" href="/shop">
            {site.collection.cta}
          </a>
          <p className="u-label u-label--tight text-bone/35">
            {products.length} pieces{live ? ' · live from the store' : ' · catalogue snapshot'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
