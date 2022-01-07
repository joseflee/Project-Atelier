import React from 'react';
import QuestionsListItemAnswer from './QuestionsListItemAnswer.jsx';
import AddAnswerForm from './AddAnswerForm.jsx';
import AnswersList from './AnswersList.jsx';
import axios from 'axios';

class QuestionsListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddAnswerClicked: false,
      answers: {},
      isMoreAnswersShown: false,
      isHelpful: false
    };
    this.clickOnMoreAnswers = this.clickOnMoreAnswers.bind(this);
    this.addAnswerHandleClick = this.addAnswerHandleClick.bind(this);
    this.clickOnHelpful = this.clickOnHelpful.bind(this);
    this.closeAnswerForm = this.closeAnswerForm.bind(this);
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

  addAnswerHandleClick(event) {
    //event.stopPropagation();
    console.log('should be triggered once');
    this.setState({
      isAddAnswerClicked: true
    });
  }

  closeAnswerForm() {
    //console.log('triggered close answer');
    //console.log('before triggering closing', this.state);

    this.setState((prevState) => {
      console.log(prevState);
      return {
        isAddAnswerClicked: false
      };
    }, () => {
      console.log('updated', this.state);
    });
  }

  clickOnHelpful() {
    let questionId = this.props.question.question_id;
    let productId = this.props.productId;

    //ADD HELPFULLNESS FOR THIS QUESTION
    if (!this.state.isHelpful) {
      this.props.clickOnHelpful(productId, questionId);
    } else {
      alert ('you\'ve already clicked on helpful link');
    }

  }

  render() {

    let moreAnswers,
      addAnswer,
      answersList;

    if (this.state.isMoreAnswersShown) {
      moreAnswers = <button onClick={()=>{ this.clickOnMoreAnswers(); }}>Load more answers</button>;
      answersList = <AnswersList list={Object.values(this.props.question.answers).slice(0, 2)}
        questionId={this.props.question.question_id}
        productId={this.props.productId}
        clickOnHelpfulAnswer={this.props.clickOnHelpfulAnswer}
        reportAnswer={this.props.reportAnswer}
      />;

    } else {
      moreAnswers = <div></div>;
      answersList = <AnswersList list={Object.values(this.props.question.answers)}
        questionId={this.props.question.question_id}
        productId={this.props.productId}
        clickOnHelpfulAnswer={this.props.clickOnHelpfulAnswer}
        reportAnswer={this.props.reportAnswer}
      />;

    }

    if (this.state.isAddAnswerClicked) {
      addAnswer = <AddAnswerForm name={this.props.name}
        question_body={this.props.question.question_body}
        questionId={this.props.question.question_id}
        productId={this.props.productId}
        closeAnswer={this.closeAnswerForm}
        addNewAnswer={this.props.addNewAnswer}

      />;
    } else {
      addAnswer = <div onClick={this.addAnswerHandleClick}><u>Add answer</u></div>;
    }

    return (
      <div className='question-item-wrap'>

        {/* beginning of question item */}
        <div className='question-item'>
          <div className='question-item-q-letter'><h2>Q:{this.props.question.question_body}</h2></div>
          <div className='question-item-helpful-keyword' >Helpful?</div>
          <div className='question-item-yes-button' onClick={()=>{ this.clickOnHelpful(); }}><u>Yes</u>({this.props.question.question_helpfulness})</div>
          <div className='question-item-add-answer-link' >{addAnswer}</div>
        </div>
        {/* end of question item */}
        {answersList}

        {moreAnswers}
      </div>
    );


  }




}

export default QuestionsListItem;