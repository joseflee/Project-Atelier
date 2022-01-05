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
    expect(screen.getByText('RATINGS & REVIEWS')).toBeVisible();
  });

  test ('Should display the reviews Average Rate', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      expect(await screen.getByText('3.5')).toBeVisible();
    });
  });

  test ('Ratings and reviews section should display the reviews percentage of recommended', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      expect(await screen.getByTestId('review-recommended').innerHTML).toBe(
        '50% of reviews recommend this product'
      );
    });
  });

  test ('Ratings and reviews section should display the average star rating, and the width of the star should have the same value with average rate', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      const average = await screen.getByText('3.5');
      const percentage = ((average.innerHTML / 5) * 100) + '%';
      expect(await screen.getByTestId('review-leftCornerStar').style.width).toBe(
        percentage
      );
    });
  });

  test ('Ratings and reviews section should have five filters with label from 1stars - 5stars respectively', async () => {
    await render(<ReviewList productId={59553}/>);
    expect(screen.getByText('5 stars')).toBeVisible();
    expect(screen.getByText('4 stars')).toBeVisible();
    expect(screen.getByText('3 stars')).toBeVisible();
    expect(screen.getByText('2 stars')).toBeVisible();
    expect(screen.getByText('1 stars')).toBeVisible();
  });

  test ('Ratings and reviews section  should have five filters and each should display the percentage of each rating by element width ', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      const fiveStars = await screen.getByTestId('review-leftCorner-5stars');
      const fourStars = await screen.getByTestId('review-leftCorner-4stars');
      const threeStars = await screen.getByTestId('review-leftCorner-3stars');
      const twoStars = await screen.getByTestId('review-leftCorner-2stars');
      const oneStars = await screen.getByTestId('review-leftCorner-1stars');
      expect(fiveStars.style.width).toBe(
        '46%'
      );
      expect(fourStars.style.width).toBe(
        '15%'
      );
      expect(threeStars.style.width).toBe(
        '21%'
      );
      expect(twoStars.style.width).toBe(
        '4%'
      );
      expect(oneStars.style.width).toBe(
        '14%'
      );
    });
  });

  test ('Ratings and reviews section should display different characteristics if data are provided ', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      const Fit = await screen.getByText('Fit');
      const Length = await screen.getByText('Length');
      const Comfort = await screen.getByText('Comfort');
      const Quality = await screen.getByText('Quality');
      expect(Fit).toBeVisible();
      expect(Length).toBeVisible();
      expect(Comfort).toBeVisible();
      expect(Quality).toBeVisible();
    });
  });

  test ('Ratings and reviews section should display the 5 point scale for different characteristics if data are provided ', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      const tooTight = await screen.findAllByText('Too tight');
      const Perfect = await screen.findAllByText('Perfect');
      const tooLong = await screen.findAllByText('Too long');
      const Poor = await screen.findAllByText('Poor');
      const OK = await screen.findAllByText('Ok');
      const Expcted = await screen.findAllByText('Expected');
      expect(tooTight.length).toBe(1);
      expect(Perfect.length).toBe(4);
      expect(tooLong.length).toBe(2);
      expect(Poor.length).toBe(2);
      expect(OK.length).toBe(1);
      expect(Expcted.length).toBe(1);
    });
  });

  test ('A single icon will appear representing the average on each characteristics 5 point scale', async () => {
    await render(<ReviewList productId={59553}/>);
    await waitFor( async () => {
      const triangle = await screen.findAllByTestId('review-leftCorner-triangle');
      expect(triangle.length).toBe(4);
    });
  });
});



