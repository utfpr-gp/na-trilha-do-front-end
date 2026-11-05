const name = prompt('Qual é o seu nome?');      // abre uma caixa para digitar; devolve o texto (ou null)
const going = confirm(`${name}, vai fazer a trilha hoje?`); // OK = true, Cancelar = false
alert(going ? 'Boa caminhada!' : 'Fica para a próxima.');  // só mostra uma mensagem
