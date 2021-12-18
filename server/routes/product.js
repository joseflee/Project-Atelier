const productRouter = require('express').Router();

productRouter.get('/', (req, res) => {
  res.end('PRODUCT ROUTER');
});

module.exports = productRouter;