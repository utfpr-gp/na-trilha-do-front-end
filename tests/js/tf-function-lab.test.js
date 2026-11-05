// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { formatDuration, pace, greeting } from '../../src/js/trilheiro/funcoes.js';
import { TfFunctionLab } from '../../src/js/components/tf-function-lab.js';

describe('funções do Trilheiro', () => {
  it('formatDuration', () => {
    expect(formatDuration(150)).toBe('2h30');
    expect(formatDuration(45)).toBe('45 min');
    expect(formatDuration(240)).toBe('4h');
    expect(formatDuration(65)).toBe('1h05');
  });
  it('pace em minutos por km, com uma casa', () => {
    expect(pace(4.5, 150)).toBe('33.3');
  });
  it('greeting pela hora', () => {
    expect(greeting(8)).toBe('Bom dia');
    expect(greeting(14)).toBe('Boa tarde');
    expect(greeting(20)).toBe('Boa noite');
  });
});

beforeAll(() => customElements.define('tf-function-lab', TfFunctionLab));

describe('<tf-function-lab>', () => {
  it('chama a função com o valor digitado e mostra a chamada e o retorno', () => {
    document.body.innerHTML = '<tf-function-lab data-fn="formatDuration" data-arg="150" data-label="Minutos"></tf-function-lab>';
    const input = document.querySelector('tf-function-lab input');
    expect(input.labels[0].textContent).toBe('Minutos');
    expect(document.querySelector('tf-function-lab output').textContent).toBe("formatDuration(150) → '2h30'");
    input.value = '65';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(document.querySelector('tf-function-lab output').textContent).toBe("formatDuration(65) → '1h05'");
  });
});
