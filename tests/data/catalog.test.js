import { describe, expect, it } from 'vitest';
import { PARTS, allChapters, chapterBySlug, chapterUrl, neighbors } from '../../src/data/catalog.js';

describe('catálogo', () => {
  it('tem 26 capítulos numerados de 1 a 26, sem buraco', () => {
    expect(allChapters().map((c) => c.number)).toEqual(Array.from({ length: 26 }, (_, i) => i + 1));
  });

  it('tem slugs únicos que começam com o número de dois dígitos', () => {
    const slugs = allChapters().map((c) => c.slug);
    expect(new Set(slugs).size).toBe(26);
    allChapters().forEach((c) => expect(c.slug.startsWith(String(c.number).padStart(2, '0') + '-')).toBe(true));
  });

  it('tem 6 partes com marcos e 1 sem', () => {
    expect(PARTS.filter((p) => p.hasMarks)).toHaveLength(6);
    expect(PARTS.filter((p) => !p.hasMarks).map((p) => p.id)).toEqual(['para-ir-alem']);
    expect(PARTS.find((p) => p.id === 'para-ir-alem').chapters).toHaveLength(5);
  });

  it('cada capítulo sabe a sua parte e faz uma pergunta', () => {
    for (const part of PARTS) {
      for (const c of part.chapters) {
        expect(c.partId).toBe(part.id);
        expect(c.question.endsWith('?')).toBe(true);
      }
    }
  });

  it('o JavaScript básico vem antes do DOM', () => {
    expect(chapterBySlug('17-javascript-basico').partId).toBe('a-travessia');
    expect(chapterBySlug('18-dom-e-eventos').number).toBe(18);
    expect(chapterBySlug('26-publicar-no-github-pages').number).toBe(26);
  });

  it('chapterBySlug acha e devolve undefined quando não existe', () => {
    expect(chapterBySlug('13-personalizar-o-bootstrap-com-sass').number).toBe(13);
    expect(chapterBySlug('99-nada')).toBeUndefined();
  });

  it('neighbors pula os capítulos não publicados', () => {
    const list = [
      { slug: 'a', published: true },
      { slug: 'b', published: false },
      { slug: 'c', published: true },
    ];
    expect(neighbors('a', list)).toEqual({ prev: undefined, next: list[2] });
    expect(neighbors('c', list)).toEqual({ prev: list[0], next: undefined });
  });

  it('chapterUrl usa a base', () => {
    const c = chapterBySlug('01-por-que-um-framework');
    expect(chapterUrl(c, '/')).toBe('/capitulos/01-por-que-um-framework/');
    expect(chapterUrl(c, '/na-trilha-do-front-end/')).toBe('/na-trilha-do-front-end/capitulos/01-por-que-um-framework/');
  });
});
