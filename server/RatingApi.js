const axios = require('axios');
const gitToken = require('../config.js');


const getReviewsAPI = () => {
  let productID = 0;
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productID}&count=100&sort=helpful&page=1`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
  .then(response => {
    console.log(response.data);
    return response.data;
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = {
  getReviewsAPI
}