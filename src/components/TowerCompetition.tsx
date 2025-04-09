
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import TowerOfHanoi, { Move } from './TowerOfHanoi';
import AlgorithmStats from './AlgorithmStats';
import CompetitionControls from './CompetitionControls';
import AlgorithmExplanation from './AlgorithmExplanation';
import { Card, CardContent } from '@/components/ui/card';
import { TowerOfHanoiAI } from '@/lib/towerOfHanoiAI';

const TowerCompetition: React.FC = () => {
  // Settings
  const [numDisks, setNumDisks] = useState<number>(3);
  const [algo1, setAlgo1] = useState<string>('2'); // A* by default
  const [algo2, setAlgo2] = useState<string>('1'); // Best-First by default
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(5);
  
  // Competition state
  const [isCompetitionActive, setIsCompetitionActive] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  
  // Results
  const [algo1Results, setAlgo1Results] = useState<{
    moves: number;
    nodesExplored: number;
    movePath: Move[];
    success: boolean;
  } | null>(null);
  
  const [algo2Results, setAlgo2Results] = useState<{
    moves: number;
    nodesExplored: number;
    movePath: Move[];
    success: boolean;
  } | null>(null);
  
  // Animation timer
  const animationTimer = useRef<number | null>(null);
  
  // AI instance
  const aiRef = useRef(new TowerOfHanoiAI(numDisks));
  
  // Update AI when disk count changes
  useEffect(() => {
    aiRef.current.setNumDisks(numDisks);
  }, [numDisks]);
  
  // Handle starting the competition
  const handleStartCompetition = () => {
    // Reset state
    setCurrentMoveIndex(0);
    setIsPlaying(false);
    
    try {
      // Run algorithms and get results
      const results1 = aiRef.current.runAlgorithm(algo1 as '1' | '2' | '3');
      const results2 = aiRef.current.runAlgorithm(algo2 as '1' | '2' | '3');
      
      setAlgo1Results(results1);
      setAlgo2Results(results2);
      
      setIsCompetitionActive(true);
      
      // Show results toast
      if (!results1.success && !results2.success) {
        toast.error("Both algorithms failed to solve the puzzle!");
      } else if (!results1.success) {
        toast.error(`${aiRef.current.getAlgorithmName(algo1)} failed to solve the puzzle!`);
      } else if (!results2.success) {
        toast.error(`${aiRef.current.getAlgorithmName(algo2)} failed to solve the puzzle!`);
      } else {
        const winner = determineWinner(results1, results2);
        if (winner === 'tie') {
          toast.success("It's a perfect tie!");
        } else {
          toast.success(`${aiRef.current.getAlgorithmName(winner === 'algo1' ? algo1 : algo2)} wins!`);
        }
      }
    } catch (error) {
      console.error("Error running competition:", error);
      toast.error("Error running competition. Please try again with different parameters.");
    }
  };
  
  // Determine the winner
  const determineWinner = (
    results1: { moves: number; nodesExplored: number; success: boolean; },
    results2: { moves: number; nodesExplored: number; success: boolean; }
  ): 'algo1' | 'algo2' | 'tie' => {
    if (!results1.success && !results2.success) return 'tie';
    if (!results1.success) return 'algo2';
    if (!results2.success) return 'algo1';
    
    if (results1.moves === results2.moves) {
      if (results1.nodesExplored < results2.nodesExplored) return 'algo1';
      if (results2.nodesExplored < results1.nodesExplored) return 'algo2';
      return 'tie';
    }
    
    return results1.moves < results2.moves ? 'algo1' : 'algo2';
  };
  
  // Playback controls
  const handlePlay = () => {
    setIsPlaying(true);
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const handleReset = () => {
    setCurrentMoveIndex(0);
    setIsPlaying(false);
  };
  
  const handleStepForward = () => {
    if (!algo1Results || !algo2Results) return;
    
    const maxMoves = Math.max(
      algo1Results.movePath.length, 
      algo2Results.movePath.length
    );
    
    if (currentMoveIndex < maxMoves) {
      setCurrentMoveIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };
  
  // Animation logic
  useEffect(() => {
    if (isPlaying && algo1Results && algo2Results) {
      const maxMoves = Math.max(
        algo1Results.movePath.length, 
        algo2Results.movePath.length
      );
      
      if (currentMoveIndex >= maxMoves) {
        setIsPlaying(false);
        return;
      }
      
      // Calculate delay based on playback speed (1-10)
      // Faster speed = shorter delay
      const delay = 1000 / playbackSpeed;
      
      animationTimer.current = window.setTimeout(() => {
        handleStepForward();
      }, delay);
      
      return () => {
        if (animationTimer.current !== null) {
          clearTimeout(animationTimer.current);
        }
      };
    }
  }, [isPlaying, currentMoveIndex, algo1Results, algo2Results, playbackSpeed]);
  
  // Calculate max values for progress bars
  const getMaxValues = () => {
    if (!algo1Results || !algo2Results) {
      return { maxMoves: 1, maxNodes: 1 };
    }
    
    const maxMoves = Math.max(
      algo1Results.success ? algo1Results.moves : 1,
      algo2Results.success ? algo2Results.moves : 1
    );
    
    const maxNodes = Math.max(
      algo1Results.nodesExplored,
      algo2Results.nodesExplored
    );
    
    return { maxMoves, maxNodes };
  };
  
  const { maxMoves, maxNodes } = getMaxValues();
  
  const currentWinner = algo1Results && algo2Results 
    ? determineWinner(algo1Results, algo2Results)
    : null;
  
  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Tower of Hanoi: AI vs AI Showdown</h1>
      
      <CompetitionControls
        numDisks={numDisks}
        onNumDisksChange={setNumDisks}
        algo1={algo1}
        algo2={algo2}
        onAlgo1Change={setAlgo1}
        onAlgo2Change={setAlgo2}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onStepForward={handleStepForward}
        onStartCompetition={handleStartCompetition}
        playbackSpeed={playbackSpeed}
        onPlaybackSpeedChange={setPlaybackSpeed}
        competitionActive={isCompetitionActive}
      />
      
      {!isCompetitionActive ? (
        <div className="grid grid-cols-1 gap-6 mt-8">
          <AlgorithmExplanation />
          
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                Configure the settings above and click "Start Competition" to watch two AI algorithms compete at solving the Tower of Hanoi puzzle.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Algorithm 1 */}
            <div className="space-y-4">
              <AlgorithmStats
                algorithmName={aiRef.current.getAlgorithmName(algo1)}
                moves={algo1Results?.success ? Math.min(currentMoveIndex, algo1Results.moves) : 0}
                nodesExplored={algo1Results?.nodesExplored || 0}
                maxMoves={maxMoves}
                maxNodes={maxNodes}
                variant="algo1"
                isWinner={currentWinner === 'algo1'}
              />
              
              <Card className="overflow-hidden p-6 flex justify-center">
                {algo1Results && (
                  <TowerOfHanoi
                    initialState={aiRef.current.initialState.rods}
                    moves={algo1Results.movePath}
                    currentMove={Math.min(currentMoveIndex, algo1Results.movePath.length)}
                    algorithm={aiRef.current.getAlgorithmName(algo1)}
                    variant="algo1"
                    isWinner={currentWinner === 'algo1'}
                  />
                )}
              </Card>
            </div>
            
            {/* Algorithm 2 */}
            <div className="space-y-4">
              <AlgorithmStats
                algorithmName={aiRef.current.getAlgorithmName(algo2)}
                moves={algo2Results?.success ? Math.min(currentMoveIndex, algo2Results.moves) : 0}
                nodesExplored={algo2Results?.nodesExplored || 0}
                maxMoves={maxMoves}
                maxNodes={maxNodes}
                variant="algo2"
                isWinner={currentWinner === 'algo2'}
              />
              
              <Card className="overflow-hidden p-6 flex justify-center">
                {algo2Results && (
                  <TowerOfHanoi
                    initialState={aiRef.current.initialState.rods}
                    moves={algo2Results.movePath}
                    currentMove={Math.min(currentMoveIndex, algo2Results.movePath.length)}
                    algorithm={aiRef.current.getAlgorithmName(algo2)}
                    variant="algo2"
                    isWinner={currentWinner === 'algo2'}
                  />
                )}
              </Card>
            </div>
          </div>
          
          {/* Explanations section below the visualizations */}
          <AlgorithmExplanation />
        </>
      )}
    </div>
  );
};

export default TowerCompetition;
