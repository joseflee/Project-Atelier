import React from 'react';

class AddAnswerForm extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div>
        <div>Submit your answer</div>
        <div>{this.props.name}: {this.props.question_body}</div>
      </div>
    )
  }
}

export default AddAnswerForm;