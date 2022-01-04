import React from 'react';
import axios from 'axios';
import { products } from '../../../../example/products.js';

import ProductCards from './ProductCards.jsx';
import MyOutfitCards from './MyOutfitCards.jsx';

class RelProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfMyOutfits: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleRelProdCardClick = this.handleRelProdCardClick.bind(this);
    this.handleAddOutfitClick = this.handleAddOutfitClick.bind(this);
  }

  componentDidMount() {
  }

  handleRelProdCardClick(e) {
    var element = e.target;
    console.log('clicked element:', element);
  }

  handleAddOutfitClick(e) {
    var element = e.target;
    console.log('clicked element:', element);
  }

  render() {
    return (
      <div className="rel-prod-container">
        <h2>Related Products and My Outfits</h2>
        <div className='rel-products product-card-container'>
          <ProductCards productCards={this.props.relatedProducts} handleClick={this.handleRelProdCardClick} />
        </div>
        <div className='my-outfits product-card-container'>
          <MyOutfitCards myOutfitCards={this.state.listOfMyOutfits} handleClick={this.handleAddOutfitClick} />
        </div>
      </div>
    );
  }
}

export default RelProducts;