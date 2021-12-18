const qnaRouter = require('express').Router();

// qnaRouter.get('/', (req, res) => {
//   res.end('QNA ROUTER');
// });

qnaRouter.get('/getProductById', (req, res) => {
  res.send('42');

});


module.exports = qnaRouter;