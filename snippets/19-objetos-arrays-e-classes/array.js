const favorites = ['1', '3'];  // um array: uma lista em ordem, entre colchetes

favorites.length;          // 2
favorites[0];              // '1': a contagem começa no zero
favorites.includes('3');   // true
favorites.push('2');       // põe no fim: ['1', '3', '2']

favorites.forEach((id) => {
  console.log(`Favorita: ${id}`); // roda uma vez para cada item
});
