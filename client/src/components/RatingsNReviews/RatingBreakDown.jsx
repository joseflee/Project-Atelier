import React, {useState, useEffect} from 'react';
import axios from 'axios';

const RatingBreakDown = ({productId, averageRate, starWidth, recommended})=>{

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
        </div>
      </div>
    </div>
  );
};

export default RatingBreakDown;