const Sequelize = require('sequelize');
const sequelize = require('./bd');
const bd = require('./bd');

const User = bd.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  }
});

User.sync();
module.exports = User;
