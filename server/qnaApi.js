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
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(err, null);
    });

};

var getQuestionsFromHR = function getQuestionsFromHR(id, callback) {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${id}`,
    headers: { Authorization: gitToken.Token }
  };
  axios.get(options.url, options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};

var addQuestionHelpHR = function addQuestionHelpHR(id, callback) {
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${id}/helpful`,
    headers: { Authorization: gitToken.Token }
  };
  axios.put(options.url, '', options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error, null);
    });
};

var addAnswerHelpHR = function addAnswerHelpHR(id, callback) {
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${id}/helpful`,
    headers: { Authorization: gitToken.Token }
  };
  axios.put(options.url, '', options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error, null);
    });
};

module.exports.getProductFromHR = getProductFromHR;
module.exports.getQuestionsFromHR = getQuestionsFromHR;
module.exports.addQuestionHelpHR = addQuestionHelpHR;
module.exports.addAnswerHelpHR = addAnswerHelpHR;