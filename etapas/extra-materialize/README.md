# Extra: o Trilheiro em outros frameworks

A vitrine do Início (menu, banner, três cartões e as dicas de segurança num modal), com as cores do design system, em dois outros frameworks CSS, pelo CDN. Abra pelo Live Server.

- `materialize.html`: Materialize 2.4.0 (`@materializecss/materialize`, a continuação da comunidade; o `materialize-css` original parou na 1.0.0, de 2018). Tema pelas variáveis do Material Design 3, menu com a marcação da versão 2 (`nav navbar` + `nav-wrapper primary`), menu do celular com `M.Sidenav.init`, modal com o `<dialog>` do navegador.
- `bulma.html`: Bulma 1.0.4, só CSS. Tema por `--bulma-primary-h/s/l` e `--bulma-primary-invert-l`; o botão do menu do celular é ligado por um JavaScript curto.
- Problemas encontrados e contornados no Materialize 2.4.0: a documentação mostra `btn filled`, mas o CSS só tem `btn-filled`; uma regra de cor dos links com uma função do Sass não compilada (`colorFunc`); o `.nav-wrapper` vencendo o `.primary` na cascata; e a margem negativa do primeiro link do `card-action`.
- As duas páginas passam no axe-core 4.14 sem problemas.
