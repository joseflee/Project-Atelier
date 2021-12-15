import React from 'react';

const MoreAnsweredQuestions = (props) => {

  return(
    <button className='more-answered-questions-button' onClick = {() => props.click()}>More answered questions</button>
  )
}

export default MoreAnsweredQuestions;