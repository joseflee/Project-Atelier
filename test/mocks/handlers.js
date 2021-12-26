import { rest } from 'msw';

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

  rest.get('/ratings', (req, res, ctx) => {
    return res(
      ctx.status(200)
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