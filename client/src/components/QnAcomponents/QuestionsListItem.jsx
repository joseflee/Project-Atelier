import React from 'react';
import QuestionsListItemAnswer from './QuestionsListItemAnswer.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';
import axios from 'axios';

class QuestionsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddAnswerClicked: false,
      answers: {},
      isMoreAnswersShown: false
    };
    this.clickOnMoreAnswers = this.clickOnMoreAnswers.bind(this);
    this.addAnswerHandleClick = this.addAnswerHandleClick.bind(this);
    this.clickOnHelpful = this.clickOnHelpful.bind(this);
  }

  componentDidMount() {

    let answersToShow = Object.values(this.props.question.answers);
    if (answersToShow.length > 2) {
      this.setState({
        isMoreAnswersShown: true
      });
    }
    answersToShow = answersToShow.slice(0, 2);
    this.setState({
      answers: answersToShow
    });
  }

  clickOnMoreAnswers() {
    let answersToShow = Object.values(this.props.question.answers);
    this.setState({
      answers: answersToShow,
      isMoreAnswersShown: false
    });
  }

  addAnswerHandleClick() {
    console.log('click');
    this.setState({
      isAddAnswerClicked: true
    });
  }

  clickOnHelpful() {
    console.log('clicked on helpful');
    let questionId = this.props.question.question_id;
    let productId = this.props.productId;
    console.log('product id', productId);

    //ADD HELPFULLNESS FOR THIS QUESTION
    var url = 'http://localhost:3000/qna/addHelpfullness';
    axios.put(url, {params: {questionId: questionId, productId: productId}})
      .then((response) => {
        console.log('added helpfullness');
        console.log('response 57', response.data.results);
        this.props.update(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let moreAnswers,
      addAnswer;
    //let length = Object.keys(this.props.question.answers).length;
    if (this.state.isMoreAnswersShown) {
      moreAnswers = <button onClick={()=>{ this.clickOnMoreAnswers(); }}>Load more answers</button>;
    } else {
      moreAnswers = <div></div>;
    }

    if (this.state.isAddAnswerClicked) {
      addAnswer = <AddAnswerForm name={this.props.name} question_body={this.props.question.question_body}/>;
    } else {
      addAnswer = <u>Add answer</u>;
    }

    return (
      <div>

        {/* beginning of question item */}
        <div className='question-item'>
          <div className='question-item-q-letter'><h2>Q:{this.props.question.question_body}</h2></div>
          <div className='question-item-helpful-keyword' onClick={()=>{this.clickOnHelpful(); }}>Helpful?</div>
          <div className='question-item-yes-button'>Yes({this.props.question.question_helpfulness})</div>
          <div className='question-item-add-answer-link' onClick={()=>this.addAnswerHandleClick()}>{addAnswer}</div>
        </div>
        {/* end of question item */}
        {
          Object.values(this.state.answers).map((answer, key) => {
            return <QuestionsListItemAnswer answer={answer} key={key}/>;
          })
        }
        {moreAnswers}


      </div>
    );


  }




}

export default QuestionsListItem;