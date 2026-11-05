// As mesmas funções da etapa 17 do Trilheiro, usadas pelo simulador do capítulo.
export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours}h`;
  return `${hours}h${String(rest).padStart(2, '0')}`;
}

export function pace(distanceKm, minutes) {
  return (minutes / distanceKm).toFixed(1);
}

export function greeting(hour) {
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}
