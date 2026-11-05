# Etapa 14: o CSS organizado com Sass

O `css/style.css` deixa de existir: o estilo próprio do Trilheiro vira parciais Sass em `scss/`, compilados junto com o Bootstrap no `css/main.css`.

- `_tokens.scss`: as cores, as fontes e o raio do design system como variáveis, e o **mapa** `$dificuldades`.
- `_theme.scss`: as variáveis do Bootstrap, alimentadas pelos tokens (antes do Bootstrap).
- `_functions.scss`: a **função** `espaco($n)`, que devolve `$n * 0.5rem`.
- `_mixins.scss`: o **mixin** `cover-image($largura, $altura)`, usado nas fotos dos cartões.
- `_navbar.scss`, `_hero.scss`, `_cards.scss`, `_trilha.scss`, `_footer.scss`: uma parte da página por arquivo, com **aninhamento**.
- Os selos de dificuldade (`.badge-facil`, `.badge-moderada`, `.badge-dificil`) são gerados por um `@each` sobre o mapa.

Para rodar: `npm install`, `npm run sass` e abra o `index.html` com o Live Server.
