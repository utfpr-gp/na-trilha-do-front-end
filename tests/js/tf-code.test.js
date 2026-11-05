// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { TfCode } from '../../src/js/components/tf-code.js';

beforeAll(() => customElements.define('tf-code', TfCode));

describe('<tf-code>', () => {
  it('acrescenta o botão Copiar, que copia o código e anuncia', async () => {
    const writeText = vi.fn(() => Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    document.body.innerHTML = '<tf-code><figure><pre class="shiki"><code><span class="line">&lt;p&gt;oi&lt;/p&gt;</span></code></pre></figure></tf-code>';
    const button = document.querySelector('tf-code button');
    expect(button.textContent).toBe('Copiar');
    button.click();
    await Promise.resolve();
    await Promise.resolve();
    expect(writeText).toHaveBeenCalledWith('<p>oi</p>');
    expect(document.querySelector('tf-code [aria-live]').textContent).toBe('Copiado!');
  });
});
