/**
 * <tf-fetch-lab>: um json-server de mentira, para ver um pedido sair, o código seguir em frente
 * e a resposta chegar depois. As respostas são as que o json-server 1.0.0-beta.15 deu de verdade.
 */
import { show } from './tf-array-lab.js';

export const LATENCY = 900;
const API = 'http://localhost:3000';

const REQUESTS = [
  {
    label: 'GET /trilhas',
    path: '/trilhas',
    status: '200 OK',
    body: [
      { id: '1', nome: 'Trilha do Salto' },
      { id: '2', nome: 'Caminho das Araucárias' },
      { id: '3', nome: 'Mirante da Serra' },
      { id: '4', nome: 'Escadaria do Salto' },
    ],
  },
  {
    label: 'GET /trilhas/1?_embed=relatos',
    path: '/trilhas/1?_embed=relatos',
    status: '200 OK',
    body: { id: '1', nome: 'Trilha do Salto', relatos: [{ nome: 'Ana' }, { nome: 'Bruno' }] },
  },
  {
    label: 'GET /trilhas/99',
    path: '/trilhas/99',
    status: '404 Not Found (response.ok é false)',
    body: '(corpo vazio)',
  },
  {
    label: 'GET /relatos?trilhaId=1',
    path: '/relatos?trilhaId=1',
    status: '200 OK',
    body: [],
  },
  {
    label: 'POST /relatos',
    path: '/relatos',
    status: '201 Created',
    body: { trilhaId: '1', nome: 'Júlia', nota: 4, id: 'C0AzfdBxcfM' },
  },
];

export class TfFetchLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('select')) return;
    const id = `fx-${Math.random().toString(36).slice(2, 6)}`;
    this.innerHTML = `
      <div class="tf-grid-controls">
        <label for="${id}">Pedido</label>
        <select class="form-select w-auto" id="${id}"></select>
        <button type="button" class="btn btn-primary">Enviar</button>
      </div>
      <ol class="tf-fetch-log" aria-live="polite"></ol>
      <pre class="tf-fetch-body"><output></output></pre>`;
    this.select = this.querySelector('select');
    REQUESTS.forEach((request, index) => this.select.add(new Option(request.label, String(index))));
    this.button = this.querySelector('button');
    this.list = this.querySelector('ol');
    this.out = this.querySelector('output');
    this.button.addEventListener('click', () => this.send());
  }

  log(text) {
    const li = document.createElement('li');
    li.textContent = text;
    this.list.append(li);
  }

  send() {
    const request = REQUESTS[Number(this.select.value)];
    this.list.replaceChildren();
    this.button.disabled = true;
    this.log(`1. fetch('${API}${request.path}') saiu`);
    this.out.textContent = 'Aguardando a resposta…';
    setTimeout(() => {
      this.log(`3. a resposta chegou: ${request.status}`);
      this.out.textContent = typeof request.body === 'string' ? request.body : show(request.body);
      this.button.disabled = false;
    }, LATENCY);
    this.log('2. a linha depois do fetch já rodou (sem esperar)');
  }
}
