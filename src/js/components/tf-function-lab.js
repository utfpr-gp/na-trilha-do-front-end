import * as funcoes from '../trilheiro/funcoes.js';

/** <tf-function-lab data-fn="formatarDuracao" data-arg="150">: chama uma função do Trilheiro com o valor digitado. */
export class TfFunctionLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('input')) return;
    this.fn = funcoes[this.dataset.fn];
    const id = `fn-${Math.random().toString(36).slice(2, 6)}`;
    const label = Object.assign(document.createElement('label'), { htmlFor: id, textContent: this.dataset.label ?? 'Valor' });
    this.input = Object.assign(document.createElement('input'), { type: 'number', id, value: this.dataset.arg, className: 'form-control w-auto' });
    this.out = document.createElement('output');
    this.out.setAttribute('aria-live', 'polite');
    this.out.className = 'tf-grid-status';
    const row = Object.assign(document.createElement('div'), { className: 'tf-grid-controls' });
    row.append(label, this.input);
    this.append(row, this.out);
    this.input.addEventListener('input', () => this.update());
    this.update();
  }

  update() {
    const n = Number(this.input.value);
    const result = this.fn(n);
    this.out.textContent = `${this.dataset.fn}(${n}) → '${result}'`;
  }
}
