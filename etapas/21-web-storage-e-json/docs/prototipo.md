# 🖼️ Protótipo do Trilheiro

O protótipo foi gerado com IA a partir do [PRD](prd.md) e enxugado à mão. Este arquivo guarda os pedidos usados e as decisões de corte, para o protótipo poder ser refeito ou ajustado.

## 1. O pedido inicial (celular primeiro)

> Crie um site responsivo chamado Trilheiro, para descobrir trilhas da região de Guarapuava (PR).
> Comece pela versão de celular. São exatamente 4 telas:
> 1. Início: cabeçalho com o nome, três trilhas em destaque em cartões, botão "Ver todas as trilhas".
> 2. Trilhas: lista de cartões (foto, nome, cidade, distância, dificuldade), filtro Todas / Fácil / Moderada / Difícil / Favoritas.
> 3. Detalhe da trilha: fotos que passam para o lado, dados da trilha, previsão do tempo de 3 dias, relatos de quem foi e um botão "Conte como foi".
> 4. Cadastrar trilha: formulário com nome, distância, duração, dificuldade, tipo de percurso, o que levar, descrição, CEP, cidade e data da última visita.
> Cores: verde-mata #2F5D3A, terra #8B5A2B, amarelo #F2C230, fundo #FAF7F0. Títulos em Bitter, texto em Source Sans 3.
> Não crie login, conta de usuário, mapa, chat nem outras telas.

## 2. A versão de computador

> Gere a versão de computador destas 4 telas. Na tela Trilhas, mostre 3 cartões por linha. No Detalhe, ponha os dados e a previsão numa coluna à direita das fotos.

## 3. A triagem

| O que a IA gerou | Decisão | Por quê |
|---|---|---|
| Tela de login e "Minha conta" | Cortado | Fora do escopo do PRD (sem login) |
| Mapa interativo no Detalhe | Cortado | Fora do escopo do PRD |
| Avaliação com estrelas em cada cartão | Cortado | A nota existe só nos relatos (US07) |
| Barra de busca por texto | Cortado | Fora do escopo do PRD |
| Filtro por dificuldade | Mantido | US03 |
| Botão de favorito no cartão | Mantido | US04 |

## 4. Os componentes do Bootstrap

> Ajuste o design destas telas para seguir os componentes do Bootstrap 5.3: navbar, card, badge, button group, carousel, modal e os campos de formulário. Não use Tailwind.

Os componentes apontados no protótipo estão no [Design System](https://github.com/utfpr-gp/na-trilha-do-front-end/blob/main/trilheiro/docs/design-system.md).
