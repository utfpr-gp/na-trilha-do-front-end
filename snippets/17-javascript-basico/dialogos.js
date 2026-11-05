const nome = prompt('Qual é o seu nome?');      // abre uma caixa para digitar; devolve o texto (ou null)
const vai = confirm(`${nome}, vai fazer a trilha hoje?`); // OK = true, Cancelar = false
alert(vai ? 'Boa caminhada!' : 'Fica para a próxima.');  // só mostra uma mensagem
