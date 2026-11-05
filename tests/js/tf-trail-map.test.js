// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { renderTrailMap } from '../../build/render.js';
import { TfMark } from '../../src/js/components/tf-mark.js';
import { TfTrailMap } from '../../src/js/components/tf-trail-map.js';
import { earnMark } from '../../src/js/progress.js';

const parts = [
  { id: 'a', title: 'Parte A', hasMarks: true, chapters: [{ number: 1, slug: '01-x', question: 'Um?' }, { number: 2, slug: '02-y', question: 'Dois?' }] },
  { id: 'b', title: 'Parte B', hasMarks: true, chapters: [{ number: 3, slug: '03-z', question: 'Três?' }] },
  { id: 'extra', title: 'Extra', hasMarks: false, chapters: [{ number: null, slug: 'e', question: 'E?' }] },
];

const page = () => `<tf-trail-map>
  <p data-count></p>
  ${renderTrailMap(parts)}
  <button type="button" data-export>Exportar</button>
  <input type="file" data-import>
  <p data-status aria-live="polite"></p>
</tf-trail-map>`;

beforeAll(() => {
  customElements.define('tf-trail-map', TfTrailMap);
  customElements.define('tf-mark', TfMark);
});
beforeEach(() => localStorage.clear());

describe('renderTrailMap', () => {
  it('tem uma parada por capítulo com marco, um mirante por parte e o cume', () => {
    const html = renderTrailMap(parts);
    expect(html.match(/class="tf-stop"/g)).toHaveLength(3);
    expect(html.match(/data-viewpoint=/g)).toHaveLength(2);
    expect(html).toContain('data-summit');
    expect(html).not.toContain('E?');
  });
});

describe('<tf-trail-map>', () => {
  it('marca as paradas conquistadas, o mirante e a contagem', () => {
    earnMark('01-x', new Date('2026-11-04T12:00:00'));
    earnMark('02-y', new Date('2026-11-05T12:00:00'));
    document.body.innerHTML = page();
    expect(document.querySelector('[data-slug="01-x"]').classList.contains('is-done')).toBe(true);
    expect(document.querySelector('[data-slug="01-x"]').textContent).toContain('04/11/2026');
    expect(document.querySelector('[data-slug="03-z"]').classList.contains('is-done')).toBe(false);
    expect(document.querySelector('[data-viewpoint="a"]').classList.contains('is-done')).toBe(true);
    expect(document.querySelector('[data-viewpoint="b"]').classList.contains('is-done')).toBe(false);
    expect(document.querySelector('[data-summit]').classList.contains('is-done')).toBe(false);
    expect(document.querySelector('[data-count]').textContent).toBe('2 de 3 marcos');
  });

  it('importar um arquivo inválido mostra o erro e mantém o progresso', async () => {
    earnMark('01-x');
    document.body.innerHTML = page();
    const map = document.querySelector('tf-trail-map');
    await map.importText('não é json');
    expect(document.querySelector('[data-status]').textContent).toMatch(/não é um progresso/);
    expect(document.querySelector('[data-count]').textContent).toBe('1 de 3 marcos');
  });

  it('importar um arquivo válido atualiza o mapa', async () => {
    document.body.innerHTML = page();
    const map = document.querySelector('tf-trail-map');
    await map.importText(JSON.stringify({ version: 1, marks: { '03-z': { date: '2026-11-04' } } }));
    expect(document.querySelector('[data-viewpoint="b"]').classList.contains('is-done')).toBe(true);
    expect(document.querySelector('[data-status]').textContent).toBe('Progresso importado.');
  });
});

describe('<tf-mark>', () => {
  it('mostra o marco vazio e atualiza quando o desafio é vencido', () => {
    document.body.innerHTML = '<tf-mark slug="01-x"></tf-mark>';
    const mark = document.querySelector('tf-mark');
    expect(mark.textContent).toContain('ainda não conquistado');
    earnMark('01-x', new Date('2026-11-04T12:00:00'));
    document.dispatchEvent(new CustomEvent('tf-mark-earned', { detail: { slug: '01-x' } }));
    expect(mark.textContent).toContain('Marco conquistado em 04/11/2026');
    expect(mark.classList.contains('is-done')).toBe(true);
  });
});
