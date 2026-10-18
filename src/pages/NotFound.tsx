import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Not found" description="Page not found — FAITH OVER FEAR RW." canonical="/404" noIndex />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter py-20 text-center">
          <p className="u-label text-bone/40">404 — Not found</p>
          <h1 className="u-display mt-4 text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">LOST IN FAITH</h1>
          <p className="u-body mt-6 mx-auto max-w-xl">The page you’re looking for doesn’t exist or has moved. The collection is still here — every piece, every story, from Kigali.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-solid">Back home</Link>
            <Link to="/shop" className="btn-outline">Shop all</Link>
            <Link to="/contact" className="btn-outline">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
