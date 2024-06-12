const sequelize = require('../../../config/configBD');
const Administrador = require('../models/models');
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

// Mostrar todos os Administradors
exports.mostrarAdministrador = async (requisicao, resposta) => {
    try {
        const administrador = await Administrador.findAll();
        resposta.status(200).json(administrador);
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao retornar os dados', detalhes: error.message });
    }
};

// Mostrar Administrador especifico
exports.buscarPorId = async (requisicao, resposta) => {
    try {
        const administrador = await Administrador.findByPk(requisicao.params.id);
        if (!administrador) {
            return resposta.status(404).json({ error: 'Administrador não encontrado!' });
        }
        resposta.status(200).json(administrador);
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao buscar Administrador!', detalhes: error.message });
    }
};

// Cadastrar Administradors
// A gente chama isso de middleware, e de forma sequencial
// Primeiro verifica a imagem depois os dados do Administrador
// Dentro de um array.
exports.cadastrarAdministrador = [ // middleware
    upload.single('foto_perfil'), // Primeiro middleware para processar o upload do arquivo
    async (requisicao, resposta) => {
        const transacao = await sequelize.transaction(); // Inicia a transação

        try {
            const dadosAdministrador = requisicao.body;
            if (requisicao.file) {
                dadosAdministrador.foto_perfil = requisicao.file.filename; // Adiciona o nome do arquivo ao objeto dadosAdministrador
            }

            const novoAdministrador = await Administrador.create(dadosAdministrador, { transaction: transacao }); // Tenta criar o usuário dentro da transação

             // Commit da transação se a criação do usuário foi bem-sucedida
            transacao.commit();
            resposta.status(201).json(novoAdministrador);
        } catch (error) {
            await transacao.rollback(); // Rollback da transação em caso de erro

            if (requisicao.file) {
                excluir_imagem(`/modulos/Administrador/upload/${requisicao.file.filename}`); // Exclui a imagem se houver erro
            }

            resposta.status(500).json({ error: 'Erro ao criar um novo Administrador', detalhes: error.message });
        }
    }
];

// Editar Administrador
exports.editarAdministrador = async (requisicao, resposta) => {
    try {
        const administrador = await Administrador.findByPk(requisicao.params.id);
        if (!administrador) {
            return resposta.status(404).json({ error: 'Administrador não encontrado' });
        }
        await administrador.update(requisicao.body);
        resposta.status(200).json(administrador);
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao editar o Administrador', detalhes: error.message });
    }
};

// Deletar Administrador por id
exports.deletarAdministradorPorID = async (requisicao, resposta) => {
    try {
        const administrador = await Administrador.findByPk(requisicao.params.id);
        if (!administrador) {
            return resposta.status(404).json({ error: 'Administrador não encontrado' });
        }
        await administrador.destroy();
        resposta.status(200).json({ mensagem: 'Administrador deletado com sucesso!' });
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao deletar Administrador', detalhes: error.message });
    }
};

// Deletar todos os Administradors
exports.deletarAdministradors = async (requisicao, resposta) => {
    try {
        await administrador.destroy({
            where: {},
            truncate: false
        });
        // Depois dos Administradors serem deletados, reiniciar os indices.
        await sequelize.query("DELETE from sqlite_sequence where name= 'Administrador';");
        resposta.status(200).json({ mensagem: 'Todos os Administradors do banco foram deletados.' });
    } catch (error) {
        resposta.status(500).json({ error: 'Erro ao deletar Administradors', detalhes: error.message });
    }
};
