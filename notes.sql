///////////// SCHEMAS ///////////////

CREATE TABLE stocks(
  id serial PRIMARY KEY,
  name VARCHAR (11) NOT NULL,
  ticker VARCHAR (4) NOT NULL,
  current_price NUMERIC(6, 2) NOT NULL
);

CREATE TABLE users(
  id serial Primary Key,
  username VARCHAR (20) UNIQUE NOT NULL,
  balance NUMERIC(11, 2),
  stocks_held BOOLEAN NOT NULL,
  stop_loss BOOLEAN NOT NULL
);
npm run csv-users
COPY users(id,username,balance,stocks_held,stop_loss) 
FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/users.csv' DELIMITER ',' CSV HEADER;
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id)+1 FROM users), 1), false);

CREATE TABLE stocks_held(
  id serial Primary Key,
  user_id INTEGER NOT NULL,
  stock_id INTEGER,
  quantity INTEGER
);
npm run csv-stocks-held
COPY stocks_held(id,user_id,stock_id,quantity) 
FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/stocks-held.csv' DELIMITER ',' CSV HEADER;
SELECT setval('stocks_held_id_seq', COALESCE((SELECT MAX(id)+1 FROM stocks_held), 1), false);

CREATE TABLE stop_loss(
  id serial Primary Key,
  user_id VARCHAR (20) NOT NULL,
  stock_id INTEGER NOT NULL,
  stop_price NUMERIC(6, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  exp_date TIMESTAMP NOT NULL
);
npm run csv-stop-loss
COPY stop_loss(id,user_id,stock_id,stop_price,quantity,exp_date) 
FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/stop-loss.csv' DELIMITER ',' CSV HEADER;
SELECT setval('stop_loss_id_seq', COALESCE((SELECT MAX(id)+1 FROM stop_loss), 1), false);


////////// COMMON COMMANDS ///////////

DELETE FROM stocks
WHERE id < 10000001;

ALTER TABLE users
ADD COLUMN stop_loss boolean;

ALTER TABLE stocks 
DROP COLUMN week52low;

ALTER TABLE users
ALTER COLUMN username TYPE VARCHAR (20);

INSERT INTO table(column1, column2)
VALUES (value1, value2);


//////////// TESTS /////////////

//// users //// all tests are two passes, one fail
CREATE
INSERT INTO users(username, balance, stocks_held, stop_loss) VALUES ('newUser1', 1234.56, false, false);
INSERT INTO users(username, balance, stocks_held, stop_loss) VALUES ('newUser2', 1234.56, false, false);
INSERT INTO users(username, balance, stocks_held, stop_loss) VALUES ('matthewjdiaz1', 1234.56, false, false);

READ
SELECT * FROM users WHERE username = 'matthewjdiaz1';
SELECT * FROM users WHERE username = 'jeffday90';
SELECT * FROM users WHERE username = '123';

UPDATE
UPDATE users SET acc_bal = 99999 WHERE username = 'matthewjdiaz1';
UPDATE users SET acc_bal = 88888 WHERE username = 'jeffday90';
UPDATE users SET acc_bal = 0 WHERE username = '123';

DELETE
DELETE FROM users WHERE username = 'matthewjdiaz1';
DELETE FROM users WHERE username = 'jeffday90';
DELETE FROM users WHERE username = '123';

//// stocks_held //// all tests are two passes, one fail
CREATE
INSERT INTO stocks_held(user_id, stock_id, quantity) VALUES (0, 875456, 10);
UPDATE users SET acc_bal = 5555 WHERE username = 'matthewjdiaz1';
INSERT INTO stocks_held(user_id, stock_id, quantity) VALUES (1, 9999995, 0);
UPDATE users SET acc_bal = 999999 WHERE username = 'jeffday90';
INSERT INTO stocks_held(user_id, stock_id, quantity) VALUES (99, 0, 0);
UPDATE users SET acc_bal = 5555 WHERE username = '123';

READ
SELECT * FROM stocks_held WHERE user_id = 1;
SELECT * FROM stocks_held WHERE user_id = 2;
SELECT * FROM stocks_held WHERE user_id = 99;

UPDATE
UPDATE stocks_held SET quantity = 1 WHERE stock_id = 867203 AND user_id = 0;
UPDATE stocks_held SET quantity = 99999 WHERE stock_id = 9999999 AND user_id = 1;
UPDATE stocks_held SET quantity = 123 WHERE stock_id = 9999999 AND user_id = 99;

DELETE
DELETE FROM stocks_held WHERE stock_id = 12 AND username = 0;
DELETE FROM stocks_held WHERE stock_id = 9999999 AND username = 1;
DELETE FROM stocks_held WHERE stock_id = 0 AND username = 99;

//// stop_loss ////
CREATE
INSERT INTO stop_loss(user_id, stock_id, stop_price, quantity, exp_date) VALUES (0, 867203, 900.01, 12, '2019-08-22 19:10:25-07');
INSERT INTO stop_loss(user_id, stock_id, stop_price, quantity, exp_date) VALUES (1, 9999996, 446, 100, '2019-08-22 19:10:25-07');
INSERT INTO stop_loss(user_id, stock_id, stop_price, quantity, exp_date) VALUES (2, 1, 1.01, 1, '201');

READ
SELECT * FROM stop_loss WHERE user_id = 0;
SELECT * FROM stop_loss WHERE user_id = 1;
SELECT * FROM stop_loss WHERE user_id = 99;

UPDATE
UPDATE stop_loss SET quantity = 10 AND stop_price = 860 AND exp_date = '2019-08-22 19:10:25-07'
WHERE stock_id = 867203 AND user_id = 0;
UPDATE stop_loss SET quantity = 100 AND stop_price = 600 AND exp_date = '2019-08-22 19:10:25-07'
WHERE stock_id = 9999999 AND user_id = 1;
UPDATE stop_loss SET quantity = 10 AND stop_price = 860 AND exp_date = '2019-08-22 19:10:25-07'
WHERE stock_id = 867203 AND user_id = 2;

DELETE
DELETE FROM stop_loss WHERE user_id = 0 AND stock_id = 867203;
DELETE FROM stop_loss WHERE user_id = 1 AND stock_id = 9999998;
DELETE FROM stop_loss WHERE user_id = 2 AND stock_id = 1;
