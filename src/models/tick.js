module.exports.tick = (tickdata) => ({
  exchange: tickdata.exchange,
  product: tickdata.product,
  timestamp: tickdata.timestamp,
  price: tickdata.price,
  volume: tickdata.volume
});
