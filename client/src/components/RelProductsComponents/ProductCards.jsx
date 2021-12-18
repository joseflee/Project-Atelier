import React from 'react';

// map each product card according to the info passed down

var ProductCards = (props) => {
  return (
    <div>
      <h3>Related Products Cards</h3>
      {props.productCards.map(product => {
        return (
          <div key={product.id}>
            <h4 className="category-relProd">{product.category}</h4>
            <h4 className="name-relProd">{product.name}</h4>
            <h4 className="price-relProd">{product.default_price}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCards;

// Display Category, Name, Price, Star Rating