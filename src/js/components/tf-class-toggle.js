/**
 * <tf-class-toggle>: o simulador do "E se eu tirar?". Cada classe marcada com
 * data-sim-classes ganha uma caixa; desmarcar tira a classe e mostra o resultado.
 * Sem JavaScript, o exemplo aparece inteiro, com todas as classes.
 */
export class TfClassToggle extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('.tf-sim-controls')) return;
    this.stage = this.querySelector('.tf-sim-stage');
    if (!this.stage) return;

    const fieldset = document.createElement('fieldset');
    fieldset.className = 'tf-sim-controls';
    fieldset.innerHTML = '<legend>Classes do Bootstrap</legend>';
    for (const el of this.stage.querySelectorAll('[data-sim-classes]')) {
      for (const name of el.dataset.simClasses.split(/\s+/).filter(Boolean)) {
        const label = document.createElement('label');
        const box = document.createElement('input');
        box.type = 'checkbox';
        box.checked = true;
        box.value = name;
        box.addEventListener('change', () => this.toggle(el, name, box.checked));
        label.append(box, ` .${name}`);
        fieldset.append(label);
      }
    }

    this.code = document.createElement('pre');
    this.code.className = 'tf-sim-code';
    this.status = document.createElement('p');
    this.status.className = 'visually-hidden';
    this.status.setAttribute('aria-live', 'polite');
    this.prepend(fieldset);
    this.append(this.code, this.status);
    this.renderCode();
  }

  toggle(el, name, on) {
    el.classList.toggle(name, on);
    this.status.textContent = on ? `Classe ${name} de volta.` : `Classe ${name} removida.`;
    this.renderCode();
  }

  renderCode() {
    const copy = this.stage.cloneNode(true);
    copy.querySelectorAll('[data-sim-classes]').forEach((el) => {
      el.removeAttribute('data-sim-classes');
      if (el.getAttribute('class') === '') el.removeAttribute('class');
    });
    const lines = copy.innerHTML.split('\n').filter((l) => l.trim());
    const indent = Math.min(...lines.map((l) => l.match(/^\s*/)[0].length));
    this.code.textContent = lines.map((l) => l.slice(indent)).join('\n');
  }
}
