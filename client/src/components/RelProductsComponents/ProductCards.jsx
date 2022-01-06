import React from 'react';
import styled from 'styled-components';
import StarRating from '../ProdOverview/ProductInfo/StarRating.jsx';
import { DisplayImg } from '../ProdOverview/ImageGallery/Gallery.styles.js';

class ProductCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allRelatedProducts: this.props.productCards,
      currentShownProducts: this.props.productCards,
      leftArrowDisplay: true,
      rightArrowDisplay: true
    };

    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    this.updateStatus();
  }

  updateStatus(e) {
    if (e) {
      var target = e.target;
      console.log(target.className);
      if (target.className === 'card-scroll-left') {
        var endOfList = this.state.currentShownProducts.length;
        var startOfList = this.state.currentShownProducts.length - 3;
        this.setState({
          currentShownProducts: this.state.allRelatedProducts.slice()
        });
      } else if (target.className === 'card-scroll-right') {
        this.setState({
          currentShownProducts: this.state.allRelatedProducts.slice()
        });
      }
    }

    if (this.state.allRelatedProducts.length <= 4) {
      this.setState({
        leftArrowDisplay: false,
        rightArrowDisplay: false
      });
    } else {
      if (this.state.currentShownProducts[this.state.currentShownProducts.length] === this.state.allRelatedProducts[this.state.allRelatedProducts.length]) {
        this.setState({
          leftArrowDisplay: true,
          rightArrowDisplay: false
        });
      } else if (this.state.currentShownProducts[0] === this.state.allRelatedProducts[0]) {
        this.setState({
          leftArrowDisplay: false,
          rightArrowDisplay: true
        });
      }
    }
  }

  render() {
    if (this.state.allRelatedProducts.length === 0) {
      return (
        <div>
          <h3>Related Products</h3>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Related Products</h3>
          <div className="product-cards">
            <div className="card-scroll-left product-card arrow-button" onClick={this.updateStatus} style={{display: this.state.leftArrowDisplay ? 'inline-block' : 'none' }}></div>
            {this.state.currentShownProducts.map(product => {
              var price = <h5 className="price-relProd"><span>{product.results[0].original_price}</span></h5>;

              if (product.results[0].sale_price !== null && product.results[0].sale_price !== undefined) {
                price = <h5 className="price-relProd"><span className="sale_price">{product.results[0].sale_price}</span><span className="original_price">{product.results[0].original_price}</span></h5>;
              }

              return (
                <div className="product-card" key={product.id} onClick={() => {this.props.handleClick(product.id);}}>
                  <DisplayImg src={product.results[0].photos[0].thumbnail_url} />
                  <StarRating ratings={product.ratings} />
                  <div className="product-description">
                    <h5 className="category-relProd">{product.category}</h5>
                    <h4 className="name-relProd">{product.name}</h4>
                    {price}
                  </div>
                </div>
              );
            })}
            <div className="card-scroll-right product-card arrow-button" onClick={this.updateStatus} style={{display: this.state.rightArrowDisplay ? 'inline-block' : 'none' }}></div>
          </div>
        </div>
      );
    }
  }
}

export default ProductCards;

// Display Category, Name, Price, Star Rating
// Price: Sale prices should be reflected. Sale price in red, and then original price has been stuckthrough.