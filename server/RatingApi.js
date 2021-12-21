const axios = require('axios');
const gitToken = require('../config.js');


const getTotalReviews = (productId, page) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productId}&count=50&sort=relevant&page=${page}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      // console.log('response:', response.data.results.length);
      return response.data;
    })
    .catch((err) => {
      console.log('This is the getTotalReviews error: ', err);
    });
};
const updateHelpfulness = (reviewId) => {
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewId}/helpful`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      // console.log('updatehelpful response:', response);
      return response;
    })
    .catch((err) => {
      console.log('This is the updateHelpfulness error: ', err);
    });
};

const ratingOverview = (productId) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      // console.log('ratingOverview response:', response.data);
      return response.data;
    })
    .catch((err) => {
      console.log('This is the ratingOverview error: ', err);
    });
};

const postReview = async (productId) => {
  productId = 59553;
  let params = {
    'product_id': 59553,
    'rating': 5,
    'summary': '789',
    'body': 'zxczxczxz',
    'recommend': true,
    'name': 'kitty',
    'email': 'asdsdsa@qq.com',
    'photos': [],
    'characteristics': { '15': 1, '16': 2}
  };
  let options = {
    method: 'post',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews',
    headers: { Authorization: gitToken.Token },
    data: params
  };
  return axios(options)
    .catch((err) => {
      console.log('This is the post review error: ', err);
    });

};
module.exports = {
  getTotalReviews,
  updateHelpfulness,
  ratingOverview,
  postReview
};