async function loadNames() {
  const response = await fetch('http://localhost:3000/trilhas'); // 1. espera a resposta (o cabeçalho)
  const data = await response.json();                             // 2. espera o corpo e lê o JSON
  console.log(data.map((trail) => trail.nome));
}

loadNames();
console.log('Esta linha aparece ANTES dos nomes.');
