/** '2026-11-04' → '04/11/2026' */
export function formatDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}
