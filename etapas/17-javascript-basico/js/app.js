// O JavaScript do Trilheiro. Por enquanto, só funções e mensagens no console (F12 → Console).

const NOME_DO_SITE = 'Trilheiro';

// 150 → "2h30", 45 → "45 min", 240 → "4h"
function formatarDuracao(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (horas === 0) return `${resto} min`;
  if (resto === 0) return `${horas}h`;
  return `${horas}h${String(resto).padStart(2, '0')}`;
}

// Minutos por quilômetro, com uma casa decimal: ritmo(4.5, 150) → "33.3"
function ritmo(distanciaKm, minutos) {
  return (minutos / distanciaKm).toFixed(1);
}

// Uma função de seta: o mesmo que function saudacao(hora) { ... }
const saudacao = (hora) => {
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
};

function resumoDaTrilha(nome, distanciaKm, minutos) {
  return `${nome}: ${distanciaKm} km, ${formatarDuracao(minutos)}, ritmo de ${ritmo(distanciaKm, minutos)} min/km`;
}

console.log(`${saudacao(new Date().getHours())}! Bem-vindo ao ${NOME_DO_SITE}.`);
console.log(resumoDaTrilha('Trilha do Salto', 4.5, 150));
console.log(resumoDaTrilha('Caminho das Araucárias', 2, 45));
console.log(resumoDaTrilha('Mirante da Serra', 8, 240));

// Daqui a 3 segundos, uma dica (uma vez só).
setTimeout(() => {
  console.log('Dica: confira a previsão do tempo antes de sair.');
}, 3000);
