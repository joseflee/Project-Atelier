import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


import MainQnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';
import { mount } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

import exampleQuestions from '../../../example/questions.js';
import MockAdapter from 'axios-mock-adapter';


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

    console.log(wrapper.state());
  });

  it('mocks all get API call', async () => {

    const response1 = { data: { name: 'mocked name' } };
    const response2 = example;

    jest.spyOn(axios, 'get').mockResolvedValueOnce(response1)
      .mockResolvedValueOnce(response2);


    const wrapper = mount(<MainQnA />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect (wrapper.state().productName).toEqual('mocked name');
    expect (wrapper.state().questions.length).toEqual(1);
    expect (wrapper.state().questions[0].question_id).toEqual(37);
    expect(axios.get).toHaveBeenCalled();

  });

});



