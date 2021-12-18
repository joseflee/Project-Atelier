import React from 'react';

var MyOutfitCards = (props) => {
  return (
    <div>
      <h3>My Outfits Cards</h3>
      {props.myOutfitCards.map(outfit => {
        return (
          <div key={outfit.id}>
            <h4 className="category-myOutfits">{outfit.category}</h4>
            <h4 className="name-myOutfits">{outfit.name}</h4>
            <h4 className="price-myOutfits">{outfit.default_price}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default MyOutfitCards;