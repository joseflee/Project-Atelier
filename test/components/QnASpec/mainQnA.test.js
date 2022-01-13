import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';

import exampleQuestions from '../../../example/questions.js';
import MainQnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';



describe('Main Questions and Answers form', function() {
  it('should render without throwing an error', function() {
    expect(shallow(<MainQnA productId={59553}/>).contains( <div className='qna-component-name'>QUESTIONS AND ANSWERS</div>)).toBe(true);
  });

  it('should be selectable by class', function() {
    expect(shallow(<MainQnA productId={59553} />).is('.qna-main-component')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(shallow(<MainQnA productId={59553}/>).find('.qna-main-component').length).toBe(1);
  });

  it('should render to static HTML', function() {
    var text = 'QUESTIONS AND ANSWERSADD A QUESTIONAsk a question about the This is not a nameYour question*What\'s your nickname?*For privacy reasons, do not use your full name or email addressYour email?*For authentication reasons, you will not be emailedClose without submitting';
    expect(render(<MainQnA productId={59553}/>).text()).toEqual(text);
  });


});