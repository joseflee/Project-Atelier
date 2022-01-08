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
});

describe('Rendering one answer item', function() {
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
    expect(wrapper.state().isValid).toEqual(true);
    expect(wrapper.state().questionBody).toEqual('');
    expect(wrapper.state().nickname).toEqual('');
    expect(wrapper.state().email).toEqual('');
  });


});

describe('Add new answer form', function() {
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
});