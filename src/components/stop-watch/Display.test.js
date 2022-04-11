import { render, screen } from '@testing-library/react';

import { StopWatchContext } from './Watch';
import Display from './Display';

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <StopWatchContext.Provider {...providerProps}>
      {ui}
    </StopWatchContext.Provider>,
    renderOptions
  );
};

test('should make error when Display Component is not in Watch Component', () => {
  const err = console.error;
  console.error = jest.fn();

  let error;
  try {
    render(<Display />);
  } catch (err) {
    error = err;
  }

  expect(error.message).toEqual(
    'Display component cannot be used outside the Menu component.'
  );

  console.error = err;
});

test('should show 11:08:04.22 when timer start after ((11 * 60 * 60) + (8 * 60) + 4) * 1000 + 220 ms', async () => {
  const providerProps = {
    value: { duration: (11 * 60 * 60 + 8 * 60 + 4) * 1000 + 220 },
  };

  customRender(<Display />, { providerProps });

  const hours = screen.getByRole(
    (content, element) => element.className === 'hours'
  );
  const minutes = screen.getByRole(
    (content, element) => element.className === 'minutes'
  );

  const seconds = screen.getByRole(
    (content, element) => element.className === 'seconds'
  );
  const miliseconds = screen.getByRole(
    (content, element) => element.className === 'miliseconds'
  );

  expect(hours).toHaveTextContent('11');
  expect(minutes).toHaveTextContent('08');
  expect(seconds).toHaveTextContent('04');
  expect(miliseconds).toHaveTextContent('22');
});

test('should show 02:18:14.22 when timer start after ((02 * 60 * 60) + (18 * 60) + 14) * 1000 + 220 ms', async () => {
  const providerProps = {
    value: { duration: (2 * 60 * 60 + 18 * 60 + 14) * 1000 + 220 },
  };

  customRender(<Display />, { providerProps });

  const hours = screen.getByRole(
    (content, element) => element.className === 'hours'
  );
  const minutes = screen.getByRole(
    (content, element) => element.className === 'minutes'
  );

  const seconds = screen.getByRole(
    (content, element) => element.className === 'seconds'
  );
  const miliseconds = screen.getByRole(
    (content, element) => element.className === 'miliseconds'
  );

  expect(hours).toHaveTextContent('02');
  expect(minutes).toHaveTextContent('18');
  expect(seconds).toHaveTextContent('14');
  expect(miliseconds).toHaveTextContent('22');
});
