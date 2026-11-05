// Início: as trilhas em destaque.
import { TRAILS } from './data.js';
import { Trail } from './trail.js';
import { createTrailCard, listenFavoriteClicks } from './trail-card.js';
import { isFavorite } from './favorites.js';

const featuredList = document.querySelector('#featured-list');

const featured = TRAILS
  .filter((data) => data.destaque)  // só as de destaque
  .map((data) => new Trail(data));  // cada objeto vira um Trail

featuredList.replaceChildren(...featured.map((trail) => createTrailCard(trail, isFavorite(trail.id))));
listenFavoriteClicks(featuredList);
