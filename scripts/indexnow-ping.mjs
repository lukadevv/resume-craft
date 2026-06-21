#!/usr/bin/env node

/**
 * Reads the generated sitemap.xml from the build output and submits
 * all URLs to IndexNow, so search engines re-crawl the full site after deploy.
 *
 * Usage: node scripts/indexnow-ping.mjs
 */

const INDEXNOW_URL = 'https://api.indexnow.org/indexnow';
const API_KEY = '5495d50aa98847889da528acb9c0cac7';
const HOST = 'resume.lukadevv.com';
const SITEMAP_PATH = 'out/sitemap.xml';

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function main() {
  // Read sitemap.xml from the build output
  let sitemapXml;
  try {
    sitemapXml = readFileSync(join(root, SITEMAP_PATH), 'utf-8');
  } catch {
    console.error('❌ sitemap.xml not found at out/sitemap.xml — run `pnpm build` first.');
    process.exit(1);
  }

  // Extract all <loc> URLs
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1]);
  }

  if (urls.length === 0) {
    console.log('⚠️  No URLs found in sitemap. Skipping.');
    return;
  }

  console.log(`📡 Pinging IndexNow with ${urls.length} URLs...`);

  const payload = {
    host: HOST,
    key: API_KEY,
    keyLocation: `https://${HOST}/${API_KEY}.txt`,
    urlList: urls,
  };

  const response = await fetch(INDEXNOW_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log(`✅ IndexNow ping successful (${urls.length} URLs submitted)`);
  } else {
    const text = await response.text();
    console.error(`❌ IndexNow ping failed (${response.status}): ${text}`);
    process.exit(1);
  }
}

main();
