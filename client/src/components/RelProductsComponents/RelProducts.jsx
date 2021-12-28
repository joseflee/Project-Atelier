import React from 'react';
import axios from 'axios';
import { products } from '../../../../example/products.js';

import ProductCards from './ProductCards.jsx';
import MyOutfitCards from './MyOutfitCards.jsx';

class RelProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfRelatedProducts: [],
      listOfMyOutfits: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }

  componentDidMount() {
    // this.getRelatedProducts();
    axios.get('/product/related_products', { params: { Id: this.props.productId } })
      .then(relProdInfo => {
        this.setState({
          listOfRelatedProducts: relProdInfo.data
        });
        console.log('at componentDidMount: ', relProdInfo.data);
      })
      .catch(err => console.error(err));
  }

  handleClick(e) {
    var element = e.target;
    console.log('clicked element:', element);
  }

  render() {
    console.log('at render: ', this.state.listOfRelatedProducts);
    return (
      <div className="rel-prod-container">
        <h2>Related Products and My Outfits</h2>
        <div className='rel-products product-card-container'>
          <ProductCards productCards={this.state.listOfRelatedProducts} handleClick={this.handleClick} />
        </div>
        <div className='my-outfits product-card-container'>
          <MyOutfitCards myOutfitCards={this.state.listOfMyOutfits} handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default RelProducts;