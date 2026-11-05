import { resolve } from 'node:path';
import { compile } from 'sass';
import { describe, expect, it } from 'vitest';

const css = compile(resolve(import.meta.dirname, '../../src/scss/main.scss'), {
  loadPaths: [resolve(import.meta.dirname, '../../node_modules')],
  quietDeps: true,
  silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
  style: 'compressed',
}).css;

describe('estilos compilados', () => {
  it('no modo escuro, o botão de contorno usa o token da terra (o Bootstrap fixa a cor clara)', () => {
    expect(css).toMatch(/\[data-bs-theme=dark\] \.btn-outline-secondary\{[^}]*--bs-btn-color:\s*var\(--tf-accent\)/);
    expect(css).toMatch(/\[data-bs-theme=dark\] \.btn-outline-secondary\{[^}]*--bs-btn-border-color:\s*var\(--tf-accent\)/);
  });

  it('o rótulo do "Importar progresso" mostra o foco do campo escondido', () => {
    expect(css).toMatch(/\.tf-transfer label:focus-within\{[^}]*outline/);
  });
});
