import React, {useState} from "react";
import axios from 'axios';
import Sample from '/home/yanlin/hackreactor/Project-Atelier/example/reviews.js'
const ReviewList = ()=>{
  axios.get('http://localhost:3000/getReviews')
  .then((response)=>{
    console.log(response);
  })
  .catch((err) => {
    console.log("this is the react getreviews err",err);
  })
  let result = Sample.reviews.results;
  const [isTruncated, setIsTruncated] = useState(true)
  const [isExtended, setExtended] = useState("Show More")
  const [totalReviewArray, setTotalReviewArray] = useState(result);
  const [onScreenReviewArray, setOnScreenReviewArray] = useState(result.slice(0,2))

  console.log(totalReviewArray)
  console.log(onScreenReviewArray.length)
  function convertDate(dateString){
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  function toggleIsTruncated () {
    console.log("toggling");
    setIsTruncated(isTruncated === true ? false : true);
    setExtended (isExtended === "Show Less" ? "Show More" : "Show Less")
  }
  function loadReviews() {
    console.log("loading more reviews")
    let startIndex = onScreenReviewArray.length;
    console.log("start:", startIndex)
    for(let i = startIndex; i <= startIndex+1; i++) {
      if(i === totalReviewArray.length) {
        console.log("break")
        break;
      } else {
        setOnScreenReviewArray((prev) => {
          return prev.concat(totalReviewArray[i])
        })
      }

    }
    console.log("currentOnscreen",onScreenReviewArray)
  }
  return (
    <div className="reviewSection">
      <h1>This is the reviewList</h1>
     <div className="reviewList">{onScreenReviewArray.length === 0 ? <h1 style = {{color:"red"}}>No reviews yet</h1> :  onScreenReviewArray.map((user,index)=>{
        return (
          <div key={index} className="reviewCell">
            <span className="reviewTop"> How many star: {user.rating}</span>
            <span className="reviewTop">{user.reviewer_name},{convertDate(user.date)}</span>
            <h2>{user.summary}</h2>
            <div className="review-body">{user.body.length > 250 ?  <div>{isTruncated ? <div>{user.body.substring(0,250)}</div> :<div>{user.body}</div>} <div><button onClick = {()=>{toggleIsTruncated()}}>{isExtended}</button></div> </div>: <div>{user.body}</div>}</div>
            {user.recommend ? <div><span>✔</span><span>I recommend this product</span></div> : null}
            {user.response ? <div className="review-Response">Response: {user.response}</div> : null}
            <div><span>Helpful? </span><span className="helpful-1">Yes</span><span className="helpful-2">({user.helpfulness}) </span><span> | Report</span></div>
          </div>
        )
      })}
      </div>

      {onScreenReviewArray.length === totalReviewArray.length ? null : <div><button onClick= {()=>{loadReviews()}}>More reviews</button></div>}
    </div>
  )
}

export default ReviewList;