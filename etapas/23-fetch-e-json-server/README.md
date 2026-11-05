# Etapa 23: os dados vêm do servidor

Para rodar, dois terminais:

```bash
npm install
npm run api      # json-server em http://localhost:3000, a partir do db.json
```

e o Live Server para as páginas.

- `db.json`: as quatro trilhas, com todos os campos do dicionário de dados do `architecture.md`, e alguns relatos.
- `js/api.js`: o único arquivo que fala com o servidor (`getTrails`, `getTrail` com `?_embed=relatos`, `createTrail`, `createReport`). Um 404 vira `NotFoundError`.
- `js/home.js` e `js/trails.js`: buscam as trilhas com `await`, com aviso de carregamento e mensagem de falha (`js/feedback.js`).
- `trilha.html` + `js/trail-detail.js`: o detalhe da trilha do endereço (`trilha.html?id=3`), com o carrossel das fotos, o guia, o que levar, o favorito e os relatos; o modal publica um relato com `POST`.
- `js/trail-form.js`: com tudo válido, grava a trilha com `POST` e leva ao detalhe dela.
- `.vscode/settings.json`: o Live Server ignora o `db.json`, que o json-server reescreve a cada gravação.
- `js/data.js` saiu.
