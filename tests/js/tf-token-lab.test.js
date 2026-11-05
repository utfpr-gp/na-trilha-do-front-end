// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { contrastRatio, formatRatio } from '../../src/js/contrast.js';
import { TfTokenLab } from '../../src/js/components/tf-token-lab.js';

describe('contrast.js', () => {
  it('calcula a razão de contraste', () => {
    expect(contrastRatio('#FFFFFF', '#2F5D3A')).toBeCloseTo(7.64, 1);
  });
  it('formata em português', () => {
    expect(formatRatio(7.6412)).toBe('7,6:1');
  });
});

const markup = `<tf-token-lab>
  <div class="tf-lab-preview" data-lab-preview><button>Ver trilha</button></div>
  <ul class="tf-lab-tokens">
    <li data-token="--lab-marca" data-value="#2F5D3A">Cor da marca</li>
    <li data-token="--lab-fundo" data-value="#FAF7F0">Fundo</li>
  </ul>
  <ul class="tf-lab-pairs">
    <li data-fg="#FFFFFF" data-bg="--lab-marca">Texto do botão</li>
    <li data-fg="--lab-marca" data-bg="--lab-fundo">Link sobre o fundo</li>
  </ul>
</tf-token-lab>`;

beforeAll(() => customElements.define('tf-token-lab', TfTokenLab));

describe('<tf-token-lab>', () => {
  it('cria um seletor de cor por token e aplica os valores na prévia', () => {
    document.body.innerHTML = markup;
    const inputs = document.querySelectorAll('tf-token-lab input[type="color"]');
    expect(inputs).toHaveLength(2);
    expect(inputs[0].labels[0].textContent).toContain('Cor da marca');
    expect(document.querySelector('[data-lab-preview]').style.getPropertyValue('--lab-marca')).toBe('#2f5d3a');
  });

  it('mostra o contraste de cada par e diz se passa no AA', () => {
    document.body.innerHTML = markup;
    const pairs = document.querySelectorAll('.tf-lab-pairs li');
    expect(pairs[0].textContent).toContain('7,6:1');
    expect(pairs[0].textContent).toContain('passa no AA');
  });

  it('trocar a cor atualiza a prévia e o contraste', () => {
    document.body.innerHTML = markup;
    const input = document.querySelector('tf-token-lab input[type="color"]');
    input.value = '#f2c230';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(document.querySelector('[data-lab-preview]').style.getPropertyValue('--lab-marca')).toBe('#f2c230');
    const first = document.querySelector('.tf-lab-pairs li');
    expect(first.textContent).toContain('não passa no AA');
    expect(first.classList.contains('is-fail')).toBe(true);
  });
});
