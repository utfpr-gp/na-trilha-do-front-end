// Volta ao filtro da última visita (RN06): marca o rádio certo antes de desenhar a lista.
trailFilter.querySelector(`input[value="${loadFilter()}"]`).checked = true;

trailFilter.addEventListener('change', () => {
  saveFilter(currentFilter());
  render();
});
