// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';
import { TfFlexLab } from '../../src/js/components/tf-flex-lab.js';

const markup = `<tf-flex-lab>
  <div class="tf-flex-stage" data-flex-stage><span>A</span><span>B</span><span>C</span></div>
</tf-flex-lab>`;

beforeAll(() => customElements.define('tf-flex-lab', TfFlexLab));

describe('<tf-flex-lab>', () => {
  it('cria um seletor por propriedade, com rótulo, e começa com display: flex', () => {
    document.body.innerHTML = markup;
    const selects = [...document.querySelectorAll('tf-flex-lab select')];
    expect(selects.map((s) => s.labels[0].textContent)).toEqual(['flex-direction', 'justify-content', 'align-items', 'flex-wrap', 'gap']);
    expect(document.querySelector('[data-flex-stage]').style.display).toBe('flex');
  });

  it('trocar um valor aplica no contêiner e atualiza o CSS mostrado', () => {
    document.body.innerHTML = markup;
    const justify = [...document.querySelectorAll('tf-flex-lab select')].find((s) => s.labels[0].textContent === 'justify-content');
    justify.value = 'space-between';
    justify.dispatchEvent(new Event('change', { bubbles: true }));
    expect(document.querySelector('[data-flex-stage]').style.justifyContent).toBe('space-between');
    expect(document.querySelector('tf-flex-lab pre').textContent).toContain('justify-content: space-between;');
  });

  it('o CSS mostrado só lista o que difere do padrão', () => {
    document.body.innerHTML = markup;
    const css = document.querySelector('tf-flex-lab pre').textContent;
    expect(css).toBe('.contêiner {\n  display: flex;\n}');
  });
});
