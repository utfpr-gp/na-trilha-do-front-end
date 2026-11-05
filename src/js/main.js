import '@fontsource-variable/nunito-sans';
import '@fontsource-variable/jetbrains-mono';
import { TfCascade } from './components/tf-cascade.js';
import { TfChallenge } from './components/tf-challenge.js';
import { TfClassToggle } from './components/tf-class-toggle.js';
import { TfCode } from './components/tf-code.js';
import { TfGridSim } from './components/tf-grid-sim.js';
import { TfMark } from './components/tf-mark.js';
import { TfSteps } from './components/tf-steps.js';
import { TfTokenLab } from './components/tf-token-lab.js';
import { TfTrailMap } from './components/tf-trail-map.js';
import { TfView } from './components/tf-view.js';
import { initTheme, initThemeToggle } from './theme.js';

initTheme();
document.querySelectorAll('[data-theme-toggle]').forEach(initThemeToggle);

customElements.define('tf-code', TfCode);
customElements.define('tf-steps', TfSteps);
customElements.define('tf-view', TfView);
customElements.define('tf-challenge', TfChallenge);
customElements.define('tf-mark', TfMark);
customElements.define('tf-trail-map', TfTrailMap);
customElements.define('tf-class-toggle', TfClassToggle);
customElements.define('tf-cascade', TfCascade);
customElements.define('tf-token-lab', TfTokenLab);
customElements.define('tf-grid-sim', TfGridSim);
