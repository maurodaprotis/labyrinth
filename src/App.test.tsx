import React from 'react';
import { render, fireEvent, screen, wait } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders App component', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Labyrinth Challenge/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('should listen to key input', async () => {
    const { getByText, getByTestId } = render(<App />);
    const app = getByTestId('app');

    fireEvent.keyDown(app, { keyCode: 39, which: 39 });

    expect(getByText('19 moves left')).toBeInTheDocument();
  });
  test('should listen for clicks', async () => {
    const { getByTestId, getByText } = render(<App />);
    const app = getByTestId('app');
    const resetButton = getByText('Reset');

    fireEvent.keyDown(app, { keyCode: 39, which: 39 });
    fireEvent.click(resetButton);

    expect(getByText('20 moves left')).toBeInTheDocument();
  });
});
