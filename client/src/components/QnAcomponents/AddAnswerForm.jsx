import React from 'react';
import axios from 'axios';
import AnswerPhotoUpload from './AnswerPhotoUpload.jsx';

class AddAnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerBody: '',
      nickname: '',
      email: '',
      photos: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePhotos = this.handlePhotos.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handlePhotos(photos) {
    console.log('triggered handle photos', photos);
    this.setState({
      photos: photos
    });
  }

  handleSubmit() {
    event.preventDefault();
    var questionId = this.props.questionId;
    var body = this.state.answerBody;
    var nickname = this.state.nickname;
    var email = this.state.email;
    var photos = [];
    console.log('42', this.state);
    var validationResult = this.handleValidation(body, nickname, email);
    var productId = this.props.productId;

    if (validationResult) {
      this.props.addNewAnswer(questionId, body, nickname, email, photos, productId);
      this.props.closeAnswer();

    } else {
      alert('Not all fields filled');
    }
  }

  handleValidation(answer, nickname, email) {
    if (answer.length === 0) {
      return false;
    } else if (nickname.length === 0) {
      return false;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div>
        <div>Submit your answer</div>
        <div>{this.props.name}: {this.props.question_body}</div>
        <form>
          <label>
              Your answer*
            <input
              name='answerBody'
              type='text'
              maxLength='1000'
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
              maxLength='60'
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
              maxLength='60'
              placeholder='Example: jack@email.com'
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <br />
            <i>For authentication reasons, you will not be emailed</i>
          </label>
          <br />
          <label>
            <br />
            <AnswerPhotoUpload handlePhotos={this.handlePhotos} />
          </label>
          <input type="submit" value="Submit" onClick = {(e)=>this.handleSubmit(e)} />
        </form>
      </div>
    );
  }
}

export default AddAnswerForm;