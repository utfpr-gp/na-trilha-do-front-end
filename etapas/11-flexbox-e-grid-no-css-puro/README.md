# Etapa 11: Flexbox e Grid no CSS puro

Três layouts feitos à mão, sem classes do framework, em `css/style.css`:

- **Rodapé** (`.site-footer`): três blocos lado a lado com Flexbox (`display: flex`, `flex-wrap`, `justify-content: space-between`, `gap`), que se empilham no celular.
- **"O que levar"** (`.chips`, no `trilha.html`): etiquetas que quebram linha quando não cabem.
- **Dados da trilha** (`.dados`): rótulo e valor em duas colunas com CSS Grid (`grid-template-columns: max-content 1fr`).
