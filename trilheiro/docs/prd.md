# 📄 PRD (Product Requirements Document) do Trilheiro

## 1. Visão geral e objetivo

O **Trilheiro** é um site responsivo para descobrir e compartilhar trilhas da região de Guarapuava (PR). Quem visita escolhe uma trilha pela dificuldade e pela distância, vê as fotos, os dados do percurso e a previsão do tempo no ponto de partida, e lê os relatos de quem já foi. Quem conhece uma trilha que ainda não está no site pode cadastrá-la.

**O problema que ele resolve:** hoje, a informação sobre as trilhas da região está espalhada em grupos de mensagens e perfis de redes sociais, sem um jeito simples de comparar dificuldade e distância nem de saber como estará o tempo no dia.

**Aviso:** os dados das trilhas são de exemplo, inspirados em lugares reais. O Trilheiro não é um guia de segurança. Distâncias e percursos não são exatos.

## 2. Público e atores

- **Visitante:** quem procura uma trilha para o fim de semana. Usa principalmente o celular, muitas vezes já no caminho. É o ator principal: o site inteiro funciona sem cadastro nem login.
- **Colaborador:** um visitante que conhece uma trilha e quer cadastrá-la, ou que já foi a uma trilha e quer deixar um relato. Não precisa de conta.
- **Serviços externos:** a **Open-Meteo**, que informa a previsão do tempo, e o **ViaCEP**, que completa o endereço a partir do CEP. Os dois são gratuitos e não pedem chave.

## 3. Telas

| Tela | Para que serve |
|---|---|
| **Início** | Apresenta o site e mostra as trilhas em destaque |
| **Trilhas** | Lista todas as trilhas, com filtro por dificuldade e as favoritas |
| **Detalhe da trilha** | Mostra as fotos, os dados, a previsão do tempo e os relatos de uma trilha |
| **Cadastrar trilha** | Formulário para incluir uma trilha nova |

## 4. Histórias de usuário

### 🧭 Épico 1: Descobrir trilhas

- **US01: Ver as trilhas em destaque.** Como visitante, quero ver na página inicial algumas trilhas em destaque, para ter ideias logo de cara.
  - _Critérios de aceitação:_ aparecem até 3 trilhas marcadas como destaque; cada cartão mostra a foto, o nome, a cidade, a distância e a dificuldade, e leva ao detalhe da trilha.
- **US02: Listar as trilhas.** Como visitante, quero ver todas as trilhas em cartões, para comparar umas com as outras.
  - _Critérios de aceitação:_ 1 cartão por linha no celular, 2 no tablet e 3 ou mais no computador; as fotos têm o mesmo formato em todos os cartões, sem distorcer; uma mensagem aparece quando não há trilha nenhuma.
- **US03: Filtrar por dificuldade.** Como visitante, quero filtrar as trilhas por dificuldade, para ver só as que combinam com o meu preparo.
  - _Critérios de aceitação:_ as opções são "Todas", "Fácil", "Moderada" e "Difícil"; a lista muda sem recarregar a página; o site lembra o último filtro quando volto (RN06).
- **US04: Favoritar uma trilha.** Como visitante, quero marcar trilhas como favoritas, para encontrá-las depois.
  - _Critérios de aceitação:_ o botão de favorito aparece no cartão e no detalhe, e diz se a trilha está ou não favoritada; dá para ver só as favoritas na tela Trilhas; as favoritas continuam lá ao fechar e abrir o navegador (RN06).

### 🥾 Épico 2: Conhecer uma trilha

- **US05: Ver o detalhe.** Como visitante, quero ver os dados completos de uma trilha, para decidir se vou.
  - _Critérios de aceitação:_ mostra o nome, a cidade, a distância, a dificuldade, o tipo de percurso, a duração estimada, o que levar, a descrição e o contato do guia, quando houver; as fotos aparecem num carrossel, com texto alternativo.
- **US06: Ver a previsão do tempo.** Como visitante, quero ver a previsão do tempo no ponto de partida, para escolher o dia.
  - _Critérios de aceitação:_ mostra a temperatura máxima e mínima e a chance de chuva dos próximos 3 dias, a partir da latitude e da longitude da trilha; enquanto carrega, aparece um aviso de carregamento; se o serviço falhar, aparece uma mensagem clara e o resto da página continua funcionando (RN07); a fonte "Dados: Open-Meteo" aparece junto da previsão.
- **US07: Ler os relatos.** Como visitante, quero ler os relatos de quem já foi, do mais novo para o mais antigo, para saber como a trilha está.
  - _Critérios de aceitação:_ cada relato mostra o nome, a data da visita, a nota de 1 a 5 e o texto; uma mensagem convida a escrever o primeiro relato quando não houver nenhum.

### ✍️ Épico 3: Colaborar

- **US08: Cadastrar uma trilha.** Como colaborador, quero cadastrar uma trilha que ainda não está no site.
  - _Critérios de aceitação:_ os campos seguem as regras RN01 a RN05; cada erro aparece junto do campo, com uma mensagem clara, só depois que o campo foi tocado ou ao tentar salvar; ao digitar um CEP válido, a cidade e o bairro são preenchidos pelo ViaCEP, e continuam editáveis se o CEP não for encontrado; ao salvar, a trilha passa a aparecer na lista, e o site leva ao detalhe dela.
- **US09: Deixar um relato.** Como colaborador, quero contar como foi a minha visita a uma trilha.
  - _Critérios de aceitação:_ um botão no detalhe abre o formulário numa janela (modal); os campos são nome, data da visita (RN05), nota de 1 a 5 e texto (de 10 a 500 caracteres); ao salvar, a janela fecha e o relato aparece no topo da lista.

## 5. Regras de negócio

| Código | Regra |
|---|---|
| **RN01** | O nome da trilha é obrigatório e tem de 3 a 80 caracteres. |
| **RN02** | A distância vai de 0,5 a 50 km, com no máximo uma casa decimal. |
| **RN03** | A dificuldade é uma de três: **fácil**, **moderada** ou **difícil**. O tipo de percurso é **ida e volta**, **circular** ou **travessia**. |
| **RN04** | O CEP do ponto de partida tem o formato `00000-000` (o hífen é opcional ao digitar). O telefone do guia é opcional e, quando informado, tem o formato `(00) 00000-0000`. |
| **RN05** | A data da última visita, ou da visita do relato, não pode estar no futuro. |
| **RN06** | As favoritas e o último filtro ficam guardados **no navegador** de quem visita. Eles não vão para o servidor e não aparecem para outras pessoas. |
| **RN07** | Uma falha num serviço externo (Open-Meteo ou ViaCEP) nunca impede o resto da página de funcionar. |

## 6. Requisitos não funcionais

- **Responsivo, pensado primeiro para o celular**, com uso confortável de 360 px até telas largas.
- **Acessível:** navegação completa pelo teclado, texto alternativo em toda foto e contraste mínimo AA entre o texto e o fundo.
- **Leve:** fotos em formato moderno (WebP), no tamanho certo para cada tela.
- **Publicado como site estático**, sem login e sem chave de API no código.

## 7. Fora do escopo

Ficam de fora, de propósito, para o projeto caber no tamanho combinado:

- conta de usuário, login e perfis;
- editar ou apagar trilhas e relatos;
- mapa interativo e traçado do percurso por GPS;
- envio de fotos pelo formulário (as fotos das trilhas já vêm com o projeto);
- busca por texto e filtro por distância.
