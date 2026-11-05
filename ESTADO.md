# Estado do livro

> Onde a construção do livro parou e o que vem a seguir. **Leia antes de começar; atualize a cada etapa.**
> Última atualização: 2026-11-04 (capítulo 1 no PR; estrutura publicada).

## Feito

- Projeto do livro aprovado nas decisões principais: [docs/projeto.md](docs/projeto.md) (seção 13).
- Repositório criado, com README, licenças e o projeto.

- `trilheiro/docs/prd.md`, `architecture.md` e `design-system.md` escritos (04/11), aguardando revisão do professor. Rotas e APIs conferidas de verdade (json-server 1.0.0-beta.15, Open-Meteo, ViaCEP, jQuery 4 + Mask Plugin 1.14.16; tema Sass compilado com Bootstrap 5.3.8 e Sass 1.107).
- Protótipo do Trilheiro publicado como Artifact (canvas de design, 4 telas × computador e celular, navegável, com os componentes do Bootstrap apontados): <https://claude.ai/artifact/Q3NTpoz8Jtq87mgzywVVYP>. **Privado até o professor compartilhar** pelo menu Share.
- `trilheiro/README.md` (vitrine) e `trilheiro/checklist.md` (itens atuais, desmarcados, com o arquivo onde cada prova vai estar) escritos em 04/11. O app em si ainda não existe: os arquivos citados nascem com os capítulos.

- **Estrutura do site construída** (plano 1, branch `feat/estrutura`, 04/11): Vite com várias páginas, paleta aprovada pelo professor, catálogo dos 25 capítulos, visões do capítulo, página "Como ler este livro", desafio, caderneta com marcos, mirantes e cume, glossário, busca (Pagefind), SEO, 404, verificações (`npm run check`), publicação por GitHub Actions e `AGENTS.md`.

- **Estrutura publicada** em <https://utfpr-gp.github.io/na-trilha-do-front-end/> (PR #1, 05/11).
- **Capítulo 1** escrito no branch `feat/capitulo-01`: as oito visões, simulador `<tf-class-toggle>` (tirar classes do card), etapa `etapas/01-por-que-um-framework/` (CSS puro × Bootstrap, 85 linhas × 0), armadilhas reproduzidas (integrity bloqueado; 404 do CDN sem mensagem no console; classe com erro de digitação), desafio de 4 perguntas, termo CDN no glossário.

## Próximos passos

1. Revisão e merge do PR do capítulo 1 pelo professor.
2. Capítulo 2 (ambiente: VS Code, Live Server, Node.js, npm e Git).

## Em aberto

- Se falta ou sobra algum capítulo (seção 5 do projeto).
