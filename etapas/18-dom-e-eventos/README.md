# Etapa 18: a página muda com o JavaScript

- Página nova, `trilhas.html`, com todas as trilhas e o filtro **Todas / Fácil / Moderada / Difícil / Favoritas** (um grupo de botões de rádio do Bootstrap, `.btn-check`).
- `js/trails.js`: encontra os elementos com `querySelector`, esconde os cartões fora do filtro (`hidden`), lê a dificuldade em `data-dificuldade` (`dataset`), conta as trilhas visíveis e escreve o total com `textContent`.
- O botão de favorito troca o ícone (`classList.toggle`), o `aria-pressed` e o `aria-label`. Um ouvinte só, na lista (delegação de eventos, com `closest`), cuida de todos os botões.
- As favoritas ainda se perdem ao recarregar a página: elas passam a ficar guardadas no navegador no capítulo 21.
- O menu e o link "Ver todas as trilhas" levam à nova página.
