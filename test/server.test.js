const request = require('request');
const port = 3001;

describe('Server API behavior', () => {
  it('should respond with price data from database upon a GET request', () => {
    // Make request to API
    request(`http://localhost:${port}/api/stocks/GOOG/price`, (err, _res, body) => {
      if (err) {
        return console.err(err);
      }
      let response = JSON.parse(body);
      expect(response.length).toBe(1);
      expect(response[0].price).not.toBeNaN();
    });
  });
});