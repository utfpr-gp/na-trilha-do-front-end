# 🎨 Design System do Trilheiro

O Trilheiro usa o **Bootstrap 5.3** como base e o personaliza com **Sass** para ter cara de trilha: o verde da mata, o marrom da terra e o amarelo das marcas pintadas nas árvores. Este documento diz quais são as cores e as fontes, como usar cada componente e como cada decisão vira código.

## 1. Framework base

- **Framework:** Bootstrap 5.3 (o CSS compilado junto com o tema, pelo Sass; o JavaScript pelo CDN).
- **Por que ele:** tem um grid responsivo pronto, componentes com JavaScript que o app precisa (menu recolhível, carrossel, modal) e todas as cores e medidas em **variáveis Sass com `!default`**. Isso permite trocar a identidade inteira sem brigar com o framework.

## 2. Paleta de cores

| Token | Cor | Uso |
|---|---|---|
| **Verde-mata** (primária) | `#2F5D3A` | Navbar, botões principais, links, o filtro escolhido |
| **Terra** (secundária) | `#8B5A2B` | Botões secundários, detalhes do rodapé, ícones de informação da trilha |
| **Amarelo de marcação** (destaque) | `#F2C230` | Selo "Destaque" e o favorito marcado. Sempre com texto escuro, nunca branco |
| **Papel** (fundo) | `#FAF7F0` | Fundo de todas as páginas |
| **Superfície** | `#FFFFFF` | Cartões, formulário e modal, que "flutuam" sobre o papel |
| **Tinta** (texto) | `#1F2A24` | Texto principal e títulos |
| **Tinta suave** | `#55625A` | Texto de apoio: cidade, data, legendas |
| **Fácil** | `#2E7D32` | Selo de dificuldade "Fácil" |
| **Moderada** | `#A35F00` | Selo de dificuldade "Moderada" |
| **Difícil** | `#B3261E` | Selo de dificuldade "Difícil", e as mensagens de erro |

**Contraste conferido (mínimo AA, 4,5:1):**
- branco sobre o verde-mata: 7,6;
- branco sobre a terra: 5,8;
- branco sobre os selos: Fácil 5,1, Moderada 5,0, Difícil 6,5;
- tinta sobre o amarelo: 8,9;
- tinta suave sobre o papel: 6,0;
- verde-mata sobre o papel: 7,1.

**A dificuldade nunca depende só da cor:** o selo sempre traz a palavra ("Fácil", "Moderada", "Difícil").

## 3. Tipografia

As duas fontes vêm do Google Fonts.

| Papel | Fonte | Pesos | Por quê |
|---|---|---|---|
| Títulos (`h1` a `h6`), nome da trilha, números de destaque | **Bitter** | 700 | Serifa grossa, que lembra as placas de madeira das trilhas |
| Texto, botões, formulários | **Source Sans 3** | 400 e 600 | Leitura confortável em tela pequena |

- **Os títulos são fluidos:** crescem com a largura da tela, entre um mínimo e um máximo (`clamp()`), sem pular de tamanho num breakpoint.
- **O texto corrido** fica com 1rem (16 px) e altura de linha 1,6.

## 4. Diretrizes de uso dos componentes

- **Botões:**
  - `.btn-primary` (verde-mata) é a ação principal da tela, e só existe uma por tela: "Ver trilha", "Salvar trilha", "Publicar relato";
  - `.btn-outline-secondary` (terra) é a ação de apoio: "Cancelar", "Voltar para a lista".
- **Cartão da trilha:** sempre na mesma ordem: foto (proporção 4:3, cortada sem distorcer), selo de dificuldade, nome, cidade, distância e duração, botão de favorito. Cartões da mesma linha têm a mesma altura.
- **Selos (`.badge`):** um selo por informação. Dificuldade com a cor dela; "Destaque" em amarelo com texto em tinta.
- **Favorito:** botão com ícone de coração e `aria-pressed`. A cor muda de contorno (não favoritada) para amarelo preenchido (favoritada). O nome para leitores de tela é fixo e diz a trilha ("Favoritar Trilha do Salto"); quem diz se está ligado é o `aria-pressed`.
- **Formulários:** um rótulo visível por campo (nunca só o placeholder). A mensagem de erro aparece abaixo do campo, em vermelho de "Difícil", só depois que o campo foi tocado.
- **Mensagens:**
  - carregando: um spinner com o texto "Carregando…";
  - falha de API: um alerta discreto (`.alert-warning`) no lugar da seção, e o resto da página continua.
- **Espaçamento:** só os utilitários do Bootstrap (`.mb-3`, `.gap-3`, `.py-5`) ou `$spacer`. Nenhuma margem em pixel solto.

## 5. Componentes do framework no protótipo

**Protótipo navegável** (computador e celular): <https://claude.ai/artifact/Q3NTpoz8Jtq87mgzywVVYP>

Os componentes desenhados no protótipo e o componente do Bootstrap que cada um vira:

| No protótipo | Componente do Bootstrap | Onde aparece |
|---|---|---|
| Barra superior com o logo, os links e o menu "hambúrguer" no celular | **Navbar** (`.navbar`, `.navbar-expand-lg`, `.navbar-toggler` com `.collapse`) | Todas as telas |
| Cartão com a foto, o nome e os dados da trilha | **Card** (`.card`, `.card-img-top`, `.card-body`), dentro do **grid** (`.row`, `.col-sm-6`, `.col-lg-4`) | Início e Trilhas |
| Selo de dificuldade e de destaque | **Badge** (`.badge`) | Cartão e Detalhe |
| Botões "Todas / Fácil / Moderada / Difícil / Favoritas" | **Button group** com rádios (`.btn-group`, `.btn-check`) | Trilhas |
| Fotos que passam para o lado | **Carousel** (`.carousel`, com indicadores e controles) | Detalhe |
| Janela "Conte como foi" | **Modal** (`.modal`) | Detalhe |
| Campos do cadastro com erro em vermelho | **Forms** e validação (`.form-control`, `.form-select`, `.form-check`, `.is-invalid`, `.invalid-feedback`) | Cadastrar e o modal do relato |
| Aviso "Não foi possível carregar a previsão" | **Alert** (`.alert`) | Detalhe |
| Indicador de carregamento | **Spinner** (`.spinner-border`) | Detalhe e Cadastrar |

O **rodapé** não é componente do Bootstrap: é feito com **Flexbox no CSS próprio** (`_footer.scss`), para mostrar a mesma ideia sem o framework.

## 6. Dos tokens ao código

As variáveis do Bootstrap são definidas em `scss/_theme.scss`, **antes** de importar o Bootstrap. Como as dele têm `!default`, valem as nossas. O que o Bootstrap não tem vira variável Sass própria, usada nos parciais.

| Token | Valor | No código |
|---|---|---|
| Verde-mata | `#2F5D3A` | `$primary` (Bootstrap); também vira `$link-color`, porque o padrão dele é `$primary` |
| Terra | `#8B5A2B` | `$secondary` (Bootstrap) |
| Papel | `#FAF7F0` | `$body-bg` (Bootstrap) |
| Tinta | `#1F2A24` | `$body-color` (Bootstrap) |
| Tinta suave | `#55625A` | `$body-secondary-color` (Bootstrap) |
| Amarelo de marcação | `#F2C230` | `$marcacao` (própria, em `_tokens.scss`), no favorito marcado |
| Fácil, Moderada, Difícil | `#2E7D32`, `#A35F00`, `#B3261E` | O mapa `$dificuldades: (facil: …, moderada: …, dificil: …)`, em `_tokens.scss`, que um `@each` transforma nas classes `.badge-facil`, `.badge-moderada` e `.badge-dificil`; o vermelho de "Difícil" também vira `$danger`, a cor dos erros dos formulários |
| Fonte do texto | Source Sans 3 | `$font-family-sans-serif` (Bootstrap) |
| Fonte dos títulos | Bitter, 700 | `$headings-font-family` e `$headings-font-weight` (Bootstrap) |
| Títulos fluidos | de 1,75rem a 2,75rem (`h1`) | A função própria `fluid($min, $max)`, em `_functions.scss`, que devolve um `clamp()` |
| Cantos | 0,5rem | `$border-radius` (Bootstrap), que vale também para botões e cartões |
| Foto do cartão em 4:3 | `aspect-ratio: 4 / 3` e `object-fit: cover` | O mixin próprio `cover-image($largura, $altura)`, em `_mixins.scss` |

```scss
// scss/main.scss: a ordem importa
@import "theme";                       // 1. as nossas variáveis (antes), alimentadas pelos tokens
@import "bootstrap/scss/bootstrap";    // 2. o Bootstrap, que respeita os !default
@import "layout", "acessibilidade", "navbar", "hero", "cards", "trilha", "form", "footer";
                                       // 3. regras próprias (depois, para vencer na cascata)
```

O Bootstrap 5.3 ainda é escrito com `@import`, então o tema também usa `@import`. O compilador Sass atual mostra centenas de avisos de obsolescência vindos do próprio Bootstrap. Eles são esperados, e a opção `--quiet-deps` esconde os que vêm da `node_modules`, deixando à vista só os do seu código:

```bash
npx sass --load-path=node_modules --quiet-deps scss/main.scss css/main.css
```
