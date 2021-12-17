const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const gitToken = require('../config.js');
const axios = require('axios');
const port = 3000;
const api = require('./RatingApi.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/getReviews', async (req, res) => {
  let productId = req.query.Id;
  // console.log("server receive ID:", req.query.Id);
  let totalReviews = await api.getTotalReviews(productId, 1);
  let prevReviews = totalReviews.results.slice();
  var newReviews = [];
  let i = 2;
  while (prevReviews.length > 0) {
    let temp = await api.getTotalReviews(productId, i);
    if (temp) {
      prevReviews = await temp.results.slice();
      if (prevReviews.length > 0) {
        newReviews.push(prevReviews.slice());
        i++;
      }
    }
  }
  newReviews = newReviews.flat();
  let result = totalReviews.results.concat(newReviews);
  res.status(200).send(result);
});

app.post('/updateHelpfulness', async (req, res) => {
  // console.log("receive review ID:", req.body.reviewId);
  const Id = req.body.Id;
  let totalReviews = await api.updateHelpfulness(Id);
  res.status(204).end();
});

app.listen(port, () => console.log('Listening on:', port));
