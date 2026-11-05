function currentFilter() {
  return trailFilter.querySelector('input:checked').value;
}

// Liga ou desliga o favorito de um botão (o ícone, o aria-pressed e o texto para leitores de tela).
function toggleFavorite(button) {
  const favorite = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(favorite));
  button.setAttribute('aria-label', favorite ? 'Remover das favoritas' : 'Favoritar');
  const icon = button.querySelector('i');
  icon.classList.toggle('bi-heart', !favorite);
  icon.classList.toggle('bi-heart-fill', favorite);
}

