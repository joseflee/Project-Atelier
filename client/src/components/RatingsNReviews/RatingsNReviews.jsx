import React from 'react';
import ReviewList from './ReviewList.jsx';
import NewReview from './NewReview.jsx';
const RatingsNReviews = ( {productId}) =>{
  return (
    <div className= "RatingsNReviewsSection">
      <ReviewList productId= {productId}/>
      {/* <NewReview /> */}
    </div>
  );
};

export default RatingsNReviews;