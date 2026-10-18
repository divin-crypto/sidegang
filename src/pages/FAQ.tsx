import SEO from '../components/SEO';

const faqs = [
  { q: 'What sizes do you offer?', a: 'Every tee and long sleeve runs S → XXL in an oversized, relaxed fit. Check each product page for size selection. If you’re between sizes, we recommend sizing down for a classic fit or keeping your true size for the intended oversized drape.' },
  { q: 'How do I know my size?', a: 'Our tees are garment-dyed heavyweight cotton with very little shrinkage. S fits chest 96cm, M 102cm, L 108cm, XL 116cm, XXL 124cm. Measurements are laid flat, seam-to-seam. Need help? Email faithoverfearsupport@gmail.com with your height and weight.' },
  { q: 'Where are your products made?', a: 'Designed in Kigali, Rwanda. We prioritize premium, ethically sourced materials and limited production runs — never mass-produced, always intentional.' },
  { q: 'How long is shipping?', a: 'Kigali & Rwanda: 2–4 business days. East Africa: 5–8 days. Worldwide: 10–18 days. You’ll receive a tracking link once your order ships. See /shipping for full details.' },
  { q: 'What’s your return policy?', a: 'You have 14 days from delivery to request a return for unworn, unwashed items with tags attached. Sale and discounted items are final sale. See /returns.' },
  { q: 'How do I wash my FAITH OVER FEAR pieces?', a: 'Wash cold, inside-out, with like colors. Do not bleach. Tumble dry low or hang dry. Warm iron inside-out if needed. The heavyweight cotton softens beautifully over time.' },
  { q: 'Is checkout secure?', a: 'Yes. Checkout is handled via our secure storefront with encrypted payment processing. We never store your card details.' },
  { q: 'Do you restock sold-out sizes?', a: 'Sometimes. Production runs are limited — when a size moves, it moves. Follow @faithoverfear.rw__ on Instagram for restock announcements, or join the waitlist on the product page.' },
];

export default function FAQ() {
  return (
    <>
      <SEO title="FAQ" description="FAITH OVER FEAR RW FAQ — sizing, shipping, care, returns, restocks. Answers from Kigali." canonical="/faq" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">HELP — FAQ</p>
          <h1 className="u-display mt-4 text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">QUESTIONS & ANSWERS</h1>
          <p className="u-body mt-6 max-w-xl">Everything from sizing to shipping — honest answers, no fluff.</p>

          <div className="mt-12 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <div className="divide-y divide-bone/[0.06] border-y border-bone/[0.06]">
                {faqs.map((f, i) => (
                  <details key={f.q} className="group py-6" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <h2 className="u-headline text-[1.05rem] leading-tight tracking-tight text-bone">{f.q}</h2>
                      <span className="shrink-0 font-mono text-bone/40 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="u-body mt-4 pr-8 text-[0.95rem]">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="border border-bone/[0.07] bg-bone/[0.015] p-6 sticky top-24">
                <p className="u-label u-label--tight text-bone/40">Still stuck?</p>
                <p className="u-body mt-3 text-[0.9rem]">Email us — we reply within 24 hours from Kigali.</p>
                <a href="mailto:faithoverfearsupport@gmail.com" className="btn-outline mt-6 w-full">faithoverfearsupport@gmail.com</a>
                <div className="mt-6 flex gap-4">
                  <a href="/shipping" className="link-underline u-label u-label--tight text-bone/50 hover:text-bone">Shipping</a>
                  <a href="/returns" className="link-underline u-label u-label--tight text-bone/50 hover:text-bone">Returns</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
