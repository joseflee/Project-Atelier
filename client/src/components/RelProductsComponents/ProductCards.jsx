import React from 'react';
import styled from 'styled-components';
import { ImgContainer, DisplayImg, ThumbContainer, ThumbImg,
  DisplayedThumbImg, RightArrow, LeftArrow } from '../ProdOverview/ImageGallery/Gallery.styles.js';

// map each product card according to the info passed down

class ProductCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log('product info: ', this.props.productCards);
    return (
      <div>
        <h3>Related Products Cards</h3>
        {this.props.productCards.map(product => {
          return (
            <div className="product-card" key={product.id} onClick={this.props.handleClick}>
              <DisplayImg src={product.results[0].photos[0].thumbnail_url} />
              <h5 className="category-relProd">{product.category}</h5>
              <h4 className="name-relProd">{product.name}</h4>
              <h5 className="price-relProd">{product.default_price}</h5>
              {/* <div className='review-starBreakDown-star'>
                <div className="review-stars-outer">
                  <div className="review-stars-inner" style={{width: starWidth(averageRate)}}></div>
                </div>
              </div> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductCards;

// Display Category, Name, Price, Star Rating