import React from 'react';


const ProductInfo = (props) => {
  //component is receiving specific product info through props
  return (
    <div className='productInfo'>
      <p>{props.data.slogan}</p>
      <p>{props.data.description}</p>
    </div>
  );
};

export default ProductInfo;