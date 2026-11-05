// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { TfGridSim, activeSpan, breakpointAt } from '../../src/js/components/tf-grid-sim.js';

describe('breakpointAt', () => {
  it('segue os pontos de quebra do Bootstrap 5.3', () => {
    expect(breakpointAt(375).name).toBe('xs');
    expect(breakpointAt(575).name).toBe('xs');
    expect(breakpointAt(576).name).toBe('sm');
    expect(breakpointAt(768).name).toBe('md');
    expect(breakpointAt(992).name).toBe('lg');
    expect(breakpointAt(1200).name).toBe('xl');
    expect(breakpointAt(1400).name).toBe('xxl');
  });
});

describe('activeSpan', () => {
  it('usa a maior classe cujo ponto de quebra já foi atingido', () => {
    const c = 'col-12 col-sm-6 col-lg-4';
    expect(activeSpan(c, 375)).toBe(12);
    expect(activeSpan(c, 700)).toBe(6);
    expect(activeSpan(c, 1000)).toBe(4);
    expect(activeSpan(c, 1500)).toBe(4);
  });
  it('col sem número divide o espaço; sem classe para o tamanho, ocupa tudo', () => {
    expect(activeSpan('col', 375)).toBe('auto');
    expect(activeSpan('col-md-6', 375)).toBe(12);
    expect(activeSpan('col-md-6', 800)).toBe(6);
  });
});

const markup = `<tf-grid-sim>
  <div class="tf-grid-stage">
    <div data-cols="col-12 col-sm-6 col-lg-4">1</div>
    <div data-cols="col-12 col-sm-6 col-lg-4">2</div>
    <div data-cols="col-12 col-sm-6 col-lg-4">3</div>
  </div>
</tf-grid-sim>`;

beforeAll(() => customElements.define('tf-grid-sim', TfGridSim));

describe('<tf-grid-sim>', () => {
  it('cria o controle de largura e mostra o ponto de quebra e as colunas', () => {
    document.body.innerHTML = markup;
    const range = document.querySelector('tf-grid-sim input[type="range"]');
    expect(range).not.toBeNull();
    range.value = '700';
    range.dispatchEvent(new Event('input', { bubbles: true }));
    const status = document.querySelector('tf-grid-sim [data-grid-status]').textContent;
    expect(status).toContain('700 px');
    expect(status).toContain('sm');
    expect(status).toContain('2 por linha');
    expect(document.querySelector('[data-cols]').style.gridColumn).toBe('span 6');
  });
});
