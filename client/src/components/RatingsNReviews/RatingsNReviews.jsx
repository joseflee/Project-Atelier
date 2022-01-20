import React from 'react';
import ReviewList from './ReviewList.jsx';
import NewReview from './NewReview.jsx';
const RatingsNReviews = ( {handleAverageRate, handleReviews, productId, currentProduct}) =>{
  return (
    <div className= "RatingsNReviewsSection">
      <ReviewList handleAverageRate={handleAverageRate} handleReviews={handleReviews} currentProduct={currentProduct} productId= {productId}/>
    </div>
  );
};

export default RatingsNReviews;