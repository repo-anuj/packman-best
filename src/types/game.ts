export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type EntityType = 'WALL' | 'DOT' | 'POWER_PELLET' | 'EMPTY';
export type GhostType = 'BLINKY' | 'PINKY' | 'INKY' | 'CLYDE';

export interface Position {
  x: number;
  y: number;
}

export interface Ghost {
  type: GhostType;
  position: Position;
  direction: Direction;
  isVulnerable: boolean;
  isReleased: boolean;
}

export interface GameState {
  score: number;
  lives: number;
  level: number;
  isPaused: boolean;
  isGameOver: boolean;
  pacmanPosition: Position;
  pacmanDirection: Direction;
  ghosts: Ghost[];
  grid: EntityType[][];
  powerPelletActive: boolean;
}