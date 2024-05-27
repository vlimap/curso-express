const express = require('express');
const app = express();

const dados = 
[
    {
        "id": 1,
        "nome":"Valtemir",
        "cargo": "instrutor"
    }
]

app.use(express.json());

app.get('/', (requisicao, resposta) => {
    resposta.json(dados);
});

app.post('/', (requisicao, resposta) => {
    const novoDado = requisicao.body;
    dados.push(novoDado);
    resposta.status(201).send('Dados armazenados com sucesso')
});
app.get('/:id', (requisicao, resposta) => {
    id = parseInt(requisicao.params.id);
    console.log(id)
    resposta.json(dados[id]);

});


app.listen(8080, () =>{
    console.log('Servidor rodando na porta 3000!');
});