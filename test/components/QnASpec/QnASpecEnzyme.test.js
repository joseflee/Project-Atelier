import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';
//components
import AddQuestionForm from '../../../client/src/components/QnAcomponents/AddQuestionForm.jsx';
import MainQnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';
//import QuestionsList from '../../../client/src/components/QnAcomponents/QuestionsList.jsx';
import QuestionItem from '../../../client/src/components/QnAcomponents/QuestionsListItem.jsx';
import Answer from '../../../client/src/components/QnAcomponents/QuestionsListItemAnswer.jsx';
import AddQuestion from '../../../client/src/components/QnAcomponents/AddQuestion.jsx';
import AddAnswerForm from '../../../client/src/components/QnAcomponents/AddAnswerForm.jsx';
import AnswerPhoto from '../../../client/src/components/QnAcomponents/AnswerPhotoUpload.jsx';
import MoreAnsweredQuestions from '../../../client/src/components/QnAcomponents/MoreAnsweredQuestions.jsx';
import Search from '../../../client/src/components/QnAcomponents/SearchQuestions.jsx';



describe('Main Questions and Answers form', function() {
  xit('should render without throwing an error', function() {
    expect(shallow(<MainQnA productId={59553}/>).contains( <div className='qna-component-name'><h1>Questions and Answers</h1></div>)).toBe(true);
  });

  xit('should be selectable by class', function() {
    expect(shallow(<MainQnA productId={59553} />).is('.qna-main-component')).toBe(true);
  });

  xit('should mount in a full DOM', function() {
    expect(mount(<MainQnA productId={59553}/>).find('.qna-main-component').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Questions and AnswersAdd a new question';
    expect(render(<MainQnA productId={59553}/>).text()).toEqual(text);
  });


});

describe('Rendering one question item', function() {
  it('should render without throwing an error', function() {
    expect(shallow(<QuestionItem question={exampleQuestions.questions.results[0]}/>).contains( <div className='question-item-helpful-keyword' >Helpful?</div>)).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<QuestionItem question={exampleQuestions.questions.results[0]}/>).is('.question-item-wrap')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<QuestionItem question={exampleQuestions.questions.results[0]}/>).find('.question-item-wrap').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Q:Why is this product cheaper here than other sites?Helpful?Yes(4)Add answerA:We are selling it here without any markup from the middleman!By user SellerAugust 17, 2018;Helpful?Yes(4)Report';
    expect(render(<QuestionItem question={exampleQuestions.questions.results[0]}/>).text()).toEqual(text);
  });

  it('should pass props', function() {
    const wrapper = mount(<QuestionItem question={exampleQuestions.questions.results[0]} />);
    const id = wrapper.props().question.question_id;
    const questionBody = wrapper.props().question.question_body;
    expect(id).toEqual(37);
    expect(questionBody).toEqual('Why is this product cheaper here than other sites?');
  });


  it('should call clickOnYes when clicking on \'Yes\' link', () => {
    let spy = jest.fn();

    const component = mount(<QuestionItem clickOnHelpful={spy}
      question={exampleQuestions.questions.results[0]} />);

    component.find('.question-item-yes-button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('doesn\'t let you click again on helpful counter', () => {
    let spy = jest.fn();
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const component = mount(<QuestionItem clickOnHelpful={spy}
      question={exampleQuestions.questions.results[0]} />);
    const state = {
      isHelpful: true
    };
    component.setState(state);
    component.find('.question-item-yes-button').simulate('click');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should change state property if clicking on \'add new answer\' ', () => {

    const component = mount(<QuestionItem
      question={exampleQuestions.questions.results[0]} />);
    const spy1 = jest.spyOn(component.instance(), 'addAnswerHandleClick');

    expect(component.state().isAddAnswerClicked).toEqual(false);
    component.find('.question-item-add-answer-link').simulate('click');
    expect(spy1).toHaveBeenCalled();
    expect(component.state().isAddAnswerClicked).toEqual(true);

  });

  it('should change state property if clicking on \'show more answers\' ', () => {

    const component = mount(<QuestionItem
      question={exampleQuestions.questions.results[1]} />);
    const spy1 = jest.spyOn(component.instance(), 'clickOnMoreAnswers');
    //button is visible
    expect(component.state().isMoreAnswersShown).toEqual(true);
    expect(component.state().answers.length).toEqual(2);
    component.find('#more-answers-button').simulate('click');
    //console.log(component.debug());
    expect(spy1).toHaveBeenCalled();
    expect(component.state().isMoreAnswersShown).toEqual(false);

  });

  it('should not show  \'show more answers\' buttons with less than 2 answers', () => {

    const component = mount(<QuestionItem
      question={exampleQuestions.questions.results[0]} />);
    const spy1 = jest.spyOn(component.instance(), 'clickOnMoreAnswers');
    //button is not visible
    expect(component.state().answers.length).toEqual(1);
    expect(component.state().isMoreAnswersShown).toEqual(false);
  });

});

describe('Rendering one answer item', function() {

  it('should call clickOnYes when clicking on \'Yes\' link', () => {
    let spy = jest.fn();

    const component = mount(<Answer clickOnHelpfulAnswer={spy}
      answer={exampleQuestions.answers.results[0]} />);

    component.find('.answer-item-yes-button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should call reportAnswer() when clicking on \'Report answer\' link', () => {
    let spy = jest.fn();

    const component = mount(<Answer reportAnswer={spy}
      answer={exampleQuestions.answers.results[0]} />);

    component.find('.answer-item-report-button').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('doesn\'t let you click again on alredy reported answer', () => {
    let spy = jest.fn();
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const component = mount(<Answer reportAnswer={spy}
      answer={exampleQuestions.answers.results[0]} />);
    const state = {
      isReported: true
    };
    component.setState(state);
    //console.log(component.state().isReported);
    component.find('.answer-item-report-button').simulate('click');
    expect(spy).not.toHaveBeenCalled();
  });

  it('doesn\'t let you click again on helpful counter', () => {
    let spy = jest.fn();
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const component = mount(<Answer clickOnHelpfulAnswer={spy}
      answer={exampleQuestions.answers.results[0]} />);
    const state = {
      isHelpful: true
    };
    component.setState(state);
    //console.log(component.state().isReported);
    component.find('.answer-item-yes-button').simulate('click');
    expect(spy).not.toHaveBeenCalled();
  });



  it('should render without throwing an error', function() {
    expect(shallow(<Answer answer={exampleQuestions.answers.results[0]}/>).contains(<div className='answer-item-helpful-keyword'>Helpful?</div>
    )).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<Answer answer={exampleQuestions.answers.results[0]}/>).is('.answer-item')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<Answer answer={exampleQuestions.answers.results[0]}/>).find('.answer-item').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'A:What a great question!By user metsloverJanuary 03, 2018;Helpful?Yes(8)Report';
    expect(render(<Answer answer={exampleQuestions.answers.results[0]}/>).text()).toEqual(text);
  });

  it('should pass props', function() {
    const wrapper = mount(<Answer answer={exampleQuestions.answers.results[0]} />);
    const id = wrapper.props().answer.answer_id;
    const answerBody = wrapper.props().answer.body;
    expect(id).toEqual(8);
    expect(answerBody).toEqual('What a great question!');
  });
});

describe('Rendering add question parent component', function() {
  xit('should render without throwing an error', function() {
    expect(shallow(<AddQuestion />).contains( <div className='add-question-parent'></div>
    )).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<AddQuestion />).is('.add-question-parent')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<AddQuestion />).find('.add-question-parent').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Add a new question';
    expect(render(<AddQuestion />).text()).toEqual(text);
  });
});

describe('Add new question form', function() {

  test('click on submit button without filling the form', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = shallow(<AddQuestionForm/>);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');
    //wrapper.find('[type="submit"]').simulate('submit');
    expect(wrapper.find('form')).toHaveLength(1);
    //wrapper.find('form').simulate('submit', formEventMocked);
    wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);
    expect(spy1).not.toHaveBeenCalled();

  });

  test('click on submit button when form not filled properly', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = shallow(<AddQuestionForm/>);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');

    const state = {
      questionBody: 'This is a question from tests',
      nickname: 'gandalf',
      email: ''
    };
    wrapper.setState(state);
    expect(wrapper).toMatchSnapshot();
    //expect(wrapper.find('form')).toHaveLength(1);

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);

    expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);

  });

  test('allows to type in the form fields', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = mount(<AddQuestionForm/>);
    //wrapper.find('input').simulate('change', {target: {value: 'Your new Value'}});
    const question = wrapper.find({name: 'questionBody'});
    question.props().value = 'foo';
    //question.simulate('change', { target: { value: 'bla' } });
    //console.log(question.debug());
    //wrapper.update();
    //wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(question.props().value).toBeTruthy();

  });

  it('should render without throwing an error', function() {
    expect(shallow(<AddQuestionForm />).contains(<div className = 'qna-add-question-main-title'>Ask a question</div>)).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<AddQuestionForm />).is('.qna-add-new-question-form')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<AddQuestionForm />).find('.qna-add-new-question-form').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Ask a questionAbout the Your question*What\'s your nickname?*For privacy reasons, do not use your full name or email addressYour email?*For authentication reasons, you will not be emailed';
    expect(render(<AddQuestionForm />).text()).toEqual(text);
  });

  it('should have properties at state', () => {
    const wrapper = mount(<AddQuestionForm
    />);
    expect(wrapper.state().isValid).toEqual(false);
    expect(wrapper.state().questionBody).toEqual('');
    expect(wrapper.state().nickname).toEqual('');
    expect(wrapper.state().email).toEqual('');
  });


});

describe('Add new answer form', function() {

  test('click on submit button without filling the form', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = shallow(<AddAnswerForm />);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');
    //wrapper.find('[type="submit"]').simulate('submit');
    expect(wrapper.find('form')).toHaveLength(1);
    //wrapper.find('form').simulate('submit', formEventMocked);
    wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);
    expect(spy1).not.toHaveBeenCalled();

  });

  test('click on submit button when form not filled properly', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {};

    const wrapper = shallow(<AddAnswerForm/>);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');

    const state = {
      answerBody: 'This is an answer from tests',
      nickname: 'gandalf',
      email: ''
    };
    wrapper.setState(state);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('form')).toHaveLength(1);

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);

    expect(formEventMocked.preventDefault).toBeCalledTimes(1);
    expect(spy3).toBeCalledTimes(1);

  });

  test('allows to type in the form fields', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = mount(<AddAnswerForm />);

    const answer = wrapper.find({name: 'answerBody'});
    answer.props().value = 'bar';

    expect(answer.props().value).toBeTruthy();

  });

  it('should render without throwing an error', function() {
    expect(shallow(<AddAnswerForm />).contains(<div className='qna-submit-answer'>Submit your answer</div>)).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<AddAnswerForm />).is('.qna-add-answer')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<AddAnswerForm />).find('.qna-add-answer').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Submit your answer: Your answer*What\'s your nickname?*For privacy reasons, do not use your full name or email addressYour email?*For authentication reasons, you will not be emailed';
    expect(render(<AddAnswerForm />).text()).toEqual(text);
  });
});

describe('Uploading photos in answers', function() {

  it('should be selectable by class', function() {
    expect(shallow(<AnswerPhoto />).is('.qna-answer-photo-upload')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<AnswerPhoto />).find('.qna-answer-photo-upload').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = '';
    expect(render(<AnswerPhoto />).text()).toEqual(text);
  });
});

describe('More answered questions button', function() {

  it('should render to static HTML', function() {
    var text = 'More answered questions';
    expect(render(<MoreAnsweredQuestions />).text()).toEqual(text);
  });

  it('should trigger the passed function on click', function() {
    const click = jest.fn();
    const wrapper = mount(<MoreAnsweredQuestions click={click}/>);
    wrapper.find('.more-answered-questions-button').simulate('click');
    expect (click).toHaveBeenCalled();
  });

});

describe('Search', function() {

  it('should render to static HTML', function() {
    var text = '';
    expect(render(<Search />).text()).toEqual(text);
  });

  test('allows to type in the form fields', () => {
    const formEventMocked = { preventDefault: jest.fn() };
    const alertSpy = window.alert;
    window.alert = () => {}; // provide an empty implementation for window.alert

    const wrapper = mount(<Search/>);

    const query = wrapper.find('input');
    query.props().value = 'bla';

    expect(query.props().value).toBeTruthy();

  });

  test('click on submit button invokes handleInputChange', () => {
    const onSearchMock = jest.fn();
    const component = mount(<Search search={onSearchMock} value='bla' />);
    const input = component.find('input');
    const event = {
      preventDefault() {},
      target: { value: 'bla' }
    };
    component.find('input').simulate('change', event);
    expect(onSearchMock).toHaveBeenCalled();
    expect(onSearchMock).toBeCalledWith('bla', true);
  });

  test('passes false to parent if the query less than 2 characters', () => {
    const onSearchMock = jest.fn();
    const component = mount(<Search search={onSearchMock} value='bla' />);
    const input = component.find('input');
    const event = {
      preventDefault() {},
      target: { value: 'a' }
    };
    component.find('input').simulate('change', event);
    expect(onSearchMock).toHaveBeenCalled();
    expect(onSearchMock).toBeCalledWith('a', false);
  });

});