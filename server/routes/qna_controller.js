const api = require('../qnaApi.js');

var receiveProductInfoById = function receiveProductInfoById(id) {
  return new Promise((resolve, reject) => {
    api.getProductFromHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var receiveQuestionList = function receiveQuestionList(id) {
  return new Promise((resolve, reject)=> {
    api.getQuestionsFromHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var increaseQuestionHelp = function increaseQuestionHelp(id) {
  return new Promise((resolve, reject) => {
    api.addQuestionHelpHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var increaseAnswerHelp = function increaseAnswerHelp(id) {
  return new Promise((resolve, reject) => {
    api.addAnswerHelpHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var addQuestionToServer = function addQuestionToServer(productId, body, name, email) {
  return new Promise((resolve, reject) => {
    api.addNewQuestionToHR(productId, body, name, email, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports.receiveProductInfoById = receiveProductInfoById;
module.exports.receiveQuestionList = receiveQuestionList;
module.exports.increaseQuestionHelp = increaseQuestionHelp;
module.exports.increaseAnswerHelp = increaseAnswerHelp;
module.exports.addQuestionToServer = addQuestionToServer;
