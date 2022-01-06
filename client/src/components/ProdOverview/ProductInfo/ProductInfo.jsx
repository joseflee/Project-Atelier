import React from 'react';
import StarRating from './StarRating.jsx';

const ProductInfo = (props) => {
  // console.log('props', props);
  let price = null;
  if (props.style.sale_price) {
    price =
    <div id='productPrice'>
      <s>{props.style.original_price}</s>
      <p>{props.style.sale_price}</p>
    </div>;
  } else {
    price =
    <div id='productPrice'>
      <p>{props.style.original_price}</p>
    </div>;
  }
  return (
    <div className='POProductInfoContainer'>
      <StarRating ratings={props.ratings}/>
      <div className='POProductCategory'>
        <p>{props.product.category}</p>
      </div>
      <div className='POProductTitle'>
        <h2>{props.product.name}</h2>
      </div>
      {price}
      {/* <div className='POProductDescription'>
        <p>{props.product.description}</p>
      </div> */}
    </div>
  );
};

export default ProductInfo;