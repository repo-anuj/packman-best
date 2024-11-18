import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import GameOver from './GameOver';
import Controls from './Controls';

const Game: React.FC = () => {
  const {
    isPaused,
    isGameOver,
    movePlayer,
    moveGhosts,
    togglePause,
    resetGame,
    level,
    releaseGhost,
  } = useGameStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isGameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          movePlayer('UP');
          break;
        case 'ArrowDown':
        case 's':
          movePlayer('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
          movePlayer('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
          movePlayer('RIGHT');
          break;
        case 'p':
          togglePause();
          break;
        case 'r':
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isGameOver, movePlayer, togglePause, resetGame]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      const gameLoop = setInterval(() => {
        moveGhosts();
      }, Math.max(200 - (level * 5), 100)); // Ghosts speed up with level

      return () => clearInterval(gameLoop);
    }
  }, [isPaused, isGameOver, moveGhosts, level]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      const releaseDelay = Math.max(3000 - (level * 100), 1000);
      const ghostReleaseTimers = [
        setTimeout(() => releaseGhost('BLINKY'), 0),
        setTimeout(() => releaseGhost('PINKY'), releaseDelay),
        setTimeout(() => releaseGhost('INKY'), releaseDelay * 2),
        setTimeout(() => releaseGhost('CLYDE'), releaseDelay * 3),
      ];

      return () => ghostReleaseTimers.forEach(timer => clearTimeout(timer));
    }
  }, [isPaused, isGameOver, releaseGhost, level]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {isGameOver ? (
          <GameOver />
        ) : (
          <>
            <ScoreBoard />
            <div className="relative">
              <Board />
              {isPaused && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-4xl font-bold">PAUSED</div>
                </div>
              )}
            </div>
            <Controls />
          </>
        )}
      </div>
    </div>
  );
};

export default Game;