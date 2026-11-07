import { describe, expect, it } from 'vitest';
import { renderGlossary } from '../../build/render.js';
import { GLOSSARY } from '../../src/data/glossary.js';

const chapters = [{ number: 6, slug: '06-design-tokens', published: true }, { number: 7, slug: '07-grid', published: false }];

describe('glossário', () => {
  it('tem ids únicos e definição em cada termo', () => {
    const ids = GLOSSARY.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    GLOSSARY.forEach((e) => expect(e.definition.length).toBeGreaterThan(20));
  });
});

describe('renderGlossary', () => {
  const entries = [
    { id: 'breakpoint', term: 'breakpoint', definition: 'Largura em que o layout muda.', chapter: 7 },
    { id: 'ancora', term: 'âncora', definition: 'Link para um ponto da página.' },
    { id: 'design-token', term: 'design token', definition: 'Uma decisão de design com nome.', chapter: 6 },
  ];

  it('ordena em português, com os acentos no lugar certo', () => {
    const html = renderGlossary(entries, '/', chapters);
    const order = [...html.matchAll(/<dt id="([^"]+)"/g)].map((m) => m[1]);
    expect(order).toEqual(['ancora', 'breakpoint', 'design-token']);
  });

  it('um termo de Para ir além liga pelo slug, com o rótulo "Para ir além"', () => {
    const list = [...chapters, { number: null, slug: 'vite-e-bundlers', published: true }, { number: null, slug: 'lighthouse', published: true }];
    const html = renderGlossary([{ id: 'bundler', term: 'bundler', definition: 'Junta os arquivos do site.', slug: 'vite-e-bundlers' }], '/', list);
    expect(html).toContain('<a href="/capitulos/vite-e-bundlers/">Para ir além</a>');
    expect(html).not.toContain('lighthouse');
  });

  it('liga ao capítulo só quando ele está publicado', () => {
    const html = renderGlossary(entries, '/b/', chapters);
    expect(html).toContain('href="/b/capitulos/06-design-tokens/"');
    expect(html).not.toContain('07-grid');
  });
});
