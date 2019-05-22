const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const controllers = require('./controllers');

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/public')));

app.get('/api/stocks/:stock/price', (req, res) => {
  controllers.getPrice(req.params.stock, (data) => {
    res.send(data);
  });
});

app.get('/stocks/:stock', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'));
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

module.exports = PORT;
