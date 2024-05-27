const express = require('express');
const app = express();

const rota = require('./routes');

app.use('/api', rota);


app.listen(8080, () =>{
    console.log('Servidor rodando na porta 3000!');
});