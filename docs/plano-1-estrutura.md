# Na Trilha do Front-End — plano 1: a estrutura do site

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar no GitHub Pages o site *Na Trilha do Front-End*, com as páginas, o catálogo dos 25 capítulos ("em breve"), a caderneta de marcos, o desafio, o glossário, a busca, o SEO, a verificação automática e uma página "Como ler este livro", que mostra todas as visões funcionando.

**Architecture:**
- **O site:** HTML estático, uma página por endereço (Vite em modo MPA, com raiz em `src/`). Todo o texto sai pronto no HTML do build, sem depender de JavaScript para aparecer.
- **Sem framework de JavaScript:** um plugin próprio do Vite (`build/livro-plugin.js`) resolve no build as partes repetidas: os parciais (cabeçalho, lateral, rodapé), o caminho base, os blocos gerados a partir dos dados (catálogo, cabeçalho do capítulo, mapa da caderneta, glossário) e o destaque dos trechos de código (Shiki).
- **No navegador:** Web Components com prefixo `tf-` só acrescentam comportamento (abas, conferir o desafio, copiar código). O progresso fica no Web Storage.
- **Depois do build:** o Pagefind gera o índice da busca, um script gera o `sitemap.xml` e o `robots.txt`, e outros scripts verificam a saída.

**Tech Stack:**
- **Site:** Vite 8, Bootstrap 5.3 (Sass e JS), Sass 1.x (`sass`), `@fontsource-variable/nunito-sans` e `@fontsource-variable/jetbrains-mono`.
- **Build e verificação:** Shiki 4 com `@shikijs/transformers`, Pagefind 1.x, linkinator, Vitest com jsdom. Node 24.
- **Publicação:** GitHub Actions e GitHub Pages.

**Spec:** [docs/projeto.md](projeto.md), seções 3, 4, 5.1, 8, 9, 10 e 13. Do *Volta ao Mundo em Angular* (`~/dev/volta-ao-mundo-em-angular`) vêm o formato, as regras do `AGENTS.md` e as ideias dos scripts de verificação, e não o código.

**Escopo deste plano:** só a estrutura do site. Os documentos do Trilheiro (`prd.md`, `architecture.md`, `design-system.md`) e o protótipo têm um plano próprio, independente deste, e podem ser feitos antes ou em paralelo. As etapas (`etapas/NN-slug/`) chegam com o primeiro capítulo que tiver uma. Cada capítulo terá um plano curto, seguindo o "Como criar um capítulo" do `AGENTS.md` (Task 10).

## Global Constraints

- **Repositório e endereço:**
  - `utfpr-gp/na-trilha-do-front-end`, clonado em `/home/ronifabio/dev/na-trilha-do-front-end`;
  - site em `https://utfpr-gp.github.io/na-trilha-do-front-end/`, com `base: '/na-trilha-do-front-end/'` no Vite.
- **Versões:** Node 24; Vite `^8.3`, Bootstrap `^5.3.8`, Sass `^1.107`, Shiki `^4.6`, Pagefind `^1.6`, Vitest `^5.1`. Nada de framework de JavaScript nem de Tailwind.
- **Nomes:**
  - código (arquivos JS, funções, classes CSS próprias, variáveis) em inglês;
  - texto, URLs, ids de seção e chaves de conteúdo em português;
  - prefixo dos custom elements e das variáveis CSS próprias: `tf-` / `--tf-`.
- **Proibido em qualquer texto do site:** "vídeo", "disciplina", "aula", "turma", "ficha", "checklist", "entrega", "prazo", "semestre". "UTFPR" só no rodapé, na página Sobre e no JSON-LD.
- **Rodapé de todas as páginas:** "Na Trilha do Front-End · Prof. Roni Fabio Banaszewski · Tecnologia em Sistemas para Internet · UTFPR Guarapuava", mais "Texto CC BY 4.0 · Código MIT".
- **Cores:** nenhuma cor solta nos parciais próprios, só tokens com nome de papel; contraste AA (4,5:1) em todo texto, nos modos claro e escuro.
- **Fontes:** Nunito Sans (texto) e JetBrains Mono (código), servidas pelo próprio site.
- **Acessibilidade:**
  - todo controle funciona com teclado;
  - toda mudança de estado do desafio é anunciada numa região `aria-live="polite"`;
  - toda animação fica dentro de `@media (prefers-reduced-motion: no-preference)`.
- **Ids das visões**, em ordem e iguais em todo capítulo: `missao`, `ideia`, `por-dentro`, `mao-no-codigo`, `armadilhas`, `desafio`, `na-sua-trilha`, `para-ir-alem`.
- **Sem rastreamento**, sem serviço externo em tempo de execução, sem chave de API.
- **Commits:** em português, no formato `tipo: descrição`, terminando com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Navegador sem armazenamento.** Com o `localStorage` bloqueado (o acesso lança exceção), cheio ou corrompido, o site abre, a caderneta começa vazia e nada quebra. Importar um arquivo inválido mostra o erro e mantém o progresso atual. Testes na Task 6.
2. **Caminho base.** Os links dos parciais funcionam em qualquer profundidade (`/`, `/caderneta/`, `/capitulos/01-…/`) tanto no `npm run dev` quanto no build com a base `/na-trilha-do-front-end/`. A 404 do GitHub Pages abre com estilo num endereço aninhado inexistente. Testes nas Tasks 1 e 8; o linkinator confere na Task 9.
3. **Sem JavaScript.** Com o JavaScript desligado, um capítulo mostra todo o texto, os passos de `<tf-steps>` aparecem em sequência, e as explicações do desafio continuam escondidas. Teste na Task 5; conferência manual na Task 10.
4. **Desafio pela metade.** Conferir com uma pergunta em branco marca essa pergunta como "Escolha uma alternativa" e não dá o marco. Acertar tudo dá o marco uma vez só, e a data registrada é a do primeiro acerto. Testes na Task 6.
5. **Tema antes da pintura.** Recarregar no modo escuro não pisca o claro: um script em linha no `<head>` aplica o `data-bs-theme` antes do CSS. A escolha "seguir o sistema" acompanha a troca do sistema sem recarregar. Testes na Task 2.

---

## Estrutura de arquivos

```
na-trilha-do-front-end/
├── package.json  vite.config.js  vitest.config.js
├── AGENTS.md  CLAUDE.md  README.md  ESTADO.md  LICENSE  LICENSE-CONTEUDO.md
├── .github/workflows/publicar.yml   .github/pull_request_template.md
├── build/                          roda só no build (Node)
│   ├── livro-plugin.js             o plugin do Vite: junta as funções abaixo
│   ├── html.js                     parciais, base e marcadores
│   ├── render.js                   blocos gerados a partir dos dados
│   └── highlight.js                <tf-code> → HTML destacado pelo Shiki
├── scripts/
│   ├── post-build.mjs              Pagefind, sitemap.xml, robots.txt
│   ├── check-contrast.mjs          + contrast-pairs.json
│   ├── check-output.mjs            palavras proibidas e estrutura de cada página
│   └── check-links.mjs             linkinator na saída
├── snippets/NN-slug/<nome>.<ext>   trechos de código dos capítulos
├── tests/                          Vitest (build/, scripts/ e src/js/)
└── src/                            raiz do Vite
    ├── partials/head.html  header.html  sidebar.html  footer.html
    ├── data/catalog.js  glossary.js        dados puros, usados no build e no navegador
    ├── scss/_palette.scss  _tokens.scss  _bootstrap.scss  _site.scss  _views.scss  main.scss
    ├── js/main.js  storage.js  progress.js  theme.js
    ├── js/components/tf-code.js  tf-steps.js  tf-challenge.js  tf-view.js  tf-mark.js  tf-trail-map.js
    ├── public/favicon.svg  og.png
    ├── index.html                  início: a trilha e o catálogo
    ├── caderneta/index.html  glossario/index.html  busca/index.html  sobre/index.html
    ├── como-ler/index.html         anatomia do capítulo, com todas as visões
    ├── capitulos/NN-slug/index.html   (só os publicados; nenhum neste plano)
    └── 404.html
```

**Por que assim:** o `build/` é Node puro e testável sem navegador; o `src/data/` não toca no DOM, então serve aos dois lados (o catálogo gera o HTML no build e alimenta a caderneta no navegador); cada componente é um arquivo.

---

### Task 1: Projeto Vite em várias páginas, parciais e caminho base

**Files:**
- Create: `package.json`, `vite.config.js`, `vitest.config.js`, `build/html.js`, `build/livro-plugin.js`, `src/partials/*.html`, `src/index.html`, `src/sobre/index.html`, `tests/build/html.test.js`, `.gitignore` (`node_modules/`, `dist/`)

**Interfaces:**
- Produces:
  - `expandIncludes(html: string, readPartial: (name) => string): string`: troca `<!-- @include NOME -->` pelo conteúdo de `src/partials/NOME.html`, recursivamente; parcial inexistente lança `Error('Parcial não encontrado: NOME')`.
  - `replaceBase(html: string, base: string): string`: troca toda ocorrência de `{{base}}` pela base (`/` no dev, `/na-trilha-do-front-end/` no build).
  - `renderMarkers(html: string, renderers: Record<string, (arg?: string) => string>): string`: troca `<!-- @render NOME ARG? -->` pelo retorno do renderer; nome sem renderer lança erro.
  - `livroPlugin(): Plugin`, que aplica, em `transformIndexHtml`, nesta ordem: includes → marcadores → `highlightSnippets` (Task 4) → base.
  - `vite.config.js`: `root: 'src'`, `build.outDir: '../dist'`, `emptyOutDir: true`, `rollupOptions.input` = todos os `src/**/index.html` mais `src/404.html` (com `fs.globSync`).
- Scripts do `package.json`: `dev`, `build` (`vite build && node scripts/post-build.mjs`), `preview`, `test` (`vitest run`), `check`.

- [ ] **Step 1: Testes de `html.js`**: `expandIncludes` com parcial aninhado; com parcial inexistente (lança, com o nome na mensagem); `replaceBase` em `href="{{base}}caderneta/"` com as duas bases; `renderMarkers` com argumento (`<!-- @render chapter-header 01-por-que-um-framework -->` chama o renderer com `'01-por-que-um-framework'`).
- [ ] **Step 2:** `npx vitest run tests/build/html.test.js`, que deve falhar (módulo inexistente).
- [ ] **Step 3:** Implementar `build/html.js`, o plugin e o `vite.config.js`. Os parciais: `head.html` (charset, viewport, `<link rel="icon">`, o script do tema da Task 2 e o `main.scss`/`main.js` pelo caminho `/scss/main.scss` e `/js/main.js`, que o Vite resolve), `header.html` (nome do livro, links Início, Caderneta, Glossário, Busca, botão de tema), `sidebar.html` (vazio por enquanto) e `footer.html` (o rodapé das Global Constraints). Todo link interno nos parciais é `{{base}}…/`.
- [ ] **Step 4:** Os testes passam, e `npm run build` gera `dist/index.html` e `dist/sobre/index.html` com os links começando em `/na-trilha-do-front-end/`.
- [ ] **Step 5:** Commit `feat: site em Vite com várias páginas, parciais e caminho base`.

### Task 2: Paleta, Bootstrap por Sass, fontes e tema claro/escuro

**Files:**
- Create: `src/scss/_palette.scss`, `_tokens.scss`, `_bootstrap.scss`, `_site.scss`, `main.scss`, `src/js/theme.js`, `scripts/check-contrast.mjs`, `scripts/contrast-pairs.json`, `tests/scripts/check-contrast.test.js`, `tests/js/theme.test.js`
- Modify: `src/partials/head.html` (script em linha), `src/partials/header.html` (botão de tema)

**Interfaces:**
- Produces:
  - `_palette.scss`: uma variável Sass por cor, `$tf-<nome>-light` e `$tf-<nome>-dark`, só hexadecimal de 6 dígitos. É o único lugar com cor escrita.
  - `_tokens.scss`: variáveis CSS com nome de papel (`--tf-bg`, `--tf-surface`, `--tf-ink`, `--tf-ink-muted`, `--tf-brand`, `--tf-accent`, `--tf-mark`, `--tf-link` e uma por visão: `--tf-view-missao` … `--tf-view-para-ir-alem`) em `:root, [data-bs-theme=light]` e `[data-bs-theme=dark]`.
  - `_bootstrap.scss`: as variáveis do Bootstrap (`$primary: $tf-verde-mata-light`, `$body-bg`, `$font-family-sans-serif`, `$font-family-monospace` …) **antes** do `@import "bootstrap/scss/bootstrap"`.
  - `theme.js`: `getThemeChoice(): 'light'|'dark'|'system'`, `setThemeChoice(choice): void`, `resolveTheme(choice, prefersDark: boolean): 'light'|'dark'`, `initThemeToggle(button: HTMLElement): void`. A chave no storage é `trilha:tema`.
  - `check-contrast.mjs`: `parsePalette(scss: string): Record<string,string>`, `contrastRatio(hex1, hex2): number`, `checkPairs(palette, pairs): {pair, ratio, ok}[]`; a CLI sai com código 1 se algum par ficar abaixo de 4,5.

**Valores iniciais** (seção 9 do projeto; o checkpoint da Task 5 pode ajustá-los, e o verificador garante o AA):

| Papel | Claro | Escuro |
|---|---|---|
| fundo (papel) | `#FAF7F0` | `#121815` |
| superfície | `#FFFFFF` | `#1B231E` |
| tinta | `#1F2A24` | `#E8EDE9` |
| verde-mata (marca) | `#2F5D3A` | `#7FBF8E` |
| terra (destaque) | `#8B5A2B` | `#D9A066` |
| amarelo de marcação (marco; fundo com texto em tinta) | `#F2C230` | `#F2C230` |
| azul-céu (links) | `#1F5F99` | `#8AB8E6` |

- [ ] **Step 1: Testes do contraste**: `contrastRatio('#000000','#FFFFFF')` ≈ 21; `parsePalette` lê `$tf-verde-mata-light: #2F5D3A;` e ignora comentários; um par abaixo de 4,5 sai com `ok: false`.
- [ ] **Step 2: Testes do tema**: `resolveTheme('system', true) === 'dark'`; `getThemeChoice()` devolve `'system'` quando o storage lança exceção; `setThemeChoice('dark')` põe `data-bs-theme="dark"` no `<html>`; com a escolha `'system'`, um evento `change` do `matchMedia('(prefers-color-scheme: dark)')` troca o atributo sem recarregar.
- [ ] **Step 3:** Os testes falham.
- [ ] **Step 4:** Implementar. O Bootstrap 5.3 ainda é escrito com `@import`: conferir a personalização por Sass na documentação do Bootstrap 5.3, e no `vite.config.js` usar `css.preprocessorOptions.scss` com `quietDeps: true` e `silenceDeprecations: ['import']`, para os avisos do Bootstrap não esconderem os do site. O script em linha do `head.html` repete a lógica de `resolveTheme` em poucas linhas, com `try/catch`, e roda antes do `<link>` do CSS. As fontes entram pelo `main.scss` (`@import "@fontsource-variable/nunito-sans"`), sem CDN.
- [ ] **Step 5:** Os testes passam, e `node scripts/check-contrast.mjs` aprova todos os pares de `contrast-pairs.json` (tinta, tinta suave, marca, destaque, link e cada visão sobre fundo e superfície; tinta sobre o amarelo), nos dois modos.
- [ ] **Step 6:** Commit `feat: paleta da trilha, Bootstrap por Sass e tema claro e escuro`.

### Task 3: Catálogo e página inicial

**Files:**
- Create: `src/data/catalog.js`, `build/render.js`, `tests/data/catalog.test.js`, `tests/build/render.test.js`
- Modify: `src/index.html`, `build/livro-plugin.js` (registrar os renderers)

**Interfaces:**
- Produces:
  - `catalog.js`:
    - `PARTS: Part[]`, com `Part = { id, title, chapters: Chapter[], hasMarks: boolean }`;
    - `Chapter = { number, slug, question, minutes, published, partId }`;
    - as seis partes da seção 5 do projeto (`ponto-de-partida`, `o-mapa-da-trilha`, `primeiros-quilometros`, `a-subida`, `a-travessia`, `o-cume`) com os 25 capítulos e as perguntas copiadas da tabela, mais `para-ir-alem` (4 itens, `hasMarks: false`, sem número);
    - `allChapters(): Chapter[]` (os 25 numerados), `chapterBySlug(slug): Chapter|undefined`, `neighbors(slug): { prev?: Chapter, next?: Chapter }` (só entre publicados), `chapterUrl(chapter, base): string` → `${base}capitulos/${slug}/`.
  - `render.js`: `renderCatalog(parts, base): string`. Cada parte é uma seção com título e uma lista de cartões. O capítulo publicado é um link; o não publicado é um cartão com o selo "em breve" e sem link.
- Slugs: `NN-` + palavras da pergunta, sem acento, por exemplo `01-por-que-um-framework`, `13-personalizar-o-bootstrap-com-sass`, `25-publicar-no-github-pages`.

- [ ] **Step 1: Testes do catálogo**: 25 capítulos numerados de 1 a 25, sem buraco; slugs únicos que começam com o número de dois dígitos; 6 partes com marcos e 1 sem; `neighbors` pula os não publicados; `chapterUrl` com as duas bases.
- [ ] **Step 2: Teste do render**: com nenhum publicado, `renderCatalog` não tem nenhum `href` de capítulo e tem 25 selos "em breve"; com um publicado, tem exatamente um link, para `chapterUrl`.
- [ ] **Step 3:** Os testes falham.
- [ ] **Step 4:** Implementar. `src/index.html`: a apresentação do livro (o que ensina, para quem, o Trilheiro em duas frases) e `<!-- @render catalog -->`.
- [ ] **Step 5:** Os testes passam; `npm run build` mostra as 6 partes e os 25 capítulos "em breve".
- [ ] **Step 6:** Commit `feat: catálogo dos 25 capítulos e página inicial`.

### Task 4: Trechos de código destacados no build

**Files:**
- Create: `build/highlight.js`, `src/js/components/tf-code.js`, `tests/build/highlight.test.js`, `tests/js/tf-code.test.js`, `snippets/00-exemplo/card.html` (usado pelos testes e pela página da Task 5)
- Modify: `build/livro-plugin.js`

**Interfaces:**
- Produces:
  - `highlightSnippets(html: string, { snippetsDir }): Promise<string>`: troca o conteúdo de cada `<tf-code src="NN-slug/nome.ext" caption="…"></tf-code>` pelo HTML do Shiki (`codeToHtml`, temas `github-light` e `github-dark` com `defaultColor: false`, linguagem pela extensão). O `<tf-code>` continua no HTML, com a legenda num `<figcaption>`. Arquivo inexistente lança erro com o caminho.
  - Marcação de linha nova com `[!code highlight]` (`transformerNotationHighlight`); a marca some do código mostrado.
  - `<tf-code>` no navegador: acrescenta o botão "Copiar" (`navigator.clipboard.writeText` com o texto do `<pre>`) e anuncia "Copiado!" numa região `aria-live`.
- O tema do Shiki segue o `data-bs-theme` por CSS (`[data-bs-theme=dark] .shiki span { color: var(--shiki-dark) }`).

- [ ] **Step 1: Testes**: o trecho de exemplo vira `<pre class="shiki …">`; a linha marcada ganha a classe `highlighted` e o texto `[!code highlight]` não aparece; `src` inexistente lança; o botão copia o texto sem a marca (clipboard simulado no jsdom).
- [ ] **Step 2:** Os testes falham.
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** Os testes passam.
- [ ] **Step 5:** Commit `feat: trechos de código destacados no build, com botão de copiar`.

### Task 5: As visões do capítulo e a página "Como ler este livro"

**Files:**
- Create: `src/scss/_views.scss`, `src/js/components/tf-view.js`, `tf-steps.js`, `src/como-ler/index.html`, `tests/js/tf-steps.test.js`, `tests/js/tf-view.test.js`
- Modify: `build/render.js` (`renderChapterHeader`, `renderPager`), `src/js/main.js`

**Interfaces:**
- Consumes: `chapterBySlug`, `neighbors`, `chapterUrl` (Task 3).
- Produces (a marcação que todo capítulo usa, e que o `AGENTS.md` da Task 10 documenta):
  - `<tf-view kind="missao" title="A missão">…</tf-view>`: uma `<section id="missao">` com `<h2>`, emoji e cor da visão. O id vem de `kind`, e os oito `kind` são os ids das Global Constraints. O JS só acrescenta o botão "copiar link desta seção".
  - `<tf-analogy emoji="🥾" title="…">`, `<tf-pitfall title="…" message="mensagem exata">`: só CSS, sem JS.
  - `<tf-steps>` com filhos `<section data-step="Título">`: sem JS, os passos aparecem em sequência, com o título como `<h3>`; com JS, viram abas com `role="tablist"`, setas do teclado e `aria-selected`.
  - Caixa "Aprofundando": `<details class="tf-deep-dive"><summary>…</summary>…</details>`, HTML puro.
  - `renderChapterHeader(slug, base): string`: parte, número, pergunta como `<h1>`, tempo estimado, e o espaço do marco (`<tf-mark slug="…">`, que a Task 6 preenche).
  - `renderPager(slug, base): string`: links "anterior" e "próximo" entre capítulos publicados.
- A página `como-ler/` explica a anatomia do capítulo usando as próprias visões. Ela traz uma de cada (`missao` … `para-ir-alem`), um `<tf-code src="00-exemplo/card.html">`, um `<tf-steps>` de três passos, uma armadilha e uma caixa "Aprofundando". O desafio dela entra na Task 6.

- [ ] **Step 1: Testes**: `<tf-steps>` sem `customElements.define` deixa as três seções visíveis; depois de definido, só a primeira fica visível, e a seta para a direita leva o foco e a seleção à segunda; `<tf-view kind="armadilhas">` gera `id="armadilhas"`; `renderChapterHeader` tem um único `<h1>` com a pergunta.
- [ ] **Step 2:** Os testes falham.
- [ ] **Step 3:** Implementar.
- [ ] **Step 4:** Os testes passam.
- [ ] **Step 5: Checkpoint do professor.** Rodar `npm run dev` e capturar o início e o `como-ler/` em 375 px e 1280 px, nos dois modos (com `--blink-settings=preferredColorScheme=1` para o claro no Chrome headless). Publicar as capturas como Artifact e pedir a aprovação da identidade visual. Ajustes de cor ficam só em `_palette.scss`, e o `check-contrast` deve continuar passando. **Não seguir para a Task 6 sem o sim.**
- [ ] **Step 6:** Commit `feat: visões do capítulo e página Como ler este livro`.

### Task 6: Progresso, desafio e caderneta de marcos

**Files:**
- Create: `src/js/storage.js`, `src/js/progress.js`, `src/js/components/tf-challenge.js`, `tf-trail-map.js`, `tf-mark.js` (mostra "marco conquistado em DD/MM/AAAA" ou o espaço vazio, e escuta `tf-mark-earned`), `src/caderneta/index.html`, `tests/js/storage.test.js`, `tests/js/progress.test.js`, `tests/js/tf-challenge.test.js`
- Modify: `build/render.js` (`renderTrailMap`), `src/como-ler/index.html` (um desafio de exemplo, sem marco)

**Interfaces:**
- Consumes: `PARTS`, `allChapters` (Task 3).
- Produces:
  - `safeStorage.get(key): string|null` e `safeStorage.set(key, value): boolean`, que nunca lançam exceção.
  - `progress.js`, chave `trilha:progresso`, formato `{ version: 1, marks: { [slug]: { date: 'AAAA-MM-DD' } } }`:
    - `loadProgress(): Progress`: vazio quando a chave falta, o JSON é inválido ou a versão é outra;
    - `earnMark(slug, date = new Date()): boolean`: `true` só no primeiro acerto, que fica com a data;
    - `hasMark(slug): boolean`;
    - `partStatus(parts, progress): { id, done, total, viewpoint: boolean }[]`: o mirante é `done === total` numa parte com marcos;
    - `reachedSummit(parts, progress): boolean`: os 25 marcos;
    - `exportProgress(): string` (JSON) e `importProgress(text): { ok: true } | { ok: false, error: string }`, que valida antes de gravar; slug desconhecido é ignorado.
  - `<tf-challenge slug="…" award>`, com a marcação dentro do HTML:
    ```html
    <fieldset data-correct="b"><legend>Pergunta</legend>
      <label><input type="radio" name="q1" value="a"> …</label> …
      <p data-explain="a" hidden>Por que não é esta.</p> …
    </fieldset>
    <button type="button" data-check>Conferir</button>
    <p data-status aria-live="polite"></p>
    ```
    Ao conferir: cada pergunta mostra "Certo!" ou a explicação da alternativa escolhida; uma pergunta em branco mostra "Escolha uma alternativa"; tudo certo e com `award` presente chama `earnMark` e anuncia "Marco conquistado!". O evento `tf-mark-earned` (`detail: { slug }`) atualiza o `<tf-mark>` do cabeçalho.
  - `renderTrailMap(parts): string`: o mapa da trilha em HTML (uma parada por capítulo, um mirante por parte e o cume). `<tf-trail-map>` marca as paradas conquistadas a partir de `loadProgress()` e liga os botões "Exportar" (baixa `na-trilha-progresso.json`) e "Importar" (`<input type="file">`).
- [ ] **Step 1: Testes de `storage` e `progress`**: o storage que lança em `getItem` e `setItem` não quebra nada; JSON corrompido → progresso vazio; `earnMark` duas vezes mantém a primeira data; `partStatus` com a parte "Ponto de partida" completa dá `viewpoint: true`; importar `'{'` dá `ok: false` e mantém o progresso; importar um export volta ao mesmo estado.
- [ ] **Step 2: Testes do desafio**: com uma pergunta em branco, aparece "Escolha uma alternativa" e não há marco; errada, mostra o `data-explain` da escolhida; tudo certo dá o marco, anuncia e dispara `tf-mark-earned`; sem `award`, não grava nada.
- [ ] **Step 3:** Os testes falham.
- [ ] **Step 4:** Implementar. Sem o JS, o `data-explain` continua `hidden`, e o botão "Conferir" fica com `hidden` até o componente ser definido.
- [ ] **Step 5:** Os testes passam; no navegador, o desafio do `como-ler/` funciona só com o teclado.
- [ ] **Step 6:** Commit `feat: desafio, marcos e caderneta da trilha`.

### Task 7: Glossário

**Files:**
- Create: `src/data/glossary.js`, `src/glossario/index.html`, `tests/build/glossary.test.js`
- Modify: `build/render.js` (`renderGlossary`), `build/livro-plugin.js`, `src/scss/_views.scss`

**Interfaces:**
- Produces:
  - `GLOSSARY: { id, term, definition, chapter?: number }[]`, começando com os termos da página `como-ler/` (framework CSS, design token, breakpoint, componente).
  - `renderGlossary(entries, base): string`: ordem alfabética em português (`localeCompare(…, 'pt-BR')`), cada termo com `id`, e o link para o capítulo quando ele estiver publicado.
  - Um termo citado num capítulo vira `<a class="tf-term" href="{{base}}glossario/#ID">termo</a>`. É HTML puro, sem componente.
- [ ] **Step 1: Teste**: a ordem alfabética respeita acentos ("ância" depois de "an"); ids únicos; o link de capítulo só aparece quando o capítulo está publicado.
- [ ] **Step 2:** O teste falha. **Step 3:** Implementar. **Step 4:** O teste passa.
- [ ] **Step 5:** Commit `feat: glossário`.

### Task 8: Busca, 404, SEO e pós-build

**Files:**
- Create: `scripts/post-build.mjs`, `src/busca/index.html`, `src/404.html`, `tests/scripts/post-build.test.js`
- Modify: `src/partials/head.html` (SEO), `build/livro-plugin.js`

**Interfaces:**
- Produces:
  - Cada página declara `<meta name="tf-title">` e `<meta name="tf-description">`. O plugin gera `<title>Pergunta · Na Trilha do Front-End</title>`, a `description`, o `canonical`, o Open Graph (`og.png`) e, só no início, o JSON-LD `Book` (autor e `UTFPR`).
  - `post-build.mjs`: `buildSitemap(pages: string[], siteUrl): string` e `buildRobots(siteUrl): string`; a CLI roda `npx pagefind --site dist` e grava `dist/sitemap.xml` e `dist/robots.txt`.
  - `404.html` com os links escritos com a base absoluta (`{{base}}` já é absoluta), para funcionar em qualquer endereço aninhado.
  - `busca/`: a interface padrão do Pagefind (`/pagefind/pagefind-ui.js`) e `?q=` já preenchido. Quando o índice não existe (no `npm run dev`), aparece o aviso "A busca funciona no site publicado ou no `npm run preview`".
  - Partes fora da busca: cabeçalho, lateral e rodapé com `data-pagefind-ignore`; o corpo do capítulo com `data-pagefind-body`.
- [ ] **Step 1: Testes**: o sitemap lista as páginas com a URL completa e sem o `404.html`; o robots aponta para o sitemap.
- [ ] **Step 2:** Os testes falham. **Step 3:** Implementar. **Step 4:** Os testes passam.
- [ ] **Step 5:** `npm run build && npm run preview`: buscar "token" encontra o `como-ler/`; `/na-trilha-do-front-end/nao/existe/` mostra a 404 com estilo.
- [ ] **Step 6:** Commit `feat: busca, 404, SEO e sitemap`.

### Task 9: Verificações da saída

**Files:**
- Create: `scripts/check-output.mjs`, `scripts/check-links.mjs`, `tests/scripts/check-output.test.js`
- Modify: `package.json` (`check`: contraste → saída → links)

**Interfaces:**
- Produces: `checkPage(html: string, path: string): string[]`, que devolve a lista de problemas:
  - palavra proibida (Global Constraints, sem diferenciar maiúsculas, por palavra inteira, ignorando o conteúdo de `<pre>`);
  - "UTFPR" fora do rodapé, de `sobre/` e do JSON-LD;
  - nenhum ou mais de um `<h1>`, ou `<title>`/`description` vazios;
  - em `capitulos/*`, as oito visões ausentes ou fora de ordem;
  - `<img>` sem `alt`;
  - `{{base}}` ou `<!-- @` que sobraram sem processar.
- `check-links.mjs`: linkinator sobre o `dist/` servido com a base, só links internos.
- [ ] **Step 1: Testes**: uma página com "disciplina" no texto reprova; a mesma palavra dentro de `<pre>` passa; um capítulo sem `na-sua-trilha` reprova; um `{{base}}` sobrando reprova.
- [ ] **Step 2:** Os testes falham. **Step 3:** Implementar. **Step 4:** Os testes passam, e `npm run build && npm run check` passa inteiro.
- [ ] **Step 5:** Commit `feat: verificações de contraste, conteúdo e links`.

### Task 10: Publicação e regras para quem mantém o livro

**Files:**
- Create: `.github/workflows/publicar.yml`, `.github/pull_request_template.md`, `AGENTS.md`, `CLAUDE.md`
- Modify: `README.md`, `ESTADO.md`

**Interfaces:**
- `publicar.yml`: em push na `main` e em `pull_request`: `npm ci`, `npm test`, `npm run build`, `npm run check`; só na `main`, `actions/upload-pages-artifact` (`dist/`) e `actions/deploy-pages`.
- `AGENTS.md`, adaptado do *Volta ao Mundo*:
  - regras de escrita: público, tom, analogia, termos, palavras proibidas, português, mensagens reais;
  - a anatomia de 8 visões, com a tabela `kind`/id;
  - a marcação de cada componente (Tasks 4 a 7);
  - "Como criar um capítulo": a linha do catálogo, a página `src/capitulos/NN-slug/index.html` com `<meta name="tf-chapter">`, `<!-- @render chapter-header … -->` e `<!-- @render pager … -->`, os trechos em `snippets/NN-slug/`, o glossário, `published: true`, a etapa em `etapas/NN-slug/`, `npm test`/`build`/`check`, a conferência em 375 px, nos dois modos, só com o teclado e sem JS, e o PR que só o professor aprova;
  - regras técnicas: tokens só em `_palette.scss`, nada de cor solta, `safeStorage`, `{{base}}` nos links e conferência no Bootstrap 5.3, na MDN e no Sass;
  - a regra da seção 6.1: o site não cita o `checklist.md` do Trilheiro.
- `CLAUDE.md`: uma linha que manda ler o `AGENTS.md` e o `ESTADO.md`.
- `README.md`: a vitrine (o que é, o link do site, como rodar, as licenças), com links para o `AGENTS.md` e o `docs/`.
- [ ] **Step 1:** Escrever os arquivos.
- [ ] **Step 2:** Abrir um PR com o plano inteiro; a Action passa em `pull_request`.
- [ ] **Step 3:** Conferência manual no `npm run preview`, registrada no PR: 375 px; modos claro e escuro; só teclado (menu, tema, abas, desafio, exportar e importar); JavaScript desligado no `como-ler/`; `localStorage` bloqueado (perfil com cookies bloqueados).
- [ ] **Step 4:** Depois do merge pelo professor, conferir o site publicado: início, `como-ler/`, caderneta, busca e uma 404 aninhada.
- [ ] **Step 5:** Atualizar o `ESTADO.md` (a estrutura publicada, e o próximo passo: o capítulo 1) e fazer o commit `docs: estrutura publicada`.
