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

