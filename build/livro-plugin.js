import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PARTS } from '../src/data/catalog.js';
import { GLOSSARY } from '../src/data/glossary.js';
import { SITE_URL } from '../scripts/post-build.mjs';
import { highlightSnippets } from './highlight.js';
import { expandIncludes, renderMarkers, replaceBase } from './html.js';
import { renderCatalog, renderChapterHeader, renderGlossary, renderPager, renderTrailMap } from './render.js';
import { applySeo } from './seo.js';
import { expandViews } from './views.js';

const PARTIALS_DIR = resolve(import.meta.dirname, '../src/partials');
const SNIPPETS_DIR = resolve(import.meta.dirname, '../snippets');

function readPartial(name) {
  try {
    return readFileSync(resolve(PARTIALS_DIR, `${name}.html`), 'utf8');
  } catch {
    throw new Error(`Parcial não encontrado: ${name}`);
  }
}

/** Os blocos gerados que as páginas pedem com `<!-- @render NOME ARG -->`. */
export function defaultRenderers() {
  return {
    catalog: (_arg, { base }) => renderCatalog(PARTS, base),
    'chapter-header': (slug, { base }) => renderChapterHeader(slug, base),
    pager: (slug, { base }) => renderPager(slug, base),
    'trail-map': () => renderTrailMap(PARTS),
    glossary: (_arg, { base }) => renderGlossary(GLOSSARY, base, PARTS.flatMap((p) => p.chapters)),
  };
}

/** Monta cada página no build: parciais → marcadores → visões → trechos destacados → base → SEO. */
export function livroPlugin({ renderers = defaultRenderers() } = {}) {
  let base = '/';
  return {
    name: 'livro',
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        let out = expandIncludes(html, readPartial);
        const bound = Object.fromEntries(
          Object.entries(renderers).map(([name, render]) => [name, (arg) => render(arg, { base })]),
        );
        out = renderMarkers(out, bound);
        out = expandViews(out);
        out = await highlightSnippets(out, { snippetsDir: SNIPPETS_DIR });
        out = replaceBase(out, base);
        const path = ctx.path.endsWith('/') ? `${ctx.path}index.html` : ctx.path;
        return applySeo(out, { path, siteUrl: SITE_URL });
      },
    },
  };
}
