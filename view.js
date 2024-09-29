import * as controller from "./controller.js";

function init() {
  console.log("controller is live");

  document
    .querySelector("#empty_grid_btn")
    .addEventListener("click", controller.emptyGrid);
  document
    .querySelector("#add_cells_btn")
    .addEventListener("click", controller.addRandomCells);
  document
    .querySelector("#restart_btn")
    .addEventListener("click", controller.startGame);
}

function renderGrid(grid) {
  const board = document.querySelector("#board");
  console.table(controller.grid);
  for (let row = 0; row < controller.GRID_HEIGHT; row++) {
    for (let col = 0; col < controller.GRID_WIDTH; col++) {
      const cell = board.querySelector(
        `[data-row='${row}'][data-col='${col}']`
      );
      if (controller.grid.get(row, col) === 1) {
        cell.style.backgroundColor = "black";
      } else {
        cell.style.backgroundColor = "white";
      }
    }
  }
}

function createBoard() {
  const board = document.querySelector("#board");
  board.style.setProperty("--GRID_WIDTH", controller.GRID_WIDTH);
  board.style.setProperty("--GRID_HEIGHT", controller.GRID_HEIGHT);
}

export { init, createBoard, renderGrid };
