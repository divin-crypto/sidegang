import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../config/site';
import { cx } from '../lib/format';
import BrandSymbol from './BrandSymbol';
import { useCart } from '../context/CartContext';

const desktopLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open]);

  // close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-700 ease-editorial',
          scrolled || open || !isHome
            ? 'border-b border-bone/[0.08] bg-ink/80 py-3.5 backdrop-blur-[18px] backdrop-saturate-[1.2]'
            : 'border-b border-transparent bg-transparent py-5 md:py-7',
        )}
      >
        <nav className="u-fluid-gutter flex items-center justify-between gap-6" aria-label="Primary">
          {/* Wordmark — monolithic, architectural */}
          <Link to="/" className="group flex items-center gap-3.5 text-bone" aria-label={`${site.name} — home`}>
            <span className="block w-[44px] shrink-0 transition-all duration-700 ease-editorial group-hover:-translate-y-[1px] md:w-[48px]">
              <BrandSymbol quiet />
            </span>
            <span className="flex flex-col leading-none">
              <span className="u-label u-label--tight block text-[0.56rem] tracking-[0.38em] text-bone md:text-[0.6rem]">
                FAITH OVER FEAR
              </span>
              <span className="u-label u-label--tight block text-[0.56rem] tracking-[0.32em] text-bone/40 md:text-[0.6rem]">
                RW — KIGALI
              </span>
            </span>
          </Link>

          {/* Desktop — restrained, premium */}
          <div className="hidden items-center gap-8 md:flex">
            {desktopLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cx(
                  'link-underline u-label u-label--tight transition-colors duration-300',
                  location.pathname === link.href || location.pathname.startsWith(link.href + '/')
                    ? 'text-bone'
                    : 'text-bone/55 hover:text-bone'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/search"
              aria-label="Search"
              className="p-2 text-bone/55 transition-colors hover:text-bone"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            </Link>
            <Link
              to="/cart"
              aria-label={`Cart, ${count} items`}
              className="relative flex items-center gap-2 border border-bone/15 bg-bone/[0.04] px-4 py-[10px] text-bone backdrop-blur transition-colors hover:bg-bone hover:text-ink"
            >
              <span className="u-label u-label--tight text-[0.62rem] tracking-[0.28em]">CART</span>
              <span className={cx('flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[0.68rem] font-mono tabular-nums', count > 0 ? 'bg-ember text-white' : 'bg-bone/15 text-bone/60')}>
                {count}
              </span>
            </Link>
            <Link
              className="btn-solid !px-6 !py-[11px] !text-[0.62rem] tracking-[0.28em]"
              to="/shop"
              aria-label="Shop the collection"
            >
              SHOP
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <Link to="/search" aria-label="Search" className="flex h-9 w-9 items-center justify-center border border-bone/15 bg-bone/[0.04] text-bone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            </Link>
            <Link to="/cart" aria-label={`Cart ${count}`} className="relative flex h-9 items-center gap-1.5 border border-bone/15 bg-bone/[0.04] px-3 text-bone">
              <span className="u-label text-[0.6rem]">CART</span>
              <span className={cx('flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[0.6rem] font-mono', count > 0 ? 'bg-ember text-white' : 'bg-bone/15 text-bone/60')}>{count}</span>
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] border border-bone/18 bg-bone/[0.04] backdrop-blur text-bone transition-colors hover:bg-bone/10"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={cx(
                  'block h-px w-5 bg-current transition-transform duration-300 ease-editorial',
                  open && 'translate-y-[3.5px] rotate-45',
                )}
              />
              <span
                className={cx(
                  'block h-px w-5 bg-current transition-transform duration-300 ease-editorial',
                  open && '-translate-y-[3.5px] -rotate-45',
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet — stone-like, heavy */}
      <div
        id="mobile-menu"
        className={cx(
          'fixed inset-0 z-40 bg-ink/[0.96] backdrop-blur-[22px] transition-all duration-700 ease-editorial md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-center u-fluid-gutter">
          <ul className="space-y-1">
            {desktopLinks.map((link, i) => (
              <li key={link.href} style={{ transitionDelay: `${100 + i * 60}ms` }}>
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="u-display block py-3 text-[clamp(2.2rem,11vw,3.4rem)] tracking-tight text-bone/95 transition-colors hover:text-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ transitionDelay: `${100 + desktopLinks.length * 60}ms` }}>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="u-display block py-3 text-[clamp(2.2rem,11vw,3.4rem)] text-white"
              >
                SHOP —
              </Link>
            </li>
          </ul>

          <div className="mt-10 flex gap-6 border-t border-bone/[0.08] pt-7">
            <Link to="/search" tabIndex={open ? 0 : -1} className="u-label u-label--tight text-bone/55 hover:text-bone">Search</Link>
            <Link to="/cart" tabIndex={open ? 0 : -1} className="u-label u-label--tight text-bone/55 hover:text-bone">Cart ({count})</Link>
          </div>

          <div className="mt-8 space-y-3 border-t border-bone/[0.08] pt-7">
            <a className="u-label u-label--tight block text-bone/50 hover:text-bone" href={`mailto:${site.contact.email}`} tabIndex={open ? 0 : -1}>
              {site.contact.email}
            </a>
            <div className="flex gap-6">
              {site.contact.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  tabIndex={open ? 0 : -1}
                  className="u-label u-label--tight text-bone/45 hover:text-bone"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
