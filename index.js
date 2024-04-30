let gameBoard = document.getElementById("game_board");
let scoreBoard = document.getElementById("score_board");
let nextBlock = document.getElementById("next_block_board");

let widthBoard = parseFloat(window.getComputedStyle(gameBoard).getPropertyValue("width"));
let heightBoard = parseFloat(window.getComputedStyle(gameBoard).getPropertyValue("height"));

console.log(widthBoard);
console.log(heightBoard);

let tile = {
  size: 26,
  isMoving: true 
};

console.log(tile);

const boardArr = [];

const numberOfColumns = Math.floor(widthBoard / tile.size);
const numberOfRows = Math.floor(heightBoard / tile.size);

for (let i = 0; i < numberOfRows; i++) {
  const row = [];
  for (let j = 0; j < numberOfColumns; j++) {
    row.push({ ...tile });
  }
  boardArr.push(row);
}

console.log(boardArr);


function createSegment(bottom, left, color) {
  const segment = document.createElement("div");
  segment.className = `block ${color}-color`;
  segment.style.bottom = `${bottom}px`;
  segment.style.left = `${left}px`;
  return segment;
}

function createBlock(color, layout) {
  const collection = document.createElement("div");
  collection.className = "block-group";

  layout.forEach(([bottom, left]) => {
    collection.appendChild(createSegment(bottom, left, color));
  });

  return collection;
}


const blockTypes = [
  {
    layout: [
      [23 * tile.size, 0],
      [22 * tile.size, 0],
      [21 * tile.size, 0],
      [20 * tile.size, 0],
    ],
    color: "skyblue",
  },
  {
    layout: [
      [21 * tile.size, 0],
      [20 * tile.size, 0],
      [21 * tile.size, tile.size],
      [20 * tile.size, tile.size],
    ],
    color: "orange",
  },
  {
    layout: [
      [22 * tile.size, 0],
      [21 * tile.size, 0],
      [20 * tile.size, 0],
      [20 * tile.size, tile.size],
    ],
    color: "yellow",
  },
  {
    layout: [
      [21 * tile.size, tile.size],
      [21 * tile.size, 2 * tile.size],
      [20 * tile.size, 0],
      [20 * tile.size, tile.size],
    ],
    color: "green",
  },
  {
    layout: [
      [21 * tile.size, 0],
      [21 * tile.size, tile.size],
      [20 * tile.size, tile.size],
      [20 * tile.size, 2 * tile.size],
    ],
    color: "pink",
  },
  {
    layout: [
      [22 * tile.size, tile.size],
      [21 * tile.size, tile.size],
      [20 * tile.size, tile.size],
      [20 * tile.size, 0],
    ],
    color: "blue",
  },
  {
    layout: [
      [21 * tile.size, 0],
      [21 * tile.size, tile.size],
      [21 * tile.size, 2 * tile.size],
      [20 * tile.size, tile.size],
    ],
    color: "purple",
  },
];


function moveBlockDown(block, intervalTime) {
  let bottom = parseFloat(block.style.bottom || 0);
  let moveInterval;

  function startInterval() {
    moveInterval = setInterval(() => {
      console.log(bottom);
      bottom -= tile.size; 
      if (bottom < -heightBoard) {
        clearInterval(moveInterval);

      } else {
        block.style.bottom = `${bottom}px`;
      }
    }, intervalTime);
  }
  startInterval();
  return {
    stop: () => clearInterval(moveInterval),
  };
}

function layoutBagSelector(bag) {
  let newBag = [...bag];

  function selectRandom() {
    if (newBag.length === 0) {
      newBag = [...bag];
    }
    const randomIndex = Math.floor(Math.random() * newBag.length);
    const selectedObject = newBag.splice(randomIndex, 1)[0];
    console.log(selectedObject);
    return selectedObject; 
  }
  return selectRandom; 
}

const blockSelector = layoutBagSelector(blockTypes);

const blockArray = [];

function createAndAddBlock() {
  const selectedBlock = blockSelector();
  const newBlock = createBlock(selectedBlock.color, selectedBlock.layout);
  blockArray.push(newBlock);
  newBlock.style.position = "absolute"; 
  newBlock.style.bottom = "0px"; 
  newBlock.style.left = `${4 * tile.size}px`; 

  gameBoard.appendChild(newBlock); 

  const intervalTime = 200; 
  moveBlockDown(newBlock, intervalTime);
  console.log(blockArray);
}

document.addEventListener("keydown", (event) => {
  const activeBlock = blockArray[blockArray.length - 1].block;
  let left = parseFloat(activeBlock.style.left); 

  if (event.key === "ArrowLeft") {
    const newLeft = left - tile.size;
    if (newLeft >= 0) { 
      activeBlock.style.left = `${newLeft}px`;
    }
  } else if (event.key === "ArrowRight") {
    const newLeft = left + tile.size; 
    const maxLeft = widthBoard - tile.size; 
    if (newLeft <= maxLeft) { 
      activeBlock.style.left = `${newLeft}px`;
    }
  }
});


let check = document.getElementById("checking");
check.addEventListener("click", createAndAddBlock);

