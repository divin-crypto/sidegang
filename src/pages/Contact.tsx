import { useState } from 'react';
import SEO from '../components/SEO';
import { site } from '../config/site';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <SEO title="Contact" description="Contact FAITH OVER FEAR RW — faithoverfearsupport@gmail.com, Instagram @faithoverfear.rw__, TikTok @faithoverfear_brand. Kigali, Rwanda." canonical="/contact" />
      <section className="bg-ink pt-28 md:pt-36">
        <div className="u-fluid-gutter">
          <p className="u-label text-bone/40">05 — CONTACT</p>
          <h1 className="u-display mt-4 text-[clamp(2.4rem,7vw,5.5rem)] tracking-[-0.04em] text-bone">GET IN TOUCH</h1>
          <p className="u-body mt-6 max-w-xl">Questions about sizing, shipping, or a custom request? We&apos;re in Kigali and reply within 24 hours.</p>

          <div className="mt-12 grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7">
              {!sent ? (
                <form onSubmit={onSubmit} className="space-y-6 border border-bone/[0.08] bg-bone/[0.015] p-6 md:p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="col-span-2 md:col-span-1 flex flex-col gap-2">
                      <span className="u-label u-label--tight text-bone/40">Name</span>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="border border-bone/15 bg-ink px-4 py-3 text-[0.95rem] text-bone placeholder:text-bone/30" />
                    </label>
                    <label className="col-span-2 md:col-span-1 flex flex-col gap-2">
                      <span className="u-label u-label--tight text-bone/40">Email</span>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="border border-bone/15 bg-ink px-4 py-3 text-[0.95rem] text-bone placeholder:text-bone/30" />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="u-label u-label--tight text-bone/40">Message</span>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" className="border border-bone/15 bg-ink px-4 py-3 text-[0.95rem] text-bone placeholder:text-bone/30" />
                  </label>
                  <button type="submit" className="btn-solid w-full">Send message</button>
                  <p className="u-label u-label--tight text-center text-bone/35">Or email directly — faithoverfearsupport@gmail.com</p>
                </form>
              ) : (
                <div className="border border-bone/[0.08] bg-bone/[0.015] p-8 text-center">
                  <p className="u-label text-ember">Message received</p>
                  <h2 className="u-headline mt-4 text-[1.4rem] text-bone">We&apos;ll be in touch shortly.</h2>
                  <p className="u-body mt-4">Thanks, {form.name || 'friend'}. Our team in Kigali will reply to {form.email || 'your email'} within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="btn-outline mt-6">Send another</button>
                </div>
              )}
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-6">
              <div className="border border-bone/[0.07] bg-bone/[0.015] p-6">
                <p className="u-label u-label--tight text-bone/40">Email</p>
                <a href={`mailto:${site.contact.email}`} className="link-underline mt-3 inline-block font-mono text-[0.92rem] text-bone">{site.contact.email}</a>
              </div>
              <div className="border border-bone/[0.07] bg-bone/[0.015] p-6">
                <p className="u-label u-label--tight text-bone/40">Social</p>
                <div className="mt-3 flex flex-col gap-2">
                  {site.contact.socials.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noreferrer noopener" className="link-underline u-label u-label--tight text-bone/70 hover:text-bone">{s.label} — {s.href.replace('https://', '')}</a>
                  ))}
                </div>
              </div>
              <div className="border border-bone/[0.07] bg-bone/[0.015] p-6">
                <p className="u-label u-label--tight text-bone/40">Location</p>
                <p className="u-body mt-3 text-[0.92rem]">{site.contact.location}</p>
                <p className="u-body mt-2 text-[0.9rem] text-bone/60">Designed in Kigali. Shipped worldwide. Visit us online — the collection lives at faithoverfearrw.netlify.app/shop.</p>
              </div>
              <div className="aspect-[16/10] border border-bone/[0.07] bg-ink-700 flex items-center justify-center">
                <p className="u-label u-label--tight text-bone/30">Map — Kigali, Rwanda<br />— 1°56′S 30°03′E —</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
