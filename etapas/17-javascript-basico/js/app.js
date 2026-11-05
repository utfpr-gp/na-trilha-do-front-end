// O JavaScript do Trilheiro. Por enquanto, só funções e mensagens no console (F12 → Console).

const SITE_NAME = 'Trilheiro';

// 150 → "2h30", 45 → "45 min", 240 → "4h"
function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours}h`;
  return `${hours}h${String(rest).padStart(2, '0')}`;
}

// Minutos por quilômetro, com uma casa decimal: pace(4.5, 150) → "33.3"
function pace(distanceKm, minutes) {
  return (minutes / distanceKm).toFixed(1);
}

// Uma função de seta: o mesmo que function greeting(hour) { ... }
const greeting = (hour) => {
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

function trailSummary(name, distanceKm, minutes) {
  return `${name}: ${distanceKm} km, ${formatDuration(minutes)}, ritmo de ${pace(distanceKm, minutes)} min/km`;
}

console.log(`${greeting(new Date().getHours())}! Bem-vindo ao ${SITE_NAME}.`);
console.log(trailSummary('Trilha do Salto', 4.5, 150));
console.log(trailSummary('Caminho das Araucárias', 2, 45));
console.log(trailSummary('Mirante da Serra', 8, 240));

// Daqui a 3 segundos, uma dica (uma vez só).
setTimeout(() => {
  console.log('Dica: confira a previsão do tempo antes de sair.');
}, 3000);
