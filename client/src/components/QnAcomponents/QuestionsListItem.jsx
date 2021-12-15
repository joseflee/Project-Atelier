import React from 'react';
import QuestionsListItemAnswer from './QuestionsListItemAnswer.jsx';

class QuestionsListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      answers: {}
    }
    this.clickOnMoreAnswers = this.clickOnMoreAnswers.bind(this);
  }

  componentDidMount(){
    let answersToShow = Object.values(this.props.question.answers);
    answersToShow = answersToShow.slice(0, 2);
    this.setState({
      answers: answersToShow
    })
  }

  clickOnMoreAnswers(){
    let answersToShow = Object.values(this.props.question.answers);
    this.setState({
      answers: answersToShow
    })
  }

  render(){
    let moreAnswers;
    let length = Object.keys(this.props.question.answers).length;
    if(length > 2){
      moreAnswers = <button onClick={()=>{this.clickOnMoreAnswers()}}>Load more answers</button>
    } else {
      moreAnswers = <div></div>
    }

    return(
      <div>

        {/* beginning of question item */}

        <div className='question-item'>
          <div className='question-item-q-letter'><h2>Q:{this.props.question.question_body}</h2></div>
          <div className='question-item-helpful-keyword'>Helpful?</div>
          <div className='question-item-yes-button'>Yes({this.props.question.question_helpfulness})</div>
          <div className='question-item-add-answer-link'>Add answer</div>
        </div>
       {/* end of question item */}
       {
         Object.values(this.state.answers).map((answer, key) => {
           return <QuestionsListItemAnswer answer={answer} key={key}/>
         })
       }
       {moreAnswers}


      </div>
      )


  }




}

export default QuestionsListItem;