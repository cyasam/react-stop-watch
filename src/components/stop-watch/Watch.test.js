import { fireEvent, render, screen } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';

import Watch from './Watch';
import Display from './Display';
import Buttons from './Buttons';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('click start button', () => {
  render(
    <Watch>
      <Display />
      <Buttons />
    </Watch>
  );

  const startButton = screen.getByText(/start/i);
  fireEvent.click(startButton);

  act(() => jest.advanceTimersByTime(1000));

  const secondsElement = screen.getByText(
    (_, element) => element.className === 'seconds'
  );

  expect(secondsElement).toHaveTextContent('01');
});

test('click reset button', () => {
  render(
    <Watch>
      <Display />
      <Buttons />
    </Watch>
  );

  const startButton = screen.getByText(/start/i);
  fireEvent.click(startButton);

  act(() => jest.advanceTimersByTime(1000));

  const resetButton = screen.getByText(/reset/i);
  fireEvent.click(resetButton);

  const secondsElement = screen.getByText(
    (_, element) => element.className === 'seconds'
  );

  expect(secondsElement).toHaveTextContent('00');
});

test('click start button, then stop and start again', () => {
  render(
    <Watch>
      <Display />
      <Buttons />
    </Watch>
  );

  const startButton = screen.getByText(/start/i);
  fireEvent.click(startButton);

  act(() => jest.advanceTimersByTime(3200));

  const stopButton = screen.getByText(/stop/i);
  fireEvent.click(stopButton);

  act(() => jest.advanceTimersByTime(2000));

  fireEvent.click(startButton);

  const secondsElement = screen.getByText(
    (_, element) => element.className === 'seconds'
  );

  expect(secondsElement).toHaveTextContent('03');
});
