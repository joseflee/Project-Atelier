import axios from 'axios';

export var getProductInfo = async (productId) => {
  const productUrl = '/product/productInfo';
  return await axios.get('/product/productInfo', { params: { id: productId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export var getStyleInfo = async (productId) => {
  const styleUrl = '/product/styleInfo';
  return await axios.get('/product/styleInfo', { params: { id: productId } })
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
  var url = '/qna/getQuestionsList';
  return await axios.get('/qna/getQuestionsList', {params: { id: productId} })
    .then((response) => {
      return response.data.results;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export var getReviewInfo = async (productId) => {
  const styleUrl = '/product/reviewInfo';
  return await axios.get('/product/reviewInfo', { params: { id: productId } })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export var sendInteractions = async (data) => {
  const interactionsUrl = '/interactions/postData';
  return await axios.post(interactionsUrl, data)
    .then(response => console.log(response))
    .catch(error => console.log(error));
};