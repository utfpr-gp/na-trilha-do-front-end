# ✅ Checklist do Trilheiro

Cada item tem o link para as linhas do código que o provam. Para gerar um link assim, abra o arquivo no GitHub, clique no número da primeira linha, segure **Shift** e clique na última: o endereço termina em `#L12-L30`.

## RA1: frameworks CSS e layout responsivo

- [x] **ID 01:** protótipo para celular e computador. Prova: [protótipo navegável](https://claude.ai/artifact/Q3NTpoz8Jtq87mgzywVVYP).
- [x] **ID 02:** layout responsivo com o grid do Bootstrap. Prova: [trilhas.html:56](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/trilhas.html#L56) (a linha) e [js/trail-card.js:9](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/trail-card.js#L9) (as colunas de cada cartão).
- [x] **ID 03:** layout responsivo com Flexbox ou Grid no CSS puro. Prova: [scss/_footer.scss:5-37](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_footer.scss#L5-L37) (rodapé em Flexbox) e [scss/_trilha.scss:21-35](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_trilha.scss#L21-L35) (dados da trilha em Grid).
- [x] **ID 04:** componentes prontos e componentes com JavaScript do framework. Prova: [index.html:18-32](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/index.html#L18-L32) (navbar), [trilha.html:55-65](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/trilha.html#L55-L65) (carrossel) e [trilha.html:124-171](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/trilha.html#L124-L171) (modal).
- [x] **ID 05:** unidades relativas no lugar de pixels. Prova: [scss/_functions.scss:9-11](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_functions.scss#L9-L11) (a função `rem()`) e [scss/_trilha.scss:5-18](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_trilha.scss#L5-L18).
- [x] **ID 06:** Design System aplicado no app inteiro. Prova: [scss/_tokens.scss:2-19](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_tokens.scss#L2-L19), [scss/_theme.scss](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_theme.scss) e [design-system.md](docs/design-system.md).
- [x] **ID 07:** Sass com variáveis, mixins e funções. Prova: [scss/_theme.scss](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_theme.scss), [scss/_mixins.scss:3-7](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_mixins.scss#L3-L7) e [scss/_functions.scss:15-19](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_functions.scss#L15-L19).
- [x] **ID 08:** tipografia fluida com `clamp()`. Prova: [scss/_functions.scss:15-19](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_functions.scss#L15-L19) (`fluid()`) e o uso em [scss/_hero.scss:16](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_hero.scss#L16).
- [x] **ID 09:** imagens responsivas com CSS (`object-fit`). Prova: [scss/_mixins.scss:3-7](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_mixins.scss#L3-L7) e [scss/_trilha.scss:49-51](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss/_trilha.scss#L49-L51).
- [x] **ID 10:** imagens otimizadas (WebP, `srcset`, `<picture>`). Prova: [js/trail-card.js:50-67](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/trail-card.js#L50-L67) e [js/trail-card.js:71-76](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/trail-card.js#L71-L76) (a primeira foto com prioridade).

## RA2: formulários

- [x] **ID 11:** validação HTML nativa, com mensagens. Prova: [cadastrar.html:41-156](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/cadastrar.html#L41-L156) e [js/trail-form.js:75-85](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/trail-form.js#L75-L85) (`setCustomValidity`).
- [x] **ID 12:** expressões regulares. Prova: [cadastrar.html:103](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/cadastrar.html#L103) (`pattern`), [js/trail-form.js:59](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/trail-form.js#L59) e [js/trail-form.js:138-141](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/trail-form.js#L138-L141).
- [x] **ID 13:** checkbox, radio e select. Prova: [cadastrar.html:52-57](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/cadastrar.html#L52-L57) (select), [cadastrar.html:62-75](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/cadastrar.html#L62-L75) (radio) e [cadastrar.html:126-131](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/cadastrar.html#L126-L131) (checkbox).
- [x] **ID 14:** Web Storage. Prova: [js/storage.js](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/storage.js) (favoritas e último filtro).

## RA3: ferramentas

- [x] **ID 15:** Node.js e npm. Prova: [package.json](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/package.json).
- [x] **ID 16:** Git e `.gitignore`. Prova: [.gitignore](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/.gitignore).
- [x] **ID 17:** README padronizado. Prova: [README.md](README.md).
- [x] **ID 18:** arquivos organizados em módulos. Prova: as pastas [scss/](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/scss) e [js/](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js), com `import` e `export`.
- [x] **ID 19:** linter e formatador. Prova: [.prettierrc.json](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/.prettierrc.json) e [eslint.config.mjs](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/eslint.config.mjs).

## RA4: bibliotecas JavaScript

- [x] **ID 20:** jQuery no DOM e em animações. Prova: [js/trails.js:45-56](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/trails.js#L45-L56) (o filtro animado).
- [x] **ID 21:** plugin jQuery. Prova: [js/trail-form.js:22-23](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/trail-form.js#L22-L23) (jQuery Mask Plugin no CEP e no telefone).

## RA5: requisições assíncronas

- [x] **ID 22:** API fake para gravar dados de um formulário. Prova: [js/api.js:58-60](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/api.js#L58-L60) e [js/api.js:62-64](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/api.js#L62-L64).
- [x] **ID 23:** API fake para mostrar dados na página. Prova: [js/api.js:42-46](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/api.js#L42-L46) e [js/api.js:50-56](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/api.js#L50-L56).
- [x] **ID 24:** API pública real, com tratamento de erro. Prova: [js/weather.js](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/weather.js) (Open-Meteo) e [js/address.js](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/js/address.js) (ViaCEP).

