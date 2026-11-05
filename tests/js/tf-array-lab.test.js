// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { TfArrayLab, show } from '../../src/js/components/tf-array-lab.js';

beforeAll(() => customElements.define('tf-array-lab', TfArrayLab));
beforeEach(() => {
  document.body.innerHTML = '<tf-array-lab></tf-array-lab>';
});

const pick = (index) => {
  const select = document.querySelector('tf-array-lab select');
  select.selectedIndex = index;
  select.dispatchEvent(new Event('change'));
  return document.querySelector('tf-array-lab output').textContent;
};

describe('show (escreve um valor como o console)', () => {
  it('textos entre aspas simples, números e booleanos como são', () => {
    expect(show('Salto')).toBe("'Salto'");
    expect(show(3)).toBe('3');
    expect(show(true)).toBe('true');
    expect(show(undefined)).toBe('undefined');
  });
  it('objetos numa linha e arrays de objetos, um por linha', () => {
    expect(show({ id: '2', destaque: false })).toBe("{ id: '2', destaque: false }");
    expect(show(['a', 'b'])).toBe("['a', 'b']");
    expect(show([{ id: '1' }, { id: '2' }])).toBe("[\n  { id: '1' },\n  { id: '2' }\n]");
    expect(show([])).toBe('[]');
  });
});

describe('<tf-array-lab>', () => {
  it('tem um select com rótulo e mostra o código e o resultado do primeiro exemplo', () => {
    const select = document.querySelector('tf-array-lab select');
    expect(select.labels[0].textContent).toBe('Experimente');
    expect(document.querySelector('tf-array-lab code').textContent).toContain('trails.filter(');
    expect(document.querySelector('tf-array-lab output').textContent).toContain("nome: 'Caminho das Araucárias'");
  });
  it('map devolve um array de nomes', () => {
    expect(pick(1)).toBe("['Trilha do Salto', 'Caminho das Araucárias', 'Mirante da Serra', 'Escadaria do Salto']");
  });
  it('find devolve um objeto só, e undefined quando não acha', () => {
    expect(pick(2)).toMatch(/^\{ id: '3', nome: 'Mirante da Serra'/);
    expect(pick(3)).toBe('undefined');
  });
  it('filter seguido de length conta', () => {
    expect(pick(4)).toBe('3');
  });
});
