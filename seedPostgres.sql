DELETE FROM users
WHERE id > 0;
COPY users(id,username,balance,stocks_held,stop_loss) 
FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/users.csv' DELIMITER ',' CSV HEADER;
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id)+1 FROM users), 1), false);

DELETE FROM stocks_held
WHERE id > 0;
COPY stocks_held(id,user_id,stock_id,quantity) 
FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/stocks-held.csv' DELIMITER ',' CSV HEADER;
SELECT setval('stocks_held_id_seq', COALESCE((SELECT MAX(id)+1 FROM stocks_held), 1), false);

DELETE FROM stop_loss
WHERE id > 0;
COPY stop_loss(id,user_id,stock_id,stop_price,quantity,exp_date) 
FROM '/Users/carforce/code/training/hackreactor/SDC/trade-panel/stop-loss.csv' DELIMITER ',' CSV HEADER;
SELECT setval('stop_loss_id_seq', COALESCE((SELECT MAX(id)+1 FROM stop_loss), 1), false);