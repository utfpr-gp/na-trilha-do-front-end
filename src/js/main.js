import '@fontsource-variable/nunito-sans';
import '@fontsource-variable/jetbrains-mono';
import { initThemeToggle } from './theme.js';

document.querySelectorAll('[data-theme-toggle]').forEach(initThemeToggle);
