# Etapa 20: o cadastro valida os dados

- Página nova, `cadastrar.html`, com os campos do dicionário de dados do `architecture.md`, em quatro grupos (`fieldset`). O menu "Cadastrar trilha" aponta para ela.
- As regras do PRD (RN01 a RN05) em atributos: `required`, `minlength`/`maxlength`, `min`/`max`/`step`, `pattern` (CEP, UF, telefone) e o `max` da data, preenchido com o dia de hoje pelo JavaScript.
- `js/trail-form.js`: troca as mensagens do navegador pelas do Trilheiro com `setCustomValidity`, confere a regra do nome com letras por expressão regular, mostra cada erro abaixo do campo (`.is-invalid` e `.invalid-feedback`) só depois que o campo foi tocado, e leva o foco ao primeiro erro ao salvar.
- Com tudo certo, monta o objeto da trilha (CEP sempre como `00000-000`) e mostra "Tudo certo com a trilha…". A trilha passa a ser gravada no capítulo 23.
- `scss/_theme.scss`: `$danger` no vermelho de "Difícil"; `scss/_form.scss`: o formulário sobre a superfície branca.
