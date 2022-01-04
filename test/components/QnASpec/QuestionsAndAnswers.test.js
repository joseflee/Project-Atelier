import React from 'react';
import {act, render, waitFor, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from '../../mocks/qnaHandlers.js';

//example data
import exampleQuestions from '../../../example/questions.js';
//components
import QnA from '../../../client/src/components/QnAcomponents/mainQnA.jsx';
import QuestionsList from '../../../client/src/components/QnAcomponents/QuestionsList.jsx';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Rating and reviews rendering Testing', () => {

  test ('Should render main Questions and Answers component', async () => {
    await render(<QnA productId={59553} />);

    expect (screen.getByText('Questions and Answers')).toBeInTheDocument();
    expect (screen.getByText('Add a new question')).toBeInTheDocument();
  });


  test('Should render Question List', async () => {
    await render(<QuestionsList  data = {exampleQuestions.questions.results}
       />);
  });

});