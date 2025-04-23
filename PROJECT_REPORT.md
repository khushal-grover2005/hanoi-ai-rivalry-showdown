
# Tower of Hanoi: AI vs AI Showdown - Project Report

## Abstract

This project explores the application and comparative effectiveness of various artificial intelligence algorithms in solving the classic Tower of Hanoi problem. By implementing and visualizing multiple problem-solving approaches, the project aims to illustrate how search strategies and heuristics impact solution efficiency, optimality, and computational performance. The system provides a platform for real-time, interactive observation of AI-driven solutions, offering insights into algorithmic strengths and trade-offs within the context of a challenging combinatorial puzzle.

## Introduction

Artificial Intelligence (AI) has revolutionized problem-solving in complex domains by leveraging search algorithms and heuristic methods. The Tower of Hanoi puzzle, known for its recursive complexity and exponential solution space, serves as a benchmark for evaluating AI techniques such as Best-First Search, A* Algorithm, and Hill Climbing. This project, "Tower of Hanoi: AI vs AI Showdown," presents a sophisticated yet accessible environment for observing the behavior of such algorithms in action, with a focus on visual clarity, interactive features, and comparative analytics.

The Tower of Hanoi puzzle consists of three rods and a number of disks of different sizes, which can slide onto any rod. The puzzle starts with the disks in a neat stack in ascending order of size on one rod, the smallest at the top. The objective is to move the entire stack to another rod, obeying the following simple rules:

1. Only one disk can be moved at a time.
2. Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.
3. No disk may be placed on top of a smaller disk.

This puzzle provides an ideal test case for AI algorithms due to its well-defined rules, clear goal state, and scalable complexity based on the number of disks.

## Problem Statement

Solving the Tower of Hanoi efficiently becomes increasingly challenging as the number of disks grows, since the search space expands exponentially. The principal problem tackled is the design and implementation of a framework that enables side-by-side comparison of multiple AI algorithms for this puzzle, evaluating their solution methods, resource consumption, and adaptability through intuitive visualizations and analytics.

Specifically, the project addresses:

1. The challenge of selecting appropriate heuristics for informed search algorithms.
2. The trade-off between computational efficiency and solution optimality.
3. The visual representation of algorithmic decision-making in real-time.
4. The creation of a comparative framework for educational and analytical purposes.

## Objectives

- To implement and integrate multiple AI search algorithms suitable for the Tower of Hanoi problem.
- To design a system for configuring, running, and visualizing the solution process in real time.
- To compare the AI approaches in terms of moves taken, nodes explored, success rates, and efficiency.
- To enhance user engagement through interactive algorithm selection and parameter adjustment.
- To provide educational insights into algorithmic behavior and strategy variation in AI problem-solving.
- To create an accessible platform for demonstrating complex AI concepts through an intuitive interface.

## Methodology

The solution employs a modern web stack featuring TypeScript, React, and Tailwind CSS for interactive UI, with the underlying logic developed in a modular and extensible architecture. The following methodologies were realized:

### Algorithm Implementation

Three major AI strategies were implemented:

1. **Best-First Search**: This greedy approach prioritizes states based on heuristic estimations alone, without considering path cost. It explores nodes that appear most promising according to the selected heuristic function.

2. **A* Algorithm**: A more sophisticated approach that combines path cost (number of moves so far) with heuristic estimation to determine the next state to explore. A* is guaranteed to find optimal solutions when used with admissible heuristics.

3. **Hill Climbing**: A local search strategy that evaluates neighboring states and moves to the best one available. It can quickly reach solutions for simple configurations but may get trapped in local optima for more complex problems.

### Heuristic Engineering

To guide the search algorithms, three distinct heuristic functions were developed:

1. **Default (Distance-Based)**: Evaluates states based on the number of disks not yet on the goal rod, with small penalties for disks on the first rod.

2. **Correct Peg (±1)**: Assigns +1 for each disk on the correct (goal) rod and -1 for each disk on incorrect rods.

3. **Weighted Position (±n)**: More sophisticated approach that gives higher rewards for disks correctly placed at the bottom of the goal rod and proportionally smaller rewards for those correctly stacked above.

### Real-Time Visualization

The state of the puzzle, moves taken, and performance metrics are rendered dynamically using React components, allowing users to:

- Observe disk movements in real-time
- Control playback speed
- Step through solutions one move at a time
- Reset and replay for deeper analysis

### Side-by-Side Comparison

The interface presents two AI approaches simultaneously, facilitating direct comparison of:

- Solution paths
- Execution efficiency
- Number of moves required
- Computational resources (nodes explored)

### Performance Tracking

For each algorithm, the system tracks:

- Total moves in the solution
- Nodes explored during search
- Success or failure to reach the goal
- Visual representation of progress through animated towers

## Results

Upon running the implemented system, the following outcomes were consistently observed:

### Solution Optimality

- **A* Algorithm**: When equipped with admissible heuristics, consistently finds the optimal (minimum moves) solution for all tested disk configurations. This validates its theoretical guarantee of optimality.

- **Best-First Search**: Often finds reasonable solutions but may not always produce the optimal path, especially for larger disk counts, as it doesn't account for path cost.

- **Hill Climbing**: Performance varies significantly based on the selected heuristic. For simpler configurations (3-4 disks), it frequently finds optimal or near-optimal solutions, but its reliability decreases as complexity increases.

### Efficiency

- **A* Algorithm**: Generally explores more nodes than hill climbing but fewer than best-first search. The exploration increases with disk count, but the admissible heuristic helps prune the search space effectively.

- **Best-First Search**: Often explores fewer nodes than A* for simpler puzzles but may explore significantly more for complex configurations due to the lack of path cost consideration.

- **Hill Climbing**: Typically explores the fewest nodes but is most susceptible to getting trapped in local optima, especially with simpler heuristics.

### Heuristic Impact

- The "Weighted Position" heuristic consistently outperforms the other heuristics across all algorithms, demonstrating the importance of domain-specific knowledge in heuristic design.

- The "Correct Peg" heuristic performs adequately for A* but is less effective for hill climbing due to its binary nature providing insufficient guidance for local improvements.

- The default heuristic provides a balanced approach but becomes less effective as disk count increases.

### Comparative Analytics

The real-time graphical feedback and statistical breakdowns enabled effective assessment of trade-offs between exploration (nodes visited) and exploitation (minimum moves), highlighting the complementary strengths of different algorithms.

## Conclusion

The Tower of Hanoi: AI vs AI Showdown project successfully demonstrates the practical application of artificial intelligence search algorithms to a classic problem. Through interactive visualization and side-by-side comparison, it illustrates the strengths and weaknesses of different approaches to automated problem-solving.

Key findings from this project include:

1. **Algorithm Selection Matters**: The choice of algorithm significantly impacts both solution quality and computational efficiency. A* consistently produces optimal solutions but at a higher computational cost, while hill climbing offers efficiency at the potential expense of optimality.

2. **Heuristic Design is Critical**: The effectiveness of informed search algorithms heavily depends on the quality of their heuristic functions. Domain-specific heuristics (like "Weighted Position") substantially outperform more general approaches.

3. **Trade-offs are Inescapable**: There is no "perfect" algorithm for all scenarios. The project demonstrates the fundamental AI principle that optimization often involves balancing competing objectives such as solution quality, computational resources, and time constraints.

4. **Visualization Enhances Understanding**: The interactive, visual nature of the project makes complex algorithmic concepts more accessible and facilitates deeper insights into how AI search strategies operate.

This project serves both as an educational tool for demonstrating AI concepts and as a testbed for comparing algorithm performance. Future work could extend the system to include additional algorithms (such as genetic algorithms or simulated annealing), more sophisticated heuristics, or automated performance analysis across varying problem complexities.

## References

1. Russell, S. J., & Norvig, P. (2020). *Artificial Intelligence: A Modern Approach* (4th ed.). Pearson.

2. Wikipedia contributors. (2024). "Tower of Hanoi." [https://en.wikipedia.org/wiki/Tower_of_Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi)

3. Nilsson, N. J. (1998). *Artificial Intelligence: A New Synthesis*. Morgan Kaufmann.

4. Pearl, J. (1984). *Heuristics: Intelligent Search Strategies for Computer Problem Solving*. Addison-Wesley.

5. Knuth, D. E. (1975). "Estimating the efficiency of backtrack programs." *Mathematics of Computation, 29*(129), 121–136.

6. Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). "A Formal Basis for the Heuristic Determination of Minimum Cost Paths." *IEEE Transactions on Systems Science and Cybernetics, 4*(2), 100-107.

7. Korf, R. E. (1985). "Depth-first Iterative-Deepening: An Optimal Admissible Tree Search." *Artificial Intelligence, 27*(1), 97-109.

8. Kulkarni, P. A., Tai, K., Sauer, J., & Holtz, N. (2018). "Heuristic Search Algorithms: A Survey of the State-of-the-Art." *Journal of Computer Science and Technology, 33*(1), 24-56.
