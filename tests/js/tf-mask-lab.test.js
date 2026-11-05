// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { TfMaskLab, applyMask } from '../../src/js/components/tf-mask-lab.js';

describe('applyMask (como o 0 do jQuery Mask Plugin: um dígito)', () => {
  it('encaixa os dígitos e põe os separadores sozinho', () => {
    expect(applyMask('00000-000', '85010260')).toBe('85010-260');
    expect(applyMask('(00) 00000-0000', '42999991234')).toBe('(42) 99999-1234');
  });
  it('ignora o que não é dígito e para quando a máscara acaba', () => {
    expect(applyMask('00000-000', 'ab85.010-2601234')).toBe('85010-260');
  });
  it('com poucos dígitos, só põe o separador quando vem dígito depois dele', () => {
    expect(applyMask('00000-000', '85010')).toBe('85010');
    expect(applyMask('00000-000', '850102')).toBe('85010-2');
    expect(applyMask('(00) 00000-0000', '4')).toBe('(4');
    expect(applyMask('00000-000', '')).toBe('');
  });
});

beforeAll(() => customElements.define('tf-mask-lab', TfMaskLab));
beforeEach(() => {
  document.body.innerHTML = '<tf-mask-lab></tf-mask-lab>';
});

const $ = (sel) => document.querySelector(`tf-mask-lab ${sel}`);
const typeValue = (value) => {
  $('input').value = value;
  $('input').dispatchEvent(new Event('input'));
};

describe('<tf-mask-lab>', () => {
  it('começa na máscara do CEP, com o código do plugin e o campo vazio', () => {
    expect($('select').labels[0].textContent).toBe('Máscara');
    expect($('code').textContent).toBe("$('#campo').mask('00000-000');");
    expect($('input').value).toBe('');
  });

  it('a cada digitação, aplica a máscara no campo e mostra só os dígitos', () => {
    typeValue('8501026');
    expect($('input').value).toBe('85010-26');
    expect($('output').textContent).toBe("cleanVal() → '8501026'");
  });

  it('trocar a máscara refaz o código e limpa o campo', () => {
    typeValue('85010');
    $('select').selectedIndex = 1;
    $('select').dispatchEvent(new Event('change'));
    expect($('code').textContent).toBe("$('#campo').mask('(00) 00000-0000');");
    expect($('input').value).toBe('');
  });
});
