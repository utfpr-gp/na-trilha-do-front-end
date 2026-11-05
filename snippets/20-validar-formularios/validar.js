// Uma regra que o HTML não sabe conferir: o nome precisa ter alguma letra ("123" não é nome).
const HAS_LETTER = /[a-zà-ú]/i;

function customProblem(field) {
  if (field.name === 'nome' && field.value !== '' && !HAS_LETTER.test(field.value)) {
    return 'O nome precisa ter letras.';
  }
  return '';
}

function messageFor(field) {
  const messages = MESSAGES[field.name] ?? {};
  const problem = Object.keys(messages).find((key) => field.validity[key]);
  return problem ? messages[problem] : field.validationMessage;
}

// Confere um campo e troca a mensagem do navegador pela nossa. Devolve true se está válido.
function validateField(field) {
  field.setCustomValidity(''); // começa do zero: sem isso, o erro antigo nunca sai
  const custom = customProblem(field);
  if (custom) {
    field.setCustomValidity(custom); // com um texto, o campo passa a ser inválido
  } else if (!field.validity.valid) {
    field.setCustomValidity(messageFor(field));
  }
  showFeedback(field);
  return field.validity.valid;
}

// Mostra (ou apaga) a mensagem abaixo do campo, e pinta a borda de vermelho com .is-invalid.
function showFeedback(field) {
  const valid = field.validity.valid;
  const feedback = form.querySelector(`[data-feedback-for="${field.name}"]`);
  if (feedback) feedback.textContent = valid ? '' : field.validationMessage;
  // Num grupo de rádios, todos ficam vermelhos juntos.
  form.querySelectorAll(`[name="${field.name}"]`).forEach((el) => el.classList.toggle('is-invalid', !valid));
}

