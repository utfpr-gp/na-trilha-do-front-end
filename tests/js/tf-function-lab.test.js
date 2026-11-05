// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { formatarDuracao, ritmo, saudacao } from '../../src/js/trilheiro/funcoes.js';
import { TfFunctionLab } from '../../src/js/components/tf-function-lab.js';

describe('funções do Trilheiro', () => {
  it('formatarDuracao', () => {
    expect(formatarDuracao(150)).toBe('2h30');
    expect(formatarDuracao(45)).toBe('45 min');
    expect(formatarDuracao(240)).toBe('4h');
    expect(formatarDuracao(65)).toBe('1h05');
  });
  it('ritmo em minutos por km, com uma casa', () => {
    expect(ritmo(4.5, 150)).toBe('33.3');
  });
  it('saudacao pela hora', () => {
    expect(saudacao(8)).toBe('Bom dia');
    expect(saudacao(14)).toBe('Boa tarde');
    expect(saudacao(20)).toBe('Boa noite');
  });
});

beforeAll(() => customElements.define('tf-function-lab', TfFunctionLab));

describe('<tf-function-lab>', () => {
  it('chama a função com o valor digitado e mostra a chamada e o retorno', () => {
    document.body.innerHTML = '<tf-function-lab data-fn="formatarDuracao" data-arg="150" data-label="Minutos"></tf-function-lab>';
    const input = document.querySelector('tf-function-lab input');
    expect(input.labels[0].textContent).toBe('Minutos');
    expect(document.querySelector('tf-function-lab output').textContent).toBe("formatarDuracao(150) → '2h30'");
    input.value = '65';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(document.querySelector('tf-function-lab output').textContent).toBe("formatarDuracao(65) → '1h05'");
  });
});
