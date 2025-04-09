
// This file contains the AI logic for the Tower of Hanoi
import { Move } from "@/components/TowerOfHanoi";

type Rod = number[];
type RodsState = Rod[];

interface SearchState {
  rods: RodsState;
  moves: number;
  nodesExplored: number;
  path?: Move[];
}

interface AlgorithmResult {
  moves: number;
  nodesExplored: number;
  movePath: Move[];
  success: boolean;
}

export class TowerOfHanoiAI {
  numDisks: number;
  initialState: SearchState;
  goalState: SearchState;

  constructor(numDisks: number = 3) {
    this.numDisks = numDisks;
    this.initialState = {
      rods: [[...Array(numDisks).keys()].map(i => numDisks - i), [], []],
      moves: 0,
      nodesExplored: 0,
      path: []
    };
    this.goalState = {
      rods: [[], [], [...Array(numDisks).keys()].map(i => numDisks - i)],
      moves: 0,
    };
  }

  setNumDisks(numDisks: number): void {
    this.numDisks = numDisks;
    this.initialState = {
      rods: [[...Array(numDisks).keys()].map(i => numDisks - i), [], []],
      moves: 0,
      nodesExplored: 0,
      path: []
    };
    this.goalState = {
      rods: [[], [], [...Array(numDisks).keys()].map(i => numDisks - i)],
      moves: 0,
    };
  }

  isGoalState(state: SearchState): boolean {
    const goalRodStr = JSON.stringify(this.goalState.rods[2]);
    const stateRodStr = JSON.stringify(state.rods[2]);
    return goalRodStr === stateRodStr;
  }

  getPossibleMoves(state: SearchState): [number, number][] {
    const moves: [number, number][] = [];
    const rods = state.rods;
    
    for (let fromRod = 0; fromRod < 3; fromRod++) {
      if (rods[fromRod].length === 0) continue;
      
      for (let toRod = 0; toRod < 3; toRod++) {
        if (fromRod === toRod) continue;
        
        if (rods[toRod].length === 0 || rods[fromRod][rods[fromRod].length - 1] < rods[toRod][rods[toRod].length - 1]) {
          moves.push([fromRod, toRod]);
        }
      }
    }
    
    return moves;
  }

  applyMove(state: SearchState, move: [number, number]): SearchState {
    const [fromRod, toRod] = move;
    const newState = JSON.parse(JSON.stringify(state)); // Deep copy
    
    // Move the disk
    const disk = newState.rods[fromRod].pop();
    newState.rods[toRod].push(disk);
    
    // Update metrics
    newState.moves += 1;
    newState.nodesExplored += 1;
    
    // Update path if it exists
    if (newState.path) {
      newState.path = [...newState.path, { fromRod, toRod }];
    } else {
      newState.path = [{ fromRod, toRod }];
    }
    
    return newState;
  }

  heuristicHanoi(state: SearchState): number {
    // Base value: disks not on goal rod
    const base = this.numDisks - state.rods[2].length;
    
    // Penalize disks on first rod (makes heuristic less perfect)
    const penalty = state.rods[0].length * 0.1;
    
    // Small random factor to break ties (0-0.1)
    const randomFactor = Math.random() * 0.1;
    
    return base + penalty + randomFactor;
  }

  bestFirstSearch(): AlgorithmResult {
    const visited = new Set<string>();
    let counter = 0;
    const queue: [number, number, SearchState][] = [];
    
    const initialState = JSON.parse(JSON.stringify(this.initialState));
    initialState.path = [];
    
    const initialStateStr = JSON.stringify(initialState.rods);
    queue.push([this.heuristicHanoi(initialState), counter++, initialState]);
    
    visited.add(initialStateStr);
    let nodesExplored = 0;

    while (queue.length > 0) {
      queue.sort((a, b) => a[0] - b[0]);
      const [_, __, currentState] = queue.shift()!;
      nodesExplored++;

      if (this.isGoalState(currentState)) {
        return {
          moves: currentState.moves,
          nodesExplored,
          movePath: currentState.path || [],
          success: true
        };
      }

      for (const move of this.getPossibleMoves(currentState)) {
        const newState = this.applyMove(currentState, move);
        const newStateStr = JSON.stringify(newState.rods);

        if (!visited.has(newStateStr)) {
          visited.add(newStateStr);
          queue.push([this.heuristicHanoi(newState), counter++, newState]);
        }
      }
    }

    return { moves: -1, nodesExplored, movePath: [], success: false };
  }

  aStarSearch(): AlgorithmResult {
    const visited = new Set<string>();
    let counter = 0;
    const queue: [number, number, SearchState][] = [];
    
    const initialState = JSON.parse(JSON.stringify(this.initialState));
    initialState.path = [];
    
    const initialStateStr = JSON.stringify(initialState.rods);
    queue.push([this.heuristicHanoi(initialState) + initialState.moves, counter++, initialState]);
    
    visited.add(initialStateStr);
    let nodesExplored = 0;

    while (queue.length > 0) {
      queue.sort((a, b) => a[0] - b[0]);
      const [_, __, currentState] = queue.shift()!;
      nodesExplored++;

      if (this.isGoalState(currentState)) {
        return {
          moves: currentState.moves,
          nodesExplored,
          movePath: currentState.path || [],
          success: true
        };
      }

      for (const move of this.getPossibleMoves(currentState)) {
        const newState = this.applyMove(currentState, move);
        const newStateStr = JSON.stringify(newState.rods);

        if (!visited.has(newStateStr)) {
          visited.add(newStateStr);
          const totalCost = this.heuristicHanoi(newState) + newState.moves;
          queue.push([totalCost, counter++, newState]);
        }
      }
    }

    return { moves: -1, nodesExplored, movePath: [], success: false };
  }

  hillClimbing(): AlgorithmResult {
    let currentState = JSON.parse(JSON.stringify(this.initialState));
    currentState.path = [];
    
    let currentHeuristic = this.heuristicHanoi(currentState);
    let nodesExplored = 0;

    while (true) {
      nodesExplored++;
      
      if (this.isGoalState(currentState)) {
        return {
          moves: currentState.moves,
          nodesExplored,
          movePath: currentState.path || [],
          success: true
        };
      }

      const neighbors: [number, SearchState][] = [];
      
      for (const move of this.getPossibleMoves(currentState)) {
        const newState = this.applyMove(currentState, move);
        neighbors.push([this.heuristicHanoi(newState), newState]);
      }

      if (neighbors.length === 0) {
        return { moves: -1, nodesExplored, movePath: [], success: false };
      }

      // Sort by heuristic and take the best
      neighbors.sort((a, b) => a[0] - b[0]);
      const [bestHeuristic, bestNeighbor] = neighbors[0];

      if (bestHeuristic >= currentHeuristic) {
        return { moves: -1, nodesExplored, movePath: currentState.path || [], success: false };
      }

      currentState = bestNeighbor;
      currentHeuristic = bestHeuristic;
    }
  }

  runAlgorithm(algorithm: '1' | '2' | '3'): AlgorithmResult {
    switch(algorithm) {
      case '1': return this.bestFirstSearch();
      case '2': return this.aStarSearch();
      case '3': return this.hillClimbing();
      default: throw new Error("Invalid algorithm selection");
    }
  }
  
  getAlgorithmName(algorithmCode: string): string {
    const names: Record<string, string> = {
      '1': "Best-First Search",
      '2': "A* Algorithm",
      '3': "Hill Climbing"
    };
    return names[algorithmCode] || "Unknown Algorithm";
  }
}
