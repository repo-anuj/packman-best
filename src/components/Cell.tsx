import React from 'react';
import { EntityType, Position } from '../types/game';
import { useGameStore } from '../store/gameStore';

interface CellProps {
  type: EntityType;
  position: Position;
}

const Cell: React.FC<CellProps> = ({ type, position }) => {
  const { pacmanPosition, pacmanDirection, ghosts } = useGameStore();
  const isPacman = position.x === pacmanPosition.x && position.y === pacmanPosition.y;
  const ghost = ghosts.find(g => g.position.x === position.x && g.position.y === position.y);

  const getPacmanRotation = () => {
    switch (pacmanDirection) {
      case 'UP': return 'rotate-270';
      case 'DOWN': return 'rotate-90';
      case 'LEFT': return 'rotate-180';
      case 'RIGHT': return 'rotate-0';
    }
  };

  const getCellContent = () => {
    if (isPacman) {
      return (
        <div className={`w-full h-full ${getPacmanRotation()} transition-transform duration-100`}>
          <div className="w-full h-full bg-yellow-400 rounded-full animate-pulse">
            <div className="w-0 h-0 border-solid border-transparent border-r-[1rem] border-t-[1rem] border-b-[1rem]" />
          </div>
        </div>
      );
    }
    if (ghost) {
      return (
        <div className={`w-full h-full ${ghost.isVulnerable ? 'bg-blue-400' : getGhostColor(ghost.type)} relative`}>
          <div className="absolute inset-0 rounded-t-full" />
          <div className="absolute bottom-0 w-full h-1/2 flex justify-around">
            <div className="w-1/3 h-full bg-current rounded-b-full" />
            <div className="w-1/3 h-full bg-current rounded-b-full" />
          </div>
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full" />
        </div>
      );
    }
    switch (type) {
      case 'WALL':
        return <div className="w-full h-full bg-blue-800 rounded-sm" />;
      case 'DOT':
        return <div className="w-2 h-2 bg-yellow-200 rounded-full m-auto" />;
      case 'POWER_PELLET':
        return <div className="w-4 h-4 bg-yellow-200 rounded-full m-auto animate-pulse" />;
      default:
        return null;
    }
  };

  return (
    <div className="aspect-square flex items-center justify-center">
      {getCellContent()}
    </div>
  );
};

const getGhostColor = (type: string): string => {
  switch (type) {
    case 'BLINKY':
      return 'bg-red-500';
    case 'PINKY':
      return 'bg-pink-400';
    case 'INKY':
      return 'bg-cyan-400';
    case 'CLYDE':
      return 'bg-orange-400';
    default:
      return 'bg-gray-400';
  }
};

export default Cell;