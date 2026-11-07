# 🥾 Trilheiro

**Autor:** Roni Fabio Banaszewski

Site responsivo para descobrir e compartilhar trilhas da região de Guarapuava (PR): filtre pela dificuldade, veja fotos, dados do percurso e a previsão do tempo no ponto de partida, leia os relatos de quem já foi e cadastre trilhas novas.

É o app construído passo a passo no livro [*Na Trilha do Front-End*](https://utfpr-gp.github.io/na-trilha-do-front-end/).

🌐 **No ar:** [utfpr-gp.github.io/na-trilha-do-front-end/trilheiro](https://utfpr-gp.github.io/na-trilha-do-front-end/trilheiro/) (no modo publicado: mostra as trilhas, sem cadastrar).

> As trilhas são exemplos inspirados em lugares reais. O Trilheiro não é um guia de segurança.

## 📚 Documentação

- [📄 PRD](docs/prd.md): visão geral, atores, histórias de usuário e regras de negócio.
- [🛠️ Arquitetura](docs/architecture.md): modelo de dados, rotas do json-server, APIs públicas e Web Storage.
- [🎨 Design System](docs/design-system.md): cores, tipografia, componentes do Bootstrap e dos tokens ao código.
- [🖼️ Protótipo navegável](https://claude.ai/artifact/Q3NTpoz8Jtq87mgzywVVYP): as 4 telas, no computador e no celular.
- [✅ Checklist](checklist.md): os itens praticados, com o link para as linhas do código.

## 💻 Tecnologias

- **HTML5, Bootstrap 5.3 e Sass**
- **JavaScript** (módulos ES), **jQuery** e **jQuery Mask Plugin**
- **json-server** (API fake), **Open-Meteo** e **ViaCEP** (APIs públicas)
- **GitHub Pages** (publicação)

## 🚀 Como rodar

Você precisa do [Node.js](https://nodejs.org) e da extensão **Live Server** do VS Code.

```bash
git clone https://github.com/utfpr-gp/na-trilha-do-front-end.git
cd na-trilha-do-front-end/trilheiro
npm i
npm run api      # json-server em http://localhost:3000 (deixe rodando)
```

Em outro terminal, se for mexer no estilo:

```bash
npm run sass:watch   # recompila scss/ em css/main.css a cada mudança
```

Depois, abra o `index.html` com o **Live Server**. Antes de cada commit:

```bash
npm run sass         # o CSS compilado vai para o repositório
npm run format       # Prettier
npm run lint         # ESLint
```

## 📱 Telas

| Início | Trilhas | Detalhe | Cadastrar |
|---|---|---|---|
| Destaques e chamada para as trilhas | Cards com filtro e favoritas | Fotos, dados, previsão e relatos | Formulário com validação |
