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

