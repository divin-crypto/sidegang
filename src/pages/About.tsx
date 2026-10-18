import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { site } from '../config/site';

export default function About() {
  return (
    <>
      <SEO title="About" description="About FAITH OVER FEAR RW — a faith-inspired streetwear brand from Kigali, Rwanda. Our conviction, quality, and stand." canonical="/about" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">04 — ABOUT</p>
          <h1 className="u-display mt-4 max-w-[14ch] text-[clamp(2.4rem,7vw,5.75rem)] tracking-[-0.04em] text-bone">WE CREATE ARMOUR FOR THE BOLD</h1>
          <span className="rule mt-10" aria-hidden="true" />

          <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-14">
            {site.purpose.blocks.map((block, i) => (
              <div key={block.label} className={i === 0 ? 'col-span-12 md:col-span-6' : i === 1 ? 'col-span-12 md:col-span-5 md:col-start-8' : 'col-span-12 md:col-span-7'}>
                <p className="u-label u-label--tight text-ember">{block.label}</p>
                <p className={i === 0 ? 'u-headline mt-5 text-[clamp(1.15rem,2.1vw,1.68rem)] leading-[1.15] text-bone' : 'u-body mt-5 text-bone/70'}>{block.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-12 gap-6 border-y border-bone/[0.06] bg-bone/[0.015] py-10 md:py-12">
            <div className="col-span-12 md:col-span-4">
              <p className="u-label text-bone/40">Manifesto</p>
              <h2 className="u-headline mt-4 text-[1.3rem] tracking-tight text-bone">FAITH OVER FEAR IS NOT A LABEL. IT&apos;S A DECLARATION.</h2>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="u-body">Born in the streets of Rwanda and designed for the global movement, we bridge the gap between spiritual conviction and streetwear culture. Every piece carries a message. Every stitch represents a stand. Designed in Kigali. Crafted for the world.</p>
              <p className="u-body mt-4">F&gt;F represents more than fashion; it&apos;s a mindset that refuses to be silenced. From 400GSM heavyweight hoodies to precision-cut essential tees, we prioritize the fabric that carries our message — engineered for longevity and comfort.</p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6 border border-bone/[0.07] bg-bone/[0.015] p-6 md:p-8">
              <p className="u-label u-label--tight text-bone/40">Location</p>
              <p className="u-headline mt-3 text-[1.1rem] text-bone">Kigali, Rwanda</p>
              <p className="u-body mt-3 text-[0.9rem]">The beating heart of the brand. Every drop is imagined here, cut and finished in limited runs — then shipped worldwide.</p>
            </div>
            <div className="col-span-12 md:col-span-6 border border-bone/[0.07] bg-bone/[0.015] p-6 md:p-8">
              <p className="u-label u-label--tight text-bone/40">Contact</p>
              <p className="mt-3"><a href={`mailto:${site.contact.email}`} className="link-underline u-label u-label--tight text-bone hover:text-bone">{site.contact.email}</a></p>
              <div className="mt-3 flex gap-4">
                {site.contact.socials.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer noopener" className="u-label u-label--tight text-bone/60 hover:text-bone">{s.label}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/shop" className="btn-solid">Shop the collection</Link>
            <Link to="/contact" className="btn-outline">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
