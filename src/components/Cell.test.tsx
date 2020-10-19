import React from 'react';
import { render } from '@testing-library/react';
import { Cell } from './Cell';

test('renders Cell element', () => {
  const { getByTestId, container } = render(<Cell type="floor" />);
  const CellElement = getByTestId('cell');

  expect(CellElement).toBeInTheDocument();
  expect(container.firstChild).toHaveClass('cell', 'floor');
});
