const express = require('express');
const { mostrarAdministrador, 
    buscarPorId, 
    cadastrarAdministrador, 
    editarAdministrador,
    deletarAdministradorPorID,
    deletarAdministradors } = require('../controllers/controllers');
const rota = express.Router();


rota.use(express.json());

// rota para mostrar administradors
rota.get('/administrador', mostrarAdministrador)

// rota para mostrar administrador por id
rota.get('/administrador/:id', buscarPorId)

// rota para editar administrador por id
rota.put('/administrador/:id',  editarAdministrador)

// rota para deletar administrador por id
rota.delete('/administrador/:id', deletarAdministradorPorID)

// rota para cadastrar administrador
rota.post('/administrador', cadastrarAdministrador)

// rota para deletar todos os administradors
rota.delete('/administrador', deletarAdministradors)

module.exports = rota;


