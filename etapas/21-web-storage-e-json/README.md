# Etapa 21: o Trilheiro lembra

- `js/storage.js`: o único arquivo que mexe no `localStorage`. Guarda as favoritas (`trilheiro:favoritas`, uma lista de ids em JSON) e o último filtro (`trilheiro:filtro`), como na seção 9 do `architecture.md`. Toda leitura fica num `try/catch`, com um valor padrão (lista vazia, `todas`).
- `js/favorites.js`: começa com as favoritas guardadas e grava a cada troca (RN06).
- `js/trails.js`: volta ao filtro da última visita e grava o filtro a cada mudança.
- Para testar do zero: DevTools → Application → Local storage, ou uma janela anônima.
