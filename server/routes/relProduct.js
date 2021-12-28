const relProductRouter = require('express').Router();
const getRelatedProduct = require ('../relProductApi.js');
const productApi = require('../ProductApi.js');

relProductRouter.get('/related_products', async (req, res) => {
  let productId = req.query.Id;

  var relatedProductsIdList = await getRelatedProduct(productId);

  var data = await Promise.all(relatedProductsIdList.map(async relProdId => {
    var prodInfo = await productApi.getSpecificProduct(relProdId);
    var prodStyleInfo = await productApi.getProductStyles(relProdId);
    var relProdData = {
      ...prodInfo,
      ...prodStyleInfo
    };

    return relProdData;
  }));

  res.status(200).send(data);
});

module.exports = relProductRouter;