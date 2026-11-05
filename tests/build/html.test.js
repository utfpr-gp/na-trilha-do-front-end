import { describe, expect, it } from 'vitest';
import { expandIncludes, renderMarkers, replaceBase } from '../../build/html.js';

const partials = {
  header: '<header><!-- @include logo --></header>',
  logo: '<a href="{{base}}">Na Trilha</a>',
};
const read = (name) => {
  if (!(name in partials)) throw new Error(`Parcial não encontrado: ${name}`);
  return partials[name];
};

describe('expandIncludes', () => {
  it('troca os parciais, inclusive os aninhados', () => {
    expect(expandIncludes('<body><!-- @include header --></body>', read)).toBe(
      '<body><header><a href="{{base}}">Na Trilha</a></header></body>',
    );
  });

  it('lança erro com o nome do parcial inexistente', () => {
    expect(() => expandIncludes('<!-- @include rodape -->', read)).toThrow('rodape');
  });
});

describe('replaceBase', () => {
  it('usa a base do dev e a do build', () => {
    const html = '<a href="{{base}}caderneta/">';
    expect(replaceBase(html, '/')).toBe('<a href="/caderneta/">');
    expect(replaceBase(html, '/na-trilha-do-front-end/')).toBe(
      '<a href="/na-trilha-do-front-end/caderneta/">',
    );
  });
});

describe('renderMarkers', () => {
  it('chama o renderer com o argumento', () => {
    const calls = [];
    const out = renderMarkers('<div><!-- @render chapter-header 01-por-que-um-framework --></div>', {
      'chapter-header': (arg) => {
        calls.push(arg);
        return '<h1>ok</h1>';
      },
    });
    expect(calls).toEqual(['01-por-que-um-framework']);
    expect(out).toBe('<div><h1>ok</h1></div>');
  });

  it('chama o renderer sem argumento', () => {
    expect(renderMarkers('<!-- @render catalog -->', { catalog: (a) => `[${a}]` })).toBe('[undefined]');
  });

  it('lança erro quando não há renderer', () => {
    expect(() => renderMarkers('<!-- @render glossary -->', {})).toThrow('glossary');
  });
});
