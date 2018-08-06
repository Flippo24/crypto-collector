const {get} = require('lodash');

const config = {
  db: {
    host: 'localhost',
    name: 'Exchanges',
    port: 3306,
    username: 'root',
    password: 'root'
  }
}

module.exports = {
  get: function(path) {
    return get(config, path, {});
  }
}
