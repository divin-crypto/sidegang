import { useEffect, useState } from 'react';
import { site } from '../config/site';
import { cx } from '../lib/format';
import BrandSymbol from './BrandSymbol';

export default function SiteNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
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

  // Close the sheet if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open]);

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
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500',
          scrolled || open
            ? 'border-b border-bone/10 bg-ink/72 py-3 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent py-5 md:py-6',
        )}
      >
        <nav
          className="u-fluid-gutter flex items-center justify-between gap-6"
          aria-label="Primary"
        >
          {/* ---- wordmark ---- */}
          <a
            href="#hero"
            className="group flex items-center gap-3 text-bone"
            aria-label={`${site.name} — home`}
          >
            <span className="block w-11 shrink-0 transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5 md:w-12">
              <BrandSymbol quiet />
            </span>
            <span className="flex flex-col leading-none">
              <span className="u-label u-label--tight block text-[0.58rem] text-bone md:text-[0.64rem]">
                FAITH OVER FEAR
              </span>
              <span className="u-label u-label--tight block text-[0.58rem] text-bone/45 md:text-[0.64rem]">
                RW · KIGALI
              </span>
            </span>
          </a>

          {/* ---- desktop links ---- */}
          <div className="hidden items-center gap-9 md:flex">
            {site.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline u-label u-label--tight text-bone/65 transition-colors duration-300 hover:text-bone"
              >
                {link.label}
              </a>
            ))}
            <a className="btn-outline !px-6 !py-2.5" href={site.nav.shop.href}>
              {site.nav.shop.label}
            </a>
          </div>

          {/* ---- mobile trigger ---- */}
          <div className="flex items-center gap-3 md:hidden">
            <a className="btn-outline !px-4 !py-2" href={site.nav.shop.href}>
              {site.nav.shop.label}
            </a>
            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] border border-bone/25 text-bone"
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

      {/* ---- mobile sheet ---- */}
      <div
        id="mobile-menu"
        className={cx(
          'fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl transition-opacity duration-500 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-center u-fluid-gutter">
          <ul className="space-y-2">
            {site.nav.links.map((link, i) => (
              <li key={link.href} style={{ transitionDelay: `${120 + i * 70}ms` }}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="u-headline block py-2 text-[clamp(2rem,11vw,3.25rem)] text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li style={{ transitionDelay: `${120 + site.nav.links.length * 70}ms` }}>
              <a
                href={site.nav.shop.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="u-headline block py-2 text-[clamp(2rem,11vw,3.25rem)] text-ember"
              >
                {site.nav.shop.label}
              </a>
            </li>
          </ul>

          <div className="mt-14 space-y-2 border-t border-bone/12 pt-6">
            <a
              className="u-label u-label--tight block text-bone/60"
              href={`mailto:${site.contact.email}`}
              tabIndex={open ? 0 : -1}
            >
              {site.contact.email}
            </a>
            <div className="flex gap-5">
              {site.contact.socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  tabIndex={open ? 0 : -1}
                  className="u-label u-label--tight text-bone/60 hover:text-bone"
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
