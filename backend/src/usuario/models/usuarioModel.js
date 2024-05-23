const db = require('../../config/db'); // Importa a configuração do banco de dados SQLite

// Define a classe Usuario que contém métodos estáticos para operar no banco de dados
class Usuario {
    // Método estático para criar um novo usuário
    static create({ nome, email, status }, callback) {
        // SQL para inserir um novo usuário na tabela USUARIO
        const sql = 'INSERT INTO USUARIO (nome, email, status) VALUES (?, ?, ?)';
        // Parâmetros a serem inseridos no SQL
        const params = [nome, email, status];
        
        // Executa o SQL com os parâmetros fornecidos
        db.run(sql, params, function(err) {
            if (err) {
                // Se houver um erro, exibe uma mensagem de erro e chama o callback com o erro
                console.error('Erro ao criar usuario:', err.message);
                callback(err);
            } else {
                // Se não houver erro, chama o callback com os dados do usuário criado
                callback(null, { id: this.lastID, nome, email, status });
            }
        });
    }

    // Método estático para buscar todos os usuários
    static buscarTodos(callback) {
        // SQL para selecionar todos os usuários na tabela USUARIO
        const sql = 'SELECT * FROM USUARIO';
        
        // Executa o SQL sem parâmetros ([])
        db.all(sql, [], (err, rows) => {
            if (err) {
                // Se houver um erro, exibe uma mensagem de erro e chama o callback com o erro
                console.error('Erro ao listar usuarios:', err.message);
                callback(err);
            } else {
                // Se não houver erro, chama o callback com as linhas (rows) retornadas
                callback(null, rows);
            }
        });
    }

    // Método estático para buscar um usuário por ID
    static buscarPorId(id, callback) {
        // SQL para selecionar um usuário específico na tabela USUARIO por ID
        const sql = 'SELECT * FROM USUARIO WHERE id = ?';
        
        // Executa o SQL com o ID fornecido
        db.get(sql, [id], (err, row) => {
            if (err) {
                // Se houver um erro, exibe uma mensagem de erro e chama o callback com o erro
                console.error('Erro ao buscar usuario:', err.message);
                callback(err);
            } else {
                // Se não houver erro, chama o callback com a linha (row) retornada
                callback(null, row);
            }
        });
    }

    // Método estático para deletar um usuário por ID
    static deletarPorId(id, callback) {
        // SQL para deletar um usuário específico na tabela USUARIO por ID
        const sql = 'DELETE FROM USUARIO WHERE id = ?';
        
        // Executa o SQL com o ID fornecido
        db.run(sql, [id], function(err) {
            if (err) {
                // Se houver um erro, exibe uma mensagem de erro e chama o callback com o erro
                console.error('Erro ao deletar usuario:', err.message);
                callback(err);
            } else {
                // Se não houver erro, chama o callback com o ID do usuário deletado
                callback(null, { deletedID: id });
            }
        });
    }

    // Método estático para atualizar um usuário por ID
    static atualizarPorId(id, { nome, email, status }, callback) {
        // SQL para atualizar um usuário específico na tabela USUARIO por ID
        const sql = 'UPDATE USUARIO SET nome = ?, email = ?, status = ? WHERE id = ?';
        // Parâmetros a serem atualizados no SQL
        const params = [nome, email, status, id];
        
        // Executa o SQL com os parâmetros fornecidos
        db.run(sql, params, function(err) {
            if (err) {
                // Se houver um erro, exibe uma mensagem de erro e chama o callback com o erro
                console.error('Erro ao atualizar usuario:', err.message);
                callback(err);
            } else {
                // Se não houver erro, chama o callback com os dados do usuário atualizado
                callback(null, { id, nome, email, status });
            }
        });
    }
}

// Exporta a classe Usuario para que possa ser usada em outras partes da aplicação
module.exports = Usuario;

