import React from 'react';
import QuestionsListItem from './QuestionsListItem.jsx';

class QuestionsList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        {console.log(this.props.data.questions.results)}
        {this.props.data.questions.results.map((question, key) =>{
         return <QuestionsListItem question={question} key={key} />
        })}

      <button className='load-more-answers-button'>Load more answers</button>
     </div>
    )
  }
}

export default QuestionsList;