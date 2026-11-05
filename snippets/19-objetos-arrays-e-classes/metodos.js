// filter: um array novo, só com os itens que passam no teste
const easy = trails.filter((trail) => trail.dificuldade === 'facil');

// map: um array novo, do mesmo tamanho, com cada item transformado
const names = trails.map((trail) => trail.nome);

// find: o primeiro item que passa no teste (ou undefined)
const mirante = trails.find((trail) => trail.id === '3');
