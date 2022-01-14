const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const productRouter = require('./routes/product.js');
const ratingsRouter = require('./routes/ratings.js');
const qnaRouter = require('./routes/qna.js');
const cartRouter = require('./routes/cart.js');
const relProductsRouter = require('./routes/relProduct.js');
const interactionsRouter = require('./routes/interactions.js');

app.use(express.static(__dirname + '/../client/dist'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/../client/dist/index.html');
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/product', productRouter);
app.use('/product', relProductsRouter);
app.use('/ratings', ratingsRouter);
app.use('/qna', qnaRouter);
app.use('/cart', cartRouter);
app.use('/interactions', interactionsRouter);

app.listen(port, () => console.log('Listening on:', port));