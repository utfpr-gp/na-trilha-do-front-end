// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { TfPathLab } from '../../src/js/components/tf-path-lab.js';

beforeAll(() => customElements.define('tf-path-lab', TfPathLab));
beforeEach(() => {
  document.body.innerHTML = '<tf-path-lab></tf-path-lab>';
});

const $ = (sel) => document.querySelector(`tf-path-lab ${sel}`);
const typeHref = (value) => {
  $('input').value = value;
  $('input').dispatchEvent(new Event('input'));
};

describe('<tf-path-lab>', () => {
  it('mostra a página publicada e o caminho, com rótulo', () => {
    expect($('code').textContent).toBe('https://ana.github.io/trilheiro/trilha.html');
    expect($('input').labels[0].textContent).toBe('href="…"');
    expect($('input').value).toBe('css/main.css');
  });

  it('caminho relativo fica dentro da pasta do projeto', () => {
    expect($('output').textContent).toBe('→ https://ana.github.io/trilheiro/css/main.css ✓ dentro do projeto');
  });

  it('caminho com barra no começo sai do projeto', () => {
    typeHref('/css/main.css');
    expect($('output').textContent).toBe('→ https://ana.github.io/css/main.css ✗ fora do projeto: 404');
  });

  it('node_modules dentro do projeto, mas que não foi para o GitHub', () => {
    typeHref('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
    expect($('output').textContent).toBe(
      '→ https://ana.github.io/trilheiro/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js ✗ a node_modules não vai para o GitHub: 404',
    );
  });

  it('endereço completo, como o de um CDN, vale como está', () => {
    typeHref('https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js');
    expect($('output').textContent).toBe(
      '→ https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js ✓ outro site (um CDN)',
    );
  });
});
