import React from 'react';
import { useGameStore } from '../store/gameStore';
import Cell from './Cell';
import { GRID_SIZE } from '../constants/grid';

const Board: React.FC = () => {
  const { grid } = useGameStore();

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <div 
        className="grid gap-0 bg-black border-4 border-blue-500 rounded-lg overflow-hidden aspect-[28/31]"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE.width}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, y) =>
          row.map((cell, x) => (
            <Cell key={`${x}-${y}`} type={cell} position={{ x, y }} />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;