import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products as snapshot, cloudinary } from '../data/products';
import { useCatalog } from '../data/useCatalog';
import SEO from '../components/SEO';
import { formatPrice } from '../lib/format';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('q') ?? '';
  const [q, setQ] = useState(initial);
  const { products } = useCatalog();
  const list = products.length ? products : snapshot;

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return list.filter((p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.colors.join(' ').toLowerCase().includes(term));
  }, [list, q]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParams(q ? { q } : {});
  };

  return (
    <>
      <SEO title={q ? `Search: ${q}` : 'Search'} description="Search FAITH OVER FEAR RW — tees, long sleeves, accessories from Kigali." canonical="/search" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">SEARCH</p>
          <h1 className="u-display mt-4 text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">SEARCH</h1>

          <form onSubmit={onSubmit} className="mt-8 flex gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for faith, abide, crest, classic..."
              className="flex-1 border border-bone/15 bg-ink px-4 py-3 text-[0.95rem] text-bone placeholder:text-bone/30"
              autoFocus
            />
            <button type="submit" className="btn-solid">Search</button>
            {q && <button type="button" onClick={() => { setQ(''); setParams({}); }} className="btn-outline">Clear</button>}
          </form>

          {q && <p className="u-label u-label--tight mt-6 text-bone/35">{results.length} result{results.length === 1 ? '' : 's'} for “{q}” · {list.length} pieces total</p>}

          {!q && (
            <div className="mt-12">
              <p className="u-label u-label--tight text-bone/40">Popular</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Abide', 'Genesis', 'Faith Over Fear', 'Crest', 'Psalm', 'Oval'].map((term) => (
                  <button key={term} onClick={() => { setQ(term); setParams({ q: term }); }} className="border border-bone/15 px-4 py-2 u-label u-label--tight text-[0.58rem] text-bone/60 hover:border-bone/30 hover:text-bone">{term}</button>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-12">
                {list.slice(0, 6).map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="col-span-1 md:col-span-4">
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink-700"><img src={cloudinary(p.imagePaths[0], 500)} alt={p.name} className="h-full w-full object-cover" loading="lazy" /></div>
                    <p className="mt-3 font-headline text-[0.85rem] font-extrabold uppercase tracking-tight text-bone">{p.name}</p>
                    <span className="font-mono text-[0.78rem] text-bone">{formatPrice(p.price, p.currency)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {q && results.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
              {results.map((p) => (
                <Link key={p.id} to={`/product/${p.slug}`} className="group col-span-1 md:col-span-4">
                  <div className="relative aspect-[4/5] overflow-hidden bg-ink-700"><img src={cloudinary(p.imagePaths[0], 600)} alt={p.name} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" /></div>
                  <h2 className="mt-4 font-headline text-[0.9rem] font-extrabold uppercase tracking-tight text-bone">{p.name}</h2>
                  <span className="font-mono text-[0.8rem] text-bone">{formatPrice(p.price, p.currency)}</span>
                </Link>
              ))}
            </div>
          )}

          {q && results.length === 0 && (
            <div className="mt-12 border border-bone/[0.06] bg-bone/[0.015] p-8 text-center">
              <p className="u-label text-bone/40">No pieces match “{q}”</p>
              <p className="u-body mt-3">Try a different term — or browse the full collection.</p>
              <Link to="/shop" className="btn-outline mt-6">Shop all</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
