import { useCallback, useEffect, useState } from 'react';
import SiteNavigation from './components/SiteNavigation';
import HeroSection from './components/HeroSection';
import BrandStatement from './components/BrandStatement';
import ProductShowcase from './components/ProductShowcase';
import CampaignSection from './components/CampaignSection';
import BrandStory from './components/BrandStory';
import CollectionCTA from './components/CollectionCTA';
import SiteFooter from './components/SiteFooter';
import { useCatalog } from './data/useCatalog';
import { heroMedia } from './config/site';

/** Publish the hero composition config to CSS (see `--cfg-*` in index.css). */
function CompositionVars() {
  const { composition } = heroMedia;
  return (
    <style>{`:root{--cfg-figure-scale:${composition.scale};--cfg-figure-x:${composition.focusX};--cfg-figure-y:${composition.focusY};--cfg-mark-width:${composition.markWidthVw}vw;--cfg-mark-top:${composition.markCenterY}%}`}</style>
  );
}

export default function App() {
  const { products, live } = useCatalog();
  const [heroReady, setHeroReady] = useState(false);

  const onHeroReady = useCallback(() => setHeroReady(true), []);

  // Hard ceiling: the veil never traps the page, even if a frame never lands.
  useEffect(() => {
    const t = window.setTimeout(() => setHeroReady(true), 3500);
    return () => window.clearTimeout(t);
  }, []);

  // Lift the loading veil.
  useEffect(() => {
    if (!heroReady) return;
    const veil = document.getElementById('boot-veil');
    if (!veil) return;
    veil.classList.add('is-out');
    const t = window.setTimeout(() => veil.remove(), 1000);
    return () => window.clearTimeout(t);
  }, [heroReady]);

  return (
    <>
      <CompositionVars />
      <SiteNavigation />
      <main id="main">
        <HeroSection onReady={onHeroReady} />
        <BrandStatement />
        <ProductShowcase products={products} live={live} />
        <CampaignSection />
        <BrandStory />
        <CollectionCTA />
      </main>
      <SiteFooter />
    </>
  );
}
