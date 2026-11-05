# Etapa 06: os design tokens

A identidade visual do Trilheiro sai do protótipo e vira código:

- [`docs/design-system.md`](docs/design-system.md): cores, tipografia, diretrizes e os componentes do Bootstrap no protótipo.
- `css/style.css`: as cores e as fontes como **variáveis CSS** (design tokens) no `:root`, usadas pelas regras com `var(--nome)`.
- `index.html`: as fontes Bitter e Source Sans 3 pelo Google Fonts.

O botão "Ver trilha" continua azul: as cores dos componentes do Bootstrap mudam no capítulo 13, com Sass.
