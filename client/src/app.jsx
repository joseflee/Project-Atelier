import React from 'react';
import ReactDOM from 'react-dom';
import ProductOverview from './components/ProdOverview/OverView.jsx';
import RelProducts from './components/RelProductsComponents/RelProducts.jsx';
import QnA from './components/QnAcomponents/mainQnA.jsx';
import RatingsNReviews from './components/RatingsNReviews/RatingsNReviews.jsx';
import axios from 'axios';

import { getProductInfo, getStyleInfo, getRelatedProductInfo, getQuestionsListInfo, getReviewInfo } from './helpers.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 59553,
      currentProduct: null,
      currentProductStyle: null,
      relatedProducts: null,
      questionsNAnswers: null,
    };
  }

  async componentDidMount() {
    // var productInfo = await getProductInfo(this.state.productId);
    // var productStyleInfo = await getStyleInfo(this.state.productId);
    // var relProductInfo = await getRelatedProductInfo(this.state.productId);
    // var questionsList = await getQuestionsListInfo(this.state.productId);
    // var reviewInfo = await getReviewInfo(this.state.productId);

    // await this.setState({
    //   currentProduct: productInfo,
    //   currentProductStyle: productStyleInfo,
    //   relatedProducts: relProductInfo,
    //   questionsNAnswers: questionsList,
    //   productReview: reviewInfo,
    // });
    const [productInfo, productStyleInfo, relProductInfo, questionsList, reviewInfo] = await Promise.all([
      getProductInfo(this.state.productId),
      getStyleInfo(this.state.productId),
      getRelatedProductInfo(this.state.productId),
      getQuestionsListInfo(this.state.productId),
      getReviewInfo(this.state.productId)
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

    if (currentProduct == null || currentProductStyle == null || relatedProducts == null ||
      questionsNAnswers == null || productReview == null) {
      return null;
    } else {
      return (
        <div>
          {/* <ProductOverview productId={this.state.productId} currentProduct={this.state.currentProduct} currentProductStyle={this.state.currentProductStyle} currentReview={this.state.productReview} /> */}
          {/* <RelProducts productId={this.state.productId} currentProduct={this.state.currentProduct} currentProductStyle={this.state.productStyleInfo} relatedProducts={this.state.relatedProducts} /> */}
          {/* <QnA productId={this.state.productId} currentProduct={this.state.currentProduct} questionsList={this.state.questionsNAnswers}/> */}
          <RatingsNReviews productId={this.state.productId} currentProduct={this.state.currentProduct} />
        </div>
      );
    }
  }
}

export default App;
