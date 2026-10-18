import { Link } from 'react-router-dom';
import { cloudinary } from '../data/products';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import { formatPrice } from '../lib/format';

export default function CartPage() {
  const { items, count, subtotal, updateQuantity, removeItem, clear } = useCart();

  return (
    <>
      <SEO title="Cart" description={`Your FAITH OVER FEAR RW cart — ${count} items, ${formatPrice(subtotal, 'FRW')} subtotal. Secure checkout via official storefront.`} canonical="/cart" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">CART — {count} {count === 1 ? 'piece' : 'pieces'}</p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="u-display text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">YOUR CART</h1>
            {items.length > 0 && <button onClick={clear} className="u-label u-label--tight self-start text-bone/40 hover:text-bone md:self-auto">Clear cart</button>}
          </div>

          {items.length === 0 ? (
            <div className="mt-12 border border-bone/[0.06] bg-bone/[0.015] p-8 text-center md:p-12">
              <p className="u-headline text-[1.3rem] text-bone">Your cart is empty</p>
              <p className="u-body mt-3">Limited runs — when a size moves, it moves. Find your piece.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/shop" className="btn-solid">Shop all</Link>
                <Link to="/collections" className="btn-outline">Browse collections</Link>
              </div>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border border-bone/[0.06] bg-bone/[0.015] p-4">
                    <Link to={`/product/${item.product.slug}`} className="shrink-0">
                      <img src={cloudinary(item.product.imagePaths[0], 220)} alt={item.product.name} className="h-24 w-20 object-cover bg-ink-700 md:h-28 md:w-24" loading="lazy" />
                    </Link>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link to={`/product/${item.product.slug}`} className="font-headline text-[0.95rem] font-extrabold uppercase tracking-tight text-bone hover:text-bone/80">{item.product.name}</Link>
                          <p className="u-label u-label--tight mt-1 text-bone/40">{[item.color, item.size].filter(Boolean).join(' · ') || item.product.colors.join(' / ')}</p>
                        </div>
                        <span className="font-mono text-[0.9rem] tabular-nums text-bone">{formatPrice(item.product.price, item.product.currency)}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-bone/15">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 text-bone hover:bg-bone hover:text-ink" aria-label="Decrease">−</button>
                          <span className="w-8 text-center font-mono text-[0.85rem] tabular-nums text-bone">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 text-bone hover:bg-bone hover:text-ink" aria-label="Increase">+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="u-label u-label--tight text-bone/40 hover:text-bone">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-span-12 lg:col-span-4">
                <div className="sticky top-24 border border-bone/[0.08] bg-bone/[0.015] p-6">
                  <h2 className="u-label u-label--tight text-bone/40">Order summary</h2>
                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between font-mono text-[0.9rem] tabular-nums text-bone/70"><span>Subtotal</span><span className="text-bone">{formatPrice(subtotal, 'FRW')}</span></div>
                    <div className="flex justify-between font-mono text-[0.9rem] tabular-nums text-bone/70"><span>Shipping</span><span>Calculated at checkout</span></div>
                    <div className="flex justify-between border-t border-bone/[0.08] pt-3 font-mono text-[1rem] tabular-nums text-bone"><span>Total</span><span>{formatPrice(subtotal, 'FRW')}</span></div>
                  </div>

                  <a href="https://faithoverfearrw.netlify.app/shop" target="_blank" rel="noreferrer noopener" className="btn-solid mt-6 w-full">Checkout — official store</a>
                  <p className="u-label u-label--tight mt-3 text-center text-bone/30">Secure checkout via the FAITH OVER FEAR RW storefront</p>

                  <div className="mt-6 space-y-2">
                    <Link to="/shop" className="btn-outline w-full">Continue shopping</Link>
                    <div className="flex justify-center gap-4">
                      <Link to="/shipping" className="link-underline u-label u-label--tight text-bone/40 hover:text-bone">Shipping</Link>
                      <Link to="/returns" className="link-underline u-label u-label--tight text-bone/40 hover:text-bone">Returns</Link>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-bone/[0.06] pt-6">
                    <p className="u-label u-label--tight text-bone/40">Need help?</p>
                    <p className="u-body mt-2 text-[0.88rem]">Email faithoverfearsupport@gmail.com — we reply within 24h from Kigali.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
