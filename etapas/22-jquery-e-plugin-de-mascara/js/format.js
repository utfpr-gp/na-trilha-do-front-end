// Funções de formatação, usadas em mais de uma página. "export" deixa outros arquivos importarem.

// 150 → "2h30", 45 → "45 min", 240 → "4h"
export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours}h`;
  return `${hours}h${String(rest).padStart(2, '0')}`;
}

// 4.5 → "4,5" e 2 → "2,0": com vírgula e sempre uma casa decimal
export function formatDistance(km) {
  return km.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
