async function loadTrail() {
  if (!id) {
    showError(status, 'Nenhuma trilha escolhida. Volte à lista de trilhas e escolha uma.');
    return;
  }
  showLoading(status, 'Carregando a trilha…');
  try {
    const data = await getTrail(id);
    status.replaceChildren();
    fill(new Trail(data));
  } catch (error) {
    console.error(error);
    setField('nome', 'Trilha não encontrada');
    const message = error instanceof NotFoundError
      ? 'Esta trilha não existe (ou foi removida). Volte à lista e escolha outra.'
      : 'Não foi possível carregar a trilha agora. Tente de novo em instantes.';
    showError(status, message);
  }
}
