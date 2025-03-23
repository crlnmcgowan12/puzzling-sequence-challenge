
import React from 'react';
import { createShuffledBoard } from '@/utils/gameLogic';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock } from 'lucide-react';
import { formatTime } from '@/utils/gameLogic';

interface GameControlsProps {
  onReset: () => void;
  time: number;
}

const GameControls: React.FC<GameControlsProps> = ({ onReset, time }) => {
  return (
    <div className="game-controls animate-fade-in">
      <Button 
        onClick={onReset}
        variant="outline" 
        size="sm"
        className="flex items-center bg-white shadow-sm"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Shuffle
      </Button>
      
      <div className="bg-white py-2 px-4 rounded-full shadow-sm flex items-center">
        <Clock className="h-4 w-4 text-gray-500 mr-2" />
        <span className="font-medium">{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default GameControls;
