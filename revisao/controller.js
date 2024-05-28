

exports.mostrarUsuaurios = ( (requisicao, resposta) => {
    resposta.json(dados);
});

exports.cadastrarUsuario = ((requisicao, resposta) => {
    const novoDado = requisicao.body;
    dados.push(novoDado);
    resposta.status(201).send('Dados armazenados com sucesso')
});
exports.buscarPorId = ((requisicao, resposta) => {
    id = parseInt(requisicao.params.id - 1);
    resposta.json(dados[id]);
});


exports.deletarUsuario = ( (requisicao, resposta) => {
    id = parseInt(requisicao.params.id - 1);
    dados.splice(id, 1);
    resposta.status(200).send('Usuario deletado com sucesso!')
});

exports.editarUsuario = ((requisicao, resposta) => {
    const novoDado = requisicao.body;
    id = parseInt(requisicao.params.id - 1);
    dados[id] = novoDado;
    resposta.status(201).send('Dados atualizados com sucesso!');
});

