// Tela Trilhas: todas as trilhas, com o filtro por dificuldade e as favoritas.
import { getTrails } from './api.js';
import { Trail } from './trail.js';
import { createTrailCard, listenFavoriteClicks, prioritizeFirstImage } from './trail-card.js';
import { isFavorite } from './favorites.js';
import { loadFilter, saveFilter } from './storage.js';
import { showError, showLoading } from './feedback.js';

const trailList = document.querySelector('#trail-list');
const trailFilter = document.querySelector('#trail-filter');
const trailStatus = document.querySelector('#trail-status');

let trails = []; // começa vazio e é preenchido quando o servidor responde

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

function render() {
  const visible = filterTrails(currentFilter());
  trailList.replaceChildren(
    ...visible.map((trail) => createTrailCard(trail, isFavorite(trail.id))),
  );
  prioritizeFirstImage(trailList);
  trailStatus.textContent = statusText(visible.length);
}

// Volta ao filtro da última visita (RN06).
trailFilter.querySelector(`input[value="${loadFilter()}"]`).checked = true;

// A troca de filtro ganha uma animação curta, com o jQuery (carregado pelo CDN no trilhas.html).
// Quem pediu menos movimento no sistema operacional vê a lista mudar sem animação.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function animateList() {
  if (reduceMotion.matches) return;
  $(trailList).children().hide().fadeIn(250);
}

trailFilter.addEventListener('change', () => {
  saveFilter(currentFilter());
  render();
  animateList();
});
listenFavoriteClicks(trailList, () => {
  if (currentFilter() === 'favoritas') render();
});

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
