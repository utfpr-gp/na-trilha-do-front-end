$('#cep').value;   // undefined: o $() devolve um objeto do jQuery, não o elemento
$('#cep').val();   // o valor, pelo método do jQuery
$('#cep')[0];      // o elemento do DOM, "desembrulhado"
