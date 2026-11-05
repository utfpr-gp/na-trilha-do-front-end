import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { highlightSnippets } from '../../build/highlight.js';

const snippetsDir = resolve(import.meta.dirname, '../../snippets');

describe('highlightSnippets', () => {
  it('troca o <tf-code> pelo HTML do Shiki, com a legenda', async () => {
    const out = await highlightSnippets('<tf-code src="00-exemplo/card.html" caption="index.html"></tf-code>', { snippetsDir });
    expect(out).toContain('<tf-code src="00-exemplo/card.html" caption="index.html">');
    expect(out).toContain('<figcaption>index.html</figcaption>');
    expect(out).toMatch(/<pre class="shiki/);
  });

  it('marca a linha nova e tira a marca do código mostrado', async () => {
    const out = await highlightSnippets('<tf-code src="00-exemplo/card.html"></tf-code>', { snippetsDir });
    expect(out).toContain('highlighted');
    expect(out).not.toContain('[!code highlight]');
  });

  it('deixa o resto da página como está', async () => {
    expect(await highlightSnippets('<p>sem código</p>', { snippetsDir })).toBe('<p>sem código</p>');
  });

  it('lança erro com o caminho de um trecho inexistente', async () => {
    await expect(highlightSnippets('<tf-code src="00-exemplo/nada.js"></tf-code>', { snippetsDir })).rejects.toThrow('00-exemplo/nada.js');
  });
});
