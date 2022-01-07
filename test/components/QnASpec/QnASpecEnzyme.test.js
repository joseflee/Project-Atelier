import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render } from 'enzyme';

import AddQuestionForm from '../../../client/src/components/QnAcomponents/AddQuestionForm.jsx';



describe('A suite', function() {
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
});