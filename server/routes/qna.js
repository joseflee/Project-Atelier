const qnaRouter = require('express').Router();
const axios = require('axios');
const api = require('../qnaApi.js');

// qnaRouter.get('/', (req, res) => {
//   res.end('QNA ROUTER');
// });

qnaRouter.get('/getProductById', (req, res) => {
  let id = req.query.id;

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
  receiveProductInfoById(id)
    .then(data => {
      //console.log('data', data);
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});

qnaRouter.get('/getQuestionsList', (req, res) =>{
  let id = req.query.id;
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

  receiveQuestionList(id).
    then(data => {
      res.send(data);
    })
    .catch(err => {
      //console.log(err);
      res.sendStatus(400);
    });

});

qnaRouter.put('/addHelpfullness', (req, res) => {
  let id = req.body.params.id;
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

  increaseHelpfullness(id)
    .then(result => {
      console.log('qna router 75', result);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
    });

});



module.exports = qnaRouter;