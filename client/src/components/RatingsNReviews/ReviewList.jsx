import React from "react";
// import axios from 'axios';
import Sample from '/home/yanlin/hackreactor/Project-Atelier/example/reviews.js'
const ReviewList = ()=>{
  let result = Sample.reviews.results;
  for(let i = 0; i<result.length;i++) {
    if(result[i]['date'].slice(5,7) === "01"){
        let d = result[i]['date'].slice(8,10)
        let y = result[i]['date'].slice(0,4)
        result[i]['date'] = "January" + d + "," + y

    } else if(result[i]['date'].slice(5,7) === "02") {
        let d = result[i]['date'].slice(8,10)
        let y = result[i]['date'].slice(0,4)
        result[i]['date'] = "Feb" + d + "," + y
    }
    else if(result[i]['date'].slice(5,7) === "03") {
        let d = result[i]['date'].slice(8,10)
        let y = result[i]['date'].slice(0,4)
        result[i]['date'] = "March" + d + "," + y
    }
    else if(result[i]['date'].slice(5,7) === "04") {
        let d = result[i]['date'].slice(8,10)
        let y = result[i]['date'].slice(0,4)
        result[i]['date'] = "April" + d + "," + y
    }
    else if(result[i]['date'].slice(5,7) === "05") {
      let d = result[i]['date'].slice(8,10)
      let y = result[i]['date'].slice(0,4)
      result[i]['date'] = "May" + d + "," + y
  }
  else if(result[i]['date'].slice(5,7) === "06") {
      let d = result[i]['date'].slice(8,10)
      let y = result[i]['date'].slice(0,4)
      result[i]['date'] = "June" + d + "," + y
  }
}
  // axios.get('http://localhost:3000/getReviews')
  // .then(()=>{

  // })
  // .catch((err) => {
  //   console.log("this is the react getreviews err",err);
  // })

  return (
    <div className="reviewSection">
      <h1>This is the reviewList</h1>
      {result.map((element,index)=>{
        return (
          <div key={index} className="reviewCell">
            <span className="reviewTop"> How many start: {element.rating}</span>
            <span className="reviewTop">User name is : {element.reviewer_name}</span>
            <span className="reviewTop">Time : {element.date}</span>
            <h2>{element.summary}</h2>
            <div>{element.body}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ReviewList;