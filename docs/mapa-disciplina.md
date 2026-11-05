# Mapa: a disciplina e o livro

Levantamento feito em 05/11/2026 no Moodle (curso 26711, *Desenvolvimento de Páginas Web com Framework e CSS*) e nos enunciados das atividades no Notion (`chestnut-garage-91b.notion.site`). Serve para escrever cada capítulo partindo do que a disciplina já ensina, e para manter os dois alinhados.

Este arquivo é de quem mantém o livro. O site não cita disciplina, atividades nem entregas.

## Capítulo a capítulo

| Capítulo | Módulo e atividades da disciplina | O que aproveitar |
|---|---|---|
| 1. Por que um framework | Mód. 03 (Atividade 05, escolha do framework e da API); Mód. 05 (Atividade 07) | Critérios de escolha da Atividade 05; a Atividade 07 já mostra que o `.btn-primary` não lê `--bs-primary` |
| 2. Ambiente | Mód. 00 (Atividade 01, VS Code e extensões); Mód. 04 (Atividade 06, Node, npm e Git) | **Ver "Divergências"**: autenticação com PAT, clonar primeiro, `.gitignore` antes do `npm install`, commits semânticos, computador compartilhado |
| 3. HTML e CSS para relembrar | Atividade 07, passo 6 ("a ordem importa") | Coerente com o capítulo |
| 4. PRD curto | Mód. 01 (Atividade 03, tema, `docs/prd.md` e `docs/architecture.md`) | Os itens que a Atividade 03 pede em cada documento |
| 5. Prototipar com IA | Mód. 02 (Atividade 04, Stitch e Figma); Atividade 08 (Antigravity e MCP, opcional); Atividade 01 (versão Antigravity) | O fluxo da Atividade 04 (Stitch em modo Web, mobile → desktop, *Instant Prototype*); a auditoria da Atividade 08 |
| 6. Design tokens | Mód. 02 (leituras de Design System; glossário da Atividade 04) | "DNA e livro de regras" da Atividade 04 |
| 7. Grid do Bootstrap | Atividade 07 (passo 2: `.col`, `.col-12`, `.col-md-*`, `offset`, `order`, `d-none d-md-block`) | Os breakpoints e a tabela de prefixos |
| 8. Utilitários | Atividade 07 (passos 7 e 8); Atividade 08 (rodapé no fim da tela: `min-vh-100`, `flex-grow-1`, `mt-auto`) | O rodapé grudado no fim é um ótimo exercício |
| 9. Componentes prontos | Atividade 07 (card, botão); Atividade 08 (auditoria de 10 componentes) | A auditoria vira "Na sua trilha" |
| 10. Componentes com JS | Atividade 07 (modal); Atividade 08 (offcanvas) | |
| 11. Flexbox e Grid no CSS puro | Seções antigas e ocultas "07 · Layout Responsivo - Flexbox" e "08 · Layout Responsivo - Grid" | Material a reaproveitar |
| 12. Unidades relativas | Mód. 08 (extensão cssrem) | |
| 13. Personalizar o Bootstrap com Sass | Mód. 07 (Atividade 10) | Já previsto no projeto; texto testado com compilação real |
| 14. Organizar o CSS com Sass | Atividade 10, opções 1 a 3 | |
| 15. Tipografia fluida | Mód. 08 (Atividade 11); ferramentas Gridlover, TypeScale, Fluid Type Scale Calculator | |
| 16. Imagens responsivas | Mód. 09 (Atividade 12); Cloudinary, Squoosh, TinyPNG | **O ID 10 do checklist cita o Cloudinary**: o capítulo deve mostrá-lo como alternativa |
| 17. JavaScript básico (novo) | Mód. 10 (Atividades 13 e 14: jogo de adivinhação, calculadora) | Variáveis, funções, template strings, `prompt`/`alert`, temporizadores |
| 18. DOM e eventos | Mód. 10 (Atividades 13 e 14); Mód. 11 (Atividade 15) | |
| 19. Objetos, arrays e classes | Mód. 11 (Atividade 15; projeto João Lenão) | |
| 20. Validar formulários | Mód. 12 (Atividade 16; `setCustomValidity` e mensagens em balões) | |
| 21. Web Storage e JSON | Mód. 13 (Atividade 17) | |
| 22. jQuery e plugin de máscara | Mód. 14 (Atividade 18); IMask.js e Cleave.js como alternativas sem jQuery | Citar as alternativas, como o ID 21 permite ("ou outra biblioteca") |
| 23. fetch e json-server | Mód. 15 (Atividade 19) | |
| 24. API pública | Mód. 15 (Atividade 20); Mód. 03 (catálogos: Rapid API, Public APIs, API Ninjas, Postman) | |
| 25. Prettier e ESLint | Atividade 01 (extensões e `settings.json` com Format on Save); seção oculta "Linters, Build e Deploy" | A configuração da Atividade 01 |
| 26. GitHub Pages | Seção oculta "Linters, Build e Deploy": o professor recomenda o CDN no lugar da `node_modules/` | Bate com o capítulo 26 previsto; a Atividade 06 instala o `gh-pages` |
| Para ir além: Materialize | Mód. 06 (Atividade 09, Guaratur em Materialize ou Bootstrap) | |
| Para ir além: Vite | Atividade 08 cita empacotadores (Vite, Webpack) como o "futuro" do curso | |

Os exemplos das atividades usam dois projetos próprios: o **Guaratur** (Atividades 09 a 12) e o **João Lenão** (Atividades 15 a 20, com um branch do GitHub por etapa). O livro usa o Trilheiro.

## Divergências encontradas nos capítulos já publicados

### Capítulo 2 (Atividades 01 e 06)

1. **Autenticação no GitHub.** O capítulo diz que "o Git pede para você entrar na sua conta". A Atividade 06 explica o que de fato acontece: o GitHub não aceita a senha da conta no terminal, e a disciplina usa **HTTPS com token de acesso pessoal (PAT) fine-grained**, com SSH como alternativa no computador pessoal.
2. **Clonar primeiro.** A disciplina cria o repositório no GitHub **com README** e faz `git clone`; o capítulo faz `git init` local e envia para um repositório vazio. A Atividade 06 avisa que misturar os dois caminhos dá erro de "históricos diferentes".
3. **`.gitignore` antes do `npm install`.** A Atividade 06 pede o `.gitignore` antes de instalar os pacotes, com `/node_modules` e `.env`; o capítulo cria o `.gitignore` depois e só com a `node_modules/`.
4. **Commits semânticos.** A disciplina usa mensagens como `chore: inicializa projeto node e configura dependencias` e `feat: …`; o capítulo usa "primeiro cartão de trilha".
5. **LTS e NVM.** A Atividade 06 ensina que as versões LTS são as de número par e apresenta o NVM.
6. **Computador compartilhado.** A Atividade 06 tem regras para o laboratório: não usar `--global` no Linux compartilhado, guardar o token só em memória (`git config credential.helper 'cache --timeout=7200'`), usar janela anônima e apagar a pasta ao fim.
7. **Extensões e configuração do VS Code.** A Atividade 01 lista Prettier, ESLint, Live Server, Error Lens e outras, e configura Format on Save; o capítulo cita só o Live Server.
8. **Hábitos.** `git pull` antes de começar e commits atômicos (Atividade 06).

### Capítulo 1

- A Atividade 08 chama de "incorreto", durante o desenvolvimento, o uso do CDN, e pede a `node_modules/`. O capítulo 1 usa o CDN só para a comparação inicial, e o capítulo 2 passa para a `node_modules/`, o que é coerente. Vale uma frase no capítulo 1 avisando dessa troca.

### Capítulo 3

- Sem divergências: a Atividade 07 ensina a mesma regra da ordem dos `<link>`.

## Lacunas: o que a disciplina ensina e o livro ainda não tem

1. **JavaScript básico** (Mód. 10, Atividades 13 e 14): variáveis, funções, `prompt`/`alert`/`confirm`, template strings, `setTimeout`/`setInterval`. O capítulo 17 parte do DOM e supõe essa base. Falta decidir se entra um capítulo novo ("Que JavaScript preciso saber antes do DOM?") ou uma revisão no começo do 17.
2. **Escolha da API pública e dos critérios do framework** (Atividade 05): pode entrar no capítulo 4 (PRD) ou no 23.
3. **Ferramentas de apoio** que a disciplina recomenda: extensões Bootstrap Grid Overlay, NOV Grid e Responsive Viewer; View Image Info; o Portal de Simuladores da disciplina (Biblioteca).

## Decisões do professor (05/11)

- **Capítulo 2:** alinhar com a disciplina (clonar primeiro, PAT, `.gitignore` antes do `npm install`, commits semânticos). Feito.
- **JavaScript básico:** capítulo novo, o 17; os seguintes viram 18 a 26.
- **MCP:** usar no capítulo 5, com o Stitch ou outra ferramenta, guiando para o escopo ficar pequeno.

## Pontos que estavam em aberto

- No capítulo 2: alinhar com a disciplina (clonar primeiro, PAT) ou manter o `git init` local, mostrando o clone como alternativa.
- A lacuna do JavaScript básico: capítulo novo ou revisão no capítulo 17.
- A seção "Projeto" do Moodle ainda diz, na Entrega 2, que o MCP pode ler o Stitch ou o Figma "e acelerar a escrita do HTML", e a Atividade 08 incentiva o MCP para importar as telas. Isso contradiz a orientação registrada em 31/10, de não gerar as telas inteiras pela IA. O capítulo 5 precisa saber qual das duas vale.
