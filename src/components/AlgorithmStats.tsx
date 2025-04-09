
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AlgorithmStatsProps {
  algorithmName: string;
  moves: number;
  nodesExplored: number;
  maxMoves: number;
  maxNodes: number;
  variant: 'algo1' | 'algo2';
  isWinner: boolean;
}

const AlgorithmStats: React.FC<AlgorithmStatsProps> = ({
  algorithmName,
  moves,
  nodesExplored,
  maxMoves,
  maxNodes,
  variant,
  isWinner
}) => {
  // Calculate move percentage (but cap at 100%)
  const movePercentage = Math.min(100, (moves / maxMoves) * 100);
  const nodePercentage = Math.min(100, (nodesExplored / maxNodes) * 100);

  return (
    <Card className={cn("w-full transition-all duration-300", 
      isWinner && "border-2",
      variant === 'algo1' ? "border-blue-500" : "border-pink-500"
    )}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <span className={cn(
            "w-4 h-4 rounded-full",
            variant === 'algo1' ? "bg-[hsl(var(--algo1))]" : "bg-[hsl(var(--algo2))]"
          )}></span>
          {algorithmName}
          {isWinner && 
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Winner
            </span>
          }
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Moves</span>
              <span className="font-medium">{moves}</span>
            </div>
            <Progress 
              value={movePercentage} 
              className={cn(
                variant === 'algo1' ? "bg-blue-100" : "bg-pink-100",
                variant === 'algo1' ? "text-blue-500" : "text-pink-500"
              )}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nodes Explored</span>
              <span className="font-medium">{nodesExplored}</span>
            </div>
            <Progress 
              value={nodePercentage}
              className={cn(
                variant === 'algo1' ? "bg-blue-100" : "bg-pink-100",
                variant === 'algo1' ? "text-blue-500" : "text-pink-500"
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmStats;
