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
      questions: []
    }
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
  }

  componentDidMount(){
    var questionsToShow = sampleData.questions.results;
    questionsToShow = questionsToShow.slice(0, 2);
    this.setState({
      questions: questionsToShow
    })
  }

  showMoreQuestions(){
    this.setState({
      questions: sampleData.questions.results
    })
  }

  render(){
    let moreAnsweredQuestions;
    if(sampleData.questions.results.length > 2){
      moreAnsweredQuestions = <MoreAnsweredQuestions click={this.showMoreQuestions}/>
    } else {
      moreAnsweredQuestions = <div>No button here</div>
    }
    return(
      <div>
        {console.log(sampleData.questions.results)}
      <div className='qna-component-name'>Questions and Answers</div>
      <SearchQuestions />
      <QuestionsList data={this.state.questions}/>
      <br />
      {moreAnsweredQuestions}
      <AddQuestion />
      </div>

    )
  }
}

export default QnA;