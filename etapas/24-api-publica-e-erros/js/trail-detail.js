// Detalhe da trilha: lê o id do endereço (trilha.html?id=3), busca a trilha com os relatos e monta a página.
import { NotFoundError, createReport, getTrail } from './api.js';
import { Trail } from './trail.js';
import { listenFavoriteClicks, updateFavoriteButton } from './trail-card.js';
import { isFavorite } from './favorites.js';
import { formatDate, todayISO } from './format.js';
import { showError, showLoading } from './feedback.js';
import { getForecast } from './weather.js';

const SIZES = '(min-width: 992px) 66vw, 100vw';
const detail = document.querySelector('#trail-detail');
const status = document.querySelector('#trail-status');
const reportList = document.querySelector('#report-list');
const reportForm = document.querySelector('#form-relato');
const reportError = document.querySelector('#relato-erro');

const id = new URLSearchParams(location.search).get('id'); // '3' em trilha.html?id=3

function setField(name, text) {
  document.querySelectorAll(`[data-field="${name}"]`).forEach((el) => {
    el.textContent = text;
  });
}

function createSlide(photo, index) {
  const item = document.createElement('div');
  item.className = index === 0 ? 'carousel-item active' : 'carousel-item';
  const picture = document.createElement('picture');
  const img = document.createElement('img');
  img.width = 480;
  img.height = 360;
  img.className = 'd-block w-100';
  if (photo) {
    const base = `img/trilhas/${photo.arquivo}`;
    const source = document.createElement('source');
    source.type = 'image/webp';
    source.srcset = `${base}-480.webp 480w, ${base}-960.webp 960w`;
    source.sizes = SIZES;
    picture.append(source);
    img.src = `${base}-480.jpg`;
    img.srcset = `${base}-480.jpg 480w, ${base}-960.jpg 960w`;
    img.sizes = SIZES;
    img.alt = photo.alt;
    if (index > 0) img.loading = 'lazy';
  } else {
    img.src = 'img/trilha-sem-foto.svg';
    img.alt = '';
  }
  picture.append(img);
  item.append(picture);
  return item;
}

function fillPhotos(fotos) {
  const carousel = document.querySelector('#fotos');
  const slides = fotos.length > 0 ? fotos.map(createSlide) : [createSlide(null, 0)];
  carousel.querySelector('.carousel-inner').replaceChildren(...slides);
  // Com uma foto só, as setas não têm para onde ir.
  carousel.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach((button) => {
    button.hidden = slides.length < 2;
  });
}

function createReportCard(report) {
  const article = document.createElement('article');
  article.className = 'card mb-3';
  article.innerHTML = `
    <div class="card-body">
      <p class="mb-1"><strong></strong> · <span class="text-body-secondary small"></span></p>
      <p class="mb-0"></p>
    </div>`;
  article.querySelector('strong').textContent = report.nome;
  article.querySelector('span').textContent = `nota ${report.nota} de 5, visitou em ${formatDate(report.dataVisita)}`;
  article.querySelector('p.mb-0').textContent = report.texto;
  return article;
}

function fillReports(reports) {
  if (reports.length === 0) {
    const p = document.createElement('p');
    p.className = 'text-body-secondary';
    p.textContent = 'Ainda não há relatos. Conte como foi a sua visita!';
    reportList.replaceChildren(p);
    return;
  }
  // Os mais recentes primeiro: sort com a data da visita, de trás para a frente.
  const sorted = [...reports].sort((a, b) => b.dataVisita.localeCompare(a.dataVisita));
  reportList.replaceChildren(...sorted.map(createReportCard));
}

function fill(trail) {
  document.title = `${trail.nome} · Trilheiro`;
  setField('nome', trail.nome);
  const badge = document.querySelector('[data-field="dificuldade"]');
  badge.textContent = trail.difficultyLabel();
  badge.classList.add(`badge-${trail.dificuldade}`);
  setField('percurso', trail.routeLabel());
  setField('descricao', trail.descricao);
  setField('distancia', trail.distanceText());
  setField('duracao', trail.durationText());
  setField('local', trail.place());
  setField('ultimaVisita', trail.lastVisitText());
  if (trail.guiaNome) {
    setField('guia', trail.guiaTelefone ? `${trail.guiaNome}, ${trail.guiaTelefone}` : trail.guiaNome);
    document.querySelectorAll('[data-guide]').forEach((el) => {
      el.hidden = false;
    });
  }
  const items = trail.packingList().map((label) => Object.assign(document.createElement('li'), { textContent: label }));
  document.querySelector('#packing-list').replaceChildren(...items);
  const favoriteButton = detail.querySelector('.btn-favorite');
  favoriteButton.dataset.id = trail.id;
  updateFavoriteButton(favoriteButton, isFavorite(trail.id));
  fillPhotos(trail.fotos ?? []);
  fillReports(trail.relatos ?? []);
  detail.hidden = false;
}

// '2026-11-06' → 'sexta-feira'. O T12:00 lê a data ao meio-dia, longe da virada do dia em qualquer fuso.
function dayName(date, index) {
  if (index === 0) return 'Hoje';
  if (index === 1) return 'Amanhã';
  const name = new Date(`${date}T12:00`).toLocaleDateString('pt-BR', { weekday: 'long' });
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function createDayItem(day, index) {
  const li = document.createElement('li');
  li.className = 'weather-day';
  li.innerHTML = `
    <strong></strong>
    <span><i class="bi bi-thermometer-half" aria-hidden="true"></i> <span data-temp></span></span>
    <span><i class="bi bi-cloud-rain" aria-hidden="true"></i> <span data-rain></span></span>`;
  li.querySelector('strong').textContent = dayName(day.date, index);
  li.querySelector('[data-temp]').textContent = `${Math.round(day.max)}° / ${Math.round(day.min)}°`;
  li.querySelector('[data-rain]').textContent = `chuva ${day.rain}%`;
  return li;
}

// A previsão é um extra: se falhar, avisa só nesta caixa, e o resto da página segue (RN07).
async function loadWeather(trail) {
  const weather = document.querySelector('#weather');
  if (trail.latitude == null || trail.longitude == null) {
    weather.textContent = 'Esta trilha não tem coordenadas, então não há previsão.';
    return;
  }
  showLoading(weather, 'Carregando a previsão…');
  try {
    const days = await getForecast(trail.latitude, trail.longitude);
    const list = document.createElement('ul');
    list.className = 'list-unstyled mb-2';
    list.append(...days.map(createDayItem));
    weather.replaceChildren(list);
  } catch (error) {
    console.error(error);
    showError(weather, 'Não foi possível carregar a previsão agora.');
  }
}

async function loadTrail() {
  if (!id) {
    showError(status, 'Nenhuma trilha escolhida. Volte à lista de trilhas e escolha uma.');
    return;
  }
  showLoading(status, 'Carregando a trilha…');
  try {
    const data = await getTrail(id);
    status.replaceChildren();
    const trail = new Trail(data);
    fill(trail);
    loadWeather(trail); // sem await: a página já aparece, e a previsão chega quando chegar
  } catch (error) {
    console.error(error);
    setField('nome', 'Trilha não encontrada');
    const message = error instanceof NotFoundError
      ? 'Esta trilha não existe (ou foi removida). Volte à lista e escolha outra.'
      : 'Não foi possível carregar a trilha agora. Tente de novo em instantes.';
    showError(status, message);
  }
}

listenFavoriteClicks(detail);

// O relato: o formulário do modal, com a validação do próprio Bootstrap (.was-validated).
reportForm.elements.dataVisita.max = todayISO();
reportForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  reportForm.classList.add('was-validated'); // mostra as mensagens dos campos inválidos
  if (!reportForm.checkValidity()) return;

  const data = new FormData(reportForm);
  const submitButton = document.querySelector('button[form="form-relato"]');
  submitButton.disabled = true; // evita dois envios com dois cliques
  reportError.hidden = true;
  try {
    const report = await createReport({
      trilhaId: id,
      nome: data.get('nome').trim(),
      dataVisita: data.get('dataVisita'),
      nota: Number(data.get('nota')),
      texto: data.get('texto').trim(),
    });
    const placeholder = reportList.querySelector('p.text-body-secondary');
    if (placeholder) placeholder.remove();
    reportList.prepend(createReportCard(report)); // o relato novo no topo
    reportForm.reset();
    reportForm.classList.remove('was-validated');
    bootstrap.Modal.getInstance(document.querySelector('#novo-relato')).hide(); // o bootstrap vem do bundle
  } catch (error) {
    console.error(error);
    reportError.textContent = 'Não foi possível publicar o relato agora. Tente de novo em instantes.';
    reportError.hidden = false;
  } finally {
    submitButton.disabled = false;
  }
});

loadTrail();
