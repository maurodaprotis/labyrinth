import { assignDown, assignLeft, assignRight, assignUp, decreaseMoves, makeResetAction } from './actions';
import { initialContext } from './gameMachine';

jest.mock('xstate', () => ({
  assign: (id) => (id), 
}));

describe('Actions', () => {
  describe('decrease moves', () => {
    test('should decrease remaining moves by one', () => {
      const ctx = { movesLeft: 3 }

      expect(decreaseMoves.movesLeft(ctx)).toBe(2);
    })
  });
  describe('assignUp', () => {
    test('should decrease Y position by one', () => {
      const ctx = { y: 3 };

      expect(assignUp.y(ctx)).toBe(2);
    })
  });  
  describe('assignDown', () => {
    test('should increase Y position by one', () => {
      const ctx = { y: 3 };

      expect(assignDown.y(ctx)).toBe(4);
    })
  });  
  describe('assignLeft', () => {
    test('should decrease X position by one', () => {
      const ctx = { x: 3 };

      expect(assignLeft.x(ctx)).toBe(2);
    })
  });
  describe('assignRight', () => {
    test('should increase Y position by one', () => {
      const ctx = { x: 3 };

      expect(assignRight.x(ctx)).toBe(4);
    })
  });
  describe('makeResetAction', () => {
    test('it should crease the reset action', () => {
      const initial = { x: 0, y: 0, moves: 2 };
      const reset = makeResetAction(initial as unknown as initialContext);
      const ctx = { x: 3, y: 3, moves: 0 };

      expect(reset.x(ctx)).toBe(0);
      expect(reset.y(ctx)).toBe(0);
      expect(reset.movesLeft(ctx)).toBe(2);
    })
  });
});