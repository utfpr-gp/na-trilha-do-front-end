import { describe, expect, it } from 'vitest';
import { applySeo } from '../../build/seo.js';

const SITE = 'https://utfpr-gp.github.io/na-trilha-do-front-end/';
const page = (meta) => `<html><head>${meta}</head><body></body></html>`;

describe('applySeo', () => {
  it('gera o título, a descrição, a URL canônica e o Open Graph', () => {
    const out = applySeo(page('<meta name="tf-title" content="Glossário"><meta name="tf-description" content="Os termos & as siglas.">'), { path: '/glossario/index.html', siteUrl: SITE });
    expect(out).toContain('<title>Glossário · Na Trilha do Front-End</title>');
    expect(out).toContain('<meta name="description" content="Os termos &amp; as siglas.">');
    expect(out).toContain(`<link rel="canonical" href="${SITE}glossario/">`);
    expect(out).toContain(`<meta property="og:image" content="${SITE}og.png">`);
    expect(out).not.toContain('tf-title');
    expect(out).not.toContain('application/ld+json');
  });

  it('na página inicial, o título é só o nome do livro, com o JSON-LD do livro', () => {
    const out = applySeo(page('<meta name="tf-title" content="Na Trilha do Front-End"><meta name="tf-description" content="Livro.">'), { path: '/index.html', siteUrl: SITE });
    expect(out).toContain('<title>Na Trilha do Front-End</title>');
    expect(out).toContain('"@type":"Book"');
    expect(out).toContain('UTFPR');
  });

  it('num capítulo, o título vem da pergunta do catálogo', () => {
    const out = applySeo(page('<meta name="tf-chapter" content="13-personalizar-o-bootstrap-com-sass">'), { path: '/capitulos/13-personalizar-o-bootstrap-com-sass/index.html', siteUrl: SITE });
    expect(out).toContain('<title>Como personalizar o Bootstrap com Sass? · Na Trilha do Front-End</title>');
    expect(out).toContain('<meta name="description" content="Capítulo 13: Como personalizar o Bootstrap com Sass?">');
  });

  it('página sem título declarado é erro de build', () => {
    expect(() => applySeo(page(''), { path: '/x/index.html', siteUrl: SITE })).toThrow('/x/index.html');
  });
});
