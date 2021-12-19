const axios = require('axios');
const gitToken = require('../config.js');

var getProductFromHR = function getProductFromHR(id, callback) {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`,
    headers: { Authorization: gitToken.Token },
  };
  axios.get(options.url, options)
    .then(function (response) {
      //console.log(response);
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(err, null);
    });

};

module.exports.getProductFromHR = getProductFromHR;