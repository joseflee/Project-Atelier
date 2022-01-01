import React from 'react';
import StarRating from './StarRating.jsx';

const ProductInfo = (props) => {
  console.log('props', props);
  return (
    <div className='productInfo'>
      <div id='category'>
        <p>{props.product.category}</p>
      </div>
      <div id='productTitle'>
        <h2>{props.product.name}</h2>
      </div>
      <StarRating ratings={props.ratings}/>
    </div>
  );
};

export default ProductInfo;