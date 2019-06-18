const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  // host: 'localhost',
  host: 'ec2-3-14-12-98.us-east-2.compute.amazonaws.com',
  database: 'trade_panel',
  password: '$password',
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
    // console.log(results.rows);
    response.status(200).json(results.rows);
  });
}
const getStockNewRelic = (request, response) => {
  // const stock = parseInt(request.params.stock)
  const { stock } = request.body;
  pool.query(`SELECT * FROM stocks WHERE id = ${stock}`, (error, results) => {
    if (error) {
      throw error;
    }
    // console.log(results.rows);
    response.status(200).json(results.rows);
  });
}
// /api/stocks/:stock/price
const getStockPrice = (request, response) => {
  const { stock } = request.body;
  // const stock = parseInt(request.params.stock)
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
  // const { username, accountBalance } = request.body
  // artillery duplicate username shield below
  // comment out next two lines and use above if not testing /w artillery
  const { accountBalance } = request.body
  const username = ticker(20);
  pool.query(`INSERT INTO users(username, balance, stocks_held, stop_loss) VALUES ('${username}', ${accountBalance}, false, false)`, (error, results) => {
    if (error) {
      console.log('POST failure');

      throw error;
    }
    response.status(201).send(`User added`);
  });
}

module.exports = {
  getStockTicker,
  getStockPrice,
  postNewUser,
  getStockNewRelic
}