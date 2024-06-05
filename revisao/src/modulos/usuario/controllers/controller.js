const sequelize = require('../../../config/configBD');
const Usuario = require('../models/models')

// Mostrar todos os usuarios
exports.mostrarUsuarios = async (requisicao, resposta) => {
    try {
        const usuarios = await Usuario.findAll();
        resposta.status(200).json(usuarios);
    } catch (error) {
        resposta.status(500).json({error:'erro ao retornar os dados',  detalhes: error.message});
    }
};

// mostrar usuario especifico
exports.buscarPorId =  async (requisicao, resposta) => {
    try {
        const usuario = await Usuario.findByPk(requisicao.params.id);
        if(!usuario){
            resposta.status(404).json({error: 'Usuario não encontrado!'})
        }
        resposta.status(200).json(usuario);

    } catch (error) {
        resposta.status(500).json({error:'Erro ao buscar usuario!',  detalhes: error.message});
    }
};

// Cadastrar usuarios
exports.cadastrarUsuario = async (requisicao, resposta) => {
    try {
        const novoUsuario = await Usuario.create(requisicao.body);
        resposta.status(201).json(novoUsuario);
    } catch (error) {
        resposta.status(500).json({error:'Erro ao criar um novo usuario', detalhes: error.message});
    }
};

//editar usuario
exports.editarUsuario = async (requisicao, resposta) => {
    try {
        const usuario = await Usuario.findByPk(requisicao.params.id);
        if (!usuario){
            resposta.status(404).json({error: "Usuario não encontrado"});
        };
        await usuario.update(requisicao.body);
        resposta.status(200).json(usuario);
    } catch (error) {
        resposta.status(500).json({error:'Erro ao editar o usuario', detalhes: error.message});
    }
};

// Deletar usuario por id
exports.deletarUsuarioPorID = async (requisicao, resposta) => {
    try {
        const usuario = await Usuario.findByPk(requisicao.params.id);
        if (!usuario){
            resposta.status(404).json({error: "Usuario não encontrado"});
        };
        await usuario.destroy();
        resposta.status(200).json({mensagem: "Usuario deletado com sucesso!"});
    } catch (error) {
        resposta.status(500).json({error:'Erro ao deletar usuario', detalhes: error.message});
    }
};

// Deletar todos os usuarios
exports.deletarUsuarios = async (requisicao, resposta) => {
    try {
        await Usuario.destroy({
            where:{},
            truncate: false
        });
        //Depois dos usuarios serem deletado, reiniciar os indices.
        await sequelize.query("DELETE from sqlite_sequence where name= 'Usuario';")
        resposta.status(200).json({mensagem:"Todos os usuarios do banco foram deletados."})
    } catch (error) {
        resposta.status(500).json({error:'Erro ao deletar usuario', detalhes: error.message});
    }
};




