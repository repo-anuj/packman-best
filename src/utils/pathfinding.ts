import { Position, EntityType } from '../types/game';

// A* pathfinding implementation
export function findPath(start: Position, target: Position, grid: EntityType[][]): Position[] {
  const openSet: Node[] = [];
  const closedSet = new Set<string>();
  const startNode = new Node(start, null, 0, heuristic(start, target));
  openSet.push(startNode);
  
  while (openSet.length > 0) {
    let current = openSet[0];
    let currentIndex = 0;
    
    // Find node with lowest f score
    openSet.forEach((node, index) => {
      if (node.f < current.f) {
        current = node;
        currentIndex = index;
      }
    });
    
    // Check if we reached the target
    if (current.pos.x === target.x && current.pos.y === target.y) {
      const path: Position[] = [];
      let temp = current;
      while (temp.parent) {
        path.push(temp.pos);
        temp = temp.parent;
      }
      return path.reverse();
    }
    
    // Move current node from open to closed set
    openSet.splice(currentIndex, 1);
    closedSet.add(`${current.pos.x},${current.pos.y}`);
    
    // Check neighbors
    const neighbors = getNeighbors(current.pos, grid);
    for (const neighbor of neighbors) {
      if (closedSet.has(`${neighbor.x},${neighbor.y}`)) continue;
      
      const g = current.g + 1;
      const h = heuristic(neighbor, target);
      const neighborNode = new Node(neighbor, current, g, h);
      
      const existingNode = openSet.find(n => n.pos.x === neighbor.x && n.pos.y === neighbor.y);
      if (!existingNode) {
        openSet.push(neighborNode);
      } else if (g < existingNode.g) {
        existingNode.g = g;
        existingNode.f = g + existingNode.h;
        existingNode.parent = current;
      }
    }
  }
  
  return [];
}

class Node {
  pos: Position;
  parent: Node | null;
  g: number;
  h: number;
  f: number;
  
  constructor(pos: Position, parent: Node | null, g: number, h: number) {
    this.pos = pos;
    this.parent = parent;
    this.g = g;
    this.h = h;
    this.f = g + h;
  }
}

function heuristic(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getNeighbors(pos: Position, grid: EntityType[][]): Position[] {
  const neighbors: Position[] = [];
  const directions = [
    { x: 0, y: -1 }, // up
    { x: 0, y: 1 },  // down
    { x: -1, y: 0 }, // left
    { x: 1, y: 0 }   // right
  ];
  
  for (const dir of directions) {
    const newPos = {
      x: pos.x + dir.x,
      y: pos.y + dir.y
    };
    
    // Check bounds and walls
    if (newPos.y >= 0 && newPos.y < grid.length &&
        newPos.x >= 0 && newPos.x < grid[0].length &&
        grid[newPos.y][newPos.x] !== 'WALL') {
      neighbors.push(newPos);
    }
  }
  
  return neighbors;
}