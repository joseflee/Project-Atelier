import React from 'react';
import ReviewList from './ReviewList.jsx';
import NewReview from './NewReview.jsx';
const RatingsNReviews = ( {productId, currentProduct}) =>{
  return (
    <div className= "RatingsNReviewsSection">
      <ReviewList currentProduct={currentProduct} productId= {productId}/>
      {/* <NewReview /> */}
    </div>
  );
};

export default RatingsNReviews;