/**
 * <tf-mask-lab>: digite num campo com máscara e veja o valor formatado e só os dígitos.
 * Imita o "0" do jQuery Mask Plugin (um dígito), sem precisar do jQuery no livro.
 */
const MASKS = ['00000-000', '(00) 00000-0000', '00/00/0000'];

// Encaixa os dígitos do valor na máscara. Um separador só entra se ainda vier dígito depois dele.
export function applyMask(mask, value) {
  const digits = value.replace(/\D/g, '').split('');
  let out = '';
  for (const char of mask) {
    if (digits.length === 0) break;
    out += char === '0' ? digits.shift() : char;
  }
  return out;
}

export class TfMaskLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('select')) return;
    const id = `mk-${Math.random().toString(36).slice(2, 6)}`;
    this.innerHTML = `
      <div class="tf-grid-controls">
        <label for="${id}-mascara">Máscara</label>
        <select class="form-select w-auto" id="${id}-mascara"></select>
        <code class="tf-mask-code"></code>
      </div>
      <div class="tf-grid-controls">
        <label for="${id}-campo">Digite aqui (letras são recusadas)</label>
        <input class="form-control w-auto" id="${id}-campo" inputmode="numeric" autocomplete="off">
        <output aria-live="polite"></output>
      </div>`;
    this.select = this.querySelector('select');
    MASKS.forEach((mask, index) => this.select.add(new Option(mask, String(index))));
    this.code = this.querySelector('code');
    this.input = this.querySelector('input');
    this.out = this.querySelector('output');
    this.select.addEventListener('change', () => this.choose());
    this.input.addEventListener('input', () => this.update());
    this.choose();
  }

  choose() {
    this.mask = MASKS[Number(this.select.value)];
    this.code.textContent = `$('#campo').mask('${this.mask}');`;
    this.input.value = '';
    this.update();
  }

  update() {
    this.input.value = applyMask(this.mask, this.input.value);
    this.out.textContent = `cleanVal() → '${this.input.value.replace(/\D/g, '')}'`;
  }
}
