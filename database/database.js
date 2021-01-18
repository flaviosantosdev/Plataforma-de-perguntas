const Sequelize = require('Sequelize');
const connection = new Sequelize('guiaperguntas', 'root','',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = connection;