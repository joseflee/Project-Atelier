import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import Sample from '../../../../example/reviews.js';
import HelpfulButton from './HelpfulButton.jsx';
const ReviewList = ( {productId} )=>{
  let result = Sample.reviews.results;
  const [selectedArray, setSelectedArray] = useState('totalReviewArray');
  const [isOpen, setIsOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);
  const [isExtended, setExtended] = useState('Show More');
  const [totalReviewArray, setTotalReviewArray] = useState([]);
  const [helpfulReviewArray, setHelpfulReviewArray] = useState([]);
  const [newestReviewArray, setNewestReviewArray] = useState([]);
  const [onScreenReviewArray, setOnScreenReviewArray] = useState([]);
  const arrayMap =
   { totalReviewArray: totalReviewArray,
     helpfulReviewArray: helpfulReviewArray,
     newestReviewArray: newestReviewArray
   };
  const arrayMap2 =
   { totalReviewArray: totalReviewArray,
     helpfulReviewArray: helpfulReviewArray,
     newestReviewArray: newestReviewArray
   };
  useEffect(() => {
    // console.log('trigger effect');
    axios.get('http://localhost:3000/getReviews', { params: { Id: productId } })
      .then((response)=>{
        // let onSelect = arrayMap2[selectedArray];
        const sortByRevelant = response.data.slice(0).sort((x, y) => { return y.helpfulness - x.helpfulness || y.review_id - x.review_id; });
        const firstTwo = sortByRevelant.slice(0, 2);
        // console.log('onSelected:', selectedArray);
        if ( selectedArray === 'totalReviewArray') {
          setOnScreenReviewArray(firstTwo);
        } else if (setSelectedArray === 'newestReviewArray') {
          setOnScreenReviewArray(response.data.slice(0, 2).sort((x, y)=>{ return y.review_id - x.review_id; }));
        } else if ( setSelectedArray === 'helpfulReviewArray') {
          setOnScreenReviewArray(response.data.slice(0).sort((x, y)=>{ return y.helpfulness - x.helpfulness; }));
        }
        setTotalReviewArray(sortByRevelant);
        setNewestReviewArray(response.data.slice(0).sort((x, y)=>{ return y.review_id - x.review_id; }));
        setHelpfulReviewArray(response.data.slice(0).sort((x, y)=>{ return y.helpfulness - x.helpfulness; }));
      })
      .catch((err) => {
        // console.log('this is the react getreviews err', err);
      });
  }, [productId, selectedArray]);

  const convertDate = function (dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleIsTruncated = function () {
    setIsTruncated(isTruncated === true ? false : true);
    setExtended (isExtended === 'Show Less' ? 'Show More' : 'Show Less');
  };
  const loadReviews = function (selectedArray) {
    selectedArray = arrayMap[selectedArray];
    let startIndex = onScreenReviewArray.length;
    for (let i = startIndex; i <= startIndex + 1; i++) {
      if (i === totalReviewArray.length) {
        break;
      } else {
        setOnScreenReviewArray((prev) => {
          return prev.concat(selectedArray[i]);
        });
      }

    }
  };
  const openModal = function (e) {
    var modal = document.getElementById('review-Modal');
    var img = document.getElementById('review-Images');
    var modalImg = document.getElementById('review-Modal-Content');
    modal.style.display = 'block';
    modalImg.src = e.target.src;
    modalImg.alt = e.target.alt;
  };
  const closeModal = function (e) {
    var modal = document.getElementById('review-Modal');
    modal.style.display = 'none';
  };
  const starWidth = function (rating) {
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = (starPercentage / 10) * 10 + '%';
    return starPercentageRounded;
  };

  const dropDownMenu = function (e) {

    setSelectedArray(e.target.value);
    if (e.target.value === 'newestReviewArray') {
      setOnScreenReviewArray(newestReviewArray.slice(0, 2));
    } else if (e.target.value === 'totalReviewArray') {
      setOnScreenReviewArray(totalReviewArray.slice(0, 2));

    } else if (e.target.value === 'helpfulReviewArray') {
      setOnScreenReviewArray(helpfulReviewArray.slice(0, 2));
    }
  };
  return (
    <div className="reviewSection">
      <h1>This is the reviewList</h1>
      <div className="review-DropDown">
        <h2 style= {{display: 'inline'}}>{totalReviewArray.length} reviews, sorted by </h2>
        <select onChange={dropDownMenu} id="review-sort-select">
          <option value="totalReviewArray">Relevant</option>
          <option value="newestReviewArray">Newest</option>
          <option value="helpfulReviewArray">Helpful</option>
        </select>
      </div>
      <div className="reviewList">{onScreenReviewArray.length === 0 ? <h1 style = {{color: 'red'}}>No reviews yet</h1> : onScreenReviewArray.map((user, index)=>{
        return (
          <div key={index} className="reviewCell">
            <div className="reviewTop">
              <div className="stars-outer">
                <div className="stars-inner" style={{width: starWidth(user.rating)}}></div>
              </div>
              <span className="number-Rating" style= {{color: 'red'}}>{user.rating}</span>
              <span className="nameAndDate">{user.reviewer_name}, {convertDate(user.date)}</span>
            </div>
            <h2 className="Summary">{user.summary.slice(0, 60)}</h2>
            <div className="review-Body"> {user.summary.length > 60 ?
              <div className="extended-Summary">{user.summary.slice(60)}</div> : null} <br></br>{user.body.length > 250 ?
              <div>{isTruncated ? <div >{user.body.substring(0, 250)}.........................</div> : <div>{user.body}</div>}
                <div><button onClick = {()=>{ toggleIsTruncated(); }}>{isExtended}</button></div> </div> : <div>{user.body}</div>}
            </div>
            {user.photos.length > 0 ?
              <div className="review-ImageSection">
                {user.photos.map((img, index)=>{
                  return (
                    <div key = {index} className="Imageblock">
                      <img onClick={openModal} id="review-Images" alt = "user's review image" className = "review-Images" src= {img.url} />
                      <div id="review-Modal" className="review-Modal">
                        <span className="review-Modal-Close" onClick= {closeModal}>&times;</span>
                        <img className="review-Modal-Content" id="review-Modal-Content" />
                      </div>
                    </div>);
                })}
              </div> : null}
            {user.recommend ? <div><span>✔</span><span>I recommend this product</span></div> : null}
            {user.response ? (<div className="review-Response"><div className="seller-Response">Response from seller:</div> <div className="seller-Response2">{user.response}</div> </div>) : null}
            <HelpfulButton helpfulness={user.helpfulness} reviewId = {user.review_id}/>
          </div>
        );
      })}
      </div>

      {onScreenReviewArray.length === totalReviewArray.length || totalReviewArray.length < 2 ? null : <div><button onClick= {()=>{ loadReviews(selectedArray); }}>More reviews</button></div>}
    </div>
  );
};

export default ReviewList;