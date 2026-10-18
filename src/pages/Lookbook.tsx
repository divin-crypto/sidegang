import { Link } from 'react-router-dom';
import { cloudinary, dropAssets, products } from '../data/products';
import SEO from '../components/SEO';

export default function Lookbook() {
  return (
    <>
      <SEO title="Lookbook" description="FAITH OVER FEAR RW Lookbook — ABIDE and GENESIS campaigns shot in Kigali. Monolithic minimalism, editorial scale, spiritual conviction." canonical="/lookbook" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">03 — LOOKBOOK</p>
          <h1 className="u-display mt-4 text-[clamp(2.4rem,7vw,5.75rem)] tracking-[-0.04em] text-bone">THE EDITORIAL</h1>
          <p className="u-body mt-6 max-w-2xl">Two campaigns, one conviction. ABIDE and GENESIS were shot in Kigali — same streets that birthed the brand. Heavy cotton, monumental letterforms, spiritual minimalism.</p>

          {/* ABIDE */}
          <div className="mt-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8">
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
                <img src={cloudinary(dropAssets.abide, 1400)} alt="ABIDE campaign — FAITH OVER FEAR RW" className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-4 bottom-4 border border-bone/15 bg-ink/60 px-3 py-1.5 backdrop-blur u-label u-label--tight text-bone">ABIDE — JOHN 15</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col justify-center border border-bone/[0.07] bg-bone/[0.015] p-6 md:p-8">
              <p className="u-label text-bone/40">CAMPAIGN 01</p>
              <h2 className="u-headline mt-4 text-[1.6rem] tracking-tight text-bone">ABIDE</h2>
              <p className="u-body mt-4 text-[0.9rem]">Elevate your daily walk. Premium, ethically sourced materials — subtle, intentional designs for quiet reminders to rest in His presence.</p>
              <Link to="/collections/abide" className="btn-outline mt-8">Shop ABIDE</Link>
            </div>
          </div>

          {/* Mosaic */}
          <div className="mt-6 grid grid-cols-12 gap-6">
            {products.slice(0, 3).map((p, i) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group col-span-12 md:col-span-4">
                <div className={`relative overflow-hidden bg-ink-700 ${i === 1 ? 'aspect-[3/4]' : 'aspect-[4/5]'}`}>
                  <img src={cloudinary(p.imagePaths[0], 700)} alt={p.name} className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" loading="lazy" />
                </div>
                <p className="u-label u-label--tight mt-4 text-bone/60 group-hover:text-bone">{p.name} — look {i + 1}</p>
              </Link>
            ))}
          </div>

          {/* GENESIS */}
          <div className="mt-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4 flex flex-col justify-center border border-bone/[0.07] bg-bone/[0.015] p-6 md:p-8 order-2 md:order-1">
              <p className="u-label text-bone/40">CAMPAIGN 02</p>
              <h2 className="u-headline mt-4 text-[1.6rem] tracking-tight text-bone">GENESIS</h2>
              <p className="u-body mt-4 text-[0.9rem]">Step into the foundation. Inspired by creation, faith, timeless design — a fresh start for modern streetwear centered on a higher calling.</p>
              <Link to="/collections/genesis" className="btn-outline mt-8">Shop GENESIS</Link>
            </div>
            <div className="col-span-12 md:col-span-8 order-1 md:order-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-700">
                <img src={cloudinary(dropAssets.genesis, 1400)} alt="GENESIS campaign — FAITH OVER FEAR RW" className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute right-4 bottom-4 border border-bone/15 bg-ink/60 px-3 py-1.5 backdrop-blur u-label u-label--tight text-bone">GENESIS — DAY ONE</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6">
            {products.slice(3, 6).map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="group col-span-12 md:col-span-4">
                <div className="relative aspect-[4/5] overflow-hidden bg-ink-700">
                  <img src={cloudinary(p.imagePaths[0], 700)} alt={p.name} className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" loading="lazy" />
                </div>
                <p className="u-label u-label--tight mt-4 text-bone/60 group-hover:text-bone">{p.name}</p>
              </Link>
            ))}
          </div>

          <div className="mt-16 border-t border-bone/[0.06] py-10 text-center">
            <p className="u-headline text-[clamp(1.4rem,3vw,2.2rem)] text-bone">Shot in Kigali. Worn worldwide.</p>
            <Link to="/shop" className="btn-solid mt-6">Shop the collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}
