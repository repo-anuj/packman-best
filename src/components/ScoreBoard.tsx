import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Ghost } from 'lucide-react';

const ScoreBoard: React.FC = () => {
  const { score, lives, level } = useGameStore();

  return (
    <div className="flex justify-between items-center mb-4 px-4 py-2 bg-blue-900 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold">Level: {level}</div>
        <div className="flex items-center gap-2">
          {Array.from({ length: lives }).map((_, i) => (
            <Ghost key={i} className="w-6 h-6 text-yellow-400" />
          ))}
        </div>
      </div>
      <div className="text-2xl font-bold">Score: {score}</div>
    </div>
  );
};

export default ScoreBoard;