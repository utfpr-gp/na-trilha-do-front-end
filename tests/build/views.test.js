import { describe, expect, it } from 'vitest';
import { expandViews } from '../../build/views.js';

describe('expandViews', () => {
  it('<tf-view> vira uma seção com o id do kind e o título em <h2>', () => {
    const out = expandViews('<tf-view kind="armadilhas" title="Armadilhas"><p>x</p></tf-view>');
    expect(out).toContain('<section id="armadilhas" class="tf-view tf-view-armadilhas"');
    expect(out).toContain('<h2 class="tf-view-title" id="titulo-armadilhas"><span aria-hidden="true">⚠️</span> Armadilhas</h2>');
    expect(out).toContain('<p>x</p>');
  });

  it('recusa um kind desconhecido', () => {
    expect(() => expandViews('<tf-view kind="resumo" title="R"></tf-view>')).toThrow('resumo');
  });

  it('<tf-analogy> ganha o título visível', () => {
    const out = expandViews('<tf-analogy emoji="🥾" title="A bota certa"><p>y</p></tf-analogy>');
    expect(out).toContain('<p class="tf-box-title"><span aria-hidden="true">🥾</span> A bota certa</p>');
  });

  it('<tf-pitfall> mostra o título e a mensagem exata, escapada', () => {
    const out = expandViews('<tf-pitfall title="Classe errada" message="Error: <col> & mais"><p>z</p></tf-pitfall>');
    expect(out).toContain('<p class="tf-box-title">Classe errada</p>');
    expect(out).toContain('<pre class="tf-pitfall-message"><code>Error: &lt;col&gt; &amp; mais</code></pre>');
  });

  it('cada passo de <tf-steps> ganha o título em <h3>, para ler sem JavaScript', () => {
    const out = expandViews('<tf-steps><section data-step="Abra o arquivo"><p>a</p></section></tf-steps>');
    expect(out).toContain('<section data-step="Abra o arquivo"><h3 class="tf-step-title">Abra o arquivo</h3><p>a</p></section>');
  });
});
