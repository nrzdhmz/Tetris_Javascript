let gameBoard = document.getElementById("game_board");
let scoreBoard = document.getElementById("score_board");
let nextBlock = document.getElementById("next_block_board");

let widthBoard = parseFloat(window.getComputedStyle(gameBoard).getPropertyValue("width"));
let heightBoard = parseFloat(window.getComputedStyle(gameBoard).getPropertyValue("height"));

let tile = {
  size: 26,
  isMoving: true 
};


function getBottomClassName(bottom) {
  return `bottom-${bottom}`;
}

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
  // {
  //   layout: [
  //     [23 * tile.size, 0],
  //     [22 * tile.size, 0],
  //     [21 * tile.size, 0],
  //     [20 * tile.size, 0],
  //   ],
  //   maxLeft: tile.size ,
  //   color: "skyblue",
  // },
  {
    layout: [
      [21 * tile.size, 0],
      [20 * tile.size, 0],
      [21 * tile.size, tile.size],
      [20 * tile.size, tile.size],
    ],
    maxLeft: 1 * tile.size ,
    color: "orange",
  },
  // {
  //   layout: [
  //     [22 * tile.size, 0],
  //     [21 * tile.size, 0],
  //     [20 * tile.size, 0],
  //     [20 * tile.size, tile.size],
  //   ],
  //   maxLeft: 1 * tile.size ,
  //   color: "yellow",
  // },
  // {
  //   layout: [
  //     [21 * tile.size, tile.size],
  //     [21 * tile.size, 2 * tile.size],
  //     [20 * tile.size, 0],
  //     [20 * tile.size, tile.size],
  //   ],
  //   maxLeft: 1 * tile.size ,
  //   color: "green",
  // },
  // {
  //   layout: [
  //     [21 * tile.size, 0],
  //     [21 * tile.size, tile.size],
  //     [20 * tile.size, tile.size],
  //     [20 * tile.size, 2 * tile.size],
  //   ],
  //   maxLeft: 1 * tile.size ,
  //   color: "pink",
  // },
  // {
  //   layout: [
  //     [22 * tile.size, tile.size],
  //     [21 * tile.size, tile.size],
  //     [20 * tile.size, tile.size],
  //     [20 * tile.size, 0],
  //   ],
  //   maxLeft: 1 * tile.size ,
  //   color: "blue",
  // },
  // {
  //   layout: [
  //     [21 * tile.size, 0],
  //     [21 * tile.size, tile.size],
  //     [21 * tile.size, 2 * tile.size],
  //     [20 * tile.size, tile.size],
  //   ],
  //   maxLeft: 1 * tile.size ,
  //   color: "purple",
  // },
];

const stoppedSegments = [];

function checkCollision(segmentBottom, segmentLeft) {
  if (segmentBottom < 0) {
    return true;
  }

  for (const segment of stoppedSegments) {
    if (
      segment.bottom === segmentBottom && 
      segment.left === segmentLeft
    ) {
      return true;
    }
  }

  return false;
}

function groupRows(stoppedSegments) {
  const rows = {};

  for (const segment of stoppedSegments) {
    const bottom = (segment.bottom)/26;

    if (!rows[bottom]) {
      rows[bottom] = [];
    }
    rows[bottom].push(segment);
  }
  return rows;
}

function moveBlockDown(blockGroup, intervalTime) {
  let moveInterval;

  function startInterval() {
    moveInterval = setInterval(() => {
      let canMove = true;

      for (const segment of blockGroup.children) {
        let bottom = parseFloat(segment.style.bottom) - tile.size;
        let left = parseFloat(segment.style.left);
        if (checkCollision(bottom, left)) {
          canMove = false;
          break;
        }
      }

      if (canMove) {
        for (const segment of blockGroup.children) {
          let bottom = parseFloat(segment.style.bottom);
          segment.style.bottom = `${bottom - tile.size}px`;
        }
      } else {
        clearInterval(moveInterval);

        while (blockGroup.children.length > 0) {
          const segment = blockGroup.children[0];
          const bottom = parseFloat(segment.style.bottom);
          const left = parseFloat(segment.style.left);

          segment.style.position = "absolute";
          segment.className += ` ${getBottomClassName(bottom)}`;
          gameBoard.appendChild(segment);

          stoppedSegments.push({ bottom, left });
        }

        gameBoard.removeChild(blockGroup);

        let rowArray = groupRows(stoppedSegments);
        let maxLength = Object.keys(rowArray).length;

        if (19 > maxLength) {
          createAndAddBlock();
        }
        clearRows();
      }
    }, intervalTime);
  }

  startInterval();
}


function clearRows() {
  const divElements = document.getElementsByTagName("div");
  const classCount = {};

  for (const div of divElements) {
    const classList = div.classList;
    for (const className of classList) {
      if (className.startsWith("bottom")) {
        if (!classCount[className]) {
          classCount[className] = 1; 
        } else {
          classCount[className] += 1;
        }
      }
    }
  }

  const classesToDelete = [];
  for (const className in classCount) {
    if (classCount[className] >= 10) {
      classesToDelete.push(className); 
    }
  }

  for (const className of classesToDelete) {
    const elementsToDelete = document.getElementsByClassName(className);
    while (elementsToDelete.length > 0) {
      elementsToDelete[0].parentNode.removeChild(elementsToDelete[0]); 
    }
  }
}

function layoutBagSelector(bag) {
  let newBag = [...bag];

  function selectRandom() {
    if (newBag.length === 0) {
      newBag = [...bag];
    }
    const randomIndex = Math.floor(Math.random() * newBag.length);
    const selectedObject = newBag.splice(randomIndex, 1)[0];
    // console.log(selectedObject);

    return selectedObject; 
  }
  return selectRandom; 
}

const blockSelector = layoutBagSelector(blockTypes);

const blockArray = [];

let currentBlockInfo;

function createAndAddBlock() {
  const selectedBlock = blockSelector();
  const newBlock = createBlock(selectedBlock.color, selectedBlock.layout);
  blockArray.push({ block: newBlock, isMoving: true });
  currentBlockInfo = { block: newBlock, maxLeft: selectedBlock.maxLeft };
  newBlock.style.position = "absolute"; 
  newBlock.style.bottom = "0px"; 
  newBlock.style.left = "0px"; 

  gameBoard.appendChild(newBlock); 

  const intervalTime = 100; 
  moveBlockDown(newBlock, intervalTime);
  // console.log(blockArray);
  // console.log(stoppedSegments); 
  // Example usage 
}

function isBlockMoving() {
  const activeBlock = blockArray[blockArray.length - 1];
  return activeBlock && activeBlock.isMoving;
}

document.addEventListener("keydown", (event) => {
  if (!isBlockMoving()) {
    return;
  }

  const activeBlock = currentBlockInfo.block;
  const maxLeft = widthBoard - currentBlockInfo.maxLeft;
  const tileSize = tile.size;

  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    let canMove = true;
    let direction = event.key === "ArrowLeft" ? -tileSize : tileSize;

    for (const segment of activeBlock.children) {
      let left = parseFloat(segment.style.left);
      if ((direction < 0 && left + direction < 0) ||
          (direction > 0 && left + direction > maxLeft)) {
        canMove = false;
        break;
      }
    }

    if (canMove) {
      for (const segment of activeBlock.children) {
        let left = parseFloat(segment.style.left);
        segment.style.left = `${left + direction}px`;
      }
    }
  }
});



createAndAddBlock();