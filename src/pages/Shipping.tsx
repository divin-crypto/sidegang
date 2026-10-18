import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Shipping() {
  return (
    <>
      <SEO title="Shipping" description="FAITH OVER FEAR RW shipping — timelines, costs, tracking. From Kigali, worldwide." canonical="/shipping" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">INFO — SHIPPING</p>
          <h1 className="u-display mt-4 text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">SHIPPING</h1>

          <div className="mt-10 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-10">
              <div className="border border-bone/[0.06] bg-bone/[0.015] p-6 md:p-8">
                <h2 className="u-headline text-[1.2rem] text-bone">Timelines</h2>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-left text-[0.9rem]">
                    <thead><tr className="u-label u-label--tight text-bone/40"><th className="pb-3 font-normal">Destination</th><th className="pb-3 font-normal">Timeline</th><th className="pb-3 font-normal">Tracked</th></tr></thead>
                    <tbody className="divide-y divide-bone/[0.06] font-mono text-[0.85rem] tabular-nums text-bone/70">
                      <tr><td className="py-3">Kigali & Rwanda</td><td className="py-3">2–4 business days</td><td className="py-3">Yes</td></tr>
                      <tr><td className="py-3">East Africa (UG, KE, TZ, BI)</td><td className="py-3">5–8 business days</td><td className="py-3">Yes</td></tr>
                      <tr><td className="py-3">Rest of Africa</td><td className="py-3">7–12 business days</td><td className="py-3">Yes</td></tr>
                      <tr><td className="py-3">Europe & UK</td><td className="py-3">10–14 business days</td><td className="py-3">Yes</td></tr>
                      <tr><td className="py-3">North America</td><td className="py-3">10–16 business days</td><td className="py-3">Yes</td></tr>
                      <tr><td className="py-3">Rest of World</td><td className="py-3">12–18 business days</td><td className="py-3">Yes</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="u-body mt-6 text-[0.9rem]">We ship from Kigali, Rwanda via trusted couriers (DHL / local partners). You’ll receive a tracking link by email once your order leaves the studio. Timelines are estimates — customs can add 1–3 days.</p>
              </div>

              <div className="border border-bone/[0.06] bg-bone/[0.015] p-6 md:p-8">
                <h2 className="u-headline text-[1.2rem] text-bone">Costs</h2>
                <p className="u-body mt-4">Shipping is calculated at checkout based on destination and weight. No hidden fees — what you see at checkout is what you pay. Orders over 100,000 FRW ship free within Rwanda.</p>
                <ul className="mt-4 list-disc pl-5 u-body text-[0.92rem] marker:text-bone/40">
                  <li>Rwanda: from 3,000 FRW</li>
                  <li>East Africa: from 8,000 FRW</li>
                  <li>International: from 15,000 FRW</li>
                </ul>
              </div>

              <div className="border border-bone/[0.06] bg-bone/[0.015] p-6 md:p-8">
                <h2 className="u-headline text-[1.2rem] text-bone">Handling</h2>
                <p className="u-body mt-4">Orders are processed within 1–2 business days (Mon–Fri). During drops, please allow up to 3 days. We fold and pack each piece by hand — no plastic polybags, minimal waste.</p>
                <p className="u-body mt-3">Questions? <a href="mailto:faithoverfearsupport@gmail.com" className="underline decoration-bone/20 hover:text-bone">faithoverfearsupport@gmail.com</a></p>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4">
              <div className="sticky top-24 border border-bone/[0.07] bg-bone/[0.015] p-6">
                <p className="u-label u-label--tight text-bone/40">Need to return?</p>
                <p className="u-body mt-3 text-[0.9rem]">We accept returns within 14 days for unworn items.</p>
                <Link to="/returns" className="btn-outline mt-6 w-full">Returns policy</Link>
                <Link to="/faq" className="link-underline mt-4 block u-label u-label--tight text-center text-bone/50 hover:text-bone">FAQ →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
