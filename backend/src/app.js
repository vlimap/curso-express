const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Importa as rotas do usuário
const usuarioRoutes = require('./usuario/routes/usuarioRoutes');

// Usa as rotas do usuário
app.use('/api', usuarioRoutes);

module.exports = app;
