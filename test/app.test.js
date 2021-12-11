import React from 'react';
import renderer from 'react-test-renderer';
import App from '../client/src/app';

test('App should display', () => {
  const component = renderer.create(
    <App>
    </App>,
  );

  let app = component.toJSON();
  expect(app).toMatchSnapshot();
});