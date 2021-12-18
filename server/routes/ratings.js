const ratingsRouter = require('express').Router();
const api = require('../RatingApi.js');

ratingsRouter.get('/', (req, res) => {
  res.end('RATINGS ROUTER');
});

ratingsRouter.get('/getReviews', async (req, res) => {
  let productId = req.query.Id;
  // console.log("server receive ID:", req.query.Id);
  let totalReviews = await api.getTotalReviews(productId, 1);
  let prevReviews = totalReviews.results.slice();
  var newReviews = [];
  let i = 2;
  while (prevReviews.length > 0) {
    let temp = await api.getTotalReviews(productId, i);
    prevReviews = temp.results.slice();
    if (prevReviews.length > 0) {
      newReviews.push(prevReviews.slice());
      i++;
    }
  }
  newReviews = newReviews.flat();
  let result = totalReviews.results.concat(newReviews);
  res.status(200).send(result);
});

ratingsRouter.post('/updateHelpfulness', async (req, res) => {
  // console.log("receive review ID:", req.body.reviewId);
  const Id = req.body.Id;
  let totalReviews = await api.updateHelpfulness(Id);
  res.status(204).end();
});

module.exports = ratingsRouter;