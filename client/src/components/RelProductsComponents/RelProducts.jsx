import React from 'react';
import axios from 'axios';
import { products } from '../../../../example/products.js';

import ProductCards from './ProductCards.jsx';
import MyOutfitCards from './MyOutfitCards.jsx';

class RelProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: this.props.currentProduct,
      listOfMyOutfits: [],
      leftArrowDisplay: true,
      rightArrowDisplay: true
    };

    // this.componentDidMount = this.componentDidMount.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleAddOutfitClick = this.handleAddOutfitClick.bind(this);
  }

  handleCardClick(id) {
    this.props.handleClick(id);
  }

  handleAddOutfitClick(e) {
    var element = e.target;
    if (this.state.listOfMyOutfits.length === 0) {
      this.setState({
        listOfMyOutfits: [this.state.currentProduct]
      });
    } else {
      for (var i = 0; i < this.state.listOfMyOutfits.length; i++) {
        console.log(this.state.listOfMyOutfits[i].id);
        if (this.state.listOfMyOutfits[i].id !== this.state.currentProduct.id) {
          this.setState({
            listOfMyOutfits: [this.state.currentProduct, ...this.state.listOfMyOutfits]
          });
        }
      }
    }
  }

  render() {
    return (
      <div className="rel-prod-container">
        <h2>Related Products and My Outfits</h2>
        <div className='rel-products product-card-container'>
          <ProductCards productCards={this.props.relatedProducts} handleClick={this.handleCardClick} />
        </div>
        <div className='my-outfits product-card-container'>
          <MyOutfitCards myOutfitCards={this.state.listOfMyOutfits} handleClick={this.handleCardClick} handleAddOutfitClick={this.handleAddOutfitClick} />
        </div>
      </div>
    );
  }
}

export default RelProducts;