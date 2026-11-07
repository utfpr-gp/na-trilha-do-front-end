# Extra: acessibilidade na prática

Para rodar, dois terminais:

```bash
npm install
npm run api      # json-server em http://localhost:3000, a partir do db.json
```

e o Live Server para as páginas.

O Trilheiro da etapa 26, revisado com o axe-core 4.14, o teclado e a árvore de acessibilidade do Chrome. O Lighthouse dava 100; a revisão achou oito problemas, todos corrigidos:

- **Pular para o conteúdo** (WCAG 2.4.1): o primeiro link de cada página, visível só com o foco (`.visually-hidden-focusable`, estilo em `scss/_acessibilidade.scss`); o `<main>` tem `id="conteudo"` e `tabindex="-1"`.
- **O banner do Início dentro do `<main>`** (o único achado do axe: conteúdo fora das regiões).
- **Links e botões com contexto** (2.4.4 e 2.5.3): `aria-label` "Ver trilha: Trilha do Salto" e "Favoritar Trilha do Salto" em `js/trail-card.js`.
- **Favorito com nome fixo** e o estado só no `aria-pressed` (`setFavoriteLabel`, também no detalhe).
- **Asterisco com `aria-hidden`** nos rótulos dos campos obrigatórios (o `required` já é anunciado).
- **Previsão falada por completo**: "máxima de 27°, mínima de 18°" para o leitor de tela.
- **Reflow em 320 px** (1.4.10): `row g-4 g-lg-5` no detalhe, que rolava 12 px para o lado.
