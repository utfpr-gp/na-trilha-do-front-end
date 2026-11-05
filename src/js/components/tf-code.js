/** <tf-code>: o trecho já vem destacado do build; aqui só entra o botão de copiar. */
export class TfCode extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('.tf-copy')) return;
    const pre = this.querySelector('pre');
    if (!pre) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-sm tf-copy';
    button.textContent = 'Copiar';
    const status = document.createElement('span');
    status.className = 'visually-hidden';
    status.setAttribute('aria-live', 'polite');
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.textContent);
        status.textContent = 'Copiado!';
      } catch {
        status.textContent = 'Não foi possível copiar.';
      }
    });
    (this.querySelector('figure') ?? this).append(button, status);
  }
}
