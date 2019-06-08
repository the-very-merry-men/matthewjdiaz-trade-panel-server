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
- routes - /POST/${username}/
- description - creates a new user profile account
- input - username, accountBalance
  > INSERT INTO users(username, balance, stocks_held, stop_loss) VALUES (${username}, ${accountBalance}, false, false);
### Read
- routes - /GET/${username}/
- description - displays a users balance, stocks, and stop losses
- input - username
  > SELECT * FROM users WHERE username = ${username};
### Update
- route - /PUT/${username}/
- description - update a users balance
- input - username, accountBalance
  > UPDATE users SET balance = ${accountBalance} WHERE username = ${username};
### Delete
- route - /DELETE/${username}/
- description - delete user by username
- input - username
  > DELETE FROM users WHERE username = ${username};

## stocks_held
### Create
- routes - /POST/${username}/stocks_held/
- description - add purchased stocks to a users profile AND updates their account balance if they have enough money
- input - username, accountBalance, stockName, amountBought, currentPrice
  * if (accountBalance > (amountBought * currentPrice))
  > INSERT INTO stocks_held(user_id, stock_id, quantity)
  > VALUES (${username}, ${stockName}, ${amountBought});
  * AND => /PUT/${username}/
  > UPDATE users SET balance = ${acc_bal - (amountBought * currentPrice)}
  > WHERE username = ${username};
### Read
- routes - /GET/${username}/stocks_held/
- description - display a users stocks
- input - username
  > SELECT * FROM stocks_held WHERE user_id = ${username};
### Update
- route - /PUT/${username}/stocks_held/
- input - username, stockName, quantity, new_quantity
- output - 
  * if(new_quantity > quantity)
  > UPDATE stocks_held SET quantity = ${new_quantity}
  > WHERE stock_id = ${stock_name} AND user_id = ${username};
  * else
  > UPDATE stocks_held SET quantity = ${quantity - new_quantity}
  > WHERE stock_id = ${stock_name} AND user_id = ${username};
- description - update the amount of a certain stocks a user has
### Delete
- route - /DELETE/${username}/stocks_held/
- description - delete stock
- input - username, stock_id
  > DELETE FROM stocks_held WHERE stock_id = ${stock_id} AND user_id = ${username};

## stop_loss
### Create
- routes - /POST/${username}/stop_loss/
- description - create a stop loss for a certian stock at a certain price until a certian timestamp
- input - username, stockName, targetPrice, quantity, timestamp, accountBalance
  * if (accountBalance > (targetPrice * quantity))
  > INSERT INTO stop_loss(user_id, stock_id, stop_price, quantity, exp_date)
  > VALUES (${username}, ${stockName}, ${targetPrice}, ${quantity}, ${timestamp});
### Read
- routes - /GET/${username}/stop_loss/
- description - display a users current stop losses
- input - username
  > SELECT * FROM stop_loss WHERE user_id = ${username};
### Update
- route - /PUT/${username}/stop_loss/
- description - update a users stop loss quantity or date
- input - username, stockName, new_price AND/OR new_quantity AND/OR new_date 
  > UPDATE stop_loss SET quantity = ${new_quantity}, stop_price = ${new_price}, exp_date = ${new_date}
  > WHERE stock_id = ${stock_name} AND user_id = ${username};
### Delete
- route - /DELETE/${username}/stop_loss/
- description - delete a users stop loss
- input - username, stock_id
  > DELETE FROM stop_loss WHERE user_id = ${username} AND stock_id = ${stock_id};
