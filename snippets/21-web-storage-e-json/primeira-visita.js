const favorites = JSON.parse(localStorage.getItem('trilheiro:favoritas')); // na primeira visita: null
favorites.includes('1'); // erro: null não tem includes
