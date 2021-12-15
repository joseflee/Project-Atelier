import React from 'react';
import SearchQuestions from './SearchQuestions.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import sampleData from '../../../../example/questions.js';

class QnA extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questions: sampleData.questions.results
    }
  }

  componentDidMount(){
    var questionsToShow = sampleData.questions.results;
    questionsToShow = questionsToShow.slice(0, 2);
    this.setState({
      questions: questionsToShow
    })
  }

  render(){
    let moreAnsweredQuestions;
    if(this.state.questions.length > 2){
      moreAnsweredQuestions = <MoreAnsweredQuestions />
    } else {
      moreAnsweredQuestions = <div></div>
    }
    return(
      <div>
        {console.log(sampleData.questions.results)}
      <div className='qna-component-name'>Questions and Answers</div>
      <SearchQuestions />
      <QuestionsList data={this.state.questions}/>
      {moreAnsweredQuestions}
      <AddQuestion />
      </div>

    )
  }
}

export default QnA;