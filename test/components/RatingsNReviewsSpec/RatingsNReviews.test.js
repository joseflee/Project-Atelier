import React from 'react';
import {act, render, waitFor, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers.js';

import ReviewList from '../../../client/src/components/RatingsNReviews/ReviewList.jsx';
// import SearchBar from '../../../client/src/components/RatingsNReviews/SearchBar.jsx';
// import RatingBreakDown from '../../../client/src/components/RatingsNReviews/RatingBreakDown.jsx';
// import ProductBreakDown from '../../../client/src/components/RatingsNReviews/ProductBreakDown.jsx';
// import NewReview from '../../../client/src/components/RatingsNReviews/NewReview.jsx';
// import HelpfulButton from '../../../client/src/components/RatingsNReviews/HelpfulButton.jsx';
// import RatingsNReviews from '../../../client/src/components/RatingsNReviews/RatingsNReviews.jsx';

const server = setupServer(...handlers);

beforeAll(() => server.listen(
));

afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('Rating and reviews rendering Testing', () => {

  test ('Should display a loading status before the data were being fetched from the Api', async () => {
    await render(<ReviewList productId={59553}/>);
    expect(screen.getByText('loading....')).toBeTruthy();
  });

  test ('Able to do a mock api call and receive dummy data', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      expect(await screen.getByTestId('totalReviews').innerHTML).toBe(
        '7 reviews, sorted by '
      );
    });
  });

  test ('Search bar value should match with the input value', async () => {
    await render(<ReviewList productId={59553}/>);
    const inputElement = await screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(inputElement, {target: {value: 123}});
    await waitFor ( async () => {
      expect(inputElement.value).toBe('123');
    });
  });

  test ('Should display the ratings and reviews header', async () => {
    await render(<ReviewList productId={59553}/>);
    expect(screen.getByText('RATINGS & REVIEWS')).toBeInTheDocument();
  });

  test ('Should display the reviews Average Rate', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      expect(await screen.getByText('3.5')).toBeInTheDocument();
    });
  });

  test ('Should display the reviews percentage of recommended', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      expect(await screen.getByTestId('review-recommended').innerHTML).toBe(
        '50% of reviews recommend this product'
      );
    });
  });

});



