async function loadTrails() {
  showLoading(trailList, 'Carregando as trilhas…');
  try {
    const data = await getTrails();
    trails = data.map((item) => new Trail(item)); // a mesma lista de antes, só que vinda do servidor
    render();
  } catch (error) {
    console.error(error);
    trailStatus.textContent = '';
    showError(trailList, 'Não foi possível carregar as trilhas agora. Tente de novo em instantes.');
  }
}

loadTrails();
