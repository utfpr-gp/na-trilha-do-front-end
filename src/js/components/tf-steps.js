/** <tf-steps>: sem JavaScript, os passos aparecem em sequência; com ele, viram abas. */
export class TfSteps extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('[role="tablist"]')) return;
    const panels = [...this.querySelectorAll(':scope > section[data-step]')];
    if (panels.length < 2) return;
    const id = `passos-${Math.random().toString(36).slice(2, 8)}`;
    const list = document.createElement('div');
    list.setAttribute('role', 'tablist');
    list.className = 'tf-steps-tabs';
    this.tabs = panels.map((panel, i) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.id = `${id}-aba-${i}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `${id}-painel-${i}`);
      tab.textContent = panel.dataset.step;
      panel.id = `${id}-painel-${i}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.querySelector(':scope > .tf-step-title')?.setAttribute('hidden', '');
      tab.addEventListener('click', () => this.select(i));
      tab.addEventListener('keydown', (e) => this.onKey(e, i));
      list.append(tab);
      return tab;
    });
    this.panels = panels;
    this.prepend(list);
    this.select(0, false);
  }

  select(index, focus = true) {
    this.tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      this.panels[i].hidden = !on;
    });
    if (focus) this.tabs[index].focus();
  }

  onKey(event, i) {
    const n = this.tabs.length;
    const moves = { ArrowRight: i + 1, ArrowLeft: i - 1 + n, Home: 0, End: n - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    this.select(moves[event.key] % n);
  }
}
