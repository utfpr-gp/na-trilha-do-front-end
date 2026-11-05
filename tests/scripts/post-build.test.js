import { describe, expect, it } from 'vitest';
import { buildRobots, buildSitemap, pageUrl } from '../../scripts/post-build.mjs';

const SITE = 'https://utfpr-gp.github.io/na-trilha-do-front-end/';

describe('pageUrl', () => {
  it('transforma o caminho do arquivo no endereço da página', () => {
    expect(pageUrl('index.html', SITE)).toBe(SITE);
    expect(pageUrl('como-ler/index.html', SITE)).toBe(`${SITE}como-ler/`);
  });
});

describe('buildSitemap', () => {
  it('lista as páginas com a URL completa e sem a 404', () => {
    const xml = buildSitemap(['index.html', 'caderneta/index.html', '404.html'], SITE);
    expect(xml).toContain(`<loc>${SITE}</loc>`);
    expect(xml).toContain(`<loc>${SITE}caderneta/</loc>`);
    expect(xml).not.toContain('404');
    expect(xml.startsWith('<?xml')).toBe(true);
  });
});

describe('buildRobots', () => {
  it('libera tudo e aponta para o sitemap', () => {
    expect(buildRobots(SITE)).toBe(`User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`);
  });
});
