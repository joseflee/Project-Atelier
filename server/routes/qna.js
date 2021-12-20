const qnaRouter = require('express').Router();
const axios = require('axios');
const api = require('../qnaApi.js');
const qnaController = require('./qna_controller.js');

qnaRouter.get('/getProductById', (req, res) => {
  let id = req.query.id;

  qnaController.receiveProductInfoById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
});

qnaRouter.get('/getQuestionsList', (req, res) =>{
  let id = req.query.id;

  qnaController.receiveQuestionList(id).
    then(data => {
      res.send(data);
    })
    .catch(err => {
      res.sendStatus(400);
    });

});

qnaRouter.put('/updateQuestionHelp', (req, res) => {
  let questionId = req.body.params.questionId;
  let productId = req.body.params.productId;

  qnaController.increaseQuestionHelp(questionId)
    .then(data => {
      qnaController.receiveQuestionList(productId)
        .then(result => {
          console.log('questions', result);
          res.send(result);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

qnaRouter.put('/updateAnswerHelp', (req, res) => {
  let answerId = req.body.params.answerId;
  let productId = req.body.params.productId;

  qnaController.increaseAnswerHelp(answerId)
    .then(data => {
      qnaController.receiveQuestionList(productId)
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });

});

module.exports = qnaRouter;