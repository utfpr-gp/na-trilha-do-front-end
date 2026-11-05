const favorites = ['1', '3'];

const text = JSON.stringify(favorites); // '["1","3"]': o array virou texto
localStorage.setItem('trilheiro:favoritas', text);

const back = JSON.parse(localStorage.getItem('trilheiro:favoritas')); // ['1', '3']: texto de volta para array
back.includes('3'); // true
