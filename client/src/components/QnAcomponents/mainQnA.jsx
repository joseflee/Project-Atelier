import React from 'react';
import SearchQuestions from './SearchQuestions.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import sampleData from '../../../../example/questions.js';
import axios from 'axios';

class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isMoreQuestionsButtonShown: false,
      productName: 'This is not a name'
    };
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.search = this.search.bind(this);
    this.getQuestionsList = this.getQuestionsList.bind(this);
  }

  componentDidMount() {
    this.getQuestionsList()
    var questionsToShow = sampleData.questions.results;
    if (questionsToShow.length > 2) {
      this.setState({
        isMoreQuestionsButtonShown: true
      });
    }
    questionsToShow = questionsToShow.slice(0, 2);
    this.setState({
      questions: questionsToShow
    });
    //get product name by its id
    let productId = this.props.productId;

    var url = 'http://localhost:3000/qna/getProductById';
    axios.get(url, {params: {id: productId}})
      .then((response) => {
        this.setState({
          productName: response.data.name
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getQuestionsList() {
    var url = 'http://localhost:3000/qna//getQuestionsList';
    axios.get(url)
      .then((response) => {
        console.log('should be question list', response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showMoreQuestions() {
    this.setState({
      questions: sampleData.questions.results,
      isMoreQuestionsButtonShown: false
    });
  }

  search(query, isSearchTriggered) {
    if (isSearchTriggered) {
      query = query.toLowerCase();
      console.log('received query', query);
      //console.log(this.state.questions);
      let questions = sampleData.questions.results;
      const filtered = questions.filter(item => item.question_body.toLowerCase().includes(query));
      //console.log('filtered', filtered);
      //do not hiding questions if more than 2
      this.setState({
        questions: filtered
      });
    } else {
      //console.log('search stopped');
      //render all the questions and hide the rest if more than 2
      var questionsToShow = sampleData.questions.results;
      if (questionsToShow.length > 2) {
        this.setState({
          isMoreQuestionsButtonShown: true
        });
      }
      questionsToShow = questionsToShow.slice(0, 2);
      this.setState({
        questions: questionsToShow
      });
    }

  }

  render() {
    let moreAnsweredQuestions;
    if (this.state.isMoreQuestionsButtonShown) {
      moreAnsweredQuestions = <MoreAnsweredQuestions click={this.showMoreQuestions}/>;
    } else {
      moreAnsweredQuestions = <div></div>;
    }
    return (
      <div>
        {/* {console.log(sampleData.questions.results)} */}
        <div className='qna-component-name'>Questions and Answers</div>
        <SearchQuestions search={this.search}/>
        <QuestionsList data={this.state.questions}/>
        <br />
        {moreAnsweredQuestions}
        <AddQuestion name = {this.state.productName}/>
      </div>

    );
  }
}

export default QnA;