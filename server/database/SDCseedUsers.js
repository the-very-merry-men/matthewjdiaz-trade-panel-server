const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();

////////// SCHEMA ///////////
// CREATE TABLE users(
//   id serial Primary Key,
//   username VARCHAR (20) NOT NULL,
//   balance NUMERIC(11, 2)
// );

// (id,username,balance,stocks_held,stop_loss) 
const users = [
  [1, 'matthewjdiaz1', 6666.66, true, true],
  [2, 'jeffday90', 420.69, true, true],
  [3, 'mchengye93', 98450.23, true, false],
  [4, 'doughertyg', 10000.01, true, true]
]

const dataGen = () => {
  writer.pipe(fs.createWriteStream('users.csv'));
  // create users based on object
  for (let i = 0; i < users.length; i++) {
    writer.write({
      id: users[i][0],
      username: users[i][1],
      balance: users[i][2],
      stocks_held: users[i][3],
      stop_loss: users[i][4]
    });
    console.log('seeded user', users[i][1]);
  }
  writer.end();
  console.log('finished creating users.csv');
}

dataGen();


//////////////   -      create users.csv by running "npm run csv-users"      -   /////////////////
// COPY users(id,username,balance) 
// FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/users.csv' DELIMITER ',' CSV HEADER;