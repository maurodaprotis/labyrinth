import React from 'react';
import { render } from '@testing-library/react';
import Player from './Player';

test('renders player element', () => {
  const { getByTestId, container } = render(<Player />);
  const playerElement = getByTestId('player');

  expect(playerElement).toBeInTheDocument();
  expect(container.firstChild).toHaveClass('player');
});
