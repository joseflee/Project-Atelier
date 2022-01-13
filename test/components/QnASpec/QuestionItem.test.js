import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';

import QuestionItem from '../../../client/src/components/QnAcomponents/QuestionsListItem.jsx';

describe('Rendering one question item', function() {
  it('should render without throwing an error', function() {
    expect(shallow(<QuestionItem question={exampleQuestions.questions.results[0]}/>).contains( <div className='qna-question-item-helpful-keyword' >Helpful?</div>)).toBe(true);
  });

  xit('should be selectable by class', function() {
    expect(shallow(<QuestionItem question={exampleQuestions.questions.results[0]}/>).is('.qna-question-q-letter-body-wrapper')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<QuestionItem question={exampleQuestions.questions.results[0]}/>).find('.qna-question-item-wrap').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'Q: Why is this product cheaper here than other sites?Helpful?Yes(4)|Add answerSubmit your answer: Why is this product cheaper here than other sites?Your answer*What\'s your nickname?*For privacy reasons, do not use your full name or email addressYour email?*For authentication reasons, you will not be emailedClose without adding;A:We are selling it here without any markup from the middleman!By user SellerAugust 17, 2018;Helpful?Yes(4)Report';
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

    component.find('.qna-question-item-yes-button').simulate('click');
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
    component.find('.qna-question-item-yes-button').simulate('click');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should change state property if clicking on \'add new answer\' ', () => {

    const component = mount(<QuestionItem
      question={exampleQuestions.questions.results[0]} />);
    const spy1 = jest.spyOn(component.instance(), 'addAnswerHandleClick');
    //console.log(component.debug());
    expect(component.state().isAddAnswerClicked).toEqual(false);
    component.find('.qna-add-answer-link').simulate('click');
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
    component.find('#qna-more-answers-button').simulate('click');
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