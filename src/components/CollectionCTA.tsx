import { site } from '../config/site';
import Reveal from './Reveal';

const { finalCta } = site;

export default function CollectionCTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-bone/10 bg-ink-800 py-28 md:py-44"
      aria-labelledby="final-cta-title"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,231,221,0.075)_0%,transparent_62%)]"
      />

      <div className="u-fluid-gutter relative text-center">
        <Reveal>
          <p className="u-label text-bone/45">{finalCta.index}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="final-cta-title"
            className="u-display mx-auto mt-7 max-w-[14ch] text-[clamp(2.5rem,8.6vw,7.5rem)] text-bone md:mt-10"
          >
            {finalCta.title}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="u-body mx-auto mt-8 max-w-md">{finalCta.body}</p>
        </Reveal>

        <Reveal delay={0.18} className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a className="btn-solid" href={finalCta.cta.href}>
            {finalCta.cta.label}
          </a>
          <a className="btn-outline" href={finalCta.secondary.href}>
            {finalCta.secondary.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
