import { GameContext } from './gameMachine';

const won = ({x, y, cells}: GameContext) => (cells[y][x]?.type === 'finish');
const loose = ({ movesLeft }: GameContext) => movesLeft === 0;

const isWalkable = ({ cells }: GameContext) => (x: number, y: number) => (cells[y][x]?.type !== 'wall');

const canMoveUp = (context: GameContext) => context.y > 0 && isWalkable(context)(context.x, context.y - 1);
const canMoveDown = (context: GameContext) => context.y < context.maxY - 1 && isWalkable(context)(context.x, context.y + 1);
const canMoveLeft = (context: GameContext) => context.x > 0 && isWalkable(context)(context.x - 1, context.y);
const canMoveRight = (context: GameContext) => context.x < context.maxX - 1 && isWalkable(context)(context.x + 1, context.y);

export const guards = {
  won,
  loose,
  canMoveUp,
  canMoveDown,
  canMoveLeft,
  canMoveRight
}