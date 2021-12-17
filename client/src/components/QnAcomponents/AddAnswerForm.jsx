import React from 'react';

class AddAnswerForm extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div>
        <div>Submit your answer</div>
        <div>here name:{this.props.name}</div>
      </div>
    )
  }
}

export default AddAnswerForm;