import React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProductOverview from '../../../client/src/components/ProdOverview/OverView.jsx';
import DefaultGallery from '../../../client/src/components/ProdOverview/ImageGallery/DefaultGallery.jsx';
import AddToCart from '../../../client/src/components/ProdOverview/AddToCart/AddToCart.jsx';
import SizeDropdown from '../../../client/src/components/ProdOverview/AddToCart/SizeDropDown.jsx';
import QuantityDropdown from '../../../client/src/components/ProdOverview/AddToCart/QuantityDropdown.jsx';
import StyleSelector from '../../../client/src/components/ProdOverview/StyleSelector/StyleSelect.jsx';
import StyleBubble from '../../../client/src/components/ProdOverview/StyleSelector/StyleSelectBubble.jsx';
import ProductInfo from '../../../client/src/components/ProdOverview/ProductInfo/ProductInfo.jsx';
import StarRating from '../../../client/src/components/ProdOverview/ProductInfo/StarRating.jsx';


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
});

describe('Image Gallery Component Testing', () => {
  test('Loads and displays Default Gallery Component', () => {
    render(<DefaultGallery photos={style.results[0].photos} />);
    expect(screen.getByTestId('ImageGallery')).toBeInTheDocument();
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