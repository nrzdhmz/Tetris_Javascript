let gameBoard = document.getElementById("game_board");
let scoreBoard = document.getElementById("score_board");
let nextBlock = document.getElementById("next_block_board");


let widthBoard = window.getComputedStyle(gameBoard).getPropertyValue("width");
let heightBoard = window.getComputedStyle(gameBoard).getPropertyValue("height");

let colorBag = ["purple","pink","orange","yellow","green","skyblue","blue"];

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

function moveBlockDown(block, intervalTime) {
  let top = parseFloat(block.style.top || 0);
  
  const moveInterval = setInterval(() => {
    top += tile.size; 
    
    if (top + tile.size > parseFloat(heightBoard)) {
      clearInterval(moveInterval);
      top = parseFloat(heightBoard) - tile.size;
    }

    block.style.top = `${top}px`; 
  }, intervalTime);

  return moveInterval;
}


const newBlock = createBlock("purple", purpleLayout);
gameBoard.appendChild(newBlock);

newBlock.style.position = "absolute";
newBlock.style.top = "0px"; 
newBlock.style.left = `${4*tile.size}px`;  

const intervalTime = 300;
const blockMovement = moveBlockDown(newBlock, intervalTime);
