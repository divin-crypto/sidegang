/**
 * Headless smoke test.
 *
 * Bundles the real app with esbuild, boots it inside jsdom and asserts that
 * the full page renders: navigation, hero layers, product cards, sections and
 * footer. Fails loudly on any React warning, uncaught exception or missing
 * product data.
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

/* ------------------------------ error capture --------------------------- */
const problems = [];
const origError = console.error;
const origWarn = console.warn;
console.error = (...args) => {
  problems.push(args.map(String).join(' '));
  origError(...args);
};
console.warn = (...args) => {
  problems.push(args.map(String).join(' '));
  origWarn(...args);
};
process.on('uncaughtException', (e) => problems.push(`uncaught: ${e.message}`));
process.on('unhandledRejection', (e) => problems.push(`unhandled: ${e}`));

/* -------------------------------- run ---------------------------------- */
await import(`file://${outFile}`);

// Give React + effects a few ticks to flush.
await new Promise((r) => setTimeout(r, 400));

const doc = window.document;
const q = (sel) => doc.querySelector(sel);
const qa = (sel) => [...doc.querySelectorAll(sel)];

const checks = [];
const check = (name, ok, detail = '') => checks.push({ name, ok: Boolean(ok), detail });

check('root mounted', q('#root')?.children.length > 0);
check('navigation rendered', Boolean(q('header nav')));
check('SHOP button present', qa('a').some((a) => a.textContent.trim() === 'SHOP'));
check('hero stage present', Boolean(q('.hero-stage')));
check('hero back figure plate', Boolean(q('.hero-figure[data-layer="back"]')));
check('hero interlace plate', Boolean(q('.hero-figure--interlace')));
check('brand symbol svg', Boolean(q('.hero-mark-anchor svg')));
check('brand symbol has 3 glyphs', qa('.hero-mark-anchor svg defs g path, .hero-mark-anchor svg defs g use').length > 0);
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
  'shop buttons point at the real store',
  qa('a[href^="https://faithoverfearrw.netlify.app/shop"]').length >= 3,
);
check('no horizontal-overflow helpers missing', true);

let failed = 0;
for (const c of checks) {
  if (!c.ok) failed += 1;
  console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}${c.detail ? `  (${c.detail})` : ''}`);
}

const realProblems = problems.filter(
  (p) => !/Warning: ReactDOM.render|not wrapped in act|Download the React DevTools/i.test(p),
);

console.log('');
if (realProblems.length) {
  console.log(`Console problems (${realProblems.length}):`);
  for (const p of realProblems.slice(0, 12)) console.log(`  - ${p.slice(0, 300)}`);
}

console.log('');
console.log(`${checks.length - failed}/${checks.length} checks passed`);

if (failed > 0 || realProblems.length > 0) process.exit(1);
console.log('Smoke test OK');
