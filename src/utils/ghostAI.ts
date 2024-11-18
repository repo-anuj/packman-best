import { Position, Ghost, GhostType, EntityType, Direction } from '../types/game';
import { findPath } from './pathfinding';

const SCATTER_CORNERS = {
  BLINKY: { x: 26, y: 0 },   // Top-right
  PINKY: { x: 1, y: 0 },     // Top-left
  INKY: { x: 26, y: 29 },    // Bottom-right
  CLYDE: { x: 1, y: 29 },    // Bottom-left
} as const;

interface GhostBehavior {
  getTarget: (ghost: Ghost, pacman: Position, pacmanDir: Direction, blinkyPos?: Position) => Position;
  getSpeed: (level: number) => number;
}

const GHOST_BEHAVIORS: Record<GhostType, GhostBehavior> = {
  BLINKY: {
    getTarget: (ghost, pacman, _, __) => pacman,
    getSpeed: (level) => Math.min(0.8 + level * 0.02, 1.2),
  },
  PINKY: {
    getTarget: (_, pacman, pacmanDir) => {
      const target = { ...pacman };
      const offset = 4;
      
      switch (pacmanDir) {
        case 'UP':
          target.y -= offset;
          target.x -= offset; // Original game bug
          break;
        case 'DOWN':
          target.y += offset;
          break;
        case 'LEFT':
          target.x -= offset;
          break;
        case 'RIGHT':
          target.x += offset;
          break;
      }
      return target;
    },
    getSpeed: (level) => Math.min(0.75 + level * 0.015, 1.1),
  },
  INKY: {
    getTarget: (_, pacman, pacmanDir, blinkyPos) => {
      if (!blinkyPos) return pacman;
      
      const intermediateTarget = { ...pacman };
      const offset = 2;
      
      switch (pacmanDir) {
        case 'UP':
          intermediateTarget.y -= offset;
          break;
        case 'DOWN':
          intermediateTarget.y += offset;
          break;
        case 'LEFT':
          intermediateTarget.x -= offset;
          break;
        case 'RIGHT':
          intermediateTarget.x += offset;
          break;
      }
      
      // Vector from Blinky to intermediate target
      return {
        x: intermediateTarget.x + (intermediateTarget.x - blinkyPos.x),
        y: intermediateTarget.y + (intermediateTarget.y - blinkyPos.y),
      };
    },
    getSpeed: (level) => Math.min(0.7 + level * 0.01, 1.0),
  },
  CLYDE: {
    getTarget: (ghost, pacman) => {
      const distance = Math.abs(ghost.position.x - pacman.x) + Math.abs(ghost.position.y - pacman.y);
      return distance > 8 ? pacman : SCATTER_CORNERS.CLYDE;
    },
    getSpeed: (level) => Math.min(0.65 + level * 0.005, 0.9),
  },
};

export function calculateGhostTarget(
  ghost: Ghost,
  pacmanPos: Position,
  pacmanDir: Direction,
  level: number,
  gameTime: number,
  blinkyPos?: Position
): Position {
  if (ghost.isVulnerable) {
    return getRandomTarget(ghost.position);
  }

  const isScatter = shouldScatter(gameTime, level);
  if (isScatter) {
    return SCATTER_CORNERS[ghost.type];
  }

  return GHOST_BEHAVIORS[ghost.type].getTarget(ghost, pacmanPos, pacmanDir, blinkyPos);
}

export function getGhostSpeed(ghost: Ghost, level: number): number {
  const baseSpeed = GHOST_BEHAVIORS[ghost.type].getSpeed(level);
  return ghost.isVulnerable ? baseSpeed * 0.5 : baseSpeed;
}

function shouldScatter(gameTime: number, level: number): boolean {
  const cycleTime = 20000; // 20-second cycle
  const currentTime = gameTime % cycleTime;
  const scatterDuration = Math.max(7000 - level * 200, 3000);
  return currentTime < scatterDuration;
}

function getRandomTarget(currentPos: Position): Position {
  const randomDirection = Math.floor(Math.random() * 4);
  const offset = 4;
  
  switch (randomDirection) {
    case 0: return { x: currentPos.x, y: currentPos.y - offset }; // Up
    case 1: return { x: currentPos.x, y: currentPos.y + offset }; // Down
    case 2: return { x: currentPos.x - offset, y: currentPos.y }; // Left
    default: return { x: currentPos.x + offset, y: currentPos.y }; // Right
  }
}

export function getNextGhostMove(
  ghost: Ghost,
  target: Position,
  grid: EntityType[][],
  currentDir: Direction
): Direction {
  const path = findPath(ghost.position, target, grid);
  if (path.length < 2) return currentDir;

  const nextPos = path[1];
  const dx = nextPos.x - ghost.position.x;
  const dy = nextPos.y - ghost.position.y;

  // Prevent reversing direction unless necessary
  const newDir: Direction = 
    dy < 0 ? 'UP' :
    dy > 0 ? 'DOWN' :
    dx < 0 ? 'LEFT' : 'RIGHT';

  const opposites = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
  };

  if (opposites[newDir] === currentDir) {
    // Try to find an alternative direction
    const validMoves = getValidMoves(ghost.position, grid);
    const filteredMoves = validMoves.filter(dir => dir !== opposites[currentDir]);
    return filteredMoves.length > 0 ? filteredMoves[0] : newDir;
  }

  return newDir;
}

function getValidMoves(pos: Position, grid: EntityType[][]): Direction[] {
  const moves: Direction[] = [];
  const directions: [Direction, Position][] = [
    ['UP', { x: pos.x, y: pos.y - 1 }],
    ['DOWN', { x: pos.x, y: pos.y + 1 }],
    ['LEFT', { x: pos.x - 1, y: pos.y }],
    ['RIGHT', { x: pos.x + 1, y: pos.y }],
  ];

  for (const [dir, newPos] of directions) {
    if (isValidPosition(newPos, grid)) {
      moves.push(dir);
    }
  }

  return moves;
}

function isValidPosition(pos: Position, grid: EntityType[][]): boolean {
  return pos.y >= 0 && pos.y < grid.length &&
         pos.x >= 0 && pos.x < grid[0].length &&
         grid[pos.y][pos.x] !== 'WALL';
}