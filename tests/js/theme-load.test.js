// @vitest-environment jsdom
// O que o main.js faz no carregamento, sem nenhum clique antes.
import { beforeEach, describe, expect, it, vi } from 'vitest';

let listeners;
let prefersDark;

beforeEach(() => {
  vi.resetModules();
  listeners = [];
  prefersDark = false;
  window.matchMedia = vi.fn(() => ({ get matches() { return prefersDark; }, addEventListener: (_t, fn) => listeners.push(fn) }));
  localStorage.clear();
  vi.restoreAllMocks();
  document.documentElement.setAttribute('data-bs-theme', 'light');
});

describe('initTheme', () => {
  it('visitante novo acompanha o sistema sem ter clicado no botão', async () => {
    const { initTheme } = await import('../../src/js/theme.js');
    initTheme();
    prefersDark = true;
    listeners.forEach((fn) => fn());
    expect(document.documentElement.dataset.bsTheme).toBe('dark');
  });
});

describe('com o armazenamento bloqueado', () => {
  it('o botão ainda troca o tema e o rótulo', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('bloqueado'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('bloqueado'); });
    const { getThemeChoice, initTheme, initThemeToggle } = await import('../../src/js/theme.js');
    initTheme();
    const button = document.createElement('button');
    initThemeToggle(button);
    button.click();
    expect(getThemeChoice()).toBe('light');
    button.click();
    expect(getThemeChoice()).toBe('dark');
    expect(document.documentElement.dataset.bsTheme).toBe('dark');
    expect(button.getAttribute('aria-label')).toContain('escuro');
  });
});
