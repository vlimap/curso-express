const { Sequelize } = require('sequelize')
const caminho = require('path');

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage: caminho.resolve(__dirname, 'database.sqlite')
});

module.exports = sequelize;

