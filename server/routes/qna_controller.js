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

var increaseHelpfullness = function increaseHelpfullness(id) {
  return new Promise((resolve, reject) => {
    api.addHelpfullnessAtHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var increaseAnswerHelpfullness = function increaseHelpfullness(id) {
  return new Promise((resolve, reject) => {
    api.addAnswerHelp(id, (err, result) => {
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
module.exports.increaseHelpfullness = increaseHelpfullness;
module.exports.increaseAnswerHelpfullness = increaseAnswerHelpfullness;
