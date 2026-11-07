/**
 * <tf-lint-lab>: o mesmo arquivo com defeitos, visto de três jeitos: como foi escrito, depois do
 * Prettier e com o relatório do ESLint. As saídas são as do Prettier 3.9 e do ESLint 10 de verdade,
 * com a configuração da etapa 25.
 */
const ORIGINAL = `let total = 0
function statusText(count){
  if (count == 0) return "Nenhuma trilha."
  return \`\${count} trilhas\`
}
const trailList=document.querySelector('#trail-list')
trailList.textContent=statusText(trails.length)
console.log("pronto")`;

const PRETTIER = `let total = 0;
function statusText(count) {
  if (count == 0) return 'Nenhuma trilha.';
  return \`\${count} trilhas\`;
}
const trailList = document.querySelector('#trail-list');
trailList.textContent = statusText(trails.length);
console.log('pronto');`;

const ESLINT = `js/exemplo.js
  1:5   error    'total' is assigned a value but never used                                   no-unused-vars
  1:5   error    'total' is never reassigned. Use 'const' instead                             prefer-const
  3:13  error    Expected '===' and instead saw '=='                                          eqeqeq
  7:34  error    'trails' is not defined                                                      no-undef
  8:1   warning  Unexpected console statement. Only these console methods are allowed: error  no-console

✖ 5 problems (4 errors, 1 warning)`;

const VIEWS = [
  { label: 'O código', text: ORIGINAL, note: 'Funciona? Talvez. Está bagunçado e tem defeitos escondidos.' },
  { label: 'npx prettier', text: PRETTIER, note: 'Mudou a aparência: espaços, aspas e ponto e vírgula. Os defeitos continuam.' },
  { label: 'npx eslint', text: ESLINT, note: 'Nada mudou no arquivo: o ESLint só avisa. 4 erros e 1 aviso.' },
];

export class TfLintLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('pre')) return;
    const name = `lint-${Math.random().toString(36).slice(2, 6)}`;
    const buttons = VIEWS.map((view, index) => `
        <input type="radio" class="btn-check" name="${name}" id="${name}-${index}" value="${index}"${index === 0 ? ' checked' : ''}>
        <label class="btn btn-outline-primary btn-sm" for="${name}-${index}">${view.label}</label>`).join('');
    this.innerHTML = `
      <div class="btn-group flex-wrap" role="group" aria-label="Ver o arquivo">${buttons}
      </div>
      <pre class="tf-lint-text"></pre>
      <output aria-live="polite"></output>`;
    this.pre = this.querySelector('pre');
    this.out = this.querySelector('output');
    this.addEventListener('change', () => this.update());
    this.update();
  }

  update() {
    const view = VIEWS[Number(this.querySelector('input:checked').value)];
    this.pre.textContent = view.text;
    this.out.textContent = view.note;
  }
}
