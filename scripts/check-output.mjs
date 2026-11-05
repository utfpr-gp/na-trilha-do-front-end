// Confere cada página gerada em dist/: palavras proibidas, estrutura e marcas sem processar.
import { globSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// O site serve a qualquer pessoa: nada de vocabulário de sala de aula.
const FORBIDDEN = ['vídeo', 'disciplina', 'aula', 'turma', 'ficha', 'checklist', 'entrega', 'prazo', 'semestre'];
const VIEWS = ['missao', 'ideia', 'por-dentro', 'mao-no-codigo', 'armadilhas', 'desafio', 'na-sua-trilha', 'para-ir-alem'];

const strip = (html, tag) => html.replace(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}>`, 'gi'), ' ');

export function checkPage(html, path) {
  const problems = [];
  let text = strip(strip(strip(html, 'pre'), 'style'), 'script');
  for (const word of FORBIDDEN) {
    if (new RegExp(`(?<!\\p{L})${word}s?(?!\\p{L})`, 'iu').test(text)) problems.push(`palavra proibida: "${word}"`);
  }
  if (!path.startsWith('sobre/')) {
    text = strip(text, 'footer');
    if (/UTFPR/.test(text)) problems.push('"UTFPR" fora do rodapé, da página Sobre e do JSON-LD');
  }
  const h1 = (html.match(/<h1\b/g) ?? []).length;
  if (h1 !== 1) problems.push(`${h1} <h1> na página (precisa de exatamente 1)`);
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push('<title> vazio ou ausente');
  if (!/<meta name="description" content="[^"]+">/.test(html)) problems.push('description vazia ou ausente');
  if (path.startsWith('capitulos/')) {
    const found = [...html.matchAll(/<section id="([a-z-]+)" class="tf-view/g)].map((m) => m[1]);
    if (found.join() !== VIEWS.join()) problems.push(`visões fora da ordem ou faltando: ${found.join(', ') || 'nenhuma'}`);
  }
  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt="/.test(img)) problems.push(`<img> sem alt: ${img}`);
  }
  if (html.includes('{{base}}')) problems.push('{{base}} sem processar');
  if (/<!--\s*@(include|render)/.test(html)) problems.push('marca <!-- @… --> sem processar');
  return problems;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dist = resolve(import.meta.dirname, '../dist');
  const pages = globSync('**/*.html', { cwd: dist }).filter((p) => !p.startsWith('pagefind/'));
  let failed = 0;
  for (const page of pages) {
    const problems = checkPage(readFileSync(resolve(dist, page), 'utf8'), page);
    for (const p of problems) console.error(`✗ ${page}: ${p}`);
    if (problems.length) failed += 1;
  }
  console.log(`Saída: ${pages.length - failed}/${pages.length} páginas sem problemas.`);
  process.exit(failed ? 1 : 0);
}
