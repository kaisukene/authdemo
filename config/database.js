const Sequelize = require('sequelize');

const db = new Sequelize('logintest', 'suva', 'password1234', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = db;