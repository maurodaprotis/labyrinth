import { assign } from 'xstate';
import { GameContext, initialContext } from './gameMachine';

export const decreaseMoves = assign<GameContext>({
  movesLeft: ({ movesLeft }) => movesLeft - 1
});
export const assignUp = assign<GameContext>({
  y: ({y}) => y - 1,
});
export const assignDown = assign<GameContext>({
  y: ({y}) => y + 1
});
export const assignLeft = assign<GameContext>({
  x: ({x}) => x - 1
});
export const assignRight = assign<GameContext>({
  x: ({x}) => x + 1
});
export const makeResetAction = (initial: initialContext) => assign({
  x: () => initial.x,
  y: () => initial.y,
  movesLeft: () => initial.moves,
});

export const actions = {
  decreaseMoves,
  assignUp,
  assignDown,
  assignLeft,
  assignRight
};
