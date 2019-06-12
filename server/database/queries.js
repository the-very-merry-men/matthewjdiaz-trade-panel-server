const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'carforce',
  host: 'localhost',
  database: 'trade_panel',
  password: '',
  port: 5432,
});

const getRandomStock = (request, response) => {
  pool.query(`SELECT * FROM stocks WHERE id = 1`, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  });
}
const getStockTicker = (request, response) => {
  const stock = parseInt(request.params.stock)
  pool.query(`SELECT * FROM stocks WHERE id = ${stock}`, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  });
}

// /api/stocks/:stock/price
// api return Example: [{"price":"1087.13"}]
const getStockPrice = (request, response) => {
  const stock = parseInt(request.params.stock)

  pool.query(`SELECT * FROM stocks WHERE id = ${stock}`, (error, results) => {
    if (error) {
      throw error;
    }
    let obj = [{ "price": String(results.rows[0].current_price) }]
    response.status(200).json(obj);
  });
}

module.exports = {
  getRandomStock,
  getStockTicker,
  getStockPrice
}