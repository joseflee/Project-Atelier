import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';

import exampleQuestions from '../../../example/questions.js';
import MainQnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';



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