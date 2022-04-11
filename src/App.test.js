import { render, screen } from '@testing-library/react';
import App from './App';

test('renders all time elements', () => {
  render(<App />);
  const allTimeElements = screen.getAllByText('00');

  for (let element of allTimeElements) {
    expect(element).toBeInTheDocument();
  }
});

test('renders start, stop and reset button', () => {
  render(<App />);

  const startButton = screen.getByRole('button', {
    name: /start/i,
  });

  const stopButton = screen.getByRole('button', {
    name: /stop/i,
  });

  const resetButton = screen.getByRole('button', {
    name: /reset/i,
  });

  expect(startButton).toBeInTheDocument();
  expect(stopButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});
