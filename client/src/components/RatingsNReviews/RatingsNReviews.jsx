import React from 'react';
import ReviewList from './ReviewList.jsx';
import AverageStar from './AverageStar.jsx';
import BreakDownStar from './BreakDownStar.jsx';
import NewReview from './NewReview.jsx';
const RatingsNReviews = ( {productId}) =>{
  return (
    <div className= "RatingsNReviewsSection">
      <ReviewList productId= {productId}/>
      <AverageStar />
      <BreakDownStar />
      <NewReview />
    </div>
  );
};

export default RatingsNReviews;