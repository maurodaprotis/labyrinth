import { GameContext } from './gameMachine';
import { guards } from './guards';

describe('Guards', () => {
  describe('Won', () => {
    it('should return true when on finish cell', () => {
      const ctx = { x: 0, y: 0, cells: { 0: { 0: { type: "finish" } } } };

      const result = guards.won(ctx as unknown as GameContext);

      expect(result).toBe(true);
    });
    it('should return false when on other cell', () => {
      const ctx = { x: 0, y: 0, cells: { 0: { 0: { type: "floor" } } } };

      const result = guards.won(ctx as unknown as GameContext);

      expect(result).toBe(false);
    });
  });
  describe('loose', () => {
    it('should return true when out of moves', () => {
      const ctx = { movesLeft: 0 };

      const result = guards.loose(ctx as unknown as GameContext);

      expect(result).toBe(true);
    });
    it('should return false when remaining moves', () => {
      const ctx = { movesLeft: 3 };

      const result = guards.loose(ctx as unknown as GameContext);

      expect(result).toBe(false);
    });
  });
  describe('canMoveUp', () => {
    it('should return true when on boundary', () => {
      const ctx = { x: 0, y: 3, cells: { 2: { 0: { type: "floor" }}} };

      const result = guards.canMoveUp(ctx as unknown as GameContext);

      expect(result).toBe(true); 
    });
    it('should return false when not on boundary', () => {
      const ctx = { x: 0, y: 0, cells: { 2: { 0: { type: "floor" }}} };

      const result = guards.canMoveUp(ctx as unknown as GameContext);

      expect(result).toBe(false); 
    });
  });
  describe('canMoveDown', () => {
    it('should return true when on boundary', () => {
      const ctx = { x: 0, y: 0, maxY: 4, cells: { 1: { 0: { type: "floor" }}} };

      const result = guards.canMoveDown(ctx as unknown as GameContext);

      expect(result).toBe(true); 
    });
    it('should return false when not on boundary', () => {
      const ctx = { x: 0, y: 0, cells: { 2: { 0: { type: "floor" }}} };

      const result = guards.canMoveDown(ctx as unknown as GameContext);

      expect(result).toBe(false); 
    });
  });
  describe('canMoveLeft', () => {
    it('should return true when on boundary', () => {
      const ctx = { x: 1, y: 0, cells: { 0: { 0: { type: "floor" }}} };

      const result = guards.canMoveLeft(ctx as unknown as GameContext);

      expect(result).toBe(true); 
    });
    it('should return false when not on boundary', () => {
      const ctx = { x: 0, y: 0, cells: { 0: { 0: { type: "floor" }}} };

      const result = guards.canMoveLeft(ctx as unknown as GameContext);

      expect(result).toBe(false); 
    });
  });
  describe('canMoveRight', () => {
    it('should return true when on boundary', () => {
      const ctx = { x: 1, y: 0, maxX: 3, cells: { 0: { 2: { type: "floor" }}} };

      const result = guards.canMoveRight(ctx as unknown as GameContext);

      expect(result).toBe(true); 
    });
    it('should return false when not on boundary', () => {
      const ctx = { x: 0, y: 0, cells: { 0: { 0: { type: "floor" }}} };

      const result = guards.canMoveRight(ctx as unknown as GameContext);

      expect(result).toBe(false); 
    });
  });
});