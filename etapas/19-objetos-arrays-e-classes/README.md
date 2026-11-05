# Etapa 19: os dados saem do HTML

- As trilhas viram um array de objetos em `js/data.js`, com os campos do `architecture.md` (`nome`, `distanciaKm`, `dificuldade`…). Uma quarta trilha, a Escadaria do Salto, sem destaque e sem foto.
- `js/trail.js`: a classe `Trail`, com `difficultyLabel()`, `place()`, `distanceText()` (com vírgula, por `toLocaleString('pt-BR')`) e `durationText()`.
- `js/trail-card.js`: monta o cartão de uma trilha (dados por `textContent` e propriedades) e cuida dos cliques no favorito por delegação.
- `js/favorites.js`: as favoritas como uma lista de ids, ainda só na memória.
- `js/home.js` (Início, só os destaques) e `js/trails.js` (Trilhas, com o filtro sobre o array), carregados com `<script type="module">`. Precisa do Live Server: módulos não abrem por `file://`.
- `img/trilha-sem-foto.svg`: a imagem padrão.
- O `js/app.js` do capítulo 17 saiu; o `formatDuration` foi para `js/format.js`.
