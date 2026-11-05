function trailSummary(name, distanceKm, minutes) {
  return `${name}: ${distanceKm} km, ${formatDuration(minutes)}, ritmo de ${pace(distanceKm, minutes)} min/km`;
}
