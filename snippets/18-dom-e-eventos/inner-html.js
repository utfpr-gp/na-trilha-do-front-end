const name = '<img src=x onerror="alert(1)">'; // um "nome" digitado por alguém mal-intencionado

title.innerHTML = name;   // o navegador interpreta como HTML: a imagem quebra e o alert roda
title.textContent = name; // aparece como texto, do jeito que foi digitado: seguro
