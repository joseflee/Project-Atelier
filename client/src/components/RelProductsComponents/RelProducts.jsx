import React from 'react';
import axios from 'axios';
import { products } from '../../../../example/products.js';

import ProductCards from './ProductCards.jsx';
import MyOutfitCards from './MyOutfitCards.jsx';

class RelProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfRelatedProducts: products,
      listOfMyOutfits: []
    };
  }

  componentDidMount() {
    // axios.get('/related_products')
    //   .then(relProdInfo => {
    //     console.log('Related Products Info: ', relProdInfo);
    //     this.setState = {
    //       relatedProducts: relProdInfo
    //     };
    //   })
    //   .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="rel-prod-container">
        <h2>Related Products and My Outfits</h2>
        <div className='rel-products'>
          <ProductCards productCards={this.state.listOfRelatedProducts}/>
        </div>
        <div className='my-outfits'>
          <MyOutfitCards myOutfitCards={this.state.listOfMyOutfits}/>
        </div>
      </div>
    );
  }
}

export default RelProducts;