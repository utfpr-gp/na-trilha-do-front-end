# Extra: o Trilheiro em Tailwind

A vitrine do Início (menu, banner e três cartões), com o design system do Trilheiro, em Tailwind 4.3.3.

```bash
npm install
npm run css        # gera css/tailwind.css (comprimido) a partir de css/input.css e do HTML
npm run css:watch  # refaz o CSS a cada mudança, durante o trabalho
```

- `css/input.css`: `@import "tailwindcss"` e o `@theme` com as cores e as fontes do design system (`--color-verde-mata` gera `bg-verde-mata`, `text-verde-mata`…).
- `index.html`: a página montada só com classes utilitárias; o menu do celular abre com um JavaScript curto.
- O `css/tailwind.css` gerado tem 10,7 KB: só as classes que a página usa.
- Conferida no Chrome (captura de tela, menu do celular, 320 px sem rolagem lateral) e no axe-core 4.14, sem problemas.
