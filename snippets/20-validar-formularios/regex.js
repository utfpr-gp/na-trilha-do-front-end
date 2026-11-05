const CEP = /^\d{5}-?\d{3}$/;
//  ^       começa aqui (nada antes)
//  \d{5}   cinco dígitos
//  -?      um hífen, que pode faltar (o ? quer dizer "zero ou um")
//  \d{3}   três dígitos
//  $       termina aqui (nada depois)

CEP.test('85010-260');  // true
CEP.test('85010260');   // true
CEP.test('8501-0260');  // false

'85010-260'.replace(/\D/g, '');  // '85010260': \D é "não dígito", e o g troca todos
