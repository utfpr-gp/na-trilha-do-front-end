/**
 * <tf-cep-lab>: consulta o ViaCEP de verdade e mostra o pedido, o status, o corpo da resposta
 * e o que ele quer dizer. Serve para ver que "status 200" nem sempre é "deu certo".
 */
export class TfCepLab extends HTMLElement {
  connectedCallback() {
    if (this.querySelector('form')) return;
    const id = `cep-${Math.random().toString(36).slice(2, 6)}`;
    this.innerHTML = `
      <form class="tf-grid-controls">
        <label for="${id}">CEP</label>
        <input class="form-control w-auto" id="${id}" value="85010-260" inputmode="numeric" autocomplete="off">
        <button type="submit" class="btn btn-primary">Consultar</button>
      </form>
      <p class="small mb-0"><code></code></p>
      <p class="small mb-0">Status: <strong data-status>–</strong></p>
      <pre class="tf-cep-body"></pre>
      <output aria-live="polite"></output>`;
    this.input = this.querySelector('input');
    this.code = this.querySelector('code');
    this.status = this.querySelector('[data-status]');
    this.body = this.querySelector('pre');
    this.out = this.querySelector('output');
    this.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.consult();
    });
  }

  async consult() {
    const url = `https://viacep.com.br/ws/${this.input.value.replace(/\D/g, '')}/json/`;
    this.code.textContent = `GET ${url}`;
    this.status.textContent = 'Consultando…';
    this.body.textContent = '';
    this.out.textContent = '';
    try {
      const response = await fetch(url);
      this.status.textContent = String(response.status);
      if (response.status === 400) {
        this.out.textContent = '400: o ViaCEP recusou o formato. Mande 8 dígitos.';
        return;
      }
      const data = await response.json();
      this.body.textContent = JSON.stringify(data, null, 2);
      this.out.textContent = data.erro
        ? 'Status 200, mas o corpo diz { "erro": "true" }: o CEP não existe.'
        : `Encontrado: ${data.localidade}, ${data.uf}${data.bairro ? `, bairro ${data.bairro}` : ''}.`;
    } catch (error) {
      this.status.textContent = 'sem resposta';
      this.out.textContent = `O pedido falhou (${error.name}: ${error.message}). Sem internet, ou o serviço fora do ar.`;
    }
  }
}
