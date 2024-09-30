import * as view from "./view.js";
import * as model from "./model.js";

let interval;
let generation = 0;
let GRID_WIDTH = model.GRID_WIDTH;
let GRID_HEIGHT = model.GRID_HEIGHT;

init();

function init() {
  console.log("inint game of life");
  view.init();
  model.init();

  view.createBoard();
  createCells();
  startGame();
}

function updateGrid() {
  const isDead = checkIfGridIsDead();
  if (isDead == false) {
    iterateGeneration();
    model.scanGrid();
    view.renderGrid(model.grid);
  } else {
    endGame();
  }
}

function iterateGeneration() {
  generation++;
  document.querySelector(
    "#count"
  ).textContent = `This is generation: ${generation}`;
}

function startGame() {
  interval = setInterval(updateGrid, 1000);
}

function endGame() {
  clearInterval(interval);
}

function checkIfGridIsDead() {
  let amountOfDeadCells = 0;
  let size = model.grid.size();

  for (let row = 0; row < model.grid.rows; row++) {
    for (let col = 0; col < model.grid.cols; col++) {
      const value = model.grid.get(row, col);
      if (value === 0) {
        amountOfDeadCells++;
      }
    }
  }

  if (amountOfDeadCells === size) {
    return true;
  } else {
    return false;
  }
}

function emptyGrid() {
  clearInterval(interval);
  model.grid.fill(0);
  console.log("Game is Dead");
  view.renderGrid(model.grid);
}

function addRandomCells() {
  console.log("updating");
  for (let row = 0; row < model.grid.rows; row++) {
    for (let col = 0; col < model.grid.cols; col++) {
      const value = model.grid.get(row, col);

      if (value === 0) {
        const randomCells = Math.random();
        console.log(randomCells);

        if (randomCells < 0.5) {
          model.grid.set(row, col, 1);
        }
      }
    }
  }
  updateGrid();
}

function createCells() {
  const board = document.querySelector("#board");

  console.log("height ", GRID_HEIGHT, "wieght ", GRID_WIDTH);

  for (let row = 0; row < GRID_HEIGHT; row++) {
    console.log("This is my row ", row);
    for (let col = 0; col < GRID_WIDTH; col++) {
      console.log("This is my col ", col);
      const cell = document.createElement("div");
      cell.classList.add("cell");
      // adds the row and column data to the cell element
      cell.dataset.row = row;
      cell.dataset.col = col;
      // adds cell to the board
      board.appendChild(cell);

      if (Math.random() < 0.5) {
        model.grid.set(row, col, 1);
      } else {
        model.grid.set(row, col, 0);
      }
    }
  }
  view.renderGrid(model.grid); // Initial render of the grid
}

export { init, startGame, addRandomCells, emptyGrid, GRID_HEIGHT, GRID_WIDTH };
