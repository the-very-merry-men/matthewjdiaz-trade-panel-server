const Sequelize = require('sequelize');

// CONNECT TO DATABASE
module.exports = new Sequelize('front_end', 'root', '', {
  dialect: 'mysql', dialectOptions: {
    supportBigNumbers: true
  }
});