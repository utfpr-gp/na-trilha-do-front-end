# Etapa 22: máscaras no cadastro

- `cadastrar.html` carrega, pelo CDN e nesta ordem, o jQuery 4.0.0 e o jQuery Mask Plugin 1.14.16 (as versões do `architecture.md`), antes do `js/trail-form.js`.
- `js/trail-form.js`: `$('#cep').mask('00000-000')` e `$('#guiaTelefone').mask('(00) 00000-0000')`. A pessoa digita só os números; letras não entram. A validação do capítulo 20 continua igual.
- As outras páginas não carregam o jQuery.
