import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Returns() {
  return (
    <>
      <SEO title="Returns & Exchanges" description="FAITH OVER FEAR RW returns — 14 days, unworn with tags. Exchanges for sizing." canonical="/returns" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">INFO — RETURNS</p>
          <h1 className="u-display mt-4 text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">RETURNS</h1>

          <div className="mt-10 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <div className="border border-bone/[0.06] bg-bone/[0.015] p-6 md:p-8">
                <h2 className="u-headline text-[1.2rem] text-bone">14-day returns</h2>
                <p className="u-body mt-4">You have 14 days from delivery to request a return. Items must be unworn, unwashed, and with original tags attached. We inspect every return by hand in Kigali.</p>
                <ul className="mt-4 list-disc pl-5 u-body text-[0.92rem]">
                  <li>Contact us within 14 days with your order number and reason.</li>
                  <li>We’ll issue a return authorization and prepaid label (Rwanda) or guidance (international).</li>
                  <li>Refunds are issued to the original payment method within 5–7 business days of receipt.</li>
                </ul>
              </div>

              <div className="border border-bone/[0.06] bg-bone/[0.015] p-6 md:p-8">
                <h2 className="u-headline text-[1.2rem] text-bone">Exchanges</h2>
                <p className="u-body mt-4">Need a different size? We offer one free exchange per order within Rwanda (subject to stock). Email us with your order number and desired size — we’ll hold it while your return is in transit.</p>
              </div>

              <div className="border border-bone/[0.06] bg-bone/[0.015] p-6 md:p-8">
                <h2 className="u-headline text-[1.2rem] text-bone">Non-returnable</h2>
                <ul className="mt-4 list-disc pl-5 u-body text-[0.92rem]">
                  <li>Sale, discounted, or promotional items — final sale</li>
                  <li>Socks, sticker packs, and accessories — hygiene reasons</li>
                  <li>Items washed, worn, altered, or without tags</li>
                </ul>
              </div>

              <div className="border border-bone/[0.06] bg-bone/[0.015] p-6 md:p-8">
                <h2 className="u-headline text-[1.2rem] text-bone">Damaged or wrong item?</h2>
                <p className="u-body mt-4">If we made a mistake, we’ll fix it at no cost. Email photos within 48 hours of delivery and we’ll arrange a replacement or full refund immediately.</p>
                <a href="mailto:faithoverfearsupport@gmail.com" className="btn-outline mt-6">faithoverfearsupport@gmail.com</a>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <div className="sticky top-24 border border-bone/[0.07] bg-bone/[0.015] p-6">
                <p className="u-label u-label--tight text-bone/40">Shipping info</p>
                <p className="u-body mt-3 text-[0.9rem]">See timelines and costs for Kigali & worldwide shipping.</p>
                <Link to="/shipping" className="btn-outline mt-6 w-full">Shipping →</Link>
                <Link to="/contact" className="link-underline mt-4 block u-label u-label--tight text-center text-bone/50 hover:text-bone">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
