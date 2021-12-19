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

  var receiveQuestionList = function receiveQuestionList() {
    return new Promise((resolve, reject)=> {
      api.getQuestionsFromHR((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  receiveQuestionList().
    then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });

});



module.exports = qnaRouter;