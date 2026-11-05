// Título, descrição, URL canônica, Open Graph e (na página inicial) o JSON-LD do livro.
import { chapterBySlug } from '../src/data/catalog.js';
import { escapeHtml } from './render.js';

const BOOK = 'Na Trilha do Front-End';
const meta = (html, name) => (html.match(new RegExp(`<meta name="${name}" content="([^"]*)">`)) ?? [])[1];

export function applySeo(html, { path, siteUrl }) {
  let title = meta(html, 'tf-title');
  let description = meta(html, 'tf-description');
  const slug = meta(html, 'tf-chapter');
  if (slug) {
    const c = chapterBySlug(slug);
    if (!c) throw new Error(`Capítulo desconhecido em ${path}: ${slug}`);
    title = c.question;
    description ??= c.number === null ? c.question : `Capítulo ${c.number}: ${c.question}`;
  }
  if (!title) throw new Error(`Página sem <meta name="tf-title">: ${path}`);
  const isHome = path === '/index.html';
  const fullTitle = isHome ? BOOK : `${title} · ${BOOK}`;
  const url = siteUrl + path.replace(/^\//, '').replace(/index\.html$/, '');
  const desc = escapeHtml(description ?? title);
  const jsonLd = isHome
    ? `\n<script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Book', name: BOOK, inLanguage: 'pt-BR', url,
      author: { '@type': 'Person', name: 'Roni Fabio Banaszewski' },
      publisher: { '@type': 'Organization', name: 'UTFPR Guarapuava' },
      license: 'https://creativecommons.org/licenses/by/4.0/',
    })}</script>`
    : '';
  const tags = `<title>${escapeHtml(fullTitle)}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${isHome ? 'book' : 'article'}">
<meta property="og:title" content="${escapeHtml(fullTitle)}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${siteUrl}og.png">
<meta property="og:locale" content="pt_BR">${jsonLd}`;
  return html
    .replace(/<meta name="tf-(title|description|chapter)" content="[^"]*">\s*/g, '')
    .replace('</head>', `${tags}\n</head>`);
}
