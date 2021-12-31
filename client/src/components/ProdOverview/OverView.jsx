import React from 'react';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import StyleSelector from './StyleSelector/StyleSelect.jsx';
import AddToCart from './AddToCart/AddToCart.jsx';
import DefaultGallery from './ImageGallery/DefaultGallery.jsx';
import sampleData from '../../../../example/products.js';
import axios from 'axios';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainProduct: undefined,
      styles: undefined,
      displayStyle: undefined,
    };
    this.updateStyle = this.updateStyle.bind(this);
  }

  async componentDidMount() {
    let productId = this.props.productId;
    const productUrl = 'http://localhost:3000/product/productInfo';
    const styleUrl = 'http://localhost:3000/product/styleInfo';
    const reviewUrl = 'http://localhost:3000/product/reviewInfo';
    const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
      axios.get(productUrl, {params: {id: productId}}),
      axios.get(styleUrl, {params: {id: productId}}),
      axios.get(reviewUrl, {params: {id: productId}})
    ]);
    this.setState({
      mainProduct: firstResponse.data,
      styles: secondResponse.data,
      displayStyle: secondResponse.data.results[0],
      productRatings: thirdResponse.data.ratings,
    });
  }

  updateStyle(selectedStyle) {
    // console.log('selectedStyle', selectedStyle);
    this.setState({
      displayStyle: selectedStyle,
    });
  }

  render () {
    // console.log('state', this.state);
    if (!this.state.styles) {
      return (
        <div>
        </div>
      );
    } else {
      return (
        <div className='overview'>
          <h1>Product Overview</h1>
          <ProductInfo product={this.state.mainProduct} style={this.state.displayStyle} ratings={this.state.productRatings} />
          <StyleSelector styles={this.state.styles} displayedStyle={this.state.displayStyle}
            changeStyle={this.updateStyle} />
          <AddToCart displayedStyle={this.state.displayStyle} />
          <DefaultGallery photos={this.state.displayStyle.photos} />
        </div>
      );
    }
  }
}

export default ProductOverview;