# Extra: o Trilheiro com Vite

O Trilheiro da etapa 26, agora montado pelo Vite 8. Nada muda na tela; muda como o projeto é construído.

```bash
npm install
npm run api      # json-server em http://localhost:3000, a partir de public/db.json
npm run dev      # o servidor do Vite, em http://localhost:5173 (no lugar do Live Server)
npm run build    # o site pronto, em dist/
npm run preview  # serve o dist/, para conferir antes de publicar
```

- `vite.config.mjs`: as quatro páginas como entradas, `base: './'` (caminhos relativos para o GitHub Pages) e os avisos do Sass do Bootstrap silenciados.
- O HTML aponta direto para `scss/main.scss`: o Vite compila o Sass, e o `css/main.css` deixou de existir.
- `js/vendor.js`: o JavaScript do Bootstrap e os Bootstrap Icons vêm do npm (`import`), e não mais do CDN. O jQuery e o plugin de máscara também (`js/trail-form.js`), e o `Modal` é importado no detalhe.
- `public/`: o que o Vite copia sem mexer: as fotos (montadas pelo JavaScript com o nome do arquivo), o ícone da aba e o `db.json`.
- O ESLint deixou de precisar dos globais `$` e `bootstrap`.
- Para publicar, é a pasta `dist/` que vai para o ar (por exemplo, com o pacote `gh-pages`).
