import { earnMark, hasMark } from '../progress.js';

/** <tf-challenge slug="…" award>: confere as respostas; acertar todas dá o marco. */
export class TfChallenge extends HTMLElement {
  connectedCallback() {
    const button = this.querySelector('[data-check]');
    if (!button || button.dataset.ready) return;
    button.dataset.ready = 'true';
    button.hidden = false;
    button.addEventListener('click', () => this.check());
  }

  check() {
    const questions = [...this.querySelectorAll('fieldset[data-correct]')];
    let right = 0;
    let blank = 0;
    for (const q of questions) {
      q.querySelectorAll('[data-explain]').forEach((p) => { p.hidden = true; });
      q.querySelector('.tf-feedback')?.remove();
      const chosen = q.querySelector('input[type="radio"]:checked');
      const feedback = document.createElement('p');
      feedback.className = 'tf-feedback';
      if (!chosen) {
        blank += 1;
        feedback.textContent = 'Escolha uma alternativa.';
      } else if (chosen.value === q.dataset.correct) {
        right += 1;
        feedback.textContent = 'Certo!';
        feedback.classList.add('is-right');
      } else {
        feedback.textContent = 'Ainda não.';
        feedback.classList.add('is-wrong');
        const explain = q.querySelector(`[data-explain="${chosen.value}"]`);
        if (explain) explain.hidden = false;
      }
      q.append(feedback);
    }
    const status = this.querySelector('[data-status]');
    const total = questions.length;
    if (right < total) {
      status.textContent = blank
        ? `Falta responder ${blank === 1 ? '1 pergunta' : `${blank} perguntas`}.`
        : `Você acertou ${right} de ${total}. Releia as explicações e tente de novo.`;
      return;
    }
    if (this.hasAttribute('award')) {
      const slug = this.getAttribute('slug');
      earnMark(slug);
      if (!hasMark(slug)) {
        status.textContent = 'Tudo certo! Este navegador não deixou guardar o marco.';
        return;
      }
      status.textContent = 'Marco conquistado!';
      this.dispatchEvent(new CustomEvent('tf-mark-earned', { detail: { slug }, bubbles: true }));
    } else {
      status.textContent = 'Tudo certo!';
    }
  }
}
