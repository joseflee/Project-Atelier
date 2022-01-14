import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


import MainQnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';
import QuestionItem from '../../../client/src/components/QnAcomponents/QuestionsListItem.jsx';
import Answer from '../../../client/src/components/QnAcomponents/QuestionsListItemAnswer.jsx';


import { mount, shallow } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

import exampleQuestions from '../../../example/questions.js';
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

    const wrapper = mount(<MainQnA />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect (wrapper.state().productName).toEqual('mocked name');
    expect(axios.get).toHaveBeenCalled();

    // axios.get.mockImplementation((url) => {
    //   if (url === 'www.example.com') {
    //       return Promise.resolve({ data: {...} });
    //   } else {
    //       //...
    //   }
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
    expect(wrapper.state().isMoreQuestionsButtonShown).toEqual(false);

  });

  it('mocks put API call for clicking on helpful question', async () => {

    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2);
    const putResponse = 'bla';


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
    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/qna/updateQuestionHelp', {'params': {'productId': undefined, 'questionId': 37}});


  });

  it('mocks put API call for clicking on helpful answer', async () => {

    //parent component
    const getResponse1 = { data: { name: 'mocked name' } };
    const getResponse2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(getResponse1)
      .mockResolvedValueOnce(getResponse2);
    const putResponse = 'bla';


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
    expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/qna/updateAnswerHelp', {"params": {"answerId": undefined, "productId": undefined}});


  });














});




















