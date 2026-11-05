/**
 * <tf-unit-lab>: compara unidades de medida quando a pessoa aumenta a fonte do navegador.
 * O cálculo é feito à mão (como o navegador faria), para não mexer na fonte da página do livro.
 */
export function sizeFor(value, { root = 16, parent = root, container = 0, viewport = 0 } = {}) {
  const n = parseFloat(value);
  if (value.endsWith('rem')) return n * root;
  if (value.endsWith('em')) return n * parent;
  if (value.endsWith('px')) return n;
  if (value.endsWith('%')) return (n / 100) * container;
  if (value.endsWith('vw')) return (n / 100) * viewport;
  return n;
}

export class TfUnitLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('input[type="range"]')) return;
    this.bars = [...this.querySelectorAll('[data-unit]')];
    const id = `fonte-${Math.random().toString(36).slice(2, 6)}`;
    const label = Object.assign(document.createElement('label'), { htmlFor: id });
    label.textContent = 'Tamanho da fonte do navegador: ';
    this.out = document.createElement('output');
    label.append(this.out);
    this.range = Object.assign(document.createElement('input'), { type: 'range', id, min: 12, max: 28, step: 2, value: 16 });
    this.range.addEventListener('input', () => this.update());
    const controls = Object.assign(document.createElement('div'), { className: 'tf-grid-controls' });
    controls.append(label, this.range);
    this.prepend(controls);
    this.update();
  }

  update() {
    const root = Number(this.range.value);
    this.out.textContent = `${root} px`;
    for (const bar of this.bars) {
      const px = sizeFor(bar.dataset.unit, { root });
      bar.style.width = `${px}px`;
      bar.textContent = `${bar.dataset.unit} = ${px} px`;
    }
  }
}
