import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Ghost, Repeat } from 'lucide-react';

const GameOver: React.FC = () => {
  const { score, resetGame } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 bg-blue-900 rounded-lg text-center">
      <div className="flex gap-4">
        <Ghost className="w-12 h-12 text-red-500 animate-bounce" />
        <Ghost className="w-12 h-12 text-pink-400 animate-bounce delay-100" />
        <Ghost className="w-12 h-12 text-cyan-400 animate-bounce delay-200" />
        <Ghost className="w-12 h-12 text-orange-400 animate-bounce delay-300" />
      </div>
      <h1 className="text-4xl font-bold">Game Over!</h1>
      <p className="text-2xl">Final Score: {score}</p>
      <button
        onClick={resetGame}
        className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full font-bold hover:bg-yellow-300 transition-colors"
      >
        <Repeat className="w-6 h-6" />
        Play Again
      </button>
    </div>
  );
};

export default GameOver;