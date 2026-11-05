import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PARTS } from '../src/data/catalog.js';
import { expandIncludes, renderMarkers, replaceBase } from './html.js';
import { renderCatalog } from './render.js';

const PARTIALS_DIR = resolve(import.meta.dirname, '../src/partials');

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
  };
}

/** Monta cada página no build: parciais → marcadores → base. */
export function livroPlugin({ renderers = defaultRenderers() } = {}) {
  let base = '/';
  return {
    name: 'livro',
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let out = expandIncludes(html, readPartial);
        const bound = Object.fromEntries(
          Object.entries(renderers).map(([name, render]) => [name, (arg) => render(arg, { base })]),
        );
        out = renderMarkers(out, bound);
        return replaceBase(out, base);
      },
    },
  };
}
