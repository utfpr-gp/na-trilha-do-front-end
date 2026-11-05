import '@fontsource-variable/nunito-sans';
import '@fontsource-variable/jetbrains-mono';
import { TfCode } from './components/tf-code.js';
import { TfSteps } from './components/tf-steps.js';
import { TfView } from './components/tf-view.js';
import { initThemeToggle } from './theme.js';

document.querySelectorAll('[data-theme-toggle]').forEach(initThemeToggle);

customElements.define('tf-code', TfCode);
customElements.define('tf-steps', TfSteps);
customElements.define('tf-view', TfView);
