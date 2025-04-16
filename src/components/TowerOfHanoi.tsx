
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Rod {
  disks: number[];
  highlight?: boolean;
}

interface TowerOfHanoiProps {
  initialState: number[][];
  moves: Move[];
  currentMove: number;
  algorithm: string;
  variant?: 'algo1' | 'algo2';
  isWinner?: boolean;
}

export interface Move {
  fromRod: number;
  toRod: number;
}

const TowerOfHanoi: React.FC<TowerOfHanoiProps> = ({
  initialState,
  moves,
  currentMove,
  algorithm,
  variant = 'algo1',
  isWinner = false
}) => {
  const [rods, setRods] = useState<Rod[]>([
    { disks: [...initialState[0]] },
    { disks: [...initialState[1]] },
    { disks: [...initialState[2]] }
  ]);

  const [movingFrom, setMovingFrom] = useState<number | null>(null);
  const [movingTo, setMovingTo] = useState<number | null>(null);
  const rodsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Reset to initial state
    if (currentMove === 0) {
      setRods([
        { disks: [...initialState[0]] },
        { disks: [...initialState[1]] },
        { disks: [...initialState[2]] }
      ]);
      setMovingFrom(null);
      setMovingTo(null);
      return;
    }

    const move = moves[currentMove - 1];
    if (!move) return;

    const { fromRod, toRod } = move;
    
    // Make a deep copy of rods
    const newRods = rods.map(rod => ({ ...rod, disks: [...rod.disks] }));

    if (newRods[fromRod].disks.length === 0) return;

    // Get the disk being moved
    const diskToMove = newRods[fromRod].disks.pop() as number;
    
    // Add it to the target rod
    newRods[toRod].disks.push(diskToMove);
    
    // Set highlighting for animation
    setMovingFrom(fromRod);
    setMovingTo(toRod);
    
    setRods(newRods);
    
    // Clear highlighting after a short delay
    const timer = setTimeout(() => {
      setMovingFrom(null);
      setMovingTo(null);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [currentMove, initialState, moves]);

  const maxDiskWidth = 100; // Width of the largest disk in pixels
  const diskHeight = 20; // Height of each disk in pixels
  const maxDisks = Math.max(...initialState.map(rod => rod.length), 8); // Ensuring we can handle at least 8 disks

  return (
    <div className={cn(
      "relative flex flex-col items-center pb-6",
      isWinner && "winner-celebrate"
    )}>
      <div className="mb-4 font-semibold text-sm">
        <span className={cn(
          "px-3 py-1 rounded-full text-white",
          variant === 'algo1' ? "bg-[hsl(var(--algo1))]" : "bg-[hsl(var(--algo2))]"
        )}>
          {algorithm}
        </span>
      </div>
      
      <div className="flex justify-center items-end space-x-12 h-[250px] relative">
        {rods.map((rod, rodIndex) => (
          <div 
            key={rodIndex} 
            className={cn(
              "flex flex-col-reverse items-center relative",
              (rodIndex === movingFrom || rodIndex === movingTo) && "rod-pulse"
            )}
            ref={el => rodsRef.current[rodIndex] = el}
          >
            {/* Base of the rod */}
            <div className="h-2 w-36 bg-gray-600 rounded-sm"></div>
            
            {/* Rod */}
            <div className="h-[230px] w-2 bg-gray-600 absolute bottom-2 rounded-t-sm"></div>
            
            {/* Disks */}
            <div className="flex flex-col-reverse items-center z-10">
              {rod.disks.map((diskSize, diskIndex) => {
                const widthPercent = (diskSize / maxDisks) * 100;
                const width = (widthPercent / 100) * maxDiskWidth;
                
                // Determine if this is the largest disk (disk 1 is actually the largest)
                const isLargestDisk = diskSize === maxDisks;
                
                // Color based on disk size (gradient from light to dark)
                // For the largest disk, use white with a border
                let backgroundColor;
                let borderStyle = '';
                let textColor = 'text-white';
                
                if (isLargestDisk) {
                  backgroundColor = 'white';
                  borderStyle = 'border-2 border-gray-400';
                  textColor = 'text-gray-800';
                } else {
                  const colorIntensity = Math.round(40 + (diskSize / maxDisks) * 60);
                  backgroundColor = variant === 'algo1' 
                    ? `hsl(221, 83%, ${colorIntensity}%)` 
                    : `hsl(329, 100%, ${colorIntensity}%)`;
                }
                
                return (
                  <div
                    key={diskIndex}
                    className={cn(
                      "rounded-md flex justify-center items-center transition-all duration-200",
                      borderStyle
                    )}
                    style={{
                      width: `${width}px`,
                      height: `${diskHeight}px`,
                      backgroundColor: backgroundColor,
                      transition: 'width 0.3s ease-in-out'
                    }}
                  >
                    <span className={cn("text-xs font-bold", textColor)}>
                      {diskSize}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm flex gap-2">
        <span className="font-semibold">Moves: {currentMove}</span>
      </div>
    </div>
  );
};

export default TowerOfHanoi;
