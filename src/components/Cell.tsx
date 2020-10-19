import React from 'react';

interface CellProps {
  type: 'wall' | 'finish' | 'start' | 'floor';
}

export const Cell = ({ type }: CellProps) => {
  return <div className={`cell ${type}`} data-testid="cell" />;
};
