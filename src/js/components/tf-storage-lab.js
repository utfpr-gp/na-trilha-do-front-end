/**
 * <tf-storage-lab>: favoritas de verdade, guardadas no localStorage deste navegador.
 * Mostra o array, o texto que o JSON.stringify grava e o que seria gravado sem JSON.
 * Recarregar a página prova que os dados ficam.
 */
import { show } from './tf-array-lab.js';

export const LAB_KEY = 'tf-lab:favoritas';
const TRAILS = [
  { id: '1', nome: 'Trilha do Salto' },
  { id: '2', nome: 'Caminho das Araucárias' },
  { id: '3', nome: 'Mirante da Serra' },
];

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(LAB_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export class TfStorageLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('fieldset')) return;
    const prefix = `st-${Math.random().toString(36).slice(2, 6)}`;
    const saved = load();
    const boxes = TRAILS.map((trail) => `
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" id="${prefix}-${trail.id}" value="${trail.id}"${saved.includes(trail.id) ? ' checked' : ''}>
          <label class="form-check-label" for="${prefix}-${trail.id}">${trail.nome}</label>
        </div>`).join('');
    this.innerHTML = `
      <fieldset>
        <legend class="small fw-semibold">Favoritar</legend>${boxes}
      </fieldset>
      <dl class="tf-storage-rows">
        <dt><code>favorites</code></dt><dd><output></output></dd>
        <dt><code>JSON.stringify(favorites)</code>, o que fica guardado</dt><dd><output></output></dd>
        <dt>Sem o JSON: <code>String(favorites)</code></dt><dd><output></output></dd>
      </dl>
      <p class="small mb-0">Marque algumas e recarregue a página: as marcações continuam aqui.</p>`;
    this.outs = [...this.querySelectorAll('output')];
    this.addEventListener('change', () => this.update(true));
    this.update(false);
  }

  update(save) {
    const favorites = [...this.querySelectorAll('input:checked')].map((box) => box.value);
    const json = JSON.stringify(favorites);
    this.outs[0].textContent = show(favorites);
    this.outs[1].textContent = `'${json}'`;
    this.outs[2].textContent = `'${String(favorites)}'`;
    if (!save) return;
    try {
      localStorage.setItem(LAB_KEY, json);
    } catch {
      // Armazenamento bloqueado: o laboratório continua funcionando, só não guarda.
    }
  }
}
