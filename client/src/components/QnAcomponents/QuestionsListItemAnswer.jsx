import React from 'react';
import axios from 'axios';

class QuestionsListItemAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReported: false,
      isHelpful: false
    };

    this.clickOnYes = this.clickOnYes.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  clickOnYes() {
    let answerId = this.props.answer.id;
    let productId = this.props.productId;

    //UPDATE ANSWER HELPFUL COUNTER
    if (!this.state.isHelpful) {
      var url = 'http://localhost:3000/qna/updateAnswerHelp';
      axios.put(url, {params: {answerId: answerId, productId: productId}})
        .then((response) => {
          this.props.update(response.data.results);
          this.setState({
            isHelpful: true
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert ('you\'ve alredy clicked on helpful link');
    }
  }

  reportAnswer() {
    let answerId = this.props.answer.id;
    let productId = this.props.productId;

    if (!this.state.isReported) {
    //SEND REQUEST TO REPORT ANSWER
      var url = 'http://localhost:3000/qna/reportAnswer';
      axios.put(url, {params: {answerId: answerId, productId: productId}})
        .then((response) => {
          console.log('sent response to client', response);
          // this.props.update(response.data.results);
          this.setState({
            isReported: true
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert('you\'ve already reported this answer');
    }

  }

  render() {
    var report;
    if (this.state.isReported) {
      report = <div>Reported</div>;
    } else {
      report = <div>Report</div>;
    }
    return (
      <div className='answer-item'>
        <div className='answer-item-a-letter'><h2>A:{this.props.answer.body}</h2></div>
        <div className='answer-item-username'>By user {this.props.answer.answerer_name}</div><div className='answer-item-date'>{this.props.answer.date}</div>
        <div className='answer-item-photos'></div>
        <div className='answer-item-helpful-keyword'>Helpful?</div>
        <div className='answer-item-yes-button' onClick={()=>{ this.clickOnYes(); }}><u>Yes({this.props.answer.helpfulness})</u></div>
        <div className='answer-item-report-button' onClick={()=> { this.reportAnswer(); }}><u>{report}</u></div>
      </div>
    );
  }
}

export default QuestionsListItemAnswer;