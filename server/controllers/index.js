const models = require('./models');

const getPrice = (ticker, callback) => {
  models.Stocks.findAll({
    attributes: ['ticker'],
    where: {
      ticker
    }
  })
    .then(data => callback(data))
    .catch(err => callback(err));
};

module.exports = {
  getPrice
}