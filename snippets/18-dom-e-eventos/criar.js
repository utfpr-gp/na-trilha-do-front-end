const item = document.createElement('li');  // cria o elemento, ainda fora da página
item.textContent = 'Leve água de sobra.';
document.querySelector('#dicas').append(item); // agora ele aparece, no fim da lista
