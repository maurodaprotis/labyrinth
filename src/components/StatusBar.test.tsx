import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StatusBar } from './StatusBar';

describe('StatusBar', () => {
  test('renders StatusBar element', () => {
    const { getByTestId, container } = render(
      <StatusBar movesLeft={30} state="playing" reset={() => {}} />
    );
    const StatusBarElement = getByTestId('status-bar');

    expect(StatusBarElement).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('status-bar');
  });
  test('should capitalize state', () => {
    const state = 'playing';
    const { getByText } = render(
      <StatusBar movesLeft={30} state={state} reset={() => {}} />
    );
    const StateText = getByText(/Playing/);

    expect(StateText).toBeInTheDocument();
  });
  test('should show moves left', () => {
    const moves = 30;
    const { getByText } = render(
      <StatusBar movesLeft={moves} state="playing" reset={() => {}} />
    );
    const StatusBarMovesSpan = getByText(/30 moves left/);

    expect(StatusBarMovesSpan).toBeInTheDocument();
  });
  test('should call reset function on click', async () => {
    const resetFn = jest.fn();
    const { getByText } = render(
      <StatusBar movesLeft={39} state="playing" reset={resetFn} />
    );
    const ResetButton = getByText(/Reset/);

    fireEvent.click(ResetButton);

    expect(resetFn).toHaveBeenCalled();
  });
});
