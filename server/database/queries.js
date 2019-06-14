const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'carforce',
  host: 'localhost',
  database: 'trade_panel',
  password: '',
  port: 5432,
});

const ticker = (length) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// /stocks/:stock
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
const getStockPrice = (request, response) => {
  const stock = parseInt(request.params.stock)
  pool.query(`SELECT * FROM stocks WHERE id = ${stock}`, (error, results) => {
    if (error) {
      throw error;
    }
    // api obj return Example: [{"price":"1087.13"}]
    let obj = [{ "price": String(results.rows[0].current_price) }];
    response.status(200).json(obj);
  });
}

// /api/users/:user
// `INSERT INTO users(username, balance, stocks_held, stop_loss) 
// VALUES (${username}, ${accountBalance}, false, false)`;
const postNewUser = (request, response) => {
  const { accountBalance } = request.body
  const username = ticker(20);
  // console.log('req body shit', username, accountBalance);
  pool.query(`INSERT INTO users(username, balance, stocks_held, stop_loss) VALUES ('${username}', ${accountBalance}, false, false)`, (error, results) => {
    if (error) {
      console.log('POST failure');
      throw error;
    }
    // console.log('POST success');
    response.status(201).send(`User added`);
  });
}

module.exports = {
  getStockTicker,
  getStockPrice,
  postNewUser
}