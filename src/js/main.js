import '@fontsource-variable/nunito-sans';
import '@fontsource-variable/jetbrains-mono';
import { TfCode } from './components/tf-code.js';
import { initThemeToggle } from './theme.js';

document.querySelectorAll('[data-theme-toggle]').forEach(initThemeToggle);

customElements.define('tf-code', TfCode);
