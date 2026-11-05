const cep = document.querySelector('#cep');
cep.value = '8501';

cep.validity.valid;            // false
cep.validity.patternMismatch;  // true: não combina com o pattern
cep.validity.valueMissing;     // false: não está vazio
cep.validationMessage;         // a mensagem que o navegador mostraria no balão
cep.checkValidity();           // false, sem mostrar nada
cep.reportValidity();          // false, e mostra o balão junto do campo
