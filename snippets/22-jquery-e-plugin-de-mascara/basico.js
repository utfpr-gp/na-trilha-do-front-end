// $ é a função do jQuery: recebe um seletor CSS e devolve os elementos, embrulhados
$('#cep').val();                 // lê o valor do campo
$('#cep').val('85010-260');      // muda o valor
$('.card-title').text();         // o texto do primeiro
$('.btn-favorite').addClass('active'); // em TODOS os que combinam, sem forEach

// Eventos
$('#trail-list').on('click', '.btn-favorite', function () {
  $(this).toggleClass('active'); // a delegação do capítulo 18, num argumento só
});

// Encadeamento: cada método devolve os mesmos elementos
$('#aviso').text('Tudo certo!').fadeIn();
