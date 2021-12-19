import React, {useState, useEffect} from 'react';
import RatingBreakDown from './RatingBreakDown.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import axios from 'axios';
import HelpfulButton from './HelpfulButton.jsx';

const ReviewList = ( {productId} )=>{
  const [selectedArray, setSelectedArray] = useState('totalReviewArray');
  const [isOpen, setIsOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(true);
  const [isExtended, setExtended] = useState('Show More');
  const [totalReviewArray, setTotalReviewArray] = useState([]);
  const [helpfulReviewArray, setHelpfulReviewArray] = useState([]);
  const [newestReviewArray, setNewestReviewArray] = useState([]);
  const [onScreenReviewArray, setOnScreenReviewArray] = useState([]);
  const [clickedList, setClickedList] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [averageRate, setAverageRate] = useState(0);
  const [recommended, setRecommended] = useState(0);
  const arrayMap =
   { totalReviewArray: totalReviewArray,
     helpfulReviewArray: helpfulReviewArray,
     newestReviewArray: newestReviewArray
   };
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:3000/ratings/getReviews', { params: { Id: productId } })
      .then((response)=>{
        // let onSelect = arrayMap2[selectedArray];
        const sortByRevelant = response.data.slice(0).sort((x, y) => { return y.helpfulness - x.helpfulness || y.review_id - x.review_id; });
        const firstTwo = sortByRevelant.slice(0, 2);
        if ( selectedArray === 'totalReviewArray') {
          setOnScreenReviewArray(firstTwo);
          setIsLoading(false);
        } else if (selectedArray === 'newestReviewArray') {
          setOnScreenReviewArray(response.data.slice(0).sort((x, y)=>{ return y.review_id - x.review_id; }).slice(0, 2));
          setIsLoading(false);
        } else if ( selectedArray === 'helpfulReviewArray') {
          setOnScreenReviewArray(response.data.slice(0).sort((x, y)=>{ return y.helpfulness - x.helpfulness; }).slice(0, 2));
          setIsLoading(false);
        }
        setTotalReviewArray(sortByRevelant);
        setNewestReviewArray(response.data.slice(0).sort((x, y)=>{ return y.review_id - x.review_id; }));
        setHelpfulReviewArray(response.data.slice(0).sort((x, y)=>{ return y.helpfulness - x.helpfulness; }));
        axios.get('http://localhost:3000/ratings/ratingOverview', { params: { Id: productId } })
          .then((response)=>{
            setAverageRate(response.data.ratings);
            setRecommended(response.data.recommended);
          });
      })
      .catch((err) => {
        console.log('this is the react reviewlist get reviews err', err);
      });

  }, [productId, selectedArray]);

  // useEffect(() => {

  // }, [productId]);

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
        setOnScreenReviewArray((prevState) => {
          return prevState.concat(selectedArray[i]);
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
  const markClicked = function (id, helpfulness) {
    setClickedList(prevState => prevState.set( id, helpfulness ));
  };
  return (
    <div>
      <div className= 'review-starSection'>
        <RatingBreakDown recommended={recommended} starWidth={starWidth} averageRate={averageRate} productId= {productId}/>
        <ProductBreakDown />
      </div>
      <div className="reviewSection">
        <div className= "review-List">
          <div className="review-DropDown">
            <h2 style= {{display: 'inline'}}>{totalReviewArray.length} reviews, sorted by </h2>
            <select onChange={dropDownMenu} id="review-sort-select">
              <option value="totalReviewArray">Relevant</option>
              <option value="newestReviewArray">Newest</option>
              <option value="helpfulReviewArray">Helpful</option>
            </select>
          </div>
          {isLoading === true ? <h1 style = {{color: 'red'}}>Loading</h1> : onScreenReviewArray.map((user, index)=>{
            return (
              <div key={index} className="review-Cell">
                <div className="review-Top">
                  <div className="review-stars-outer">
                    <div className="review-stars-inner" style={{width: starWidth(user.rating)}}></div>
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
                        <div key = {index} className="review-Imageblock">
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
                <HelpfulButton clickedList={clickedList} markClicked={markClicked} helpfulness={user.helpfulness} reviewId = {user.review_id}/>
              </div>
            );
          })}


          { isLoading ? null : onScreenReviewArray.length === totalReviewArray.length || totalReviewArray.length < 2 ? null : <div><button onClick= {()=>{ loadReviews(selectedArray); }}>More reviews</button></div>}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
