// A conversa com os dados. As páginas só pegam e gravam dados por estas funções
// (architecture.md, seção 6), e este arquivo escolhe de onde eles vêm:
// - no seu computador (localhost ou 127.0.0.1), do json-server;
// - no site publicado, que não tem servidor, do arquivo db.json, só para leitura.
const API_URL = 'http://localhost:3000';
const LOCAL = ['localhost', '127.0.0.1'].includes(location.hostname);

export const READ_ONLY_MESSAGE =
  'No site publicado, o Trilheiro só mostra as trilhas. Para cadastrar, rode o projeto no seu computador.';

// Um erro com nome próprio, para a página saber que a trilha não existe (e não que a rede caiu).
export class NotFoundError extends Error {}

// Dá para gravar? Só no modo local, com o json-server.
export function canWrite() {
  return LOCAL;
}

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options); // espera a resposta chegar
  if (response.status === 404) throw new NotFoundError(`Não encontrado: ${path}`);
  if (!response.ok) throw new Error(`O servidor respondeu ${response.status} em ${path}`);
  return response.json(); // espera o corpo chegar e o transforma de JSON em objeto
}

// O modo publicado: lê o db.json inteiro, do mesmo endereço do site.
async function readDatabase() {
  const response = await fetch('db.json');
  if (!response.ok) throw new Error(`Não foi possível ler o db.json (${response.status})`);
  return response.json();
}

function post(path, data) {
  if (!LOCAL) return Promise.reject(new Error(READ_ONLY_MESSAGE));
  return request(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // "o corpo é JSON"
    body: JSON.stringify(data),
  });
}

export async function getTrails() {
  if (LOCAL) return request('/trilhas');
  const database = await readDatabase();
  return database.trilhas;
}

// A trilha com os relatos dela dentro, num campo "relatos". No modo local, o _embed do json-server
// faz isso; no publicado, o próprio JavaScript junta as duas listas.
export async function getTrail(id) {
  if (LOCAL) return request(`/trilhas/${encodeURIComponent(id)}?_embed=relatos`);
  const database = await readDatabase();
  const trail = database.trilhas.find((item) => item.id === id);
  if (!trail) throw new NotFoundError(`Não encontrado: trilha ${id}`);
  return { ...trail, relatos: database.relatos.filter((report) => report.trilhaId === id) };
}

export function createTrail(trail) {
  return post('/trilhas', trail);
}

export function createReport(report) {
  return post('/relatos', report);
}
