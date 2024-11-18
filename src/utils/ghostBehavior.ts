import { Position, Ghost, GhostType } from '../types/game';
import { findPath } from './pathfinding';

export function getGhostTarget(ghost: Ghost, pacmanPos: Position, pacmanDir: string, level: number): Position {
  const scatter = isScatterMode(level);
  if (scatter) return getScatterTarget(ghost.type);
  
  switch (ghost.type) {
    case 'BLINKY':
      return getBlinkyTarget(pacmanPos, level);
    case 'PINKY':
      return getPinkyTarget(pacmanPos, pacmanDir, level);
    case 'INKY':
      return getInkyTarget(pacmanPos, pacmanDir, level);
    case 'CLYDE':
      return getClydeTarget(ghost.position, pacmanPos, level);
    default:
      return pacmanPos;
  }
}

function isScatterMode(level: number): boolean {
  const gameTime = Date.now() % 20000; // 20-second cycle
  const scatterDuration = Math.max(7000 - (level * 200), 3000); // Decreases with level
  return gameTime < scatterDuration;
}

function getScatterTarget(ghostType: GhostType): Position {
  switch (ghostType) {
    case 'BLINKY': return { x: 26, y: 0 };  // Top-right
    case 'PINKY': return { x: 1, y: 0 };    // Top-left
    case 'INKY': return { x: 26, y: 29 };   // Bottom-right
    case 'CLYDE': return { x: 1, y: 29 };   // Bottom-left
  }
}

function getBlinkyTarget(pacmanPos: Position, level: number): Position {
  // Blinky directly targets Pacman, gets more aggressive with levels
  return pacmanPos;
}

function getPinkyTarget(pacmanPos: Position, pacmanDir: string, level: number): Position {
  // Pinky tries to ambush Pacman by targeting 4 tiles ahead
  const offset = Math.min(4 + Math.floor(level / 10), 8);
  const target = { ...pacmanPos };
  
  switch (pacmanDir) {
    case 'UP':
      target.y -= offset;
      target.x -= offset; // Recreates the original game's bug
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
}

function getInkyTarget(pacmanPos: Position, pacmanDir: string, level: number): Position {
  // Inky's target is based on Blinky's position and Pacman's position
  const offset = Math.min(2 + Math.floor(level / 15), 4);
  const intermediateTarget = { ...pacmanPos };
  
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
  
  // Double the vector from Blinky to the intermediate target
  return intermediateTarget;
}

function getClydeTarget(ghostPos: Position, pacmanPos: Position, level: number): Position {
  // Clyde targets Pacman directly when far, and scatter corner when close
  const distance = Math.abs(ghostPos.x - pacmanPos.x) + Math.abs(ghostPos.y - pacmanPos.y);
  const threshold = Math.max(16 - Math.floor(level / 5), 8);
  
  return distance > threshold ? pacmanPos : getScatterTarget('CLYDE');
}