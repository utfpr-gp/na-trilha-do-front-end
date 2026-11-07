# Extra: o que o Lighthouse achou

Para rodar, dois terminais:

```bash
npm install
npm run api      # json-server em http://localhost:3000, a partir do db.json
```

e o Live Server para as páginas.

O Trilheiro da etapa 26, com as correções que o Lighthouse 13 apontou (modo Mobile, site servido como no GitHub Pages):

| Página | Desempenho antes → depois | CLS antes → depois | SEO |
|---|---|---|---|
| Início | 69 → 86 | 0,31 → 0 | 91 → 100 |
| Trilha | 69 → 88 | 0,31 → 0,02 | 91 → 100 |
| Cadastro | 81–87 → 89–92 | até 0,11 → até 0,02 | 90 → 100 |

- `scss/_layout.scss` + classe `site-main` no `<main>`: o conteúdo ocupa pelo menos a altura da tela, e o rodapé não pula quando as trilhas chegam.
- `scss/_trilha.scss`: `height: auto` nas fotos do carrossel, que estavam achatadas no celular.
- `js/trail-card.js` (`prioritizeFirstImage`), `js/home.js`, `js/trails.js` e `js/trail-detail.js`: a primeira foto de cada página sem `lazy` e com `fetchPriority = 'high'`.
- `cadastrar.html` + `js/trail-form.js`: o aviso de "só leitura" já vem no HTML, e o modo local o remove.
- `<meta name="description">` nas quatro páginas; o Sass gera o CSS comprimido (`--style=compressed`).
