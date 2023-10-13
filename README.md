# project_knowledge

Este microsserviço foi desenvolvido como uma peça fundamental, destinada a ilustrar a essência da minha stack tecnológica e a forma como estruturo os meus códigos.
Ele serve como um exemplo vivo do meu estilo de arquitetura, permitindo que eu apresente não apenas as tecnologias que escolhi,
mas também a maneira como aplico as melhores práticas de desenvolvimento e organização em projetos de software.
O Projeto encapsula as funcionalidades, assim como representa o cuidado e a atenção dedicados à concepção e à implementação de um projeto coeso e escalável.

## 🚀 Começando

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com)
Além disto, é imprescindível ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 📋 Pré-requisitos

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Docker-desktop](https://www.docker.com/products/docker-desktop/)

### 🔧 Instalação

```bash
# Clone este repositório
$ git clone git@github.com:gabrielhsantos/project_knowledge.git

# Acesse a pasta do projeto no terminal/cmd
$ cd project_knowledge/microsservice-nestJS/

# Instale as dependências
$ npm ci
```

### 🎲 Rodando o Back End (servidor)

```bash
# Execute o script para iniciar o container com as dependências
$ npm run infra:up

# Execute a aplicação
$ npm start

# O servidor inciará na porta:3000 - acesse <http://localhost:3000> (ou a porta que foi definida no arquivo .env)
```

### ⚙️ Executando os testes

Para rodar os testes, basta utilizar este comando via terminal/cmd:

```bash
$ npm t
```

Caso queira rodar os testes de forma separada, basta rodar:

```bash
# Para testes de integração
$ npm run test:integration

# Para testes unitário
$ npm run test:unit
```

>**Observação**:
> O *Coverage* não está em 100% pois é apenas um modelo.

### 📦 Documentação

Um arquivo com extensão .json se encontra na pasta:
```src/shared/docs```

O mesmo pode ser importado dentro do [Postman](https://www.postman.com/), para facilitar o acesso aos endpoints.

Caso queira acessar a documentação através do Swagger, basta acessar o link pelo seu navegador [DOC](http://localhost:3000/doc/) com o servidor rodando.

### ⌛ Planos Futuros

Tenho a ideia de acrescentar um BFF (Backend For Frontend), com GraphQL + Websocket para a utilização
como um proxy, servindo de Gateway para o microsserviço atual.
Somado a isso, tenho como os próximos passos, a implementação dos seguintes módulos:
- Event -> Kafka
- Cache -> Redis
- Observabilidade -> Datadog

