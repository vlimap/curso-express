const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../data', 'database.sqlite')  // Corrigi o caminho para a pasta data
});

module.exports = sequelize;
