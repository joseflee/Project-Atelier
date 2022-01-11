const interactionsRouter = require('express').Router();
const postInteractions = require('../interactionsApi.js');

interactionsRouter.post('/postData', (req, res) => {
  let postData = req.body;

  postInteractions(postData)
    .then(response => console.log(response))
    .catch(err => console.log(err));
});

module.exports = interactionsRouter;