#!/usr/bin/env node
/**
 * Generate sitemap.xml from product data.
 * Run: node scripts/generate-sitemap.mjs
 * Called in build via `npm run build` pre-step, and also manually.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// We cannot import TS directly without transpilation, so we parse the TS file minimally.
const productsPath = path.join(root, 'src', 'data', 'products.ts');
const content = fs.readFileSync(productsPath, 'utf8');
const slugMatches = [...content.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const SITE = 'https://faithoverfearrw.netlify.app';

const staticRoutes = [
  '/',
  '/shop',
  '/collections',
  '/collections/all',
  '/collections/featured',
  '/collections/standard',
  '/collections/accessory',
  '/collections/abide',
  '/collections/genesis',
  '/lookbook',
  '/about',
  '/contact',
  '/faq',
  '/shipping',
  '/returns',
  '/privacy',
  '/terms',
  '/search',
  '/cart',
];

const productRoutes = slugMatches.map((s) => `/product/${s}`);

const all = [...staticRoutes, ...productRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (p) => `  <url>
    <loc>${SITE}${p}</loc>
    <changefreq>${p.startsWith('/product/') ? 'weekly' : p === '/' ? 'daily' : 'monthly'}</changefreq>
    <priority>${p === '/' ? '1.0' : p.startsWith('/product/') ? '0.8' : p === '/shop' ? '0.9' : '0.6'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const out = path.join(root, 'public', 'sitemap.xml');
fs.writeFileSync(out, xml, 'utf8');
console.log(`sitemap.xml: ${all.length} URLs -> ${out}`);

// Also write to dist if it exists (for immediate preview)
const dist = path.join(root, 'dist', 'sitemap.xml');
if (fs.existsSync(path.join(root, 'dist'))) {
  fs.mkdirSync(path.dirname(dist), { recursive: true });
  fs.writeFileSync(dist, xml, 'utf8');
}
