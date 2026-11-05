const form = document.querySelector('#form-relato');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // não recarrega a página: agora quem cuida dos dados é o JavaScript
  const name = form.querySelector('#nome').value;
  console.log(`Relato de ${name}`);
});
