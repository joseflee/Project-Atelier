import axios from 'axios';

export var getProductInfo = async (productId) => {
  const productUrl = 'http://localhost:3000/product/productInfo';
  return await axios.get(productUrl, { params: { id: productId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export var getStyleInfo = async (productId) => {
  const styleUrl = 'http://localhost:3000/product/styleInfo';
  return await axios.get(styleUrl, { params: { id: productId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export var getRelatedProductInfo = async (productId) => {
  return await axios.get('/product/related_products', { params: { Id: productId } })
    .then(response => {
      return response.data;
    })
    .catch(err => console.error(err));
};

export var getQuestionsListInfo = async (productId) => {
  var url = 'http://localhost:3000/qna/getQuestionsList';
  return await axios.get(url, {params: { id: productId} })
    .then((response) => {
      return response.data.results;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export var getReviewInfo = async (productId) => {
  const styleUrl = 'http://localhost:3000/product/reviewInfo';
  return await axios.get(styleUrl, { params: { id: productId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export var sendInteractions = async (data) => {
  const interactionsUrl = 'http://localhost:3000/interactions/data';
  return await axios.post(interactionsUrl, data)
    .then(response => console.log(response))
    .catch(err => console.log(error));
};