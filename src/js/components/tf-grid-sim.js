/**
 * <tf-grid-sim>: simula o grid do Bootstrap 5.3 numa largura escolhida.
 * O grid de verdade reage à largura da janela; aqui o cálculo é feito à mão, para caber na página.
 */
const BREAKPOINTS = [
  { name: 'xs', min: 0 },
  { name: 'sm', min: 576 },
  { name: 'md', min: 768 },
  { name: 'lg', min: 992 },
  { name: 'xl', min: 1200 },
  { name: 'xxl', min: 1400 },
];

export function breakpointAt(width) {
  return [...BREAKPOINTS].reverse().find((b) => width >= b.min);
}

/** Quantas das 12 colunas a classe ocupa nesta largura ('auto' para .col sem número). */
export function activeSpan(classes, width) {
  let span = 12;
  for (const b of BREAKPOINTS) {
    if (width < b.min) break;
    const infix = b.name === 'xs' ? '' : `-${b.name}`;
    const m = classes.split(/\s+/).map((c) => c.match(new RegExp(`^col${infix}(?:-(\\d+))?$`))).find(Boolean);
    if (m) span = m[1] ? Number(m[1]) : 'auto';
  }
  return span;
}

export class TfGridSim extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('input[type="range"]')) return;
    this.stage = this.querySelector('.tf-grid-stage');
    this.cols = [...this.stage.querySelectorAll('[data-cols]')];
    const id = `grid-${Math.random().toString(36).slice(2, 8)}`;
    const label = Object.assign(document.createElement('label'), { htmlFor: id, textContent: 'Largura da tela simulada' });
    this.range = Object.assign(document.createElement('input'), { type: 'range', id, min: 320, max: 1440, step: 10, value: 375 });
    this.status = Object.assign(document.createElement('p'), { className: 'tf-grid-status' });
    this.status.dataset.gridStatus = '';
    this.status.setAttribute('aria-live', 'polite');
    const controls = Object.assign(document.createElement('div'), { className: 'tf-grid-controls' });
    controls.append(label, this.range);
    this.prepend(controls, this.status);
    this.range.addEventListener('input', () => this.update());
    this.update();
  }

  update() {
    const width = Number(this.range.value);
    const autos = this.cols.filter((c) => activeSpan(c.dataset.cols, width) === 'auto').length;
    let perRow = 0;
    for (const col of this.cols) {
      const span = activeSpan(col.dataset.cols, width);
      const n = span === 'auto' ? Math.max(1, Math.floor(12 / autos)) : span;
      col.style.gridColumn = `span ${n}`;
      col.textContent = col.dataset.label ?? `.${col.dataset.cols.split(/\s+/).join(' .')}`;
      if (perRow === 0) perRow = Math.max(1, Math.floor(12 / n));
    }
    const bp = breakpointAt(width);
    this.status.textContent = `${width} px · ponto de quebra ${bp.name} · ${perRow} por linha`;
  }
}
