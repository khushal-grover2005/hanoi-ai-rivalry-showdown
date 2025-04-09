
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const AlgorithmExplanation: React.FC = () => {
  return (
    <div className="w-full bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Algorithm Explanations</h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="best-first">
          <AccordionTrigger>Best-First Search</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-700 space-y-2">
              <p>Best-First Search greedily selects nodes based solely on a heuristic function, without considering the cost of the path so far.</p>
              <p>For Tower of Hanoi, the heuristic estimates how far a state is from the goal by counting disks not yet on the goal rod and slightly penalizing disks on the first rod.</p>
              <p>Unlike A*, it might not find the optimal solution but is often faster.</p>
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="a-star">
          <AccordionTrigger>A* Algorithm</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-700 space-y-2">
              <p>A* is an informed search algorithm that evaluates nodes by combining:</p>
              <p>- g(n): the cost to reach the node from the start</p>
              <p>- h(n): a heuristic estimating the cost from the node to the goal</p>
              <p>It guarantees the optimal solution when using an admissible heuristic. For Tower of Hanoi, it counts moves made so far plus an estimate of remaining moves.</p>
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="hill-climbing">
          <AccordionTrigger>Hill Climbing</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-gray-700 space-y-2">
              <p>Hill Climbing is a local search algorithm that continually moves towards states with better heuristic values.</p>
              <p>It always chooses the best immediate neighbor, which can lead to:
              <ul className="list-disc pl-5 mt-1">
                <li>Getting stuck in local optima</li>
                <li>Plateaus where no neighbor is better</li>
                <li>Ridges that are difficult to navigate</li>
              </ul>
              </p>
              <p>Hill Climbing is fast but often fails to find optimal solutions for complex problems.</p>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AlgorithmExplanation;
