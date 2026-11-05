import { describe, expect, it } from 'vitest';
import { checkPage } from '../../scripts/check-output.mjs';

const VIEWS = ['missao', 'ideia', 'por-dentro', 'mao-no-codigo', 'armadilhas', 'desafio', 'na-sua-trilha', 'para-ir-alem'];
const page = ({ body = '<h1>T</h1><p>Texto.</p>', head = '<title>T</title><meta name="description" content="D">' } = {}) =>
  `<html><head>${head}</head><body><main>${body}</main><footer>UTFPR Guarapuava</footer></body></html>`;
const chapter = (views) => page({ body: `<h1>P?</h1>${views.map((v) => `<section id="${v}" class="tf-view"></section>`).join('')}` });

describe('checkPage', () => {
  it('aprova uma página correta, com UTFPR no rodapé', () => {
    expect(checkPage(page(), 'glossario/index.html')).toEqual([]);
  });

  it('reprova palavra proibida no texto, mas aceita dentro de <pre>', () => {
    expect(checkPage(page({ body: '<h1>T</h1><p>Na disciplina de hoje.</p>' }), 'x/index.html').join()).toContain('disciplina');
    expect(checkPage(page({ body: '<h1>T</h1><pre>disciplina</pre>' }), 'x/index.html')).toEqual([]);
  });

  it('palavra proibida só conta inteira', () => {
    expect(checkPage(page({ body: '<h1>T</h1><p>A cena aulante e o entregador.</p>' }), 'x/index.html')).toEqual([]);
    expect(checkPage(page({ body: '<h1>T</h1><p>Vídeos e Checklist.</p>' }), 'x/index.html')).toHaveLength(2);
  });

  it('UTFPR fora do rodapé, da página Sobre e do JSON-LD reprova', () => {
    expect(checkPage(page({ body: '<h1>T</h1><p>Feito na UTFPR.</p>' }), 'x/index.html').join()).toContain('UTFPR');
    expect(checkPage(page({ body: '<h1>T</h1><p>Feito na UTFPR.</p>' }), 'sobre/index.html')).toEqual([]);
  });

  it('exige um único <h1>, título e descrição', () => {
    expect(checkPage(page({ body: '<p>sem título</p>' }), 'x/index.html').join()).toContain('h1');
    expect(checkPage(page({ body: '<h1>A</h1><h1>B</h1>' }), 'x/index.html').join()).toContain('h1');
    expect(checkPage(page({ head: '<title></title>' }), 'x/index.html').join()).toMatch(/title|description/);
  });

  it('num capítulo, exige as oito visões na ordem', () => {
    expect(checkPage(chapter(VIEWS), 'capitulos/01-x/index.html')).toEqual([]);
    expect(checkPage(chapter(VIEWS.filter((v) => v !== 'na-sua-trilha')), 'capitulos/01-x/index.html').join()).toContain('visões');
    expect(checkPage(chapter([...VIEWS].reverse()), 'capitulos/01-x/index.html').join()).toContain('visões');
  });

  it('reprova <img> sem alt e marcas que sobraram sem processar', () => {
    expect(checkPage(page({ body: '<h1>T</h1><img src="a.webp">' }), 'x/index.html').join()).toContain('alt');
    expect(checkPage(page({ body: '<h1>T</h1><a href="{{base}}x/">x</a>' }), 'x/index.html').join()).toContain('{{base}}');
    expect(checkPage(page({ body: '<h1>T</h1><!-- @render catalog -->' }), 'x/index.html').join()).toContain('@');
  });
});
