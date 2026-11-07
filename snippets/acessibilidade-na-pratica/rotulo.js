// O nome do botão é fixo e diz de qual trilha ele é. Ligado ou desligado, quem informa é o aria-pressed
// (o leitor de tela diz "Favoritar Trilha do Salto, botão de alternância, pressionado").
export function setFavoriteLabel(button, trailName) {
  button.setAttribute('aria-label', `Favoritar ${trailName}`);
}
