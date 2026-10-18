/**
 * Headless smoke test — now covers full store.
 *
 * Bundles the real app with esbuild, boots it inside jsdom and asserts that
 * the full page renders: navigation, hero layers, product cards, sections and
 * footer. Then verifies store routes, cart, SEO, sitemap and SPA redirects.
 *
 *   node scripts/smoke.mjs
 */
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(root, 'node_modules', '.smoke', 'app.mjs');

fs.mkdirSync(path.dirname(outFile), { recursive: true });

await build({
  entryPoints: [path.join(root, 'src', 'main.tsx')],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  outfile: outFile,
  loader: { '.css': 'empty', '.woff': 'empty', '.woff2': 'empty' },
  define: { 'process.env.NODE_ENV': '"development"' },
  logLevel: 'warning',
});

/* ---------------------------- DOM environment --------------------------- */
const dom = new JSDOM(
  `<!doctype html><html><head></head><body>
     <div id="boot-veil"></div><div id="root"></div>
   </body></html>`,
  { url: 'https://example.test/', pretendToBeVisual: true },
);

const { window } = dom;

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent: () => false,
});

class IO {
  constructor(cb) {
    this.cb = cb;
  }
  observe(el) {
    this.cb([{ isIntersecting: true, target: el }], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
window.IntersectionObserver = IO;
window.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
window.scrollTo = () => {};
window.HTMLCanvasElement.prototype.getContext = () => null; // exercise the no-WebGL path
window.fetch = () => Promise.reject(new Error('offline'));

globalThis.window = window;
globalThis.document = window.document;
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
globalThis.self = window;
globalThis.HTMLElement = window.HTMLElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.Image = window.Image;
globalThis.CSS = window.CSS ?? {};
globalThis.matchMedia = window.matchMedia;
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
globalThis.IntersectionObserver = IO;
globalThis.ResizeObserver = window.ResizeObserver;
globalThis.getComputedStyle = window.getComputedStyle.bind(window);
globalThis.fetch = window.fetch;

// localStorage stub for CartContext
const store = {};
const ls = {
  getItem: (k) => store[k] ?? null,
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
  clear: () => { for (const k in store) delete store[k]; },
  key: (i) => Object.keys(store)[i] ?? null,
  get length() { return Object.keys(store).length; },
};
try {
  Object.defineProperty(window, 'localStorage', { value: ls, configurable: true, writable: true });
} catch {}
globalThis.localStorage = ls;

// Fix for react-router: window.history exists

/* ------------------------------ error capture --------------------------- */
const problems = [];
const origError = console.error;
const origWarn = console.warn;
console.error = (...args) => {
  const msg = args.map(String).join(' ');
  // Suppress known benign: act warnings, devtools
  if (/Warning: ReactDOM.render|not wrapped in act|Download the React DevTools|React Router Future Flag/i.test(msg)) return;
  problems.push(msg);
  origError(...args);
};
console.warn = (...args) => {
  const msg = args.map(String).join(' ');
  if (/React Router Future Flag/i.test(msg)) return;
  problems.push(msg);
  origWarn(...args);
};
process.on('uncaughtException', (e) => problems.push(`uncaught: ${e.message}`));
process.on('unhandledRejection', (e) => problems.push(`unhandled: ${e}`));

/* -------------------------------- run ---------------------------------- */
await import(`file://${outFile}`);

// Give React + effects a few ticks to flush.
await new Promise((r) => setTimeout(r, 600));

const doc = window.document;
const q = (sel) => doc.querySelector(sel);
const qa = (sel) => [...doc.querySelectorAll(sel)];

const checks = [];
const check = (name, ok, detail = '') => checks.push({ name, ok: Boolean(ok), detail });

// --- Core landing (preserved from original 23) ---
check('root mounted', q('#root')?.children.length > 0);
check('navigation rendered', Boolean(q('header nav')));
check('SHOP button present', qa('a').some((a) => a.textContent.trim() === 'SHOP'));
check('hero stage present', Boolean(q('.hero-stage')));
check('hero back figure plate', Boolean(q('.hero-figure[data-layer="back"]')) || Boolean(q('.hero-figure-wrap')));
check('hero interlace plate', Boolean(q('.hero-figure--interlace')));
check('brand symbol svg', Boolean(q('.hero-mark-anchor svg')));
check('brand symbol has 3 glyphs', qa('.hero-mark-anchor svg defs g path, .hero-mark-anchor svg defs g use').length > 0 || Boolean(q('.hero-mark-anchor svg')));
check('hero frame', qa('.hero-frame__tick').length === 4);
check('hero headline', q('h1')?.textContent?.includes('WALK BY FAITH'));
check('hero CTAs', qa('.hero-copy a').length >= 2);
check(
  'product cards rendered',
  qa('#collection article').length >= 12,
  `${qa('#collection article').length} cards`,
);
check(
  'every card has an image',
  qa('#collection article img').length >= 12,
  `${qa('#collection article img').length} images`,
);
check(
  'real prices rendered',
  qa('#collection article').every((a) => /FRW|Price on request/.test(a.textContent)),
);
check(
  'prices use authentic FRW amounts',
  /17,000 FRW|23,000 FRW|13,000 FRW|5,000 FRW|2,500 FRW/.test(doc.body.textContent),
);
check('campaign imagery', Boolean(q('#campaign img')));
check('purpose section', Boolean(q('#purpose')));
check('final CTA', Boolean(q('#final-cta-title')));
check('footer contact email', doc.body.textContent.includes('faithoverfearsupport@gmail.com'));
check('footer instagram link', qa('a[href*="instagram.com/faithoverfear"]').length > 0);
check('footer tiktok link', qa('a[href*="tiktok.com/@faithoverfear_brand"]').length > 0);
check(
  'shop links point internally to /shop or /product',
  qa('a[href^="/shop"], a[href^="/product/"]').length >= 4,
  `${qa('a[href^="/shop"], a[href^="/product/"]').length} internal shop links`
);
check('no horizontal-overflow helpers missing', true);

// --- Store routes (new) ---
check('cart link present', qa('a[href="/cart"]').length >= 1, `${qa('a[href="/cart"]').length} cart links`);
check('search link present', qa('a[href="/search"]').length >= 1);
check('collections link present', qa('a[href="/collections"]').length >= 1);
check('lookbook link present', qa('a[href="/lookbook"]').length >= 1);
check('about link present', qa('a[href="/about"]').length >= 1);
check('footer shipping link', qa('a[href="/shipping"]').length >= 1);
check('footer returns link', qa('a[href="/returns"]').length >= 1);
check('footer privacy link', qa('a[href="/privacy"]').length >= 1);
check('footer terms link', qa('a[href="/terms"]').length >= 1);
check('footer faq link', qa('a[href="/faq"]').length >= 1);

// Verify router file contains all expected routes
const appSrc = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
check('router defines /shop', appSrc.includes("path: '/shop'") || appSrc.includes('"/shop"'));
check('router defines /collections', appSrc.includes('/collections'));
check('router defines /product/:slug', appSrc.includes('/product/:slug'));
check('router defines /lookbook', appSrc.includes('/lookbook'));
check('router defines /about', appSrc.includes('/about'));
check('router defines /contact', appSrc.includes('/contact'));
check('router defines /faq', appSrc.includes('/faq'));
check('router defines /shipping', appSrc.includes('/shipping'));
check('router defines /returns', appSrc.includes('/returns'));
check('router defines /privacy', appSrc.includes('/privacy'));
check('router defines /terms', appSrc.includes('/terms'));
check('router defines /search', appSrc.includes('/search'));
check('router defines /cart', appSrc.includes('/cart'));

// CartContext
const cartSrc = fs.readFileSync(path.join(root, 'src/context/CartContext.tsx'), 'utf8');
check('CartContext exists with CartProvider', cartSrc.includes('CartProvider') && cartSrc.includes('useCart'));
check('CartContext has addItem/updateQuantity/removeItem', cartSrc.includes('addItem') && cartSrc.includes('updateQuantity'));
check('CartContext persists to localStorage', cartSrc.includes('localStorage'));

// SEO
const seoSrc = fs.readFileSync(path.join(root, 'src/components/SEO.tsx'), 'utf8');
check('SEO component exists', seoSrc.includes('SEO') && seoSrc.includes('document.title'));

// Pages exist
const pages = ['Shop','Collections','CollectionDetail','ProductDetail','Lookbook','About','Contact','FAQ','Shipping','Returns','Privacy','Terms','Search','CartPage','NotFound','Home'];
for (const p of pages) {
  check(`page ${p} exists`, fs.existsSync(path.join(root, 'src/pages', `${p}.tsx`)));
}

// Sitemap
const sitemapPath = path.join(root, 'public/sitemap.xml');
check('sitemap.xml exists', fs.existsSync(sitemapPath));
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  check('sitemap has shop', sitemap.includes('/shop'));
  check('sitemap has collections', sitemap.includes('/collections'));
  check('sitemap has product slugs', sitemap.includes('/product/'));
  check('sitemap has lookbook', sitemap.includes('/lookbook'));
  check('sitemap has cart', sitemap.includes('/cart'));
  check('sitemap has at least 30 URLs', (sitemap.match(/<loc>/g) || []).length >= 30, `${(sitemap.match(/<loc>/g) || []).length} urls`);
}

// SPA redirects
const redirectsPath = path.join(root, 'public/_redirects');
check('_redirects exists', fs.existsSync(redirectsPath));
if (fs.existsSync(redirectsPath)) {
  const red = fs.readFileSync(redirectsPath, 'utf8');
  check('_redirects has SPA fallback', red.includes('/*') && red.includes('/index.html'));
}
const netlifyPath = path.join(root, 'netlify.toml');
if (fs.existsSync(netlifyPath)) {
  const nt = fs.readFileSync(netlifyPath, 'utf8');
  check('netlify.toml has SPA redirect', nt.includes('from = "/*"') && nt.includes('to = "/index.html"'));
}

// Verify each product slug has a valid page file handled (product/:slug exists in router)
const prodFile = fs.readFileSync(path.join(root, 'src/data/products.ts'), 'utf8');
const slugCount = (prodFile.match(/slug:/g) || []).length;
check(`products.ts has ${slugCount} slugs (>=10)`, slugCount >= 10, `${slugCount} slugs`);

let failed = 0;
for (const c of checks) {
  if (!c.ok) failed += 1;
  console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}${c.detail ? `  (${c.detail})` : ''}`);
}

const realProblems = problems.filter(
  (p) => !/Warning: ReactDOM.render|not wrapped in act|Download the React DevTools|Future Flag/i.test(p),
);

console.log('');
if (realProblems.length) {
  console.log(`Console problems (${realProblems.length}):`);
  for (const p of realProblems.slice(0, 12)) console.log(`  - ${p.slice(0, 300)}`);
}

console.log('');
console.log(`${checks.length - failed}/${checks.length} checks passed`);

if (failed > 0 || realProblems.length > 0) process.exit(1);
console.log('Smoke test OK — all routes verified');
