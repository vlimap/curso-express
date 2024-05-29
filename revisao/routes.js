const express = require('express');
const { mostrarUsuarios, 
    buscarPorId, 
    cadastrarUsuario, 
    editarUsuario,
    deletarUsuarioPorID,
    deletarUsuarios } = require('./controller');
const rota = express.Router();
const Usuario = require('./models');


rota.use(express.json());

// rota para mostrar usuarios
rota.get('/usuario', mostrarUsuarios)

// rota para mostrar usuario por id
rota.get('/usuario/:id', buscarPorId)

// rota para editar usuario por id
rota.put('/usuario/:id', editarUsuario)

// rota para deletar usuario por id
rota.delete('/usuario/:id', deletarUsuarioPorID)

// rota para cadastrar usuario
rota.post('/usuario', cadastrarUsuario)

// rota para deletar todos os usuarios
rota.delete('/usuario', deletarUsuarios)

module.exports = rota;


