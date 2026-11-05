// 3. Reagir às ações da pessoa.
// Um ouvinte só, no grupo: o evento "change" de qualquer rádio sobe até ele.
trailFilter.addEventListener('change', (event) => {
  applyFilter(event.target.value);
});

// Um ouvinte só, na lista inteira (delegação): vale para todos os botões de favorito.
trailList.addEventListener('click', (event) => {
  const button = event.target.closest('.btn-favorite'); // o clique pode ter sido no ícone, dentro do botão
  if (!button) return;
  toggleFavorite(button);
  if (currentFilter() === 'favoritas') applyFilter('favoritas');
});

applyFilter(currentFilter());
