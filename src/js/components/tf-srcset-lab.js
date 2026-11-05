/**
 * <tf-srcset-lab>: mostra qual arquivo de um srcset o navegador tende a escolher,
 * dada a largura da tela (que define a largura do espaço, pelo sizes) e a densidade de pixels.
 * Os navegadores podem variar um pouco (cache, economia de dados); a regra básica é esta.
 */
export function slotWidth(sizes, viewport) {
  for (const part of sizes.split(',').map((p) => p.trim())) {
    const m = part.match(/^\(min-width:\s*(\d+)px\)\s+(\d+)vw$/);
    if (m && viewport >= Number(m[1])) return Math.round((Number(m[2]) / 100) * viewport);
    const plain = part.match(/^(\d+)vw$/);
    if (plain) return Math.round((Number(plain[1]) / 100) * viewport);
  }
  return viewport;
}

export function chooseCandidate(candidates, slot, dpr) {
  const sorted = [...candidates].sort((a, b) => a.w - b.w);
  return sorted.find((c) => c.w >= slot * dpr) ?? sorted.at(-1);
}

export class TfSrcsetLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('input[type="range"]')) return;
    this.sizes = this.dataset.sizes;
    this.candidates = this.dataset.srcset.split(',').map((p) => {
      const [file, w] = p.trim().split(/\s+/);
      return { file, w: parseInt(w, 10) };
    });
    const uid = Math.random().toString(36).slice(2, 6);
    const controls = Object.assign(document.createElement('div'), { className: 'tf-grid-controls' });
    const l1 = Object.assign(document.createElement('label'), { htmlFor: `sl-w-${uid}`, textContent: 'Largura da tela' });
    this.range = Object.assign(document.createElement('input'), { type: 'range', id: `sl-w-${uid}`, min: 320, max: 1440, step: 10, value: 375 });
    const l2 = Object.assign(document.createElement('label'), { htmlFor: `sl-d-${uid}`, textContent: 'Densidade de pixels' });
    this.dpr = Object.assign(document.createElement('select'), { id: `sl-d-${uid}`, className: 'form-select form-select-sm w-auto' });
    for (const [v, t] of [['1', '1x (tela comum)'], ['2', '2x (celular, tela "retina")'], ['3', '3x']]) this.dpr.append(new Option(t, v));
    controls.append(l1, this.range, l2, this.dpr);
    this.status = Object.assign(document.createElement('p'), { className: 'tf-grid-status' });
    this.status.dataset.srcsetStatus = '';
    this.status.setAttribute('aria-live', 'polite');
    this.append(controls, this.status);
    this.range.addEventListener('input', () => this.update());
    this.dpr.addEventListener('change', () => this.update());
    this.update();
  }

  update() {
    const viewport = Number(this.range.value);
    const dpr = Number(this.dpr.value);
    const slot = slotWidth(this.sizes, viewport);
    const chosen = chooseCandidate(this.candidates, slot, dpr);
    this.status.textContent = `Tela de ${viewport} px → a foto ocupa ${slot} px → precisa de ${slot * dpr} px de largura → baixa ${chosen.file}`;
  }
}
