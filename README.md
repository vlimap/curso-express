# Curso Express

## Descrição Geral
Este projeto é uma aplicação backend desenvolvida com Node.js e Express, com o objetivo de servir como material didático para um curso sobre Express. A aplicação inclui uma configuração de banco de dados SQLite, módulos organizados para gerenciar diferentes aspectos do sistema, e integração com Swagger para documentação de API.

# Extensões Recomendadas para VSCode

Para melhorar sua experiência de desenvolvimento, recomendamos a instalação das seguintes extensões no Visual Studio Code:

- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint):** Linter para JavaScript e TypeScript.
- **[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode):** Formatador de código para uma aparência consistente.
- **[SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite):** Extensão para explorar e gerenciar bancos de dados SQLite.
- **[Swagger Viewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer):** Extensão para visualizar arquivos Swagger.
- **[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client):** Permite fazer requisições HTTP diretamente do VSCode.
- **[Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense):** Autocompletar para caminhos de arquivos.
- **[Nodemon](https://marketplace.visualstudio.com/items?itemName=kuscamara.nodemon):** Executa automaticamente o servidor ao salvar alterações.

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
   git clone https://github.com/vlimap/curso-express.git
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

## Referências

- [Documentação Express](https://expressjs.com/pt-br/)
- [Documentação bcrypt](https://www.npmjs.com/package/bcrypt)
- [Documentação moment-timezone](https://momentjs.com/timezone/)
- [Documentação nodemon](https://www.npmjs.com/package/nodemon)
- [Documentação Sequelize](https://sequelize.org/)
- [Documentação Sequelize CLI](https://github.com/sequelize/cli)
- [Documentação sqlite3](https://www.npmjs.com/package/sqlite3)
- [Documentação swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [Documentação swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [Documentação YAMLJS](https://www.npmjs.com/package/yamljs)

## Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para obter mais informações.

