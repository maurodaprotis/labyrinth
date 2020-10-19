import { createMachine, assign } from 'xstate';

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

const decreaseMoves = assign<GameContext>({
  movesLeft: ({ movesLeft }) => movesLeft - 1
});
const assignUp = assign<GameContext>({
  y: ({y}) => y - 1,
});
const assignDown = assign<GameContext>({
  y: ({y}) => y + 1
});
const assignLeft = assign<GameContext>({
  x: ({x}) => x - 1
});
const assignRight = assign<GameContext>({
  x: ({x}) => x + 1
});

const won = ({x, y, cells}: GameContext) => (cells[y][x]?.type === 'finish');
const loose = ({ movesLeft }: GameContext) => movesLeft === 0;

const isWalkable = ({ cells }: GameContext) => (x: number, y: number) => (cells[y][x]?.type !== 'wall');

const canMoveUp = (context: GameContext) => context.y > 0 && isWalkable(context)(context.x, context.y - 1);
const canMoveDown = (context: GameContext) => context.y < context.maxY - 1 && isWalkable(context)(context.x, context.y + 1);
const canMoveLeft = (context: GameContext) => context.x > 0 && isWalkable(context)(context.x - 1, context.y);
const canMoveRight = (context: GameContext) => context.x < context.maxX - 1 && isWalkable(context)(context.x + 1, context.y);

export interface initialContext {
  x: number;
  y: number;
  moves: number;
  maxX: number;
  maxY: number;
  cells: Matrix;
}

export const createGameMachine = (initial: initialContext) => {
  const reset = assign({
    x: () => initial.x,
    y: () => initial.y,
    movesLeft: () => initial.moves,
  });

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
          MOVE_UP: { cond: canMoveUp, actions: assignUp, target: "moving" },
          MOVE_DOWN: { cond: canMoveDown, actions: assignDown, target: "moving" },
          MOVE_LEFT: { cond: canMoveLeft, actions: assignLeft, target: "moving" },
          MOVE_RIGHT: { cond: canMoveRight, actions: assignRight, target: "moving" },
          RESET: { actions: reset, target: "playing" },
        }
      },
      moving: {
        entry: decreaseMoves,
        always: [
          { target: 'win', cond: won },
          { target: 'loss', cond: loose },
          { target: 'playing' }
        ]
      },
      win: {
        on: {
          RESET: {
            actions: reset,
            target: "playing",
          }
        }
      },
      loss: {
        on: {
          RESET: {
            actions: reset,
            target: "playing",
          }
        }
      }
    }
  })
};
