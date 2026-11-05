import { describe, expect, it } from 'vitest';
import { checkPairs, contrastRatio, parsePalette } from '../../scripts/check-contrast.mjs';

describe('contrastRatio', () => {
  it('preto sobre branco dá 21', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1);
  });
  it('é simétrico', () => {
    expect(contrastRatio('#2F5D3A', '#FAF7F0')).toBeCloseTo(contrastRatio('#FAF7F0', '#2F5D3A'), 5);
  });
});

describe('parsePalette', () => {
  it('lê as variáveis e ignora comentários', () => {
    const scss = '// $tf-x-light: #000000;\n$tf-verde-mata-light: #2F5D3A;\n/* nada */\n$tf-papel-dark:#121815;';
    expect(parsePalette(scss)).toEqual({ 'tf-verde-mata-light': '#2F5D3A', 'tf-papel-dark': '#121815' });
  });
});

describe('checkPairs', () => {
  it('reprova par abaixo de 4,5', () => {
    const palette = { a: '#777777', b: '#FFFFFF', c: '#000000' };
    const result = checkPairs(palette, [['a', 'b'], ['c', 'b']]);
    expect(result[0].ok).toBe(false);
    expect(result[1].ok).toBe(true);
  });
  it('lança erro com cor que não existe na paleta', () => {
    expect(() => checkPairs({}, [['x', 'y']])).toThrow('x');
  });
});
