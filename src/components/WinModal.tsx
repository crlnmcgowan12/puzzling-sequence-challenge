
import React, { useEffect } from 'react';
import { formatTime } from '@/utils/gameLogic';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, RotateCw } from 'lucide-react';

interface WinModalProps {
  moves: number;
  time: number;
  onPlayAgain: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ moves, time, onPlayAgain }) => {
  // Create confetti effect when modal appears
  useEffect(() => {
    const element = document.getElementById('win-modal');
    if (element) {
      element.classList.add('animate-scale-in');
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div 
        id="win-modal"
        className="bg-white rounded-2xl shadow-modal p-6 max-w-md w-11/12 mx-4"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4 animate-celebrate">
            <Trophy className="w-8 h-8 text-amber-500" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">Puzzle Solved!</h2>
          <p className="text-gray-600 mb-6">
            You've successfully arranged the numbers to match the Student ID sequence.
          </p>
          
          <div className="grid grid-cols-2 gap-4 w-full mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-500 text-sm mb-1 flex items-center justify-center">
                <Clock className="w-4 h-4 mr-1" />
                Time
              </div>
              <div className="font-medium text-lg">{formatTime(time)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-gray-500 text-sm mb-1">Moves</div>
              <div className="font-medium text-lg">{moves}</div>
            </div>
          </div>
          
          <Button 
            onClick={onPlayAgain}
            className="w-full bg-game-primary hover:bg-game-primary/90"
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
