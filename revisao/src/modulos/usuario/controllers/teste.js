exports.cadastrarUsuario = [ // middleware
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
            await transacao.commit();
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