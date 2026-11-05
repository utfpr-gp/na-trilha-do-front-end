// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';

const markup = `<tf-steps>
  <section data-step="Um"><h3 class="tf-step-title">Um</h3><p>1</p></section>
  <section data-step="Dois"><h3 class="tf-step-title">Dois</h3><p>2</p></section>
  <section data-step="Três"><h3 class="tf-step-title">Três</h3><p>3</p></section>
</tf-steps>`;

describe('<tf-steps>', () => {
  it('sem o componente definido, os três passos ficam visíveis', () => {
    document.body.innerHTML = markup;
    expect([...document.querySelectorAll('section')].every((s) => !s.hidden)).toBe(true);
  });

  it('definido, vira abas: só o primeiro aparece e a seta leva ao seguinte', async () => {
    document.body.innerHTML = markup;
    const { TfSteps } = await import('../../src/js/components/tf-steps.js');
    customElements.define('tf-steps', TfSteps);
    const sections = [...document.querySelectorAll('section')];
    const tabs = [...document.querySelectorAll('[role="tab"]')];
    expect(document.querySelector('[role="tablist"]')).not.toBeNull();
    expect(tabs.map((t) => t.textContent)).toEqual(['Um', 'Dois', 'Três']);
    expect(sections.map((s) => s.hidden)).toEqual([false, true, true]);
    tabs[0].focus();
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(sections.map((s) => s.hidden)).toEqual([true, false, true]);
    tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    expect(document.activeElement).toBe(tabs[2]);
  });
});
