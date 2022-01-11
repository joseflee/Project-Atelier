import React from 'react';
import axios from 'axios';

import ProductCards from './ProductCards.jsx';
import MyOutfitCards from './MyOutfitCards.jsx';

import ClickedData from '../ClickDataAnalytics.jsx';

class RelProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfMyOutfits: [],
      leftArrowDisplay: true,
      rightArrowDisplay: true,
      // test if works in HOC
      widgetName: 'Related Products'
    };

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
        listOfMyOutfits: [this.props.currentProduct]
      });
    } else {
      var isPresent = false;

      for (var i = 0; i < this.state.listOfMyOutfits.length; i++) {
        if (this.state.listOfMyOutfits[i].id !== this.props.currentProduct.id) {
          isPresent = false;
        } else {
          isPresent = true;
          return;
        }
      }

      if (isPresent === false) {
        this.setState({
          listOfMyOutfits: [this.props.currentProduct, ...this.state.listOfMyOutfits]
        });
      }
    }
  }

  render() {
    return (
      <div className="rel-prod-container">
        <h2>Related Products and My Outfits</h2>
        <div className='rel-products product-card-container' onClick={this.props.onClick}>
          <ProductCards productCards={this.props.relatedProducts} handleClick={this.handleCardClick} />
        </div>
        <div className='my-outfits product-card-container' onClick={this.props.onClick}>
          <MyOutfitCards myOutfitCards={this.state.listOfMyOutfits} handleClick={this.handleCardClick} handleAddOutfitClick={this.handleAddOutfitClick} />
        </div>
      </div>
    );
  }
}

const RelProductsWithClickData = ClickedData(RelProducts, 'Related Products');

export default RelProductsWithClickData;