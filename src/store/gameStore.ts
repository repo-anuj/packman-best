import { create } from 'zustand';
import { GameState, Position, Direction, Ghost, GhostType, EntityType } from '../types/game';
import { INITIAL_GRID } from '../constants/grid';
import { calculateGhostTarget, getGhostSpeed, getNextGhostMove } from '../utils/ghostAI';

const INITIAL_GHOSTS: Ghost[] = [
  { type: 'BLINKY', position: { x: 13, y: 11 }, direction: 'LEFT', isVulnerable: false, isReleased: false },
  { type: 'PINKY', position: { x: 14, y: 11 }, direction: 'RIGHT', isVulnerable: false, isReleased: false },
  { type: 'INKY', position: { x: 13, y: 12 }, direction: 'UP', isVulnerable: false, isReleased: false },
  { type: 'CLYDE', position: { x: 14, y: 12 }, direction: 'DOWN', isVulnerable: false, isReleased: false },
];

interface GameStore extends GameState {
  movePlayer: (direction: Direction) => void;
  moveGhosts: () => void;
  togglePause: () => void;
  resetGame: () => void;
  collectDot: (position: Position) => void;
  activatePowerPellet: () => void;
  releaseGhost: (type: GhostType) => void;
  checkLevelComplete: () => void;
}

const getNextPosition = (position: Position, direction: Direction): Position => {
  const newPosition = { ...position };
  switch (direction) {
    case 'UP':
      newPosition.y = (newPosition.y - 1 + 31) % 31;
      break;
    case 'DOWN':
      newPosition.y = (newPosition.y + 1) % 31;
      break;
    case 'LEFT':
      newPosition.x = (newPosition.x - 1 + 28) % 28;
      break;
    case 'RIGHT':
      newPosition.x = (newPosition.x + 1) % 28;
      break;
  }
  return newPosition;
};

const isValidMove = (position: Position, grid: EntityType[][]): boolean => {
  return position.y >= 0 && position.y < grid.length &&
         position.x >= 0 && position.x < grid[0].length &&
         grid[position.y][position.x] !== 'WALL';
};

export const useGameStore = create<GameStore>((set, get) => ({
  score: 0,
  lives: 3,
  level: 1,
  isPaused: false,
  isGameOver: false,
  pacmanPosition: { x: 14, y: 23 },
  pacmanDirection: 'LEFT',
  ghosts: INITIAL_GHOSTS,
  grid: INITIAL_GRID,
  powerPelletActive: false,
  gameStartTime: Date.now(),

  movePlayer: (direction) =>
    set((state) => {
      if (state.isPaused || state.isGameOver) return state;

      const newPosition = getNextPosition(state.pacmanPosition, direction);
      
      if (!isValidMove(newPosition, state.grid)) return state;

      const item = state.grid[newPosition.y][newPosition.x];
      let newState = {
        pacmanPosition: newPosition,
        pacmanDirection: direction,
      };

      if (item === 'DOT') {
        get().collectDot(newPosition);
      } else if (item === 'POWER_PELLET') {
        get().activatePowerPellet();
        get().collectDot(newPosition);
      }

      const collidedGhost = state.ghosts.find(
        (ghost) => ghost.isReleased && ghost.position.x === newPosition.x && ghost.position.y === newPosition.y
      );

      if (collidedGhost) {
        if (state.powerPelletActive) {
          newState = {
            ...newState,
            score: state.score + 200,
            ghosts: state.ghosts.map((ghost) =>
              ghost === collidedGhost
                ? { ...ghost, position: { x: 13, y: 11 }, isReleased: false }
                : ghost
            ),
          };
        } else {
          newState = {
            ...newState,
            lives: state.lives - 1,
            isGameOver: state.lives <= 1,
            pacmanPosition: { x: 14, y: 23 },
            ghosts: INITIAL_GHOSTS,
          };
        }
      }

      get().checkLevelComplete();
      return newState;
    }),

  moveGhosts: () =>
    set((state) => {
      if (state.isPaused || state.isGameOver) return state;

      const gameTime = Date.now() - state.gameStartTime;
      const blinkyPos = state.ghosts.find(g => g.type === 'BLINKY')?.position;

      const newGhosts = state.ghosts.map((ghost) => {
        if (!ghost.isReleased) return ghost;

        const target = calculateGhostTarget(
          ghost,
          state.pacmanPosition,
          state.pacmanDirection,
          state.level,
          gameTime,
          blinkyPos
        );

        const newDirection = getNextGhostMove(
          ghost,
          target,
          state.grid,
          ghost.direction
        );

        const newPosition = getNextPosition(ghost.position, newDirection);
        if (!isValidMove(newPosition, state.grid)) return ghost;

        return {
          ...ghost,
          position: newPosition,
          direction: newDirection,
        };
      });

      return { ghosts: newGhosts };
    }),

  checkLevelComplete: () =>
    set((state) => {
      const remainingDots = state.grid.flat().filter(cell => 
        cell === 'DOT' || cell === 'POWER_PELLET'
      ).length;

      if (remainingDots === 0) {
        return {
          level: state.level + 1,
          grid: INITIAL_GRID,
          pacmanPosition: { x: 14, y: 23 },
          pacmanDirection: 'LEFT',
          ghosts: INITIAL_GHOSTS,
          powerPelletActive: false,
          gameStartTime: Date.now(),
        };
      }
      return state;
    }),

  releaseGhost: (type: GhostType) =>
    set((state) => ({
      ghosts: state.ghosts.map((ghost) =>
        ghost.type === type ? { ...ghost, isReleased: true } : ghost
      ),
    })),

  togglePause: () =>
    set((state) => ({
      isPaused: !state.isPaused,
    })),

  resetGame: () =>
    set(() => ({
      score: 0,
      lives: 3,
      level: 1,
      isPaused: false,
      isGameOver: false,
      pacmanPosition: { x: 14, y: 23 },
      pacmanDirection: 'LEFT',
      ghosts: INITIAL_GHOSTS,
      grid: INITIAL_GRID,
      powerPelletActive: false,
      gameStartTime: Date.now(),
    })),

  collectDot: (position) =>
    set((state) => {
      const newGrid = [...state.grid];
      const item = newGrid[position.y][position.x];
      
      if (item === 'DOT' || item === 'POWER_PELLET') {
        newGrid[position.y][position.x] = 'EMPTY';
        return {
          grid: newGrid,
          score: state.score + (item === 'DOT' ? 10 : 50),
        };
      }
      return state;
    }),

  activatePowerPellet: () =>
    set((state) => {
      const duration = Math.max(8000 - (state.level * 200), 3000);
      setTimeout(() => {
        set((state) => ({
          powerPelletActive: false,
          ghosts: state.ghosts.map((ghost) => ({ ...ghost, isVulnerable: false })),
        }));
      }, duration);

      return {
        powerPelletActive: true,
        ghosts: state.ghosts.map((ghost) => ({ ...ghost, isVulnerable: true })),
      };
    }),
}));