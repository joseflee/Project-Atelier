import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

class QuestionsList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
      <QuestionsListItem />
      <button className='load-more-answers-button'>Load more answers</button>
     </div>
    )
  }
}

export default QuestionsList;