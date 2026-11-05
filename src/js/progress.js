// Os marcos de quem lê, guardados só no navegador.
import { safeStorage } from './storage.js';

export const KEY = 'trilha:progresso';
const VERSION = 1;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const empty = () => ({ version: VERSION, marks: {} });

function isValid(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  if (data.version !== VERSION || !data.marks || typeof data.marks !== 'object' || Array.isArray(data.marks)) return false;
  return Object.values(data.marks).every((m) => m && typeof m.date === 'string' && DATE.test(m.date));
}

export function loadProgress() {
  try {
    const data = JSON.parse(safeStorage.get(KEY) ?? 'null');
    return isValid(data) ? data : empty();
  } catch {
    return empty();
  }
}

function save(progress) {
  return safeStorage.set(KEY, JSON.stringify(progress));
}

function localDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Dá o marco. Devolve true só no primeiro acerto, que guarda a data. */
export function earnMark(slug, date = new Date()) {
  const progress = loadProgress();
  if (progress.marks[slug]) return false;
  progress.marks[slug] = { date: localDate(date) };
  save(progress);
  return true;
}

export function hasMark(slug) {
  return Boolean(loadProgress().marks[slug]);
}

export function partStatus(parts, progress) {
  return parts
    .filter((p) => p.hasMarks)
    .map((p) => {
      const done = p.chapters.filter((c) => progress.marks[c.slug]).length;
      return { id: p.id, done, total: p.chapters.length, viewpoint: done === p.chapters.length };
    });
}

export function reachedSummit(parts, progress) {
  return partStatus(parts, progress).every((s) => s.viewpoint);
}

export function exportProgress() {
  return JSON.stringify(loadProgress(), null, 2);
}

export function importProgress(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, error: 'Este arquivo não é um progresso da caderneta.' };
  }
  if (!isValid(data)) return { ok: false, error: 'Este arquivo não é um progresso da caderneta.' };
  save(data);
  return { ok: true };
}
