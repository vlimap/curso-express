const express = require('express');
const { login, mostrarUsuarios, buscarPorId, cadastrarUsuario, editarUsuario, deletarUsuarioPorID, deletarUsuarios } = require('../controllers/controller');
const rota = express.Router();
const autenticar = require('../../middleware/autenticacao'); // Correção na importação
const multer = require('multer');
const upload = multer();
rota.use(express.json());

// Rota de login do usuario 
rota.post('/login', upload.none(), login);

// Rota para mostrar usuários
rota.get('/usuario', autenticar, mostrarUsuarios);

// Rota para mostrar usuário por id
rota.get('/usuario/:id',autenticar, buscarPorId);

// Rota para editar usuário por id
rota.put('/usuario/:id', autenticar, editarUsuario);

// Rota para deletar usuário por id
rota.delete('/usuario/:id', autenticar, deletarUsuarioPorID);

// Rota para cadastrar usuário
rota.post('/usuario', cadastrarUsuario);

// Rota para deletar todos os usuários
rota.delete('/usuario', autenticar, deletarUsuarios);

module.exports = rota;
