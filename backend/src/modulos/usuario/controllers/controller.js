const sequelize = require('../../../config/configBD');
const Usuario = require('../models/models');
const upload = require('../../../config/configUpload');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secret_key = process.env.SECRET_KEY;

// Função para excluir imagem
const excluir_imagem = (caminhoImagem) => {
    const caminhoCompleto = path.join(__dirname, '../../../', caminhoImagem);
    if (caminhoImagem && fs.existsSync(caminhoCompleto)) {
        fs.unlinkSync(caminhoCompleto);
    }
};

// Login do usuário
exports.login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        console.log(`Tentativa de login com o email: ${email}`);
        const usuario = await Usuario.findOne({ where: { email } });//fulano@email.com
        if (!usuario) { //false
            return res.status(400).json({ error: 'Credenciais inválidas!' });
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha);//12345
        if (!senhaValida) {
            return res.status(400).json({ error: 'Credenciais inválidas!' });
        }

        // Gerando token de login
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            secret_key,
            { expiresIn: '24h'}
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Erro no servidor", detalhes: error.message });
    }
};

// Mostrar todos os usuários
exports.mostrarUsuarios = async (requisicao, resposta) => {
    try {
        const usuarios = await Usuario.findAll();
        resposta.status(200).json(usuarios);
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao retornar os dados', detalhes: error.message });
    }
};

// Mostrar usuário específico
exports.buscarPorId = async (requisicao, resposta) => {
    try {
        const usuario = await Usuario.findByPk(requisicao.params.id);
        if (!usuario) {
            return resposta.status(404).json({ error: 'Usuário não encontrado!' });
        }
        resposta.status(200).json(usuario);
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao buscar usuário!', detalhes: error.message });
    }
};

// Cadastrar usuários
exports.cadastrarUsuario = [
    upload.single('foto_perfil'),
    async (requisicao, resposta) => {
        const transacao = await sequelize.transaction();
        try {
            const dadosUsuario = requisicao.body;
            if (requisicao.file) {
                dadosUsuario.foto_perfil = requisicao.file.filename;
            }

            const novoUsuario = await Usuario.create(dadosUsuario, { transaction: transacao });
            await transacao.commit();
            resposta.status(201).json(novoUsuario);
        } catch (error) {
            await transacao.rollback();
            if (requisicao.file) {
                excluir_imagem(`/modulos/usuario/upload/${requisicao.file.filename}`);
            }
            console.error('Erro ao cadastrar usuário:', error.message, error);
            resposta.status(500).json({ error: 'Erro ao criar um novo usuário', detalhes: error.message });
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

// Deletar usuário por ID
exports.deletarUsuarioPorID = async (requisicao, resposta) => {
    try {
        const usuario = await Usuario.findByPk(requisicao.params.id);
        if (!usuario) {
            return resposta.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (usuario.foto_perfil) {
            excluir_imagem(`/modulos/usuario/upload/${usuario.foto_perfil}`);
        }

        await usuario.destroy();
        resposta.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao deletar usuário', detalhes: error.message });
    }
};

// Deletar todos os usuários
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
        resposta.status(200).json({ mensagem: 'Todos os usuários do banco foram deletados.' });
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao deletar usuários', detalhes: error.message });
    }
};

