import React, {useState, useEffect} from 'react';
import axios from 'axios';

const RatingBreakDown = ({productId, averageRate, starWidth, recommended, oneStar, twoStar, threeStar, fourStar, fiveStar})=>{

  return (
    <div className='review-starBreakDown'>
      <div>
        <h3>RATINGS &amp; REVIEWS</h3>
        <div>
          <h1>{averageRate}</h1>
          <div className="review-stars-outer">
            <div className="review-stars-inner" style={{width: starWidth(averageRate)}}></div>
          </div>
          <h3>{recommended}% of reviews recommend this product</h3>
          <h3>5 stars {fiveStar}</h3>
          <h3>4 stars {fourStar}</h3>
          <h3>3 stars {threeStar}</h3>
          <h3>2 stars {twoStar}</h3>
          <h3>1 stars {oneStar}</h3>
        </div>
      </div>
    </div>
  );
};

export default RatingBreakDown;