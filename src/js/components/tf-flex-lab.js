/** <tf-flex-lab>: o laboratório de Flexbox. Cada propriedade do contêiner vira um seletor. */
const PROPS = [
  ['flex-direction', ['row', 'column', 'row-reverse', 'column-reverse']],
  ['justify-content', ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']],
  ['align-items', ['stretch', 'flex-start', 'center', 'flex-end', 'baseline']],
  ['flex-wrap', ['nowrap', 'wrap']],
  ['gap', ['0', '0.5rem', '1rem', '2rem']],
];

export class TfFlexLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('select')) return;
    this.stage = this.querySelector('[data-flex-stage]');
    const controls = Object.assign(document.createElement('div'), { className: 'tf-flex-controls' });
    this.selects = PROPS.map(([prop, values]) => {
      const id = `flex-${prop}-${Math.random().toString(36).slice(2, 6)}`;
      const label = Object.assign(document.createElement('label'), { htmlFor: id, textContent: prop });
      const select = Object.assign(document.createElement('select'), { id, className: 'form-select form-select-sm' });
      for (const v of values) select.append(new Option(v, v));
      select.dataset.prop = prop;
      select.dataset.default = values[0];
      select.addEventListener('change', () => this.update());
      const field = document.createElement('div');
      field.append(label, select);
      controls.append(field);
      return select;
    });
    this.code = Object.assign(document.createElement('pre'), { className: 'tf-sim-code' });
    this.prepend(controls);
    this.append(this.code);
    this.update();
  }

  update() {
    this.stage.style.display = 'flex';
    const lines = ['  display: flex;'];
    for (const s of this.selects) {
      this.stage.style.setProperty(s.dataset.prop, s.value);
      if (s.value !== s.dataset.default) lines.push(`  ${s.dataset.prop}: ${s.value};`);
    }
    this.code.textContent = `.contêiner {\n${lines.join('\n')}\n}`;
  }
}
