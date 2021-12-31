import React from 'react';
import { FaStar } from 'react-icons/fa';
import Rating from 'react-rating';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar} from '@fortawesome/free-solid-svg-icons';

library.add(emptyStar);
library.add(fullStar);

const avgRating = (ratingsObj) => {
  let totalValue = 0;
  let totalVotes = 0;
  let length = 0;

  for (let key in ratingsObj) {
    totalValue += (Number(ratingsObj[key]) * key);
    totalVotes += Number(ratingsObj[key]);
  }
  return totalValue / totalVotes;
};

const StarRating = (props) => {
  return (
    <div>
      <Rating start={0} stop={5} initialRating={avgRating(props.ratings)} emptySymbol={<FontAwesomeIcon icon={['fas', 'star']} color='#808080
' />} fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} color='#f8ce0b' />} readonly />
    </div>
  );
};

export default StarRating;