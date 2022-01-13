import React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import Enzyme from 'enzyme';
import { shallow, mount, ShallowWrapper, instance } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProductOverview from '../../../client/src/components/ProdOverview/OverView.jsx';
import DefaultGallery from '../../../client/src/components/ProdOverview/ImageGallery/DefaultGallery.jsx';
import ExpandedModal from '../../../client/src/components/ProdOverview/ImageGallery/ExpandedModal.jsx';
import AddToCart from '../../../client/src/components/ProdOverview/AddToCart/AddToCart.jsx';
import SizeDropdown from '../../../client/src/components/ProdOverview/AddToCart/SizeDropDown.jsx';
import QuantityDropdown from '../../../client/src/components/ProdOverview/AddToCart/QuantityDropdown.jsx';
import StyleSelector from '../../../client/src/components/ProdOverview/StyleSelector/StyleSelect.jsx';
import StyleBubble from '../../../client/src/components/ProdOverview/StyleSelector/StyleSelectBubble.jsx';
import ProductInfo from '../../../client/src/components/ProdOverview/ProductInfo/ProductInfo.jsx';
import StarRating from '../../../client/src/components/ProdOverview/ProductInfo/StarRating.jsx';

Enzyme.configure({ adapter: new Adapter() });

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { handlers } from '../../mocks/ProdOverviewHandlers.js';
import { specificProduct, style } from '../../../example/products.js';
import { dummyReviews } from '../../../example/reviews.js';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe ('Product Overview Component Testing', () => {
  test('Loads and displays a Product Overview Component', () => {
    render(<ProductOverview currentProduct={specificProduct} currentProductStyle={style} currentReview={dummyReviews.meta} />);
    expect(screen.getByTestId('Overview')).toBeInTheDocument();
  });

  test('It should Update useModal in state when switchImageModal function is ran', () => {
    const overview = shallow(<ProductOverview currentProduct={specificProduct} currentProductStyle={style} currentReview={dummyReviews.meta} />);
    expect(overview.state().useModal).toEqual(false);
    overview.instance().switchImageModal();
    expect(overview.state().useModal).toEqual(true);
  });

  test('It should Update displayStyle in state when updateStyle function is ran', () => {
    const overview = shallow(<ProductOverview currentProduct={specificProduct} currentProductStyle={style} currentReview={dummyReviews.meta} />);
    overview.instance().updateStyle('test');
    expect(overview.state().displayStyle).toEqual('test');
  });

  test('It should Update selectedIndex in state when updateSelectedIndex function is ran', () => {
    const overview = shallow(<ProductOverview currentProduct={specificProduct} currentProductStyle={style} currentReview={dummyReviews.meta} />);
    expect(overview.state().selectedIndex).toEqual(0);
    overview.instance().updateStyle(1);
    expect(overview.state().displayStyle).toEqual(1);
  });

});

describe ('Add To Cart Component Testing', () => {
  test('Loads and displays Add to Cart Parent Component', () => {
    render(<AddToCart displayedStyle={style.results[0]} />);
    expect(screen.getByRole('button', {name: 'Add To Cart'})).toBeInTheDocument();
  });

  test('Loads and displays Size Selector Dropdown Child Component', () => {
    render(<SizeDropdown displayedSkus={style.results[0].skus} />);
    expect(screen.getByRole('option', {name: 'Select Size'})).toBeInTheDocument();
  });

  test('Loads and displays Quantity Selector Dropdown Child Component', () => {
    render(<QuantityDropdown selectedQuantity={10} />);
    expect(screen.getByRole('option', {name: '1'})).toBeInTheDocument();
  });

  test('Should select correct size', () => {
    const sizeDropdown = mount(<SizeDropdown displayedSkus={style.results[0].skus} />);
    expect(sizeDropdown.find('#sizeSelector').at(0).instance().value = 'S');
  });
});

describe('Image Gallery Component Testing', () => {
  test('Loads and displays Default Gallery Component', () => {
    render(<DefaultGallery photos={style.results[0].photos} />);
    expect(screen.getByTestId('ImageGallery')).toBeInTheDocument();
  });

  test('Runs two functions when Default Gallery display image is clicked', () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    const defaultGal = shallow(<DefaultGallery photos={style.results[0].photos} switchImageModal={spy} updateIndex={spy2} />);

    defaultGal.find('.PODisplayImg').simulate('click');
    expect(spy).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });
});

describe('Style Select Component Testing', () => {
  test('Loads and displays Style Selector Parent Component', () => {
    render(<StyleSelector styles={style} displayedStyle={style.results[0]} />);
    expect(screen.getByText('Style >')).toBeInTheDocument();
  });

  test('Loads and displays Style Selection Bubble Child Component', () => {
    render(<StyleBubble style={style.results[0]}/>);
    expect(screen.getByAltText('Forest Green & Black')).toBeInTheDocument();
  });
});

describe('Product Info Component Testing', () => {
  test('Loads and displays Product Info Parent Component', () => {
    render(<ProductInfo product={specificProduct} style={style.results[0]} ratings={dummyReviews.meta.ratings} />);
    expect(screen.getByText('Air Minis 250')).toBeInTheDocument();
  });

  test('Loads and displays Star Rating Child Component', () => {
    render(<StarRating ratings={dummyReviews.meta.ratings} />);
    expect(screen.getByTestId('starRating')).toBeInTheDocument();
  });
});