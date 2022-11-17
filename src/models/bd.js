const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

sequelize
  .authenticate()
  .then(function () {
    console.log('Conectado ao banco de dados!');
  })
  .catch(function () {
    console.log('Erro: falha ao conectar ao banco!');
  });

module.exports = sequelize;
