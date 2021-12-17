import React from 'react';

class AddAnswerForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      answerBody:'',
      nickname:'',
      email:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(){
    event.preventDefault();
    console.log('pressed submit');
    console.log(this.state);
  }

  render(){
    return(
      <div>
        <div>Submit your answer</div>
        <div>{this.props.name}: {this.props.question_body}</div>
        <form>
            <label>
              Your answer*
              <input
                name='answerBody'
                type='text'
                maxlength='1000'
                value={this.state.answerBody}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <label>
              What's your nickname?*
              <input
                name='nickname'
                type='text'
                maxlength='60'
                placeholder='Example: jack543'
                value={this.state.nickname}
                onChange={this.handleInputChange}
              />
              <br />
              <i>For privacy reasons, do not use your full name or email address</i>
            </label>
            <br />
            <label>
              Your email?*
              <input
                name='email'
                type='text'
                maxlength='60'
                placeholder='Example: jack@email.com'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
              <br />
              <i>For authentication reasons, you will not be emailed</i>
            </label>
            <br />
            <input type="submit" value="Submit" onClick = {(e)=>this.handleSubmit(e)} />
          </form>
      </div>
    )
  }
}

export default AddAnswerForm;