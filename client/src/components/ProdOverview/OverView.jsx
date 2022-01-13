import React from 'react';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import StyleSelector from './StyleSelector/StyleSelect.jsx';
import AddToCart from './AddToCart/AddToCart.jsx';
import DefaultGallery from './ImageGallery/DefaultGallery.jsx';
import ProductDescription from './ProductInfo/ProductDescription.jsx';
import ExpandedModal from './ImageGallery/ExpandedModal.jsx';
import FillerComponent from './FillerComponent.jsx';
import sampleData from '../../../../example/products.js';
import axios from 'axios';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainProduct: undefined,
      styles: undefined,
      displayStyle: this.props.currentProductStyle.results[0],
      useModal: false,
      selectedIndex: 0,
    };
    this.updateStyle = this.updateStyle.bind(this);
  }

  updateStyle(selectedStyle, styleId) {
    this.setState({
      displayStyle: selectedStyle,
    });
    this.props.addToOutfit(styleId);
  }
  updateSelectedIndex(index) {
    this.setState({
      selectedIndex: index,
    });
  }

  switchImageModal() {
    if (!this.state.useModal) {
      this.setState({
        useModal: true,
      });
    } else {
      this.setState({
        useModal: false,
      });
    }
  }

  render () {
    return (
      <div className='POOverview' data-testid="Overview">
        <ProductDescription product={this.props.currentProduct} />
        <FillerComponent />
        <div className='Infocontainer'>
          <ProductInfo product={this.props.currentProduct} style={this.props.currentProductStyle.results[0]}
            ratings={this.props.currentReview.ratings} />
          <StyleSelector styles={this.props.currentProductStyle} displayedStyle={this.state.displayStyle}
            changeStyle={this.updateStyle.bind(this)} />
          <AddToCart displayedStyle={this.state.displayStyle} toggleFavorite={this.props.toggleFavorite.bind(this)}
            addToFavorites={this.props.addToFavorites} currentStyleId={this.props.currentStyleId} />
        </div>
        <DefaultGallery fakePhotos={sampleData.style.results[0].photos} photos={this.state.displayStyle.photos}
          selectedIndex={this.state.selectedIndex} switchImageModal={this.switchImageModal.bind(this)}
          updateIndex={this.updateSelectedIndex.bind(this)} />
        {this.state.useModal ? <ExpandedModal photos={this.state.displayStyle.photos} selectedIndex={this.state.selectedIndex} switchModal={this.switchImageModal.bind(this)} /> : null}
      </div>
    );
  }
}

export default ProductOverview;