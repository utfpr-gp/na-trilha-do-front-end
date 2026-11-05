// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { TfChallenge } from '../../src/js/components/tf-challenge.js';
import { hasMark } from '../../src/js/progress.js';

const markup = (award = 'award') => `<tf-challenge slug="01-x" ${award}>
  <fieldset data-correct="b"><legend>P1</legend>
    <label><input type="radio" name="q1" value="a"> A</label>
    <label><input type="radio" name="q1" value="b"> B</label>
    <p data-explain="a" hidden>Por que não é A.</p>
  </fieldset>
  <fieldset data-correct="a"><legend>P2</legend>
    <label><input type="radio" name="q2" value="a"> A</label>
    <label><input type="radio" name="q2" value="b"> B</label>
    <p data-explain="b" hidden>Por que não é B.</p>
  </fieldset>
  <button type="button" data-check hidden>Conferir</button>
  <p data-status aria-live="polite"></p>
</tf-challenge>`;

const pick = (name, value) => { document.querySelector(`input[name="${name}"][value="${value}"]`).checked = true; };
const check = () => document.querySelector('[data-check]').click();
const status = () => document.querySelector('[data-status]').textContent;

beforeAll(() => customElements.define('tf-challenge', TfChallenge));
beforeEach(() => localStorage.clear());

describe('<tf-challenge>', () => {
  it('mostra o botão Conferir só quando o componente funciona', () => {
    document.body.innerHTML = markup();
    expect(document.querySelector('[data-check]').hidden).toBe(false);
  });

  it('pergunta em branco: avisa e não dá o marco', () => {
    document.body.innerHTML = markup();
    pick('q1', 'b');
    check();
    expect(document.querySelectorAll('fieldset')[1].textContent).toContain('Escolha uma alternativa');
    expect(hasMark('01-x')).toBe(false);
  });

  it('resposta errada mostra a explicação da alternativa escolhida', () => {
    document.body.innerHTML = markup();
    pick('q1', 'a');
    pick('q2', 'a');
    check();
    expect(document.querySelector('[data-explain="a"]').hidden).toBe(false);
    expect(document.querySelector('[data-explain="b"]').hidden).toBe(true);
    expect(status()).toContain('1 de 2');
    expect(hasMark('01-x')).toBe(false);
  });

  it('tudo certo dá o marco, anuncia e avisa a página', () => {
    document.body.innerHTML = markup();
    const listener = vi.fn();
    document.addEventListener('tf-mark-earned', listener);
    pick('q1', 'b');
    pick('q2', 'a');
    check();
    expect(hasMark('01-x')).toBe(true);
    expect(status()).toBe('Marco conquistado!');
    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0].detail).toEqual({ slug: '01-x' });
    document.removeEventListener('tf-mark-earned', listener);
  });

  it('sem award, não grava nada', () => {
    document.body.innerHTML = markup('');
    pick('q1', 'b');
    pick('q2', 'a');
    check();
    expect(hasMark('01-x')).toBe(false);
    expect(status()).toBe('Tudo certo!');
  });
});
