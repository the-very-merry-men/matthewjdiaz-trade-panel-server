const fs = require("fs");
const faker = require('faker');
const writer = fs.createWriteStream('./users.json')

const randNum = (min, max) => {
  return Number(Math.floor(Math.random() * (max - min + 1) + min));
}
const randPrice = (min, max) => {
  return Number((Math.random() * (max - min + 1) + min).toFixed(2));
}
function randomDate(start, end) {
  // Ex new Date(2001, 0, 1)
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}
const stocksHeldGen = (stockCount) => {
  // create array of random num of random stocks
  let stocks = [];
  for (let i = 1; i <= stockCount; i++) {
    let obj = {
      id: i,
      stock_id: randNum(1, 10000000),
      quantity: randNum(1, 200)
    };
    stocks.push(obj);
  }
  return stocks;
}
const stopLossGen = (stockCount) => {
  let stops = [];
  for (let i = 1; i <= stockCount; i++) {
    let obj = {
      id: i,
      stock_id: randNum(1, 10000000),
      stop_price: randPrice(1, 500),
      quantity: randNum(1, 200),
      exp_date: randomDate(new Date(), new Date(2020, 0, 1))
    }
    stops.push(obj);
  }
  return stops;
}

const USER_NAMES = [
  "matthewjdiaz1",
  "jeffday90",
  "mchengye93",
  "doughertyg",
  "test-user1",
  "test-user2"
]

function writeTenMillionTimes(writer, encoding, callback, lines) {
  let i = 5;
  const randomObjMaker = () => {
    let addObject = {
      id: i,
      username: USER_NAMES[i],
      balance: randPrice(500, 200000),
      stocks_held: stocksHeldGen(randNum(1, 5)),
      stop_loss: stopLossGen(randNum(0, 2))
    };
    return addObject;
  }

  write();
  function write() {
    let ok = true;
    do {
      i--;
      console.log(i);
      if (i === 0) {
        writer.write((JSON.stringify(randomObjMaker()) + '\n'), encoding, callback);
      } else {
        ok = writer.write((JSON.stringify(randomObjMaker()) + '\n'), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

writeTenMillionTimes(writer, 'utf8', (err) => {
  if (err) throw err;
});

// import seed.json to MongoDB by running the following
// mongoimport --db trade_panel --collection stocks --file seed.json

// import users.json to MongoDB by running the following
// mongoimport --db trade_panel --collection users --file users.json

// sample query
// db.collection('users').find({ id: 1);
