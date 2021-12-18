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
      questions: [],
      isMoreQuestionsButtonShown: false,
      product_name:'Blue jeans'
    }
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount(){
    var questionsToShow = sampleData.questions.results;
    if (questionsToShow.length > 2){
      this.setState({
        isMoreQuestionsButtonShown: true
      })
    }
    questionsToShow = questionsToShow.slice(0, 2);
    this.setState({
      questions: questionsToShow
    })
  }

  showMoreQuestions(){
    this.setState({
      questions: sampleData.questions.results,
      isMoreQuestionsButtonShown: false
    })
  }

  search(query){
    query = query.toLowerCase();
    console.log('received query', query);
    console.log(this.state.questions);
    let questions = [...this.state.questions];
    const filtered = questions.filter(item => item.question_body.toLowerCase().includes(query));
    console.log('filtered', filtered);

  }

  render(){
    let moreAnsweredQuestions;
    if(this.state.isMoreQuestionsButtonShown){
      moreAnsweredQuestions = <MoreAnsweredQuestions click={this.showMoreQuestions}/>
    } else {
      moreAnsweredQuestions = <div></div>
    }
    return(
      <div>
        {console.log(sampleData.questions.results)}
      <div className='qna-component-name'>Questions and Answers</div>
      <SearchQuestions search={this.search}/>
      <QuestionsList data={this.state.questions}/>
      <br />
      {moreAnsweredQuestions}
      <AddQuestion name = {this.state.product_name}/>
      </div>

    )
  }
}

export default QnA;