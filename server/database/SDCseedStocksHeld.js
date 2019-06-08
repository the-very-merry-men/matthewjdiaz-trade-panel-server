const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

////////// SCHEMA ///////////
// CREATE TABLE stocks_held(
//   id serial Primary Key,
//   user_id VARCHAR (20) NOT NULL,
//   stock_id INTEGER,
//   quantity INTEGER
// );

// (id,user_id,stock_id,quantity)
const stocks_held = [
  [1, 0, 867203, 12],
  [2, 0, 7212, 15],
  [3, 0, 12, 5],
  [4, 0, 1324155, 100],
  [5, 0, 6715327, 100],
  [6, 1, 9999999, 100],
  [7, 1, 9999998, 100],
  [8, 1, 9999997, 100],
  [9, 1, 9999996, 100],
  [10, 1, 9999995, 100],
  [11, 2, 4000, 100],
  [12, 2, 5000, 100],
  [13, 2, 6000, 100],
  [14, 2, 7000, 100],
  [15, 2, 8000, 100],
  [16, 3, 123, 1],
  [17, 3, 1234, 2],
  [18, 3, 12345, 3],
  [19, 3, 123456, 4],
  [20, 3, 1234567, 5],
]

const dataGen = () => {
  writer.pipe(fs.createWriteStream('stocks-held.csv'));
  // create stocks-held.csv based on object
  for (let i = 0; i < stocks_held.length; i++) {
    writer.write({
      id: stocks_held[i][0],
      user_id: stocks_held[i][1],
      stock_id: stocks_held[i][2],
      quantity: stocks_held[i][3],
    });
  }
  writer.end();
  console.log('finished creating stocks-held.csv');
}

dataGen();

// create new stocks-held.csv by running "npm run csv-stocks-held"
// populate table with new csv file by inputing the following into psql terminal

// COPY stocks_held(id,user_id,stock_id,quantity) 
// FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/stocks-held.csv' DELIMITER ',' CSV HEADER;