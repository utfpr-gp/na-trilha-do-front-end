// @vitest-environment jsdom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { TfFetchLab, LATENCY } from '../../src/js/components/tf-fetch-lab.js';

beforeAll(() => customElements.define('tf-fetch-lab', TfFetchLab));
beforeEach(() => {
  vi.useFakeTimers();
  document.body.innerHTML = '<tf-fetch-lab></tf-fetch-lab>';
});
afterEach(() => vi.useRealTimers());

const $ = (sel) => document.querySelector(`tf-fetch-lab ${sel}`);
const log = () => [...document.querySelectorAll('tf-fetch-lab ol li')].map((li) => li.textContent);
const send = (index) => {
  $('select').selectedIndex = index;
  $('button').click();
};

describe('<tf-fetch-lab>', () => {
  it('tem um select de pedidos com rótulo e um botão de enviar', () => {
    expect($('select').labels[0].textContent).toBe('Pedido');
    expect($('select').options[0].textContent).toBe('GET /trilhas');
    expect($('button').textContent).toBe('Enviar');
  });

  it('mostra a ordem: o fetch sai, o código seguinte roda, e só depois a resposta chega', () => {
    send(0);
    expect(log()).toEqual([
      "1. fetch('http://localhost:3000/trilhas') saiu",
      '2. a linha depois do fetch já rodou (sem esperar)',
    ]);
    expect($('output').textContent).toBe('Aguardando a resposta…');
    vi.advanceTimersByTime(LATENCY);
    expect(log()[2]).toBe('3. a resposta chegou: 200 OK');
    expect($('output').textContent).toContain("nome: 'Trilha do Salto'");
  });

  it('a trilha com _embed traz os relatos dentro', () => {
    send(1);
    vi.advanceTimersByTime(LATENCY);
    expect($('output').textContent).toContain("relatos: [{ nome: 'Ana' }, { nome: 'Bruno' }]");
  });

  it('id inexistente: 404, e o fetch não lança erro sozinho', () => {
    send(2);
    vi.advanceTimersByTime(LATENCY);
    expect(log()[2]).toBe('3. a resposta chegou: 404 Not Found (response.ok é false)');
  });

  it('o filtro pela URL volta vazio (o defeito do json-server com ids em texto)', () => {
    send(3);
    vi.advanceTimersByTime(LATENCY);
    expect($('output').textContent).toBe('[]');
  });

  it('o POST responde 201, com o id gerado pelo servidor', () => {
    send(4);
    vi.advanceTimersByTime(LATENCY);
    expect(log()[2]).toBe('3. a resposta chegou: 201 Created');
    expect($('output').textContent).toMatch(/id: '\w+'/);
  });

  it('o botão fica desligado enquanto espera', () => {
    send(0);
    expect($('button').disabled).toBe(true);
    vi.advanceTimersByTime(LATENCY);
    expect($('button').disabled).toBe(false);
  });
});
