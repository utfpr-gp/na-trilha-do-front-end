// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { TfCascade, explainWinner, specificity } from '../../src/js/components/tf-cascade.js';

describe('specificity', () => {
  it('conta ids, classes e elementos', () => {
    expect(specificity('h3')).toEqual([0, 0, 1]);
    expect(specificity('.titulo')).toEqual([0, 1, 0]);
    expect(specificity('.cartao .titulo')).toEqual([0, 2, 0]);
    expect(specificity('#trilha-salto')).toEqual([1, 0, 0]);
    expect(specificity('article h3.titulo')).toEqual([0, 1, 2]);
  });
});

const rule = (selector, order, important = false) => ({ selector, order, important, spec: specificity(selector) });

describe('explainWinner', () => {
  it('sem regra, o título herda a cor', () => {
    expect(explainWinner([])).toEqual({ winner: null, reason: 'Nenhuma regra ligada: o título herda a cor do texto da página.' });
  });
  it('maior especificidade vence', () => {
    const r = explainWinner([rule('h3', 1), rule('.titulo', 2)]);
    expect(r.winner.selector).toBe('.titulo');
    expect(r.reason).toBe('Vence .titulo: especificidade (0,1,0), maior que a de h3, (0,0,1).');
  });
  it('mesma especificidade: vence a que vem depois', () => {
    const r = explainWinner([rule('.titulo', 2), rule('.titulo', 3)]);
    expect(r.winner.order).toBe(3);
    expect(r.reason).toBe('Vence a regra 3: tem a mesma especificidade da regra 2, mas vem depois no arquivo.');
  });
  it('!important passa na frente de qualquer especificidade', () => {
    const r = explainWinner([rule('#trilha-salto', 5), rule('h3', 6, true)]);
    expect(r.winner.order).toBe(6);
    expect(r.reason).toBe('Vence h3 !important: o !important passa na frente de #trilha-salto, mesmo com especificidade menor.');
  });
});

const markup = `<tf-cascade>
  <div class="tf-cascade-stage" id="cascata"><article class="cartao"><h3 class="titulo" id="trilha-salto">Trilha do Salto</h3></article></div>
  <ol class="tf-cascade-rules">
    <li data-selector="h3" data-color="var(--tf-brand)" data-on><code>h3 { color: verde-mata; }</code></li>
    <li data-selector=".titulo" data-color="var(--tf-accent)"><code>.titulo { color: terra; }</code></li>
    <li data-selector="h3" data-color="var(--tf-link)" data-important><code>h3 { color: azul !important; }</code></li>
  </ol>
</tf-cascade>`;

beforeAll(() => customElements.define('tf-cascade', TfCascade));

describe('<tf-cascade>', () => {
  it('cria uma caixa por regra, com a especificidade, e anuncia a vencedora', () => {
    document.body.innerHTML = markup;
    const boxes = [...document.querySelectorAll('tf-cascade input[type="checkbox"]')];
    expect(boxes.map((b) => b.checked)).toEqual([true, false, false]);
    expect(document.querySelector('tf-cascade').textContent).toContain('(0,0,1)');
    expect(document.querySelector('[data-cascade-status]').textContent).toBe('Vence h3: é a única regra ligada.');
    boxes[1].checked = true;
    boxes[1].dispatchEvent(new Event('change', { bubbles: true }));
    expect(document.querySelector('[data-cascade-status]').textContent).toContain('Vence .titulo');
  });

  it('escreve as regras ligadas num <style> limitado ao simulador', () => {
    document.body.innerHTML = markup;
    const css = document.querySelector('tf-cascade style').textContent;
    expect(css).toContain('#cascata h3 { color: var(--tf-brand); }');
    expect(css).not.toContain('.titulo');
  });
});
