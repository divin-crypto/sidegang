import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, cloudinary } from '../data/products';
import SEO, { ProductJsonLd } from '../components/SEO';
import { formatPrice } from '../lib/format';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();

  const [size, setSize] = useState<string | undefined>(product?.sizes[0]);
  const [color, setColor] = useState<string | undefined>(product?.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter py-20">
          <p className="u-label text-bone/40">404 — Piece not found</p>
          <h1 className="u-display mt-4 text-4xl text-bone">No such product</h1>
          <p className="u-body mt-4">This piece may have moved or sold through. Browse the current collection.</p>
          <Link to="/shop" className="btn-solid mt-8 inline-flex">Shop all</Link>
        </div>
      </section>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.tier === product.tier).slice(0, 3);

  const handleAdd = () => {
    addItem(product, { size, color, quantity: qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const inStock = product.status === 'live' && product.quantity > 0;

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        canonical={`/product/${product.slug}`}
        image={cloudinary(product.imagePaths[0], 1200)}
      />
      <ProductJsonLd product={{ name: product.name, description: product.description, image: cloudinary(product.imagePaths[0], 1200), price: product.price, slug: product.slug }} />

      <section className="bg-ink pt-28 md:pt-32">
        <div className="u-fluid-gutter">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 u-label u-label--tight text-bone/35">
            <Link to="/shop" className="hover:text-bone">Shop</Link>
            <span>/</span>
            <Link to={`/collections/${product.tier}`} className="hover:text-bone capitalize">{product.tier}</Link>
            <span>/</span>
            <span className="text-bone/60 line-clamp-1">{product.name}</span>
          </nav>

          <div className="mt-8 grid grid-cols-12 gap-8 lg:gap-12">
            {/* Media */}
            <div className="col-span-12 lg:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-700">
                <img
                  src={cloudinary(product.imagePaths[activeImg] ?? product.imagePaths[0], 1000)}
                  srcSet={`${cloudinary(product.imagePaths[activeImg] ?? product.imagePaths[0], 700)} 700w, ${cloudinary(product.imagePaths[activeImg] ?? product.imagePaths[0], 1200)} 1200w`}
                  sizes="(max-width: 1023px) 100vw, 58vw"
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {!inStock && <span className="absolute left-4 top-4 bg-ink/85 px-3 py-1.5 u-label u-label--tight text-bone">Unavailable</span>}
              </div>
              {product.imagePaths.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {product.imagePaths.map((p, i) => (
                    <button
                      key={p}
                      onClick={() => setActiveImg(i)}
                      className={`relative aspect-square overflow-hidden border bg-ink-700 ${i === activeImg ? 'border-bone' : 'border-bone/10 hover:border-bone/20'}`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={cloudinary(p, 320)} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="col-span-12 lg:col-span-5">
              <p className="u-label text-bone/40">{product.tier.toUpperCase()} · {product.colors.join(' / ')}</p>
              <h1 className="u-headline mt-4 text-[clamp(1.6rem,3.8vw,2.6rem)] tracking-tight text-bone">{product.name}</h1>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-[1.25rem] tabular-nums text-bone">{formatPrice(product.price, product.currency)}</span>
                <span className="u-label u-label--tight text-bone/30">FRW · incl. VAT</span>
              </div>

              <p className="u-body mt-6">{product.description}</p>

              {/* Colors */}
              <div className="mt-8">
                <p className="u-label u-label--tight text-bone/40">Color — <span className="text-bone/70">{color}</span></p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`border px-4 py-2 u-label u-label--tight text-[0.58rem] ${color === c ? 'border-bone bg-bone text-ink' : 'border-bone/15 text-bone/60 hover:border-bone/30 hover:text-bone'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <p className="u-label u-label--tight text-bone/40">Size — <span className="text-bone/70">{size}</span></p>
                    <Link to="/faq" className="u-label u-label--tight text-bone/40 underline decoration-bone/20 hover:text-bone">Size guide</Link>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`h-10 min-w-[3rem] border px-3 font-mono text-[0.82rem] tabular-nums ${size === s ? 'border-bone bg-bone text-ink' : 'border-bone/15 text-bone/60 hover:border-bone/30 hover:text-bone'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + CTA */}
              <div className="mt-8 flex items-center gap-3">
                <div className="flex items-center border border-bone/15">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-12 text-bone hover:bg-bone hover:text-ink" aria-label="Decrease quantity">−</button>
                  <span className="w-10 text-center font-mono tabular-nums text-bone">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="h-12 w-12 text-bone hover:bg-bone hover:text-ink" aria-label="Increase quantity">+</button>
                </div>
                <button
                  onClick={handleAdd}
                  disabled={!inStock}
                  className={`flex-1 py-3.5 u-label u-label--tight text-[0.66rem] tracking-[0.24em] transition-colors ${inStock ? 'bg-bone text-ink hover:bg-ember hover:text-white' : 'bg-bone/15 text-bone/30 cursor-not-allowed'}`}
                >
                  {added ? 'Added — view cart' : inStock ? 'Add to cart' : 'Unavailable'}
                </button>
              </div>
              {added && (
                <div className="mt-3 flex gap-3">
                  <Link to="/cart" className="link-underline u-label u-label--tight text-bone/70 hover:text-bone">Go to cart →</Link>
                  <Link to="/shop" className="link-underline u-label u-label--tight text-bone/70 hover:text-bone">Continue shopping</Link>
                </div>
              )}

              <div className="mt-8 space-y-3 border-y border-bone/[0.08] py-6">
                <div className="flex items-center gap-2 u-label u-label--tight text-bone/45">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" aria-hidden="true" /> {inStock ? 'In stock — ships from Kigali' : 'Made to order · restock varies'}
                </div>
                <p className="u-label u-label--tight text-bone/35">Secure checkout via the official storefront · <Link to="/shipping" className="underline decoration-bone/20 hover:text-bone">Shipping</Link> · <Link to="/returns" className="underline decoration-bone/20 hover:text-bone">Returns</Link></p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="border border-bone/[0.07] bg-bone/[0.015] p-4">
                  <p className="u-label u-label--tight text-bone/40">Material</p>
                  <p className="mt-1 text-[0.9rem] leading-[1.6] text-bone/70">400GSM heavyweight cotton, precision-cut, garment-dyed.</p>
                </div>
                <div className="border border-bone/[0.07] bg-bone/[0.015] p-4">
                  <p className="u-label u-label--tight text-bone/40">Fit</p>
                  <p className="mt-1 text-[0.9rem] leading-[1.6] text-bone/70">Oversized, relaxed — same scale across S → XXL.</p>
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20 border-t border-bone/[0.06] pt-10">
              <div className="flex items-end justify-between">
                <h2 className="u-headline text-[1.4rem] tracking-tight text-bone">You may also like</h2>
                <Link to="/shop" className="u-label u-label--tight text-bone/50 hover:text-bone">Shop all →</Link>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12">
                {related.map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="group col-span-1 md:col-span-4 flex flex-col">
                    <div className="relative aspect-[4/5] overflow-hidden bg-ink-700">
                      <img src={cloudinary(p.imagePaths[0], 600)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]" />
                    </div>
                    <h3 className="mt-4 font-headline text-[0.88rem] font-extrabold uppercase tracking-tight text-bone">{p.name}</h3>
                    <span className="mt-1 font-mono text-[0.78rem] text-bone">{formatPrice(p.price, p.currency)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
