// O mesmo, sem jQuery
async function include(selector, file) {
  const response = await fetch(file);
  document.querySelector(selector).innerHTML = await response.text();
}
include('#site-header', 'partes/cabecalho.html');
include('#site-footer', 'partes/rodape.html');
