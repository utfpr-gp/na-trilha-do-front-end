// Depois do build: o app Trilheiro publicado junto, índice da busca (Pagefind), sitemap.xml e robots.txt.
import { execFileSync } from 'node:child_process';
import { cpSync, globSync, writeFileSync } from 'node:fs';
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

// O que o app final precisa no ar: as páginas, os dados (modo publicado), o CSS compilado, o JavaScript e as imagens.
// O código-fonte (scss), as ferramentas e os documentos ficam no repositório.
export const APP_FILES = ['index.html', 'trilhas.html', 'trilha.html', 'cadastrar.html', 'db.json', 'mirante.svg', 'css', 'js', 'img'];

export function copyApp(srcDir, destDir) {
  for (const entry of APP_FILES) cpSync(resolve(srcDir, entry), resolve(destDir, entry), { recursive: true });
}

export function buildRobots(siteUrl) {
  return `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dist = resolve(import.meta.dirname, '../dist');
  copyApp(resolve(import.meta.dirname, '../trilheiro'), resolve(dist, 'trilheiro'));
  const pages = globSync('**/*.html', { cwd: dist }).filter((p) => !p.startsWith('pagefind/'));
  writeFileSync(resolve(dist, 'sitemap.xml'), buildSitemap(pages, SITE_URL));
  writeFileSync(resolve(dist, 'robots.txt'), buildRobots(SITE_URL));
  execFileSync('npx', ['pagefind', '--site', dist], { stdio: 'inherit' });
  console.log(`Pós-build: ${pages.length} páginas, sitemap.xml, robots.txt e índice da busca.`);
}
