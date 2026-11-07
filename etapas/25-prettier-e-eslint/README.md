# Etapa 25: código padronizado

Para rodar, dois terminais:

```bash
npm install
npm run api      # json-server em http://localhost:3000, a partir do db.json
```

e o Live Server para as páginas.

- Prettier 3.9.10 (`.prettierrc.json`, `.prettierignore`) formata o JavaScript e o Sass; o HTML, o Markdown, os dados e os arquivos gerados ficam de fora.
- ESLint 10.13.0 (`eslint.config.mjs`) com as regras recomendadas, mais `eqeqeq`, `prefer-const` e `no-console`; o `$` do jQuery e o `bootstrap` declarados como globais.
- Scripts: `npm run format`, `npm run format:check` e `npm run lint`. Os dois passam limpos.
- `.vscode/settings.json` formata ao salvar; `.vscode/extensions.json` sugere as extensões Prettier, ESLint e Live Server.
- O código do app é o da etapa 24, só formatado.
