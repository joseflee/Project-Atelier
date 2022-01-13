import React from 'react';
import ReactDOM from 'react-dom';
import TopSearchBar from './components/TopSearchBar/TopSearchBar.jsx';
import ProductOverview from './components/ProdOverview/OverView.jsx';
import RelProductsWithClickData from './components/RelProductsComponents/RelProducts.jsx';
import QnA from './components/QnAcomponents/mainQnA.jsx';
import RatingsNReviews from './components/RatingsNReviews/RatingsNReviews.jsx';
import axios from 'axios';

import ClickedData from './components/ClickDataAnalytics.jsx';
// const RelProductsWithClickData = ClickedData(RelProducts);

import { getProductInfo, getStyleInfo, getRelatedProductInfo, getQuestionsListInfo, getReviewInfo } from './helpers.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 59555,
      currentProduct: null,
      currentProductStyle: null,
      relatedProducts: null,
      questionsNAnswers: null,
      productReview: null,
      totalReviews: 0
    };

    this.updateProduct = this.updateProduct.bind(this);
    this.handleReviews = this.handleReviews.bind(this);
  }

  componentDidMount() {
    this.updateProduct(this.state.productId);
  }
  handleReviews (reviews) {
    this.setState({totalReviews: reviews});
  }
  async updateProduct(productId) {
    const [productInfo, productStyleInfo, relProductInfo, questionsList, reviewInfo] = await Promise.all([
      getProductInfo(productId),
      getStyleInfo(productId),
      getRelatedProductInfo(productId),
      getQuestionsListInfo(productId),
      getReviewInfo(productId)
    ]);

    this.setState({
      currentProduct: productInfo,
      currentProductStyle: productStyleInfo,
      relatedProducts: relProductInfo,
      questionsNAnswers: questionsList,
      productReview: reviewInfo,
    });
  }

  render() {
    const {
      currentProduct,
      currentProductStyle,
      relatedProducts,
      questionsNAnswers,
      productReview,
    } = this.state;

    if (currentProduct === null || currentProductStyle === null || relatedProducts === null ||
      questionsNAnswers === null || productReview === null) {
      return null;
    } else {
      return (
        <div>
          <TopSearchBar/>
          <ProductOverview productId={this.state.productId} currentProduct={this.state.currentProduct} currentProductStyle={this.state.currentProductStyle} currentReview={this.state.productReview} />
          <RelProductsWithClickData productId={this.state.productId} currentProduct={this.state.currentProduct} relatedProducts={this.state.relatedProducts} handleClick={this.updateProduct} />
          <QnA productId={this.state.productId} currentProduct={this.state.currentProduct} questionsList={this.state.questionsNAnswers}/>
          <RatingsNReviews handleReviews={this.handleReviews} productId={this.state.productId} currentProduct={this.state.currentProduct} />
        </div>
      );
    }
  }
}

export default App;
