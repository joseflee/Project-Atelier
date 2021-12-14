import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

class QuestionsList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
     <QuestionsListItem />
    )
  }
}

export default QuestionsList;