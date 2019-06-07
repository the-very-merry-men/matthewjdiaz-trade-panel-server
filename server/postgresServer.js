// postgres server.js
const express = require('express');
const app = express()

app.use(express.json())

app.get('/postgres', (req, res) => {
  return res.status(200).send({ 'message': 'endpoint is working' });
})

app.listen(3001)
console.log('app running on port ', 3001);

