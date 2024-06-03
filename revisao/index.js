const express = require('express');
const app = express();
const sequelize = require('./configBD');
const rota = require('./routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Rotas da aplicação
app.use('/api', rota);

// Rota de documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8080, async () =>{
    console.log('Servidor rodando na porta 3000!');
    try {
        await sequelize.sync({force: false});
        console.log('Conexão estabelicida com o banco e sincronizado.'); 
    } catch (error) {
        console.error('Erro ao sincronizar o modelo de banco de dados',error)
    }
});