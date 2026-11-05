// Um objeto junta os dados de uma coisa só, cada um com um nome (a chave)
const trail = {
  nome: 'Trilha do Salto',
  distanciaKm: 4.5,
  dificuldade: 'moderada',
  fotos: [{ arquivo: 'salto', alt: "Queda-d'água entre morros" }], // um valor pode ser um array de objetos
};

trail.nome;              // 'Trilha do Salto'
trail.distanciaKm = 5;   // muda um campo
trail.fotos[0].arquivo;  // 'salto'
trail['dificuldade'];    // 'moderada': o mesmo que trail.dificuldade
