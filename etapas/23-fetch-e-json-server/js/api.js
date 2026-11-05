// A conversa com o json-server. As páginas só pegam e gravam dados por estas funções
// (architecture.md, seção 6): se o servidor mudar, muda só este arquivo.
const API_URL = 'http://localhost:3000';

// Um erro com nome próprio, para a página saber que a trilha não existe (e não que a rede caiu).
export class NotFoundError extends Error {}

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options); // espera a resposta chegar
  if (response.status === 404) throw new NotFoundError(`Não encontrado: ${path}`);
  if (!response.ok) throw new Error(`O servidor respondeu ${response.status} em ${path}`);
  return response.json(); // espera o corpo chegar e o transforma de JSON em objeto
}

function post(path, data) {
  return request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // "o corpo é JSON"
    body: JSON.stringify(data),
  });
}

export function getTrails() {
  return request('/trilhas');
}

// A trilha com os relatos dela dentro, num campo "relatos" (o _embed do json-server).
export function getTrail(id) {
  return request(`/trilhas/${encodeURIComponent(id)}?_embed=relatos`);
}

export function createTrail(trail) {
  return post('/trilhas', trail);
}

export function createReport(report) {
  return post('/relatos', report);
}
