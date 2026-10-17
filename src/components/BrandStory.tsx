import { site } from '../config/site';
import Reveal from './Reveal';

const { purpose } = site;

export default function BrandStory() {
  return (
    <section
      id="purpose"
      className="relative border-t border-bone/10 bg-ink py-24 md:py-36"
      aria-labelledby="purpose-title"
    >
      <div className="u-fluid-gutter">
        <Reveal>
          <p className="u-label text-bone/45">{purpose.index}</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2
            id="purpose-title"
            className="u-display mt-6 max-w-[15ch] text-[clamp(2.3rem,7vw,5.75rem)] text-bone md:mt-10"
          >
            {purpose.title}
          </h2>
        </Reveal>

        <span className="rule mt-12" aria-hidden="true" />

        <div className="mt-14 grid grid-cols-12 gap-x-8 gap-y-14 md:mt-20">
          {purpose.blocks.map((block, i) => (
            <Reveal
              key={block.label}
              className={
                i === 0
                  ? 'col-span-12 md:col-span-6'
                  : i === 1
                    ? 'col-span-12 md:col-span-5 md:col-start-8'
                    : 'col-span-12 md:col-span-7'
              }
              delay={i * 0.08}
            >
              <p className="u-label u-label--tight text-ember">{block.label}</p>
              <p
                className={
                  i === 0
                    ? 'u-headline mt-5 text-[clamp(1.15rem,2.1vw,1.7rem)] text-bone'
                    : 'u-body mt-5'
                }
              >
                {block.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16 md:mt-24">
          <a className="btn-outline" href={purpose.cta.href}>
            {purpose.cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
