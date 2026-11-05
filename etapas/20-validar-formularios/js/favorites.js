// As favoritas, como uma lista de ids. Por enquanto, só na memória: recarregou, perdeu (o capítulo 21 guarda no navegador).
let favorites = [];

export function isFavorite(id) {
  return favorites.includes(id);
}

// Liga ou desliga e devolve como ficou: true = favorita
export function toggleFavorite(id) {
  if (isFavorite(id)) {
    favorites = favorites.filter((favoriteId) => favoriteId !== id);
  } else {
    favorites.push(id);
  }
  return isFavorite(id);
}
