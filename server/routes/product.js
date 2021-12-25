const productRouter = require('express').Router();
const productApi = require ('../ProductApi.js');

productRouter.get('/productInfo', async (req, res) => {
  let id = req.query.id;
  var data = await productApi.getSpecificProduct(id);
  res.send(data);
});

productRouter.get('/styleInfo', async (req, res) => {
  let id = req.query.id;
  var data = await productApi.getProductStyles(id);
  res.send(data);
});

module.exports = productRouter;