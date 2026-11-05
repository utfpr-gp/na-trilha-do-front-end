// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { TfRegexLab } from '../../src/js/components/tf-regex-lab.js';

beforeAll(() => customElements.define('tf-regex-lab', TfRegexLab));
beforeEach(() => {
  document.body.innerHTML = '<tf-regex-lab></tf-regex-lab>';
});

const $ = (sel) => document.querySelector(`tf-regex-lab ${sel}`);
const typeValue = (value) => {
  $('input').value = value;
  $('input').dispatchEvent(new Event('input'));
};
const choose = (index) => {
  $('select').selectedIndex = index;
  $('select').dispatchEvent(new Event('change'));
};

describe('<tf-regex-lab>', () => {
  it('começa com a regra do CEP, um exemplo válido e o resultado', () => {
    expect($('select').labels[0].textContent).toBe('Regra');
    expect($('input').labels[0].textContent).toBe('Valor para testar');
    expect($('code').textContent).toBe('/^\\d{5}-?\\d{3}$/');
    expect($('input').value).toBe('85010-260');
    expect($('output').textContent).toBe('✓ combina');
  });

  it('confere a cada letra digitada', () => {
    typeValue('8501026');
    expect($('output').textContent).toBe('✗ não combina');
    typeValue('85010260');
    expect($('output').textContent).toBe('✓ combina');
  });

  it('troca a regra, o exemplo e o código', () => {
    choose(1);
    expect($('code').textContent).toBe('/^\\(\\d{2}\\) \\d{5}-\\d{4}$/');
    expect($('input').value).toBe('(42) 99999-1234');
    expect($('output').textContent).toBe('✓ combina');
    typeValue('42 99999-1234');
    expect($('output').textContent).toBe('✗ não combina');
  });

  it('a regra da letra usa a flag i (maiúsculas e minúsculas)', () => {
    choose(3);
    expect($('code').textContent).toBe('/[a-zà-ú]/i');
    typeValue('123');
    expect($('output').textContent).toBe('✗ não combina');
    typeValue('Salto 2');
    expect($('output').textContent).toBe('✓ combina');
  });

  it('o resultado fica numa região que o leitor de tela anuncia', () => {
    expect($('output').getAttribute('aria-live')).toBe('polite');
  });
});
