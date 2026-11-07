# Etapa 24: previsão do tempo e endereço pelo CEP

Para rodar, dois terminais:

```bash
npm install
npm run api      # json-server em http://localhost:3000, a partir do db.json
```

e o Live Server para as páginas.

- `js/weather.js`: a previsão de 3 dias pela Open-Meteo, com tempo-limite (`AbortSignal.timeout`).
- `trilha.html` + `js/trail-detail.js`: a caixa "Previsão do tempo", com "Dados: Open-Meteo". Sem coordenadas, carregando ou com falha, o aviso aparece só nela, e o resto da página segue (RN07).
- `js/address.js`: o ViaCEP (com a conferência do `{ "erro": "true" }`) e as coordenadas da cidade pela geocodificação da Open-Meteo, escolhendo a cidade do estado certo.
- `cadastrar.html` + `js/trail-form.js`: com o CEP completo, preenche a cidade, a UF e o bairro (que continuam editáveis); se não achar, avisa "CEP não encontrado". Ao salvar, grava a latitude e a longitude da cidade, quando encontradas.
- O resto é a etapa 23: `db.json`, `api.js`, o detalhe dinâmico e o relato.
