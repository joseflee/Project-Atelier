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
    this.updateQuestionList = this.updateQuestionList.bind(this);
    this.clickOnHelpfulQuestion = this.clickOnHelpfulQuestion.bind(this);
    this.clickOnHelpfulAnswer = this.clickOnHelpfulAnswer.bind(this);
    this.addNewQuestion = this.addNewQuestion.bind(this);
  }

  componentDidMount() {
    let productId = this.props.productId;
    //GET PRODUCT NAME BY ITS ID
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
    //GET QUESTIONS LIST BY PRODUCT ID
    var url = 'http://localhost:3000/qna/getQuestionsList';
    axios.get(url, {params: {id: productId}})
      .then((response) => {
        console.log('should be question list', response.data.results);
        var questionsToShow = response.data.results;
        if (questionsToShow.length > 2) {
          this.setState({
            isMoreQuestionsButtonShown: true
          });
        }
        questionsToShow = questionsToShow.slice(0, 2);
        this.setState({
          questions: questionsToShow
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  clickOnHelpfulQuestion(productId, questionId) {
    console.log('clicked on helpful question');
    var url = 'http://localhost:3000/qna/updateQuestionHelp';
    axios.put(url, {params: {questionId: questionId, productId: productId}})
      .then((response) => {
        this.setState({
          isHelpful: true
        });
        this.updateQuestionList(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addNewQuestion(productId, body, nickname, email) {
    console.log('clicked on submit new question');
    //SEND REQUEST TO SERVER TO ADD A NEW QUESTION
    var url = 'http://localhost:3000/qna/addNewQuestion';
    axios.post(url, {params: {id: productId, body: body, name: nickname, email: email}})
      .then((response) => {
        console.log('added new question', response.data.results);
        this.updateQuestionList (response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showMoreQuestions() {
    //GET ALL QUESTIONS BY PRODUCT ID
    var url = 'http://localhost:3000/qna/getQuestionsList';
    axios.get(url, {params: {id: productId}})
      .then((response) => {
        this.setState({
          questions: response.data.results,
          isMoreQuestionsButtonShown: false
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  clickOnHelpfulAnswer(answerId, productId) {
    var url = 'http://localhost:3000/qna/updateAnswerHelp';
    axios.put(url, {params: {answerId: answerId, productId: productId}})
      .then((response) => {
        this.updateQuestionList(response.data.results);
        // this.setState({
        //   isHelpful: true
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateQuestionList(questions) {
    this.setState({
      questions: questions
    });
  }

  search(query, isSearchTriggered) {
    let productId = this.props.productId;

    //GET LIST OF ALL QUESTIONS BY PRODUCT ID
    var url = 'http://localhost:3000/qna/getQuestionsList';
    axios.get(url, {params: {id: productId}})
      .then((response) => {
        if (isSearchTriggered) {
          query = query.toLowerCase();
          console.log('received query', query);
          let questions = response.data.results;
          const filtered = questions.filter(item => item.question_body.toLowerCase().includes(query));
          console.log('filtered', filtered);
          //do not hiding questions if more than 2
          this.setState({
            questions: filtered
          });
        } else {
          console.log('search stopped');
          //render all the questions and hide the rest if more than 2
          var questionsToShow = response.data.results;
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
      })
      .catch(function (error) {
        console.log(error);
      });
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

        <div className='qna-component-name'><h1>Questions and Answers</h1></div>
        <SearchQuestions search={this.search}/>
        <QuestionsList data={this.state.questions}
          productId={this.props.productId}
          clickOnHelpful={this.clickOnHelpfulQuestion}
          clickOnHelpfulAnswer={this.clickOnHelpfulAnswer}
        />
        <br />
        {moreAnsweredQuestions}
        <AddQuestion name={this.state.productName}
          productId={this.props.productId}
          addQuestion={this.addNewQuestion}/>
      </div>

    );
  }
}

export default QnA;