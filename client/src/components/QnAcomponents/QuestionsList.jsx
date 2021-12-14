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

      
     </div>
    )
  }
}

export default QuestionsList;