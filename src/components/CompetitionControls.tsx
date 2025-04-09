
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  PlayCircle, 
  PauseCircle, 
  StepForward, 
  RotateCcw, 
  Snail,
  Zap,
  HelpCircle
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface CompetitionControlsProps {
  numDisks: number;
  onNumDisksChange: (value: number) => void;
  algo1: string;
  algo2: string;
  onAlgo1Change: (value: string) => void;
  onAlgo2Change: (value: string) => void;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStartCompetition: () => void;
  playbackSpeed: number;
  onPlaybackSpeedChange: (value: number) => void;
  competitionActive: boolean;
}

const CompetitionControls: React.FC<CompetitionControlsProps> = ({
  numDisks,
  onNumDisksChange,
  algo1,
  algo2,
  onAlgo1Change,
  onAlgo2Change,
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStartCompetition,
  playbackSpeed,
  onPlaybackSpeedChange,
  competitionActive
}) => {
  return (
    <div className="w-full bg-white border rounded-lg p-4 shadow-sm space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="space-y-2 flex-1">
          <div className="text-sm font-medium">Number of Disks</div>
          <div className="flex items-center gap-2">
            <Select
              value={numDisks.toString()}
              onValueChange={(value) => onNumDisksChange(parseInt(value))}
              disabled={competitionActive}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 4, 5, 6].map(n => (
                  <SelectItem key={n} value={n.toString()}>
                    {n} {n === 1 ? 'disk' : 'disks'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    More disks make the puzzle more complex. Beyond 6 disks, some algorithms may run very slowly.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="space-y-2 flex-1">
          <div className="text-sm font-medium">Algorithm 1 (Blue)</div>
          <Select 
            value={algo1} 
            onValueChange={onAlgo1Change}
            disabled={competitionActive}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Best-First Search</SelectItem>
              <SelectItem value="2">A* Algorithm</SelectItem>
              <SelectItem value="3">Hill Climbing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 flex-1">
          <div className="text-sm font-medium">Algorithm 2 (Pink)</div>
          <Select 
            value={algo2} 
            onValueChange={onAlgo2Change}
            disabled={competitionActive}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Best-First Search</SelectItem>
              <SelectItem value="2">A* Algorithm</SelectItem>
              <SelectItem value="3">Hill Climbing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="space-y-2 w-full md:w-1/3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Playback Speed</span>
            <div className="flex items-center gap-1">
              <Snail className="w-4 h-4 text-gray-400" />
              <Slider
                value={[playbackSpeed]}
                onValueChange={(values) => onPlaybackSpeedChange(values[0])}
                min={1}
                max={10}
                step={1}
                className="w-24"
              />
              <Zap className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {!competitionActive ? (
            <Button onClick={onStartCompetition} className="text-white bg-green-600 hover:bg-green-700">
              Start Competition
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={onReset}
                size="icon"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={onStepForward}
                size="icon"
                disabled={isPlaying}
              >
                <StepForward className="h-4 w-4" />
              </Button>
              
              {isPlaying ? (
                <Button 
                  variant="outline" 
                  onClick={onPause}
                  size="icon"
                >
                  <PauseCircle className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={onPlay}
                  size="icon"
                >
                  <PlayCircle className="h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitionControls;
