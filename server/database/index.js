const Sequelize = require('sequelize');

// CONNECT TO DATABASE
module.exports = new Sequelize('front_end', 'root', 'Umairnadeem_1', {
  dialect: 'mysql', dialectOptions: {
      supportBigNumbers: true
  }
});