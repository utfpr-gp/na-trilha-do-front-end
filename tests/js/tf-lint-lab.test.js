// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { TfLintLab } from '../../src/js/components/tf-lint-lab.js';

beforeAll(() => customElements.define('tf-lint-lab', TfLintLab));
beforeEach(() => {
  document.body.innerHTML = '<tf-lint-lab></tf-lint-lab>';
});

const $ = (sel) => document.querySelector(`tf-lint-lab ${sel}`);
const radios = () => [...document.querySelectorAll('tf-lint-lab input[type="radio"]')];
const choose = (index) => {
  radios()[index].checked = true;
  radios()[index].dispatchEvent(new Event('change', { bubbles: true }));
};

describe('<tf-lint-lab>', () => {
  it('tem três vistas, com rótulos, e começa no código original', () => {
    expect(radios().map((r) => r.labels[0].textContent)).toEqual(['O código', 'npx prettier', 'npx eslint']);
    expect(radios()[0].checked).toBe(true);
    expect($('pre').textContent).toContain('function statusText(count){');
  });

  it('o Prettier arruma o estilo, mas deixa o == e o trails', () => {
    choose(1);
    expect($('pre').textContent).toContain('function statusText(count) {');
    expect($('pre').textContent).toContain("if (count == 0) return 'Nenhuma trilha.';");
    expect($('output').textContent).toBe('Mudou a aparência: espaços, aspas e ponto e vírgula. Os defeitos continuam.');
  });

  it('o ESLint aponta os defeitos, com a linha e a regra', () => {
    choose(2);
    expect($('pre').textContent).toContain("3:13  error    Expected '===' and instead saw '=='");
    expect($('pre').textContent).toContain("'trails' is not defined");
    expect($('output').textContent).toBe('Nada mudou no arquivo: o ESLint só avisa. 4 erros e 1 aviso.');
  });

  it('a vista é anunciada para leitores de tela', () => {
    expect($('output').getAttribute('aria-live')).toBe('polite');
  });
});
