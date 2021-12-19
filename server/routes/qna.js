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
      //console.log(err);
      res.sendStatus(400);
    });

});

qnaRouter.put('/addHelpfullness', (req, res) => {
  let id = req.body.params.id;

  qnaController.increaseHelpfullness(id)
    .then(result => {
      console.log('qna router 75', result);
    })
    .catch(err => {
      console.log(err);
    });

});



module.exports = qnaRouter;