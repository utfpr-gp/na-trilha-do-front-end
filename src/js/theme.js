import { safeStorage } from './storage.js';

const KEY = 'trilha:tema';
const CHOICES = ['light', 'dark', 'system'];
const LABELS = {
  light: 'Tema claro. Mudar para o escuro',
  dark: 'Tema escuro. Mudar para seguir o sistema',
  system: 'Tema do sistema. Mudar para o claro',
};
const QUERY = '(prefers-color-scheme: dark)';
let listening = false;

export function resolveTheme(choice, prefersDark) {
  if (choice === 'light' || choice === 'dark') return choice;
  return prefersDark ? 'dark' : 'light';
}

export function getThemeChoice() {
  const saved = safeStorage.get(KEY);
  return CHOICES.includes(saved) ? saved : 'system';
}

function apply() {
  const theme = resolveTheme(getThemeChoice(), window.matchMedia(QUERY).matches);
  document.documentElement.setAttribute('data-bs-theme', theme);
}

export function setThemeChoice(choice) {
  safeStorage.set(KEY, choice);
  if (!listening) {
    window.matchMedia(QUERY).addEventListener('change', () => {
      if (getThemeChoice() === 'system') apply();
    });
    listening = true;
  }
  apply();
}

export function initThemeToggle(button) {
  const label = () => button.setAttribute('aria-label', LABELS[getThemeChoice()]);
  label();
  button.addEventListener('click', () => {
    const next = CHOICES[(CHOICES.indexOf(getThemeChoice()) + 1) % CHOICES.length];
    setThemeChoice(next);
    label();
  });
}
