const cards = featured.map((trail) => createTrailCard(trail, isFavorite(trail.id)));
// cards é um array de elementos; os "..." espalham o array em argumentos soltos
featuredList.replaceChildren(...cards); // tira o que havia e põe os cartões, na ordem
