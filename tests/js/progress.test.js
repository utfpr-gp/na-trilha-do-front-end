// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  KEY, earnMark, exportProgress, hasMark, importProgress, loadProgress, partStatus, reachedSummit,
} from '../../src/js/progress.js';

const parts = [
  { id: 'a', hasMarks: true, chapters: [{ slug: '01-x' }, { slug: '02-y' }] },
  { id: 'b', hasMarks: true, chapters: [{ slug: '03-z' }] },
  { id: 'extra', hasMarks: false, chapters: [{ slug: 'extra-1' }] },
];

beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe('loadProgress', () => {
  it('começa vazio sem nada guardado', () => {
    expect(loadProgress()).toEqual({ version: 1, marks: {} });
  });
  it('começa vazio com JSON corrompido ou versão diferente', () => {
    localStorage.setItem(KEY, '{');
    expect(loadProgress().marks).toEqual({});
    localStorage.setItem(KEY, JSON.stringify({ version: 2, marks: { '01-x': { date: '2026-01-01' } } }));
    expect(loadProgress().marks).toEqual({});
  });
  it('começa vazio quando o armazenamento está bloqueado', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('bloqueado'); });
    expect(loadProgress().marks).toEqual({});
  });
});

describe('earnMark', () => {
  it('dá o marco só no primeiro acerto e guarda a primeira data', () => {
    expect(earnMark('01-x', new Date('2026-11-04T12:00:00'))).toBe(true);
    expect(earnMark('01-x', new Date('2026-12-25T12:00:00'))).toBe(false);
    expect(loadProgress().marks['01-x']).toEqual({ date: '2026-11-04' });
    expect(hasMark('01-x')).toBe(true);
    expect(hasMark('02-y')).toBe(false);
  });
});

describe('partStatus e reachedSummit', () => {
  it('a parte completa dá o mirante; as partes sem marco ficam de fora', () => {
    earnMark('01-x');
    earnMark('02-y');
    const status = partStatus(parts, loadProgress());
    expect(status).toEqual([
      { id: 'a', done: 2, total: 2, viewpoint: true },
      { id: 'b', done: 0, total: 1, viewpoint: false },
    ]);
    expect(reachedSummit(parts, loadProgress())).toBe(false);
    earnMark('03-z');
    expect(reachedSummit(parts, loadProgress())).toBe(true);
  });
});

describe('exportar e importar', () => {
  it('importar o que foi exportado volta ao mesmo estado', () => {
    earnMark('01-x', new Date('2026-11-04T12:00:00'));
    const file = exportProgress();
    localStorage.clear();
    expect(importProgress(file)).toEqual({ ok: true });
    expect(loadProgress().marks).toEqual({ '01-x': { date: '2026-11-04' } });
  });
  it('arquivo inválido dá erro e mantém o progresso atual', () => {
    earnMark('01-x');
    const result = importProgress('{');
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/arquivo/i);
    expect(hasMark('01-x')).toBe(true);
  });
  it('arquivo com formato errado dá erro', () => {
    expect(importProgress(JSON.stringify({ version: 1, marks: { '01-x': { date: 'ontem' } } })).ok).toBe(false);
    expect(importProgress(JSON.stringify([1, 2])).ok).toBe(false);
  });
});
