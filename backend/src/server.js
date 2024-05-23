const app = require('./app'); // Importa o aplicativo Express configurado
const port = process.env.PORT || 3000; // Define a porta na qual o servidor irá ouvir

// Inicia o servidor e faz com que ele comece a ouvir por requisições na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`); // Exibe uma mensagem no console quando o servidor estiver funcionando
});
