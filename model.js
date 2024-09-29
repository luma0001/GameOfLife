import { Grid } from "./grid.js";

const GRID_HEIGHT = 10;
const GRID_WIDTH = 10;

let grid = new Grid(GRID_HEIGHT, GRID_WIDTH);

function init() {
  console.log("model");
}

function scanGrid() {
  let nextGeneration = new Grid(GRID_HEIGHT, GRID_HEIGHT);

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_HEIGHT; col++) {
      const newValue = decideIfCellDiesOrLives(row, col);
      nextGeneration.set(row, col, newValue);
    }
  }
  grid = nextGeneration;
}

function decideIfCellDiesOrLives(row, col) {
  let newValue;
  let value = grid.get(row, col);
  let neighbours = countNeightbours(row, col);
  if (neighbours < 2 || neighbours > 3) {
    newValue = 0;
  } else if (neighbours == 2) {
    newValue = value;
  } else if (neighbours == 3) {
    newValue = 1;
  }
  console.log("old value: ", value, " new value", newValue);
  return newValue;
}

function countNeightbours(row, col) {
  console.log("count: ", row, ": ", col);
  let count = 0;
  const neighbourArray = grid.neighboursWithCheck(row, col);
  console.log("nbh ", neighbourArray);
  for (const cell of neighbourArray) {
    if (cell === 1) {
      count++;
    }
  }
  return count;
}

export { init, GRID_HEIGHT, GRID_WIDTH, grid, scanGrid };
