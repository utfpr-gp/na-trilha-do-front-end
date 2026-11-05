// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { TfEventLog } from '../../src/js/components/tf-event-log.js';

beforeAll(() => customElements.define('tf-event-log', TfEventLog));

beforeEach(() => {
  document.body.innerHTML = '<tf-event-log></tf-event-log>';
});

const lines = () => [...document.querySelectorAll('tf-event-log li')].map((li) => li.textContent);

describe('<tf-event-log>', () => {
  it('monta um cartão de exemplo com botão de favorito e um registro vazio', () => {
    const el = document.querySelector('tf-event-log');
    expect(el.querySelector('.btn-favorite i')).not.toBeNull();
    expect(el.querySelector('ol').getAttribute('aria-live')).toBe('polite');
    expect(lines()).toEqual([]);
  });

  it('clique no ícone: o target é o <i>, e o closest encontra o botão', () => {
    document.querySelector('tf-event-log .btn-favorite i').click();
    expect(lines()[0]).toBe("click · target: <i> · closest('.btn-favorite'): <button>");
  });

  it('clique no título: o closest não encontra botão nenhum', () => {
    document.querySelector('tf-event-log h3').click();
    expect(lines()[0]).toBe("click · target: <h3> · closest('.btn-favorite'): null");
  });

  it('digitar no campo registra o evento input com o valor', () => {
    const input = document.querySelector('tf-event-log input');
    input.value = 'Sa';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(lines()[0]).toBe('input · target: <input> · value: "Sa"');
  });

  it('o mais novo fica em cima, e o registro guarda só os 5 últimos', () => {
    const h3 = document.querySelector('tf-event-log h3');
    for (let i = 0; i < 6; i++) h3.click();
    document.querySelector('tf-event-log .btn-favorite').click();
    expect(lines()).toHaveLength(5);
    expect(lines()[0]).toContain('target: <button>');
  });
});
