/**
 * <tf-array-lab>: escolha um método de array (filter, map, find…) e veja o resultado,
 * escrito como o console mostraria, sobre um array pequeno de trilhas.
 */
const TRAILS = [
  { id: '1', nome: 'Trilha do Salto', dificuldade: 'moderada', destaque: true },
  { id: '2', nome: 'Caminho das Araucárias', dificuldade: 'facil', destaque: true },
  { id: '3', nome: 'Mirante da Serra', dificuldade: 'dificil', destaque: true },
  { id: '4', nome: 'Escadaria do Salto', dificuldade: 'facil', destaque: false },
];

const EXAMPLES = [
  { code: "trails.filter((trail) => trail.dificuldade === 'facil')", run: (t) => t.filter((trail) => trail.dificuldade === 'facil') },
  { code: 'trails.map((trail) => trail.nome)', run: (t) => t.map((trail) => trail.nome) },
  { code: "trails.find((trail) => trail.id === '3')", run: (t) => t.find((trail) => trail.id === '3') },
  { code: "trails.find((trail) => trail.id === '9')", run: (t) => t.find((trail) => trail.id === '9') },
  { code: 'trails.filter((trail) => trail.destaque).length', run: (t) => t.filter((trail) => trail.destaque).length },
];

// Escreve um valor como o console mostraria. Só o array de fora quebra linha; os de dentro ficam numa linha.
export function show(value, depth = 0) {
  if (typeof value === 'string') return `'${value}'`;
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((item) => show(item, depth + 1));
    if (depth === 0 && value.some((item) => typeof item === 'object' && item !== null)) {
      return `[\n${items.map((item) => `  ${item}`).join(',\n')}\n]`;
    }
    return `[${items.join(', ')}]`;
  }
  if (typeof value === 'object' && value !== null) {
    const fields = Object.entries(value).map(([key, field]) => `${key}: ${show(field, depth + 1)}`);
    return `{ ${fields.join(', ')} }`;
  }
  return String(value);
}

export class TfArrayLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('select')) return;
    const id = `arr-${Math.random().toString(36).slice(2, 6)}`;
    this.innerHTML = `
      <div class="tf-grid-controls">
        <label for="${id}">Experimente</label>
        <select class="form-select" id="${id}"></select>
      </div>
      <pre class="tf-array-result"><code></code>\n<span aria-hidden="true">→ </span><output aria-live="polite"></output></pre>`;
    this.select = this.querySelector('select');
    EXAMPLES.forEach((example, index) => this.select.add(new Option(example.code, String(index))));
    this.code = this.querySelector('code');
    this.out = this.querySelector('output');
    this.select.addEventListener('change', () => this.update());
    this.update();
  }

  update() {
    const example = EXAMPLES[Number(this.select.value)];
    this.code.textContent = example.code;
    this.out.textContent = show(example.run(TRAILS));
  }
}
