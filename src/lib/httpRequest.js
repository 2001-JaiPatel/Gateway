const axios = require('axios');

exports.getInstance = (options) => axios.create(options);
