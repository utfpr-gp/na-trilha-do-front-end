// Expande no build as marcas das visões, para todo o texto existir sem JavaScript.
import { escapeHtml } from './render.js';

export const VIEWS = {
  missao: '🎯',
  ideia: '💡',
  'por-dentro': '🔬',
  'mao-no-codigo': '🛠️',
  armadilhas: '⚠️',
  desafio: '🏁',
  'na-sua-trilha': '🧭',
  'para-ir-alem': '📚',
};

// Atributos entre aspas podem conter `>` (por exemplo, a mensagem de uma armadilha).
const ATTRS = '((?:\\s+[\\w-]+="[^"]*")*)\\s*';
const open = (tag) => new RegExp(`<${tag}\\b${ATTRS}>`, 'g');
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) ?? [])[1];

export function expandViews(html) {
  return html
    .replace(open('tf-view'), (_, attrs) => {
      const kind = attr(attrs, 'kind');
      if (!(kind in VIEWS)) throw new Error(`Visão desconhecida: ${kind}`);
      const title = attr(attrs, 'title') ?? '';
      return `<tf-view${attrs}><section id="${kind}" class="tf-view tf-view-${kind}" aria-labelledby="titulo-${kind}">`
        + `<h2 class="tf-view-title" id="titulo-${kind}"><span aria-hidden="true">${VIEWS[kind]}</span> ${title}</h2>`;
    })
    .replace(/<\/tf-view>/g, '</section></tf-view>')
    .replace(open('tf-analogy'), (_, attrs) =>
      `<tf-analogy${attrs}><p class="tf-box-title"><span aria-hidden="true">${attr(attrs, 'emoji') ?? '💡'}</span> ${attr(attrs, 'title') ?? ''}</p>`)
    .replace(open('tf-pitfall'), (_, attrs) => {
      const message = attr(attrs, 'message');
      const pre = message ? `<pre class="tf-pitfall-message"><code>${escapeHtml(message)}</code></pre>` : '';
      return `<tf-pitfall${attrs}><p class="tf-box-title">${attr(attrs, 'title') ?? ''}</p>${pre}`;
    })
    .replace(/<section data-step="([^"]*)">/g, (_, title) =>
      `<section data-step="${title}"><h3 class="tf-step-title">${title}</h3>`);
}
