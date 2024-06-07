const express = require('express');
const { mostrarUsuarios, 
    buscarPorId, 
    cadastrarUsuario, 
    editarUsuario,
    deletarUsuarioPorID,
    deletarUsuarios } = require('../controllers/controller');
const rota = express.Router();
const upload = require('../../../config/configUpload'); // Atualize o caminho conforme necessário


rota.use(express.json());

// rota para mostrar usuarios
rota.get('/usuario', mostrarUsuarios)

// rota para mostrar usuario por id
rota.get('/usuario/:id', buscarPorId)

// rota para editar usuario por id
rota.put('/usuario/:id', upload.single('foto_perfil'),  editarUsuario)

// rota para deletar usuario por id
rota.delete('/usuario/:id', deletarUsuarioPorID)

// rota para cadastrar usuario
rota.post('/usuario',upload.single('foto_perfil'), cadastrarUsuario)

// rota para deletar todos os usuarios
rota.delete('/usuario', deletarUsuarios)

module.exports = rota;


