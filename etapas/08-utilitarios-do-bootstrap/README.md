# Etapa 08: utilitários do Bootstrap

O CSS próprio encolhe, e o HTML ganha classes utilitárias:

- **Rodapé no fim da tela:** `d-flex flex-column min-vh-100` no `<body>` e `flex-grow-1` no `<main>`.
- **Espaçamentos:** `py-4 px-3` no cabeçalho, `py-5` no conteúdo, `py-3 px-3` no rodapé, `mb-0` e `mb-3` nos títulos.
- **Alinhamento:** o título da seção e o link "Ver todas as trilhas" na mesma linha, com `d-flex justify-content-between align-items-baseline`.
- **Visibilidade:** o link só aparece a partir do sm (`d-none d-sm-inline`).
- **Texto:** `small text-body-secondary` nos dados da trilha.
