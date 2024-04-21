"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["main"],{

/***/ "./src/array-search.js":
/*!*****************************!*\
  !*** ./src/array-search.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayIncludesArray: () => (/* binding */ arrayIncludesArray)
/* harmony export */ });
const arrayIncludesArray = function (parentArray, childArray) {
  let getIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let currentIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  if (parentArray.length === 0) {
    return false;
  }
  if (parentArray[0].length !== childArray.length) {
    parentArray = parentArray.slice(1);
    return arrayIncludesArray(parentArray, childArray, getIndex, currentIndex + 1);
  }
  for (let i = 0; i < childArray.length; i++) {
    if (childArray[i] !== parentArray[0][i]) {
      parentArray = parentArray.slice(1);
      return arrayIncludesArray(parentArray, childArray, getIndex, currentIndex + 1);
    }
  }
  if (getIndex) {
    return currentIndex;
  }
  return true;
};


/***/ }),

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Computer: () => (/* binding */ Computer),
/* harmony export */   Gameboard: () => (/* binding */ Gameboard),
/* harmony export */   Player: () => (/* binding */ Player),
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var _array_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array-search */ "./src/array-search.js");

const Ship = function (length) {
  let hitCount = 0;
  let sunk = false;
  const hit = function () {
    hitCount += 1;
  };
  const isSunk = function () {
    if (length === hitCount) {
      sunk = true;
    }
    return sunk;
  };
  return {
    hit,
    isSunk
  };
};
const Gameboard = function () {
  let shipCoordinates = [];
  let receivedAttacks = [];
  const isOccupied = function (coordinates) {
    for (let i = 0; i < shipCoordinates.length; i++) {
      if ((0,_array_search__WEBPACK_IMPORTED_MODULE_0__.arrayIncludesArray)(shipCoordinates[i].coordinates, coordinates)) {
        return shipCoordinates[i].ship;
      }
    }
    return false;
  };
  const isOutsideGameboard = function (coordinates) {
    if (coordinates[0] < 0 || coordinates[0] > 9 || coordinates[1] < 0 || coordinates[1] > 9) {
      return true;
    }
    return false;
  };
  const placeShip = function (length, startCoord, orientation) {
    const newShip = Ship(length);
    let coordinates = [startCoord];
    let clashingShips = false;
    if (orientation === 'horizontal') {
      for (let i = 0; i < length && clashingShips === false; i++) {
        if (isOccupied([startCoord[0], startCoord[1] + i])) return false;
        if (isOutsideGameboard([startCoord[0], startCoord[1] + i])) return false;
      }
      for (let i = 1; i < length; i++) {
        coordinates.push([startCoord[0], startCoord[1] + i]);
      }
    } else {
      for (let i = 0; i < length && clashingShips === false; i++) {
        if (isOccupied([startCoord[0] + i, startCoord[1]])) return false;
        if (isOutsideGameboard([startCoord[0] + i, startCoord[1]])) return false;
      }
      for (let i = 1; i < length; i++) {
        coordinates.push([startCoord[0] + i, startCoord[1]]);
      }
    }
    shipCoordinates.push({
      ship: newShip,
      coordinates
    });
    return true;
  };
  const receiveAttack = function (coordinates) {
    const ship = isOccupied(coordinates);
    if (ship !== false) {
      ship.hit();
    }
    receivedAttacks.push(coordinates);
  };
  const isAllSunk = function () {
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (shipCoordinates[i].ship.isSunk() === false) return false;
    }
    return true;
  };
  return {
    shipCoordinates,
    receivedAttacks,
    placeShip,
    receiveAttack,
    isAllSunk,
    isOccupied,
    isOutsideGameboard
  };
};
const Player = function (name) {
  const playerName = name;
  const playerGameboard = Gameboard();
  const attack = function (target, coordinates) {
    target.playerGameboard.receiveAttack(coordinates);
  };
  return {
    playerName,
    playerGameboard,
    attack
  };
};
const Computer = function () {
  const playerName = 'Player 2';
  const playerGameboard = Gameboard();
  const attackCoordinates = [];
  let successfulAttack;
  let successfulAttackVerticalAdjacent = [];
  let successfulAttackHorizontalAdjacent = [];
  let adjacentMode = false;
  let orientation;
  let diagonalAttackQueue = [];
  let i = 0;
  let j = 0;
  const randomAttack = function (target) {
    while (true) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      if ((0,_array_search__WEBPACK_IMPORTED_MODULE_0__.arrayIncludesArray)(attackCoordinates, [row, column])) {
        continue;
      }
      target.playerGameboard.receiveAttack([row, column]);
      attackCoordinates.push([row, column]);
      return [row, column];
    }
  };
  const getAdjacentMoves = function (coordinates) {
    const verticalMoves = [[1, 0], [-1, 0]];
    const horizontalMoves = [[0, 1], [0, -1]];
    let verticalCoordinates = [];
    let horizontalCoordinates = [];
    for (let i = 0; i < verticalMoves.length; i++) {
      const adjacentCoordinate = [coordinates[0] + verticalMoves[i][0], coordinates[1] + verticalMoves[i][1]];
      if (!playerGameboard.isOutsideGameboard(adjacentCoordinate) && !(0,_array_search__WEBPACK_IMPORTED_MODULE_0__.arrayIncludesArray)(attackCoordinates, adjacentCoordinate)) {
        verticalCoordinates.push([adjacentCoordinate, 'vertical']);
      }
    }
    for (let i = 0; i < horizontalMoves.length; i++) {
      const adjacentCoordinate = [coordinates[0] + horizontalMoves[i][0], coordinates[1] + horizontalMoves[i][1]];
      if (!playerGameboard.isOutsideGameboard(adjacentCoordinate) && !(0,_array_search__WEBPACK_IMPORTED_MODULE_0__.arrayIncludesArray)(attackCoordinates, adjacentCoordinate)) {
        horizontalCoordinates.push([adjacentCoordinate, 'horizontal']);
      }
    }
    return {
      verticalCoordinates,
      horizontalCoordinates
    };
  };
  const adjacentAttack = function (target) {
    if (!adjacentMode) {
      const [row, column] = randomAttack(target);
      if (target.playerGameboard.isOccupied([row, column])) {
        adjacentMode = true;
        successfulAttack = [row, column];
        getAdjacentMoves(successfulAttack).verticalCoordinates.forEach(move => successfulAttackVerticalAdjacent.push(move));
        getAdjacentMoves(successfulAttack).horizontalCoordinates.forEach(move => successfulAttackHorizontalAdjacent.push(move));
      }
      return [row, column];
    } else {
      let row, column;
      let orientation;
      if (successfulAttackVerticalAdjacent.length === 0 || orientation === 'horizontal') {
        [row, column] = successfulAttackHorizontalAdjacent.shift()[0];
        orientation = 'horizontal';
      } else {
        [row, column] = successfulAttackVerticalAdjacent.shift()[0];
        orientation = 'vertical';
      }
      const index = (0,_array_search__WEBPACK_IMPORTED_MODULE_0__.arrayIncludesArray)(diagonalAttackQueue, [row, column], true);
      target.playerGameboard.receiveAttack([row, column]);
      attackCoordinates.push([row, column]);
      if (index !== false) {
        diagonalAttackQueue.splice(index, 1);
      }
      if (target.playerGameboard.isOccupied([row, column])) {
        if (target.playerGameboard.isOccupied([row, column]).isSunk()) {
          successfulAttackVerticalAdjacent = [];
          successfulAttackHorizontalAdjacent = [];
          adjacentMode = false;
        } else {
          if (orientation === 'horizontal') {
            successfulAttack = [row, column];
            getAdjacentMoves(successfulAttack).horizontalCoordinates.forEach(move => successfulAttackHorizontalAdjacent.push(move));
          } else {
            successfulAttack = [row, column];
            getAdjacentMoves(successfulAttack).verticalCoordinates.forEach(move => successfulAttackVerticalAdjacent.push(move));
          }
        }
      }
      return [row, column];
    }
  };
  const getDiagonalMoves = function (coordinates) {
    const possibleMoves = [[1, 1], [-1, 1], [1, -1], [-1, -1]];
    let diagonalCoordinates = [];
    possibleMoves.forEach(move => {
      const diagonalCoordinate = [coordinates[0] + move[0], coordinates[1] + move[1]];
      if (!playerGameboard.isOutsideGameboard(diagonalCoordinate) && !(0,_array_search__WEBPACK_IMPORTED_MODULE_0__.arrayIncludesArray)(attackCoordinates, diagonalCoordinate) && !(0,_array_search__WEBPACK_IMPORTED_MODULE_0__.arrayIncludesArray)(diagonalAttackQueue, diagonalCoordinate)) {
        diagonalCoordinates.push(diagonalCoordinate);
      }
    });
    return diagonalCoordinates;
  };
  const diagonalAttack = function (target) {
    if (!adjacentMode) {
      let row, column;
      if (attackCoordinates.length === 0) {
        [row, column] = randomAttack(target);
        getDiagonalMoves([row, column]).forEach(coordinates => {
          diagonalAttackQueue.push(coordinates);
        });
      } else {
        [row, column] = diagonalAttackQueue[i];
        target.playerGameboard.receiveAttack([row, column]);
        attackCoordinates.push([row, column]);
        getDiagonalMoves([row, column]).forEach(coordinates => {
          diagonalAttackQueue.push(coordinates);
        });
        i += 1;
      }
      if (target.playerGameboard.isOccupied([row, column])) {
        adjacentMode = true;
        successfulAttack = [row, column];
        getAdjacentMoves(successfulAttack).verticalCoordinates.forEach(move => successfulAttackVerticalAdjacent.push(move));
        getAdjacentMoves(successfulAttack).horizontalCoordinates.forEach(move => successfulAttackHorizontalAdjacent.push(move));
      }
      return [row, column];
    } else {
      return adjacentAttack(target);
    }
  };
  const randomPlaceShips = function () {
    const shipLengths = [5, 4, 3, 3, 2];
    const orientations = ['horizontal', 'vertical'];
    let i = 0;
    while (playerGameboard.shipCoordinates.length < 5) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const orientation = orientations[Math.floor(Math.random() * 2)];
      const successfulPlacement = playerGameboard.placeShip(shipLengths[i], [row, column], orientation);
      if (successfulPlacement) {
        i += 1;
      }
    }
  };
  const unfairAttack = function (target) {
    const [row, column] = target.playerGameboard.shipCoordinates[i].coordinates[j];
    target.playerGameboard.receiveAttack([row, column]);
    attackCoordinates.push([row, column]);
    if (j === target.playerGameboard.shipCoordinates[i].coordinates.length - 1) {
      j = 0;
      i += 1;
    } else {
      j += 1;
    }
    return [row, column];
  };
  return {
    playerName,
    playerGameboard,
    randomAttack,
    adjacentAttack,
    diagonalAttack,
    unfairAttack,
    randomPlaceShips
  };
};


/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideDifficulties: () => (/* binding */ hideDifficulties),
/* harmony export */   hideGame: () => (/* binding */ hideGame),
/* harmony export */   hideOptions: () => (/* binding */ hideOptions),
/* harmony export */   loadPassingScreen: () => (/* binding */ loadPassingScreen),
/* harmony export */   print: () => (/* binding */ print),
/* harmony export */   renderGameboard: () => (/* binding */ renderGameboard),
/* harmony export */   restartGameboards: () => (/* binding */ restartGameboards),
/* harmony export */   showAttack: () => (/* binding */ showAttack),
/* harmony export */   showDifficulties: () => (/* binding */ showDifficulties),
/* harmony export */   showGame: () => (/* binding */ showGame),
/* harmony export */   showNames: () => (/* binding */ showNames),
/* harmony export */   showOptions: () => (/* binding */ showOptions),
/* harmony export */   showPlaceShip: () => (/* binding */ showPlaceShip),
/* harmony export */   stopPassingScreen: () => (/* binding */ stopPassingScreen),
/* harmony export */   toggleOrientationButton: () => (/* binding */ toggleOrientationButton)
/* harmony export */ });
const hideOptions = function () {
  const options = document.querySelector('#game-options');
  options.classList.add('hidden');
};
const showOptions = function () {
  const options = document.querySelector('#game-options');
  options.classList.remove('hidden');
};
const hideGame = function () {
  const game = document.querySelector('#game');
  game.classList.add('hidden');
};
const showGame = function () {
  const game = document.querySelector('#game');
  game.classList.remove('hidden');
};
const hideDifficulties = function () {
  const difficulty = document.querySelector('#difficulty');
  difficulty.classList.add('hidden');
};
const showDifficulties = function () {
  const difficulty = document.querySelector('#difficulty');
  difficulty.classList.remove('hidden');
};
const showNames = function (playerOne, playerTwo) {
  const playerOneTitle = document.querySelector('[class*="title"][data-player="Player 1"]');
  const playerTwoTitle = document.querySelector('[class*="title"][data-player="Player 2"]');
  playerOneTitle.textContent = playerOne;
  playerTwoTitle.textContent = playerTwo;
};
const loadPassingScreen = function (nextFunction) {
  const game = document.querySelector('#game');
  const passingScreen = document.querySelector('#passing-screen');
  const nextButton = document.createElement('button');
  game.classList.add('hidden');
  passingScreen.classList.remove('hidden');
  nextButton.id = 'next';
  nextButton.textContent = 'Next turn';
  passingScreen.appendChild(nextButton);
  nextButton.addEventListener('click', () => {
    nextFunction();
    stopPassingScreen();
    passingScreen.removeChild(nextButton);
  });
};
const stopPassingScreen = function () {
  const game = document.querySelector('#game');
  const passingScreen = document.querySelector('#passing-screen');
  game.classList.remove('hidden');
  passingScreen.classList.add('hidden');
};
const renderGameboard = function (player, hidden) {
  for (let i = 0; i < player.playerGameboard.shipCoordinates.length; i++) {
    for (let j = 0; j < player.playerGameboard.shipCoordinates[i].coordinates.length; j++) {
      const grid = document.querySelector(`[data-player='${player.playerName}'][data-row='${player.playerGameboard.shipCoordinates[i].coordinates[j][0]}'][data-column='${player.playerGameboard.shipCoordinates[i].coordinates[j][1]}']`);
      if (!grid.classList.contains('occupied')) {
        grid.classList.add('occupied');
      }
      ;
      if (hidden) {
        grid.classList.add('hidden');
      } else {
        grid.classList.remove('hidden');
      }
    }
  }
  for (let i = 0; i < player.playerGameboard.receivedAttacks.length; i++) {
    const grid = document.querySelector(`[data-player='${player.playerName}'][data-row='${player.playerGameboard.receivedAttacks[i][0]}'][data-column='${player.playerGameboard.receivedAttacks[i][1]}']`);
    grid.classList.add('hit');
  }
};
const showPlaceShip = function (player, length) {
  const playerGrids = document.querySelectorAll(`[data-player='${player.playerName}'][class*='grid']`);
  let shownGrids = [];
  const addClass = function (event) {
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const grids = [];
    const [row, column] = [Number(event.target.getAttribute('data-row')), Number(event.target.getAttribute('data-column'))];
    Array.from(playerGrids).forEach(grid => grid.classList.remove('hover-place', 'outside-grid'));
    shownGrids = [];
    if (orientation === 'horizontal') {
      for (let i = 0; i < length; i++) {
        const grid = document.querySelector(`[data-row='${row}'][data-column='${column + i}'][data-player='${player.playerName}']`);
        grids.push(grid);
        if (!player.playerGameboard.isOccupied([row, column + i]) && !player.playerGameboard.isOutsideGameboard([row, column + i])) {
          shownGrids.push([row, column]);
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        const grid = document.querySelector(`[data-row='${row + i}'][data-column='${column}'][data-player='${player.playerName}']`);
        grids.push(grid);
        if (!player.playerGameboard.isOccupied([row + i, column]) && !player.playerGameboard.isOutsideGameboard([row + i, column])) {
          shownGrids.push([row, column]);
        }
      }
    }
    for (let i = 0; i < grids.length; i++) {
      if (grids[i] === null) {
        grids.forEach(grid => {
          if (grid !== null) {
            grid.classList.add('outside-grid');
          }
        });
        return;
      }
    }
    grids.forEach(grid => grid.classList.add('hover-place'));
    event.stopPropagation();
  };
  const removeEvent = function (event) {
    if (shownGrids.length < length) {
      return;
    }
    Array.from(playerGrids).forEach(grid => {
      grid.removeEventListener('mouseover', addClass);
      grid.classList.remove('hover-place', 'outside-grid');
      grid.removeEventListener('click', removeEvent);
    });
    event.stopPropagation();
  };
  Array.from(playerGrids).forEach(grid => {
    grid.addEventListener('mouseover', addClass);
    grid.addEventListener('click', removeEvent);
  });
};
const showAttack = function (target) {
  const targetGrids = document.querySelectorAll(`[data-player='${target.playerName}'][class*='grid']`);
  const addClass = function (event) {
    Array.from(targetGrids).forEach(grid => grid.classList.remove('hover-attack'));
    event.target.classList.add('hover-attack');
    event.stopPropagation();
  };
  const removeEvent = function (event) {
    if (event.target.classList.contains('hit')) {
      return;
    }
    Array.from(targetGrids).forEach(grid => {
      grid.removeEventListener('mouseover', addClass);
      grid.classList.remove('hover-attack');
      grid.removeEventListener('mousedown', removeEvent);
    });
    event.stopPropagation();
  };
  Array.from(targetGrids).forEach(grid => {
    grid.addEventListener('mouseover', addClass);
    grid.addEventListener('mousedown', removeEvent);
  });
};
const print = async function (message, afterDelay) {
  const grids = document.querySelectorAll('.grid');
  const messageContainer = document.querySelector('#text');
  const messageCharacters = message.split('');
  Array.from(grids).forEach(grid => {
    grid.classList.add('unclickable');
  });
  messageContainer.textContent = '';
  for (let i = 0; i < messageCharacters.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 30));
    messageContainer.textContent += messageCharacters[i];
  }
  await new Promise(resolve => setTimeout(resolve, afterDelay));
  Array.from(grids).forEach(grid => {
    grid.classList.remove('unclickable');
  });
};
const toggleOrientationButton = function () {
  const orientationButton = document.querySelector('#orientation');
  orientationButton.addEventListener('click', event => {
    if (event.target.textContent === 'Horizontal') {
      event.target.textContent = 'Vertical';
    } else {
      event.target.textContent = 'Horizontal';
    }
  });
};
const restartGameboards = function () {
  const grids = document.querySelectorAll('.grid');
  Array.from(grids).forEach(grid => {
    grid.classList.remove('occupied');
    grid.classList.remove('hit');
    grid.classList.remove('hidden');
  });
};


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _array_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array-search */ "./src/array-search.js");



const homeScreen = function () {
  const singlePlayer = document.querySelector('#single-player');
  const multiplayer = document.querySelector('#multiplayer');
  const easy = document.querySelector('#easy');
  const medium = document.querySelector('#medium');
  const hard = document.querySelector('#hard');
  const impossible = document.querySelector('#impossible');
  singlePlayer.addEventListener('click', () => {
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideOptions)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showDifficulties)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showNames)('Player', 'Computer');
  });
  multiplayer.addEventListener('click', () => {
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideOptions)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showGame)();
    multiplayerGame();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showNames)('Player 1', 'Player 2');
  });
  easy.addEventListener('click', () => {
    const computer = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Computer)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideDifficulties)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showGame)();
    singlePlayerGame(computer, computer.randomAttack);
  });
  medium.addEventListener('click', () => {
    const computer = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Computer)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideDifficulties)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showGame)();
    singlePlayerGame(computer, computer.adjacentAttack);
  });
  hard.addEventListener('click', () => {
    const computer = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Computer)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideDifficulties)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showGame)();
    singlePlayerGame(computer, computer.diagonalAttack);
  });
  impossible.addEventListener('click', () => {
    const computer = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Computer)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideDifficulties)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showGame)();
    singlePlayerGame(computer, computer.unfairAttack);
  });
};
const singlePlayerGame = async function (computer, attackFunction) {
  const player = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Player)('Player 1');
  const playerGrids = document.querySelectorAll('[data-player="Player 1"][class*="grid"]');
  const computerGrids = document.querySelectorAll('[data-player="Player 2"][class*="grid"]');
  const homeButton = document.querySelector('#home');
  const ships = [{
    length: 5,
    name: 'Carrier'
  }, {
    length: 4,
    name: 'Battleship'
  }, {
    length: 3,
    name: 'Destroyer'
  }, {
    length: 3,
    name: 'Submarine'
  }, {
    length: 2,
    name: 'Patrol Boat'
  }];
  let i = 0;
  const checkEnd = async function () {
    if (player.playerGameboard.isAllSunk()) {
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Computer wins.', 0);
      return true;
    }
    if (computer.playerGameboard.isAllSunk()) {
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Player wins.', 0);
      return true;
    }
    return false;
  };
  const placeShip = async function (event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const successfulPlacement = player.playerGameboard.placeShip(ships[i].length, [row, column], orientation);
    if (!successfulPlacement) return;
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(player, false);
    i += 1;
    if (i < 5) {
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)(`Place your ${ships[i].name}.`, 0);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showPlaceShip)(player, ships[i].length);
      return;
    }
    Array.from(playerGrids).forEach(grid => grid.removeEventListener('click', placeShip));
    await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Computer placing ships...', 600);
    computer.randomPlaceShips();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(computer, true);
    await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Your turn to attack.', 0);
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showAttack)(computer);
    Array.from(computerGrids).forEach(grid => grid.addEventListener('click', attack));
    event.stopPropagation();
  };
  const attack = async function (event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    if ((0,_array_search__WEBPACK_IMPORTED_MODULE_2__.arrayIncludesArray)(computer.playerGameboard.receivedAttacks, [row, column])) {
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('You already attacked this spot. Your turn to attack.', 0);
      return;
    }
    player.attack(computer, [row, column]);
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(computer, true);
    checkPlayerHit: for (let i = 0; i < computer.playerGameboard.shipCoordinates.length; i++) {
      if ((0,_array_search__WEBPACK_IMPORTED_MODULE_2__.arrayIncludesArray)(computer.playerGameboard.shipCoordinates[i].coordinates, [row, column])) {
        if (computer.playerGameboard.shipCoordinates[i].ship.isSunk()) {
          await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('You sunk a ship!', 400);
          break checkPlayerHit;
        }
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('You hit a ship!', 400);
        break checkPlayerHit;
      }
      if (i === computer.playerGameboard.shipCoordinates.length - 1) {
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('You missed.', 400);
      }
    }
    if (await checkEnd()) {
      Array.from(computerGrids).forEach(grid => grid.removeEventListener('click', attack));
      homeButton.classList.remove('hidden');
      homeButton.addEventListener('click', () => {
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.restartGameboards)();
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideGame)();
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showOptions)();
        homeButton.classList.add('hidden');
      });
      return;
    }
    Array.from(computerGrids).forEach(grid => grid.removeEventListener('click', attack));
    await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Enemy is attacking...', 300);
    const [computerRow, computerColumn] = attackFunction(player);
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(player, false);
    checkComputerHit: for (let i = 0; i < player.playerGameboard.shipCoordinates.length; i++) {
      if ((0,_array_search__WEBPACK_IMPORTED_MODULE_2__.arrayIncludesArray)(player.playerGameboard.shipCoordinates[i].coordinates, [computerRow, computerColumn])) {
        if (player.playerGameboard.shipCoordinates[i].ship.isSunk()) {
          await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Enemy sunk a ship!', 400);
          break checkComputerHit;
        }
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Enemy hit a ship!', 400);
        break checkComputerHit;
      }
      if (i === player.playerGameboard.shipCoordinates.length - 1) {
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Enemy missed.', 400);
      }
    }
    if (await checkEnd()) {
      Array.from(computerGrids).forEach(grid => grid.removeEventListener('click', attack));
      homeButton.classList.remove('hidden');
      homeButton.addEventListener('click', () => {
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.restartGameboards)();
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideGame)();
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showOptions)();
        homeButton.classList.add('hidden');
      });
      return;
    }
    await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Your turn to attack.', 0);
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showAttack)(computer);
    Array.from(computerGrids).forEach(grid => grid.addEventListener('click', attack));
    event.stopPropagation();
  };
  await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Place your Carrier.');
  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showPlaceShip)(player, 5);
  Array.from(playerGrids).forEach(grid => grid.addEventListener('click', placeShip));
};
const multiplayerGame = async function () {
  const playerOne = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Player)('Player 1');
  const playerTwo = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Player)('Player 2');
  const playerOneGrids = document.querySelectorAll(`[data-player='Player 1'][class*="grid"]`);
  const playerTwoGrids = document.querySelectorAll(`[data-player='Player 2'][class*="grid"]`);
  const homeButton = document.querySelector('#home');
  const ships = [{
    length: 5,
    name: 'Carrier'
  }, {
    length: 4,
    name: 'Battleship'
  }, {
    length: 3,
    name: 'Destroyer'
  }, {
    length: 3,
    name: 'Submarine'
  }, {
    length: 2,
    name: 'Patrol Boat'
  }];
  let i = 0;
  let currentPlayer = playerOne;
  let targetPlayer;
  const checkEnd = async function () {
    if (playerOne.playerGameboard.isAllSunk()) {
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Player 2 wins.', 0);
      return true;
    }
    if (playerTwo.playerGameboard.isAllSunk()) {
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Player 1 wins.', 0);
      return true;
    }
    return false;
  };
  const placeShip = async function (event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const successfulPlacement = currentPlayer.playerGameboard.placeShip(ships[i].length, [row, column], orientation);
    if (!successfulPlacement) return;
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(currentPlayer, false);
    i += 1;
    if (i < 5) {
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)(`Place your ${ships[i].name}.`, 0);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showPlaceShip)(currentPlayer, ships[i].length);
      return;
    }
    i = 0;
    if (currentPlayer.playerName === 'Player 1') {
      Array.from(playerOneGrids).forEach(grid => grid.removeEventListener('click', placeShip));
      await new Promise(resolve => setTimeout(resolve, 700));
      Array.from(playerOneGrids).forEach(grid => grid.addEventListener('click', placeShip));
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadPassingScreen)(async () => {
        Array.from(playerOneGrids).forEach(grid => grid.removeEventListener('click', placeShip));
        Array.from(playerTwoGrids).forEach(grid => grid.addEventListener('click', placeShip));
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(playerOne, true);
        currentPlayer = playerTwo;
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Player 2, place your Carrier.');
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showPlaceShip)(playerTwo, 5);
      });
    } else {
      Array.from(playerTwoGrids).forEach(grid => grid.removeEventListener('click', placeShip));
      await new Promise(resolve => setTimeout(resolve, 700));
      Array.from(playerTwoGrids).forEach(grid => grid.addEventListener('click', placeShip));
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadPassingScreen)(async () => {
        Array.from(playerTwoGrids).forEach(grid => grid.removeEventListener('click', placeShip));
        Array.from(playerTwoGrids).forEach(grid => grid.addEventListener('click', attack));
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(playerTwo, true);
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(playerOne, false);
        currentPlayer = playerOne;
        targetPlayer = playerTwo;
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)("Player 1's turn to attack.");
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showAttack)(targetPlayer);
      });
    }
  };
  const attack = async function (event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const currentPlayerGrids = document.querySelectorAll(`[data-player='${currentPlayer.playerName}'][class*='grid']`);
    const targetPlayerGrids = document.querySelectorAll(`[data-player='${targetPlayer.playerName}'][class*='grid']`);
    if ((0,_array_search__WEBPACK_IMPORTED_MODULE_2__.arrayIncludesArray)(targetPlayer.playerGameboard.receivedAttacks, [row, column])) {
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)(`You already attacked this spot. ${currentPlayer.playerName}'s turn to attack.`, 0);
      return;
    }
    currentPlayer.attack(targetPlayer, [row, column]);
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(targetPlayer, true);
    checkPlayerHit: for (let i = 0; i < targetPlayer.playerGameboard.shipCoordinates.length; i++) {
      if ((0,_array_search__WEBPACK_IMPORTED_MODULE_2__.arrayIncludesArray)(targetPlayer.playerGameboard.shipCoordinates[i].coordinates, [row, column])) {
        if (targetPlayer.playerGameboard.shipCoordinates[i].ship.isSunk()) {
          await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)(`${currentPlayer.playerName} sunk a ship!`, 400);
          break checkPlayerHit;
        }
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)(`${currentPlayer.playerName} hit a ship!`, 400);
        break checkPlayerHit;
      }
      if (i === targetPlayer.playerGameboard.shipCoordinates.length - 1) {
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)(`${currentPlayer.playerName} missed.`, 400);
      }
    }
    if (await checkEnd()) {
      Array.from(targetPlayerGrids).forEach(grid => grid.removeEventListener('click', attack));
      homeButton.classList.remove('hidden');
      homeButton.addEventListener('click', () => {
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.restartGameboards)();
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideGame)();
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showOptions)();
        homeButton.classList.add('hidden');
      });
      return;
    }
    Array.from(targetPlayerGrids).forEach(grid => grid.removeEventListener('click', attack));
    await new Promise(resolve => setTimeout(resolve, 700));
    Array.from(targetPlayerGrids).forEach(grid => grid.addEventListener('click', attack));
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadPassingScreen)(async () => {
      Array.from(targetPlayerGrids).forEach(grid => grid.removeEventListener('click', attack));
      Array.from(currentPlayerGrids).forEach(grid => grid.addEventListener('click', attack));
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(targetPlayer, false);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(currentPlayer, true);
      const [a, b] = [targetPlayer, currentPlayer];
      targetPlayer = b;
      currentPlayer = a;
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)(`${currentPlayer.playerName}'s turn to attack.`);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showAttack)(targetPlayer);
    });
    event.stopPropagation();
  };
  await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Player 1, place your Carrier.');
  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showPlaceShip)(playerOne, 5);
  Array.from(playerOneGrids).forEach(grid => grid.addEventListener('click', placeShip));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (homeScreen);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



(0,_game__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_dom__WEBPACK_IMPORTED_MODULE_2__.toggleOrientationButton)();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! fonts/Jersey25-Regular.ttf */ "./src/fonts/Jersey25-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! images/water.jpg */ "./src/images/water.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: jersey;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}

body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  background-size: cover;
}

div, p, button {
  color: #cdd5dc;
  font-family: jersey;
  font-size: 1.2rem;
  word-spacing: 5px;
}

button {
  outline: none;
  appearance: none;
  border: none;
  background-color: #414778;
  padding: 8px;
  box-shadow: inset -0.1em -0.2em 0.2em black;
}

button:hover {
  background-color: #515683;
  cursor: pointer;
}

#game-title {
  font-size: 2rem;
}

#game {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

#message {
  height: 64px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  border: 2px solid #cdd5dc;

  #character {
    display: flex;
    align-items: center;

    img {
      
    }
  }

  #textbox {
    padding: 0 8px;
    width: 240px;
    height: 48px;
    display: flex;
    align-items: center;

    #text {
      font-size: 1.1rem;
    }
  }
}

#gameboard-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  p {
    margin: 4px 0 0 0;
  }

  #player-1, #player-2 {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
}

.gameboard {
  width: 120%;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
  row-gap: 2px;
  column-gap: 2px;
  cursor: crosshair;

  .grid {
    border: 1px solid #cdd5dc;
  }
}

.hover-place, .hover-attack, .occupied.hidden.hover-attack {
  background-color: rgb(147, 168, 181);
}

.occupied {
  background-color: rgb(37, 173, 82);
}

.hover-place.occupied {
  background-color: rgb(33, 40, 57);
}

.outside-grid {
  background-color: red;
}

.hit, .hover-attack.hit {
  background-color: blue;
}

.occupied.hidden {
  display:block;
  background: none;
}

.occupied.hit {
  background-color: red;
}

body > div.hidden, button.hidden {
  display: none !important;
}

div.hidden {
  display: none;
}

.unclickable {
  pointer-events: none;
}

#game-options {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 56px;
  justify-content: center;
  align-items: center;
  
  #game-title {
    margin: 0;
    margin-top: -56px;
  }

  #options {
    display: flex;
    gap: 24px;
  }
}

#difficulty {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

@media only screen and (min-width: 540px) {
  #gameboard-container {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }

  .gameboard {
    width: 100%;
  }
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,4CAAoC;AACtC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,yDAAuC;EACvC,sBAAsB;AACxB;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,YAAY;EACZ,yBAAyB;EACzB,YAAY;EACZ,2CAA2C;AAC7C;;AAEA;EACE,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,YAAY;EACZ,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,yBAAyB;;EAEzB;IACE,aAAa;IACb,mBAAmB;;IAEnB;;IAEA;EACF;;EAEA;IACE,cAAc;IACd,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;;IAEnB;MACE,iBAAiB;IACnB;EACF;AACF;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;;EAET;IACE,iBAAiB;EACnB;;EAEA;IACE,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,QAAQ;EACV;AACF;;AAEA;EACE,WAAW;EACX,mBAAmB;EACnB,aAAa;EACb,gDAAgD;EAChD,YAAY;EACZ,eAAe;EACf,iBAAiB;;EAEjB;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,uBAAuB;EACvB,mBAAmB;;EAEnB;IACE,SAAS;IACT,iBAAiB;EACnB;;EAEA;IACE,aAAa;IACb,SAAS;EACX;AACF;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE;IACE,aAAa;IACb,mBAAmB;IACnB,SAAS;EACX;;EAEA;IACE,WAAW;EACb;AACF","sourcesContent":["@font-face {\n  font-family: jersey;\n  src: url(fonts/Jersey25-Regular.ttf);\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-image: url(images/water.jpg);\n  background-size: cover;\n}\n\ndiv, p, button {\n  color: #cdd5dc;\n  font-family: jersey;\n  font-size: 1.2rem;\n  word-spacing: 5px;\n}\n\nbutton {\n  outline: none;\n  appearance: none;\n  border: none;\n  background-color: #414778;\n  padding: 8px;\n  box-shadow: inset -0.1em -0.2em 0.2em black;\n}\n\nbutton:hover {\n  background-color: #515683;\n  cursor: pointer;\n}\n\n#game-title {\n  font-size: 2rem;\n}\n\n#game {\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 24px;\n}\n\n#message {\n  height: 64px;\n  padding: 0 6px;\n  display: flex;\n  align-items: center;\n  border: 2px solid #cdd5dc;\n\n  #character {\n    display: flex;\n    align-items: center;\n\n    img {\n      \n    }\n  }\n\n  #textbox {\n    padding: 0 8px;\n    width: 240px;\n    height: 48px;\n    display: flex;\n    align-items: center;\n\n    #text {\n      font-size: 1.1rem;\n    }\n  }\n}\n\n#gameboard-container {\n  width: 90%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n\n  p {\n    margin: 4px 0 0 0;\n  }\n\n  #player-1, #player-2 {\n    width: 50%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 8px;\n  }\n}\n\n.gameboard {\n  width: 120%;\n  aspect-ratio: 1 / 1;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n  row-gap: 2px;\n  column-gap: 2px;\n  cursor: crosshair;\n\n  .grid {\n    border: 1px solid #cdd5dc;\n  }\n}\n\n.hover-place, .hover-attack, .occupied.hidden.hover-attack {\n  background-color: rgb(147, 168, 181);\n}\n\n.occupied {\n  background-color: rgb(37, 173, 82);\n}\n\n.hover-place.occupied {\n  background-color: rgb(33, 40, 57);\n}\n\n.outside-grid {\n  background-color: red;\n}\n\n.hit, .hover-attack.hit {\n  background-color: blue;\n}\n\n.occupied.hidden {\n  display:block;\n  background: none;\n}\n\n.occupied.hit {\n  background-color: red;\n}\n\nbody > div.hidden, button.hidden {\n  display: none !important;\n}\n\ndiv.hidden {\n  display: none;\n}\n\n.unclickable {\n  pointer-events: none;\n}\n\n#game-options {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 56px;\n  justify-content: center;\n  align-items: center;\n  \n  #game-title {\n    margin: 0;\n    margin-top: -56px;\n  }\n\n  #options {\n    display: flex;\n    gap: 24px;\n  }\n}\n\n#difficulty {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 24px;\n}\n\n@media only screen and (min-width: 540px) {\n  #gameboard-container {\n    display: flex;\n    flex-direction: row;\n    gap: 24px;\n  }\n\n  .gameboard {\n    width: 100%;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/fonts/Jersey25-Regular.ttf":
/*!****************************************!*\
  !*** ./src/fonts/Jersey25-Regular.ttf ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "124a1cfeb3bb037fee5b.ttf";

/***/ }),

/***/ "./src/images/water.jpg":
/*!******************************!*\
  !*** ./src/images/water.jpg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b56deeb9619d265aa4b9.jpg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FycmF5LXNlYXJjaC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcnJheUluY2x1ZGVzQXJyYXkgPSBmdW5jdGlvbihwYXJlbnRBcnJheSwgY2hpbGRBcnJheSwgZ2V0SW5kZXggPSBmYWxzZSwgY3VycmVudEluZGV4ID0gMCkge1xuICBpZiAocGFyZW50QXJyYXkubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZSB9XG4gIGlmIChwYXJlbnRBcnJheVswXS5sZW5ndGggIT09IGNoaWxkQXJyYXkubGVuZ3RoKSB7XG4gICAgcGFyZW50QXJyYXkgPSBwYXJlbnRBcnJheS5zbGljZSgxKTtcbiAgICByZXR1cm4gYXJyYXlJbmNsdWRlc0FycmF5KHBhcmVudEFycmF5LCBjaGlsZEFycmF5LCBnZXRJbmRleCwgY3VycmVudEluZGV4ICsgMSk7XG4gIH1cbiAgZm9yIChsZXQgaT0wOyBpPGNoaWxkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2hpbGRBcnJheVtpXSAhPT0gcGFyZW50QXJyYXlbMF1baV0pIHsgXG4gICAgICBwYXJlbnRBcnJheSA9IHBhcmVudEFycmF5LnNsaWNlKDEpO1xuICAgICAgcmV0dXJuIGFycmF5SW5jbHVkZXNBcnJheShwYXJlbnRBcnJheSwgY2hpbGRBcnJheSwgZ2V0SW5kZXgsIGN1cnJlbnRJbmRleCArIDEpXG4gICAgfVxuICB9XG4gIGlmIChnZXRJbmRleCkgeyByZXR1cm4gY3VycmVudEluZGV4IH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgeyBhcnJheUluY2x1ZGVzQXJyYXkgfTsiLCJpbXBvcnQgeyBhcnJheUluY2x1ZGVzQXJyYXkgfSBmcm9tIFwiLi9hcnJheS1zZWFyY2hcIjtcblxuY29uc3QgU2hpcCA9IGZ1bmN0aW9uKGxlbmd0aCkge1xuICBsZXQgaGl0Q291bnQgPSAwO1xuICBsZXQgc3VuayA9IGZhbHNlO1xuXG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uKCkge1xuICAgIGhpdENvdW50ICs9IDE7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxlbmd0aCA9PT0gaGl0Q291bnQpIHtcbiAgICAgIHN1bmsgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc3VuaztcbiAgfTtcblxuICByZXR1cm4geyBoaXQsIGlzU3VuayB9O1xufVxuXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbigpIHtcbiAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuICBsZXQgcmVjZWl2ZWRBdHRhY2tzID0gW107XG5cbiAgY29uc3QgaXNPY2N1cGllZCA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgZm9yIChsZXQgaT0wOyBpPHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShzaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMsIGNvb3JkaW5hdGVzKSkge1xuICAgICAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzW2ldLnNoaXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBpc091dHNpZGVHYW1lYm9hcmQgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGlmIChjb29yZGluYXRlc1swXSA8IDAgfHwgY29vcmRpbmF0ZXNbMF0gPiA5IHx8IGNvb3JkaW5hdGVzWzFdIDwgMCB8fCBjb29yZGluYXRlc1sxXSA+IDkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24obGVuZ3RoLCBzdGFydENvb3JkLCBvcmllbnRhdGlvbikge1xuICAgIGNvbnN0IG5ld1NoaXAgPSBTaGlwKGxlbmd0aCk7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gW3N0YXJ0Q29vcmRdO1xuICAgIGxldCBjbGFzaGluZ1NoaXBzID0gZmFsc2U7XG4gIFxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBmb3IgKGxldCBpPTA7IChpPGxlbmd0aCAmJiBjbGFzaGluZ1NoaXBzID09PSBmYWxzZSk7IGkrKykge1xuICAgICAgICBpZiAoaXNPY2N1cGllZChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoaXNPdXRzaWRlR2FtZWJvYXJkKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpPTE7IGk8bGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaT0wOyAoaTxsZW5ndGggJiYgY2xhc2hpbmdTaGlwcyA9PT0gZmFsc2UpOyBpKyspIHtcbiAgICAgICAgaWYgKGlzT2NjdXBpZWQoW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGlzT3V0c2lkZUdhbWVib2FyZChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaT0xOyBpPGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hpcENvb3JkaW5hdGVzLnB1c2goeyBzaGlwOiBuZXdTaGlwLCBjb29yZGluYXRlcyB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBzaGlwID0gaXNPY2N1cGllZChjb29yZGluYXRlcyk7XG4gICAgaWYgKHNoaXAgIT09IGZhbHNlKSB7XG4gICAgICBzaGlwLmhpdCgpO1xuICAgIH1cbiAgICByZWNlaXZlZEF0dGFja3MucHVzaChjb29yZGluYXRlcyk7XG4gIH07XG5cbiAgY29uc3QgaXNBbGxTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGk8c2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiB7IHNoaXBDb29yZGluYXRlcywgcmVjZWl2ZWRBdHRhY2tzLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGlzQWxsU3VuaywgaXNPY2N1cGllZCwgaXNPdXRzaWRlR2FtZWJvYXJkIH07XG59O1xuXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQsIGNvb3JkaW5hdGVzKSB7XG4gICAgdGFyZ2V0LnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJOYW1lLCBwbGF5ZXJHYW1lYm9hcmQsIGF0dGFjayB9O1xufTtcblxuY29uc3QgQ29tcHV0ZXIgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgcGxheWVyTmFtZSA9ICdQbGF5ZXIgMic7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBhdHRhY2tDb29yZGluYXRlcyA9IFtdO1xuICBsZXQgc3VjY2Vzc2Z1bEF0dGFjaztcbiAgbGV0IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50ID0gW107XG4gIGxldCBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50ID0gW107XG4gIGxldCBhZGphY2VudE1vZGUgPSBmYWxzZTtcbiAgbGV0IG9yaWVudGF0aW9uO1xuICBsZXQgZGlhZ29uYWxBdHRhY2tRdWV1ZSA9IFtdO1xuICBsZXQgaSA9IDA7XG4gIGxldCBqID0gMDtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KGF0dGFja0Nvb3JkaW5hdGVzLCBbcm93LCBjb2x1bW5dKSkgeyBjb250aW51ZSB9XG4gICAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XG4gICAgICBhdHRhY2tDb29yZGluYXRlcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEFkamFjZW50TW92ZXMgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGNvbnN0IHZlcnRpY2FsTW92ZXMgPSBbWzEsIDBdLCBbLTEsIDBdXTtcbiAgICBjb25zdCBob3Jpem9udGFsTW92ZXMgPSBbWzAsIDFdLCBbMCwgLTFdXTtcbiAgICBsZXQgdmVydGljYWxDb29yZGluYXRlcyA9IFtdO1xuICAgIGxldCBob3Jpem9udGFsQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx2ZXJ0aWNhbE1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhZGphY2VudENvb3JkaW5hdGUgPSBbY29vcmRpbmF0ZXNbMF0gKyB2ZXJ0aWNhbE1vdmVzW2ldWzBdLCBjb29yZGluYXRlc1sxXSArIHZlcnRpY2FsTW92ZXNbaV1bMV1dO1xuICAgICAgaWYgKCFwbGF5ZXJHYW1lYm9hcmQuaXNPdXRzaWRlR2FtZWJvYXJkKGFkamFjZW50Q29vcmRpbmF0ZSkgJiYgIWFycmF5SW5jbHVkZXNBcnJheShhdHRhY2tDb29yZGluYXRlcywgYWRqYWNlbnRDb29yZGluYXRlKSkge1xuICAgICAgICB2ZXJ0aWNhbENvb3JkaW5hdGVzLnB1c2goW2FkamFjZW50Q29vcmRpbmF0ZSwgJ3ZlcnRpY2FsJ10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGk9MDsgaTxob3Jpem9udGFsTW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkamFjZW50Q29vcmRpbmF0ZSA9IFtjb29yZGluYXRlc1swXSArIGhvcml6b250YWxNb3Zlc1tpXVswXSwgY29vcmRpbmF0ZXNbMV0gKyBob3Jpem9udGFsTW92ZXNbaV1bMV1dO1xuICAgICAgaWYgKCFwbGF5ZXJHYW1lYm9hcmQuaXNPdXRzaWRlR2FtZWJvYXJkKGFkamFjZW50Q29vcmRpbmF0ZSkgJiYgIWFycmF5SW5jbHVkZXNBcnJheShhdHRhY2tDb29yZGluYXRlcywgYWRqYWNlbnRDb29yZGluYXRlKSkge1xuICAgICAgICBob3Jpem9udGFsQ29vcmRpbmF0ZXMucHVzaChbYWRqYWNlbnRDb29yZGluYXRlLCAnaG9yaXpvbnRhbCddKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyB2ZXJ0aWNhbENvb3JkaW5hdGVzLCBob3Jpem9udGFsQ29vcmRpbmF0ZXMgfTtcbiAgfTtcblxuICBjb25zdCBhZGphY2VudEF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXG4gICAgaWYgKCFhZGphY2VudE1vZGUpIHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbHVtbl0gPSByYW5kb21BdHRhY2sodGFyZ2V0KTtcblxuICAgICAgaWYgKHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICBhZGphY2VudE1vZGUgPSB0cnVlO1xuICAgICAgICBzdWNjZXNzZnVsQXR0YWNrID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS52ZXJ0aWNhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLmhvcml6b250YWxDb29yZGluYXRlcy5mb3JFYWNoKChtb3ZlKSA9PiBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByb3csIGNvbHVtbjtcbiAgICAgIGxldCBvcmllbnRhdGlvbjtcbiAgICAgIGlmIChzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudC5sZW5ndGggPT09IDAgfHwgb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBbcm93LCBjb2x1bW5dID0gc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudC5zaGlmdCgpWzBdO1xuICAgICAgICBvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtyb3csIGNvbHVtbl0gPSBzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudC5zaGlmdCgpWzBdO1xuICAgICAgICBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gYXJyYXlJbmNsdWRlc0FycmF5KGRpYWdvbmFsQXR0YWNrUXVldWUsIFtyb3csIGNvbHVtbl0sIHRydWUpO1xuXG4gICAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XG4gICAgICBhdHRhY2tDb29yZGluYXRlcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgaWYgKGluZGV4ICE9PSBmYWxzZSkge1xuICAgICAgICBkaWFnb25hbEF0dGFja1F1ZXVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICh0YXJnZXQucGxheWVyR2FtZWJvYXJkLmlzT2NjdXBpZWQoW3JvdywgY29sdW1uXSkpIHtcbiAgICAgICAgaWYgKHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93LCBjb2x1bW5dKS5pc1N1bmsoKSkge1xuICAgICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50ID0gW107XG4gICAgICAgICAgc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudCA9IFtdO1xuICAgICAgICAgIGFkamFjZW50TW9kZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBzdWNjZXNzZnVsQXR0YWNrID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgICAgIGdldEFkamFjZW50TW92ZXMoc3VjY2Vzc2Z1bEF0dGFjaykuaG9yaXpvbnRhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2sgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS52ZXJ0aWNhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldERpYWdvbmFsTW92ZXMgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGNvbnN0IHBvc3NpYmxlTW92ZXMgPSBbWzEsIDFdLCBbLTEsIDFdLCBbMSwgLTFdLCBbLTEsIC0xXV07XG4gICAgbGV0IGRpYWdvbmFsQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIHBvc3NpYmxlTW92ZXMuZm9yRWFjaCgobW92ZSkgPT4ge1xuICAgICAgY29uc3QgZGlhZ29uYWxDb29yZGluYXRlID0gW2Nvb3JkaW5hdGVzWzBdICsgbW92ZVswXSwgY29vcmRpbmF0ZXNbMV0gKyBtb3ZlWzFdXTtcbiAgICAgIGlmICghcGxheWVyR2FtZWJvYXJkLmlzT3V0c2lkZUdhbWVib2FyZChkaWFnb25hbENvb3JkaW5hdGUpICYmICFhcnJheUluY2x1ZGVzQXJyYXkoYXR0YWNrQ29vcmRpbmF0ZXMsIGRpYWdvbmFsQ29vcmRpbmF0ZSkgJiYgIWFycmF5SW5jbHVkZXNBcnJheShkaWFnb25hbEF0dGFja1F1ZXVlLCBkaWFnb25hbENvb3JkaW5hdGUpKSB7XG4gICAgICAgIGRpYWdvbmFsQ29vcmRpbmF0ZXMucHVzaChkaWFnb25hbENvb3JkaW5hdGUpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGRpYWdvbmFsQ29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgY29uc3QgZGlhZ29uYWxBdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcblxuICAgIGlmICghYWRqYWNlbnRNb2RlKSB7XG4gICAgICBsZXQgcm93LCBjb2x1bW47XG4gICAgICBpZiAoYXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIFtyb3csIGNvbHVtbl0gPSByYW5kb21BdHRhY2sodGFyZ2V0KTtcbiAgICAgICAgZ2V0RGlhZ29uYWxNb3Zlcyhbcm93LCBjb2x1bW5dKS5mb3JFYWNoKChjb29yZGluYXRlcykgPT4geyBkaWFnb25hbEF0dGFja1F1ZXVlLnB1c2goY29vcmRpbmF0ZXMpIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbcm93LCBjb2x1bW5dID0gZGlhZ29uYWxBdHRhY2tRdWV1ZVtpXTtcbiAgICAgICAgdGFyZ2V0LnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFtyb3csIGNvbHVtbl0pO1xuICAgICAgICBhdHRhY2tDb29yZGluYXRlcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgICBnZXREaWFnb25hbE1vdmVzKFtyb3csIGNvbHVtbl0pLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7IGRpYWdvbmFsQXR0YWNrUXVldWUucHVzaChjb29yZGluYXRlcykgfSlcbiAgICAgICAgaSArPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICBhZGphY2VudE1vZGUgPSB0cnVlO1xuICAgICAgICBzdWNjZXNzZnVsQXR0YWNrID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS52ZXJ0aWNhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLmhvcml6b250YWxDb29yZGluYXRlcy5mb3JFYWNoKChtb3ZlKSA9PiBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhZGphY2VudEF0dGFjayh0YXJnZXQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByYW5kb21QbGFjZVNoaXBzID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgY29uc3Qgb3JpZW50YXRpb25zID0gWydob3Jpem9udGFsJywgJ3ZlcnRpY2FsJ107XG4gICAgbGV0IGkgPSAwO1xuXG4gICAgd2hpbGUgKHBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIDwgNSkge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xuICAgICAgY29uc3Qgc3VjY2Vzc2Z1bFBsYWNlbWVudCA9IHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aHNbaV0sIFtyb3csIGNvbHVtbl0sIG9yaWVudGF0aW9uKTtcbiAgICAgIGlmIChzdWNjZXNzZnVsUGxhY2VtZW50KSB7IGkgKz0gMSB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVuZmFpckF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIGNvbnN0IFtyb3csIGNvbHVtbl0gPSB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXTtcbiAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XG4gICAgYXR0YWNrQ29vcmRpbmF0ZXMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICBcbiAgICBpZiAoaiA9PT0gdGFyZ2V0LnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgaiA9IDA7XG4gICAgICBpICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGogKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcblxuICB9XG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgcGxheWVyR2FtZWJvYXJkLCByYW5kb21BdHRhY2ssIGFkamFjZW50QXR0YWNrLCBkaWFnb25hbEF0dGFjaywgdW5mYWlyQXR0YWNrLCByYW5kb21QbGFjZVNoaXBzIH07XG59XG5cbmV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyLCBDb21wdXRlciB9OyIsImNvbnN0IGhpZGVPcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1vcHRpb25zJyk7XG5cbiAgb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IHNob3dPcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1vcHRpb25zJyk7XG5cbiAgb3B0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IGhpZGVHYW1lID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpO1xuXG4gIGdhbWUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBzaG93R2FtZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKTtcblxuICBnYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufTtcblxuY29uc3QgaGlkZURpZmZpY3VsdGllcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBkaWZmaWN1bHR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpZmZpY3VsdHknKTtcblxuICBkaWZmaWN1bHR5LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufTtcblxuY29uc3Qgc2hvd0RpZmZpY3VsdGllcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBkaWZmaWN1bHR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpZmZpY3VsdHknKTtcblxuICBkaWZmaWN1bHR5LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufTtcblxuY29uc3Qgc2hvd05hbWVzID0gZnVuY3Rpb24ocGxheWVyT25lLCBwbGF5ZXJUd28pIHtcbiAgY29uc3QgcGxheWVyT25lVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwidGl0bGVcIl1bZGF0YS1wbGF5ZXI9XCJQbGF5ZXIgMVwiXScpO1xuICBjb25zdCBwbGF5ZXJUd29UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJ0aXRsZVwiXVtkYXRhLXBsYXllcj1cIlBsYXllciAyXCJdJyk7XG5cbiAgcGxheWVyT25lVGl0bGUudGV4dENvbnRlbnQgPSBwbGF5ZXJPbmU7XG4gIHBsYXllclR3b1RpdGxlLnRleHRDb250ZW50ID0gcGxheWVyVHdvO1xufTtcblxuY29uc3QgbG9hZFBhc3NpbmdTY3JlZW4gPSBmdW5jdGlvbihuZXh0RnVuY3Rpb24pIHtcbiAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc2luZy1zY3JlZW4nKTtcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gIGdhbWUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIHBhc3NpbmdTY3JlZW4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgbmV4dEJ1dHRvbi5pZCA9ICduZXh0JztcbiAgbmV4dEJ1dHRvbi50ZXh0Q29udGVudCA9ICdOZXh0IHR1cm4nO1xuICBwYXNzaW5nU2NyZWVuLmFwcGVuZENoaWxkKG5leHRCdXR0b24pO1xuXG4gIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbmV4dEZ1bmN0aW9uKCk7XG4gICAgc3RvcFBhc3NpbmdTY3JlZW4oKTtcbiAgICBwYXNzaW5nU2NyZWVuLnJlbW92ZUNoaWxkKG5leHRCdXR0b24pO1xuICB9KTtcblxufTtcblxuY29uc3Qgc3RvcFBhc3NpbmdTY3JlZW4gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc2luZy1zY3JlZW4nKTtcblxuICBnYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICBwYXNzaW5nU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCByZW5kZXJHYW1lYm9hcmQgPSBmdW5jdGlvbihwbGF5ZXIsIGhpZGRlbikge1xuICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqPTA7IGo8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wbGF5ZXI9JyR7cGxheWVyLnBsYXllck5hbWV9J11bZGF0YS1yb3c9JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXNbal1bMF19J11bZGF0YS1jb2x1bW49JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXNbal1bMV19J11gKTtcbiAgICAgIGlmICghZ3JpZC5jbGFzc0xpc3QuY29udGFpbnMoJ29jY3VwaWVkJykpIHtncmlkLmNsYXNzTGlzdC5hZGQoJ29jY3VwaWVkJyl9O1xuICAgICAgaWYgKGhpZGRlbikge1xuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICB9IGVsc2UgeyBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpIH1cbiAgICB9XG4gIH1cbiAgZm9yIChsZXQgaT0wOyBpPHBsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBsYXllcj0nJHtwbGF5ZXIucGxheWVyTmFtZX0nXVtkYXRhLXJvdz0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrc1tpXVswXX0nXVtkYXRhLWNvbHVtbj0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrc1tpXVsxXX0nXWApO1xuICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIH1cbn07XG5cbmNvbnN0IHNob3dQbGFjZVNoaXAgPSBmdW5jdGlvbihwbGF5ZXIsIGxlbmd0aCkge1xuICBjb25zdCBwbGF5ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nJHtwbGF5ZXIucGxheWVyTmFtZX0nXVtjbGFzcyo9J2dyaWQnXWApO1xuICBsZXQgc2hvd25HcmlkcyA9IFtdO1xuXG4gIGNvbnN0IGFkZENsYXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmllbnRhdGlvbicpLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgZ3JpZHMgPSBbXTtcbiAgICBjb25zdCBbcm93LCBjb2x1bW5dID0gW051bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKSwgTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpXTtcblxuICAgIEFycmF5LmZyb20ocGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXItcGxhY2UnLCAnb3V0c2lkZS1ncmlkJykpO1xuICAgIHNob3duR3JpZHMgPSBbXTtcblxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBmb3IgKGxldCBpPTA7IGk8bGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz0nJHtyb3d9J11bZGF0YS1jb2x1bW49JyR7Y29sdW1uICsgaX0nXVtkYXRhLXBsYXllcj0nJHtwbGF5ZXIucGxheWVyTmFtZX0nXWApO1xuICAgICAgICBncmlkcy5wdXNoKGdyaWQpO1xuICAgICAgICBpZiAoIXBsYXllci5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93LCBjb2x1bW4gKyBpXSkgJiYgIXBsYXllci5wbGF5ZXJHYW1lYm9hcmQuaXNPdXRzaWRlR2FtZWJvYXJkKFtyb3csIGNvbHVtbiArIGldKSkge1xuICAgICAgICAgIHNob3duR3JpZHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpPTA7IGk8bGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXJvdz0nJHtyb3cgKyBpfSddW2RhdGEtY29sdW1uPScke2NvbHVtbn0nXVtkYXRhLXBsYXllcj0nJHtwbGF5ZXIucGxheWVyTmFtZX0nXWApO1xuICAgICAgICBncmlkcy5wdXNoKGdyaWQpO1xuICAgICAgICBpZiAoIXBsYXllci5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93ICsgaSwgY29sdW1uXSkgJiYgIXBsYXllci5wbGF5ZXJHYW1lYm9hcmQuaXNPdXRzaWRlR2FtZWJvYXJkKFtyb3cgKyBpLCBjb2x1bW5dKSkge1xuICAgICAgICAgIHNob3duR3JpZHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGk9MDsgaTxncmlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGdyaWRzW2ldID09PSBudWxsKSB7XG4gICAgICAgIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgICAgICBpZiAoZ3JpZCAhPT0gbnVsbCkge2dyaWQuY2xhc3NMaXN0LmFkZCgnb3V0c2lkZS1ncmlkJyl9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIGdyaWRzLmZvckVhY2goKGdyaWQpID0+IGdyaWQuY2xhc3NMaXN0LmFkZCgnaG92ZXItcGxhY2UnKSk7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKHNob3duR3JpZHMubGVuZ3RoIDwgbGVuZ3RoKSB7IHJldHVybiB9XG4gICAgQXJyYXkuZnJvbShwbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBhZGRDbGFzcyk7XG4gICAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyLXBsYWNlJywgJ291dHNpZGUtZ3JpZCcpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUV2ZW50KTtcbiAgICB9KVxuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgQXJyYXkuZnJvbShwbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgYWRkQ2xhc3MpO1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVFdmVudCk7XG4gIH0pXG59O1xuXG5jb25zdCBzaG93QXR0YWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIGNvbnN0IHRhcmdldEdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGxheWVyPScke3RhcmdldC5wbGF5ZXJOYW1lfSddW2NsYXNzKj0nZ3JpZCddYCk7XG5cbiAgY29uc3QgYWRkQ2xhc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgIEFycmF5LmZyb20odGFyZ2V0R3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXItYXR0YWNrJykpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdob3Zlci1hdHRhY2snKTtcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGl0JykpIHsgcmV0dXJuIH1cbiAgICBBcnJheS5mcm9tKHRhcmdldEdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGFkZENsYXNzKTtcbiAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXItYXR0YWNrJyk7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHJlbW92ZUV2ZW50KTtcbiAgICB9KVxuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgQXJyYXkuZnJvbSh0YXJnZXRHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgYWRkQ2xhc3MpO1xuICAgIGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcmVtb3ZlRXZlbnQpO1xuICB9KVxufTtcblxuY29uc3QgcHJpbnQgPSBhc3luYyBmdW5jdGlvbihtZXNzYWdlLCBhZnRlckRlbGF5KSB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQnKTtcbiAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0ZXh0Jyk7XG4gIGNvbnN0IG1lc3NhZ2VDaGFyYWN0ZXJzID0gbWVzc2FnZS5zcGxpdCgnJyk7XG5cbiAgQXJyYXkuZnJvbShncmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge2dyaWQuY2xhc3NMaXN0LmFkZCgndW5jbGlja2FibGUnKX0pO1xuICBtZXNzYWdlQ29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XG5cbiAgZm9yIChsZXQgaT0wOyBpPG1lc3NhZ2VDaGFyYWN0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMzApKTtcbiAgICBtZXNzYWdlQ29udGFpbmVyLnRleHRDb250ZW50ICs9IG1lc3NhZ2VDaGFyYWN0ZXJzW2ldO1xuICB9XG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIGFmdGVyRGVsYXkpKTtcbiAgQXJyYXkuZnJvbShncmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge2dyaWQuY2xhc3NMaXN0LnJlbW92ZSgndW5jbGlja2FibGUnKX0pO1xufTtcblxuY29uc3QgdG9nZ2xlT3JpZW50YXRpb25CdXR0b24gPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgb3JpZW50YXRpb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKTtcbiAgb3JpZW50YXRpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSAnSG9yaXpvbnRhbCcpIHtcbiAgICAgIGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9ICdWZXJ0aWNhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9ICdIb3Jpem9udGFsJztcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgcmVzdGFydEdhbWVib2FyZHMgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCcpO1xuXG4gIEFycmF5LmZyb20oZ3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ29jY3VwaWVkJyk7XG4gICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKTtcbiAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICB9KTtcbiB9O1xuXG5leHBvcnQgeyBoaWRlT3B0aW9ucywgc2hvd09wdGlvbnMsIGhpZGVHYW1lLCBzaG93R2FtZSwgaGlkZURpZmZpY3VsdGllcywgc2hvd0RpZmZpY3VsdGllcywgc2hvd05hbWVzLCBsb2FkUGFzc2luZ1NjcmVlbiwgc3RvcFBhc3NpbmdTY3JlZW4sIHJlbmRlckdhbWVib2FyZCwgc2hvd1BsYWNlU2hpcCwgc2hvd0F0dGFjaywgcHJpbnQsIHRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uLCByZXN0YXJ0R2FtZWJvYXJkcyB9OyIsImltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgaGlkZU9wdGlvbnMsIHNob3dPcHRpb25zLCBoaWRlR2FtZSwgc2hvd0dhbWUsIHNob3dEaWZmaWN1bHRpZXMsIGhpZGVEaWZmaWN1bHRpZXMsIHNob3dOYW1lcywgbG9hZFBhc3NpbmdTY3JlZW4sIHJlbmRlckdhbWVib2FyZCwgc2hvd1BsYWNlU2hpcCwgc2hvd0F0dGFjaywgcHJpbnQsIHJlc3RhcnRHYW1lYm9hcmRzIH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgYXJyYXlJbmNsdWRlc0FycmF5IH0gZnJvbSAnLi9hcnJheS1zZWFyY2gnO1xuXG5jb25zdCBob21lU2NyZWVuID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHNpbmdsZVBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW5nbGUtcGxheWVyJyk7XG4gIGNvbnN0IG11bHRpcGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI211bHRpcGxheWVyJyk7XG4gIGNvbnN0IGVhc3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWFzeScpO1xuICBjb25zdCBtZWRpdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVkaXVtJyk7XG4gIGNvbnN0IGhhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGFyZCcpO1xuICBjb25zdCBpbXBvc3NpYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltcG9zc2libGUnKTtcblxuICBzaW5nbGVQbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaGlkZU9wdGlvbnMoKTtcbiAgICBzaG93RGlmZmljdWx0aWVzKCk7XG4gICAgc2hvd05hbWVzKCdQbGF5ZXInLCAnQ29tcHV0ZXInKTtcbiAgfSk7XG5cbiAgbXVsdGlwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaGlkZU9wdGlvbnMoKTtcbiAgICBzaG93R2FtZSgpO1xuICAgIG11bHRpcGxheWVyR2FtZSgpO1xuICAgIHNob3dOYW1lcygnUGxheWVyIDEnLCAnUGxheWVyIDInKTtcbiAgfSk7XG5cbiAgZWFzeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG4gICAgaGlkZURpZmZpY3VsdGllcygpO1xuICAgIHNob3dHYW1lKCk7XG4gICAgc2luZ2xlUGxheWVyR2FtZShjb21wdXRlciwgY29tcHV0ZXIucmFuZG9tQXR0YWNrKTtcbiAgfSk7XG5cbiAgbWVkaXVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyID0gQ29tcHV0ZXIoKTtcbiAgICBoaWRlRGlmZmljdWx0aWVzKCk7XG4gICAgc2hvd0dhbWUoKTtcbiAgICBzaW5nbGVQbGF5ZXJHYW1lKGNvbXB1dGVyLCBjb21wdXRlci5hZGphY2VudEF0dGFjayk7XG4gIH0pO1xuXG4gIGhhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICAgIGhpZGVEaWZmaWN1bHRpZXMoKTtcbiAgICBzaG93R2FtZSgpO1xuICAgIHNpbmdsZVBsYXllckdhbWUoY29tcHV0ZXIsIGNvbXB1dGVyLmRpYWdvbmFsQXR0YWNrKTtcbiAgfSk7XG5cbiAgaW1wb3NzaWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG4gICAgaGlkZURpZmZpY3VsdGllcygpO1xuICAgIHNob3dHYW1lKCk7XG4gICAgc2luZ2xlUGxheWVyR2FtZShjb21wdXRlciwgY29tcHV0ZXIudW5mYWlyQXR0YWNrKTtcbiAgfSlcbn07XG5cbmNvbnN0IHNpbmdsZVBsYXllckdhbWUgPSBhc3luYyBmdW5jdGlvbihjb21wdXRlciwgYXR0YWNrRnVuY3Rpb24pIHtcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKCdQbGF5ZXIgMScpO1xuICBjb25zdCBwbGF5ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXllcj1cIlBsYXllciAxXCJdW2NsYXNzKj1cImdyaWRcIl0nKTtcbiAgY29uc3QgY29tcHV0ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXllcj1cIlBsYXllciAyXCJdW2NsYXNzKj1cImdyaWRcIl0nKTtcbiAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob21lJyk7XG4gIGNvbnN0IHNoaXBzID0gW3tsZW5ndGg6IDUsIG5hbWU6ICdDYXJyaWVyJ30sIHtsZW5ndGg6IDQsIG5hbWU6ICdCYXR0bGVzaGlwJ30sIHtsZW5ndGg6IDMsIG5hbWU6ICdEZXN0cm95ZXInfSwge2xlbmd0aDogMywgbmFtZTogJ1N1Ym1hcmluZSd9LCB7bGVuZ3RoOiAyLCBuYW1lOiAnUGF0cm9sIEJvYXQnfV07XG4gIGxldCBpID0gMDtcblxuICBjb25zdCBjaGVja0VuZCA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGlmIChwbGF5ZXIucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICBhd2FpdCBwcmludCgnQ29tcHV0ZXIgd2lucy4nLCAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICBhd2FpdCBwcmludCgnUGxheWVyIHdpbnMuJywgMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBzdWNjZXNzZnVsUGxhY2VtZW50ID0gcGxheWVyLnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcHNbaV0ubGVuZ3RoLCBbcm93LCBjb2x1bW5dLCBvcmllbnRhdGlvbik7XG4gICAgaWYgKCFzdWNjZXNzZnVsUGxhY2VtZW50KSByZXR1cm47XG4gICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllciwgZmFsc2UpO1xuICAgIGkgKz0gMTtcblxuICAgIGlmIChpPDUpIHtcbiAgICAgIGF3YWl0IHByaW50KGBQbGFjZSB5b3VyICR7c2hpcHNbaV0ubmFtZX0uYCwgMCk7XG4gICAgICBzaG93UGxhY2VTaGlwKHBsYXllciwgc2hpcHNbaV0ubGVuZ3RoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgYXdhaXQgcHJpbnQoJ0NvbXB1dGVyIHBsYWNpbmcgc2hpcHMuLi4nLCA2MDApO1xuICAgIGNvbXB1dGVyLnJhbmRvbVBsYWNlU2hpcHMoKTtcbiAgICByZW5kZXJHYW1lYm9hcmQoY29tcHV0ZXIsIHRydWUpO1xuICAgIGF3YWl0IHByaW50KCdZb3VyIHR1cm4gdG8gYXR0YWNrLicsIDApO1xuICAgIHNob3dBdHRhY2soY29tcHV0ZXIpO1xuXG4gICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSBhc3luYyBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG5cbiAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3MsIFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICBhd2FpdCBwcmludCgnWW91IGFscmVhZHkgYXR0YWNrZWQgdGhpcyBzcG90LiBZb3VyIHR1cm4gdG8gYXR0YWNrLicsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLCBbcm93LCBjb2x1bW5dKTtcbiAgICByZW5kZXJHYW1lYm9hcmQoY29tcHV0ZXIsIHRydWUpO1xuICAgIGNoZWNrUGxheWVySGl0OiBcbiAgICAgIGZvciAobGV0IGk9MDsgaTxjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgW3JvdywgY29sdW1uXSkpIHtcbiAgICAgICAgICBpZiAoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmludCgnWW91IHN1bmsgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ1lvdSBoaXQgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgYnJlYWsgY2hlY2tQbGF5ZXJIaXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGF3YWl0IHByaW50KCdZb3UgbWlzc2VkLicsIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBcbiAgICBpZiAoYXdhaXQgY2hlY2tFbmQoKSkge1xuICAgICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gICAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXN0YXJ0R2FtZWJvYXJkcygpO1xuICAgICAgICBoaWRlR2FtZSgpO1xuICAgICAgICBzaG93T3B0aW9ucygpO1xuICAgICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBBcnJheS5mcm9tKGNvbXB1dGVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICBhd2FpdCBwcmludCgnRW5lbXkgaXMgYXR0YWNraW5nLi4uJywgMzAwKTtcbiAgICBjb25zdCBbY29tcHV0ZXJSb3csIGNvbXB1dGVyQ29sdW1uXSA9IGF0dGFja0Z1bmN0aW9uKHBsYXllcik7XG4gICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllciwgZmFsc2UpO1xuICAgIGNoZWNrQ29tcHV0ZXJIaXQ6IFxuICAgICAgZm9yIChsZXQgaT0wOyBpPHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkocGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMsIFtjb21wdXRlclJvdywgY29tcHV0ZXJDb2x1bW5dKSkge1xuICAgICAgICAgIGlmIChwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmludCgnRW5lbXkgc3VuayBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICAgIGJyZWFrIGNoZWNrQ29tcHV0ZXJIaXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHByaW50KCdFbmVteSBoaXQgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgYnJlYWsgY2hlY2tDb21wdXRlckhpdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gcGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGF3YWl0IHByaW50KCdFbmVteSBtaXNzZWQuJywgNDAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgaWYgKGF3YWl0IGNoZWNrRW5kKCkpIHtcbiAgICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVzdGFydEdhbWVib2FyZHMoKTtcbiAgICAgICAgaGlkZUdhbWUoKTtcbiAgICAgICAgc2hvd09wdGlvbnMoKTtcbiAgICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIH0pXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgcHJpbnQoJ1lvdXIgdHVybiB0byBhdHRhY2suJywgMClcbiAgICBzaG93QXR0YWNrKGNvbXB1dGVyKTtcbiAgICBBcnJheS5mcm9tKGNvbXB1dGVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIGF3YWl0IHByaW50KCdQbGFjZSB5b3VyIENhcnJpZXIuJyk7XG4gIHNob3dQbGFjZVNoaXAocGxheWVyLCA1KTtcbiAgQXJyYXkuZnJvbShwbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xufTtcblxuY29uc3QgbXVsdGlwbGF5ZXJHYW1lID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHBsYXllck9uZSA9IFBsYXllcignUGxheWVyIDEnKTtcbiAgY29uc3QgcGxheWVyVHdvID0gUGxheWVyKCdQbGF5ZXIgMicpO1xuICBjb25zdCBwbGF5ZXJPbmVHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nUGxheWVyIDEnXVtjbGFzcyo9XCJncmlkXCJdYCk7XG4gIGNvbnN0IHBsYXllclR3b0dyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGxheWVyPSdQbGF5ZXIgMiddW2NsYXNzKj1cImdyaWRcIl1gKTtcbiAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob21lJyk7XG4gIGNvbnN0IHNoaXBzID0gW3tsZW5ndGg6IDUsIG5hbWU6ICdDYXJyaWVyJ30sIHtsZW5ndGg6IDQsIG5hbWU6ICdCYXR0bGVzaGlwJ30sIHtsZW5ndGg6IDMsIG5hbWU6ICdEZXN0cm95ZXInfSwge2xlbmd0aDogMywgbmFtZTogJ1N1Ym1hcmluZSd9LCB7bGVuZ3RoOiAyLCBuYW1lOiAnUGF0cm9sIEJvYXQnfV07XG4gIGxldCBpID0gMDtcbiAgbGV0IGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gIGxldCB0YXJnZXRQbGF5ZXI7XG5cbiAgY29uc3QgY2hlY2tFbmQgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBpZiAocGxheWVyT25lLnBsYXllckdhbWVib2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgYXdhaXQgcHJpbnQoJ1BsYXllciAyIHdpbnMuJywgMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHBsYXllclR3by5wbGF5ZXJHYW1lYm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgIGF3YWl0IHByaW50KCdQbGF5ZXIgMSB3aW5zLicsIDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGFzeW5jIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgIGNvbnN0IGNvbHVtbiA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmllbnRhdGlvbicpLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3Qgc3VjY2Vzc2Z1bFBsYWNlbWVudCA9IGN1cnJlbnRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwc1tpXS5sZW5ndGgsIFtyb3csIGNvbHVtbl0sIG9yaWVudGF0aW9uKTtcbiAgICBpZiAoIXN1Y2Nlc3NmdWxQbGFjZW1lbnQpIHJldHVybjtcbiAgICByZW5kZXJHYW1lYm9hcmQoY3VycmVudFBsYXllciwgZmFsc2UpO1xuICAgIGkgKz0gMTtcblxuICAgIGlmIChpPDUpIHtcbiAgICAgIGF3YWl0IHByaW50KGBQbGFjZSB5b3VyICR7c2hpcHNbaV0ubmFtZX0uYCwgMCk7XG4gICAgICBzaG93UGxhY2VTaGlwKGN1cnJlbnRQbGF5ZXIsIHNoaXBzW2ldLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaSA9IDA7XG5cbiAgICBpZiAoY3VycmVudFBsYXllci5wbGF5ZXJOYW1lID09PSAnUGxheWVyIDEnKSB7XG4gICAgICBBcnJheS5mcm9tKHBsYXllck9uZUdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCA3MDApKTtcbiAgICAgIEFycmF5LmZyb20ocGxheWVyT25lR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgIGxvYWRQYXNzaW5nU2NyZWVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgQXJyYXkuZnJvbShwbGF5ZXJPbmVHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgICBBcnJheS5mcm9tKHBsYXllclR3b0dyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXJPbmUsIHRydWUpO1xuICAgICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyVHdvXG4gICAgICAgIGF3YWl0IHByaW50KCdQbGF5ZXIgMiwgcGxhY2UgeW91ciBDYXJyaWVyLicpO1xuICAgICAgICBzaG93UGxhY2VTaGlwKHBsYXllclR3bywgNSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgQXJyYXkuZnJvbShwbGF5ZXJUd29HcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNzAwKSk7XG4gICAgICBBcnJheS5mcm9tKHBsYXllclR3b0dyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICBsb2FkUGFzc2luZ1NjcmVlbihhc3luYyAoKSA9PiB7XG4gICAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgICAgQXJyYXkuZnJvbShwbGF5ZXJUd29HcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyVHdvLCB0cnVlKTtcbiAgICAgICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllck9uZSwgZmFsc2UpO1xuICAgICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuICAgICAgICB0YXJnZXRQbGF5ZXIgPSBwbGF5ZXJUd287XG4gICAgICAgIGF3YWl0IHByaW50KFwiUGxheWVyIDEncyB0dXJuIHRvIGF0dGFjay5cIik7XG4gICAgICAgIHNob3dBdHRhY2sodGFyZ2V0UGxheWVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSBhc3luYyBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgY29uc3QgY3VycmVudFBsYXllckdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGxheWVyPScke2N1cnJlbnRQbGF5ZXIucGxheWVyTmFtZX0nXVtjbGFzcyo9J2dyaWQnXWApO1xuICAgIGNvbnN0IHRhcmdldFBsYXllckdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGxheWVyPScke3RhcmdldFBsYXllci5wbGF5ZXJOYW1lfSddW2NsYXNzKj0nZ3JpZCddYCk7XG4gICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheSh0YXJnZXRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrcywgW3JvdywgY29sdW1uXSkpIHsgXG4gICAgICBhd2FpdCBwcmludChgWW91IGFscmVhZHkgYXR0YWNrZWQgdGhpcyBzcG90LiAke2N1cnJlbnRQbGF5ZXIucGxheWVyTmFtZX0ncyB0dXJuIHRvIGF0dGFjay5gLCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3VycmVudFBsYXllci5hdHRhY2sodGFyZ2V0UGxheWVyLCBbcm93LCBjb2x1bW5dKTtcbiAgICByZW5kZXJHYW1lYm9hcmQodGFyZ2V0UGxheWVyLCB0cnVlKTtcbiAgICBjaGVja1BsYXllckhpdDogXG4gICAgICBmb3IgKGxldCBpPTA7IGk8dGFyZ2V0UGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheSh0YXJnZXRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgW3JvdywgY29sdW1uXSkpIHtcbiAgICAgICAgICBpZiAodGFyZ2V0UGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgYXdhaXQgcHJpbnQoYCR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSBzdW5rIGEgc2hpcCFgLCA0MDApO1xuICAgICAgICAgICAgYnJlYWsgY2hlY2tQbGF5ZXJIaXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHByaW50KGAke2N1cnJlbnRQbGF5ZXIucGxheWVyTmFtZX0gaGl0IGEgc2hpcCFgLCA0MDApO1xuICAgICAgICAgIGJyZWFrIGNoZWNrUGxheWVySGl0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSB0YXJnZXRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgYXdhaXQgcHJpbnQoYCR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSBtaXNzZWQuYCwgNDAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIFxuICAgIGlmIChhd2FpdCBjaGVja0VuZCgpKSB7XG4gICAgICBBcnJheS5mcm9tKHRhcmdldFBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHJlc3RhcnRHYW1lYm9hcmRzKCk7XG4gICAgICAgICAgaGlkZUdhbWUoKTtcbiAgICAgICAgICBzaG93T3B0aW9ucygpO1xuICAgICAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIH0pXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIEFycmF5LmZyb20odGFyZ2V0UGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCA3MDApKTtcbiAgICBBcnJheS5mcm9tKHRhcmdldFBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgbG9hZFBhc3NpbmdTY3JlZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgQXJyYXkuZnJvbSh0YXJnZXRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgQXJyYXkuZnJvbShjdXJyZW50UGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgIHJlbmRlckdhbWVib2FyZCh0YXJnZXRQbGF5ZXIsIGZhbHNlKTtcbiAgICAgIHJlbmRlckdhbWVib2FyZChjdXJyZW50UGxheWVyLCB0cnVlKTtcbiAgICAgIGNvbnN0IFthLCBiXSA9IFt0YXJnZXRQbGF5ZXIsIGN1cnJlbnRQbGF5ZXJdO1xuICAgICAgdGFyZ2V0UGxheWVyID0gYjtcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBhO1xuICBcbiAgICAgIGF3YWl0IHByaW50KGAke2N1cnJlbnRQbGF5ZXIucGxheWVyTmFtZX0ncyB0dXJuIHRvIGF0dGFjay5gKTtcbiAgICAgIHNob3dBdHRhY2sodGFyZ2V0UGxheWVyKTtcbiAgICB9KTtcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIGF3YWl0IHByaW50KCdQbGF5ZXIgMSwgcGxhY2UgeW91ciBDYXJyaWVyLicpO1xuICBzaG93UGxhY2VTaGlwKHBsYXllck9uZSwgNSk7XG4gIEFycmF5LmZyb20ocGxheWVyT25lR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaG9tZVNjcmVlbjsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBob21lU2NyZWVuIGZyb20gJy4vZ2FtZSc7XG5pbXBvcnQgeyB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiB9IGZyb20gJy4vZG9tJztcblxuaG9tZVNjcmVlbigpO1xudG9nZ2xlT3JpZW50YXRpb25CdXR0b24oKTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiZm9udHMvSmVyc2V5MjUtUmVndWxhci50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCJpbWFnZXMvd2F0ZXIuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBqZXJzZXk7XG4gIHNyYzogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xufVxuXG5ib2R5IHtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuZGl2LCBwLCBidXR0b24ge1xuICBjb2xvcjogI2NkZDVkYztcbiAgZm9udC1mYW1pbHk6IGplcnNleTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIHdvcmQtc3BhY2luZzogNXB4O1xufVxuXG5idXR0b24ge1xuICBvdXRsaW5lOiBub25lO1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MTQ3Nzg7XG4gIHBhZGRpbmc6IDhweDtcbiAgYm94LXNoYWRvdzogaW5zZXQgLTAuMWVtIC0wLjJlbSAwLjJlbSBibGFjaztcbn1cblxuYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzUxNTY4MztcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4jZ2FtZS10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbn1cblxuI2dhbWUge1xuICBtYXJnaW4tdG9wOiAxNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDI0cHg7XG59XG5cbiNtZXNzYWdlIHtcbiAgaGVpZ2h0OiA2NHB4O1xuICBwYWRkaW5nOiAwIDZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyOiAycHggc29saWQgI2NkZDVkYztcblxuICAjY2hhcmFjdGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICBpbWcge1xuICAgICAgXG4gICAgfVxuICB9XG5cbiAgI3RleHRib3gge1xuICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgIHdpZHRoOiAyNDBweDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgI3RleHQge1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgfVxuICB9XG59XG5cbiNnYW1lYm9hcmQtY29udGFpbmVyIHtcbiAgd2lkdGg6IDkwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxNnB4O1xuXG4gIHAge1xuICAgIG1hcmdpbjogNHB4IDAgMCAwO1xuICB9XG5cbiAgI3BsYXllci0xLCAjcGxheWVyLTIge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gIH1cbn1cblxuLmdhbWVib2FyZCB7XG4gIHdpZHRoOiAxMjAlO1xuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XG4gIHJvdy1nYXA6IDJweDtcbiAgY29sdW1uLWdhcDogMnB4O1xuICBjdXJzb3I6IGNyb3NzaGFpcjtcblxuICAuZ3JpZCB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NkZDVkYztcbiAgfVxufVxuXG4uaG92ZXItcGxhY2UsIC5ob3Zlci1hdHRhY2ssIC5vY2N1cGllZC5oaWRkZW4uaG92ZXItYXR0YWNrIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NywgMTY4LCAxODEpO1xufVxuXG4ub2NjdXBpZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzcsIDE3MywgODIpO1xufVxuXG4uaG92ZXItcGxhY2Uub2NjdXBpZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzMsIDQwLCA1Nyk7XG59XG5cbi5vdXRzaWRlLWdyaWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5oaXQsIC5ob3Zlci1hdHRhY2suaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcbn1cblxuLm9jY3VwaWVkLmhpZGRlbiB7XG4gIGRpc3BsYXk6YmxvY2s7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi5vY2N1cGllZC5oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbmJvZHkgPiBkaXYuaGlkZGVuLCBidXR0b24uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuXG5kaXYuaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnVuY2xpY2thYmxlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbiNnYW1lLW9wdGlvbnMge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNTZweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIFxuICAjZ2FtZS10aXRsZSB7XG4gICAgbWFyZ2luOiAwO1xuICAgIG1hcmdpbi10b3A6IC01NnB4O1xuICB9XG5cbiAgI29wdGlvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiAyNHB4O1xuICB9XG59XG5cbiNkaWZmaWN1bHR5IHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyNHB4O1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDU0MHB4KSB7XG4gICNnYW1lYm9hcmQtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgZ2FwOiAyNHB4O1xuICB9XG5cbiAgLmdhbWVib2FyZCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxtQkFBbUI7RUFDbkIsNENBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtFQUN0Qix5REFBdUM7RUFDdkMsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsY0FBYztFQUNkLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWiwyQ0FBMkM7QUFDN0M7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZCxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHlCQUF5Qjs7RUFFekI7SUFDRSxhQUFhO0lBQ2IsbUJBQW1COztJQUVuQjs7SUFFQTtFQUNGOztFQUVBO0lBQ0UsY0FBYztJQUNkLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjs7SUFFbkI7TUFDRSxpQkFBaUI7SUFDbkI7RUFDRjtBQUNGOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFNBQVM7O0VBRVQ7SUFDRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxVQUFVO0lBQ1YsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsUUFBUTtFQUNWO0FBQ0Y7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixnREFBZ0Q7RUFDaEQsWUFBWTtFQUNaLGVBQWU7RUFDZixpQkFBaUI7O0VBRWpCO0lBQ0UseUJBQXlCO0VBQzNCO0FBQ0Y7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztFQUNULHVCQUF1QjtFQUN2QixtQkFBbUI7O0VBRW5CO0lBQ0UsU0FBUztJQUNULGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLGFBQWE7SUFDYixTQUFTO0VBQ1g7QUFDRjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7RUFDRTtJQUNFLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsU0FBUztFQUNYOztFQUVBO0lBQ0UsV0FBVztFQUNiO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogamVyc2V5O1xcbiAgc3JjOiB1cmwoZm9udHMvSmVyc2V5MjUtUmVndWxhci50dGYpO1xcbn1cXG5cXG5ib2R5IHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChpbWFnZXMvd2F0ZXIuanBnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcblxcbmRpdiwgcCwgYnV0dG9uIHtcXG4gIGNvbG9yOiAjY2RkNWRjO1xcbiAgZm9udC1mYW1pbHk6IGplcnNleTtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgd29yZC1zcGFjaW5nOiA1cHg7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0MTQ3Nzg7XFxuICBwYWRkaW5nOiA4cHg7XFxuICBib3gtc2hhZG93OiBpbnNldCAtMC4xZW0gLTAuMmVtIDAuMmVtIGJsYWNrO1xcbn1cXG5cXG5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzUxNTY4MztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI2dhbWUtdGl0bGUge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4jZ2FtZSB7XFxuICBtYXJnaW4tdG9wOiAxNnB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyNHB4O1xcbn1cXG5cXG4jbWVzc2FnZSB7XFxuICBoZWlnaHQ6IDY0cHg7XFxuICBwYWRkaW5nOiAwIDZweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyOiAycHggc29saWQgI2NkZDVkYztcXG5cXG4gICNjaGFyYWN0ZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgICBpbWcge1xcbiAgICAgIFxcbiAgICB9XFxuICB9XFxuXFxuICAjdGV4dGJveCB7XFxuICAgIHBhZGRpbmc6IDAgOHB4O1xcbiAgICB3aWR0aDogMjQwcHg7XFxuICAgIGhlaWdodDogNDhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG4gICAgI3RleHQge1xcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgICB9XFxuICB9XFxufVxcblxcbiNnYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDE2cHg7XFxuXFxuICBwIHtcXG4gICAgbWFyZ2luOiA0cHggMCAwIDA7XFxuICB9XFxuXFxuICAjcGxheWVyLTEsICNwbGF5ZXItMiB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogOHB4O1xcbiAgfVxcbn1cXG5cXG4uZ2FtZWJvYXJkIHtcXG4gIHdpZHRoOiAxMjAlO1xcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XFxuICByb3ctZ2FwOiAycHg7XFxuICBjb2x1bW4tZ2FwOiAycHg7XFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXG5cXG4gIC5ncmlkIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NkZDVkYztcXG4gIH1cXG59XFxuXFxuLmhvdmVyLXBsYWNlLCAuaG92ZXItYXR0YWNrLCAub2NjdXBpZWQuaGlkZGVuLmhvdmVyLWF0dGFjayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ3LCAxNjgsIDE4MSk7XFxufVxcblxcbi5vY2N1cGllZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzcsIDE3MywgODIpO1xcbn1cXG5cXG4uaG92ZXItcGxhY2Uub2NjdXBpZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMzLCA0MCwgNTcpO1xcbn1cXG5cXG4ub3V0c2lkZS1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLmhpdCwgLmhvdmVyLWF0dGFjay5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG59XFxuXFxuLm9jY3VwaWVkLmhpZGRlbiB7XFxuICBkaXNwbGF5OmJsb2NrO1xcbiAgYmFja2dyb3VuZDogbm9uZTtcXG59XFxuXFxuLm9jY3VwaWVkLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbmJvZHkgPiBkaXYuaGlkZGVuLCBidXR0b24uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuZGl2LmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udW5jbGlja2FibGUge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbiNnYW1lLW9wdGlvbnMge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDU2cHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBcXG4gICNnYW1lLXRpdGxlIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tdG9wOiAtNTZweDtcXG4gIH1cXG5cXG4gICNvcHRpb25zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAyNHB4O1xcbiAgfVxcbn1cXG5cXG4jZGlmZmljdWx0eSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyNHB4O1xcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDU0MHB4KSB7XFxuICAjZ2FtZWJvYXJkLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGdhcDogMjRweDtcXG4gIH1cXG5cXG4gIC5nYW1lYm9hcmQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiYXJyYXlJbmNsdWRlc0FycmF5IiwicGFyZW50QXJyYXkiLCJjaGlsZEFycmF5IiwiZ2V0SW5kZXgiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjdXJyZW50SW5kZXgiLCJzbGljZSIsImkiLCJTaGlwIiwiaGl0Q291bnQiLCJzdW5rIiwiaGl0IiwiaXNTdW5rIiwiR2FtZWJvYXJkIiwic2hpcENvb3JkaW5hdGVzIiwicmVjZWl2ZWRBdHRhY2tzIiwiaXNPY2N1cGllZCIsImNvb3JkaW5hdGVzIiwic2hpcCIsImlzT3V0c2lkZUdhbWVib2FyZCIsInBsYWNlU2hpcCIsInN0YXJ0Q29vcmQiLCJvcmllbnRhdGlvbiIsIm5ld1NoaXAiLCJjbGFzaGluZ1NoaXBzIiwicHVzaCIsInJlY2VpdmVBdHRhY2siLCJpc0FsbFN1bmsiLCJQbGF5ZXIiLCJuYW1lIiwicGxheWVyTmFtZSIsInBsYXllckdhbWVib2FyZCIsImF0dGFjayIsInRhcmdldCIsIkNvbXB1dGVyIiwiYXR0YWNrQ29vcmRpbmF0ZXMiLCJzdWNjZXNzZnVsQXR0YWNrIiwic3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQiLCJzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50IiwiYWRqYWNlbnRNb2RlIiwiZGlhZ29uYWxBdHRhY2tRdWV1ZSIsImoiLCJyYW5kb21BdHRhY2siLCJyb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJnZXRBZGphY2VudE1vdmVzIiwidmVydGljYWxNb3ZlcyIsImhvcml6b250YWxNb3ZlcyIsInZlcnRpY2FsQ29vcmRpbmF0ZXMiLCJob3Jpem9udGFsQ29vcmRpbmF0ZXMiLCJhZGphY2VudENvb3JkaW5hdGUiLCJhZGphY2VudEF0dGFjayIsImZvckVhY2giLCJtb3ZlIiwic2hpZnQiLCJpbmRleCIsInNwbGljZSIsImdldERpYWdvbmFsTW92ZXMiLCJwb3NzaWJsZU1vdmVzIiwiZGlhZ29uYWxDb29yZGluYXRlcyIsImRpYWdvbmFsQ29vcmRpbmF0ZSIsImRpYWdvbmFsQXR0YWNrIiwicmFuZG9tUGxhY2VTaGlwcyIsInNoaXBMZW5ndGhzIiwib3JpZW50YXRpb25zIiwic3VjY2Vzc2Z1bFBsYWNlbWVudCIsInVuZmFpckF0dGFjayIsImhpZGVPcHRpb25zIiwib3B0aW9ucyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImFkZCIsInNob3dPcHRpb25zIiwicmVtb3ZlIiwiaGlkZUdhbWUiLCJnYW1lIiwic2hvd0dhbWUiLCJoaWRlRGlmZmljdWx0aWVzIiwiZGlmZmljdWx0eSIsInNob3dEaWZmaWN1bHRpZXMiLCJzaG93TmFtZXMiLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJwbGF5ZXJPbmVUaXRsZSIsInBsYXllclR3b1RpdGxlIiwidGV4dENvbnRlbnQiLCJsb2FkUGFzc2luZ1NjcmVlbiIsIm5leHRGdW5jdGlvbiIsInBhc3NpbmdTY3JlZW4iLCJuZXh0QnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RvcFBhc3NpbmdTY3JlZW4iLCJyZW1vdmVDaGlsZCIsInJlbmRlckdhbWVib2FyZCIsInBsYXllciIsImhpZGRlbiIsImdyaWQiLCJjb250YWlucyIsInNob3dQbGFjZVNoaXAiLCJwbGF5ZXJHcmlkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzaG93bkdyaWRzIiwiYWRkQ2xhc3MiLCJldmVudCIsInRvTG93ZXJDYXNlIiwiZ3JpZHMiLCJOdW1iZXIiLCJnZXRBdHRyaWJ1dGUiLCJBcnJheSIsImZyb20iLCJzdG9wUHJvcGFnYXRpb24iLCJyZW1vdmVFdmVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzaG93QXR0YWNrIiwidGFyZ2V0R3JpZHMiLCJwcmludCIsIm1lc3NhZ2UiLCJhZnRlckRlbGF5IiwibWVzc2FnZUNvbnRhaW5lciIsIm1lc3NhZ2VDaGFyYWN0ZXJzIiwic3BsaXQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJ0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiIsIm9yaWVudGF0aW9uQnV0dG9uIiwicmVzdGFydEdhbWVib2FyZHMiLCJob21lU2NyZWVuIiwic2luZ2xlUGxheWVyIiwibXVsdGlwbGF5ZXIiLCJlYXN5IiwibWVkaXVtIiwiaGFyZCIsImltcG9zc2libGUiLCJtdWx0aXBsYXllckdhbWUiLCJjb21wdXRlciIsInNpbmdsZVBsYXllckdhbWUiLCJhdHRhY2tGdW5jdGlvbiIsImNvbXB1dGVyR3JpZHMiLCJob21lQnV0dG9uIiwic2hpcHMiLCJjaGVja0VuZCIsImNoZWNrUGxheWVySGl0IiwiY29tcHV0ZXJSb3ciLCJjb21wdXRlckNvbHVtbiIsImNoZWNrQ29tcHV0ZXJIaXQiLCJwbGF5ZXJPbmVHcmlkcyIsInBsYXllclR3b0dyaWRzIiwiY3VycmVudFBsYXllciIsInRhcmdldFBsYXllciIsImN1cnJlbnRQbGF5ZXJHcmlkcyIsInRhcmdldFBsYXllckdyaWRzIiwiYSIsImIiXSwic291cmNlUm9vdCI6IiJ9