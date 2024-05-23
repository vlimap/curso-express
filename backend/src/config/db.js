const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o banco de dados
const dbPath = path.resolve(__dirname, '../../data/database.sqlite');

// Cria e abre o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Cria a tabela se não existir
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS USUARIO (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            status TEXT NOT NULL
        )
    `);
});

module.exports = db;