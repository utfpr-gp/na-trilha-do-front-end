import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expandIncludes, renderMarkers, replaceBase } from './html.js';

const PARTIALS_DIR = resolve(import.meta.dirname, '../src/partials');

function readPartial(name) {
  try {
    return readFileSync(resolve(PARTIALS_DIR, `${name}.html`), 'utf8');
  } catch {
    throw new Error(`Parcial não encontrado: ${name}`);
  }
}

/** Monta cada página no build: parciais → marcadores → base. */
export function livroPlugin({ renderers = {} } = {}) {
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
        out = renderMarkers(out, renderers);
        return replaceBase(out, base);
      },
    },
  };
}
