import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <>
      <SEO title="Privacy Policy" description="FAITH OVER FEAR RW privacy — how we handle your data, cookies, and rights." canonical="/privacy" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter max-w-3xl">
          <p className="u-label text-bone/40">LEGAL — PRIVACY</p>
          <h1 className="u-display mt-4 text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">PRIVACY</h1>
          <p className="u-label u-label--tight mt-4 text-bone/30">Effective: 18 October 2026 · Kigali, Rwanda</p>

          <div className="mt-10 space-y-8 u-body text-[0.96rem] leading-[1.75]">
            <div><h2 className="u-headline text-[1.1rem] text-bone">What we collect</h2><p className="mt-3">We collect only what we need to run the store: your name, email, shipping address, order contents, and payment confirmation. We do not store payment card numbers — those are handled by our secure checkout provider.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">Cookies</h2><p className="mt-3">We use essential cookies for cart persistence and session security, and analytics cookies (if you consent) to understand which pieces resonate. You can block non-essential cookies in your browser at any time.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">How we use it</h2><p className="mt-3">To fulfill orders, ship from Kigali, send tracking updates, respond to support requests, and — only if you opt in — share drop announcements. We never sell your data.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">Retention</h2><p className="mt-3">Order data is kept for 5 years for accounting and warranty reasons. Support messages are kept for 2 years. You can request deletion (where legally allowed) by emailing faithoverfearsupport@gmail.com.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">Your rights</h2><p className="mt-3">You can access, correct, or delete your personal data, object to processing, and withdraw consent for marketing at any time. Contact us to exercise these rights.</p></div>
            <div><h2 className="u-headline text-[1.1rem] text-bone">Contact</h2><p className="mt-3">FAITH OVER FEAR RW · Kigali, Rwanda · <a href="mailto:faithoverfearsupport@gmail.com" className="underline decoration-bone/20">faithoverfearsupport@gmail.com</a></p></div>
          </div>
        </div>
      </section>
    </>
  );
}
