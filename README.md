# Trade Panel

## Table of Contents

1. [Related Projects](#related-projects)
1. [Installing Dependencies](#installing-dependencies)
1. [API Requests](#api-requests)

## Related Projects

  - https://github.com/the-very-merry-men/stock-chart-jeff
  - https://github.com/the-very-merry-men/earnings-graph-graham
  - https://github.com/the-very-merry-men/SDC-PricePaidChart
  > proxy
  - https://github.com/the-very-merry-men/matthewjdiaz-trade-panel-proxy


## Installing Dependencies

From within the root directory:
```sh
npm install
```
> edit server/database/index.js file by adding your MySQL password
> note: creates 10 million entries and requires 4g of memory
to seed database:
```
npm run seed
```

to create bundle.js and start the server:
```
npm run build
npm start
```


# API Requests
## users
### Create
> routes - /POST/${username}/
> input - username, accountBalance
> output - INSERT INTO users(username, balance, stocks_held, stop_loss) VALUES (${username}, ${accountBalance}, false, false);
> description - creates a new user profile account
### Read
> routes - /GET/${username}/
> input - username
> output - SELECT * FROM users WHERE username = ${username};
> description - displays a users balance, stocks, and stop losses
### Update
> route - /PUT/${username}/
> input - username, accountBalance
> output - UPDATE users SET acc_bal = ${accountBalance} WHERE username = ${username};
> description - update a users balance
### Delete
> route - /DELETE/${username}/
> input - username
> output - DELETE FROM users WHERE username = ${username};
> description - delete user by username

## stocks_held
### Create
> routes - /POST/${username}/stocks_held/
> input - username, accountBalance, stockName, amountBought, currentPrice
> output - 
  if (accountBalance > (amountBought * currentPrice))
    INSERT INTO stocks_held(user_id, stock_id, quantity)
    VALUES (${username}, ${stockName}, ${amountBought});
  AND => /PUT/${username}/
    UPDATE users SET acc_bal = ${acc_bal - (amountBought * currentPrice)}
    WHERE username = ${username};
> description - add purchased stocks to a users profile AND updates their account balance if they have enough money
### Read
> routes - /GET/${username}/stocks_held/
> input - username
> output - 
  SELECT * FROM stocks_held WHERE user_id = ${username};
> description - display a users stocks
### Update
> route - /PUT/${username}/stocks_held/
> input - username, stockName, quantity, new_quantity
> output - 
  if(new_quantity > quantity)
    UPDATE stocks_held SET quantity = ${new_quantity}
    WHERE stock_name = ${stock_name} AND user_id = ${username};
  else
    UPDATE stocks_held SET quantity = ${quantity - new_quantity}
    WHERE stock_name = ${stock_name} AND user_id = ${username};
> description - update the amount of a certain stocks a user has
### Delete
> route - /DELETE/${username}/stocks_held/
> input - username, stock_id
> output - DELETE FROM stocks_held WHERE stock_id = ${stock_id};
> description - delete stock

## stop_loss
### Create
> routes - /POST/${username}/stop_loss/
> input - username, stockName, targetPrice, quantity, timestamp, accountBalance
> output - 
  if (accountBalance > (targetPrice * quantity))
    INSERT INTO stop_loss(user_id, stock_id, stop_price, quantity, exp_date)
    VALUES (${username}, ${stockName}, ${targetPrice}, ${quantity}, ${timestamp});
> description - create a stop loss for a certian stock at a certain price until a certian timestamp
### Read
> routes - /GET/${username}/stop_loss/
> input - username
> output - SELECT * FROM stop_loss WHERE user_id = ${username};
> description - display a users current stop losses
### Update-
> route - /PUT/${username}/stop_loss/
> input - username, stockName, new_price AND/OR new_quantity AND/OR new_date
> output - 
  UPDATE stop_loss SET quantity = ${new_quantity} AND stop_price = ${new_price} AND exp_date = ${new_date}
  WHERE stock_name = ${stock_name} AND user_id = ${username};
> description - update a users stop loss quantity or date
### Delete
> route - /DELETE/${username}/stop_loss/
> input - username, stock_id
> output - DELETE FROM stop_loss WHERE username = ${username} AND stock_id = ${stock_id};
> description - delete a users stop loss

