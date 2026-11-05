# ✅ Checklist do Trilheiro

Cada item marcado tem o link para as linhas do código que o provam. Para gerar o link, abra o arquivo no GitHub, clique no número da primeira linha, segure **Shift** e clique na última: o endereço termina em `#L12-L30`.

Enquanto o item não está pronto, ele fica desmarcado e com o arquivo onde a prova vai estar.

## RA1: frameworks CSS e layout responsivo

- [ ] **ID 01:** protótipo para celular e computador. Prova: [protótipo navegável](https://claude.ai/artifact/Q3NTpoz8Jtq87mgzywVVYP).
- [ ] **ID 02:** layout responsivo com o grid do Bootstrap. Prova: `trilhas.html` (`.row` e `.col-sm-6 .col-lg-4` da lista).
- [ ] **ID 03:** layout responsivo com Flexbox ou Grid no CSS puro. Prova: `scss/_footer.scss` (rodapé em Flexbox).
- [ ] **ID 04:** componentes prontos e componentes com JavaScript do framework. Prova: `index.html` (navbar e cards) e `trilha.html` (carrossel e modal).
- [ ] **ID 05:** unidades relativas no lugar de pixels. Prova: `scss/_trail-card.scss`.
- [ ] **ID 06:** Design System aplicado no app inteiro. Prova: `scss/_theme.scss` e [design-system.md](docs/design-system.md).
- [ ] **ID 07:** Sass com variáveis, mixins e funções. Prova: `scss/_theme.scss`, `scss/_mixins.scss` e `scss/_functions.scss`.
- [ ] **ID 08:** tipografia fluida com `clamp()`. Prova: `scss/_functions.scss` (`fluid()`) e o uso nos títulos.
- [ ] **ID 09:** imagens responsivas com CSS (`object-fit`). Prova: `scss/_mixins.scss` (`cover-image()`).
- [ ] **ID 10:** imagens otimizadas (WebP, `srcset`, `<picture>`). Prova: `js/trail-card.js` e `trilha.html`.

## RA2: formulários

- [ ] **ID 11:** validação HTML nativa, com mensagens. Prova: `cadastrar.html`.
- [ ] **ID 12:** expressões regulares. Prova: `js/trail-form.js` (CEP e telefone).
- [ ] **ID 13:** checkbox, radio e select. Prova: `cadastrar.html` (o que levar, tipo de percurso, dificuldade).
- [ ] **ID 14:** Web Storage. Prova: `js/storage.js` (favoritas e último filtro).

## RA3: ferramentas

- [ ] **ID 15:** Node.js e npm. Prova: `package.json`.
- [ ] **ID 16:** Git e `.gitignore`. Prova: `.gitignore`.
- [ ] **ID 17:** README padronizado. Prova: [README.md](README.md).
- [ ] **ID 18:** arquivos organizados em módulos. Prova: as pastas `scss/` e `js/`.
- [ ] **ID 19:** linter e formatador. Prova: `.prettierrc` e `eslint.config.js`.

## RA4: bibliotecas JavaScript

- [ ] **ID 20:** jQuery no DOM e em animações. Prova: `js/trails.js` (filtro animado).
- [ ] **ID 21:** plugin jQuery. Prova: `js/trail-form.js` (jQuery Mask Plugin no CEP e no telefone).

## RA5: requisições assíncronas

- [ ] **ID 22:** API fake para gravar dados de um formulário. Prova: `js/api.js` (`createTrail`, `createReport`).
- [ ] **ID 23:** API fake para mostrar dados na página. Prova: `js/api.js` (`getTrails`, `getTrail`).
- [ ] **ID 24:** API pública real, com tratamento de erro. Prova: `js/weather.js` (Open-Meteo) e `js/address.js` (ViaCEP).
