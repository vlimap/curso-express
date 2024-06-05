# Curso Express

## Descrição Geral
Este projeto é uma aplicação backend desenvolvida com Node.js e Express, com o objetivo de servir como material didático para um curso de revisão sobre Express. A aplicação inclui uma configuração de banco de dados SQLite, módulos organizados para gerenciar diferentes aspectos do sistema, e integração com Swagger para documentação de API.

## Estrutura do Projeto
```
curso-express
│
├── revisao
│   ├── src
│   │   ├── config
│   │   │   └── configBD.js
│   │   ├── data
│   │   │   └── database.sqlite
│   │   ├── modulos
│   │   │   ├── administrador
│   │   │   ├── usuario
│   │   │   │   ├── controllers
│   │   │   │   │   └── controller.js
│   │   │   │   ├── models
│   │   │   │   │   └── models.js
│   │   │   │   ├── routes
│   │   │   │   │   └── routes.js
│   │   │   │   ├── swagger
│   │   │   │   │   └── swagger.yaml
│   │   └── index.js
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── requests.http
```

## Funcionalidades
- **Gestão de Usuários:** Criação, leitura, atualização e exclusão de usuários (CRUD).
- **Documentação de API:** Documentação interativa da API utilizando Swagger.
- **Configuração de Banco de Dados:** Utilização de Sequelize para ORM e SQLite como banco de dados de desenvolvimento.
- **Modularização:** Estrutura modularizada para facilitar a manutenção e escalabilidade do código.

## Tecnologias Utilizadas
- **Node.js:** Ambiente de execução JavaScript server-side.
- **Express:** Framework web para Node.js.
- **Sequelize:** ORM para Node.js, utilizado para interagir com o banco de dados.
- **SQLite:** Banco de dados SQL leve e auto-contido.
- **Swagger:** Ferramenta para documentação de APIs RESTful.

## Como Executar o Projeto
1. Clone o repositório.
   ```sh
   git clone https://github.com/SeuUsuario/curso-express-revisao.git
   ```
2. Navegue até o diretório do projeto.
   ```sh
   cd curso-express/revisao
   ```
3. Instale as dependências.
   ```sh
   npm install
   ```
4. Configure o banco de dados no arquivo `src/config/configBD.js`.
5. Inicie o servidor.
   ```sh
   npm run dev
   ```
6. Utilize o arquivo `requests.http` para testar as rotas ou acesse a documentação Swagger para visualizar e testar as APIs.


## Stack utilizada

**Front-end:** React, TailwindCSS ou React-bootstrap

**Back-end:** Node, Express

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para obter mais informações.

