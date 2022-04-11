import { render } from '@testing-library/react';

import Buttons from './Buttons';

test('should make error when Buttons Component is not in Watch Component', () => {
  const err = console.error;
  console.error = jest.fn();

  let error;
  try {
    render(<Buttons />);
  } catch (err) {
    error = err;
  }

  expect(error.message).toEqual(
    'Buttons component cannot be used outside the Menu component.'
  );

  console.error = err;
});
