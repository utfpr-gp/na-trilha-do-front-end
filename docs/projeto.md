# Na Trilha do Front-End — documento de projeto

**Autor do material:** Prof. Roni Fabio Banaszewski · Tecnologia em Sistemas para Internet (TSI) · UTFPR Guarapuava
**Data:** 04/11/2026 · **Situação:** aprovado nas decisões principais (seção 13)

## 1. A intenção

Um site aberto, em português, que ensina a construir uma aplicação web responsiva **com um framework CSS e JavaScript puro**, do protótipo ao site publicado. Ele funciona como um **livro**: pode ser lido do começo ao fim, para aprender, e consultado depois, para relembrar. É o irmão do *Volta ao Mundo em Angular*, com a mesma anatomia de capítulo.

**O critério principal é a qualidade do material**, e não a velocidade de produção.

O livro ensina construindo um único app de exemplo, o **Trilheiro**: um guia de trilhas da região de Guarapuava, com a lista de trilhas, o detalhe de cada uma, a previsão do tempo no ponto de partida e um cadastro de trilhas novas. O app cresce um pouco a cada capítulo. O progresso de quem estuda também é uma trilha: cada capítulo concluído ganha um **marco**, como as marcações pintadas que mostram o caminho numa trilha de verdade.

### 1.1. O problema que o livro resolve

Quem começa um projeto próprio costuma partir de um protótipo gerado por IA, com telas demais e componentes que nunca viu. O código vem depois, e a pessoa não sabe explicar boa parte dele.

O livro inverte essa ordem:
- **o tamanho certo vem do exemplo:** o Trilheiro tem 4 telas (início, lista, detalhe e cadastro), e cada componente dele existe porque um capítulo o ensinou;
- **cada capítulo termina com 🧭 "Na sua trilha":** o mesmo conceito aplicado ao projeto de quem lê, com o mesmo tamanho do Trilheiro;
- **o capítulo de prototipação ensina a usar a IA com rédea:** um prompt modelo que limita as telas e os componentes ao que o livro ensina, e a regra "nenhum componente que você não saiba explicar".

## 2. Objetivos, não objetivos e antiobjetivos

**Objetivos**
- Ensinar layout responsivo com o Bootstrap, CSS moderno (Flexbox, Grid, unidades relativas, `clamp()`), Sass, imagens responsivas, JavaScript para a página (DOM, eventos, formulários, Web Storage), jQuery e requisições assíncronas, com linguagem fácil e motivadora, sem perder o rigor.
- Dar a cada conceito uma forma de ser **visto funcionando** (simuladores) e **praticado** (passos guiados e desafios).
- Mostrar o **porquê** de cada técnica: que problema ela resolve e o que quebra sem ela.
- Ser mantido por um agente de IA, como o *Volta ao Mundo*.

**Não objetivos**
- Não é a referência completa do Bootstrap nem do CSS; a documentação oficial e o MDN cumprem esse papel, e cada capítulo aponta para eles.
- Sem login, certificados, fórum ou comentários. Sem versão em inglês. Sem vídeos.
- Não menciona a disciplina, a avaliação, notas, checklist nem datas. O site serve a qualquer pessoa.
- Não ensina lógica de programação do zero: supõe que quem lê sabe o que são variável, condição, laço e função. O livro ensina o JavaScript **da página**.

**Antiobjetivos** (o projeto fracassa se isto acontecer, mesmo funcionando)
- Capítulos que viram listas de classes do Bootstrap para decorar.
- Código pronto para copiar sem entender, ou exemplos que só funcionam com o código inteiro gerado por IA.
- Gamificação que premia clicar em vez de aprender.
- Dependência de serviço pago, chave de API ou cadastro para estudar.

## 3. Público e tom

- **Público:** estudantes de graduação em computação no começo do curso, e qualquer pessoa que já escreveu HTML e CSS básicos e conhece lógica de programação. Já usaram terminal: comandos básicos são revisão rápida.
- **Tom:** o mesmo do *Volta ao Mundo*. Fala com "você", em frases curtas, de forma motivadora e técnica ao mesmo tempo. Toda ideia nova ganha uma analogia do cotidiano, de preferência ligada a trilhas e ao ar livre quando ela couber sem forçar. Os termos técnicos aparecem com o nome oficial (`col-md-4`, `clamp()`, `addEventListener`), explicados na primeira vez.
- **Idioma:** português do Brasil no texto; nomes de classes, variáveis e funções próprias **em inglês** no código do Trilheiro.

## 4. Anatomia de um capítulo

A mesma do *Volta ao Mundo*, com uma visão a mais no fim:

| Visão | Papel |
|---|---|
| Cabeçalho | Parte, tempo estimado, pré-requisito, a pergunta do capítulo, e o espaço do marco |
| 🎯 **A missão** | O que o Trilheiro ganha neste capítulo, mostrado funcionando antes de qualquer explicação |
| 💡 **A ideia** | A analogia do cotidiano |
| 🔬 **Por dentro** | O conceito técnico, com um simulador interativo |
| 🛠️ **Mão no código** | A prática guiada em passos curtos, com a linha nova destacada e "o que muda na tela" |
| ⚠️ **Armadilhas** | Os erros reais, com a mensagem exata (do console, do compilador Sass, do DevTools) e como resolver |
| 🏁 **Desafio** | De 3 a 5 perguntas; acertar todas dá o marco |
| 🧭 **Na sua trilha** | O mesmo conceito no projeto de quem lê: o que fazer, do tamanho do Trilheiro, e as perguntas para saber se entendeu (o conceito, por que ali, o que cada linha faz, o que quebra sem ela) |
| 📚 **Para ir além** | Os links da documentação oficial (Bootstrap, MDN, Sass) |

**O teste do "E se eu tirar?" atravessa o livro.** Em toda prática, o livro mostra o que quebra quando a classe, a regra ou a linha sai: desligada no DevTools, comentada no código ou apagada no terminal. É o hábito que a pessoa leva para o próprio projeto.

## 5. O conteúdo: partes e capítulos

As partes são os trechos de uma trilha. Cada capítulo responde a uma pergunta, e cada um usa só o que veio antes.

| Parte | Capítulos |
|---|---|
| **Ponto de partida** | 1. O que é um framework CSS, e por que usar um? · 2. Como preparar o ambiente: VS Code, Live Server, Node.js, npm e Git? · 3. Que HTML e CSS preciso relembrar: semântica, caixa, cascata e especificidade? |
| **O mapa da trilha** | 4. Como transformar uma ideia em requisitos, com um PRD curto? · 5. Como prototipar com IA sem perder o controle? · 6. Como definir a identidade visual com design tokens? |
| **Primeiros quilômetros** | 7. Como montar um layout responsivo com o grid do Bootstrap? · 8. Como acertar espaços, alinhamentos e visibilidade com os utilitários? · 9. Como usar componentes prontos: navbar, card, botão, badge? · 10. Como usar componentes com JavaScript: modal, carrossel, offcanvas? |
| **A subida** | 11. Como fazer layout com Flexbox e Grid no CSS puro? · 12. Por que usar unidades relativas (`rem`, `%`, `vw`, `vh`) no lugar de pixels? · 13. Como personalizar o Bootstrap com Sass? · 14. Como organizar o meu CSS com Sass: parciais, variáveis, mixins e funções? · 15. Como fazer tipografia responsiva e fluida com `clamp()`? · 16. Como deixar as imagens responsivas e leves: `object-fit`, `srcset`, `<picture>` e WebP? |
| **A travessia** | 17. Que JavaScript preciso saber antes do DOM: variáveis, funções e template strings? · 18. Que JavaScript preciso para dar vida à página: DOM e eventos? · 19. Como organizar os dados com objetos, arrays e classes? · 20. Como validar formulários com HTML e expressões regulares? · 21. Como guardar dados no navegador com Web Storage e JSON? · 22. Como usar o jQuery e um plugin de máscara? |
| **O cume** | 23. Como salvar e buscar dados com `fetch` e o json-server? · 24. Como consumir uma API pública e tratar os erros? · 25. Como manter o código padronizado com Prettier e ESLint? · 26. Como publicar o site no GitHub Pages? |
| **Para ir além** (sem marco) | Materialize e outros frameworks CSS, lado a lado · O que é o Tailwind, e por que ele pensa diferente · Medir e melhorar com o Lighthouse · Acessibilidade na prática · E quando o projeto cresce: o que faz um bundler como o Vite? |

**Alguns capítulos em detalhe:**

**O capítulo 1** compara o mesmo cartão de trilha feito em CSS puro e com o Bootstrap: quantas linhas cada um tem, o que cada um resolve sozinho (responsividade, consistência, acessibilidade dos componentes) e o que se perde (identidade própria, peso). Fecha com a pergunta "quando **não** usar um framework".

**O capítulo 5** ensina a prototipar com IA sem perder o controle:
- partir do PRD do capítulo 4, e não de uma ideia solta;
- um prompt modelo para o Stitch, que fixa as 4 telas, os componentes do Bootstrap e os tokens;
- o que fazer quando a IA inventa telas e componentes: cortar, e não implementar tudo;
- a regra do livro: nenhum componente entra no código sem que você saiba dizer o que ele é e por que está ali.

**O capítulo 13** separa as duas ideias que mais confundem quem começa com Sass:
- `!default`: as variáveis do tema vêm **antes** do Bootstrap;
- a cascata: as regras próprias vêm **depois**;
- "mas no CSS o último não vence sempre?", e "e o `!important`?", com a ordem importância → especificidade → ordem;
- o que dá para mudar por variável e o que só muda por regra.

O conteúdo vem da Atividade 10 da disciplina, já testada com compilação real.

**O capítulo 20** valida o cadastro de trilha:
- `required`, `type`, `min`, `max` e `pattern` no HTML, e as mensagens nativas;
- uma regex montada passo a passo para o CEP do ponto de partida (`^\d{5}-?\d{3}$`) e para o telefone do guia;
- checkbox (o que levar), radio (o tipo de percurso) e select (a dificuldade);
- a mensagem clara para cada erro, mostrada só depois que o campo foi tocado.

**O capítulo 26** publica no GitHub Pages com as bibliotecas por **CDN**: o CSS compilado do Sass vai para o repositório, e o JavaScript do Bootstrap e o jQuery vêm do CDN. Explica por que um `<script>` que aponta para a `node_modules/` funciona no seu computador e quebra no site publicado, sem nenhuma mensagem de erro.

### 5.1. Recursos de livro de consulta

Os mesmos do *Volta ao Mundo*: busca no próprio navegador, glossário, resumo de 1 minuto por capítulo, referência rápida por parte, ligações entre capítulos e links estáveis para cada seção.

### 5.2. Critério de pronto de um capítulo

1. Todas as visões da seção 4 estão presentes, incluindo uma analogia e um simulador ou recurso visual.
2. Todo código foi conferido contra a documentação oficial (Bootstrap 5.3, MDN, Sass), e a etapa do Trilheiro correspondente abre e funciona.
3. As armadilhas mostram mensagens reais, reproduzidas de verdade.
4. O desafio tem de 3 a 5 perguntas, cada uma com explicação para a resposta errada.
5. "Na sua trilha" pede o conceito num tamanho parecido com o do Trilheiro, sem trabalho a mais.
6. O texto passou por revisão de português e de tom.
7. O simulador funciona com teclado, tem texto alternativo e respeita a preferência por menos movimento.
8. O professor aprovou o capítulo no Pull Request antes da publicação.

## 6. O app de exemplo: Trilheiro

**Domínio:** trilhas da região de Guarapuava. Os dados das trilhas são de exemplo, inspirados em lugares reais, sem prometer exatidão de distância ou de percurso.

**As 4 telas** (o tamanho que o livro recomenda para o projeto de quem lê):

| Tela | O que tem | Conceitos que ela carrega |
|---|---|---|
| Início | Banner, trilhas em destaque, navbar | Grid, componentes, unidades relativas, tipografia fluida |
| Trilhas | Lista em cards, com filtro por dificuldade | Grid, Flexbox, `object-fit`, jQuery, Web Storage (o último filtro) |
| Detalhe | Fotos (carrossel), dados da trilha, previsão do tempo | Componentes com JavaScript, `srcset` e `<picture>`, API pública |
| Cadastrar trilha | Formulário com validação | HTML5, regex, checkbox/radio/select, máscara, json-server |

**Regras de negócio mínimas, que servem para ensinar validação:** a distância vai de 0,5 a 50 km; a dificuldade é fácil, moderada ou difícil; o CEP e o telefone do guia têm formato; a data da última visita não pode ser no futuro.

**Dados**
- **json-server:** as trilhas cadastradas e os relatos de quem foi (duas entidades, ligadas pelo id da trilha).
- **Open-Meteo:** a previsão do tempo no ponto de partida, pela latitude e longitude. Gratuita, sem chave.
- **ViaCEP:** preenche cidade e bairro a partir do CEP do ponto de partida. Gratuito, sem chave.
- **Web Storage:** as trilhas favoritas e o último filtro usado.

**Como o app cresce** (exemplos): uma página só com o cartão de uma trilha → a lista em grid → navbar e cards do Bootstrap → o detalhe com carrossel e modal → o rodapé em Flexbox próprio → o tema da trilha (verde-mata e terra) com Sass → títulos fluidos → fotos leves e responsivas → o filtro funcionando com eventos → o cadastro validado → as favoritas guardadas no navegador → o filtro animado com jQuery e a máscara do CEP → as trilhas vindo do json-server → o clima no detalhe → o código padronizado → no ar, no GitHub Pages.

### 6.1. O Trilheiro como modelo de projeto

O Trilheiro também é o **modelo** que quem lê copia para o próprio projeto: a mesma estrutura de README e de documentação, já preenchida. A estrutura segue o modelo do `roubank-css` (`utfpr-gp/roubank-css`), que ele passa a substituir.

```
trilheiro/
├── README.md          a vitrine: só o essencial, e links para o resto
├── checklist.md       os itens praticados, cada um com link para as linhas do código
└── docs/
    ├── prd.md         visão geral, atores, histórias de usuário e regras de negócio
    ├── architecture.md  modelo de dados (diagrama ER), dicionário de dados, rotas do json-server, db.json, API pública
    └── design-system.md  framework, cores, tipografia, diretrizes de componentes,
                          componentes do framework no protótipo, e dos tokens ao código
```

- **O README é a vitrine.** Nome, autoria, descrição em poucas linhas, links para a documentação, o protótipo, o `checklist.md` e o site em produção, as tecnologias, como rodar em poucos passos e as telas. O detalhe mora nos arquivos linkados.
- **O documento técnico se chama `architecture.md`**, o nome usado na disciplina (o roubank usava `spec.md`).
- **O protótipo do Trilheiro é uma página navegável publicada como Artifact do Claude** (mobile e desktop, as 4 telas), feita a partir do `design-system.md` e linkada no README. Ele não sai do Stitch porque o modelo precisa mostrar só os componentes que o app usa, com os tokens já decididos. O capítulo 5 continua ensinando o Stitch, que é o que quem lê vai usar no próprio projeto.
- **O `checklist.md` fica separado** porque é a parte que muda: a lista de itens pode mudar de uma edição para outra, e trocá-la é editar um arquivo só, sem mexer no README. Cada item marcado tem o link do GitHub para as linhas que o provam.
- **O `design-system.md` traz duas seções além das do roubank:** os componentes do framework apontados no protótipo (o que vira navbar, card, modal) e a tabela "dos tokens ao código" (cada token virando variável Sass ou CSS).
- **Nenhum desses arquivos fala de entregas, prazos ou datas.** Eles descrevem o app, e servem igual em qualquer semestre e para quem estuda sozinho.
- **Os documentos vêm antes do app:** o `prd.md`, o `architecture.md` e o `design-system.md` são escritos junto com os capítulos 4 a 6, então o modelo de documentação fica pronto cedo, antes de o app estar completo.
- **O site do livro não cita o `checklist.md`.** Ele é um arquivo do modelo, e não um conteúdo dos capítulos.

**Etapas:** cada capítulo tem a sua etapa em `etapas/NN-slug/`, um projeto estático completo (HTML, CSS ou SCSS, JS). O capítulo aponta para a pasta no GitHub e para abri-la no StackBlitz, no navegador, sem instalar nada. Sem build: o que se vê na pasta é o que o navegador lê, como no projeto de quem estuda.

## 7. Simuladores

Componentes do próprio site, **feitos para este livro**: cada um é pontual, mostra um conceito só e usa sempre as peças do Trilheiro (o cartão de trilha, o banner, a foto, o formulário), para que o simulador e a prática falem da mesma coisa. Os simuladores do `lab-framework-css` não são reaproveitados.
- **O cartão de trilha em CSS puro × Bootstrap:** as mesmas linhas, lado a lado, e o que cada uma faz (capítulo 1)
- **Caixa e cascata:** a cor do título do cartão perdendo e ganhando conforme a especificidade e a ordem (capítulo 3)
- **Editor de tokens:** a cor primária, a fonte e o arredondamento mudando o Trilheiro inteiro (capítulos 6 e 13)
- **A lista de trilhas no grid:** um controle de largura de tela e as classes `col-*` de cada cartão; os cartões se rearrumam conforme o breakpoint (capítulo 7)
- **Utilitários do cartão:** liga e desliga `p-*`, `m-*`, `d-flex`, `gap-*` e `d-none d-md-block` no cartão de trilha (capítulo 8)
- **O modal de "Detalhes da trilha":** o que o `data-bs-toggle` e o `data-bs-target` ligam, e o que acontece sem o JavaScript do Bootstrap (capítulo 10)
- **O rodapé em Flexbox e a galeria em Grid:** as propriedades num painel, os itens se rearrumando (capítulo 11)
- **A régua das unidades:** `px`, `rem`, `%`, `vw` lado a lado no banner, enquanto se muda a largura da tela e o tamanho da fonte do navegador (capítulo 12)
- **`!default` × cascata:** a ordem das linhas do `main.scss` e o CSS gerado ao lado (capítulo 13)
- **A curva do `clamp()`:** o tamanho do título do banner conforme a largura, com o mínimo, o ideal e o máximo (capítulo 15)
- **Qual foto da trilha o navegador escolhe:** o `srcset` e o `sizes`, com a largura e a densidade da tela (capítulo 16)
- **O caminho de um evento:** o clique no botão de favoritar subindo pela árvore do DOM do cartão (capítulo 18)
- **Testador de regex** no campo do CEP, com o estado do campo e as mensagens (capítulo 20)
- **As favoritas no Web Storage:** a chave e o valor mudando enquanto se favorita trilhas (capítulo 21)
- **A linha do tempo do `fetch`:** a previsão do tempo da trilha pedida, esperada, recebida ou falhando (capítulos 23 e 24)

Todo simulador funciona com teclado, tem texto alternativo e respeita a preferência por menos movimento.

## 8. Gamificação: a caderneta de trilha

- Cada capítulo com marco tem um desafio de 3 a 5 perguntas; o marco só vem com todas as respostas certas, e pode tentar de novo quantas vezes quiser.
- Uma página **"Minha caderneta"** mostra o mapa da trilha inteira, com os marcos conquistados. Ao fechar uma parte, a pessoa chega a um **mirante**; ao fechar o livro, ao **cume**.
- O progresso fica salvo no navegador, sem login, com exportação e importação em arquivo.
- Sem ranking e sem pontuação competitiva.

## 9. Identidade visual

- **Cores** (a validar no esboço): verde-mata (dominante), papel claro (fundo), terra (destaque), amarelo de marcação de trilha (o marco conquistado), azul-céu, e uma cor por visão do capítulo. Contraste mínimo AA.
- **Fontes:** as mesmas do *Volta ao Mundo* (Nunito Sans e JetBrains Mono), para os dois livros parecerem da mesma coleção.
- **Modo claro e escuro**, com os tokens trocando de valor.
- **Rodapé:** "Na Trilha do Front-End · Prof. Roni Fabio Banaszewski · Tecnologia em Sistemas para Internet · UTFPR Guarapuava", mais a licença.

## 10. Como é construído

**O site é feito com o que o livro ensina:** HTML, Bootstrap 5.3, Sass e JavaScript puro, sem framework de JavaScript. Um leitor que abrir o código do site encontra o mesmo tipo de código que está aprendendo. Do *Volta ao Mundo em Angular* vêm **o formato e as regras**, e não o código: a anatomia do capítulo, o `AGENTS.md`, o catálogo, a caderneta, a busca, o glossário e os verificadores.

- **Repositório:** `utfpr-gp/na-trilha-do-front-end`, público, publicado em `utfpr-gp.github.io/na-trilha-do-front-end`.
- **Build:** **Vite**, com uma página HTML por capítulo (vários pontos de entrada, como no `lab-framework-css`). Cada página sai pronta do build, com todo o texto no HTML, para a busca e o Google.
- **Partes repetidas sem framework:** o cabeçalho, a lateral e o rodapé são parciais HTML incluídos no build. As visões do capítulo são **Web Components** (custom elements em JavaScript puro, prefixo `tf-`): `<tf-view>`, `<tf-analogy>`, `<tf-code>`, `<tf-steps>`, `<tf-pitfall>`, `<tf-challenge>`. O conteúdo deles fica no HTML (sem depender de JavaScript para aparecer), e o JavaScript só acrescenta o comportamento.
- **Estilo:** Bootstrap 5.3 personalizado por Sass (`@use` com os tokens do livro antes do Bootstrap), mais os parciais do próprio site. Nenhuma cor solta: só tokens com nome de papel. Modo claro e escuro com o `data-bs-theme` do Bootstrap.
- **Interatividade:** o JavaScript do Bootstrap (abas, recolhíveis, modal) e módulos ES próprios para o desafio, a caderneta (Web Storage, com exportar e importar em JSON), o tema e os simuladores.
- **Código destacado:** os trechos são destacados no build (Shiki), sem JavaScript no navegador.
- **Busca:** Pagefind, gerado no build, funcionando no próprio navegador.
- **Etapas do Trilheiro:** `etapas/NN-slug/`; a versão final, que é o modelo, fica em `trilheiro/` (seção 6.1), projetos estáticos completos (HTML, Sass compilado, JS), com o JavaScript do Bootstrap e o jQuery pelo CDN, como no capítulo 26.
- **Verificação a cada push:** build; testes dos módulos JS e dos scripts (Vitest ou `node:test`); contraste das cores; palavras proibidas na saída; links quebrados; e cada etapa do Trilheiro abrindo sem erro no console.
- **Publicação:** GitHub Actions, a cada push na `main`, para o GitHub Pages.
- **Licença:** CC BY 4.0 para o texto, MIT para o código. Sem rastreamento.

**Decisões do professor de 05/11, depois do levantamento da disciplina** (`docs/mapa-disciplina.md`):
- **Capítulo 2 alinhado com a disciplina:** o repositório nasce no GitHub, com README, e é clonado; `.gitignore` antes do `npm install`; commits semânticos; envio com token de acesso pessoal (PAT) fine-grained.
- **Capítulo novo de JavaScript básico** (17), antes do DOM: variáveis, funções, template strings, `prompt`/`alert`, temporizadores. Os capítulos seguintes passam a ser 18 a 26.
- **MCP no capítulo 5:** quem lê usa o MCP com o Stitch (ou outra ferramenta) para trazer as telas, guiado para manter o escopo pequeno.

**Vite em "Para ir além"** (decisão do professor, 05/11): o livro não usa build no Trilheiro; o capítulo extra mostra o que um bundler acrescenta (servidor de desenvolvimento, `import` de CSS e Sass, build com arquivos com hash) quando o projeto cresce. O próprio site do livro é feito com Vite e serve de exemplo.

## 11. Decisões tomadas pelo agente (para o professor conferir)

1. **Partes com nomes de trilha** (Ponto de partida, O mapa da trilha, Primeiros quilômetros, A subida, A travessia, O cume), no lugar dos continentes do *Volta ao Mundo*.
2. **Dados de exemplo inspirados em trilhas reais**, para ninguém tomar o app como guia de segurança.
3. **As duas APIs públicas são gratuitas e sem chave** (Open-Meteo e ViaCEP), para não exigir cadastro.
4. **O capítulo 25 (Prettier e ESLint) entra no livro**, mesmo sem build: os dois rodam pelo npm e pela extensão do VS Code.
5. **O Materialize vira capítulo de "Para ir além"**, com o mesmo cartão feito nos dois frameworks, e não acompanha o livro inteiro.
6. **"Na sua trilha" não menciona disciplina nem entrega.** Ela fala do "seu projeto", e serve tanto a estudantes quanto a quem estuda sozinho.

## 12. Ordem de construção

1. A estrutura: o site em Vite, a página inicial, "Minha caderneta", o catálogo dos capítulos ("em breve") e a identidade visual.
2. Os capítulos, **na ordem do livro**, do capítulo 1 em diante (decisão do professor, 04/11).

## 13. Decisões do professor (04/11/2026)

- **Livro:** *Na Trilha do Front-End*. **App:** *Trilheiro*. **Progresso:** **marcos de trilha** numa caderneta, com mirantes e cume.
- **Modelo de uso com projetos próprios:** o tema é de quem lê, do tamanho do Trilheiro, com a visão "🧭 Na sua trilha" em cada capítulo.
- **Framework:** Bootstrap 5.3. **O site:** HTML, Bootstrap, Sass e JavaScript puro, com Vite (seção 10), e não Angular.
- **Do *Volta ao Mundo*:** o formato, as regras e as ideias da infraestrutura, e não o código. **Simuladores:** novos e pontuais, no contexto das trilhas; os do `lab-framework-css` não são reaproveitados.
- **Ordem de construção:** a do livro.
- **O Trilheiro é o modelo de projeto** (seção 6.1), no lugar do `roubank-css`: README como vitrine, `checklist.md` à parte e os três documentos de `docs/`, sem entregas nem datas.
- **Em aberto:** se falta ou sobra algum capítulo (seção 5).
