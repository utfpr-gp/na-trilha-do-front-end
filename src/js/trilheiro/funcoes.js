// As mesmas funções da etapa 17 do Trilheiro, usadas pelo simulador do capítulo.
export function formatarDuracao(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (horas === 0) return `${resto} min`;
  if (resto === 0) return `${horas}h`;
  return `${horas}h${String(resto).padStart(2, '0')}`;
}

export function ritmo(distanciaKm, minutos) {
  return (minutos / distanciaKm).toFixed(1);
}

export function saudacao(hora) {
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}
