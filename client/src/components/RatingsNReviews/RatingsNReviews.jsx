import React from "react";
import ReviewList from './ReviewList.jsx'
import AverageStar from './AverageStar.jsx';
import BreakDownStar from './BreakDownStar.jsx';
import NewReview from './NewReview.jsx';
const RatingsNReviews = () =>{
  return (
    <div className= "RatingsNReviewsSection">
     <ReviewList />
     <AverageStar />
     <BreakDownStar />
     <NewReview />
    </div>
  )
}

export default RatingsNReviews;