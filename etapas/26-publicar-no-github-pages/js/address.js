// O endereço pelo CEP (ViaCEP) e as coordenadas da cidade (Open-Meteo), architecture.md, seções 7.2 e 7.3.
const TIMEOUT_MS = 8000;

// Os nomes dos estados, como a geocodificação da Open-Meteo os escreve (no campo admin1).
const STATES = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
};

export class CepNotFoundError extends Error {}

export async function lookupCep(cep) {
  const digits = cep.replace(/\D/g, ''); // o ViaCEP quer só os 8 dígitos
  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (response.status === 400) throw new CepNotFoundError(`CEP em formato errado: ${cep}`);
  if (!response.ok) throw new Error(`O ViaCEP respondeu ${response.status}`);
  const data = await response.json();
  // CEP que não existe: status 200, mas o corpo é { "erro": "true" }. Olhar só o status não basta.
  if (data.erro) throw new CepNotFoundError(`CEP não encontrado: ${cep}`);
  return { cidade: data.localidade, uf: data.uf, bairro: data.bairro };
}

// As coordenadas do centro da cidade, ou null se não achar. Pode haver cidades com o mesmo nome
// em estados diferentes: fica com a do estado certo.
export async function findCityCoordinates(cidade, uf) {
  const params = new URLSearchParams({ name: cidade, count: 5, language: 'pt', countryCode: 'BR' });
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) return null;
  const data = await response.json();
  const place = (data.results ?? []).find((result) => result.admin1 === STATES[uf]); // sem resultados, não há results
  return place ? { latitude: place.latitude, longitude: place.longitude } : null;
}
