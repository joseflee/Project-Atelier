import React, {useState, useEffect} from 'react';
import axios from 'axios';

const HelpfulButton = ({reviewId, helpfulness})=>{
  // console.log('this is the reviewId:', reviewId);
  const [helpfulnessCount, setHelpfulnessCount] = useState(0);
  const [ Id, setId ] = useState(0);
  const [ clickedList, setClickedList ] = useState( new Map());
  const [clicked, setClicked ] = useState(false);

  useEffect(()=>{
    // console.log('useEffect2:', clickedList);
    // console.log(clicked);
    setHelpfulnessCount(helpfulness);
    setId(reviewId);
  }, [helpfulness]);

  const helpfulnessonClicked = function (e) {
    if (!clickedList.has(Id)) {
      setClickedList(prevState => prevState.set( Id, helpfulness ));
      setHelpfulnessCount(helpfulnessCount + 1);
      setClicked(true);
      axios.post('/updateHelpfulness', {Id: Id})
        .catch((err) => {
          console.log('This is updatehelfulness amount err:', err);
        });
    } else {
      // console.log('already click');
      return;
    }
  };
  return (
    <div><span>HelpFul ?</span> <span className= { 'helpful-1 ' + reviewId} onClick ={ helpfulnessonClicked }>Yes (<span>{helpfulnessCount}</span>)</span> <span> | Report</span> </div>
  );
};

export default HelpfulButton;

