import React from 'react';
import QuestionsListItemAnswer from './QuestionsListItemAnswer.jsx';

const AnswersList = (props) => (
  <div>
    {console.log(props)}
    {props.list.map((answer, key) => {
      return (
        <QuestionsListItemAnswer answer={answer}
          key={key}
          questionId={props.question_id}
          productId={props.productId}
          update={props.update} />);
    })}
  </div>
);





export default AnswersList;

