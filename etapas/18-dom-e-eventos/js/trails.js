// Tela Trilhas: o filtro por dificuldade e o botão de favorito.

// 1. Encontrar os elementos (uma vez só, no começo).
const trailList = document.querySelector('#trail-list');
const trailFilter = document.querySelector('#trail-filter');
const trailStatus = document.querySelector('#trail-status');

// Um cartão aparece no filtro escolhido?
function matchesFilter(card, filter) {
  if (filter === 'todas') return true;
  if (filter === 'favoritas') {
    return card.querySelector('.btn-favorite').getAttribute('aria-pressed') === 'true';
  }
  return card.dataset.dificuldade === filter; // lê o atributo data-dificuldade
}

// 2. Mudar a página: esconder os cartões fora do filtro e contar os que ficaram.
function applyFilter(filter) {
  let visible = 0;
  trailList.querySelectorAll('.trail-card').forEach((card) => {
    const show = matchesFilter(card, filter);
    card.hidden = !show;
    if (show) visible = visible + 1;
  });

  if (visible === 0) trailStatus.textContent = 'Nenhuma trilha neste filtro.';
  else if (visible === 1) trailStatus.textContent = '1 trilha';
  else trailStatus.textContent = `${visible} trilhas`;
}

function currentFilter() {
  return trailFilter.querySelector('input:checked').value;
}

// Liga ou desliga o favorito de um botão (o ícone, o aria-pressed e o texto para leitores de tela).
function toggleFavorite(button) {
  const favorite = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(favorite));
  button.setAttribute('aria-label', favorite ? 'Remover das favoritas' : 'Favoritar');
  const icon = button.querySelector('i');
  icon.classList.toggle('bi-heart', !favorite);
  icon.classList.toggle('bi-heart-fill', favorite);
}

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
