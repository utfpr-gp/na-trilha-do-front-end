localStorage.setItem('trilheiro:favoritas', ['1', '3']);
localStorage.getItem('trilheiro:favoritas'); // '1,3': o array virou texto do jeito errado

localStorage.setItem('trilha', { nome: 'Salto' });
localStorage.getItem('trilha');              // '[object Object]': os dados se perderam
