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
      displayStyle: this.props.currentProductStyle.results[0],
    };
    this.updateStyle = this.updateStyle.bind(this);
  }


  updateStyle(selectedStyle) {
    // console.log('selectedStyle', selectedStyle);
    this.setState({
      displayStyle: selectedStyle,
    });
  }

  render () {
    return (
      <div className='overview'>
        <h1>Product Overview</h1>
        <ProductInfo product={this.props.currentProduct} style={this.props.currentProductStyle.results[0]} ratings={this.props.currentReview.ratings} />
        <StyleSelector styles={this.props.currentProductStyle} displayedStyle={this.state.displayStyle}
          changeStyle={this.updateStyle.bind(this)} />
        <AddToCart displayedStyle={this.state.displayStyle} />
        <DefaultGallery photos={this.state.displayStyle.photos} />
      </div>
    );
  }
}

export default ProductOverview;