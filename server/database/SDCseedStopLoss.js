const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

////////// SCHEMA ///////////
// CREATE TABLE stop_loss(
//   id serial Primary Key,
//   user_id VARCHAR (20) NOT NULL,
//   stock_id INTEGER NOT NULL,
//   stop_price NUMERIC(6, 2) NOT NULL,
//   quantity INTEGER NOT NULL,
//   exp_date TIMESTAMP NOT NULL
// );

// (id,user_id,stock_id,stop_price,quantity,exp_date)
const stop_loss = [
  [1, 1, 867203, 865.50, 12, '2019-08-22 19:10:25-07'],
  [2, 1, 12, 400, 5, '2019-09-22 19:10:25-07'],
  [3, 2, 9999999, 687.15, 100, '2019-07-22 19:10:25-07'],
  [4, 2, 9999998, 606.85, 100, '2019-07-22 19:10:25-07'],
  [5, 2, 9999997, 150, 100, '2019-07-22 19:10:25-07'],
  [6, 2, 9999996, 436.91, 100, '2019-07-22 19:10:25-07'],
  [7, 2, 9999995, 300.32, 100, '2019-07-22 19:10:25-07'],
  [8, 4, 1234567, 420.69, 5, '2019-09-22 19:10:25-07']
]

const dataGen = () => {
  writer.pipe(fs.createWriteStream('stop-loss.csv'));
  // create stop-loss.csv based on object
  for (let i = 0; i < stop_loss.length; i++) {
    writer.write({
      id: stop_loss[i][0],
      user_id: stop_loss[i][1],
      stock_id: stop_loss[i][2],
      stop_price: stop_loss[i][3],
      quantity: stop_loss[i][4],
      exp_date: stop_loss[i][5]
    });
  }
  writer.end();
  console.log('finished creating stop-loss.csv');
}

dataGen();

// create new stop-loss.csv by running "npm run csv-stop-loss"
// populate table with new csv file by inputing the following into psql terminal

// COPY stop_loss(id,user_id,stock_id,stop_price,quantity,exp_date) 
// FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/stop-loss.csv' DELIMITER ',' CSV HEADER;