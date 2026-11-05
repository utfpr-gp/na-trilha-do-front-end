// O glossário do livro. Termo novo de um capítulo entra aqui, com o número do capítulo onde aparece.
export const GLOSSARY = [
  { id: 'framework-css', term: 'framework CSS', definition: 'Conjunto pronto de estilos, grid e componentes (como o Bootstrap) que você aplica com classes no HTML, em vez de escrever todo o CSS do zero.', chapter: 1 },
  { id: 'cdn', term: 'CDN', definition: 'Content Delivery Network: uma rede de servidores espalhados pelo mundo que serve arquivos prontos, como o CSS do Bootstrap, a partir do servidor mais perto de quem acessa.', chapter: 1 },
  { id: 'npm', term: 'npm', definition: 'O gerenciador de pacotes que vem com o Node.js: baixa bibliotecas como o Bootstrap para a pasta node_modules e anota no package.json o que o projeto usa.', chapter: 2 },
  { id: 'package-json', term: 'package.json', definition: 'A carteira de identidade do projeto: nome, versão, scripts e a lista das bibliotecas de que ele depende, com as versões aceitas.', chapter: 2 },
  { id: 'commit', term: 'commit', definition: 'Uma fotografia do projeto guardada pelo Git, com uma mensagem que diz o que mudou, o autor e a data. Dá para voltar a qualquer commit.', chapter: 2 },
  { id: 'cascata', term: 'cascata', definition: 'A forma como o CSS decide qual regra vale quando várias dão valores diferentes à mesma propriedade: primeiro a importância, depois a especificidade, por fim a ordem.', chapter: 3 },
  { id: 'especificidade', term: 'especificidade', definition: 'O peso de um seletor, contado em ids, classes e elementos. Entre duas regras em conflito, vence a de maior especificidade.', chapter: 3 },
  { id: 'token', term: 'token de acesso pessoal', definition: 'Uma senha longa, gerada pelo GitHub, que substitui a senha da conta no terminal. Vale só para os repositórios e as permissões escolhidos, e por um tempo limitado.', chapter: 2 },
  { id: 'prd', term: 'PRD', definition: 'Product Requirements Document: o documento curto que diz o que o produto faz, para quem e por quê, com as histórias de usuário, as regras de negócio e o que fica fora do escopo.', chapter: 4 },
  { id: 'historia-de-usuario', term: 'história de usuário', definition: 'Uma necessidade escrita do ponto de vista de quem usa: "Como [ator], quero [ação], para [motivo]", seguida de critérios de aceitação que dá para conferir com sim ou não.', chapter: 4 },
  { id: 'design-token', term: 'design token', definition: 'Uma decisão de design com nome, como a cor principal ou o tamanho dos títulos, guardada num só lugar e usada no site inteiro.', chapter: 6 },
  { id: 'breakpoint', term: 'breakpoint', definition: 'A largura de tela a partir da qual o layout muda. No Bootstrap, sm, md, lg, xl e xxl são os breakpoints.', chapter: 7 },
  { id: 'componente', term: 'componente', definition: 'Uma peça de interface pronta e reutilizável, como um card, uma navbar ou um modal, montada com HTML e classes do framework.', chapter: 9 },
];
