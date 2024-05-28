const express = require('express');
const controller = require('./controller')
const rota = express.Router();

rota.use(express.json());

// rota para mostrar usuarios
rota.get('/usuario', controller.mostrarUsuaurios)


// rota para mostrar usuario por id
rota.get('/usuario/:id', controller.buscarPorId)

// rota para editar usuario por id
rota.put('/usuario/:id', controller.editarUsuario)

// rota para deletar usuario por id
rota.delete('/usuario/:id', controller.deletarUsuario)

// rota para cadastrar usuario
rota.post('/usuario', controller.cadastrarUsuario)

module.exports = rota;


