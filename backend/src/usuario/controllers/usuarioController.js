const Usuario = require('../models/usuarioModel'); // Importa o modelo Usuario

// Função para listar todos os usuários
exports.listarUsuarios = (req, res) => {
    Usuario.buscarTodos((err, usuarios) => {
        if (err) {
            // Se houver um erro, responde com status 500 (Erro Interno do Servidor) e uma mensagem de erro
            res.status(500).json({ mensagem: 'Erro ao listar usuarios', erro: err.message });
        } else {
            // Se não houver erro, responde com status 200 (OK) e a lista de usuários
            res.status(200).json(usuarios);
        }
    });
};

// Função para listar um usuário específico pelo ID
exports.listarUsuario = (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    Usuario.buscarPorId(id, (err, usuario) => {
        if (err) {
            // Se houver um erro, responde com status 500 (Erro Interno do Servidor) e uma mensagem de erro
            res.status(500).json({ mensagem: 'Erro ao obter usuario', erro: err.message });
        } else if (!usuario) {
            // Se o usuário não for encontrado, responde com status 404 (Não Encontrado) e uma mensagem de erro
            res.status(404).json({ mensagem: 'Usuario não localizado.' });
        } else {
            // Se não houver erro e o usuário for encontrado, responde com status 200 (OK) e os dados do usuário
            res.status(200).json(usuario);
        }
    });
};

// Função para cadastrar um novo usuário
exports.cadastrarUsuario = (req, res) => {
    const { nome, email, status } = req.body; // Extrai os dados do corpo da requisição
    if (!nome || !email || !status) {
        // Se algum campo obrigatório estiver faltando, responde com status 400 (Requisição Inválida) e uma mensagem de erro
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }
    Usuario.create({ nome, email, status }, (err, usuario) => {
        if (err) {
            // Se houver um erro, responde com status 500 (Erro Interno do Servidor) e uma mensagem de erro
            res.status(500).json({ mensagem: 'Erro ao cadastrar usuario', erro: err.message });
        } else {
            // Se não houver erro, responde com status 201 (Criado) e os dados do novo usuário
            res.status(201).json(usuario);
        }
    });
};

// Função para atualizar um usuário existente pelo ID
exports.atualizarUsuario = (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    const { nome, email, status } = req.body; // Extrai os dados do corpo da requisição
    if (!nome || !email || !status) {
        // Se algum campo obrigatório estiver faltando, responde com status 400 (Requisição Inválida) e uma mensagem de erro
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }
    Usuario.atualizarPorId(id, { nome, email, status }, (err, usuario) => {
        if (err) {
            // Se houver um erro, responde com status 500 (Erro Interno do Servidor) e uma mensagem de erro
            res.status(500).json({ mensagem: 'Erro ao atualizar usuario', erro: err.message });
        } else if (!usuario) {
            // Se o usuário não for encontrado, responde com status 404 (Não Encontrado) e uma mensagem de erro
            res.status(404).json({ mensagem: 'Usuario não localizado.' });
        } else {
            // Se não houver erro e o usuário for atualizado, responde com status 200 (OK) e os dados do usuário atualizado
            res.status(200).json(usuario);
        }
    });
};

// Função para deletar um usuário pelo ID
exports.deletarUsuario = (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    Usuario.deletarPorId(id, (err) => {
        if (err) {
            // Se houver um erro, responde com status 500 (Erro Interno do Servidor) e uma mensagem de erro
            res.status(500).json({ mensagem: 'Erro ao deletar usuario', erro: err.message });
        } else {
            // Se não houver erro, responde com status 200 (OK) e uma mensagem de sucesso
            res.status(200).json({ mensagem: 'Usuario deletado com sucesso.' });
        }
    });
};
