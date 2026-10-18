import { site } from '../config/site';
import BrandSymbol from './BrandSymbol';

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="relative border-t border-bone/[0.08] bg-ink pt-20 md:pt-28" aria-labelledby="footer-title">
      <div className="u-fluid-gutter">
        <div className="grid grid-cols-12 gap-x-8 gap-y-14">
          <div className="col-span-12 md:col-span-5">
            <h2 id="footer-title" className="sr-only">
              FAITH OVER FEAR RW — footer
            </h2>
            <span className="block w-24 text-bone">
              <BrandSymbol quiet />
            </span>
            <p className="u-display mt-7 text-[clamp(1.5rem,3.4vw,2.6rem)] tracking-[-0.04em] text-bone">FAITH OVER FEAR</p>
            <p className="u-body mt-4 max-w-xs text-[0.92rem] text-bone/65">{site.footer.note}</p>
            <p className="u-label u-label--tight mt-6 text-bone/30">Kigali · Rwanda · Est. Faith Inspired Streetwear</p>
          </div>
          <nav className="col-span-6 md:col-span-3" aria-label="Footer">
            <p className="u-label u-label--tight text-bone/35">Explore</p>
            <ul className="mt-6 space-y-3">
              {site.footer.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline u-label u-label--tight text-bone/70 hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-6 md:col-span-4">
            <p className="u-label u-label--tight text-bone/35">Contact</p>
            <ul className="mt-6 space-y-3">
              <li>
                <a href={`mailto:${site.contact.email}`} className="link-underline u-label u-label--tight break-all text-bone/70 hover:text-bone">
                  {site.contact.email}
                </a>
              </li>
              {site.contact.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer noopener" className="link-underline u-label u-label--tight text-bone/70 hover:text-bone">
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="u-label u-label--tight pt-2 text-bone/40">{site.contact.location}</li>
            </ul>
          </div>
        </div>
        <span className="rule mt-16" aria-hidden="true" />
        <div className="flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between">
          <p className="u-label u-label--tight text-bone/30">© {year} {site.name} — Monolithic Minimalism · Architectural Sculptural Mark</p>
          <div className="flex items-center gap-6">
            <p className="u-label u-label--tight text-bone/30">{site.tagline}</p>
            <a href="#hero" className="link-underline u-label u-label--tight text-bone/50 hover:text-bone">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
