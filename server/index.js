const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const productRouter = require('./routes/product.js');
const ratingsRouter = require('./routes/ratings.js');
const qnaRouter = require('./routes/qna.js');
const cartRouter = require('./routes/cart.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/product', productRouter);
app.use('/ratings', ratingsRouter);
app.use('/qna', qnaRouter);
app.use('/cart', cartRouter);



app.listen(port, () => console.log('Listening on:', port));