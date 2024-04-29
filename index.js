let gameBoard = document.getElementById("game_board");
let scoreBoard = document.getElementById("score_board");
let nextBlock = document.getElementById("next_block_board");


let widthBoard = window.getComputedStyle(gameBoard).getPropertyValue("width");
let heightBoard = window.getComputedStyle(gameBoard).getPropertyValue("height");

console.log(widthBoard);
console.log(heightBoard);

let tile = {
  size: 26,
  isMoving: true 
};

console.log(tile);

const boardArr = [];

const numberOfColumns = Math.floor(parseFloat(widthBoard) / tile.size);
const numberOfRows = Math.floor(parseFloat(heightBoard) / tile.size);

for (let i = 0; i < numberOfRows; i++) {
  const row = [];
  for (let j = 0; j < numberOfColumns; j++) {
    row.push({ ...tile });
  }
  boardArr.push(row);
}

console.log(boardArr);


function createSegment(top, left, color) {
  const segment = document.createElement("div");
  segment.className = `block ${color}-color`;
  segment.style.top = `${top}px`;
  segment.style.left = `${left}px`;
  return segment;
}

function createBlock(color, layout) {
  const collection = document.createElement("div");
  collection.className = "block-group";

  layout.forEach(([top, left]) => {
    collection.appendChild(createSegment(top, left, color));
  });

  return collection;
}

const skyblueLayout = [
  [0, 0],
  [tile.size, 0],
  [2*tile.size, 0],
  [3*tile.size, 0],
];

const orangeLayout = [
  [0, 0],
  [tile.size, 0],
  [0, tile.size],
  [tile.size, tile.size],
];

const yellowLayout = [
  [0, 0],
  [tile.size, 0],
  [2*tile.size, 0],
  [2*tile.size, tile.size],
];

const greenLayout = [
  [0, tile.size],
  [0, 2*tile.size],
  [tile.size, 0],
  [tile.size, tile.size],
];

const pinkLayout = [
  [0, 0],
  [0, tile.size],
  [tile.size, tile.size],
  [tile.size, 2*tile.size],
];

const blueLayout = [
  [0, tile.size],
  [tile.size, tile.size],
  [2*tile.size, tile.size],
  [2*tile.size, 0],
];

const purpleLayout = [
  [0, 0],
  [0, tile.size],
  [0, 2*tile.size],
  [tile.size, tile.size],
];

// gameBoard.appendChild(createBlock("purple", purpleLayout));
// gameBoard.appendChild(createBlock("orange", orangeLayout));
gameBoard.appendChild(createBlock("yellow", yellowLayout));
// gameBoard.appendChild(createBlock("green", greenLayout));
// gameBoard.appendChild(createBlock("skyblue", skyblueLayout));
// gameBoard.appendChild(createBlock("pink", pinkLayout));
// gameBoard.appendChild(createBlock("blue", blueLayout));
