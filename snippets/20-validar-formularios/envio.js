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
