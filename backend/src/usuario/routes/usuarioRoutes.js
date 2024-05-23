const express = require('express'); // Importa o framework Express
const router = express.Router(); // Cria uma nova instância do roteador do Express
const usuarioController = require('../controllers/usuarioController'); // Importa o controlador de usuário

// Define a rota GET para listar todos os usuários
// Quando uma requisição GET for feita para '/usuarios', o método 'listarUsuarios' do controlador será chamado
router.get('/usuarios', usuarioController.listarUsuarios);

// Define a rota GET para obter um usuário específico pelo ID
// Quando uma requisição GET for feita para '/usuarios/:id', o método 'listarUsuario' do controlador será chamado
router.get('/usuarios/:id', usuarioController.listarUsuario);

// Define a rota POST para cadastrar um novo usuário
// Quando uma requisição POST for feita para '/usuarios', o método 'cadastrarUsuario' do controlador será chamado
router.post('/usuarios', usuarioController.cadastrarUsuario);

// Define a rota PUT para atualizar um usuário específico pelo ID
// Quando uma requisição PUT for feita para '/usuarios/:id', o método 'atualizarUsuario' do controlador será chamado
router.put('/usuarios/:id', usuarioController.atualizarUsuario);

// Define a rota DELETE para deletar um usuário específico pelo ID
// Quando uma requisição DELETE for feita para '/usuarios/:id', o método 'deletarUsuario' do controlador será chamado
router.delete('/usuarios/:id', usuarioController.deletarUsuario);

// Exporta o roteador para que possa ser utilizado em outras partes da aplicação
module.exports = router;
