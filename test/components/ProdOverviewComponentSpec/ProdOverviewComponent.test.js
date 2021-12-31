import React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProductOverview from '../../../client/src/components/ProdOverview/OverView.jsx';
import DefaultGallery from '../../../client/src/components/ProdOverview/ImageGallery/DefaultGallery.jsx';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { handlers } from '../../mocks/ProdOverviewHandlers.js';
import { style } from '../../../example/products.js';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe ('Product Overview Component Testing', () => {
  test('Loads and displays a Product Overview Component', async () => {
    await render(<ProductOverview productId={59553} />);
    await waitFor(async () => {
      expect(await screen.getByText('Product Overview')).toBeInTheDocument();
    });
  });

  test('Loads and displays Default Gallery Component', async () => {
    await render(<DefaultGallery photos={style.results[0].photos} />);
  });
});

// describe ('Product Overview Component Testing', () => {
//   test('Loads and displays a Product Overview Component', async () => {
//     await render(<ProductOverview productId={59553} />);
//     await waitFor(async () => {
//       expect(await screen.getByText('Product Overview')).toBeInTheDocument();
//     });
//   });
// });