// RN05: a data não pode estar no futuro. O máximo do campo é hoje, no fuso de quem está usando.
function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}
form.elements.ultimaVisita.max = todayISO();
