# Etapa 13: o Bootstrap com o tema do Trilheiro

O Bootstrap deixa de vir pronto da `node_modules/` e passa a ser **compilado com as cores e as fontes do Trilheiro**:

- `scss/main.scss`: as variáveis do tema (`$primary`, `$secondary`, `$body-bg`, as fontes…) **antes** do `@import` do Bootstrap.
- `css/main.css`: o CSS gerado pelo Sass (vai para o repositório). Os botões, os links e todos os componentes saem com o verde-mata e a terra.
- `package.json`: os scripts `npm run sass` (compila uma vez) e `npm run sass:watch` (recompila a cada alteração).

Para rodar: `npm install`, `npm run sass` e abra o `index.html` com o Live Server.
