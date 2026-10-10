import { useRef } from 'react';
import { site } from '../config/site';
import { cloudinary, dropAssets } from '../data/products';
import { useParallax } from '../hooks/useParallax';
import Reveal from './Reveal';

const { campaign } = site;

const WIDTHS = [720, 1100, 1600, 2000];

function campaignSrcSet(path: string) {
  return WIDTHS.map((w) => `${cloudinary(path, w)} ${w}w`).join(', ');
}

export default function CampaignSection() {
  const abideRef = useRef<HTMLImageElement | null>(null);
  const genesisRef = useRef<HTMLImageElement | null>(null);

  useParallax(abideRef, 90, { scale: 1.12 });
  useParallax(genesisRef, 60, { scale: 1.1 });

  return (
    <section
      id="campaign"
      className="relative border-t border-bone/10 bg-ink-800 py-24 md:py-32"
      aria-labelledby="campaign-title"
    >
      <div className="u-fluid-gutter">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="u-label text-bone/45">{campaign.index}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2
                id="campaign-title"
                className="u-display mt-5 text-[clamp(2.6rem,8vw,6.5rem)] text-bone"
              >
                {campaign.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="u-label u-label--tight text-bone/40">{campaign.scripture}</p>
          </Reveal>
        </div>
      </div>

      {/* ---- large format campaign plate ---- */}
      <Reveal className="mt-14 md:mt-20" wipe>
        <figure className="relative">
          <div className="relative h-[62svh] min-h-[22rem] w-full overflow-hidden bg-ink-700 md:h-[86svh]">
            <img
              ref={abideRef}
              src={cloudinary(dropAssets.abide, 1600)}
              srcSet={campaignSrcSet(dropAssets.abide)}
              sizes="100vw"
              alt="ABIDE campaign image from the FAITH OVER FEAR RW collection"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
            />
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-ink/45"
              aria-hidden="true"
            />
            <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 u-fluid-gutter pb-7">
              <span className="u-label u-label--tight text-bone/70">ABIDE — THE DROP</span>
            </figcaption>
          </div>

          <Reveal delay={0.08} className="u-fluid-gutter mt-10">
            <p className="u-body max-w-3xl">{campaign.body}</p>
          </Reveal>
        </figure>
      </Reveal>

      {/* ---- secondary plate, deliberately off-axis ---- */}
      <div className="u-fluid-gutter mt-24 grid grid-cols-12 items-center gap-x-8 gap-y-10 md:mt-36">
        <Reveal className="col-span-12 md:col-span-7" wipe>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-700">
            <img
              ref={genesisRef}
              src={cloudinary(dropAssets.genesis, 1100)}
              srcSet={campaignSrcSet(dropAssets.genesis)}
              sizes="(max-width: 767px) 92vw, 56vw"
              alt="GENESIS campaign image from FAITH OVER FEAR RW"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
            />
          </div>
        </Reveal>

        <Reveal className="col-span-12 md:col-span-5 md:pl-6" delay={0.1}>
          <p className="u-label text-bone/45">PREVIOUS DROP</p>
          <h3 className="u-headline mt-4 text-[clamp(1.6rem,3.6vw,2.9rem)] text-bone">
            {campaign.secondaryTitle}
          </h3>
          <p className="u-body mt-5 text-[0.95rem]">{campaign.secondaryBody}</p>
        </Reveal>
      </div>
    </section>
  );
}
