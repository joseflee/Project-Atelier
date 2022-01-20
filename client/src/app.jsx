import React from 'react';
import ReactDOM from 'react-dom';
import TopSearchBar from './components/TopSearchBar/TopSearchBar.jsx';
import ProductOverviewWithClickData from './components/ProdOverview/OverView.jsx';
import RelProductsWithClickData from './components/RelProductsComponents/RelProducts.jsx';
import QnAwithClickData from './components/QnAcomponents/mainQnA.jsx';
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
      outFitStyleId: null,
      favoriteOutfits: [],
      totalReviews: 0,
      averageRate: 0,
    };
    this.handleAverageRate = this.handleAverageRate.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.handleReviews = this.handleReviews.bind(this);
  }

  componentDidMount() {
    this.updateProduct(this.state.productId);
  }

  handleReviews(reviews) {
    this.setState({totalReviews: reviews});
  }
  handleAverageRate(rate) {
    this.setState({averageRate: rate});
  }

  async updateProduct(productId) {
    const [productInfo, productStyleInfo, relProductInfo, questionsList, reviewInfo] = await Promise.all([
      getProductInfo(productId),
      getStyleInfo(productId),
      getRelatedProductInfo(productId),
      getQuestionsListInfo(productId),
    ]);

    this.setState({
      currentProduct: productInfo,
      currentProductStyle: productStyleInfo,
      relatedProducts: relProductInfo,
      questionsNAnswers: questionsList,
      outFitStyleId: productInfo.results[0].style_id,
    });
  }

  addToOutfit(id) {
    this.setState({
      outFitStyleId: id,
    });
  }

  toggleAddToFavorite() {
    if (!this.state.favoriteOutfits.includes(this.state.outFitStyleId)) {
      this.setState({
        favoriteOutfits: [...this.state.favoriteOutfits, this.state.outFitStyleId],
      });
    } else {
      const newArr = [...this.state.favoriteOutfits];
      var index = newArr.indexOf(this.state.outFitStyleId);
      newArr.splice(index, 1);
      this.setState({
        favoriteOutfits: newArr,
      });
    }
    console.log(this.state.favoriteOutfits, this.state.currentProduct);
  }

  // Removing and Adding to favoriteOutfits array will affect the Product Overview as well.
  // Add a Remove from favoriteOutfits to setState in removing that outfit.

  removeOutfit(id) {
    // this.state.favoriteOutfits.indexOf(id);
  }

  render() {
    console.log('average', this.state.averageRate);
    const {
      currentProduct,
      currentProductStyle,
      relatedProducts,
      questionsNAnswers,
    } = this.state;

    if (currentProduct === null || currentProductStyle === null || relatedProducts === null ||
      questionsNAnswers === null) {
      return null;
    } else {
      return (
        <div>
          <TopSearchBar />
          <ProductOverviewWithClickData productId={this.state.productId} currentProduct={this.state.currentProduct}
            currentProductStyle={this.state.currentProductStyle} currentRatings={this.state.averageRate}
            addToOutfit={this.addToOutfit.bind(this)} toggleFavorite={this.toggleAddToFavorite.bind(this)}
            addToFavorites={this.state.favoriteOutfits} currentStyleId={this.state.outFitStyleId} totalReviews={this.state.totalReviews} />
          <RelProductsWithClickData productId={this.state.productId} currentProduct={this.state.currentProduct} relatedProducts={this.state.relatedProducts}
            currentStyleId={this.state.outFitStyleId}
            handleClick={this.updateProduct} addOutfit={this.addToOutfit} removeOutfit={this.removeOutfit}
            toggleFavorite={this.toggleAddToFavorite} favorites={this.state.favoriteOutfits} />
          <QnAwithClickData productId={this.state.productId} currentProduct={this.state.currentProduct} questionsList={this.state.questionsNAnswers}/>
          <RatingsNReviews handleAverageRate={this.handleAverageRate} handleReviews={this.handleReviews} productId={this.state.productId} currentProduct={this.state.currentProduct} />
        </div>
      );
    }
  }
}

export default App;
