const interactionsRouter = require('express').Router();
const postInteractions = require('../interactionsApi.js');

interactionsRouter.post('/postData', async (req, res) => {
  let postData = req.body;
  let element = postData.element;
  let widget = postData.widget;
  let time = postData.time;
  await postInteractions(element, widget, time);
  res.status(201).end();
});

module.exports = interactionsRouter;