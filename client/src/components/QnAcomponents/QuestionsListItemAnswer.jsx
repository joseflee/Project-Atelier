import React from 'react';

// const QuestionsListItemAnswer = (props) => (
//
// );

class QuestionsListItemAnswer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='answer-item'>
        <div className='answer-item-a-letter'><h2>A:{this.props.answer.body}</h2></div>
        <div className='answer-item-username'>By user {this.props.answer.answerer_name}</div><div className='answer-item-date'>{this.props.answer.date}</div>
        <div className='answer-item-photos'></div>
        <div className='answer-item-helpful-keyword'>Helpful?</div>
        <div className='answer-item-yes-button'>Yes({this.props.answer.helpfulness})</div>
        <div className='answer-item-report-button'>Report</div>
      </div>
    );
  }
}

export default QuestionsListItemAnswer;