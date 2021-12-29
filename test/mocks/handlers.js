import { rest } from 'msw';
import {dummyReviews} from '../../example/reviews.js';
// Create your own js file with these handlers or mock server responses containing example data within this mocks folder if needed

// Looks very similar to regular server expressions, but 'ctx' is used to handle response handlers instead of res.
export const handlers = [
  rest.get('/product', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      })
    );
  }),

  rest.get('/ratings/getReviews', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(dummyReviews.results)
    );
  }),
  rest.get('/ratings/ratingOverview', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(dummyReviews.meta)
    );
  }),

  rest.get('/qna', (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),

  rest.get('/cart', (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
];