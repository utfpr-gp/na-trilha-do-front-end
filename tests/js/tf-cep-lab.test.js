// @vitest-environment jsdom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { TfCepLab } from '../../src/js/components/tf-cep-lab.js';

beforeAll(() => customElements.define('tf-cep-lab', TfCepLab));
beforeEach(() => {
  document.body.innerHTML = '<tf-cep-lab></tf-cep-lab>';
});
afterEach(() => vi.unstubAllGlobals());

const $ = (sel) => document.querySelector(`tf-cep-lab ${sel}`);
const respond = (status, body) => vi.stubGlobal('fetch', vi.fn(async () => ({
  status,
  ok: status >= 200 && status < 300,
  json: async () => body,
})));
const consult = async (cep) => {
  $('input').value = cep;
  $('form').dispatchEvent(new Event('submit', { cancelable: true }));
  await vi.waitFor(() => expect($('[data-status]').textContent).not.toBe('Consultando…'));
};

describe('<tf-cep-lab>', () => {
  it('tem um campo com rótulo, um CEP de exemplo e o botão', () => {
    expect($('input').labels[0].textContent).toBe('CEP');
    expect($('input').value).toBe('85010-260');
    expect($('button').textContent).toBe('Consultar');
  });

  it('CEP encontrado: pede só os dígitos, mostra o status, o corpo e a leitura', async () => {
    respond(200, { cep: '85010-260', localidade: 'Guarapuava', uf: 'PR', bairro: 'Centro' });
    await consult('85010-260');
    expect(fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/85010260/json/');
    expect($('code').textContent).toBe('GET https://viacep.com.br/ws/85010260/json/');
    expect($('[data-status]').textContent).toBe('200');
    expect($('pre').textContent).toContain('"localidade": "Guarapuava"');
    expect($('output').textContent).toBe('Encontrado: Guarapuava, PR, bairro Centro.');
  });

  it('CEP que não existe: 200, mas com erro no corpo', async () => {
    respond(200, { erro: 'true' });
    await consult('99999-999');
    expect($('[data-status]').textContent).toBe('200');
    expect($('output').textContent).toBe('Status 200, mas o corpo diz { "erro": "true" }: o CEP não existe.');
  });

  it('formato errado: 400', async () => {
    respond(400, null);
    await consult('123');
    expect($('[data-status]').textContent).toBe('400');
    expect($('output').textContent).toBe('400: o ViaCEP recusou o formato. Mande 8 dígitos.');
  });

  it('sem rede: avisa e não quebra', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('Failed to fetch'); }));
    await consult('85010-260');
    expect($('[data-status]').textContent).toBe('sem resposta');
    expect($('output').textContent).toBe('O pedido falhou (TypeError: Failed to fetch). Sem internet, ou o serviço fora do ar.');
  });
});
