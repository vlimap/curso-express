const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const Usuario = require('../models/Usuario'); 
// Ajuste o caminho conforme necessário
exports.cadastrarUsuario = async (requisicao, resposta) => {     
    try {         
        // Extrair os dados do usuário do corpo da requisição
        const dadosUsuario = requisicao.body;         
        // Verificar se um arquivo foi enviado
        if (requisicao.file) {             
            const fileMime = mime.lookup(requisicao.file.originalname);
            // Garantir que o arquivo enviado seja uma imagem
            if (fileMime && fileMime.startsWith('image/')) {                 
                dadosUsuario.foto_perfil = `/modulos/usuario/uploads/${requisicao.file.filename}`;             
            } else {                 
                // Se o arquivo não for uma imagem, removê-lo do diretório de uploads
                const filePath = path.join(__dirname, '../modulos/usuario/uploads', requisicao.file.filename); 
                                fs.unlinkSync(filePath); 
                                return resposta.status(400).json({ error: 'Arquivo enviado não é uma imagem válida' });     
                                   }        
                                }         
                                // Criar um novo usuário com os dados fornecidos
                                const novoUsuario = await Usuario.create(dadosUsuario);         
                                resposta.status(201).json(novoUsuario); 
                            } catch (error) { 
                                resposta.status(500).json({ error: 'Erro ao criar um novo usuário', detalhes: error.message }); 
                            } 
                        };