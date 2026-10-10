/**
 * Shared jsdom harness: bundles the real app with esbuild and boots it inside
 * a DOM that is missing the fancy bits (WebGL, IntersectionObserver…), which
 * is exactly the degraded environment we want to prove the page survives.
 */
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

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

export async function bootApp({
  define = {},
  heroType,
  reducedMotion = false,
  online = false,
  outName = 'app',
} = {}) {
  const outFile = path.join(root, 'node_modules', '.smoke', `${outName}.mjs`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  const env = { ...define };
  if (heroType) env['import.meta.env'] = JSON.stringify({ VITE_HERO_TYPE: heroType });

  await build({
    entryPoints: [path.join(root, 'src', 'main.tsx')],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2020',
    jsx: 'automatic',
    outfile: outFile,
    loader: { '.css': 'empty', '.woff': 'empty', '.woff2': 'empty' },
    define: {
      'process.env.NODE_ENV': '"development"',
      ...(Object.keys(env).length ? env : {}),
    },
    logLevel: 'warning',
  });

  const dom = new JSDOM(
    `<!doctype html><html><head></head><body><div id="boot-veil"></div><div id="root"></div></body></html>`,
    { url: 'https://example.test/', pretendToBeVisual: true },
  );

  const { window } = dom;
  window.matchMedia = (query) => ({
    matches: reducedMotion ? /prefers-reduced-motion/.test(query) : false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  });
  window.IntersectionObserver = IO;
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  window.scrollTo = () => {};
  window.HTMLCanvasElement.prototype.getContext = () => null;
  window.fetch = online ? globalThis.fetch ?? (() => Promise.reject()) : () => Promise.reject(new Error('offline'));

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

  const problems = [];
  const origError = console.error;
  const origWarn = console.warn;
  console.error = (...a) => {
    problems.push(a.map(String).join(' '));
  };
  console.warn = (...a) => {
    problems.push(a.map(String).join(' '));
  };

  await import(`file://${outFile}?v=${Date.now()}`);
  await new Promise((r) => setTimeout(r, 300));

  const restore = () => {
    console.error = origError;
    console.warn = origWarn;
  };

  return { window, doc: window.document, problems, restore, dom };
}

export function finish(label, checks, problems, hardExit = true) {
  let failed = 0;
  console.log(`\n${label}`);
  for (const c of checks) {
    if (!c.ok) failed += 1;
    console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}${c.detail ? `  (${c.detail})` : ''}`);
  }

  // jsdom has no media stack; "Not implemented: HTMLMediaElement" is a harness
  // limitation, not an app error.
  const real = problems.filter(
    (p) =>
      !/not wrapped in act|React DevTools|Warning: ReactDOM.render|Not implemented: HTMLMediaElement/i.test(
        p,
      ),
  );
  if (real.length) {
    console.log(`\nConsole problems (${real.length}):`);
    for (const p of real.slice(0, 10)) console.log(`  - ${p.slice(0, 300)}`);
  }

  console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
  if (hardExit) process.exit(failed || real.length ? 1 : 0);
  return failed === 0 && real.length === 0;
}
