import { Link, useParams } from 'react-router-dom';
import { products, dropAssets, cloudinary } from '../data/products';
import SEO from '../components/SEO';
import { formatPrice } from '../lib/format';

const meta: Record<string, { title: string; desc: string; image?: string }> = {
  all: { title: 'All Collections', desc: 'Every FAITH OVER FEAR RW piece in one place — limited runs, authentic FRW pricing, shipped from Kigali.' },
  featured: { title: 'Featured', desc: 'Monolithic heroes — the two featured pieces that carry the mark.' },
  standard: { title: 'Tees', desc: 'Core tees — the everyday armour. Heavyweight, premium, made to last.' },
  accessory: { title: 'Accessories', desc: 'Socks and sticker packs — smallest pieces, same conviction.' },
  abide: { title: 'ABIDE', desc: 'ABIDE — John 15 · John 3:30. Premium, ethically sourced apparel rooted in Scripture.', image: dropAssets.abide },
  genesis: { title: 'GENESIS', desc: 'GENESIS — Creation, faith, timeless design. The foundation drop.', image: dropAssets.genesis },
};

function filterFor(slug: string) {
  if (slug === 'all') return products;
  if (slug === 'featured' || slug === 'standard' || slug === 'accessory') return products.filter(p => p.tier === slug);
  if (slug === 'abide') return products.slice(0, 7);
  if (slug === 'genesis') return products.slice(2, 9);
  return null;
}

export default function CollectionDetail() {
  const { slug = 'all' } = useParams();
  const m = meta[slug];
  const list = filterFor(slug);

  if (!m || !list) {
    return (
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter py-20">
          <p className="u-label text-bone/40">Collection not found</p>
          <h1 className="u-display mt-4 text-4xl text-bone">No such drop</h1>
          <Link to="/collections" className="btn-outline mt-8 inline-flex">Back to collections</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO title={m.title} description={m.desc} canonical={`/collections/${slug}`} image={m.image} />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 u-label u-label--tight text-bone/35">
            <Link to="/collections" className="hover:text-bone">Collections</Link>
            <span aria-hidden="true">/</span>
            <span className="text-bone/60">{m.title}</span>
          </nav>

          <div className="mt-8 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <p className="u-label text-bone/40">COLLECTION — {m.title.toUpperCase()}</p>
              <h1 className="u-display mt-4 text-[clamp(2.2rem,6vw,4.8rem)] tracking-[-0.04em] text-bone">{m.title}</h1>
              <p className="u-body mt-6 max-w-xl">{m.desc}</p>
              <p className="u-label u-label--tight mt-6 text-bone/35">{list.length} pieces · Kigali · Limited run</p>
            </div>
            {m.image && (
              <div className="col-span-12 lg:col-span-6">
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
                  <img src={cloudinary(m.image, 900)} alt={m.title} className="h-full w-full object-cover" loading="lazy" />
                  <span className="absolute inset-0 ring-1 ring-inset ring-bone/[0.06]" aria-hidden="true" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-x-8">
            {list.map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group col-span-1 md:col-span-4 flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-700">
                  <img src={cloudinary(p.imagePaths[0], 600)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]" />
                </div>
                <div className="flex items-start justify-between gap-3 pt-4">
                  <h2 className="font-headline text-[0.9rem] font-extrabold uppercase tracking-tight text-bone">{p.name}</h2>
                  <span className="shrink-0 font-mono text-[0.8rem] text-bone">{formatPrice(p.price, p.currency)}</span>
                </div>
                <span className="u-label u-label--tight mt-2 text-bone/35">{p.colors.join(' / ')}</span>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex gap-6 border-t border-bone/[0.06] py-8">
            <Link to="/shop" className="btn-outline">Shop all</Link>
            <Link to="/collections" className="u-label u-label--tight self-center text-bone/60 hover:text-bone">← All collections</Link>
          </div>
        </div>
      </section>
    </>
  );
}
