/**
 * <tf-regex-lab>: escolha uma regra (expressão regular) do cadastro do Trilheiro,
 * digite um valor e veja, a cada letra, se ele combina.
 */
const RULES = [
  { label: 'CEP', regex: /^\d{5}-?\d{3}$/, example: '85010-260' },
  { label: 'Telefone', regex: /^\(\d{2}\) \d{5}-\d{4}$/, example: '(42) 99999-1234' },
  { label: 'UF', regex: /^[A-Za-z]{2}$/, example: 'PR' },
  { label: 'Tem alguma letra', regex: /[a-zà-ú]/i, example: 'Trilha do Salto' },
];

export class TfRegexLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('select')) return;
    const id = `re-${Math.random().toString(36).slice(2, 6)}`;
    this.innerHTML = `
      <div class="tf-grid-controls">
        <label for="${id}-regra">Regra</label>
        <select class="form-select w-auto" id="${id}-regra"></select>
        <code class="tf-regex-code"></code>
      </div>
      <div class="tf-grid-controls">
        <label for="${id}-valor">Valor para testar</label>
        <input class="form-control w-auto" id="${id}-valor" autocomplete="off" spellcheck="false">
        <output class="tf-regex-result" aria-live="polite"></output>
      </div>`;
    this.select = this.querySelector('select');
    RULES.forEach((rule, index) => this.select.add(new Option(rule.label, String(index))));
    this.code = this.querySelector('code');
    this.input = this.querySelector('input');
    this.out = this.querySelector('output');
    this.select.addEventListener('change', () => this.choose());
    this.input.addEventListener('input', () => this.test());
    this.choose();
  }

  choose() {
    this.rule = RULES[Number(this.select.value)];
    this.code.textContent = String(this.rule.regex);
    this.input.value = this.rule.example;
    this.test();
  }

  test() {
    const ok = this.rule.regex.test(this.input.value);
    this.out.textContent = ok ? '✓ combina' : '✗ não combina';
    this.out.classList.toggle('is-match', ok);
  }
}
