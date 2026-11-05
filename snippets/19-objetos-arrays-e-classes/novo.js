const trail = new Trail({ id: '1', nome: 'Trilha do Salto', cidade: 'Prudentópolis', uf: 'PR',
  distanciaKm: 4.5, dificuldade: 'moderada', duracaoMin: 150, destaque: true, fotos: [] });

trail.nome;              // 'Trilha do Salto': um campo
trail.difficultyLabel(); // 'Moderada': um método
trail.distanceText();    // '4,5 km'
trail.durationText();    // '2h30'
