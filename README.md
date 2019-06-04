# Trade Panel

## Table of Contents

1. [Related Projects](#related-projects)
1. [Installing Dependencies](#installing-dependencies)
1. [API Requests](#api-requests)
1. [Create](#Create)
1. [Read](#Read)
1. [Update](#Update)
1. [Delete](#Delete)

## Related Projects

  - https://github.com/the-very-merry-men/stock-chart-jeff
  - https://github.com/the-very-merry-men/earnings-graph-graham
  - https://github.com/the-very-merry-men/SDC-PricePaidChart
  > proxy
  - https://github.com/the-very-merry-men/matthewjdiaz-trade-panel-proxy

### Installing Dependencies

From within the root directory:
```sh
npm install
```
> edit server/database/index.js file by adding your MySQL password
to seed database run the following
```
npm run seed
```

to create bundle.js and start the server run the following
```
npm run build
npm start
```
> to create bundle.js in watch mode run npm run react-dev


# API Requests
## Create
route - /POST
input - name AND ticker AND price
output - none
description - create a new stock option

## Read
route - /GET
input - id OR name OR ticker
output - id AND name AND ticker AND price
description - search for a stock option

## Update
route - /PUT
input - id OR name OR ticker
output - none
description - change a stocks name, ticker, or price

## Delete
route - /DELETE
input - id OR name OR ticker
output - none
description - delete stock
    
> example table object:
> {id: 43,
>   name: 'Google',
>   ticker: 'GOOG',
>   price: 1,054.06
> }