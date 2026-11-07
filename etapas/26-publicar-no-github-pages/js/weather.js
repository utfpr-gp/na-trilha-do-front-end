// A previsão do tempo, pela Open-Meteo (architecture.md, seção 7.1): gratuita, sem chave, com CORS liberado.
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const TIMEOUT_MS = 8000; // passou disso, desiste: um serviço lento não pode prender a página (RN07)

// Devolve os próximos 3 dias: [{ date: '2026-11-05', max: 27.2, min: 16.8, rain: 100 }, …]
export async function getForecast(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'America/Sao_Paulo',
    forecast_days: 3,
  });
  const response = await fetch(`${FORECAST_URL}?${params}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`A Open-Meteo respondeu ${response.status}`);
  const { daily } = await response.json();
  // Os dias vêm em listas paralelas: o dia i é time[i], temperature_2m_max[i], e assim por diante.
  return daily.time.map((date, i) => ({
    date,
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    rain: daily.precipitation_probability_max[i],
  }));
}
