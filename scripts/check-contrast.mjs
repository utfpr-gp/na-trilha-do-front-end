// Confere o contraste (WCAG AA, 4,5:1) dos pares de cores da paleta, nos dois modos.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { contrastRatio } from '../src/js/contrast.js';

const MIN = 4.5;

export function parsePalette(scss) {
  const clean = scss.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  const palette = {};
  for (const [, name, hex] of clean.matchAll(/\$([\w-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g)) palette[name] = hex;
  return palette;
}

export { contrastRatio };

export function checkPairs(palette, pairs) {
  return pairs.map(([fg, bg]) => {
    for (const name of [fg, bg]) if (!palette[name]) throw new Error(`Cor fora da paleta: ${name}`);
    const ratio = contrastRatio(palette[fg], palette[bg]);
    return { pair: [fg, bg], ratio, ok: ratio >= MIN };
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dir = import.meta.dirname;
  const palette = parsePalette(readFileSync(resolve(dir, '../src/scss/_palette.scss'), 'utf8'));
  const { pairs } = JSON.parse(readFileSync(resolve(dir, 'contrast-pairs.json'), 'utf8'));
  const expanded = pairs.flatMap(([fg, bg]) => ['light', 'dark'].map((m) => [`tf-${fg}-${m}`, `tf-${bg}-${m}`]));
  const results = checkPairs(palette, expanded);
  const bad = results.filter((r) => !r.ok);
  for (const r of bad) console.error(`✗ ${r.pair[0]} sobre ${r.pair[1]}: ${r.ratio.toFixed(2)}`);
  console.log(`Contraste: ${results.length - bad.length}/${results.length} pares passam (mínimo ${MIN}:1).`);
  process.exit(bad.length ? 1 : 0);
}
