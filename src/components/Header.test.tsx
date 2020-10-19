import React from 'react';
import { render } from '@testing-library/react';
import { Header } from './Header';

test('renders Header element', () => {
  const { getByText, container } = render(<Header text="Labyrinth" />);
  const HeaderElement = getByText(/Labyrinth/);

  expect(HeaderElement).toBeInTheDocument();
  expect(container.firstChild).toHaveClass('header');
});
