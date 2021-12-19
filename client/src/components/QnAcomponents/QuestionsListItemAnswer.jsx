import React from 'react';

const QuestionsListItemAnswer = (props) => (
  <div className='answer-item'>
    <div className='answer-item-a-letter'><h2>A:{props.answer.body}</h2></div>
    {/* <div className='answer-item-body'><h3></h3></div> */}
    <div className='answer-item-username'>By user {props.answer.answerer_name}</div><div className='answer-item-date'>{props.answer.date}</div>
    <div className='answer-item-photos'></div>
    <div className='answer-item-helpful-keyword'>Helpful?</div>
    <div className='answer-item-yes-button'>Yes({props.answer.helpfulness})</div>
    <div className='answer-item-report-button'>Report</div>
  </div>
);

export default QuestionsListItemAnswer;