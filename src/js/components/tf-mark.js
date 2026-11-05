import { formatDate } from '../format.js';
import { loadProgress } from '../progress.js';

/** <tf-mark slug>: o espaço do marco no cabeçalho do capítulo. */
export class TfMark extends HTMLElement {
  connectedCallback() {
    this.render();
    this.onEarned = (e) => { if (e.detail?.slug === this.getAttribute('slug')) this.render(); };
    document.addEventListener('tf-mark-earned', this.onEarned);
  }

  disconnectedCallback() {
    document.removeEventListener('tf-mark-earned', this.onEarned);
  }

  render() {
    const mark = loadProgress().marks[this.getAttribute('slug')];
    this.classList.toggle('is-done', Boolean(mark));
    this.textContent = mark ? `Marco conquistado em ${formatDate(mark.date)}` : 'Marco ainda não conquistado';
  }
}
