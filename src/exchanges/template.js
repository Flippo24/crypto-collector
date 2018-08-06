const EventEmitter = require('events').EventEmitter;
// const NameOfExchange = require('exchangeapi');

class exchange extends EventEmitter {
  constructor(product) {
    super();
    this.product = product;
    this.NameOfExchange = new NameOfExchange();
    this.NameOfExchange.ws.trades(product, tick => {
      if (tick.eventType==='trade') {
        const tickdata = {};
        tickdata.exchange = 'NameOfExchange';
        tickdata.timestamp = new Date(tick.eventTime).valueOf();
        tickdata.product = tick.symbol;
        tickdata.price = Number(tick.price);
        tickdata.volume = tick.quantity;
        this.emit('tick', tickdata);
      }
    });
  };
};

// module.exports = exchange;
