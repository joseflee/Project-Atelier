import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';
import MoreAnsweredQuestions from '../../../client/src/components/QnAcomponents/MoreAnsweredQuestions.jsx';


describe('More answered questions button', function() {

  it('should render to static HTML', function() {
    var text = 'MORE ANSWERED QUESTIONS';
    expect(render(<MoreAnsweredQuestions />).text()).toEqual(text);
  });

  it('should trigger the passed function on click', function() {
    const click = jest.fn();
    const wrapper = mount(<MoreAnsweredQuestions click={click}/>);
    wrapper.find('.more-answered-questions-button').simulate('click');
    expect (click).toHaveBeenCalled();
  });

});

