const EventEmitter = require('events').EventEmitter;
const Gdax = require('gdax');

class exchange extends EventEmitter {
  constructor(product) {
    super();
    this.product = product;
    this.timeout = null;
    this.websocket = new Gdax.WebsocketClient(
      [product],
      'wss://ws-feed.pro.coinbase.com',
      null,
      { channels: ['matches', 'heartbeat'] }
    );

    this.websocket.on('message', (e) => {
      if (e.type === 'match') {
        const tickdata = {};
        tickdata.exchange = 'Gdax';
        tickdata.timestamp = new Date(e.time).valueOf();
        tickdata.product = e.product_id;
        tickdata.price = Number(e.price);
        tickdata.volume = e.size;
        this.emit('tick', tickdata);
      };
      if (e.type === 'heartbeat') {
        clearInterval(this.timeout);
        this.timeout = setInterval(function() {
          try {
            console.log('connect');
            this.websocket.connect();
          }
          catch (err) {
            console.log('connect');
            this.websocket.disconnect();
          }
        }, 10000);
      };
    });

    this.websocket.on('error', err => {
      /* handle error */
    });

    this.websocket.on('close', (data) => {
      console.log('ERROR', 'Websocket Error', `websocket closed unexpectedly with data: ${data}. Attempting to re-connect.`);
        // attempt to re-connect every 5 seconds.
      const interval = setInterval(() => {
        if (!this.websocket.socket) {
          this.websocket.connect();
        }
        else {
            clearInterval(interval);
        }
      }, 5000);
    });

  }

};

module.exports = exchange;
