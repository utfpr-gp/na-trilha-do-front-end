// Tela Trilhas: todas as trilhas, com o filtro por dificuldade e as favoritas.
import { TRAILS } from './data.js';
import { Trail } from './trail.js';
import { createTrailCard, listenFavoriteClicks } from './trail-card.js';
import { isFavorite } from './favorites.js';
import { loadFilter, saveFilter } from './storage.js';

const trailList = document.querySelector('#trail-list');
const trailFilter = document.querySelector('#trail-filter');
const trailStatus = document.querySelector('#trail-status');

const trails = TRAILS.map((data) => new Trail(data));

function filterTrails(filter) {
  if (filter === 'todas') return trails;
  if (filter === 'favoritas') return trails.filter((trail) => isFavorite(trail.id));
  return trails.filter((trail) => trail.dificuldade === filter);
}

function statusText(count) {
  if (count === 0) return 'Nenhuma trilha neste filtro.';
  if (count === 1) return '1 trilha';
  return `${count} trilhas`;
}

function currentFilter() {
  return trailFilter.querySelector('input:checked').value;
}

// Agora a lista é desenhada de novo a partir do array, em vez de esconder cartões.
function render() {
  const visible = filterTrails(currentFilter());
  trailList.replaceChildren(...visible.map((trail) => createTrailCard(trail, isFavorite(trail.id))));
  trailStatus.textContent = statusText(visible.length);
}

// Volta ao filtro da última visita (RN06): marca o rádio certo antes de desenhar a lista.
trailFilter.querySelector(`input[value="${loadFilter()}"]`).checked = true;

trailFilter.addEventListener('change', () => {
  saveFilter(currentFilter());
  render();
});
listenFavoriteClicks(trailList, () => {
  if (currentFilter() === 'favoritas') render();
});

render();
