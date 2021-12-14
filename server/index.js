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

  let result = await api.getReviewsAPI()
  // console.log(req);
  res.status(200).send(result);
})

app.listen(port, () => console.log('Listening on:', port));
