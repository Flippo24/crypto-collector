const Sequelize = require('sequelize');

module.exports = {
  tick: {
    exchange: Sequelize.STRING,
    product: Sequelize.STRING,
    timestamp: Sequelize.BIGINT,
    price: Sequelize.REAL,
    volume: Sequelize.REAL
  }
}
