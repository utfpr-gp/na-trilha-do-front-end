# Estado do livro

> Onde a construção do livro parou e o que vem a seguir. **Leia antes de começar; atualize a cada etapa.**
> Última atualização: 2026-11-05 (capítulos 1 a 6 publicados; merge autônomo até o livro ficar pronto).

## Feito

- Projeto do livro aprovado nas decisões principais: [docs/projeto.md](docs/projeto.md) (seção 13).
- Repositório criado, com README, licenças e o projeto.

- `trilheiro/docs/prd.md`, `architecture.md` e `design-system.md` escritos (04/11), aguardando revisão do professor. Rotas e APIs conferidas de verdade (json-server 1.0.0-beta.15, Open-Meteo, ViaCEP, jQuery 4 + Mask Plugin 1.14.16; tema Sass compilado com Bootstrap 5.3.8 e Sass 1.107).
- Protótipo do Trilheiro publicado como Artifact (canvas de design, 4 telas × computador e celular, navegável, com os componentes do Bootstrap apontados): <https://claude.ai/artifact/Q3NTpoz8Jtq87mgzywVVYP>. **Privado até o professor compartilhar** pelo menu Share.
- `trilheiro/README.md` (vitrine) e `trilheiro/checklist.md` (itens atuais, desmarcados, com o arquivo onde cada prova vai estar) escritos em 04/11. O app em si ainda não existe: os arquivos citados nascem com os capítulos.

- **Estrutura do site construída** (plano 1, branch `feat/estrutura`, 04/11): Vite com várias páginas, paleta aprovada pelo professor, catálogo dos 25 capítulos, visões do capítulo, página "Como ler este livro", desafio, caderneta com marcos, mirantes e cume, glossário, busca (Pagefind), SEO, 404, verificações (`npm run check`), publicação por GitHub Actions e `AGENTS.md`.

- **Estrutura publicada** em <https://utfpr-gp.github.io/na-trilha-do-front-end/> (PR #1, 05/11).
- **Capítulo 1 publicado** (PR #2, 05/11): as oito visões, simulador `<tf-class-toggle>` (tirar classes do card), etapa `etapas/01-por-que-um-framework/` (CSS puro × Bootstrap, 85 linhas × 0), armadilhas reproduzidas (integrity bloqueado; 404 do CDN sem mensagem no console; classe com erro de digitação), desafio de 4 perguntas, termo CDN no glossário.
- **Capítulo 2 publicado** (PR #3, 05/11): VS Code, Live Server, Node.js (LTS 26) e npm, Git e GitHub; diagrama do caminho dos arquivos; etapa `etapas/02-preparar-o-ambiente/` (projeto npm, `.gitignore`, CSS da `node_modules`); armadilhas reproduzidas (npm fora da pasta, commit sem identidade, fora de um repositório, `node_modules` no Git); termos npm, package.json e commit.
- **Capítulo 3 publicado** (PR #4, 05/11): semântica, modelo de caixa (`box-sizing` do Bootstrap), cascata e especificidade; simulador `<tf-cascade>` (regras ligáveis, com a explicação de quem vence); etapa `etapas/03-html-e-css-para-relembrar/` (página semântica e `css/style.css` depois do Bootstrap, conferido trocando a ordem); termos cascata e especificidade.
- **Vite em Para ir além** (decisão do professor, 05/11): item novo no catálogo e no projeto (seção 5).
- Link do MDN sobre `integrity` no capítulo 1 corrigido (o pt-BR saiu do ar; agora aponta para o inglês).
- **Levantamento da disciplina** (05/11): `docs/mapa-disciplina.md` liga cada capítulo às atividades do Moodle/Notion, com divergências e lacunas.
- **Alinhamento publicado** (PR #5, 05/11): capítulo 2 reescrito no fluxo da disciplina (clonar primeiro, `.gitignore` antes do `npm install`, commits semânticos, token de acesso pessoal, LTS par, NVM, extensões, computador compartilhado); capítulo 1 avisa a troca do CDN pela `node_modules/`; **capítulo novo 17 (JavaScript básico)** e renumeração dos capítulos 18 a 26; decisão do MCP no capítulo 5 registrada no projeto.
- **Capítulo 4 publicado** (PR #6) (base: Atividade 03): as sete seções do PRD, anatomia da história de usuário (quem, o quê, para quê), critérios de aceitação verificáveis, tabela "do PRD ao código", modelo de dados em Mermaid no `architecture.md`, pedido modelo para a IA com limites de escopo; etapa `etapas/04-prd-curto/` com `docs/prd.md` e a primeira versão do `docs/architecture.md`; armadilha do Mermaid reproduzida com o Mermaid 11; termos PRD e história de usuário; ligaduras desligadas no código do site inteiro.
- **Capítulo 5 publicado** (base: Atividades 04 e 08): protótipo responsivo e navegável no Stitch, celular primeiro, Instant Prototype, triagem com o PRD (`docs/prototipo.md`), ajuste ao Bootstrap 5.3, MCP uma peça de cada vez; termos protótipo e MCP.
- **Capítulo 6 publicado:** design tokens como variáveis CSS com nome de papel, `docs/design-system.md`, Google Fonts, simulador `<tf-token-lab>` (troca de cor com contraste ao vivo; `src/js/contrast.js` compartilhado com o verificador); termo variável CSS. Lista de assuntos do Moodle a incluir nos capítulos registrada no `docs/mapa-disciplina.md`.
- **Modo de trabalho a partir de 05/11 (professor):** escrever todos os capítulos e fazer o merge sem esperar revisão; ele avalia tudo no fim. Script: `scripts/publicar-capitulo.sh <slug> "<título>" <corpo-do-pr>` (marca publicado, testa, compila, verifica, abre o PR, espera a CI e faz o merge).

## Próximos passos

1. Capítulo 7 (grid do Bootstrap) e seguintes, na ordem, até o 26; depois os de Para ir além e o app final em `trilheiro/`.
3. Verificador de links externos (o capítulo 1 publicou um link do MDN que tinha saído do ar).

## Em aberto

- Se falta ou sobra algum capítulo (seção 5 do projeto).
