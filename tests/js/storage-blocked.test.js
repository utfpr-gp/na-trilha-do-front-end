// @vitest-environment jsdom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { TfChallenge } from '../../src/js/components/tf-challenge.js';
import { earnMark, importProgress } from '../../src/js/progress.js';

const blockWrites = () => vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('cheio'); });

beforeAll(() => customElements.define('tf-challenge', TfChallenge));
beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe('quando o navegador não deixa gravar', () => {
  it('earnMark não diz que deu o marco', () => {
    blockWrites();
    expect(earnMark('01-x')).toBe(false);
  });

  it('importar avisa que não guardou', () => {
    blockWrites();
    const result = importProgress(JSON.stringify({ version: 1, marks: {} }));
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/não deixou guardar/);
  });

  it('o desafio não anuncia um marco que não foi guardado', () => {
    blockWrites();
    document.body.innerHTML = `<tf-challenge slug="01-x" award>
      <fieldset data-correct="a"><legend>P</legend><label><input type="radio" name="q" value="a" checked> A</label></fieldset>
      <button type="button" data-check hidden>Conferir</button><p data-status aria-live="polite"></p></tf-challenge>`;
    document.querySelector('[data-check]').click();
    expect(document.querySelector('[data-status]').textContent).toBe('Tudo certo! Este navegador não deixou guardar o marco.');
  });
});
