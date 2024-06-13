const Usuario = require('../usuario/models/models');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

const autenticar = async (requisicao , resposta, next) =>{
    const apiKey = requisicao.header('Authorization')?.replace('Bearer ', '' );
    if(!apiKey){
        console.log('Chave de API nao fornecida');
        return resposta.status(401).json({error: 'Acesso negado. Chave de API não foi fornecida'})
    }
    try {
        const decodificacao = jwt.verify(apiKey, secret_key);
        console.log('Token decodeficado:', decodificacao);
        const usuario = await Usuario.findOne({where:{id: decodificacao.id, apiKey}});
        if(!usuario){
            console.log('Chave de API invalida');
            return resposta.status(401).json({error: "Chave de API invalida."})
        }
        requisicao.usuario = usuario;
        next();

    } catch (error) {
        console.log('Erro ao validar o token:',error.message )
        resposta.status(401).json({error: 'Chave de API invalida'})
    }
};

module.exports = autenticar;