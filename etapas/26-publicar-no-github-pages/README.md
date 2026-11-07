# Etapa 26: o Trilheiro publicado

Para rodar, dois terminais:

```bash
npm install
npm run api      # json-server em http://localhost:3000, a partir do db.json
```

e o Live Server para as páginas.

Publicado no GitHub Pages (Settings → Pages → Deploy from a branch → `main`, `/ (root)`), o site funciona sem servidor nenhum.

- `js/api.js`: escolhe o modo pelo endereço. Em `localhost` ou `127.0.0.1`, o json-server; em qualquer outro, lê o `db.json` (só leitura, com o `_embed` feito no JavaScript). `canWrite()` e a mensagem do `architecture.md`.
- `cadastrar.html` + `js/trail-form.js`: no modo publicado, o aviso no alto e o botão "Salvar trilha" desligado.
- `trilha.html` + `js/trail-detail.js`: no modo publicado, o botão "Conte como foi" dá lugar ao aviso.
- O JavaScript do Bootstrap 5.3.8 e os Bootstrap Icons 1.13.2 vêm do CDN: nenhuma página aponta mais para a `node_modules`.
- `img/favicon.svg`: o ícone da aba.
- Para ver o modo publicado no seu computador: pare o json-server e troque por um momento o `LOCAL` do `api.js` por `false`.
