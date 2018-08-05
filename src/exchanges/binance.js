// const util = require('util');
const EventEmitter = require('events').EventEmitter;
const Binance = require('binance-api-node').default;

class exchange extends EventEmitter {
  constructor(product) {
    super();

    this.product = product;
    this.lastPrice = null;
    this.timeout = null;
    this.binance = new Binance();
    this.binance.ws.trades(product, tick => {
      if (tick.eventType==='trade') {
        const tickdata = {};
        tickdata.exchange = 'Binance';
        tickdata.timestamp = new Date(tick.eventTime).valueOf();
        tickdata.product = tick.symbol;
        tickdata.price = Number(tick.price);
        tickdata.volume = tick.quantity;
        this.emit('tick', tickdata);
      }
    });
  };
};

module.exports = exchange;
