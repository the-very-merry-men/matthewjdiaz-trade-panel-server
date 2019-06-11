const fs = require("fs");
const faker = require('faker');
const writer = fs.createWriteStream('./seed.json')

const price = () => {
  return (Math.random() * 1500).toFixed(2);
}

const ticker = (length) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function writeTenMillionTimes(writer, encoding, callback, lines) {
  let i = 10000000;
  const randomObjMaker = () => {
    let addObject = {
      id: i,
      name: faker.company.companyName(),
      ticker: ticker(4),
      current_price: price()
    };
    return addObject;
  }

  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i % 500000 === 0) {
        console.log(i);
      }
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
