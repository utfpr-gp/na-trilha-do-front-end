// O endereço pelo CEP: assim que o CEP fica completo, o ViaCEP preenche a cidade, a UF e o bairro.
// Os campos continuam editáveis, e uma falha só deixa a pessoa preencher à mão (RN07).
const cepStatus = document.querySelector('#cep-status');

form.elements.cep.addEventListener('input', async () => {
  const cep = form.elements.cep.value;
  if (!/^\d{5}-\d{3}$/.test(cep)) return; // só com o CEP completo e válido (RN04)
  cepStatus.textContent = 'Buscando o endereço…';
  try {
    const address = await lookupCep(cep);
    form.elements.cidade.value = address.cidade;
    form.elements.uf.value = address.uf;
    form.elements.bairro.value = address.bairro;
    [form.elements.cidade, form.elements.uf].forEach((field) => {
      if (field.dataset.touched) validateField(field); // apaga um erro que já estava na tela
    });
    cepStatus.textContent = '';
  } catch (error) {
    console.error(error);
    cepStatus.textContent = 'CEP não encontrado. Preencha a cidade e o bairro.';
  }
});
