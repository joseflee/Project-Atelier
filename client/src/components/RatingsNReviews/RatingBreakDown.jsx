import React, {useState, useEffect} from 'react';
import axios from 'axios';

const RatingBreakDown = ({productId})=>{

  const [totalReview, setTotalReview] = useState([]);
  console.log('star section:', productId);
  useEffect(() => {
    axios.get('http://localhost:3000/getReviews', { params: { Id: productId } })
      .then((response)=>{
        console.log('star section:', response.data);
        setTotalReview(response.data);
      })
      .catch((err) => {
        console.log('this is the react star section get reviews err', err);
      });

  }, [productId]);

  return (
    <div className='review-starBreakDown'>
      <div>
        <h3>RATINGS &amp; REVIEWS</h3>
      </div>
    </div>
  );
};

export default RatingBreakDown;