
import React, { useState, useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import WinModal from '@/components/WinModal';
import { createShuffledBoard } from '@/utils/gameLogic';

const Index = () => {
  const [board, setBoard] = useState<number[]>(createShuffledBoard());
  const [moves, setMoves] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && !isWin) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isWin]);
  
  // Win effect - stop timer when game is won
  useEffect(() => {
    if (isWin) {
      setIsTimerRunning(false);
    }
  }, [isWin]);
  
  const handleReset = () => {
    setBoard(createShuffledBoard());
    setMoves(0);
    setTime(0);
    setIsWin(false);
    setIsTimerRunning(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <header className="mb-8 text-center animate-slide-down">
          <div className="inline-block bg-white/80 backdrop-blur-sm py-1 px-3 rounded-full mb-2 text-xs font-medium text-gray-500">
            STUDENT ID PUZZLE
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Number Puzzle</h1>
          <p className="text-gray-600 mt-1 max-w-xs mx-auto">
            Arrange the numbers to match the target sequence: 80141746
          </p>
        </header>
        
        <GameBoard 
          board={board}
          setBoard={setBoard}
          moves={moves}
          setMoves={setMoves}
          setIsWin={setIsWin}
        />
        
        <GameControls 
          onReset={handleReset}
          time={time}
        />
        
        <div className="mt-8 text-center text-xs text-gray-500 animate-fade-in">
          <p>Tap on two tiles to swap their positions</p>
          <p className="mt-1">Try to arrange the numbers in as few moves as possible</p>
        </div>
      </div>
      
      {isWin && (
        <WinModal 
          moves={moves}
          time={time}
          onPlayAgain={handleReset}
        />
      )}
    </div>
  );
};

export default Index;
