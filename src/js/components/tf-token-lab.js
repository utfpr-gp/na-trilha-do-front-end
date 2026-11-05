import { contrastRatio, formatRatio } from '../contrast.js';

/**
 * <tf-token-lab>: o laboratório de design tokens. Cada token vira um seletor de cor;
 * a prévia usa os tokens como variáveis CSS, e cada par de cores mostra o contraste.
 */
export class TfTokenLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('input[type="color"]')) return;
    this.preview = this.querySelector('[data-lab-preview]');
    this.tokens = new Map();
    for (const li of this.querySelectorAll('[data-token]')) {
      const name = li.dataset.token;
      const id = `lab${name.replace(/[^\w]/g, '-')}`;
      const input = Object.assign(document.createElement('input'), { type: 'color', id, value: li.dataset.value.toLowerCase() });
      const label = Object.assign(document.createElement('label'), { htmlFor: id });
      label.append(li.textContent.trim(), ' ', Object.assign(document.createElement('code'), { textContent: name }));
      li.replaceChildren(input, label);
      input.addEventListener('input', () => this.update());
      this.tokens.set(name, input);
    }
    this.pairs = [...this.querySelectorAll('[data-fg][data-bg]')].map((li) => ({ li, label: li.textContent.trim() }));
    this.status = Object.assign(document.createElement('p'), { className: 'visually-hidden' });
    this.status.setAttribute('aria-live', 'polite');
    this.append(this.status);
    this.update();
  }

  resolve(value) {
    return value.startsWith('--') ? this.tokens.get(value).value : value;
  }

  update() {
    for (const [name, input] of this.tokens) this.preview.style.setProperty(name, input.value);
    const fails = [];
    for (const { li, label } of this.pairs) {
      const ratio = contrastRatio(this.resolve(li.dataset.fg), this.resolve(li.dataset.bg));
      const ok = ratio >= 4.5;
      li.classList.toggle('is-fail', !ok);
      li.textContent = `${label}: ${formatRatio(ratio)} · ${ok ? 'passa no AA' : 'não passa no AA (mínimo 4,5:1)'}`;
      if (!ok) fails.push(label);
    }
    this.status.textContent = fails.length ? `Contraste insuficiente: ${fails.join(', ')}.` : 'Todos os pares passam no AA.';
  }
}
