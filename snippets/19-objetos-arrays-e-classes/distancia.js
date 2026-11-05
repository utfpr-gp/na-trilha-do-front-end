// 4.5 → "4,5" e 2 → "2,0": com vírgula e sempre uma casa decimal
export function formatDistance(km) {
  return km.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
