// Blocos de HTML gerados a partir dos dados, no build.
import { PARTS, chapterBySlug, chapterUrl, neighbors } from '../src/data/catalog.js';

export function escapeHtml(text) {
  return String(text).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
}

function chapterCard(c, base) {
  const label = c.number === null ? '' : `<span class="tf-chapter-number">${c.number}</span>`;
  const body = `${label}<span class="tf-chapter-question">${escapeHtml(c.question)}</span>`;
  if (c.published) {
    return `<li><a class="tf-chapter-card" href="${chapterUrl(c, base)}">${body}<span class="tf-chapter-meta">${c.minutes} min</span></a></li>`;
  }
  return `<li><div class="tf-chapter-card is-soon">${body}<span class="badge tf-soon">em breve</span></div></li>`;
}

export function renderCatalog(parts, base) {
  return parts
    .map((p) => `<section class="tf-part" id="${p.id}" aria-labelledby="parte-${p.id}">
  <h2 id="parte-${p.id}">${escapeHtml(p.title)}</h2>
  <ol class="tf-chapter-list">${p.chapters.map((c) => chapterCard(c, base)).join('')}</ol>
</section>`)
    .join('\n');
}


export function renderChapterHeader(slug, base) {
  const c = chapterBySlug(slug);
  if (!c) throw new Error(`Capítulo não encontrado: ${slug}`);
  const part = PARTS.find((p) => p.id === c.partId);
  const number = c.number === null ? '' : `Capítulo ${c.number} · `;
  return `<header class="tf-chapter-header">
  <p class="tf-kicker"><a href="${base}#${part.id}">${escapeHtml(part.title)}</a></p>
  <h1>${escapeHtml(c.question)}</h1>
  <p class="tf-chapter-meta">${number}${c.minutes} min de leitura e prática</p>
  <tf-mark slug="${c.slug}"></tf-mark>
</header>`;
}

export function renderPager(slug, base, list = undefined) {
  const { prev, next } = neighbors(slug, list);
  const link = (c, rel, label) =>
    c ? `<a class="tf-pager-${rel}" rel="${rel}" href="${chapterUrl(c, base)}"><span>${label}</span> ${escapeHtml(c.question)}</a>` : '';
  return `<nav class="tf-pager" aria-label="Capítulos">${link(prev, 'prev', 'Anterior')}${link(next, 'next', 'Próximo')}</nav>`;
}

/** O mapa da trilha: uma parada por capítulo com marco, um mirante por parte e o cume. */
export function renderTrailMap(parts) {
  const stops = parts
    .filter((p) => p.hasMarks)
    .map((p) => `<li class="tf-trail-part">
  <h2>${escapeHtml(p.title)}</h2>
  <ol class="tf-stops">${p.chapters.map((c) => `<li class="tf-stop" data-slug="${c.slug}"><span class="tf-stop-number">${c.number}</span> <span class="tf-stop-question">${escapeHtml(c.question)}</span> <span class="tf-stop-state">ainda não conquistado</span></li>`).join('')}</ol>
  <p class="tf-viewpoint" data-viewpoint="${p.id}">Mirante: ${escapeHtml(p.title)}</p>
</li>`)
    .join('\n');
  return `<ol class="tf-trail">${stops}</ol>\n<p class="tf-summit" data-summit>O cume: todos os marcos do livro</p>`;
}

/** O glossário em ordem alfabética, com o link para o capítulo quando ele já foi publicado. */
export function renderGlossary(entries, base, chapters) {
  const sorted = [...entries].sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));
  const items = sorted.map((e) => {
    const chapter = chapters.find((c) => c.number === e.chapter && c.published);
    const link = chapter ? ` <a href="${chapterUrl(chapter, base)}">Capítulo ${chapter.number}</a>` : '';
    return `<dt id="${e.id}">${escapeHtml(e.term)}</dt><dd>${escapeHtml(e.definition)}${link}</dd>`;
  });
  return `<dl class="tf-glossary">${items.join('')}</dl>`;
}
