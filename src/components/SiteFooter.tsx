import { site } from '../config/site';
import BrandSymbol from './BrandSymbol';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative border-t border-bone/12 bg-ink pt-20 md:pt-28"
      aria-labelledby="footer-title"
    >
      <div className="u-fluid-gutter">
        <div className="grid grid-cols-12 gap-x-8 gap-y-14">
          {/* ---- identity ---- */}
          <div className="col-span-12 md:col-span-5">
            <h2 id="footer-title" className="sr-only">
              FAITH OVER FEAR RW — footer
            </h2>
            <span className="block w-24 text-bone">
              <BrandSymbol quiet />
            </span>
            <p className="u-display mt-7 text-[clamp(1.5rem,3.4vw,2.6rem)] text-bone">
              FAITH OVER FEAR
            </p>
            <p className="u-body mt-4 max-w-xs text-[0.92rem]">{site.footer.note}</p>
          </div>

          {/* ---- explore ---- */}
          <nav className="col-span-6 md:col-span-3" aria-label="Footer">
            <p className="u-label u-label--tight text-bone/40">Explore</p>
            <ul className="mt-6 space-y-3">
              {site.footer.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-underline u-label u-label--tight text-bone/75 hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---- contact ---- */}
          <div className="col-span-6 md:col-span-4">
            <p className="u-label u-label--tight text-bone/40">Contact</p>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline u-label u-label--tight break-all text-bone/75 hover:text-bone"
                >
                  {site.contact.email}
                </a>
              </li>
              {site.contact.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline u-label u-label--tight text-bone/75 hover:text-bone"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li className="u-label u-label--tight pt-2 text-bone/45">{site.contact.location}</li>
            </ul>
          </div>
        </div>

        <span className="rule mt-16" aria-hidden="true" />

        <div className="flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between">
          <p className="u-label u-label--tight text-bone/35">
            © {year} {site.name}
          </p>
          <div className="flex items-center gap-6">
            <p className="u-label u-label--tight text-bone/35">{site.tagline}</p>
            <a
              href="#hero"
              className="link-underline u-label u-label--tight text-bone/60 hover:text-bone"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
