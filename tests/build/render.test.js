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
    expect(count(html, 'em breve')).toBe(29);
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
