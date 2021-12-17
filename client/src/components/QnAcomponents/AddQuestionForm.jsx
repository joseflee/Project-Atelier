import React from 'react';

class AddQuestionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isValid: true,
      questionBody:'',
      nickname:'',
      email:''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    var body = this.state.questionBody;
    var nickname = this.state.nickname;
    var email = this.state.email;
    var validationResult = this.handleValidation(body, nickname, email);

    if(validationResult){
      this.setState({
        isValid: true
      })
    }
  }

  handleValidation(question, nick, email){
    if (question.length === 0){
      return false;
    } else if (nick.length === 0) {
      return false;
    } else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
      return false;
    } else {
      return true;
    }
  }


  render(){
    return(
      <div>
        <div className = 'qna-add-question-main-title'>Ask a question</div>
          <div className ='qna-add-question-subtitle'>About the {this.props.name}</div>
          <form>
            <label>
              Your question*
              <input
                name='questionBody'
                type='text'
                maxlength='1000'
                value={this.state.questionBody}
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
                placeholder='Example: jackson11'
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
                placeholder='Example: sample@email.com'
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

export default AddQuestionForm;