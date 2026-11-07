// Avisos que ocupam o lugar de uma lista enquanto os dados não chegam, ou quando não chegam.

export function showLoading(container, text) {
  const p = document.createElement('p');
  p.className = 'text-body-secondary';
  p.setAttribute('role', 'status');
  p.textContent = text;
  container.replaceChildren(p);
}

export function showError(container, text) {
  const div = document.createElement('div');
  div.className = 'alert alert-warning';
  div.setAttribute('role', 'alert');
  div.textContent = text;
  container.replaceChildren(div);
}
