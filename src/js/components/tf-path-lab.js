/**
 * <tf-path-lab>: digite um caminho e veja para onde ele aponta quando a página está publicada
 * em https://ana.github.io/trilheiro/, um site de projeto do GitHub Pages.
 */
const PAGE = 'https://ana.github.io/trilheiro/trilha.html';
const PROJECT = 'https://ana.github.io/trilheiro/';

export class TfPathLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('input')) return;
    const id = `path-${Math.random().toString(36).slice(2, 6)}`;
    this.innerHTML = `
      <p class="small mb-0">Página publicada: <code></code></p>
      <div class="tf-grid-controls">
        <label for="${id}">href="…"</label>
        <input class="form-control" id="${id}" value="css/main.css" autocomplete="off" spellcheck="false">
      </div>
      <output aria-live="polite"></output>`;
    this.querySelector('code').textContent = PAGE;
    this.input = this.querySelector('input');
    this.out = this.querySelector('output');
    this.input.addEventListener('input', () => this.update());
    this.update();
  }

  update() {
    let url;
    try {
      url = new URL(this.input.value, PAGE); // o mesmo cálculo que o navegador faz
    } catch {
      this.out.textContent = '✗ não é um endereço válido';
      return;
    }
    const verdict = url.href.startsWith(`${PROJECT}node_modules/`)
      ? '✗ a node_modules não vai para o GitHub: 404'
      : url.href.startsWith(PROJECT)
        ? '✓ dentro do projeto'
        : url.hostname === 'ana.github.io'
          ? '✗ fora do projeto: 404'
          : '✓ outro site (um CDN)';
    this.out.textContent = `→ ${url.href} ${verdict}`;
    this.out.classList.toggle('is-ok', verdict.startsWith('✓'));
  }
}
