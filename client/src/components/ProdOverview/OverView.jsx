import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector/StyleSelect.jsx';
import AddToCart from './AddToCart.jsx';
import DefaultGallery from './ImageGallery/DefaultGallery.jsx';
import sampleData from '../../../../example/products.js';
import axios from 'axios';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: sampleData.products,
      styles: sampleData.style,
      mainProduct: sampleData.specificProduct,
      displayStyle: sampleData.style.results[0],
    };
    this.updateStyle = this.updateStyle.bind(this);
  }

  componentDidMount() {
    let productId = this.props.productId;
    const productUrl = 'http://localhost:3000/product/productInfo';
    axios.get(productUrl, {params: {id: productId}})
      .then((response) => {
        this.setState({
          mainProduct: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    const styleUrl = 'http://localhost:3000/product/styleInfo';
    axios.get(styleUrl, {params: {id: productId}})
      .then((response) => {
        this.setState({
          styles: response.data,
          displayStyle: response.data.results[0],
          styleResponse: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
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
    return (
      <div className='overview'>
        <h1>Product Overview</h1>
        <ProductInfo data={this.state.products[0]} />
        <StyleSelector data={this.state.styles} displayedStyle={this.state.displayStyle}
          changeStyle={this.updateStyle} />
        <AddToCart />
        <DefaultGallery photos={this.state.displayStyle.photos} />
      </div>
    );
  }
}

export default ProductOverview;