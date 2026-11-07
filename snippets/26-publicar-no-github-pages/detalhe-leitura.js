// No site publicado, o relato não tem onde ser gravado: o botão dá lugar a um aviso.
if (!canWrite()) {
  const button = document.querySelector('#report-button');
  const notice = document.createElement('p');
  notice.className = 'small text-body-secondary mb-0';
  notice.textContent = READ_ONLY_MESSAGE;
  button.replaceWith(notice);
}
