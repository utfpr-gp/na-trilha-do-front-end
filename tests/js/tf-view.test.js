// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { TfView } from '../../src/js/components/tf-view.js';

describe('<tf-view>', () => {
  it('acrescenta ao título o botão que copia o link da seção', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    document.body.innerHTML = '<tf-view kind="ideia"><section id="ideia"><h2 class="tf-view-title">A ideia</h2></section></tf-view>';
    customElements.define('tf-view', TfView);
    const button = document.querySelector('.tf-view-title button');
    expect(button.getAttribute('aria-label')).toBe('Copiar o link da seção A ideia');
    button.click();
    await Promise.resolve();
    expect(writeText).toHaveBeenCalledWith(`${location.origin}${location.pathname}#ideia`);
  });
});
