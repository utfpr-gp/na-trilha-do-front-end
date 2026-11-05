const button = document.querySelector('.btn-favorite');

// "Quando clicarem neste botão, rode esta função"
button.addEventListener('click', (event) => {
  console.log(event.type);   // 'click'
  console.log(event.target); // o elemento que recebeu o clique
});
