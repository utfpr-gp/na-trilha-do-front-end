// O que o Trilheiro guarda no navegador (architecture.md, seção 9). Tudo o que lê ou grava
// o localStorage passa por aqui, e só aqui há try/catch.
const FAVORITES_KEY = 'trilheiro:favoritas';
const FILTER_KEY = 'trilheiro:filtro';
const FILTERS = ['todas', 'facil', 'moderada', 'dificil', 'favoritas'];

// Lê a lista de favoritas. Sem nada guardado, com JSON estragado ou com o armazenamento
// bloqueado, volta ao padrão (lista vazia), sem quebrar a página.
export function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // Armazenamento bloqueado ou cheio: as favoritas valem só até fechar a página.
  }
}

export function loadFilter() {
  try {
    const saved = localStorage.getItem(FILTER_KEY);
    return FILTERS.includes(saved) ? saved : 'todas';
  } catch {
    return 'todas';
  }
}

export function saveFilter(filter) {
  try {
    localStorage.setItem(FILTER_KEY, filter);
  } catch {
    // Sem armazenamento, o filtro volta a "Todas" na próxima visita.
  }
}
