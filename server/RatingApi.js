const axios = require('axios');
const gitToken = require('../config.js');


const getTotalReviews = (productId) => {
   productId = 59553;
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productId}&count=100&sort=newest&page=1`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
  .then(response => {
    // console.log("response:",response.data.results.length);
    return response.data;
  })
  .catch((err) => {
    console.log("This is the getTotalReviews error: ",err);
  })
}
const updateHelpfulness = (reviewId) => {
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewId}/helpful`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
  .then(response => {
    console.log("updatehelpful response:", response);
    return response;
  })
  .catch((err) => {
    console.log("This is the updateHelpfulness error: ",err);
  })
}

module.exports = {
  getTotalReviews,
  updateHelpfulness
}