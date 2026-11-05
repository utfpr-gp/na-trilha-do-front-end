// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { TfClampLab, fluidAt, fluidCss } from '../../src/js/components/tf-clamp-lab.js';

describe('fluidAt', () => {
  it('fica no mínimo nas telas pequenas e no máximo nas grandes', () => {
    expect(fluidAt({ min: 1.75, max: 2.75, from: 360, to: 1200 }, 320)).toBe(28);
    expect(fluidAt({ min: 1.75, max: 2.75, from: 360, to: 1200 }, 1440)).toBe(44);
  });
  it('cresce em linha reta entre as duas larguras', () => {
    expect(fluidAt({ min: 1.75, max: 2.75, from: 360, to: 1200 }, 780)).toBeCloseTo(36, 5);
  });
});

describe('fluidCss', () => {
  it('escreve o clamp() com o termo em vw', () => {
    expect(fluidCss({ min: 1.75, max: 2.75, from: 360, to: 1200 })).toBe('clamp(1.75rem, 1.3214rem + 1.9048vw, 2.75rem)');
  });
});

const markup = '<tf-clamp-lab data-min="1.75" data-max="2.75" data-from="360" data-to="1200"><p data-clamp-sample>Escolha a trilha</p></tf-clamp-lab>';

beforeAll(() => customElements.define('tf-clamp-lab', TfClampLab));

describe('<tf-clamp-lab>', () => {
  it('mostra o tamanho calculado para a largura escolhida', () => {
    document.body.innerHTML = markup;
    const range = document.querySelector('tf-clamp-lab input[type="range"]');
    range.value = '780';
    range.dispatchEvent(new Event('input', { bubbles: true }));
    expect(document.querySelector('[data-clamp-sample]').style.fontSize).toBe('36px');
    expect(document.querySelector('tf-clamp-lab [data-clamp-status]').textContent).toContain('780 px → 36 px');
    expect(document.querySelector('tf-clamp-lab pre').textContent).toContain('clamp(1.75rem, 1.3214rem + 1.9048vw, 2.75rem)');
  });
});
