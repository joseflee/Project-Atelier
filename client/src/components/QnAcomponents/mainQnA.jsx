import React from 'react';
import SearchQuestions from './SearchQuestions.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import sampleData from '../../../../example/questions.js';
import axios from 'axios';
import FormData from 'form-data';
import config from '../../../../config.js';
import ClickedData from '../ClickDataAnalytics.jsx';


class QnA extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      questions: [],
      isMoreQuestionsButtonShown: false,
      productName: 'This is not a name',
      isAddNewQuestionClicked: false,
      productId: this.props.productId,
      isSearchActive: false
    };

    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.search = this.search.bind(this);
    this.updateQuestionList = this.updateQuestionList.bind(this);
    this.clickOnHelpfulQuestion = this.clickOnHelpfulQuestion.bind(this);
    this.clickOnHelpfulAnswer = this.clickOnHelpfulAnswer.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.addNewAnswer = this.addNewAnswer.bind(this);
    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.checkAddingNewQuestion = this.checkAddingNewQuestion.bind(this);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }


  componentDidMount() {
    //console.log('this is props', this.props);
    this._isMounted = true;
    if (this._isMounted) {
      this.setState({
        productName: this.props.currentProduct.name,
        questions: this.props.questionsList
      });
    }
    if (this.props.questionsList.length > 2) {
      this.setState({
        isMoreQuestionsButtonShown: true
      });
    }
    // var questionsToShow = this.props.questionsList;
    // if (questionsToShow.length > 2) {
    //   if (this._isMounted) {
    //     this.setState({
    //       isMoreQuestionsButtonShown: true
    //     });
    //   }
    // }
    // questionsToShow = questionsToShow.slice(0, 2);
    // if (this._isMounted) {
    //   this.setState({
    //     questions: questionsToShow
    //   });
    // }

  }

  clickOnHelpfulQuestion(productId, questionId) {
    console.log('clicked on helpful question');
    var url = '/qna/updateQuestionHelp';
    axios.put(url, {params: {questionId: questionId, productId: productId}})
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            isHelpful: true
          });
        }
        this.updateQuestionList(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addNewQuestion(productId, body, nickname, email) {
    console.log('clicked on submit new question');
    //SEND REQUEST TO SERVER TO ADD A NEW QUESTION
    var url = '/qna/addNewQuestion';
    axios.post(url, {params: {id: productId, body: body, name: nickname, email: email}})
      .then((response) => {
        this.updateQuestionList (response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showMoreQuestions() {
    console.log('click');
    //GET ALL QUESTIONS BY PRODUCT ID
    var url = '/qna/getQuestionsList';
    axios.get(url, {params: {id: this.props.productId}})
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            questions: response.data.results,
            isMoreQuestionsButtonShown: false
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  clickOnHelpfulAnswer(answerId, productId) {
    var url = '/qna/updateAnswerHelp';
    axios.put(url, {params: {answerId: answerId, productId: productId}})
      .then((response) => {
        this.updateQuestionList(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  reportAnswer(answerId, productId) {
    console.log('clicked on report answer');
    //SEND REQUEST TO REPORT ANSWER
    var url = '/qna/reportAnswer';
    axios.put(url, {params: {answerId: answerId, productId: productId}})
      .then((response) => {
        console.log('sent response to client', response);
        this.updateQuestionList(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addNewAnswer(questionId, body, nickname, email, photos, productId) {
    console.log('144 main', photos);
    var photosToSend = [];
    var allPromises = [];
    if (photos.length > 0) {
      for (var i = 0; i < photos.length; i++) {
        var promise = new Promise((resolve, reject)=>{
          let file = photos[i];
          var formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', config.uploadPreset);
          axios.post ('https://api.cloudinary.com/v1_1/dtve8mtfz/upload', formData)
            .then((response) => {
              console.log('uploaded photo', response.data.secure_url);
              photosToSend.push(response.data.secure_url);
              resolve();
            }). catch(err => {
              console.log(err);
              reject();
            });
        });
        console.log('promises array', allPromises);
        allPromises.push(promise);
      }
      Promise.all(allPromises)
        .then(result => {
          console.log('promises resolved');
          //SEND REQUEST TO SERVER TO ADD A NEW ANSWER
          var url = '/qna/addNewAnswer';
          axios.post(url, {params: {id: questionId, productId: productId, body: body, name: nickname, email: email, photos: photosToSend}})
            .then((response) => {
              console.log('added new answer', response.data.results);
              //render new answer in the parent component
              this.updateQuestionList(response.data.results);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    } else {
      //send answer without photos
      //SEND REQUEST TO SERVER TO ADD A NEW ANSWER
      var url = '/qna/addNewAnswer';
      axios.post(url, {params: {id: questionId, productId: productId, body: body, name: nickname, email: email, photos: []}})
        .then((response) => {
          console.log('added new answer', response.data.results);
          //render new answer in the parent component
          this.updateQuestionList(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  updateQuestionList(questions) {
    if (this._isMounted) {
      this.setState({
        questions: questions
      });
    }

  }

  search(query, isSearchTriggered) {
    let productId = this.props.productId;
    //console.log('query=', query);
    //console.log('isSearchTriggered=', isSearchTriggered);
    if (isSearchTriggered === true) {
      this.setState({
        isSearchActive: true
      });
      //GET LIST OF ALL QUESTIONS BY PRODUCT ID
      var url = 'http://localhost:3000/qna/getQuestionsList';
      axios.get(url, {params: {id: productId}})
        .then((response) => {
          query = query.toLowerCase();
          console.log('received query', query);
          let questions = response.data.results;
          const filtered = questions.filter(item => item.question_body.toLowerCase().includes(query));
          console.log('filtered', filtered);
          //do not hiding questions if more than 2
          if (this._isMounted) {
            this.setState({
              questions: filtered
            });
          }
        }).catch(error => {
          console.log(error);
        });
    } else {
      console.log('search stopped');
      this.setState({
        isSearchActive: false
      });
      //render all the questions and hide the rest if more than 2
      //var questionsToShow = response.data.results;
      // var questionsToShow = [...this.props.questions];
      // if (questionsToShow.length > 2) {
      //   if (this._isMounted) {
      //     this.setState({
      //       isMoreQuestionsButtonShown: true
      //     });
      //   }
      // }
      // questionsToShow = questionsToShow.slice(0, 2);
      // if (this._isMounted) {
      //   this.setState({
      //     questions: questionsToShow
      //   });
      // }
    }
  }

  checkAddingNewQuestion() {
    console.log('click on add question');
    this.setState({
      isAddNewQuestionClicked: !this.state.isAddNewQuestionClicked
    });
  }

  render() {
    let moreAnsweredQuestions,
      qnaScreen,
      data;
    if (this.state.isSearchActive) {
      data = this.state.questions;
    } else {
      if (this.state.isMoreQuestionsButtonShown) {

        data = this.props.questionsList.slice(0, 2);
        moreAnsweredQuestions = <MoreAnsweredQuestions click={this.showMoreQuestions}/>;
      } else {
        data = this.props.questionsList;

        moreAnsweredQuestions = <div></div>;
      }
    }

    return (
      <div className='qna-main-component' onClick={this.props.onClick}>
        <div className={qnaScreen}></div>

        <div className='qna-component-name'>QUESTIONS AND ANSWERS</div>
        <SearchQuestions search={this.search}/>
        <QuestionsList
          data={data}
          productId={this.props.productId}
          clickOnHelpful={this.clickOnHelpfulQuestion}
          clickOnHelpfulAnswer={this.clickOnHelpfulAnswer}
          reportAnswer={this.reportAnswer}
          addNewAnswer={this.addNewAnswer}
          productName={this.props.currentProduct.name}
        />
        <br />
        <div className='qna-button-wrapper'>
          {moreAnsweredQuestions}
          <AddQuestion name={this.props.currentProduct.name}
            productId={this.props.productId}
            addQuestion={this.addNewQuestion}
            checkForm={this.checkAddingNewQuestion}
          />
        </div>
      </div>

    );
  }
}

//export default QnA;

const QnAwithClickData = ClickedData(QnA, 'Questions and Answers');

export default QnAwithClickData;
