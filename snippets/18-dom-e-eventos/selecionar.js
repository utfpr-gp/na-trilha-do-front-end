// O primeiro elemento que combina com o seletor (o mesmo seletor do CSS), ou null
const trailList = document.querySelector('#trail-list');
const firstTitle = document.querySelector('.card-title');

// Todos os que combinam, numa lista (NodeList) que dá para percorrer com forEach
const cards = document.querySelectorAll('.trail-card');
console.log(cards.length); // 3

// Também dá para procurar só dentro de um elemento
const button = cards[0].querySelector('.btn-favorite');
