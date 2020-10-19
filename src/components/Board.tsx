import React from 'react';
import { Matrix, Cell as CellType } from '../engine/gameMachine';
import { Cell } from './Cell';
import Player from './Player';

interface BoardProps {
  cells: Matrix;
}

const flattenMatrix = (cells: Matrix) => {
  const cellArray: CellType[] = [];

  for (const col of Object.values(cells)) {
    for (const cell of Object.values(col)) {
      cellArray.push(cell);
    }
  }

  return cellArray.flat();
};

export const Board = ({ cells }: BoardProps) => {
  const cellsArray = flattenMatrix(cells);

  return (
    <div className="board" data-testid="board">
      {cellsArray.map((cell, i) => (
        <Cell key={i} type={cell.type} />
      ))}
      <Player />
    </div>
  );
};
