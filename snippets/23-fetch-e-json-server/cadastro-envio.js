  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true; // evita gravar duas vezes com dois cliques
  formError.hidden = true;
  try {
    const created = await createTrail(readTrail()); // o servidor devolve a trilha com o id novo
    location.href = `trilha.html?id=${created.id}`; // e o site leva ao detalhe dela (US05)
  } catch (error) {
    console.error(error);
    formError.textContent = 'Não foi possível salvar a trilha agora. Os dados continuam aqui: tente de novo em instantes.';
    formError.hidden = false;
    submitButton.disabled = false;
  }
});
