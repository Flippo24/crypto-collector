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
    getDbData(exchange, product, timeframe, 3);
  });
  chart.on('error', err => console.log(err));
  Products.push(chart);
};

function getDbData(exchange, product, timeframe, count) {
  dataTick.findAll({
    raw: true,
    attributes: ['product', 'createdAt', 'last'],
    where: {
      exchange: exchange,
      product: product,
      // timeframe: '5s'
    },
    order: [
      ['createdAt', 'DESC']
    ],
    limit: count
  }).then((data) => {
      console.log(data)
      // parsing Date (timestamp) from sequelize fails
      // var obj = JSON.parse(data);
      // console.log(obj.last)
  }).catch((err) => {
      console.log(`Error: ${err}`)
  })
};

addProduct('gdax','BTC-USD','5s');
addProduct('gdax','BCH-USD','5s');
addProduct('gdax','ETH-USD','5s');
addProduct('gdax','LTC-USD','5s');
