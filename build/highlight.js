// Destaca no build os trechos de <tf-code src="NN-slug/nome.ext">, com o Shiki.
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { transformerNotationHighlight } from '@shikijs/transformers';
import { codeToHtml } from 'shiki';
import { escapeHtml } from './render.js';

const TAG = /<tf-code\s+src="([^"]+)"(?:\s+caption="([^"]*)")?\s*><\/tf-code>/g;
const LANGS = { '.html': 'html', '.css': 'css', '.scss': 'scss', '.js': 'javascript', '.mjs': 'javascript', '.json': 'json', '.sh': 'bash', '.md': 'markdown' };

async function highlightOne(src, caption, snippetsDir) {
  let code;
  try {
    code = await readFile(resolve(snippetsDir, src), 'utf8');
  } catch {
    throw new Error(`Trecho de código não encontrado: ${src}`);
  }
  const html = await codeToHtml(code.replace(/\n$/, ''), {
    lang: LANGS[extname(src)] ?? 'text',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
    transformers: [transformerNotationHighlight()],
  });
  const attrs = `src="${src}"${caption === undefined ? '' : ` caption="${caption}"`}`;
  const figcaption = caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : '';
  return `<tf-code ${attrs}><figure class="tf-code-figure">${figcaption}${html}</figure></tf-code>`;
}

export async function highlightSnippets(html, { snippetsDir }) {
  const matches = [...html.matchAll(TAG)];
  const rendered = await Promise.all(matches.map(([, src, caption]) => highlightOne(src, caption, snippetsDir)));
  let i = 0;
  return html.replace(TAG, () => rendered[i++]);
}
