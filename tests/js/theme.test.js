// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getThemeChoice, initThemeToggle, resolveTheme, setThemeChoice } from '../../src/js/theme.js';

// Uma página tem uma só MediaQueryList; os ouvintes registrados valem para os testes seguintes.
const listeners = [];
let prefersDark;

beforeEach(() => {
  prefersDark = false;
  window.matchMedia = vi.fn(() => ({
    get matches() { return prefersDark; },
    addEventListener: (_type, fn) => listeners.push(fn),
  }));
  localStorage.clear();
  document.documentElement.removeAttribute('data-bs-theme');
});

afterEach(() => vi.restoreAllMocks());

describe('resolveTheme', () => {
  it('segue o sistema quando a escolha é system', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
    expect(resolveTheme('light', true)).toBe('light');
  });
});

describe('getThemeChoice', () => {
  it('devolve system quando o armazenamento lança exceção', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('bloqueado'); });
    expect(getThemeChoice()).toBe('system');
  });
  it('devolve system para valor desconhecido', () => {
    localStorage.setItem('trilha:tema', 'roxo');
    expect(getThemeChoice()).toBe('system');
  });
});

describe('setThemeChoice', () => {
  it('aplica o tema no <html> e guarda a escolha', () => {
    setThemeChoice('dark');
    expect(document.documentElement.dataset.bsTheme).toBe('dark');
    expect(localStorage.getItem('trilha:tema')).toBe('dark');
  });
  it('com system, acompanha a troca do sistema sem recarregar', () => {
    setThemeChoice('system');
    expect(document.documentElement.dataset.bsTheme).toBe('light');
    prefersDark = true;
    listeners.forEach((fn) => fn());
    expect(document.documentElement.dataset.bsTheme).toBe('dark');
  });
  it('com escolha fixa, ignora a troca do sistema', () => {
    setThemeChoice('light');
    prefersDark = true;
    listeners.forEach((fn) => fn());
    expect(document.documentElement.dataset.bsTheme).toBe('light');
  });
});

describe('initThemeToggle', () => {
  it('alterna claro → escuro → sistema e atualiza o rótulo', () => {
    const button = document.createElement('button');
    setThemeChoice('light');
    initThemeToggle(button);
    expect(button.getAttribute('aria-label')).toContain('claro');
    button.click();
    expect(getThemeChoice()).toBe('dark');
    button.click();
    expect(getThemeChoice()).toBe('system');
    button.click();
    expect(getThemeChoice()).toBe('light');
  });
});
