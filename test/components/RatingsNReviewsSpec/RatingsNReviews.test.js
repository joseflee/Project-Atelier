import React from 'react';
import { act, render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/handlers.js';

import ReviewList from '../../../client/src/components/RatingsNReviews/ReviewList.jsx';
// import SearchBar from '../../../client/src/components/RatingsNReviews/SearchBar.jsx';
// import RatingBreakDown from '../../../client/src/components/RatingsNReviews/RatingBreakDown.jsx';
// import ProductBreakDown from '../../../client/src/components/RatingsNReviews/ProductBreakDown.jsx';
import NewReview from '../../../client/src/components/RatingsNReviews/NewReview.jsx';
// import HelpfulButton from '../../../client/src/components/RatingsNReviews/HelpfulButton.jsx';
// import RatingsNReviews from '../../../client/src/components/RatingsNReviews/RatingsNReviews.jsx';

const server = setupServer(...handlers);

beforeAll(() => server.listen(
));

afterEach(() => server.resetHandlers());
afterAll(() => server.close());


xdescribe('Rating breakdown and product breakdown rendering Test', () => {

  test('Should display the ratings and reviews header', async () => {
    await render(<ReviewList productId={59553} />);
    expect(screen.getByText('RATINGS & REVIEWS')).toBeVisible();
  });

  test('Should display the reviews Average Rate', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      expect(await screen.getByText('3.5')).toBeVisible();
    });
  });

  test('Ratings and reviews section should display the reviews percentage of recommended', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      expect(await screen.getByTestId('review-recommended').innerHTML).toBe(
        '50% of reviews recommend this product'
      );
    });
  });

  test('Ratings and reviews section should display the average star rating, and the width of the star should have the same value with average rate', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const average = await screen.getByText('3.5');
      const percentage = ((average.innerHTML / 5) * 100) + '%';
      expect(await screen.getByTestId('review-leftCornerStar').style.width).toBe(
        percentage
      );
    });
  });

  test('Ratings and reviews section should have five filters with label from 1stars - 5stars respectively', async () => {
    await render(<ReviewList productId={59553} />);
    expect(screen.getByText('5 stars')).toBeVisible();
    expect(screen.getByText('4 stars')).toBeVisible();
    expect(screen.getByText('3 stars')).toBeVisible();
    expect(screen.getByText('2 stars')).toBeVisible();
    expect(screen.getByText('1 stars')).toBeVisible();
  });

  test('Ratings and reviews section  should have five filters and each should display the percentage of each rating by element width ', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
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

  test('Ratings and reviews section should display different characteristics if data are provided ', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
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

  test('Ratings and reviews section should display the 5 point scale for different characteristics if data are provided ', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
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

  test('A single icon will appear representing the average on each characteristics 5 point scale', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const triangle = await screen.findAllByTestId('review-leftCorner-triangle');
      expect(triangle.length).toBe(4);
    });
  });

});

xdescribe('Review list rendering Test', () => {
  test('Should display a loading status before the data were being fetched from the Api', () => {
    render(<ReviewList productId={59553} />);
    const loading = screen.getByText('loading....');
    expect(loading).toBeTruthy();
    expect(loading).toBeVisible();
  });
  test(' Reviewlist should have a search bar, and the value attribute of the search bar should match with the input value', async () => {
    await render(<ReviewList productId={59553} />);
    const inputElement = await screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(inputElement, { target: { value: 123 } });
    await waitFor(async () => {
      expect(inputElement).toBeVisible();
      expect(inputElement.value).toBe('123');
    });
  });

  test(' Reviewlist should have a search bar, and the value attribute of the search bar should match with the input value', async () => {
    await render(<ReviewList productId={59553} />);
    const inputElement = await screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(inputElement, { target: { value: 123 } });
    await waitFor(async () => {
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toBeVisible();
      expect(inputElement.value).toBe('123');
    });
  });

  test('Reviewlist should have a search bar, and the value attribute of the search bar should match with the input value', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const totalReviews = await screen.getByTestId('totalReviews');
      expect(totalReviews.innerHTML).toBe(
        '7 reviews, sorted by '
      );
      expect(totalReviews).toBeVisible();
    });
  });

  test('Reviewlist should have a dropdown menu, and the dropdown list should have three sort options', async () => {
    await render(<ReviewList productId={59553} />);
    const dropDownList = await screen.getByTestId('review-sort-select');
    expect(dropDownList).toBeInTheDocument();
    expect(dropDownList).toBeVisible();
    expect(dropDownList.length).toBe(3);
  });

  test('Review List should only display two reivews when the page is loaded', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const reviewCell = await screen.findAllByTestId('review-Cell');
      expect(reviewCell.length).toBe(2);
    });
  });

  test('Each review element should display star rating', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const starRating = await screen.findAllByTestId('review-stars-inner');
      expect(starRating[0]).toBeInTheDocument();
      expect(starRating[0]).toBeVisible();
      expect(starRating[0].style.width).toBe('74%');
    });
  });
  test('Each review element should display name and date', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const nameAndDate = await screen.findAllByTestId('review-nameNDate');
      expect(nameAndDate[0]).toBeInTheDocument();
      expect(nameAndDate[0]).toBeVisible();
      expect(nameAndDate[0].innerHTML).toBe('shortandsweeet, April 13, 2019');
    });
  });
  test('When the page is loaded the default reviews should be sorted by relevant order', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const nameAndDate = await screen.findAllByTestId('review-nameNDate');
      expect(nameAndDate[0]).toBeInTheDocument();
      expect(nameAndDate[0]).toBeVisible();
      expect(nameAndDate[1]).toBeInTheDocument();
      expect(nameAndDate[1]).toBeVisible();
      expect(nameAndDate[0].innerHTML).toBe('shortandsweeet, April 13, 2019');
      expect(nameAndDate[1].innerHTML).toBe('bigbrotherbenjamin, June 22, 2019');
    });
  });
  test('Each review element should display review summary', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const reviewSummary = await screen.findAllByTestId('review-summary');
      expect(reviewSummary[0]).toBeInTheDocument();
      expect(reviewSummary[0]).toBeVisible();
      expect(reviewSummary[0].innerHTML).toBe('startasdassdasdasdsasdaasasdasstartasdassdasdasdsasdaasasdaF');
      expect(reviewSummary[1]).toBeInTheDocument();
      expect(reviewSummary[1]).toBeVisible();
      expect(reviewSummary[1].innerHTML).toBe('I am liking these glasses');
    });
  });
  test('If the summary exceed the cap 60 words, the rest of it will appear on next line ', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const reviewSummary = await screen.findAllByTestId('review-summary');
      const extendedSummary = await screen.findAllByTestId('review-Extended-Summary');
      expect(reviewSummary[0].innerHTML.length).toBe(60);
      expect(extendedSummary[0]).toBeInTheDocument();
      expect(extendedSummary[0]).toBeVisible();
      expect(extendedSummary[0].innerHTML.length).not.toBe(0);
    });
  });
  test('Each review element should display review body', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const reviewBody = await screen.findAllByTestId('review-body');
      expect(reviewBody[1]).toBeInTheDocument();
      expect(reviewBody[1]).toBeVisible();
    });
  });
  test('Review element should display imgage section if data are provided', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const imageSection = await screen.findAllByTestId('review-ImageSection');
      expect(imageSection.length).not.toBe(0);
      expect(imageSection[0]).toBeInTheDocument();
      expect(imageSection[0]).toBeVisible();
    });
  });
  test('Review element should display I recommend this product if the reviewer recommend this product', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const reviewRecommend = await screen.findAllByTestId('review-recommend');
      expect(reviewRecommend[0]).toBeInTheDocument();
      expect(reviewRecommend[0]).toBeVisible();
      expect(reviewRecommend[0].innerHTML).toBe('<span>✔ &nbsp;</span><span>I recommend this product</span>');
    });
  });
  test('Each review element should display the helpful section which allow the user to vote', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const reviewHelpful = await screen.findAllByTestId('review-helpful');
      expect(reviewHelpful[0]).toBeInTheDocument();
      expect(reviewHelpful[0]).toBeVisible();
      expect(reviewHelpful[0].innerHTML).toBe('<div><span>HelpFul ?</span><span id=\"1\" class=\"review-helpful-1 1\">Yes </span><span id=\"1\">(99)</span><span>|</span><span>Report</span></div>');
    });
  });
  test('should display the more views button and write new review button when the page is loaded ', async () => {
    await render(<ReviewList productId={59553} />);
    await waitFor(async () => {
      const moreButton = await screen.findByTestId('review-moreButton');
      const newReviewButton = await screen.findByTestId('review-newReviewButton');
      expect(moreButton).toBeInTheDocument();
      expect(moreButton).toBeVisible();
      expect(moreButton.innerHTML).toBe('More reviews');
      expect(newReviewButton).toBeInTheDocument();
      expect(newReviewButton).toBeVisible();
      expect(newReviewButton.innerHTML).toBe('Write New Review');
    });
  });

});

xdescribe('New review form rendering Test', () => {
  test('New review form should display the tilte', async () => {
    await waitFor(async () => {
      render(<NewReview productId={59553} currentProduct={'Camo Onesie'} />);
      const title = await screen.findByText('Write Your Review');
      expect(title).toBeInTheDocument();
      expect(title).toBeVisible();
    });
  });
  test('New review form should display the current product', async () => {
    await waitFor(async () => {
      await render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
      const currentProduct = await screen.findByTestId('newReview-currentProduct');
      expect(currentProduct).toBeInTheDocument();
      expect(currentProduct).toBeVisible();
      expect(currentProduct.innerHTML).toBe('Camo Onesie');
    });
  });
  test('New review form should display the overall rating', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const overAll = screen.getByText('Overall rating *');
    expect(overAll).toBeInTheDocument();
    expect(overAll).toBeVisible();
  });
  test('New review form should display the rating star', async () => {
    await waitFor(async () => {
      await render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
      const ratingSection = await screen.findAllByTestId('newReview-rating');
      expect(ratingSection[0]).toBeInTheDocument();
      expect(ratingSection[0]).toBeVisible();
    });
  });
  test('New review form should display the recommend option', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const recommend = screen.getByText('Do you recommend this product ? *');
    expect(recommend).toBeInTheDocument();
    expect(recommend).toBeVisible();
  });
  test('New review form should display all the characteristics', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const characteristics = screen.getByText('Characteristics *');
    const fit = screen.getByText('Fit');
    const size = screen.getByText('Size');
    const length = screen.getByText('Length');
    const comfort = screen.getByText('Comfort');
    const width = screen.getByText('Width');
    const quality = screen.getByText('Quality');
    expect(characteristics).toBeInTheDocument();
    expect(characteristics).toBeVisible();
    expect(fit).toBeInTheDocument();
    expect(size).toBeInTheDocument();
    expect(width).toBeInTheDocument();
    expect(length).toBeInTheDocument();
    expect(quality).toBeInTheDocument();
    expect(comfort).toBeInTheDocument();
  });
  test('New review form should display all characteristics meaning', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const fit = screen.getByText('1=Runs tight, 5=Runs long');
    const length = screen.getByText('1=Runs Short, 5=Runs long');
    const quality = screen.getByText('1=Poor, 5=Perfect');
    const comfort = screen.getByText('1=Uncomfortable, 5=Perfect');
    const width = screen.getByText('1=Too narrow, 5=Too width');
    const size = screen.getByText('1=A size too small, 5=A size too wide');
    expect(fit).toBeInTheDocument();
    expect(size).toBeInTheDocument();
    expect(width).toBeInTheDocument();
    expect(length).toBeInTheDocument();
    expect(quality).toBeInTheDocument();
    expect(comfort).toBeInTheDocument();
  });
  test('New review form should include the summary section', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const summary = screen.getByTestId('newReview-Summary');
    expect(summary).toBeInTheDocument();
  });
  test('New review form should include the body section', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const body = screen.getByTestId('newReview-Body');
    expect(body).toBeInTheDocument();
  });
  test('New review form should include the image upload section', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const upload = screen.getByTestId('newReview-fileUpLoad');
    expect(upload).toBeInTheDocument();
  });
  test('New review form should include the nick name section', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const nickName = screen.getByTestId('newReview-nickName');
    expect(nickName).toBeInTheDocument();
  });
  test('New review form should include the email section', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const email = screen.getByTestId('newReview-Email');
    expect(email).toBeInTheDocument();
  });
  test('New review form should include cancel and submit button', async () => {
    render(<NewReview productId={59553} currentProduct={{ name: 'Camo Onesie' }} />);
    const cancel = screen.getByText('Cancel');
    const submit = screen.getByText('Submit');
    expect(cancel).toBeInTheDocument();
  });
});

describe('New review form functional test', () => {
  test('When the rating star is being hovered should display the hover effect', async () => {
    await waitFor(async () => {
      render(<NewReview productId={59553} currentProduct={'Camo Onesie'} />);
      const star = await screen.findAllByTestId('newReview-rating-star');
      expect(star[3]).toHaveClass('newReview-Star');
      await userEvent.hover(star[3]);
      expect(star[3]).toHaveClass('newReview-Star-After');
      await userEvent.unhover(star[3]);
      expect(star[3]).not.toHaveClass('newReview-Star-After');
    });
  });
  test('When the rating star is being clicked should display the click effect', async () => {
    await waitFor(async () => {
      render(<NewReview productId={59553} currentProduct={'Camo Onesie'} />);
      const star = await screen.findAllByTestId('newReview-rating-star');
      const text = await screen.findAllByTestId('newReview-rating-star-text');
      expect(star[4]).toHaveClass('newReview-Star');
      await userEvent.click(star[4]);
      expect(star[0]).toHaveClass('newReview-Star-After');
      expect(star[1]).toHaveClass('newReview-Star-After');
      expect(star[2]).toHaveClass('newReview-Star-After');
      expect(star[3]).toHaveClass('newReview-Star-After');
      expect(star[4]).toHaveClass('newReview-Star-After');
      expect(text[0].innerHTML).toBe('&nbsp; Great');
      await userEvent.click(star[3]);
      expect(star[4]).not.toHaveClass('newReview-Star-After');
      expect(text[0].innerHTML).toBe('&nbsp; Good');
    });
  });
  test('User should able to select options of recommend section', async () => {
    await waitFor(async () => {
      render(<NewReview productId={59553} currentProduct={'Camo Onesie'} />);
      const recommendedY = screen.getByTestId('newReview-recommendedY');
      const recommendedN = screen.getByTestId('newReview-recommendedN');
      expect(recommendedY.checked).toEqual(false);
      expect(recommendedN.checked).toEqual(false);
      userEvent.click(recommendedY);
      expect(recommendedY.checked).toEqual(true);
      userEvent.click(recommendedN);
      expect(recommendedY.checked).toEqual(false);
      expect(recommendedN.checked).toEqual(true);
    });
  });
  test('User should able to select options of fit section', async () => {
    await waitFor(async () => {
      render(<NewReview productId={59553} currentProduct={'Camo Onesie'} />);
      const one = screen.getByTestId('newReview-fit-1');
      const four = screen.getByTestId('newReview-fit-4');
      expect(one.checked).toEqual(false);
      await userEvent.click(one);
      expect(one.checked).toEqual(true);
      await userEvent.click(four);
      expect(one.checked).toEqual(false);
      expect(four.checked).toEqual(true);
    });
  });
});