// Blocos de HTML gerados a partir dos dados, no build.
import { chapterUrl } from '../src/data/catalog.js';

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
