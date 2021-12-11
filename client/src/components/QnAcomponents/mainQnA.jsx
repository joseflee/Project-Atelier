import React from 'react';
import SearchQuestions from './SearchQuestions.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';

class QnA extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
      <div className='qna-component-name'>Questions and Answers</div>
      <SearchQuestions />
      <QuestionsList />
      <MoreAnsweredQuestions />
      <AddQuestion />
      </div>

    )
  }
}

export default QnA;