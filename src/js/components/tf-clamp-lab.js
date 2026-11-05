/**
 * <tf-clamp-lab>: mostra o tamanho de um título fluido em cada largura de tela.
 * min e max em rem; from e to: as larguras (px) em que o tamanho começa e para de crescer.
 */
const ROOT = 16;
const round = (n) => Number(n.toFixed(4));

export function fluidAt({ min, max, from, to }, width) {
  const minPx = min * ROOT;
  const maxPx = max * ROOT;
  const slope = (maxPx - minPx) / (to - from);
  const px = minPx + slope * (width - from);
  return Math.min(maxPx, Math.max(minPx, px));
}

export function fluidCss({ min, max, from, to }) {
  const slope = ((max - min) * ROOT) / (to - from);
  const intercept = (min * ROOT - slope * from) / ROOT;
  return `clamp(${min}rem, ${round(intercept)}rem + ${round(slope * 100)}vw, ${max}rem)`;
}

export class TfClampLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('input[type="range"]')) return;
    const d = this.dataset;
    this.cfg = { min: Number(d.min), max: Number(d.max), from: Number(d.from), to: Number(d.to) };
    this.sample = this.querySelector('[data-clamp-sample]');
    const id = `clamp-${Math.random().toString(36).slice(2, 6)}`;
    const label = Object.assign(document.createElement('label'), { htmlFor: id, textContent: 'Largura da tela simulada' });
    this.range = Object.assign(document.createElement('input'), { type: 'range', id, min: 320, max: 1440, step: 10, value: 360 });
    this.range.addEventListener('input', () => this.update());
    const controls = Object.assign(document.createElement('div'), { className: 'tf-grid-controls' });
    controls.append(label, this.range);
    this.status = Object.assign(document.createElement('p'), { className: 'tf-grid-status' });
    this.status.dataset.clampStatus = '';
    this.status.setAttribute('aria-live', 'polite');
    this.code = Object.assign(document.createElement('pre'), { className: 'tf-sim-code' });
    this.code.textContent = `font-size: ${fluidCss(this.cfg)};`;
    this.prepend(controls, this.status);
    this.append(this.code);
    this.update();
  }

  update() {
    const width = Number(this.range.value);
    const px = Math.round(fluidAt(this.cfg, width) * 10) / 10;
    this.sample.style.fontSize = `${px}px`;
    this.status.textContent = `${width} px → ${px} px de fonte`;
  }
}
