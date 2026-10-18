import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { products as snapshot, cloudinary } from '../data/products';
import { useCatalog } from '../data/useCatalog';
import SEO from '../components/SEO';
import { formatPrice } from '../lib/format';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name';

export default function Shop() {
  const { products } = useCatalog();
  const list = products.length ? products : snapshot;

  const [filter, setFilter] = useState<'all' | 'feature' | 'standard' | 'accessory'>('all');
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [sort, setSort] = useState<Sort>('featured');
  const [query, setQuery] = useState('');

  const colors = useMemo(() => {
    const s = new Set<string>();
    list.forEach((p) => p.colors.forEach((c) => s.add(c)));
    return ['all', ...Array.from(s)];
  }, [list]);

  const filtered = useMemo(() => {
    let out = [...list];
    if (filter !== 'all') out = out.filter((p) => p.tier === filter);
    if (colorFilter !== 'all') out = out.filter((p) => p.colors.includes(colorFilter));
    if (query) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (sort === 'price-asc') out.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sort === 'price-desc') out.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else if (sort === 'name') out.sort((a, b) => a.name.localeCompare(b.name));
    // featured keeps snapshot order
    return out;
  }, [list, filter, colorFilter, sort, query]);

  return (
    <>
      <SEO title="Shop" description="Shop the FAITH OVER FEAR RW collection — heavyweight tees, long sleeves, essentials. Real inventory, authentic FRW pricing, shipped from Kigali." canonical="/shop" />
      <section className="border-b border-bone/[0.08] bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">01 — SHOP</p>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h1 className="u-display text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">THE COLLECTION</h1>
            <p className="u-body max-w-sm md:text-right">{list.length} pieces — limited runs, real inventory from Kigali.</p>
          </div>

          {/* Controls */}
          <div className="mt-10 flex flex-col gap-4 border-y border-bone/[0.08] bg-bone/[0.015] p-4 md:flex-row md:items-center md:justify-between md:p-5">
            <div className="flex flex-wrap gap-2">
              {(['all', 'feature', 'standard', 'accessory'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`border px-4 py-2 u-label u-label--tight text-[0.58rem] transition-colors ${filter === f ? 'border-bone bg-bone text-ink' : 'border-bone/15 bg-transparent text-bone/60 hover:border-bone/30 hover:text-bone'}`}
                >
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2">
                <span className="u-label u-label--tight text-bone/40">Color</span>
                <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)} className="border border-bone/15 bg-ink px-3 py-2 text-[0.78rem] text-bone">
                  {colors.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-2">
                <span className="u-label u-label--tight text-bone/40">Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border border-bone/15 bg-ink px-3 py-2 text-[0.78rem] text-bone">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="name">Name A–Z</option>
                </select>
              </label>
              <div className="relative">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="w-40 border border-bone/15 bg-ink px-3 py-2 text-[0.78rem] text-bone placeholder:text-bone/30 md:w-48" />
                {query && <button onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-bone/40 hover:text-bone">×</button>}
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-x-8">
            {filtered.map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group col-span-1 md:col-span-4 flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-700">
                  <img
                    src={cloudinary(p.imagePaths[0], 600)}
                    srcSet={`${cloudinary(p.imagePaths[0], 480)} 480w, ${cloudinary(p.imagePaths[0], 760)} 760w`}
                    sizes="(max-width: 767px) 50vw, 33vw"
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-[transform,filter] duration-[1200ms] ease-editorial group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-3 top-3 bg-ink/85 px-2 py-1 u-label u-label--tight text-[0.55rem] text-bone/80">{p.colors.join(' / ')}</span>
                  {p.tier === 'feature' && <span className="absolute right-3 top-3 bg-ember px-2 py-1 u-label u-label--tight text-[0.55rem] text-white">Featured</span>}
                </div>
                <div className="flex items-start justify-between gap-3 pt-4">
                  <h2 className="font-headline text-[0.92rem] font-extrabold uppercase leading-tight tracking-tight text-bone">{p.name}</h2>
                  <span className="shrink-0 font-mono text-[0.8rem] tabular-nums text-bone">{formatPrice(p.price, p.currency)}</span>
                </div>
                <p className="u-label u-label--tight mt-2 text-bone/40 line-clamp-2">{p.description.slice(0, 88)}…</p>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="u-label text-bone/40">No pieces match your filters.</p>
              <button onClick={() => { setFilter('all'); setColorFilter('all'); setQuery(''); setSort('featured'); }} className="btn-outline mt-6">Clear filters</button>
            </div>
          )}

          <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-bone/[0.06] py-8">
            <p className="u-label u-label--tight text-bone/35">{filtered.length} pieces shown · {list.length} total</p>
            <Link to="/collections" className="link-underline u-label u-label--tight text-bone/60 hover:text-bone">Browse collections →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
