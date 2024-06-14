require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/configBD');
const rotaUsuario = require('./modulos/usuario/routes/routes');
const rotaAdministrador = require('./modulos/administrador/routes/routes');
const swaggerUi = require('swagger-ui-express');

const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'swagger.yaml'));

// Rotas da aplicação
app.use('/api', rotaUsuario);
app.use('/api', rotaAdministrador);
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

