const Sequelize = require('sequelize');

// CONNECT TO DATABASE
module.exports = new Sequelize('mysql://root:example@database:3306/trade_panel', {
  dialect: 'mysql', dialectOptions: {
      supportBigNumbers: true
  }
});