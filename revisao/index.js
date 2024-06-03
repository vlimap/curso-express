const express = require('express');
const app = express();
const sequelize = require('./configBD');
const rota = require('./routes');


app.use('/api', rota);

app.listen(8080, async () =>{
    console.log('Servidor rodando na porta 3000!');
    try {
        await sequelize.sync({force: false});
        console.log('Conexão estabelicida com o banco e sincronizado.'); 
    } catch (error) {
        console.error('Erro ao sincronizar o modelo de banco de dados',error)
    }
});