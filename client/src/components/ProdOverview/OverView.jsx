import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';

class Overview extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }


  render () {
    return (
      <div className='overview'>
        <ProductInfo />
        <StyleSelector />
        <AddToCart />
      </div>
    );
  }
}

export default Overview;