const db = require('./src/db');
const Chart = require('gdax-candles');
const {tick} = require('./src/models/tick');

const dataTick = db.models.get('data');

const Products = [];

function addProduct(exchange, product, timeframe) {
  var chart = new Chart({product, timeframe}).start();
  chart.on('close', candle => {
    candle.exchange = exchange;
    dataTick.create(tick(candle));
  });
  chart.on('error', err => console.log(err));
  Products.push(chart);
};

addProduct('gdax','BTC-USD','5s');
addProduct('gdax','BCH-USD','5s');
addProduct('gdax','ETH-USD','5s');
addProduct('gdax','LTC-USD','5s');
