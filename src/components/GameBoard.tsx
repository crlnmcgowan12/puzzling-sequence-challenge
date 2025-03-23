
import React, { useState, useEffect } from 'react';
import NumberTile from './NumberTile';
import { TARGET_SEQUENCE, swapTiles, isBoardSolved } from '@/utils/gameLogic';

interface GameBoardProps {
  board: number[];
  setBoard: React.Dispatch<React.SetStateAction<number[]>>;
  moves: number;
  setMoves: React.Dispatch<React.SetStateAction<number>>;
  setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  setBoard,
  moves,
  setMoves,
  setIsWin
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleTileClick = (index: number) => {
    if (selectedIndex === null) {
      // First tile selection
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      // Deselect the same tile
      setSelectedIndex(null);
    } else {
      // Second tile selection - perform swap
      const newBoard = swapTiles(board, selectedIndex, index);
      setBoard(newBoard);
      setMoves(prev => prev + 1);
      setSelectedIndex(null);
      
      // Check if the board is solved after the swap
      if (isBoardSolved(newBoard)) {
        setIsWin(true);
      }
    }
  };

  // Check if each tile is in the correct position
  const isCorrectPosition = (value: number, index: number) => {
    return value === TARGET_SEQUENCE[index];
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 animate-slide-down">
        <div className="flex items-center justify-center space-x-1 py-2 px-4 bg-white rounded-full shadow-sm">
          <span className="text-sm text-gray-500">Target:</span>
          <div className="flex ml-2">
            {TARGET_SEQUENCE.map((num, index) => (
              <span 
                key={index} 
                className="w-7 h-7 inline-flex items-center justify-center text-sm font-medium"
              >
                {num}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="game-board animate-slide-up bg-white/30 backdrop-blur-sm p-4 rounded-2xl">
        {board.map((value, index) => (
          <NumberTile
            key={index}
            value={value}
            index={index}
            onClick={handleTileClick}
            isSelected={selectedIndex === index}
            isCorrectPosition={isCorrectPosition(value, index)}
          />
        ))}
      </div>
      
      <div className="mt-4 flex items-center space-x-4 animate-fade-in text-center">
        <div className="bg-white py-2 px-4 rounded-full shadow-sm">
          <span className="text-sm text-gray-500">Moves:</span>
          <span className="ml-2 font-medium">{moves}</span>
        </div>
        
        {selectedIndex !== null && (
          <div className="text-sm text-game-primary py-1 px-3 bg-game-primary/10 rounded-full">
            Select another tile to swap
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
