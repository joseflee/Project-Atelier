import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { shallow, mount, render, ShallowWrapper } from 'enzyme';
//example data
import exampleQuestions from '../../../example/questions.js';
import MyOutfitCards from '../../../client/src/components/RelProductsComponents/MyOutfitCards.jsx';


describe('My Outfits Card Rendering', function() {

  it('should render to static HTML', function() {
    var text = 'More answered questions';
    expect(render(<MyOutfitCards />).text()).toEqual(text);
  });

  it('should trigger the passed function on click', function() {
    const click = jest.fn();
    const wrapper = mount(<MyOutfitCards click={click}/>);
    wrapper.find('.product-card').simulate('click');
    expect (click).toHaveBeenCalled();
  });

});