import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Pause, RotateCcw } from 'lucide-react';

const Controls: React.FC = () => {
  const { movePlayer, togglePause, resetGame } = useGameStore();

  const handleTouchStart = (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    movePlayer(direction);
  };

  return (
    <div className="mt-4 flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <button
            onTouchStart={() => handleTouchStart('UP')}
            onClick={() => movePlayer('UP')}
            className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 active:bg-blue-700"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button
            onTouchStart={() => handleTouchStart('LEFT')}
            onClick={() => movePlayer('LEFT')}
            className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 active:bg-blue-700"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="col-start-2 row-start-2">
          <button
            onTouchStart={() => handleTouchStart('DOWN')}
            onClick={() => movePlayer('DOWN')}
            className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 active:bg-blue-700"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
        <div className="col-start-3 row-start-2">
          <button
            onTouchStart={() => handleTouchStart('RIGHT')}
            onClick={() => movePlayer('RIGHT')}
            className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 active:bg-blue-700"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={togglePause}
          className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center hover:bg-yellow-600 active:bg-yellow-700"
        >
          <Pause className="w-6 h-6" />
        </button>
        <button
          onClick={resetGame}
          className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 active:bg-red-700"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Controls;