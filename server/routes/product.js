const productRouter = require('express').Router();
const productApi = require ('../ProductApi.js');
const ratingApi = require('../RatingApi.js');

productRouter.get('/productInfo', async (req, res) => {
  let id = req.query.id;

  var prodInfo = await productApi.getSpecificProduct(id);
  var prodStyleInfo = await productApi.getProductStyles(id);
  var prodRatingInfo = await ratingApi.ratingOverview(id);
  var productData = {
    ...prodInfo,
    ...prodStyleInfo,
    ...prodRatingInfo
  };

  res.status(200).send(productData);
});

productRouter.get('/styleInfo', async (req, res) => {
  let id = req.query.id;
  var data = await productApi.getProductStyles(id);
  res.send(data);
});

productRouter.get('/reviewInfo', async (req, res) => {
  let id = req.query.id;
  var data = await productApi.getProductReviews(id);
  res.send(data);
});

module.exports = productRouter;