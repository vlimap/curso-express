const express = require('express');
const { 
    login,
    mostrarAdministrador, 
    buscarPorId, 
    cadastrarAdministrador, 
    editarAdministrador,
    deletarAdministradorPorID,
    deletarAdministradors } = require('../controllers/controllers');
const rota = express.Router();
const autenticar = require('../../middleware/autenticacao'); // Correção na importação
const multer = require('multer');
const upload = multer();
rota.use(express.json());

rota.use(express.json());

// Rota de login do usuario 
rota.post('/login', upload.none(), login);
// rota para mostrar administradors
rota.get('/administrador', autenticar, mostrarAdministrador)

// rota para mostrar administrador por id
rota.get('/administrador/:id',autenticar, buscarPorId)

// rota para editar administrador por id
rota.put('/administrador/:id',  autenticar, editarAdministrador)

// rota para deletar administrador por id
rota.delete('/administrador/:id', autenticar, deletarAdministradorPorID)

// rota para cadastrar administrador
rota.post('/administrador', cadastrarAdministrador)

// rota para deletar todos os administradors
rota.delete('/administrador', autenticar, deletarAdministradors)

module.exports = rota;


