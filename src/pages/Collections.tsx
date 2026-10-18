import { Link } from 'react-router-dom';
import { products, dropAssets, cloudinary } from '../data/products';
import SEO from '../components/SEO';

const collections = [
  {
    slug: 'all',
    title: 'All Collections',
    count: products.length,
    image: products[0]?.imagePaths[0],
    desc: 'Every piece from the FAITH OVER FEAR RW vault — limited production, real inventory.',
  },
  {
    slug: 'featured',
    title: 'Featured',
    count: products.filter(p => p.tier === 'feature').length,
    image: products.find(p => p.tier === 'feature')?.imagePaths[0],
    desc: 'Monolithic heroes — the heavyweight long sleeve and the vintage-washed statement tee.',
  },
  {
    slug: 'standard',
    title: 'Tees',
    count: products.filter(p => p.tier === 'standard').length,
    image: products.find(p => p.tier === 'standard')?.imagePaths[0],
    desc: 'Core tees — ABIDE, GENESIS, Psalm 23 and the everyday armour. 400GSM heavyweight.',
  },
  {
    slug: 'accessory',
    title: 'Accessories',
    count: products.filter(p => p.tier === 'accessory').length,
    image: products.find(p => p.tier === 'accessory')?.imagePaths[0],
    desc: 'Socks and sticker packs — smallest pieces, same conviction.',
  },
  {
    slug: 'abide',
    title: 'ABIDE',
    count: 6,
    image: dropAssets.abide,
    desc: 'John 15 · John 3:30 — premium, ethically sourced apparel rooted in Scripture. Quiet, intentional, daily.',
  },
  {
    slug: 'genesis',
    title: 'GENESIS',
    count: 5,
    image: dropAssets.genesis,
    desc: 'Creation, faith, timeless design — the foundation drop. Minimal, bold, wearable testimony.',
  },
];

export default function Collections() {
  return (
    <>
      <SEO title="Collections" description="FAITH OVER FEAR RW collections — Featured, Tees, Accessories, ABIDE, GENESIS. Every drop is limited production from Kigali." canonical="/collections" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">02 — COLLECTIONS</p>
          <h1 className="u-display mt-6 max-w-[12ch] text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">DROP ARCHIVE</h1>
          <p className="u-body mt-6 max-w-xl">Six edits — each one cut and finished in Rwanda. Choose a collection to explore the pieces inside.</p>

          <div className="mt-14 grid grid-cols-12 gap-6 md:gap-8">
            {collections.map((c) => (
              <Link
                key={c.slug}
                to={`/collections/${c.slug}`}
                className="group col-span-12 md:col-span-6 lg:col-span-4 border border-bone/[0.08] bg-bone/[0.015] transition-colors hover:border-bone/20 hover:bg-bone/[0.03]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-700">
                  {c.image && (
                    <img
                      src={cloudinary(c.image, 800)}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  )}
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-ink/75 px-3 py-1.5 backdrop-blur u-label u-label--tight text-bone">{c.count} pieces</span>
                </div>
                <div className="p-6 md:p-7">
                  <h2 className="u-headline text-[1.35rem] tracking-tight text-bone">{c.title}</h2>
                  <p className="u-body mt-3 text-[0.9rem] leading-[1.7]">{c.desc}</p>
                  <span className="link-underline mt-5 inline-block u-label u-label--tight text-bone/60 group-hover:text-bone">Explore →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 border-t border-bone/[0.06] py-10">
            <p className="u-label u-label--tight text-bone/35">Need guidance? <Link to="/shop" className="link-underline text-bone/70 hover:text-bone">Shop all</Link> · <Link to="/lookbook" className="link-underline text-bone/70 hover:text-bone">View lookbook</Link></p>
          </div>
        </div>
      </section>
    </>
  );
}
