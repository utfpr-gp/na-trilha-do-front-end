# Regras para quem mantém o livro

Este arquivo vale para pessoas e para agentes de IA. O projeto completo do livro está em [docs/projeto.md](docs/projeto.md): leia-o antes da primeira mudança. **Onde a construção parou e o que vem a seguir está em [ESTADO.md](ESTADO.md):** leia antes de começar e atualize ao publicar um capítulo.

## O que é este repositório

**Na Trilha do Front-End** é um livro aberto, em português, que ensina a construir um site responsivo com **Bootstrap 5.3, Sass e JavaScript puro**, do protótipo ao site publicado. O site é feito com o que o livro ensina: HTML, Bootstrap, Sass e JavaScript, sem framework de JavaScript, com o Vite gerando uma página HTML por endereço. Ele é publicado em `https://utfpr-gp.github.io/na-trilha-do-front-end/`.

O livro ensina construindo um único app, o **Trilheiro** (trilhas da região de Guarapuava), que cresce a cada capítulo. A versão final dele, com a documentação que serve de modelo de projeto, fica em `trilheiro/`.

O critério principal é a **qualidade do material**.

## Regras de escrita

1. **Público:** quem está na graduação em computação, e qualquer pessoa que já escreveu HTML e CSS básicos e conhece lógica de programação. Essas pessoas já usaram terminal: comandos básicos são revisão rápida, sem infantilizar.
2. **Tom:** fale com "você", em frases curtas, de forma motivadora e técnica ao mesmo tempo.
3. **Toda ideia nova ganha uma analogia do cotidiano** (`<tf-analogy>`), de preferência ligada a trilhas e ao ar livre quando couber sem forçar. No máximo duas ou três por capítulo.
4. **Termos técnicos com o nome oficial** (`col-md-4`, `clamp()`, `addEventListener`), explicados na primeira vez. Termo novo entra em `src/data/glossary.js` e, no texto, vira `<a class="tf-term" href="{{base}}glossario/#ID">termo</a>`.
5. **O site serve a qualquer pessoa.** Não mencione disciplina, aula, turma, ficha, checklist, entrega, prazo, semestre nem vídeo. O `npm run check` reprova essas palavras. O `checklist.md` do Trilheiro é um arquivo do modelo e não é citado no site.
6. **Português do Brasil** no texto. **Nomes no código em inglês**; URLs, ids de seção e dados em português.
7. **Confira toda API na documentação oficial** (Bootstrap 5.3, MDN, Sass), de preferência via Context7. Nunca escreva de memória um nome de classe, função ou mensagem de erro.
8. **Armadilhas mostram mensagens reais**, reproduzidas de verdade e copiadas letra por letra.
9. **O teste do "E se eu tirar?"** aparece em toda prática: o que quebra quando a classe, a regra ou a linha sai.
10. Código em doses pequenas, sempre ligado a um resultado visível. Curiosidades vão para a caixa "Aprofundando".

## Anatomia de um capítulo

Oito visões, sempre nesta ordem e com estes ids (o `npm run check` confere):

| Visão | `kind` / id | Papel |
|---|---|---|
| 🎯 A missão | `missao` | O que o Trilheiro ganha, mostrado antes de qualquer explicação |
| 💡 A ideia | `ideia` | A analogia do cotidiano |
| 🔬 Por dentro | `por-dentro` | O conceito técnico, com um simulador ou recurso visual |
| 🛠️ Mão no código | `mao-no-codigo` | A prática guiada em passos (`<tf-steps>`) |
| ⚠️ Armadilhas | `armadilhas` | Os erros reais, com a mensagem exata e a saída |
| 🏁 Desafio | `desafio` | De 3 a 5 perguntas; acertar todas dá o marco |
| 🧭 Na sua trilha | `na-sua-trilha` | O mesmo conceito no projeto de quem lê, com as quatro perguntas (conceito, motivação, anatomia, "E se eu tirar?") |
| 📚 Para ir além | `para-ir-alem` | Os links da documentação oficial |

## Marcação

O build expande as marcas abaixo (em `build/views.js`), para todo o texto existir no HTML sem JavaScript. O JavaScript (`src/js/components/`) só acrescenta comportamento.

| Marca | Uso |
|---|---|
| `<!-- @include head -->`, `header`, `footer` | Parciais de `src/partials/` |
| `<!-- @render chapter-header NN-slug -->` | Cabeçalho do capítulo: parte, pergunta (`<h1>`), tempo e o marco |
| `<!-- @render pager NN-slug -->` | Links para o capítulo anterior e o próximo, entre os publicados |
| `<tf-view kind="…" title="…">` | Cada uma das oito visões |
| `<tf-analogy emoji="🥾" title="…">` | A caixa da analogia |
| `<tf-code src="NN-slug/nome.ext" caption="arquivo"></tf-code>` | Trecho de `snippets/NN-slug/`, destacado no build pelo Shiki |
| `<tf-steps>` com `<section data-step="Título">` | Passos da prática; viram abas com JavaScript |
| `<tf-pitfall title="…" message="mensagem exata">` | Uma armadilha |
| `<details class="tf-deep-dive"><summary>…</summary>…</details>` | Caixa "Aprofundando" |
| `<tf-challenge slug="NN-slug" award>` | O desafio (veja o `como-ler/` como exemplo) |
| `{{base}}` | O caminho base do site; use em todo link interno |

Nos trechos de código, marque a linha nova com `// [!code highlight]` (ou `<!-- [!code highlight] -->` no HTML); a marca some do código mostrado e do copiado.

No desafio, cada pergunta é um `<fieldset data-correct="valor">` com rádios, e cada alternativa errada tem um `<p data-explain="valor" hidden>` com a explicação.

## Como criar um capítulo

1. Leia a linha do capítulo em `src/data/catalog.js` e os capítulos de que ele depende.
2. Confira na documentação oficial todas as classes, propriedades e funções que o capítulo vai usar.
3. Crie `src/capitulos/NN-slug/index.html` com:
   - no `<head>`, `<!-- @include head -->` e `<meta name="tf-chapter" content="NN-slug">` (o título e a descrição saem do catálogo);
   - `<!-- @include header -->`, um `<main id="conteudo" class="container" data-pagefind-body>` com `<article class="tf-reading">`, `<!-- @render chapter-header NN-slug -->`, as oito visões e `<!-- @render pager NN-slug -->`;
   - `<!-- @include footer -->`.
4. Ponha os trechos de código em `snippets/NN-slug/`.
5. Acrescente os termos novos ao glossário.
6. No catálogo, marque `published: true`.
7. Crie a etapa do Trilheiro em `etapas/NN-slug/`: um projeto estático completo, que abre sozinho.
8. Rode `npm test`, `npm run build` e `npm run check`. Confira no `npm run preview`: modo claro e escuro, 375 px, só com o teclado, com o JavaScript desligado.
9. Abra o Pull Request com o modelo preenchido. **Só o professor faz o merge**; o merge publica o capítulo.

## Regras técnicas

- **Cores só em `src/scss/_palette.scss`.** Os componentes usam os tokens `--tf-*` de `_tokens.scss`. Cor nova entra em `scripts/contrast-pairs.json` e precisa passar no `node scripts/check-contrast.mjs` (AA, 4,5:1) nos dois modos.
- **O Bootstrap é personalizado por Sass** em `_bootstrap.scss`: as variáveis vêm antes do `@import` dele.
- **Animações só dentro de `@media (prefers-reduced-motion: no-preference)`.**
- **Todo controle funciona com o teclado**, e toda mudança de estado do desafio é anunciada em `aria-live="polite"`.
- **Web Storage só por `safeStorage`** (`src/js/storage.js`), que nunca lança exceção.
- **Links internos com `{{base}}`**, porque o site vive em `/na-trilha-do-front-end/` no GitHub Pages.
- **Sem rastreamento, sem serviço externo em tempo de execução, sem chave de API.**
- Commits em português, no formato `tipo: descrição`.

## Mapa do repositório

| Caminho | O que tem |
|---|---|
| `src/` | A raiz do Vite: as páginas (`index.html`, `como-ler/`, `caderneta/`, `glossario/`, `busca/`, `sobre/`, `capitulos/`, `404.html`) |
| `src/partials/` | Cabeçalho, rodapé e `<head>` comuns |
| `src/data/` | O catálogo e o glossário (usados no build e no navegador) |
| `src/scss/` | Paleta, tokens, Bootstrap e os estilos do site |
| `src/js/` | Tema, progresso, busca e os Web Components `tf-*` |
| `build/` | O plugin do Vite: parciais, marcadores, visões, trechos e SEO |
| `snippets/` | Os trechos de código dos capítulos |
| `scripts/` | Pós-build (busca, sitemap, robots) e verificações |
| `tests/` | Testes (Vitest) |
| `trilheiro/` | O app de exemplo como modelo de projeto: README, `checklist.md` e `docs/` |
| `docs/` | O projeto do livro e os planos de construção |

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (a busca só funciona depois do build) |
| `npm test` | Testes |
| `npm run build` | Site em `dist/`, com o índice da busca, `sitemap.xml` e `robots.txt` |
| `npm run preview` | Serve o `dist/` com a mesma base do GitHub Pages |
| `npm run check` | Contraste, conferência de cada página gerada e links internos |
