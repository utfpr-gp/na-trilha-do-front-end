// Início: as trilhas em destaque, agora vindas do servidor.
import { getTrails } from './api.js';
import { Trail } from './trail.js';
import { createTrailCard, listenFavoriteClicks } from './trail-card.js';
import { isFavorite } from './favorites.js';
import { showError, showLoading } from './feedback.js';

const featuredList = document.querySelector('#featured-list');
listenFavoriteClicks(featuredList);

async function loadFeatured() {
  showLoading(featuredList, 'Carregando as trilhas…');
  try {
    const data = await getTrails(); // espera o servidor responder
    const featured = data
      .filter((item) => item.destaque)
      .slice(0, 3) // no máximo 3 no Início
      .map((item) => new Trail(item));
    featuredList.replaceChildren(
      ...featured.map((trail) => createTrailCard(trail, isFavorite(trail.id))),
    );
  } catch (error) {
    console.error(error); // o detalhe técnico fica no console, para quem desenvolve
    showError(
      featuredList,
      'Não foi possível carregar as trilhas agora. Tente de novo em instantes.',
    );
  }
}

loadFeatured();
