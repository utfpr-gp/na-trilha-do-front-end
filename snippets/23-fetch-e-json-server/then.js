fetch('http://localhost:3000/trilhas')
  .then((response) => response.json()) // quando a resposta chegar, leia o JSON
  .then((data) => console.log(data))   // quando o JSON estiver pronto, use
  .catch((error) => console.error(error)); // se algo falhar no caminho
