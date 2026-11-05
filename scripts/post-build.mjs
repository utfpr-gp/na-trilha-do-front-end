// Depois do build: índice da busca (Pagefind), sitemap.xml e robots.txt.
import { execFileSync } from 'node:child_process';
import { globSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const SITE_URL = 'https://utfpr-gp.github.io/na-trilha-do-front-end/';

export function pageUrl(file, siteUrl) {
  return siteUrl + file.replace(/index\.html$/, '');
}

export function buildSitemap(pages, siteUrl) {
  const urls = pages
    .filter((p) => p !== '404.html')
    .sort()
    .map((p) => `  <url><loc>${pageUrl(p, siteUrl)}</loc></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export function buildRobots(siteUrl) {
  return `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dist = resolve(import.meta.dirname, '../dist');
  const pages = globSync('**/*.html', { cwd: dist }).filter((p) => !p.startsWith('pagefind/'));
  writeFileSync(resolve(dist, 'sitemap.xml'), buildSitemap(pages, SITE_URL));
  writeFileSync(resolve(dist, 'robots.txt'), buildRobots(SITE_URL));
  execFileSync('npx', ['pagefind', '--site', dist], { stdio: 'inherit' });
  console.log(`Pós-build: ${pages.length} páginas, sitemap.xml, robots.txt e índice da busca.`);
}
