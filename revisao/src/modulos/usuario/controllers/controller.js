const sequelize = require('../../../config/configBD');
const Usuario = require('../models/models');
const upload = require('../../../config/configUpload');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret_key = process.env.SECRET_KEY;

// Excluir a imagem
const excluir_imagem = (caminhoImagem) => {
    const caminhoCompleto = path.join(__dirname, '../../../', caminhoImagem);
    if (caminhoImagem && fs.existsSync(caminhoCompleto)) {
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
exports.cadastrarUsuario = [
    upload.single('foto_perfil'),
    async (requisicao, resposta) => {
        const transacao = await sequelize.transaction();
        try {
            const dadosUsuario = requisicao.body;
            if (requisicao.file) {
                dadosUsuario.foto_perfil = requisicao.file.filename;
            }
            const apiKey = jwt.sign({
                id: dadosUsuario.email //fulano@email.com
                },
                secret_key,
                { expiresIn: '1y' }
            );
            dadosUsuario.api_key = apiKey
 
            const novoUsuario = await Usuario.create(dadosUsuario, { transaction: transacao });
            await transacao.commit();
            resposta.status(201).json(novoUsuario);
        } catch (error) {
            await transacao.rollback();
            if (requisicao.file) {
                excluir_imagem(`/modulos/usuario/upload/${requisicao.file.filename}`);
            }
            resposta.status(500).json({ error: 'Erro ao criar um novo usuario', detalhes: error.message });
        }
    }
];

// Editar usuário
exports.editarUsuario = [
    upload.single('foto_perfil'),
    async (requisicao, resposta) => {
        const transacao = await sequelize.transaction();
        try {
            const usuario = await Usuario.findByPk(requisicao.params.id);
            if (!usuario) {
                return resposta.status(404).json({ error: 'Usuário não encontrado' });
            }
            const dadosUsuario = requisicao.body;
            if (requisicao.file) {
                if (usuario.foto_perfil) {
                    excluir_imagem(`/modulos/usuario/upload/${usuario.foto_perfil}`);
                }
                dadosUsuario.foto_perfil = requisicao.file.filename;
            } else {
                dadosUsuario.foto_perfil = usuario.foto_perfil;
            }
            await usuario.update(dadosUsuario, { transaction: transacao });
            await transacao.commit();
            resposta.status(200).json(usuario);
        } catch (error) {
            await transacao.rollback();
            if (requisicao.file) {
                excluir_imagem(`/modulos/usuario/upload/${requisicao.file.filename}`);
            }
            resposta.status(500).json({ error: 'Erro ao editar o usuário', detalhes: error.message });
        }
    }
];

// Deletar usuario por id
exports.deletarUsuarioPorID = async (requisicao, resposta) => {
    try {
        const usuario = await Usuario.findByPk(requisicao.params.id);
        if (!usuario) {
            return resposta.status(404).json({ error: 'Usuario não encontrado' });
        }
        
        if (usuario.foto_perfil) {
            excluir_imagem(`/modulos/usuario/upload/${usuario.foto_perfil}`);
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
        const usuarios = await Usuario.findAll();
        for (const usuario of usuarios) {
            if (usuario.foto_perfil) {
                excluir_imagem(`/modulos/usuario/upload/${usuario.foto_perfil}`);
            }
        }
        
        await Usuario.destroy({
            where: {},
            truncate: false
        });

        await sequelize.query("DELETE from sqlite_sequence where name= 'Usuario';");
        resposta.status(200).json({ mensagem: 'Todos os usuarios do banco foram deletados.' });
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao deletar usuarios', detalhes: error.message });
    }
};
