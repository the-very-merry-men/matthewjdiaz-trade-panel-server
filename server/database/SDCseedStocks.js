const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');

const price = () => {
  return (Math.random() * 2000).toFixed(2);
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

const dataGen = () => {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (let i = 1; i < 10000001; i++) {
    writer.write({
      id: i,
      name: faker.name.firstName(),
      ticker: ticker(4),
      price: price(),
    });
    if (i % 1000000 === 0) console.log(i);
  }

  writer.end();
  console.log('finished seeding stocks.');
}

dataGen();

//////////////   -      create stocks.csv by running "npm run seed-stocks"      -   /////////////////
// COPY stocks(id,name,ticker,current_price,average_price,week52high,week52low) 
// FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/stocks.csv' DELIMITER ',' CSV HEADER;