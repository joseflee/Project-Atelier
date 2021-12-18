const qnaRouter = require('express').Router();

qnaRouter.get('/', (req, res) => {
  res.end('QNA ROUTER');
});

module.exports = qnaRouter;