/**
 * <tf-cascade>: o simulador da cascata. Cada regra da lista ganha uma caixa;
 * as regras ligadas viram um <style> de verdade, e o texto explica quem venceu e por quê.
 */

/** Especificidade de seletores simples: [ids, classes, elementos]. */
export function specificity(selector) {
  const ids = (selector.match(/#[\w-]+/g) ?? []).length;
  const classes = (selector.match(/\.[\w-]+/g) ?? []).length;
  const elements = selector
    .split(/\s+/)
    .filter((part) => /^[a-z]/i.test(part)).length;
  return [ids, classes, elements];
}

const fmt = (spec) => `(${spec.join(',')})`;
const label = (r) => `${r.selector}${r.important ? ' !important' : ''}`;

function compare(a, b) {
  if (a.important !== b.important) return a.important ? 1 : -1;
  for (let i = 0; i < 3; i++) if (a.spec[i] !== b.spec[i]) return a.spec[i] - b.spec[i];
  return a.order - b.order;
}

/** A regra vencedora entre as ligadas, e o motivo, comparando com a segunda colocada. */
export function explainWinner(rules) {
  if (rules.length === 0) return { winner: null, reason: 'Nenhuma regra ligada: o título herda a cor do texto da página.' };
  const sorted = [...rules].sort(compare);
  const winner = sorted.at(-1);
  if (sorted.length === 1) return { winner, reason: `Vence ${label(winner)}: é a única regra ligada.` };
  const second = sorted.at(-2);
  let reason;
  if (winner.important !== second.important) {
    reason = `Vence ${label(winner)}: o !important passa na frente de ${label(second)}, mesmo com especificidade menor.`;
  } else if (fmt(winner.spec) !== fmt(second.spec)) {
    reason = `Vence ${label(winner)}: especificidade ${fmt(winner.spec)}, maior que a de ${label(second)}, ${fmt(second.spec)}.`;
  } else {
    reason = `Vence a regra ${winner.order}: tem a mesma especificidade da regra ${second.order}, mas vem depois no arquivo.`;
  }
  if (winner.important && second.important && fmt(winner.spec) === fmt(second.spec)) {
    reason = `Vence a regra ${winner.order}: as duas têm !important e a mesma especificidade, e ela vem depois no arquivo.`;
  }
  return { winner, reason };
}

export class TfCascade extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('[data-cascade-status]')) return;
    this.stage = this.querySelector('.tf-cascade-stage');
    const items = [...this.querySelectorAll('.tf-cascade-rules > li')];
    this.rules = items.map((li, i) => {
      const r = {
        order: i + 1,
        selector: li.dataset.selector,
        color: li.dataset.color,
        important: li.hasAttribute('data-important'),
      };
      r.spec = specificity(r.selector);
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = li.hasAttribute('data-on');
      box.addEventListener('change', () => this.update());
      r.box = box;
      const lab = document.createElement('label');
      const code = li.querySelector('code');
      const tag = document.createElement('span');
      tag.className = 'tf-cascade-spec';
      tag.textContent = fmt(r.spec);
      lab.append(box, ' ', code, ' ', tag);
      li.replaceChildren(lab);
      return r;
    });
    this.style_ = document.createElement('style');
    this.status = document.createElement('p');
    this.status.className = 'tf-cascade-status';
    this.status.dataset.cascadeStatus = '';
    this.status.setAttribute('aria-live', 'polite');
    this.append(this.style_, this.status);
    this.update();
  }

  update() {
    const on = this.rules.filter((r) => r.box.checked);
    const scope = `#${this.stage.id}`;
    this.style_.textContent = on
      .map((r) => `${scope} ${r.selector} { color: ${r.color}${r.important ? ' !important' : ''}; }`)
      .join('\n');
    this.status.textContent = explainWinner(on).reason;
  }
}
