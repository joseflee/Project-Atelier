import React from 'react';
import styled from 'styled-components';
import StarRating from '../ProdOverview/ProductInfo/StarRating.jsx';

class ProductCards extends React.Component {
  constructor(props) {
    super(props);

    var endOfShownProducts = this.props.productCards.length;
    if (endOfShownProducts > 3) {
      endOfShownProducts = 4;
    }

    this.state = {
      allRelatedProducts: this.props.productCards,
      currentShownProducts: { start: 0, end: endOfShownProducts },
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

      var startOfRelProducts = 0;
      var endOfRelProducts = this.state.allRelatedProducts.length;

      if (target.className === 'card-scroll-left') {
        // if current state of start - 4 is less than 0, add the absolute value of current state of start - 4 ----> Same goes for current state of end
        if (this.state.currentShownProducts.start - 4 < 0 && this.state.currentShownProducts.end !== 0) {
          this.setState({
            currentShownProducts: { start: 0, end: this.state.currentShownProducts.end - 4}
          });
        }
        // start becomes this.state.currentShownProducts.start - 4, and end becomes this.state.currentShownProducts.end - 4

        this.setState({
          currentShownProducts: { start: 0, end: 0 }
        });
      } else if (target.className === 'card-scroll-right') {
        if (this.state.currentShownProducts.start + 4 < this.state.allRelatedProducts.length && this.state.currentShownProducts.end >= this.state.allRelatedProducts.length) {
          this.setState({
            currentShownProducts: { start: this.state.currentShownProducts.start + 4, end: this.state.allRelatedProducts.length }
          });
        } else {
          this.setState({
            currentShownProducts: { start: this.state.currentShownProducts.start + 4, end: this.state.currentShownProducts.end + 4 }
          });
        }
        this.setState({
          currentShownProducts: { start: 0, end: 0 }
        });
      }
    }

    if (this.state.allRelatedProducts.length <= 4) {
      this.setState({
        currentShownProducts: { start: 0, end: this.state.allRelatedProducts.length + 1 },
        leftArrowDisplay: false,
        rightArrowDisplay: false
      });
    } else {
      if (this.state.allRelatedProducts[0] !== this.state.allRelatedProducts[this.state.currentShownProducts.start]) {
        if (this.state.currentShownProducts.end + 1 === this.state.allRelatedProducts.length) {
          this.setState({
            leftArrowDisplay: true,
            rightArrowDisplay: false
          });
        } else {
          this.setState({
            leftArrowDisplay: true,
            rightArrowDisplay: true
          });
        }
      } else if (this.state.currentShownProducts.start === 0 && this.state.currentShownProducts.end !== this.state.allRelatedProducts.length) {
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
            <div className="card-scroll-left arrow-button" onClick={this.updateStatus} style={{display: this.state.leftArrowDisplay ? 'inline-block' : 'none' }}></div>
            {this.state.allRelatedProducts.slice(this.state.currentShownProducts.start, this.state.currentShownProducts.end).map(product => {
              var price = <h5 className="price-relProd"><span>{product.results[0].original_price}</span></h5>;

              if (product.results[0].sale_price !== null && product.results[0].sale_price !== undefined) {
                price = <h5 className="price-relProd"><span className="sale_price">{product.results[0].sale_price}</span><span className="original_price">{product.results[0].original_price}</span></h5>;
              }

              return (
                <div className="product-card" key={product.id} onClick={() => { this.props.handleClick(product.id); }}>
                  <img className="card-imgs" src={product.results[0].photos[0].thumbnail_url} alt={product.name} />
                  <StarRating ratings={product.ratings} />
                  <div className="product-description">
                    <h5 className="category-relProd">{product.category}</h5>
                    <h4 className="name-relProd">{product.name}</h4>
                    {price}
                  </div>
                </div>
              );
            })}
            <div className="card-scroll-right arrow-button" onClick={this.updateStatus} style={{display: this.state.rightArrowDisplay ? 'inline-block' : 'none' }}></div>
          </div>
        </div>
      );
    }
  }
}

export default ProductCards;

// Display Category, Name, Price, Star Rating
// Price: Sale prices should be reflected. Sale price in red, and then original price has been stuckthrough.