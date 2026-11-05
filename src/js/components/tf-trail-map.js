import { formatDate } from '../format.js';
import { exportProgress, importProgress, loadProgress } from '../progress.js';

/** <tf-trail-map>: marca na caderneta o que já foi conquistado, e exporta e importa o progresso. */
export class TfTrailMap extends HTMLElement {
  connectedCallback() {
    this.render();
    this.querySelector('[data-export]')?.addEventListener('click', () => this.download());
    this.querySelector('[data-import]')?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (file) await this.importText(await file.text());
      e.target.value = '';
    });
  }

  render() {
    const { marks } = loadProgress();
    const stops = [...this.querySelectorAll('.tf-stop')];
    for (const stop of stops) {
      const mark = marks[stop.dataset.slug];
      stop.classList.toggle('is-done', Boolean(mark));
      stop.querySelector('.tf-stop-state').textContent = mark ? `conquistado em ${formatDate(mark.date)}` : 'ainda não conquistado';
    }
    for (const view of this.querySelectorAll('[data-viewpoint]')) {
      const own = [...view.closest('.tf-trail-part').querySelectorAll('.tf-stop')];
      view.classList.toggle('is-done', own.every((s) => s.classList.contains('is-done')));
    }
    const done = stops.filter((s) => s.classList.contains('is-done')).length;
    this.querySelector('[data-summit]')?.classList.toggle('is-done', done === stops.length);
    const count = this.querySelector('[data-count]');
    if (count) count.textContent = `${done} de ${stops.length} marcos`;
  }

  async importText(text) {
    const result = importProgress(text);
    this.querySelector('[data-status]').textContent = result.ok ? 'Progresso importado.' : result.error;
    this.render();
  }

  download() {
    const url = URL.createObjectURL(new Blob([exportProgress()], { type: 'application/json' }));
    const link = Object.assign(document.createElement('a'), { href: url, download: 'na-trilha-progresso.json' });
    link.click();
    URL.revokeObjectURL(url);
    this.querySelector('[data-status]').textContent = 'Arquivo na-trilha-progresso.json baixado.';
  }
}
