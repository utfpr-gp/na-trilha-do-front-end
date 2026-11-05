// Abrir o modal pelo JavaScript, em vez de um botão com data-bs-toggle
const elemento = document.querySelector('#novo-relato');
const modal = bootstrap.Modal.getOrCreateInstance(elemento);
modal.show();
