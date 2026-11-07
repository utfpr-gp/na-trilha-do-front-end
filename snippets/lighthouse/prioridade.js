// A primeira foto da lista é, quase sempre, a maior coisa na tela quando a página abre (o LCP).
// Ela não pode esperar o "lazy": carrega já, e com prioridade.
export function prioritizeFirstImage(container) {
  const img = container.querySelector('img');
  if (!img) return;
  img.loading = 'eager';
  img.fetchPriority = 'high';
}
