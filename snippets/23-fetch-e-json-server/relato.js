// O relato: o formulário do modal, com a validação do próprio Bootstrap (.was-validated).
reportForm.elements.dataVisita.max = todayISO();
reportForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  reportForm.classList.add('was-validated'); // mostra as mensagens dos campos inválidos
  if (!reportForm.checkValidity()) return;

  const data = new FormData(reportForm);
  const submitButton = document.querySelector('button[form="form-relato"]');
  submitButton.disabled = true; // evita dois envios com dois cliques
  reportError.hidden = true;
  try {
    const report = await createReport({
      trilhaId: id,
      nome: data.get('nome').trim(),
      dataVisita: data.get('dataVisita'),
      nota: Number(data.get('nota')),
      texto: data.get('texto').trim(),
    });
    const placeholder = reportList.querySelector('p.text-body-secondary');
    if (placeholder) placeholder.remove();
    reportList.prepend(createReportCard(report)); // o relato novo no topo
    reportForm.reset();
    reportForm.classList.remove('was-validated');
    bootstrap.Modal.getInstance(document.querySelector('#novo-relato')).hide(); // o bootstrap vem do bundle
  } catch (error) {
    console.error(error);
    reportError.textContent = 'Não foi possível publicar o relato agora. Tente de novo em instantes.';
    reportError.hidden = false;
  } finally {
    submitButton.disabled = false;
  }
});
