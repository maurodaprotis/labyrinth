import React from 'react';

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface StatusProps {
  state: string;
  movesLeft: number;
  reset: () => void;
}

export const StatusBar = ({ state, movesLeft, reset }: StatusProps) => {
  return (
    <div className="status-bar" data-testid="status-bar">
      <span className={state}>{capitalize(state)}</span>
      <button type="button" onClick={reset}>
        Reset
      </button>
      <span>{movesLeft} moves left</span>
    </div>
  );
};
