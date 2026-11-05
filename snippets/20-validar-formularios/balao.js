const cep = document.querySelector('#cep');

cep.addEventListener('input', () => {
  cep.setCustomValidity(''); // apaga o erro anterior (senão o campo fica inválido para sempre)
  if (cep.validity.patternMismatch) {
    cep.setCustomValidity('Use o formato 00000-000.'); // esta é a frase que vai aparecer no balão
  }
});
