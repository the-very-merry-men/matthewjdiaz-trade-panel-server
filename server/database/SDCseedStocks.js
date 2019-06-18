const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = fs.createWriteStream('./seed.csv')
const faker = require('faker');

const price = () => {
  return Number((Math.random() * 1500).toFixed(2));
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

function writeOneMillionTimes(writer, encoding, callback, lines) {
  // let i = 10;
  let i = 10000001;
  const randomObjMaker = () => {
    let obj = `${i},${faker.name.firstName()},${ticker(4)},${price()}`
    return obj;
  }

  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i % 500000 === 0) {
        console.log(i);
      }
      if (i === 1) {
        // 1,Odie,ODIE,1015.74
        writer.write(((randomObjMaker()) + '\n'), encoding, callback);
      } else {
        ok = writer.write(((randomObjMaker()) + '\n'), encoding);
      }
    } while (i > 1 && ok);
    if (i > 1) {
      writer.once('drain', write);
    }
  }
}

writeOneMillionTimes(writer, 'utf8', (err) => {
  if (err) throw err;
});

// -vi to edit file from EC2, 

//////////////   -      create stocks.csv by running "npm run csv-stocks"      -   /////////////////
// COPY stocks(id,name,ticker,current_price,average_price,week52high,week52low) 
// FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/stocks.csv' DELIMITER ',' CSV HEADER;
