// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { TfClassToggle } from '../../src/js/components/tf-class-toggle.js';

const markup = `<tf-class-toggle>
  <div class="tf-sim-stage">
    <article class="card" data-sim-classes="card">
      <div class="card-body" data-sim-classes="card-body">
        <a href="#" class="btn btn-primary" data-sim-classes="btn btn-primary">Ver trilha</a>
      </div>
    </article>
  </div>
</tf-class-toggle>`;

beforeAll(() => customElements.define('tf-class-toggle', TfClassToggle));

describe('<tf-class-toggle>', () => {
  it('cria uma caixa marcada para cada classe, com rótulo', () => {
    document.body.innerHTML = markup;
    const boxes = [...document.querySelectorAll('input[type="checkbox"]')];
    expect(boxes.map((b) => b.labels[0].textContent.trim())).toEqual(['.card', '.card-body', '.btn', '.btn-primary']);
    expect(boxes.every((b) => b.checked)).toBe(true);
  });

  it('desmarcar tira a classe do elemento, atualiza o código e anuncia', () => {
    document.body.innerHTML = markup;
    const box = [...document.querySelectorAll('input[type="checkbox"]')].find((b) => b.value === 'card-body');
    box.checked = false;
    box.dispatchEvent(new Event('change', { bubbles: true }));
    expect(document.querySelector('[data-sim-classes="card-body"]').classList.contains('card-body')).toBe(false);
    expect(document.querySelector('.tf-sim-code').textContent).not.toContain('card-body');
    expect(document.querySelector('.tf-sim-code').textContent).toContain('class="card"');
    expect(document.querySelector('tf-class-toggle [aria-live]').textContent).toBe('Classe card-body removida.');
    box.checked = true;
    box.dispatchEvent(new Event('change', { bubbles: true }));
    expect(document.querySelector('[data-sim-classes="card-body"]').classList.contains('card-body')).toBe(true);
    expect(document.querySelector('tf-class-toggle [aria-live]').textContent).toBe('Classe card-body de volta.');
  });

  it('o código mostrado não traz os atributos do simulador', () => {
    document.body.innerHTML = markup;
    expect(document.querySelector('.tf-sim-code').textContent).not.toContain('data-sim');
  });
});
