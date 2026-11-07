  // Três "Ver trilha" iguais não dizem nada a quem navega pela lista de links. O nome acessível
  // começa com o texto que aparece na tela e acrescenta a trilha (WCAG 2.5.3).
  col.querySelector('a').setAttribute('aria-label', `Ver trilha: ${trail.nome}`);
  const button = col.querySelector('.btn-favorite');
  setFavoriteLabel(button, trail.nome);
