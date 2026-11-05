// O catálogo do livro: partes e capítulos. Usado no build (HTML) e no navegador (caderneta).
// Para publicar um capítulo, troque `published` para true (veja o AGENTS.md).

const raw = [
  ['ponto-de-partida', 'Ponto de partida', true, [
    [1, '01-por-que-um-framework', 'O que é um framework CSS, e por que usar um?', 30],
    [2, '02-preparar-o-ambiente', 'Como preparar o ambiente: VS Code, Live Server, Node.js, npm e Git?', 40],
    [3, '03-html-e-css-para-relembrar', 'Que HTML e CSS preciso relembrar: semântica, caixa, cascata e especificidade?', 45],
  ]],
  ['o-mapa-da-trilha', 'O mapa da trilha', true, [
    [4, '04-prd-curto', 'Como transformar uma ideia em requisitos, com um PRD curto?', 35],
    [5, '05-prototipar-com-ia', 'Como prototipar com IA sem perder o controle?', 40],
    [6, '06-design-tokens', 'Como definir a identidade visual com design tokens?', 35],
  ]],
  ['primeiros-quilometros', 'Primeiros quilômetros', true, [
    [7, '07-grid-do-bootstrap', 'Como montar um layout responsivo com o grid do Bootstrap?', 45],
    [8, '08-utilitarios-do-bootstrap', 'Como acertar espaços, alinhamentos e visibilidade com os utilitários?', 35],
    [9, '09-componentes-prontos', 'Como usar componentes prontos: navbar, card, botão, badge?', 40],
    [10, '10-componentes-com-javascript', 'Como usar componentes com JavaScript: modal, carrossel, offcanvas?', 40],
  ]],
  ['a-subida', 'A subida', true, [
    [11, '11-flexbox-e-grid-no-css-puro', 'Como fazer layout com Flexbox e Grid no CSS puro?', 50],
    [12, '12-unidades-relativas', 'Por que usar unidades relativas (rem, %, vw, vh) no lugar de pixels?', 30],
    [13, '13-personalizar-o-bootstrap-com-sass', 'Como personalizar o Bootstrap com Sass?', 45],
    [14, '14-organizar-o-css-com-sass', 'Como organizar o meu CSS com Sass: parciais, variáveis, mixins e funções?', 45],
    [15, '15-tipografia-fluida', 'Como fazer tipografia responsiva e fluida com clamp()?', 30],
    [16, '16-imagens-responsivas', 'Como deixar as imagens responsivas e leves: object-fit, srcset, <picture> e WebP?', 40],
  ]],
  ['a-travessia', 'A travessia', true, [
    [17, '17-javascript-basico', 'Que JavaScript preciso saber antes do DOM: variáveis, funções e template strings?', 50],
    [18, '18-dom-e-eventos', 'Que JavaScript preciso para dar vida à página: DOM e eventos?', 50],
    [19, '19-objetos-arrays-e-classes', 'Como organizar os dados com objetos, arrays e classes?', 45],
    [20, '20-validar-formularios', 'Como validar formulários com HTML e expressões regulares?', 50],
    [21, '21-web-storage-e-json', 'Como guardar dados no navegador com Web Storage e JSON?', 35],
    [22, '22-jquery-e-plugin-de-mascara', 'Como usar o jQuery e um plugin de máscara?', 35],
  ]],
  ['o-cume', 'O cume', true, [
    [23, '23-fetch-e-json-server', 'Como salvar e buscar dados com fetch e o json-server?', 50],
    [24, '24-api-publica-e-erros', 'Como consumir uma API pública e tratar os erros?', 45],
    [25, '25-prettier-e-eslint', 'Como manter o código padronizado com Prettier e ESLint?', 30],
    [26, '26-publicar-no-github-pages', 'Como publicar o site no GitHub Pages?', 35],
  ]],
  ['para-ir-alem', 'Para ir além', false, [
    [null, 'materialize-e-outros-frameworks', 'Como são o Materialize e outros frameworks CSS, lado a lado?', 30],
    [null, 'o-que-e-o-tailwind', 'O que é o Tailwind, e por que ele pensa diferente?', 25],
    [null, 'lighthouse', 'Como medir e melhorar o site com o Lighthouse?', 30],
    [null, 'acessibilidade-na-pratica', 'Como deixar o site acessível na prática?', 40],
    [null, 'vite-e-bundlers', 'E quando o projeto cresce: o que faz um bundler como o Vite?', 35],
  ]],
];

// Capítulos já publicados.
const PUBLISHED = new Set(['01-por-que-um-framework', '02-preparar-o-ambiente', '03-html-e-css-para-relembrar', '04-prd-curto', '05-prototipar-com-ia', '06-design-tokens', '07-grid-do-bootstrap', '08-utilitarios-do-bootstrap', '09-componentes-prontos', '10-componentes-com-javascript', '11-flexbox-e-grid-no-css-puro', '12-unidades-relativas', '13-personalizar-o-bootstrap-com-sass', '14-organizar-o-css-com-sass', '15-tipografia-fluida', '16-imagens-responsivas', '17-javascript-basico', '18-dom-e-eventos', '19-objetos-arrays-e-classes', '20-validar-formularios']);

export const PARTS = raw.map(([id, title, hasMarks, chapters]) => ({
  id,
  title,
  hasMarks,
  chapters: chapters.map(([number, slug, question, minutes]) => ({
    number, slug, question, minutes, published: PUBLISHED.has(slug), partId: id,
  })),
}));

/** Os 26 capítulos numerados, em ordem. */
export function allChapters() {
  return PARTS.flatMap((p) => p.chapters).filter((c) => c.number !== null);
}

export function chapterBySlug(slug) {
  return PARTS.flatMap((p) => p.chapters).find((c) => c.slug === slug);
}

/** O capítulo publicado anterior e o seguinte. */
export function neighbors(slug, list = allChapters()) {
  const published = list.filter((c) => c.published || c.slug === slug);
  const i = published.findIndex((c) => c.slug === slug);
  return { prev: published[i - 1], next: published[i + 1] };
}

export function chapterUrl(chapter, base) {
  return `${base}capitulos/${chapter.slug}/`;
}
