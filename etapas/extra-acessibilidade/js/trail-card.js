import { toggleFavorite } from './favorites.js';

const SIZES = '(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw';

// Monta o cartão de uma trilha. O HTML fixo vem do template string; os dados entram por textContent
// e pelas propriedades, nunca colados no HTML (capítulo 18: nada de innerHTML com dados).
export function createTrailCard(trail, favorite) {
  const col = document.createElement('div');
  col.className = 'col-12 col-sm-6 col-lg-4';
  col.innerHTML = `
    <article class="card h-100">
      <picture>
        <source type="image/webp">
        <img width="480" height="360" loading="lazy" class="card-img-top">
      </picture>
      <div class="card-body">
        <span class="badge"></span>
        <h3 class="card-title h5 my-2"></h3>
        <p class="card-text small text-body-secondary">
          <i class="bi bi-geo-alt" aria-hidden="true"></i> <span data-field="place"></span> ·
          <i class="bi bi-signpost-2" aria-hidden="true"></i> <span data-field="distance"></span> ·
          <i class="bi bi-clock" aria-hidden="true"></i> <span data-field="duration"></span>
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <a class="btn btn-primary">Ver trilha</a>
          <button type="button" class="btn btn-outline-secondary btn-favorite"><i aria-hidden="true"></i></button>
        </div>
      </div>
    </article>`;

  fillPhoto(col, trail.fotos[0]);
  const badge = col.querySelector('.badge');
  badge.textContent = trail.difficultyLabel();
  badge.classList.add(`badge-${trail.dificuldade}`);
  col.querySelector('.card-title').textContent = trail.nome;
  col.querySelector('[data-field="place"]').textContent = trail.place();
  col.querySelector('[data-field="distance"]').textContent = trail.distanceText();
  col.querySelector('[data-field="duration"]').textContent = trail.durationText();
  col.querySelector('a').href = `trilha.html?id=${trail.id}`;
  // Três "Ver trilha" iguais não dizem nada a quem navega pela lista de links. O nome acessível
  // começa com o texto que aparece na tela e acrescenta a trilha (WCAG 2.5.3).
  col.querySelector('a').setAttribute('aria-label', `Ver trilha: ${trail.nome}`);
  const button = col.querySelector('.btn-favorite');
  setFavoriteLabel(button, trail.nome);
  button.dataset.id = trail.id;
  updateFavoriteButton(button, favorite);
  return col;
}

function fillPhoto(col, photo) {
  const source = col.querySelector('source');
  const img = col.querySelector('img');
  if (!photo) {
    // Trilha sem foto: a imagem padrão, sem as versões em WebP.
    source.remove();
    img.src = 'img/trilha-sem-foto.svg';
    img.alt = '';
    return;
  }
  const base = `img/trilhas/${photo.arquivo}`;
  source.srcset = `${base}-480.webp 480w, ${base}-960.webp 960w`;
  source.sizes = SIZES;
  img.src = `${base}-480.jpg`;
  img.srcset = `${base}-480.jpg 480w, ${base}-960.jpg 960w`;
  img.sizes = SIZES;
  img.alt = photo.alt;
}

// O nome do botão é fixo e diz de qual trilha ele é. Ligado ou desligado, quem informa é o aria-pressed
// (o leitor de tela diz "Favoritar Trilha do Salto, botão de alternância, pressionado").
export function setFavoriteLabel(button, trailName) {
  button.setAttribute('aria-label', `Favoritar ${trailName}`);
}

export function updateFavoriteButton(button, favorite) {
  button.setAttribute('aria-pressed', String(favorite));
  button.querySelector('i').className = favorite ? 'bi bi-heart-fill' : 'bi bi-heart';
}

// Delegação (capítulo 18): um ouvinte na lista cuida de todos os botões de favorito.
// onToggle é uma função opcional, chamada depois de cada troca.
export function listenFavoriteClicks(container, onToggle) {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('.btn-favorite');
    if (!button) return;
    const favorite = toggleFavorite(button.dataset.id);
    updateFavoriteButton(button, favorite);
    if (onToggle) onToggle();
  });
}
