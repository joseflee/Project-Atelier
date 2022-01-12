import React from 'react';
import styled from 'styled-components';
import StarRating from '../ProdOverview/ProductInfo/StarRating.jsx';
import { DisplayImg } from '../ProdOverview/ImageGallery/Gallery.styles.js';

// Add an event handler for clicking and adding an outfit. But store them locally for the specific user to be read at the time of web site buildup

var MyOutfitCards = (props) => {
  return (
    <div>
      <h3>My Outfits Cards</h3>
      {/* Is a clickable element that adds current item as a card */}
      <div className="product-card add-outfit" onClick={props.handleAddOutfitClick}>
        <div>+</div>
        <div>Add to Outfit</div>
      </div>
      <div className="product-cards">
        {props.myOutfitCards.map(outfit => {
          return (
            <div className="product-card" key={outfit.id} onClick={props.handleClick}>
              <DisplayImg src={outfit.results[0].photos[0].thumbnail_url} />
              <StarRating ratings={outfit.ratings} />
              <div className="product-description">
                <h4 className="category-myOutfits">{outfit.category}</h4>
                <h4 className="name-myOutfits">{outfit.name}</h4>
                <h4 className="price-myOutfits">{outfit.default_price}</h4>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOutfitCards;