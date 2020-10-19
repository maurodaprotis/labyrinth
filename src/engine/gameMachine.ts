import { createMachine } from 'xstate';
import { actions, makeResetAction } from './actions';
import { guards } from './guards';

type GameEvent = 
  | { type: "MOVE_UP" }
  | { type: "MOVE_DOWN" }
  | { type: "MOVE_LEFT" }
  | { type: "MOVE_RIGHT" }
  | { type: "RESET" };

export type Cell = {
  type: 'wall' | 'finish' | 'start' | 'floor';
}

export type Matrix = {
  [x: string]: {
    [y: string]: Cell
  }
}

export interface GameContext {
  movesLeft: number;
  x: number;
  y: number;
  maxX: number;
  maxY: number;
  cells: Matrix
}

interface GameSchema {
  value: string
  context: GameContext
  states: {
    playing: {},
    moving: {},
    win: {},
    loss: {}
  }
}

export interface initialContext {
  x: number;
  y: number;
  moves: number;
  maxX: number;
  maxY: number;
  cells: Matrix;
}

export const createGameMachine = (initial: initialContext) => {
  const reset = makeResetAction(initial);

  return createMachine<GameContext, GameEvent, GameSchema>({
    initial: "playing",
    context: {
      movesLeft: initial.moves,
      x: initial.x,
      y: initial.y,
      maxX: initial.maxX,
      maxY: initial.maxY,
      cells: initial.cells
    }, 
    states: {
      playing: {
        on: {
          MOVE_UP: { cond: "canMoveUp", actions: "assignUp", target: "moving" },
          MOVE_DOWN: { cond: "canMoveDown", actions: "assignDown", target: "moving" },
          MOVE_LEFT: { cond: "canMoveLeft", actions: "assignLeft", target: "moving" },
          MOVE_RIGHT: { cond: "canMoveRight", actions: "assignRight", target: "moving" },
          RESET: { actions: "reset", target: "playing" },
        }
      },
      moving: {
        entry: "decreaseMoves",
        always: [
          { target: 'win', cond: "won" },
          { target: 'loss', cond: "loose" },
          { target: 'playing' }
        ]
      },
      win: {
        on: {
          RESET: {
            actions: "reset",
            target: "playing",
          }
        }
      },
      loss: {
        on: {
          RESET: {
            actions: "reset",
            target: "playing",
          }
        }
      }
    }
  }, {
    actions: {
      reset,
      ...actions,
    },
    guards
  })
};
