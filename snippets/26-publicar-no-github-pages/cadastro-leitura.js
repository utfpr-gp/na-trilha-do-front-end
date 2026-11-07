// No site publicado não há servidor para gravar: o formulário avisa logo no começo e desliga o botão.
if (!canWrite()) {
  const notice = document.querySelector('#read-only');
  notice.textContent = READ_ONLY_MESSAGE;
  notice.hidden = false;
  form.querySelector('button[type="submit"]').disabled = true;
}
