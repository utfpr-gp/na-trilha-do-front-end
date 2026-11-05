// As trilhas, como objetos num array. Os nomes dos campos são os mesmos do db.json do capítulo 23:
// quando o json-server chegar, só muda de onde o array vem.
export const TRAILS = [
  {
    id: '1',
    nome: 'Trilha do Salto',
    cidade: 'Prudentópolis',
    uf: 'PR',
    distanciaKm: 4.5,
    dificuldade: 'moderada',
    duracaoMin: 150,
    destaque: true,
    fotos: [{ arquivo: 'salto', alt: "Queda-d'água entre morros" }],
  },
  // ... as outras trilhas, do mesmo jeito
];
