import React from 'react';

const QuestionsListItem = (props) => (

<div>
  {/* beginning of question item */}
  <div className='question-item'>
    <div className='question-item-q-letter'><h2>Q:</h2></div><div className='question-item-body'><h3>Why?</h3></div>
    <div className='question-item-helpful-keyword'>Helpful?</div>
    <div className='question-item-yes-button'>Yes(42)</div>
    <div className='question-item-add-answer-link'>Add answer</div>
  </div>
 {/* end of question item */}
 {/* beginning of answer body */}
  <div className='answer-item'>
    <div className='answer-item-a-letter'><h2>A:</h2></div>
    <div className='answer-item-body'><h3>Because!</h3></div>
    <div className='answer-item-username'>By user,</div><div className='answer-item-date'>November 20, 2021</div>
    <div className='answer-item-photos'></div>
    <div className='answer-item-helpful-keyword'>Helpful?</div>
    <div className='answer-item-yes-button'>Yes(0)</div>
    <div className='answer-item-report-button'>Report</div>
  </div>
  {/* end of answer body */}
</div>
)

export default QuestionsListItem;