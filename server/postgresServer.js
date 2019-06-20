// postgres server.js // "index.js"
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database/queries.js')
const app = express();
const port = 3420;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/public')));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
});

// app.get('/stocks', db.getRandomStock);
app.get('/api/stocks/price', db.getStockPrice);
app.get('/api/stocks/', db.getStockNewRelic);
app.post('/api/users/', db.postNewUser);
app.get('/stocks/:stock', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'));
});
app.get('/api/stocks/:stock', db.getStockTicker);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
