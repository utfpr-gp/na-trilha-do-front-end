import { describe, expect, it } from 'vitest';
import { renderCatalog } from '../../build/render.js';
import { PARTS } from '../../src/data/catalog.js';

const count = (html, needle) => html.split(needle).length - 1;
const withPublished = (slug) =>
  PARTS.map((p) => ({ ...p, chapters: p.chapters.map((c) => ({ ...c, published: c.slug === slug })) }));

describe('renderCatalog', () => {
  it('sem capítulo publicado, não tem link de capítulo e marca todos como em breve', () => {
    const html = renderCatalog(withPublished(null), '/');
    expect(html).not.toContain('href="/capitulos/');
    expect(count(html, 'em breve')).toBe(31);
  });

  it('com um publicado, tem exatamente um link, para a URL dele', () => {
    const html = renderCatalog(withPublished('01-por-que-um-framework'), '/x/');
    expect(count(html, 'href="/x/capitulos/')).toBe(1);
    expect(html).toContain('href="/x/capitulos/01-por-que-um-framework/"');
  });

  it('mostra o título de cada parte e escapa o HTML das perguntas', () => {
    const parts = [{ id: 'p', title: 'Parte <1>', hasMarks: true, chapters: [{ number: 1, slug: '01-x', question: 'A & B?', minutes: 10, published: false, partId: 'p' }] }];
    const html = renderCatalog(parts, '/');
    expect(html).toContain('Parte &lt;1&gt;');
    expect(html).toContain('A &amp; B?');
  });
});

import { renderChapterHeader, renderPager } from '../../build/render.js';

describe('renderChapterHeader', () => {
  it('tem um único <h1> com a pergunta, a parte, o tempo e o espaço do marco', () => {
    const html = renderChapterHeader('13-personalizar-o-bootstrap-com-sass', '/');
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain('Como personalizar o Bootstrap com Sass?</h1>');
    expect(html).toContain('A subida');
    expect(html).toContain('45 min');
    expect(html).toContain('<tf-mark slug="13-personalizar-o-bootstrap-com-sass">');
  });

  it('lança erro com slug desconhecido', () => {
    expect(() => renderChapterHeader('99-nada', '/')).toThrow('99-nada');
  });
});

describe('renderPager', () => {
  const list = [
    { number: 1, slug: '01-a', question: 'A?', published: true },
    { number: 2, slug: '02-b', question: 'B?', published: false },
    { number: 3, slug: '03-c', question: 'C?', published: true },
  ];
  it('sem vizinhos publicados, não gera links', () => {
    expect(renderPager('01-a', '/', [list[0], list[1]])).not.toContain('href=');
  });
  it('liga ao próximo publicado, pulando o que não foi publicado', () => {
    const html = renderPager('01-a', '/x/', list);
    expect(html).toContain('href="/x/capitulos/03-c/"');
    expect(html).not.toContain('02-b');
  });
});
