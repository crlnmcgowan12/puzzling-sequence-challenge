
import React from 'react';
import { cn } from '@/lib/utils';

interface NumberTileProps {
  value: number;
  index: number;
  onClick: (index: number) => void;
  isSelected: boolean;
  isCorrectPosition: boolean;
}

const NumberTile: React.FC<NumberTileProps> = ({
  value,
  index,
  onClick,
  isSelected,
  isCorrectPosition
}) => {
  return (
    <div
      className={cn(
        "number-tile number-tile-animated",
        isSelected && "ring-2 ring-game-primary bg-blue-50",
        isCorrectPosition && "text-game-success"
      )}
      onClick={() => onClick(index)}
      style={{
        animationDelay: `${index * 50}ms`
      }}
    >
      {value}
    </div>
  );
};

export default NumberTile;
