/**
 * <tf-event-log>: um cartão de exemplo e o registro dos eventos que ele recebe.
 * Mostra o event.target de cada clique e o que o closest('.btn-favorite') encontra,
 * a base da delegação de eventos.
 */
const MAX_LINES = 5;

export class TfEventLog extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('ol')) return;
    const id = `ev-${Math.random().toString(36).slice(2, 6)}`;
    this.innerHTML = `
      <div class="tf-event-stage">
        <article class="card">
          <div class="card-body">
            <h3 class="card-title h6 mb-2">Trilha do Salto</h3>
            <label class="form-label small" for="${id}">Seu nome</label>
            <input class="form-control form-control-sm mb-2" id="${id}" autocomplete="off">
            <button type="button" class="btn btn-outline-secondary btn-sm btn-favorite" aria-label="Favoritar"><i class="tf-event-icon" aria-hidden="true">♡</i> Favoritar</button>
          </div>
        </article>
      </div>
      <div>
        <p class="small fw-semibold mb-1">Eventos recebidos pelo cartão (o mais novo em cima)</p>
        <ol class="tf-event-lines" aria-live="polite"></ol>
      </div>`;
    this.list = this.querySelector('ol');
    const card = this.querySelector('article');
    card.addEventListener('click', (event) => {
      const button = event.target.closest('.btn-favorite');
      this.log(`click · target: ${tag(event.target)} · closest('.btn-favorite'): ${button ? tag(button) : 'null'}`);
    });
    card.addEventListener('input', (event) => {
      this.log(`input · target: ${tag(event.target)} · value: "${event.target.value}"`);
    });
  }

  log(text) {
    const li = document.createElement('li');
    li.textContent = text;
    this.list.prepend(li);
    while (this.list.children.length > MAX_LINES) this.list.lastElementChild.remove();
  }
}

function tag(el) {
  return `<${el.tagName.toLowerCase()}>`;
}
