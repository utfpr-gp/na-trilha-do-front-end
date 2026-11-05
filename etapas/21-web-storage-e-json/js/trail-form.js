// Cadastrar trilha: as regras do PRD (RN01 a RN05) conferidas no navegador, antes de salvar.
const form = document.querySelector('#trail-form');
const success = document.querySelector('#form-success');

// RN05: a data não pode estar no futuro. O máximo do campo é hoje, no fuso de quem está usando.
function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}
form.elements.ultimaVisita.max = todayISO();

// As mensagens, por campo e por problema. Os nomes dos problemas são os do objeto field.validity.
const MESSAGES = {
  nome: { valueMissing: 'Dê um nome à trilha.', tooShort: 'Use pelo menos 3 caracteres.' },
  dificuldade: { valueMissing: 'Escolha a dificuldade.' },
  tipoPercurso: { valueMissing: 'Escolha o tipo de percurso.' },
  distanciaKm: {
    valueMissing: 'Informe a distância.',
    badInput: 'Digite só números, como 4,5.',
    rangeUnderflow: 'A distância mínima é 0,5 km.',
    rangeOverflow: 'A distância máxima é 50 km.',
    stepMismatch: 'Use no máximo uma casa decimal.',
  },
  duracaoMin: {
    valueMissing: 'Informe a duração, em minutos.',
    badInput: 'Digite só números.',
    rangeUnderflow: 'A duração mínima é 10 minutos.',
    rangeOverflow: 'A duração máxima é 1440 minutos (24 horas).',
    stepMismatch: 'Use minutos inteiros.',
  },
  descricao: { valueMissing: 'Descreva a trilha.', tooShort: 'Escreva pelo menos 20 caracteres.' },
  cep: { valueMissing: 'Informe o CEP do ponto de partida.', patternMismatch: 'Use o formato 00000-000.' },
  cidade: { valueMissing: 'Informe a cidade.' },
  uf: { valueMissing: 'Informe a UF.', patternMismatch: 'Use as duas letras do estado, como PR.' },
  guiaTelefone: { patternMismatch: 'Use o formato (00) 00000-0000.' },
  ultimaVisita: { valueMissing: 'Informe a data da última visita.', rangeOverflow: 'A data não pode estar no futuro.' },
};

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

function isField(el) {
  return el.matches('input, select, textarea');
}

// Só mostra o erro depois que a pessoa passou pelo campo (design system).
form.addEventListener('focusout', (event) => {
  if (!isField(event.target)) return;
  event.target.dataset.touched = 'true';
  validateField(event.target);
});

// Depois de tocado, o campo é conferido a cada mudança: o erro some assim que é corrigido.
form.addEventListener('input', (event) => {
  if (isField(event.target) && event.target.dataset.touched) validateField(event.target);
});

// RN04: o hífen é opcional ao digitar, mas o CEP é guardado como 00000-000.
function formatCep(value) {
  const digits = value.replace(/\D/g, ''); // tira tudo o que não é dígito
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

// Lê o formulário e monta o objeto da trilha, com os campos do architecture.md.
function readTrail() {
  const data = new FormData(form);
  return {
    nome: data.get('nome').trim(),
    cidade: data.get('cidade').trim(),
    uf: data.get('uf').toUpperCase(),
    bairro: data.get('bairro').trim(),
    cep: formatCep(data.get('cep')),
    distanciaKm: Number(data.get('distanciaKm')),
    dificuldade: data.get('dificuldade'),
    tipoPercurso: data.get('tipoPercurso'),
    duracaoMin: Number(data.get('duracaoMin')),
    oQueLevar: data.getAll('oQueLevar'),
    descricao: data.get('descricao').trim(),
    guiaNome: data.get('guiaNome').trim(),
    guiaTelefone: data.get('guiaTelefone'),
    ultimaVisita: data.get('ultimaVisita'),
    destaque: false,
    fotos: [],
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); // quem decide se salva é o JavaScript
  const fields = [...form.elements].filter(isField);
  fields.forEach((field) => {
    field.dataset.touched = 'true';
    validateField(field);
  });

  const firstInvalid = fields.find((field) => !field.validity.valid);
  if (firstInvalid) {
    success.hidden = true;
    firstInvalid.focus(); // leva a pessoa ao primeiro erro
    return;
  }

  const trail = readTrail();
  console.log(trail);
  success.textContent = `Tudo certo com a trilha "${trail.nome}".`;
  success.hidden = false;
});
