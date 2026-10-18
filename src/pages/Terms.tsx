import SEO from '../components/SEO';

export default function Terms() {
  return (
    <>
      <SEO title="Terms of Service" description="FAITH OVER FEAR RW terms — ordering, pricing, intellectual property, limitation of liability." canonical="/terms" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter max-w-3xl">
          <p className="u-label text-bone/40">LEGAL — TERMS</p>
          <h1 className="u-display mt-4 text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">TERMS</h1>
          <p className="u-label u-label--tight mt-4 text-bone/30">Effective: 18 October 2026</p>

          <div className="mt-10 space-y-8 u-body text-[0.96rem] leading-[1.75]">
            <div><h2 className="u-headline text-[1.1rem] text-bone">Ordering & pricing</h2><p className="mt-3">All prices are in Rwandan Francs (FRW) and include VAT where applicable. Shipping is calculated at checkout. We reserve the right to cancel orders in case of pricing errors or suspected fraud.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">Intellectual property</h2><p className="mt-3">All designs, imagery, copy, and the F&gt;F mark are the intellectual property of FAITH OVER FEAR RW. Do not reproduce without written permission.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">Use of site</h2><p className="mt-3">You agree not to scrape, overload, or misuse the store. We may restrict access if we detect abuse.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">Limitation of liability</h2><p className="mt-3">To the fullest extent allowed by Rwandan law, FAITH OVER FEAR RW is not liable for indirect, incidental, or consequential damages arising from use of the site or products.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">Governing law</h2><p className="mt-3">These terms are governed by the laws of Rwanda. Disputes are subject to the jurisdiction of courts in Kigali.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">Contact</h2><p className="mt-3"><a href="mailto:faithoverfearsupport@gmail.com" className="underline decoration-bone/20">faithoverfearsupport@gmail.com</a> · Kigali, Rwanda</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
