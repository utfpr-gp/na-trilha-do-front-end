# 🛠️ Arquitetura do Trilheiro

Primeira versão: só o modelo de dados, tirado das histórias do [PRD](prd.md). As outras seções (design tokens, rotas, APIs) chegam nos próximos capítulos.

## Modelo de dados (diagrama ER)

```mermaid
erDiagram
  TRILHA ||--o{ RELATO : "recebe"
  TRILHA {
    string id PK "gerado pelo json-server"
    string nome
    string cidade
    string uf
    string bairro
    string cep
    float latitude
    float longitude
    float distanciaKm
    string dificuldade "facil, moderada, dificil"
    string tipoPercurso "ida-e-volta, circular, travessia"
    int duracaoMin
    string[] oQueLevar
    string descricao
    string guiaNome "opcional"
    string guiaTelefone "opcional"
    string ultimaVisita "AAAA-MM-DD"
    boolean destaque
    object[] fotos "arquivo e alt"
  }
  RELATO {
    string id PK
    string trilhaId FK
    string nome
    string dataVisita "AAAA-MM-DD"
    int nota "1 a 5"
    string texto
  }
```

