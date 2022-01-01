import React from 'react';
import ReactDOM from 'react-dom';
import ProductOverview from './components/ProdOverview/OverView.jsx';
import RelProducts from './components/RelProductsComponents/RelProducts.jsx';
import QnA from './components/QnAcomponents/mainQnA.jsx';
import RatingsNReviews from './components/RatingsNReviews/RatingsNReviews.jsx';
import axios from 'axios';

import { getProductInfo, getStyleInfo, getRelatedProductInfo, getQuestionsListInfo } from './helpers.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 59553,
      currentProduct: {},
      currentProductStyle: {},
      relatedProducts: [],
      questionsNAnswers: []
    };
  }

  async componentDidMount() {
    var productInfo = await getProductInfo(this.state.productId);
    var productStyleInfo = await getStyleInfo(this.state.productId);
    var relProductInfo = await getRelatedProductInfo(this.state.productId);
    var questionsList = await getQuestionsListInfo(this.state.productId);

    await this.setState({
      currentProduct: productInfo,
      currentProductStyle: productStyleInfo,
      relatedProducts: relProductInfo,
      questionsNAnswers: questionsList
    });
  }

  render() {
    return (
      <div>
        <ProductOverview productId={this.state.productId} currentProduct={this.state.currentProduct} currentProductStyle={this.state.productStyleInfo} />
        <RelProducts productId={this.state.productId} currentProduct={this.state.currentProduct} currentProductStyle={this.state.productStyleInfo} relatedProducts={this.state.relatedProducts} />
        <QnA productId={this.state.productId} currentProduct={this.state.currentProduct} questionsList={this.state.questionsNAnswers}/>
        <RatingsNReviews productId={this.state.productId} />
      </div>
    );
  }
}

export default App;
