// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { TfUnitLab, sizeFor } from '../../src/js/components/tf-unit-lab.js';

describe('sizeFor', () => {
  it('px não muda com a fonte do navegador; rem e em acompanham', () => {
    expect(sizeFor('200px', { root: 16 })).toBe(200);
    expect(sizeFor('200px', { root: 24 })).toBe(200);
    expect(sizeFor('12.5rem', { root: 16 })).toBe(200);
    expect(sizeFor('12.5rem', { root: 24 })).toBe(300);
    expect(sizeFor('10em', { root: 16, parent: 20 })).toBe(200);
  });
  it('% e vw dependem da largura', () => {
    expect(sizeFor('50%', { container: 600 })).toBe(300);
    expect(sizeFor('25vw', { viewport: 1200 })).toBe(300);
  });
});

const markup = `<tf-unit-lab>
  <div data-unit-bars>
    <div data-unit="200px"></div>
    <div data-unit="12.5rem"></div>
  </div>
</tf-unit-lab>`;

beforeAll(() => customElements.define('tf-unit-lab', TfUnitLab));

describe('<tf-unit-lab>', () => {
  it('aumentar a fonte do navegador alarga só a barra em rem', () => {
    document.body.innerHTML = markup;
    const range = document.querySelector('tf-unit-lab input[type="range"]');
    expect(range.labels[0].textContent).toContain('Tamanho da fonte do navegador');
    const bars = document.querySelectorAll('[data-unit]');
    expect(bars[0].style.width).toBe('200px');
    expect(bars[1].style.width).toBe('200px');
    range.value = '24';
    range.dispatchEvent(new Event('input', { bubbles: true }));
    expect(bars[0].style.width).toBe('200px');
    expect(bars[1].style.width).toBe('300px');
    expect(bars[1].textContent).toContain('12.5rem = 300 px');
  });
});
