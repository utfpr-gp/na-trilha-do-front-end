// $.getJSON: um GET que já devolve o JSON lido
$.getJSON('http://localhost:3000/trilhas', (data) => {
  console.log(data.length);
});

// $.ajax: o pedido completo, aqui um POST
$.ajax({
  url: 'http://localhost:3000/relatos',
  method: 'POST',
  contentType: 'application/json',
  data: JSON.stringify({ trilhaId: '1', nome: 'Ana', nota: 5 }),
}).done((report) => console.log(report.id));
