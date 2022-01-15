import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


import MainQnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';
import QuestionItem from '../../../client/src/components/QnAcomponents/QuestionsListItem.jsx';
import Answer from '../../../client/src/components/QnAcomponents/QuestionsListItemAnswer.jsx';
import AddAnswerForm from '../../../client/src/components/QnAcomponents/AddAnswerForm.jsx';
import AddQuestionForm from '../../../client/src/components/QnAcomponents/AddQuestionForm.jsx';
import Search from '../../../client/src/components/QnAcomponents/SearchQuestions.jsx';
import exampleQuestions from '../../../example/questions.js';
import AddQuestion from '../../../client/src/components/QnAcomponents/AddQuestion.jsx';






import { mount, shallow } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

import dummydata from './dummydata.js';
//import MockAdapter from 'axios-mock-adapter';


let example = {
  data: {
    results: [{
      'question_id': 37,
      'question_body': 'Why is this product cheaper here than other sites?',
      'question_date': '2018-10-18T00:00:00.000Z',
      'asker_name': 'williamsmith',
      'question_helpfulness': 4,
      'reported': false,
      'answers': {}
    }]
  }
};


describe('API calls in Main component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  it('mocks get API call', async () => {

    const response = { data: { name: 'mocked name' } };

    jest.spyOn(axios, 'get').mockResolvedValueOnce(response);

    const wrapper = mount(<MainQnA productId={42}/>);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect (wrapper.state().productName).toEqual('mocked name');
    expect(axios.get).toHaveBeenCalledTimes(2);
    // expect(mockFn.mock.calls).toEqual([
    //   [arg1, arg2, ...], // First call
    //   [arg1, arg2, ...]  // Second call
    // ]);
  });


  it('mocks all get API call', async () => {
    const response1 = { data: { name: 'mocked name' } };
    const response2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(response1)
      .mockResolvedValueOnce(response2);


    const wrapper = mount(<MainQnA productId={42}/>);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect (wrapper.state().productName).toEqual('mocked name');
    expect (wrapper.state().questions.length).toEqual(1);
    expect (wrapper.state().questions[0].question_id).toEqual(37);
    //expect(axios.get).toHaveBeenCalledWith('bla');
    expect(wrapper.instance()._isMounted).toEqual(true);
    expect(wrapper.state().isMoreQuestionsButtonShown).toEqual(false);

  });

  it('mocks put API call for clicking on helpful question', async () => {
    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2);
    const putResponse = example;

    jest.spyOn(axios, 'put'). mockResolvedValueOnce(putResponse);

    const wrapper = mount(<MainQnA productId={42}/>);
    const parentSpy = jest.spyOn(wrapper.instance(), 'clickOnHelpfulQuestion');


    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    //child component
    let spy = jest.fn();

    const component = mount(<QuestionItem clickOnHelpful={parentSpy}
      question={exampleQuestions.questions.results[0]} />);

    component.find('.qna-question-item-yes-button').simulate('click');

    expect(parentSpy).toHaveBeenCalled();
    expect(axios.put).toHaveBeenCalled();
    expect(wrapper.instance()._isMounted).toEqual(true);
    expect(axios.put).toHaveBeenCalledWith('/qna/updateQuestionHelp', {'params': {'productId': undefined, 'questionId': 37}});

  });

  it('mocks put API call for clicking on helpful answer', async () => {
    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2);
    const putResponse = example;

    jest.spyOn(axios, 'put'). mockResolvedValueOnce(putResponse);

    const wrapper = mount(<MainQnA productId={42}/>);
    const parentSpy = jest.spyOn(wrapper.instance(), 'clickOnHelpfulAnswer');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    //child component
    let spy = jest.fn();

    const component = mount(<Answer clickOnHelpfulAnswer={parentSpy}
      answer={exampleQuestions.answers.results[0]} />);

    component.find('.qna-answer-item-yes-button').simulate('click');

    expect(parentSpy).toHaveBeenCalled();
    expect(axios.put).toHaveBeenCalled();
    expect(wrapper.instance()._isMounted).toEqual(true);
    expect(axios.put).toHaveBeenCalledWith('/qna/updateAnswerHelp', {'params': {'answerId': undefined, 'productId': undefined}});

  });

  it('mocks put API call for clicking on report answer', async () => {

    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2);
    const putResponse = example;

    jest.spyOn(axios, 'put'). mockResolvedValueOnce(putResponse);

    const wrapper = mount(<MainQnA productId={42}/>);
    const parentSpy = jest.spyOn(wrapper.instance(), 'reportAnswer');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    //child component

    const component = mount(<Answer reportAnswer={parentSpy}
      answer={exampleQuestions.answers.results[0]} />);

    component.find('.qna-answer-item-report-button').simulate('click');

    expect(parentSpy).toHaveBeenCalled();
    expect(axios.put).toHaveBeenCalled();
    expect(wrapper.instance()._isMounted).toEqual(true);
    expect(axios.put).toHaveBeenCalledWith('/qna/reportAnswer', {'params': {'answerId': undefined, 'productId': undefined}});
  });

  it('mocks post API call for adding a new answer', async () => {
    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2);
    const postResponse = example;

    jest.spyOn(axios, 'post'). mockResolvedValueOnce(postResponse);

    const parent = mount(<MainQnA productId={42}/>);
    const parentSpy = jest.spyOn(parent.instance(), 'addNewAnswer');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    //child component

    const formEventMocked = { preventDefault: jest.fn() };

    const passedMock1 = jest.fn();
    const passedMock2 = jest.fn();
    const wrapper = shallow(<AddAnswerForm addNewAnswer={parentSpy} closeAnswer={passedMock2} />);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');

    const state = {
      answerBody: 'This is a answer from tests',
      nickname: 'gandalf',
      email: 'example@email.com'
    };
    wrapper.setState(state);

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(spy3).toBeCalledTimes(1);
    //expect(passedMock1).toBeCalledTimes(1);
    expect(passedMock2).toBeCalledTimes(1);
    expect(parentSpy).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalled();
    expect(parent.instance()._isMounted).toEqual(true);

  });

  it('mocks post API call for adding a new question', async () => {

    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2);
    const postResponse = example;

    jest.spyOn(axios, 'post'). mockResolvedValueOnce(postResponse);

    const parent = mount(<MainQnA productId={42}/>);
    const parentSpy = jest.spyOn(parent.instance(), 'addNewQuestion');
    const parentSpy2 = jest.spyOn(parent.instance(), 'updateQuestionList');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    //child component
    const formEventMocked = { preventDefault: jest.fn() };

    const passedMock1 = jest.fn();
    const passedMock2 = jest.fn();
    const wrapper = shallow(<AddQuestionForm addQuestion={parentSpy} closeForm={passedMock2} />);
    const spy1 = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const spy2 = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy3 = jest.spyOn(wrapper.instance(), 'handleValidation');

    const state = {
      questionBody: 'This is a question from tests',
      nickname: 'gandalf',
      email: 'example@email.com'
    };
    wrapper.setState(state);
    expect(wrapper).toMatchSnapshot();

    wrapper.find('[type="submit"]').simulate('click', formEventMocked);
    expect(wrapper.state().isValid).toEqual(true);
    expect(spy3).toBeCalledTimes(1);
    expect(passedMock2).toBeCalledTimes(1);
    expect(parentSpy).toHaveBeenCalled();
    expect(parent.instance()._isMounted).toEqual(true);
    expect(axios.post).toHaveBeenCalled();

  });
  it('mocks get API call for search', async () => {

    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2).
      mockResolvedValueOnce(getResponse2);

    const parent = mount(<MainQnA productId={42}/>);
    const parentSpy = jest.spyOn(parent.instance(), 'search');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    //child component

    const component = mount(<Search search={parentSpy} value='bla' />);
    const input = component.find('input');
    const event = {
      preventDefault() {},
      target: { value: 'bla' }
    };
    component.find('input').simulate('change', event);
    // expect(onSearchMock).toHaveBeenCalled();
    // expect(onSearchMock).toBeCalledWith('bla', true);
    expect(parentSpy).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(parentSpy).toHaveBeenCalledWith('bla', true);
    console.log(parent.state());
    expect(parent.instance()._isMounted).toEqual(true);
    expect(parent.state().isMoreQuestionsButtonShown).toEqual(false);

  });

  xit('deals with error during search', async () => {

    //parent component

    const error = new Error('error');
    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2)
      .mockRejectedValue(error);

    const parent = mount(<MainQnA productId={42}/>);
    const parentSpy = jest.spyOn(parent.instance(), 'search');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

  });


  it('doesn\'t trigger API calls if the query length is less than 3 chars ', async () => {

    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = dummydata.questions;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2);


    const parent = mount(<MainQnA productId={42}/>);
    const parentSpy = jest.spyOn(parent.instance(), 'search');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    //child component

    const component = mount(<Search search={parentSpy} value='bla' />);
    const input = component.find('input');
    const event = {
      preventDefault() {},
      target: { value: '42' }
    };
    component.find('input').simulate('change', event);

    expect(parentSpy).toHaveBeenCalled();
    expect(parentSpy).toHaveBeenCalledWith('42', false);
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(parent.instance()._isMounted).toEqual(true);
    //console.log('is mounted', parent.instance()._isMounted);
    expect(parent.state().isMoreQuestionsButtonShown).toEqual(true);
    //expect(parent.state().questions.length()).toEqual(1);
  });

  it('correctly changes state of main if add new question form is clicked ', async () => {
    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2);
    const postResponse = example;

    jest.spyOn(axios, 'post'). mockResolvedValueOnce(postResponse);

    const parent = mount(<MainQnA productId={42}/>);
    const parentSpy = jest.spyOn(parent.instance(), 'checkAddingNewQuestion');


    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(parent.state().isAddNewQuestionClicked).toEqual(false);
    //child component

    const mockCheckForm = jest.fn();
    const wrapper = shallow(<AddQuestion checkForm={parentSpy} />);
    const spy = jest.spyOn(wrapper.instance(), 'clickOnAddQuestion');
    wrapper.find('.qna-add-question-button').simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(parentSpy).toHaveBeenCalledTimes(1);
    expect(parent.state().isAddNewQuestionClicked).toEqual(true);



  });











});
