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
      currentProduct: this.props.currentProduct
    };

    console.log(this.props.relatedProducts);

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleAddOutfitClick = this.handleAddOutfitClick.bind(this);
    this.removeOutfit = this.removeOutfit.bind(this);
  }

  handleCardClick(id) {
    this.props.handleClick(id);
  }

  handleAddOutfitClick(e) {
    var element = e.target;
    var currentStyleIndex = this.props.currentProduct.results.map(result => result.style_id).indexOf(this.props.currentStyleId);
    var myOutfit = { ...this.props.currentProduct, results: this.props.currentProduct.results[currentStyleIndex] };

    this.props.toggleFavorite();

    if (this.state.listOfMyOutfits.length === 0) {
      this.setState({
        listOfMyOutfits: [ myOutfit ]
      });
    } else {
      var isPresent = false;

      for (var i = 0; i < this.state.listOfMyOutfits.length; i++) {
        if (this.state.listOfMyOutfits[i].results.style_id !== this.props.currentStyleId) {
          isPresent = false;
        } else {
          isPresent = true;
          return;
        }
      }

      if (isPresent === false) {
        this.setState({
          listOfMyOutfits: [myOutfit, ...this.state.listOfMyOutfits]
        });
      }
    }
  }

  removeOutfit(styleId) {
    this.props.removeOutfit(styleId);

    for (var j = 0; j < this.state.listOfMyOutfits.length; j++) {
      if (this.state.listOfMyOutfits[j].results.style_id === styleId) {
        var newList = this.state.listOfMyOutfits;
        newList.splice(j, 1);
        this.setState({
          listOfMyOutfits: newList
        });
      }
    }
  }

  render() {
    return (
      <div className="rel-prod-container">
        <div className='rel-products product-card-container' onClick={this.props.onClick}>
          <ProductCards productCards={this.props.relatedProducts} handleClick={this.handleCardClick} />
        </div>
        <div className='my-outfits product-card-container' onClick={this.props.onClick}>
          <MyOutfitCards myOutfitCards={this.state.listOfMyOutfits} handleClick={this.handleCardClick} handleAddOutfitClick={this.handleAddOutfitClick} removeOutfit={this.removeOutfit} />
        </div>
      </div>
    );
  }
}

const RelProductsWithClickData = ClickedData(RelProducts, 'Related Products');

export default RelProductsWithClickData;