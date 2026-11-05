// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { TfSrcsetLab, chooseCandidate, slotWidth } from '../../src/js/components/tf-srcset-lab.js';

const candidates = [{ file: 'salto-480.webp', w: 480 }, { file: 'salto-960.webp', w: 960 }];

describe('slotWidth', () => {
  it('segue o sizes dos cartões do Trilheiro', () => {
    const sizes = '(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw';
    expect(slotWidth(sizes, 375)).toBe(375);
    expect(slotWidth(sizes, 800)).toBe(400);
    expect(slotWidth(sizes, 1200)).toBe(396);
  });
});

describe('chooseCandidate', () => {
  it('pega o menor arquivo que cobre a largura vezes a densidade', () => {
    expect(chooseCandidate(candidates, 375, 1).file).toBe('salto-480.webp');
    expect(chooseCandidate(candidates, 375, 2).file).toBe('salto-960.webp');
    expect(chooseCandidate(candidates, 400, 1).file).toBe('salto-480.webp');
  });
  it('sem nenhum grande o bastante, fica com o maior', () => {
    expect(chooseCandidate(candidates, 700, 2).file).toBe('salto-960.webp');
  });
});

const markup = `<tf-srcset-lab data-sizes="(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw" data-srcset="salto-480.webp 480w, salto-960.webp 960w"></tf-srcset-lab>`;

beforeAll(() => customElements.define('tf-srcset-lab', TfSrcsetLab));

describe('<tf-srcset-lab>', () => {
  it('mostra o arquivo escolhido para a tela e a densidade', () => {
    document.body.innerHTML = markup;
    const range = document.querySelector('tf-srcset-lab input[type="range"]');
    const dpr = document.querySelector('tf-srcset-lab select');
    range.value = '375';
    range.dispatchEvent(new Event('input', { bubbles: true }));
    expect(document.querySelector('[data-srcset-status]').textContent).toContain('salto-480.webp');
    dpr.value = '2';
    dpr.dispatchEvent(new Event('change', { bubbles: true }));
    expect(document.querySelector('[data-srcset-status]').textContent).toContain('salto-960.webp');
  });
});
