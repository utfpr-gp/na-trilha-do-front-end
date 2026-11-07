import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { APP_FILES, copyApp } from '../../scripts/post-build.mjs';

function fakeApp() {
  const src = mkdtempSync(join(tmpdir(), 'trilheiro-'));
  for (const file of ['index.html', 'trilhas.html', 'trilha.html', 'cadastrar.html', 'db.json', 'mirante.svg', 'package.json', 'checklist.md']) {
    writeFileSync(join(src, file), file);
  }
  for (const dir of ['css', 'js', 'img/trilhas', 'scss', 'node_modules/bootstrap', 'docs']) {
    mkdirSync(join(src, dir), { recursive: true });
    writeFileSync(join(src, dir, 'x.txt'), dir);
  }
  return src;
}

describe('copyApp (o Trilheiro publicado junto com o livro)', () => {
  it('copia só o que o site precisa: as páginas, os dados, o CSS compilado, o JavaScript e as imagens', () => {
    const src = fakeApp();
    const dest = join(mkdtempSync(join(tmpdir(), 'dist-')), 'trilheiro');
    copyApp(src, dest);
    for (const entry of APP_FILES) expect(existsSync(join(dest, entry))).toBe(true);
    expect(readFileSync(join(dest, 'img/trilhas/x.txt'), 'utf8')).toBe('img/trilhas');
  });

  it('deixa de fora o código-fonte e as ferramentas: scss, node_modules, docs, package.json', () => {
    const src = fakeApp();
    const dest = join(mkdtempSync(join(tmpdir(), 'dist-')), 'trilheiro');
    copyApp(src, dest);
    for (const left of ['scss', 'node_modules', 'docs', 'package.json', 'checklist.md']) {
      expect(existsSync(join(dest, left))).toBe(false);
    }
  });
});
