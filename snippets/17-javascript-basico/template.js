function resumoDaTrilha(nome, distanciaKm, minutos) {
  return `${nome}: ${distanciaKm} km, ${formatarDuracao(minutos)}, ritmo de ${ritmo(distanciaKm, minutos)} min/km`;
}
