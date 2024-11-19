const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = User;