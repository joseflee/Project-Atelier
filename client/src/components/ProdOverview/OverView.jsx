import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector/StyleSelect.jsx';
import AddToCart from './AddToCart/AddToCart.jsx';
import DefaultGallery from './ImageGallery/DefaultGallery.jsx';
import sampleData from '../../../../example/products.js';
import axios from 'axios';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMounted: false,
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
          hasMounted: true,
          styles: response.data,
          displayStyle: response.data.results[0],
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
    if (!this.state.hasMounted) {
      return (
        <div>
        </div>
      );
    } else {
      return (
        <div className='overview'>
          <h1>Product Overview</h1>
          <ProductInfo />
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