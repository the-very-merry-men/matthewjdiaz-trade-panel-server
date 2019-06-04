const request = require('request');
const key = require('../config/api_key.js');
const connection = require('./index.js');
const models = require('../models');

// BEGIN SEEDING DATA
connection.sync({ force: true }).then(() => {
  let symbols;
  const industry = 'Technology'; /* Change this to preference */

  // Fetch latest stock financials from IEX API
  request({
    url: `https://cloud.iexapis.com/v1/stock/market/collection/sector?collectionName=${industry}&token=${key}`,
    headers: {
      'Content-Type': 'text/event-stream',
    },
  }, (_req, _res, body) => {
    const data = JSON.parse(body);
    symbols = data.slice(0, 100).map(iex => iex.symbol).join(',');
    const mappedData = data.slice(0, 100).map(iex => ({
      name: iex.companyName,
      ticker: iex.symbol,
      price: iex.latestPrice || Math.random() * 100,
      buy_rating: Math.floor(Math.random() * 100),
      rh_owners: Math.floor(Math.random() * 100000),
      market_cap: iex.marketCap || Math.random() * 1000000,
      pe_ratio: iex.peRatio || -30 + Math.random() * 60,
      div_yield: Math.random() * 100,
    }));

    // Fetch latest company information from IEX API
    request({
      url: `https://cloud.iexapis.com/v1/stock/market/batch?types=company&symbols=${symbols}&token=${key}`,
      headers: {
        'Content-Type': 'text/event-stream',
      },
    }, (_req, _res, body) => {
      const data = JSON.parse(body);

      Object.keys(data).slice(0, 100).forEach((ticker, i) => {
        mappedData[i].ceo = data[ticker].company.CEO;
        mappedData[i].employees = data[ticker].company.employees || Math.random() * 500000;
        mappedData[i].about = data[ticker].company.description;
      });
      // Populate the stocks table
      models.Stocks.bulkCreate(mappedData);
    });

    // Generate dummy data for the EPS table
    const startYear = 2017;
    const endYear = 2018;
    const epsData = [];
    mappedData.forEach((stock, stockId) => {
      const macroSeed = Math.random();
      for (let year = startYear; year <= endYear; year += 1) {
        for (let quarter = 1; quarter <= 4; quarter += 1) {
          epsData.push({
            stock_id: stockId + 1,
            year,
            quarter,
            actual_eps: (-10 + macroSeed * 20 + Math.random() * 5).toFixed(2),
            expected_eps: (-10 + macroSeed * 20 + Math.random() * 5).toFixed(2),
          });
        }
      }
    });
    // Populate the eps_ratio table
    models.EpsRatios.bulkCreate(epsData);
  });
}).catch(err => console.log(err));
