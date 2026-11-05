// As favoritas, como uma lista de ids, agora guardada no navegador (RN06).
import { loadFavorites, saveFavorites } from './storage.js';

let favorites = loadFavorites(); // começa com o que ficou da última visita

export function isFavorite(id) {
  return favorites.includes(id);
}

// Liga ou desliga, guarda e devolve como ficou: true = favorita
export function toggleFavorite(id) {
  if (isFavorite(id)) {
    favorites = favorites.filter((favoriteId) => favoriteId !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites(favorites);
  return isFavorite(id);
}
