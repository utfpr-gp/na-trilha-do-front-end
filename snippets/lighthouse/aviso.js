// O aviso de "só leitura" já vem no HTML, para não empurrar o formulário quando aparece (CLS).
// No computador, com o json-server, ele sai; no site publicado, fica, e o botão é desligado.
if (canWrite()) {
  document.querySelector('#read-only').remove();
} else {
  form.querySelector('button[type="submit"]').disabled = true;
}
