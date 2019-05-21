var Sequelize = require('sequelize');
var connection = require('../database');

const EpsRatios = connection.define('eps_ratio', {
    stock_id: Sequelize.INTEGER,
    year: Sequelize.INTEGER,
    quarter: Sequelize.INTEGER,
    actual_eps: {
        type: Sequelize.DECIMAL(10, 2)
    },
    expected_eps: {
        type: Sequelize.DECIMAL(10, 2)
    }
});

const Stocks = connection.define('stocks', {
    name: Sequelize.STRING,
    ticker: Sequelize.STRING,
    price: {
        type: Sequelize.DECIMAL(10, 2)
    },
    about: Sequelize.TEXT,
    buy_rating: Sequelize.INTEGER,
    rh_owners: Sequelize.INTEGER,
    ceo: Sequelize.STRING,
    market_cap: Sequelize.BIGINT,
    employees: Sequelize.INTEGER,
    pe_ratio: {
        type: Sequelize.DECIMAL(10, 2)
    },
    div_yield: {
        type: Sequelize.DECIMAL(10, 2)
    }
});

module.exports = {
    Stocks,
    EpsRatios
}