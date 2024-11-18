import { EntityType } from '../types/game';

export const INITIAL_GRID: EntityType[][] = [
  Array(28).fill('WALL'),
  ['WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL', 'WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL'],
  ['WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL'],
  ['WALL', 'POWER_PELLET', 'WALL', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'DOT', 'WALL', 'WALL', 'DOT', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'WALL', 'POWER_PELLET', 'WALL'],
  ['WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL'],
  ['WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL'],
  ['WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL'],
  ['WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL'],
  ['WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL', 'WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL'],
  ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'EMPTY', 'DOT', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'DOT', 'EMPTY', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
  ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'EMPTY', 'EMPTY', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
  ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'EMPTY', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'EMPTY', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'DOT', 'EMPTY', 'EMPTY', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'EMPTY', 'EMPTY', 'DOT', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
  ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'EMPTY', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'EMPTY', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
  ['EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'DOT', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY'],
  ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
  ['WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL', 'WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL'],
  ['WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL'],
  ['WALL', 'POWER_PELLET', 'DOT', 'DOT', 'WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'EMPTY', 'EMPTY', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL', 'DOT', 'DOT', 'POWER_PELLET', 'WALL'],
  ['WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'DOT', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'DOT', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL'],
  ['WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'DOT', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'DOT', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL'],
  ['WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL'],
  ['WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'DOT', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'DOT', 'WALL'],
  ['WALL', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'DOT', 'WALL'],
  Array(28).fill('WALL'),
];

export const GRID_SIZE = {
  width: 28,
  height: 26,
};