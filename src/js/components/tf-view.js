/** <tf-view>: o build já escreveu a seção; aqui entra o botão que copia o link dela. */
export class TfView extends HTMLElement {
  connectedCallback() {
    const section = this.querySelector('section[id]');
    const title = section?.querySelector('.tf-view-title');
    if (!title || title.querySelector('button')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tf-anchor';
    button.textContent = '#';
    button.setAttribute('aria-label', `Copiar o link da seção ${title.textContent.trim()}`);
    button.addEventListener('click', () => {
      const url = `${location.origin}${location.pathname}#${section.id}`;
      navigator.clipboard?.writeText(url).catch(() => {});
      history.replaceState(null, '', `#${section.id}`);
    });
    title.append(button);
  }
}
