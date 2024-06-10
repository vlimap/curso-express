const sequelize = require('../../../config/configBD');
const Usuario = require('../models/models');
const upload = require('../../../config/configUpload');
const path = require('path');
const fs = require('fs');

// Excluir a imagem
const excluir_imagem = (caminhoImagem) =>{
    const caminhoCompleto = path.join(__dirname,'../../../', caminhoImagem)
    if (caminhoImagem && fs.existsSync(caminhoCompleto)){
        fs.unlinkSync(caminhoCompleto);
    }
};

// Mostrar todos os usuarios
exports.mostrarUsuarios = async (requisicao, resposta) => {
    try {
        const usuarios = await Usuario.findAll();
        resposta.status(200).json(usuarios);
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao retornar os dados', detalhes: error.message });
    }
};

// Mostrar usuario especifico
exports.buscarPorId = async (requisicao, resposta) => {
    try {
        const usuario = await Usuario.findByPk(requisicao.params.id);
        if (!usuario) {
            return resposta.status(404).json({ error: 'Usuario não encontrado!' });
        }
        resposta.status(200).json(usuario);
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao buscar usuario!', detalhes: error.message });
    }
};

// Cadastrar usuarios
// A gente chama isso de middleware, e de forma sequencial
// Primeiro verifica a imagem depois os dados do usuario
// Dentro de um array.
exports.cadastrarUsuario = [
    upload.single('foto_perfil'), // Primeiro middleware para processar o upload do arquivo
    async (requisicao, resposta) => {
        const transacao = await sequelize.transaction(); // Inicia a transação

        try {
            const dadosUsuario = requisicao.body;
            if (requisicao.file) {
                dadosUsuario.foto_perfil = requisicao.file.filename; // Adiciona o nome do arquivo ao objeto dadosUsuario
            }

            const novoUsuario = await Usuario.create(dadosUsuario, { transaction: transacao }); // Tenta criar o usuário dentro da transação

             // Commit da transação se a criação do usuário foi bem-sucedida
            resposta.status(201).json(novoUsuario);
        } catch (error) {
            await transacao.rollback(); // Rollback da transação em caso de erro

            if (requisicao.file) {
                excluir_imagem(`/modulos/usuario/upload/${requisicao.file.filename}`); // Exclui a imagem se houver erro
            }

            resposta.status(500).json({ error: 'Erro ao criar um novo usuario', detalhes: error.message });
        }
    }
];


// Editar usuario
exports.editarUsuario = async (requisicao, resposta) => {
    try {
        const usuario = await Usuario.findByPk(requisicao.params.id);
        if (!usuario) {
            return resposta.status(404).json({ error: 'Usuario não encontrado' });
        }
        await usuario.update(requisicao.body);
        resposta.status(200).json(usuario);
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao editar o usuario', detalhes: error.message });
    }
};

// Deletar usuario por id
exports.deletarUsuarioPorID = async (requisicao, resposta) => {
    try {
        const usuario = await Usuario.findByPk(requisicao.params.id);
        if (!usuario) {
            return resposta.status(404).json({ error: 'Usuario não encontrado' });
        }
        await usuario.destroy();
        resposta.status(200).json({ mensagem: 'Usuario deletado com sucesso!' });
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao deletar usuario', detalhes: error.message });
    }
};

// Deletar todos os usuarios
exports.deletarUsuarios = async (requisicao, resposta) => {
    try {
        await Usuario.destroy({
            where: {},
            truncate: false
        });
        // Depois dos usuarios serem deletados, reiniciar os indices.
        await sequelize.query("DELETE from sqlite_sequence where name= 'Usuario';");
        resposta.status(200).json({ mensagem: 'Todos os usuarios do banco foram deletados.' });
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao deletar usuarios', detalhes: error.message });
    }
};
