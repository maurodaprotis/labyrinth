import React from 'react';
import { render } from '@testing-library/react';
import { Board } from './Board';
import { Matrix } from '../engine/gameMachine';

const cells: Matrix = {
  '0': {
    '0': { type: 'floor' },
    '1': { type: 'wall' },
    '2': { type: 'start' },
  },
  '1': {
    '0': { type: 'floor' },
    '1': { type: 'wall' },
    '2': { type: 'finish' },
  },
};

describe('Board', () => {
  test('renders Board element', () => {
    const { getByTestId, container } = render(<Board cells={cells} />);
    const BoardElement = getByTestId('board');

    expect(BoardElement).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('board');
  });
  test('should render player', () => {
    const { getByTestId } = render(<Board cells={cells} />);
    const PlayerElement = getByTestId('player');

    expect(PlayerElement).toBeInTheDocument();
  });
  test('should render all cells', () => {
    const { getAllByTestId } = render(<Board cells={cells} />);
    const allCells = getAllByTestId('cell');

    expect(allCells).toHaveLength(6);
  });
});
