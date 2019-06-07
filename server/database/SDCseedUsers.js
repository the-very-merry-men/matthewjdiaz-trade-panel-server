const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');

////////// SCHEMA ///////////
// CREATE TABLE users(
//   id serial Primary Key,
//   username VARCHAR (20) NOT NULL,
//   balance NUMERIC(11, 2)
// );

const users = [
  [1, 'matthewjdiaz1', 6666.66],
  [2, 'jeffday90', 420.69],
  [3, 'mchengye93', 98450.23],
  [4, 'doughertyg', 10000.01]
]

const dataGen = () => {
  writer.pipe(fs.createWriteStream('users.csv'));
  // create 4 users based on object
  for (let i = 0; i < users.length; i++) {
    writer.write({
      id: users[i][0],
      username: users[i][1],
      balance: users[i][2]
    });
    console.log('seeded user', users[i][1]);
  }
  writer.end();
  console.log('finished seeding users.');
}

dataGen();


//////////////   -      create users.csv by running "npm run seed-users"      -   /////////////////
// COPY users(id,username,balance) 
// FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/users.csv' DELIMITER ',' CSV HEADER;