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
  width: 240px;
  height: 240px;
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

#passing-screen {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media only screen and (min-width: 540px) {
  #gameboard-container {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }

  .gameboard {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
  }
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,4CAAoC;AACtC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,yDAAuC;EACvC,sBAAsB;AACxB;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,YAAY;EACZ,yBAAyB;EACzB,YAAY;EACZ,2CAA2C;AAC7C;;AAEA;EACE,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,YAAY;EACZ,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,yBAAyB;;EAEzB;IACE,aAAa;IACb,mBAAmB;EACrB;;EAEA;IACE,cAAc;IACd,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;;IAEnB;MACE,iBAAiB;IACnB;EACF;AACF;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;;EAET;IACE,iBAAiB;EACnB;;EAEA;IACE,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,QAAQ;EACV;AACF;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,aAAa;EACb,gDAAgD;EAChD,YAAY;EACZ,eAAe;EACf,iBAAiB;;EAEjB;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,uBAAuB;EACvB,mBAAmB;;EAEnB;IACE,SAAS;IACT,iBAAiB;EACnB;;EAEA;IACE,aAAa;IACb,SAAS;EACX;AACF;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE;IACE,aAAa;IACb,mBAAmB;IACnB,SAAS;EACX;;EAEA;IACE,WAAW;IACX,YAAY;IACZ,iBAAiB;EACnB;AACF","sourcesContent":["@font-face {\n  font-family: jersey;\n  src: url(fonts/Jersey25-Regular.ttf);\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-image: url(images/water.jpg);\n  background-size: cover;\n}\n\ndiv, p, button {\n  color: #cdd5dc;\n  font-family: jersey;\n  font-size: 1.2rem;\n  word-spacing: 5px;\n}\n\nbutton {\n  outline: none;\n  appearance: none;\n  border: none;\n  background-color: #414778;\n  padding: 8px;\n  box-shadow: inset -0.1em -0.2em 0.2em black;\n}\n\nbutton:hover {\n  background-color: #515683;\n  cursor: pointer;\n}\n\n#game-title {\n  font-size: 2rem;\n}\n\n#game {\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 24px;\n}\n\n#message {\n  height: 64px;\n  padding: 0 6px;\n  display: flex;\n  align-items: center;\n  border: 2px solid #cdd5dc;\n\n  #character {\n    display: flex;\n    align-items: center;\n  }\n\n  #textbox {\n    padding: 0 8px;\n    width: 240px;\n    height: 48px;\n    display: flex;\n    align-items: center;\n\n    #text {\n      font-size: 1.1rem;\n    }\n  }\n}\n\n#gameboard-container {\n  width: 90%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n\n  p {\n    margin: 4px 0 0 0;\n  }\n\n  #player-1, #player-2 {\n    width: 50%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 8px;\n  }\n}\n\n.gameboard {\n  width: 240px;\n  height: 240px;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n  row-gap: 2px;\n  column-gap: 2px;\n  cursor: crosshair;\n\n  .grid {\n    border: 1px solid #cdd5dc;\n  }\n}\n\n.hover-place, .hover-attack, .occupied.hidden.hover-attack {\n  background-color: rgb(147, 168, 181);\n}\n\n.occupied {\n  background-color: rgb(37, 173, 82);\n}\n\n.hover-place.occupied {\n  background-color: rgb(33, 40, 57);\n}\n\n.outside-grid {\n  background-color: red;\n}\n\n.hit, .hover-attack.hit {\n  background-color: blue;\n}\n\n.occupied.hidden {\n  display:block;\n  background: none;\n}\n\n.occupied.hit {\n  background-color: red;\n}\n\nbody > div.hidden, button.hidden {\n  display: none !important;\n}\n\ndiv.hidden {\n  display: none;\n}\n\n.unclickable {\n  pointer-events: none;\n}\n\n#game-options {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 56px;\n  justify-content: center;\n  align-items: center;\n  \n  #game-title {\n    margin: 0;\n    margin-top: -56px;\n  }\n\n  #options {\n    display: flex;\n    gap: 24px;\n  }\n}\n\n#difficulty {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 24px;\n}\n\n#passing-screen {\n  height: 80%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n@media only screen and (min-width: 540px) {\n  #gameboard-container {\n    display: flex;\n    flex-direction: row;\n    gap: 24px;\n  }\n\n  .gameboard {\n    width: 100%;\n    height: auto;\n    aspect-ratio: 1/1;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTUEsa0JBQWtCLEdBQUcsU0FBQUEsQ0FBU0MsV0FBVyxFQUFFQyxVQUFVLEVBQXNDO0VBQUEsSUFBcENDLFFBQVEsR0FBQUMsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsS0FBSztFQUFBLElBQUVHLFlBQVksR0FBQUgsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQUUsU0FBQSxHQUFBRixTQUFBLE1BQUcsQ0FBQztFQUM3RixJQUFJSCxXQUFXLENBQUNJLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFBRSxPQUFPLEtBQUs7RUFBQztFQUM3QyxJQUFJSixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLE1BQU0sS0FBS0gsVUFBVSxDQUFDRyxNQUFNLEVBQUU7SUFDL0NKLFdBQVcsR0FBR0EsV0FBVyxDQUFDTyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLE9BQU9SLGtCQUFrQixDQUFDQyxXQUFXLEVBQUVDLFVBQVUsRUFBRUMsUUFBUSxFQUFFSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0VBQ2hGO0VBQ0EsS0FBSyxJQUFJRSxDQUFDLEdBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUNQLFVBQVUsQ0FBQ0csTUFBTSxFQUFFSSxDQUFDLEVBQUUsRUFBRTtJQUN0QyxJQUFJUCxVQUFVLENBQUNPLENBQUMsQ0FBQyxLQUFLUixXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNRLENBQUMsQ0FBQyxFQUFFO01BQ3ZDUixXQUFXLEdBQUdBLFdBQVcsQ0FBQ08sS0FBSyxDQUFDLENBQUMsQ0FBQztNQUNsQyxPQUFPUixrQkFBa0IsQ0FBQ0MsV0FBVyxFQUFFQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUksWUFBWSxHQUFHLENBQUMsQ0FBQztJQUNoRjtFQUNGO0VBQ0EsSUFBSUosUUFBUSxFQUFFO0lBQUUsT0FBT0ksWUFBWTtFQUFDO0VBQ3BDLE9BQU8sSUFBSTtBQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkbUQ7QUFFcEQsTUFBTUcsSUFBSSxHQUFHLFNBQUFBLENBQVNMLE1BQU0sRUFBRTtFQUM1QixJQUFJTSxRQUFRLEdBQUcsQ0FBQztFQUNoQixJQUFJQyxJQUFJLEdBQUcsS0FBSztFQUVoQixNQUFNQyxHQUFHLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3JCRixRQUFRLElBQUksQ0FBQztFQUNmLENBQUM7RUFFRCxNQUFNRyxNQUFNLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ3hCLElBQUlULE1BQU0sS0FBS00sUUFBUSxFQUFFO01BQ3ZCQyxJQUFJLEdBQUcsSUFBSTtJQUNiO0lBQ0EsT0FBT0EsSUFBSTtFQUNiLENBQUM7RUFFRCxPQUFPO0lBQUVDLEdBQUc7SUFBRUM7RUFBTyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxNQUFNQyxTQUFTLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0VBQzNCLElBQUlDLGVBQWUsR0FBRyxFQUFFO0VBQ3hCLElBQUlDLGVBQWUsR0FBRyxFQUFFO0VBRXhCLE1BQU1DLFVBQVUsR0FBRyxTQUFBQSxDQUFTQyxXQUFXLEVBQUU7SUFDdkMsS0FBSyxJQUFJVixDQUFDLEdBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUNPLGVBQWUsQ0FBQ1gsTUFBTSxFQUFFSSxDQUFDLEVBQUUsRUFBRTtNQUMzQyxJQUFJVCxpRUFBa0IsQ0FBQ2dCLGVBQWUsQ0FBQ1AsQ0FBQyxDQUFDLENBQUNVLFdBQVcsRUFBRUEsV0FBVyxDQUFDLEVBQUU7UUFDbkUsT0FBT0gsZUFBZSxDQUFDUCxDQUFDLENBQUMsQ0FBQ1csSUFBSTtNQUNoQztJQUNGO0lBQ0EsT0FBTyxLQUFLO0VBQ2QsQ0FBQztFQUVELE1BQU1DLGtCQUFrQixHQUFHLFNBQUFBLENBQVNGLFdBQVcsRUFBRTtJQUMvQyxJQUFJQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJQSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO01BQ3hGLE9BQU8sSUFBSTtJQUNiO0lBQ0EsT0FBTyxLQUFLO0VBQ2QsQ0FBQztFQUVELE1BQU1HLFNBQVMsR0FBRyxTQUFBQSxDQUFTakIsTUFBTSxFQUFFa0IsVUFBVSxFQUFFQyxXQUFXLEVBQUU7SUFDMUQsTUFBTUMsT0FBTyxHQUFHZixJQUFJLENBQUNMLE1BQU0sQ0FBQztJQUM1QixJQUFJYyxXQUFXLEdBQUcsQ0FBQ0ksVUFBVSxDQUFDO0lBQzlCLElBQUlHLGFBQWEsR0FBRyxLQUFLO0lBRXpCLElBQUlGLFdBQVcsS0FBSyxZQUFZLEVBQUU7TUFDaEMsS0FBSyxJQUFJZixDQUFDLEdBQUMsQ0FBQyxFQUFHQSxDQUFDLEdBQUNKLE1BQU0sSUFBSXFCLGFBQWEsS0FBSyxLQUFLLEVBQUdqQixDQUFDLEVBQUUsRUFBRTtRQUN4RCxJQUFJUyxVQUFVLENBQUMsQ0FBQ0ssVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFQSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUdkLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxLQUFLO1FBQ2hFLElBQUlZLGtCQUFrQixDQUFDLENBQUNFLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRUEsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHZCxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sS0FBSztNQUMxRTtNQUNBLEtBQUssSUFBSUEsQ0FBQyxHQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFDSixNQUFNLEVBQUVJLENBQUMsRUFBRSxFQUFFO1FBQzNCVSxXQUFXLENBQUNRLElBQUksQ0FBQyxDQUFDSixVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBR2QsQ0FBQyxDQUFDLENBQUM7TUFDdEQ7SUFDRixDQUFDLE1BQU07TUFDTCxLQUFLLElBQUlBLENBQUMsR0FBQyxDQUFDLEVBQUdBLENBQUMsR0FBQ0osTUFBTSxJQUFJcUIsYUFBYSxLQUFLLEtBQUssRUFBR2pCLENBQUMsRUFBRSxFQUFFO1FBQ3hELElBQUlTLFVBQVUsQ0FBQyxDQUFDSyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUdkLENBQUMsRUFBRWMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEtBQUs7UUFDaEUsSUFBSUYsa0JBQWtCLENBQUMsQ0FBQ0UsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHZCxDQUFDLEVBQUVjLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxLQUFLO01BQzFFO01BQ0EsS0FBSyxJQUFJZCxDQUFDLEdBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUNKLE1BQU0sRUFBRUksQ0FBQyxFQUFFLEVBQUU7UUFDM0JVLFdBQVcsQ0FBQ1EsSUFBSSxDQUFDLENBQUNKLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBR2QsQ0FBQyxFQUFFYyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN0RDtJQUNGO0lBRUFQLGVBQWUsQ0FBQ1csSUFBSSxDQUFDO01BQUVQLElBQUksRUFBRUssT0FBTztNQUFFTjtJQUFZLENBQUMsQ0FBQztJQUNwRCxPQUFPLElBQUk7RUFDYixDQUFDO0VBRUQsTUFBTVMsYUFBYSxHQUFHLFNBQUFBLENBQVNULFdBQVcsRUFBRTtJQUMxQyxNQUFNQyxJQUFJLEdBQUdGLFVBQVUsQ0FBQ0MsV0FBVyxDQUFDO0lBQ3BDLElBQUlDLElBQUksS0FBSyxLQUFLLEVBQUU7TUFDbEJBLElBQUksQ0FBQ1AsR0FBRyxDQUFDLENBQUM7SUFDWjtJQUNBSSxlQUFlLENBQUNVLElBQUksQ0FBQ1IsV0FBVyxDQUFDO0VBQ25DLENBQUM7RUFFRCxNQUFNVSxTQUFTLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQzNCLEtBQUssSUFBSXBCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBQ08sZUFBZSxDQUFDWCxNQUFNLEVBQUVJLENBQUMsRUFBRSxFQUFFO01BQzdDLElBQUlPLGVBQWUsQ0FBQ1AsQ0FBQyxDQUFDLENBQUNXLElBQUksQ0FBQ04sTUFBTSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsT0FBTyxLQUFLO0lBQzlEO0lBQ0EsT0FBTyxJQUFJO0VBQ2IsQ0FBQztFQUVELE9BQU87SUFBRUUsZUFBZTtJQUFFQyxlQUFlO0lBQUVLLFNBQVM7SUFBRU0sYUFBYTtJQUFFQyxTQUFTO0lBQUVYLFVBQVU7SUFBRUc7RUFBbUIsQ0FBQztBQUNsSCxDQUFDO0FBRUQsTUFBTVMsTUFBTSxHQUFHLFNBQUFBLENBQVNDLElBQUksRUFBRTtFQUM1QixNQUFNQyxVQUFVLEdBQUdELElBQUk7RUFDdkIsTUFBTUUsZUFBZSxHQUFHbEIsU0FBUyxDQUFDLENBQUM7RUFFbkMsTUFBTW1CLE1BQU0sR0FBRyxTQUFBQSxDQUFTQyxNQUFNLEVBQUVoQixXQUFXLEVBQUU7SUFDM0NnQixNQUFNLENBQUNGLGVBQWUsQ0FBQ0wsYUFBYSxDQUFDVCxXQUFXLENBQUM7RUFDbkQsQ0FBQztFQUVELE9BQU87SUFBRWEsVUFBVTtJQUFFQyxlQUFlO0lBQUVDO0VBQU8sQ0FBQztBQUNoRCxDQUFDO0FBRUQsTUFBTUUsUUFBUSxHQUFHLFNBQUFBLENBQUEsRUFBVztFQUMxQixNQUFNSixVQUFVLEdBQUcsVUFBVTtFQUM3QixNQUFNQyxlQUFlLEdBQUdsQixTQUFTLENBQUMsQ0FBQztFQUNuQyxNQUFNc0IsaUJBQWlCLEdBQUcsRUFBRTtFQUM1QixJQUFJQyxnQkFBZ0I7RUFDcEIsSUFBSUMsZ0NBQWdDLEdBQUcsRUFBRTtFQUN6QyxJQUFJQyxrQ0FBa0MsR0FBRyxFQUFFO0VBQzNDLElBQUlDLFlBQVksR0FBRyxLQUFLO0VBQ3hCLElBQUlqQixXQUFXO0VBQ2YsSUFBSWtCLG1CQUFtQixHQUFHLEVBQUU7RUFDNUIsSUFBSWpDLENBQUMsR0FBRyxDQUFDO0VBQ1QsSUFBSWtDLENBQUMsR0FBRyxDQUFDO0VBRVQsTUFBTUMsWUFBWSxHQUFHLFNBQUFBLENBQVNULE1BQU0sRUFBRTtJQUNwQyxPQUFPLElBQUksRUFBRTtNQUNYLE1BQU1VLEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7TUFDMUMsTUFBTUMsTUFBTSxHQUFHSCxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUU3QyxJQUFJaEQsaUVBQWtCLENBQUNxQyxpQkFBaUIsRUFBRSxDQUFDUSxHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFBRTtNQUFTO01BQ3JFZCxNQUFNLENBQUNGLGVBQWUsQ0FBQ0wsYUFBYSxDQUFDLENBQUNpQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDO01BQ25EWixpQkFBaUIsQ0FBQ1YsSUFBSSxDQUFDLENBQUNrQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDO01BQ3JDLE9BQU8sQ0FBQ0osR0FBRyxFQUFFSSxNQUFNLENBQUM7SUFDdEI7RUFDRixDQUFDO0VBRUQsTUFBTUMsZ0JBQWdCLEdBQUcsU0FBQUEsQ0FBUy9CLFdBQVcsRUFBRTtJQUM3QyxNQUFNZ0MsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2QyxNQUFNQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLElBQUlDLG1CQUFtQixHQUFHLEVBQUU7SUFDNUIsSUFBSUMscUJBQXFCLEdBQUcsRUFBRTtJQUU5QixLQUFLLElBQUk3QyxDQUFDLEdBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUMwQyxhQUFhLENBQUM5QyxNQUFNLEVBQUVJLENBQUMsRUFBRSxFQUFFO01BQ3pDLE1BQU04QyxrQkFBa0IsR0FBRyxDQUFDcEMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHZ0MsYUFBYSxDQUFDMUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVVLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR2dDLGFBQWEsQ0FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3ZHLElBQUksQ0FBQ3dCLGVBQWUsQ0FBQ1osa0JBQWtCLENBQUNrQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUN2RCxpRUFBa0IsQ0FBQ3FDLGlCQUFpQixFQUFFa0Isa0JBQWtCLENBQUMsRUFBRTtRQUN6SEYsbUJBQW1CLENBQUMxQixJQUFJLENBQUMsQ0FBQzRCLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFDO01BQzVEO0lBQ0Y7SUFFQSxLQUFLLElBQUk5QyxDQUFDLEdBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUMyQyxlQUFlLENBQUMvQyxNQUFNLEVBQUVJLENBQUMsRUFBRSxFQUFFO01BQzNDLE1BQU04QyxrQkFBa0IsR0FBRyxDQUFDcEMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHaUMsZUFBZSxDQUFDM0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUVVLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBR2lDLGVBQWUsQ0FBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzNHLElBQUksQ0FBQ3dCLGVBQWUsQ0FBQ1osa0JBQWtCLENBQUNrQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUN2RCxpRUFBa0IsQ0FBQ3FDLGlCQUFpQixFQUFFa0Isa0JBQWtCLENBQUMsRUFBRTtRQUN6SEQscUJBQXFCLENBQUMzQixJQUFJLENBQUMsQ0FBQzRCLGtCQUFrQixFQUFFLFlBQVksQ0FBQyxDQUFDO01BQ2hFO0lBQ0Y7SUFFQSxPQUFPO01BQUVGLG1CQUFtQjtNQUFFQztJQUFzQixDQUFDO0VBQ3ZELENBQUM7RUFFRCxNQUFNRSxjQUFjLEdBQUcsU0FBQUEsQ0FBU3JCLE1BQU0sRUFBRTtJQUV0QyxJQUFJLENBQUNNLFlBQVksRUFBRTtNQUNqQixNQUFNLENBQUNJLEdBQUcsRUFBRUksTUFBTSxDQUFDLEdBQUdMLFlBQVksQ0FBQ1QsTUFBTSxDQUFDO01BRTFDLElBQUlBLE1BQU0sQ0FBQ0YsZUFBZSxDQUFDZixVQUFVLENBQUMsQ0FBQzJCLEdBQUcsRUFBRUksTUFBTSxDQUFDLENBQUMsRUFBRTtRQUNwRFIsWUFBWSxHQUFHLElBQUk7UUFDbkJILGdCQUFnQixHQUFHLENBQUNPLEdBQUcsRUFBRUksTUFBTSxDQUFDO1FBQ2hDQyxnQkFBZ0IsQ0FBQ1osZ0JBQWdCLENBQUMsQ0FBQ2UsbUJBQW1CLENBQUNJLE9BQU8sQ0FBRUMsSUFBSSxJQUFLbkIsZ0NBQWdDLENBQUNaLElBQUksQ0FBQytCLElBQUksQ0FBQyxDQUFDO1FBQ3JIUixnQkFBZ0IsQ0FBQ1osZ0JBQWdCLENBQUMsQ0FBQ2dCLHFCQUFxQixDQUFDRyxPQUFPLENBQUVDLElBQUksSUFBS2xCLGtDQUFrQyxDQUFDYixJQUFJLENBQUMrQixJQUFJLENBQUMsQ0FBQztNQUMzSDtNQUNBLE9BQU8sQ0FBQ2IsR0FBRyxFQUFFSSxNQUFNLENBQUM7SUFDdEIsQ0FBQyxNQUFNO01BQ0wsSUFBSUosR0FBRyxFQUFFSSxNQUFNO01BQ2YsSUFBSXpCLFdBQVc7TUFDZixJQUFJZSxnQ0FBZ0MsQ0FBQ2xDLE1BQU0sS0FBSyxDQUFDLElBQUltQixXQUFXLEtBQUssWUFBWSxFQUFFO1FBQ2pGLENBQUNxQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxHQUFHVCxrQ0FBa0MsQ0FBQ21CLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdEbkMsV0FBVyxHQUFHLFlBQVk7TUFDNUIsQ0FBQyxNQUFNO1FBQ0wsQ0FBQ3FCLEdBQUcsRUFBRUksTUFBTSxDQUFDLEdBQUdWLGdDQUFnQyxDQUFDb0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0RuQyxXQUFXLEdBQUcsVUFBVTtNQUMxQjtNQUVBLE1BQU1vQyxLQUFLLEdBQUc1RCxpRUFBa0IsQ0FBQzBDLG1CQUFtQixFQUFFLENBQUNHLEdBQUcsRUFBRUksTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDO01BRTFFZCxNQUFNLENBQUNGLGVBQWUsQ0FBQ0wsYUFBYSxDQUFDLENBQUNpQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDO01BQ25EWixpQkFBaUIsQ0FBQ1YsSUFBSSxDQUFDLENBQUNrQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDO01BQ3JDLElBQUlXLEtBQUssS0FBSyxLQUFLLEVBQUU7UUFDbkJsQixtQkFBbUIsQ0FBQ21CLE1BQU0sQ0FBQ0QsS0FBSyxFQUFFLENBQUMsQ0FBQztNQUN0QztNQUVBLElBQUl6QixNQUFNLENBQUNGLGVBQWUsQ0FBQ2YsVUFBVSxDQUFDLENBQUMyQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFDcEQsSUFBSWQsTUFBTSxDQUFDRixlQUFlLENBQUNmLFVBQVUsQ0FBQyxDQUFDMkIsR0FBRyxFQUFFSSxNQUFNLENBQUMsQ0FBQyxDQUFDbkMsTUFBTSxDQUFDLENBQUMsRUFBRTtVQUM3RHlCLGdDQUFnQyxHQUFHLEVBQUU7VUFDckNDLGtDQUFrQyxHQUFHLEVBQUU7VUFDdkNDLFlBQVksR0FBRyxLQUFLO1FBQ3RCLENBQUMsTUFBTTtVQUNMLElBQUlqQixXQUFXLEtBQUssWUFBWSxFQUFFO1lBQ2hDYyxnQkFBZ0IsR0FBRyxDQUFDTyxHQUFHLEVBQUVJLE1BQU0sQ0FBQztZQUNoQ0MsZ0JBQWdCLENBQUNaLGdCQUFnQixDQUFDLENBQUNnQixxQkFBcUIsQ0FBQ0csT0FBTyxDQUFFQyxJQUFJLElBQUtsQixrQ0FBa0MsQ0FBQ2IsSUFBSSxDQUFDK0IsSUFBSSxDQUFDLENBQUM7VUFDM0gsQ0FBQyxNQUFNO1lBQ0xwQixnQkFBZ0IsR0FBRyxDQUFDTyxHQUFHLEVBQUVJLE1BQU0sQ0FBQztZQUNoQ0MsZ0JBQWdCLENBQUNaLGdCQUFnQixDQUFDLENBQUNlLG1CQUFtQixDQUFDSSxPQUFPLENBQUVDLElBQUksSUFBS25CLGdDQUFnQyxDQUFDWixJQUFJLENBQUMrQixJQUFJLENBQUMsQ0FBQztVQUN2SDtRQUNGO01BQ0Y7TUFDQSxPQUFPLENBQUNiLEdBQUcsRUFBRUksTUFBTSxDQUFDO0lBQ3RCO0VBQ0YsQ0FBQztFQUVELE1BQU1hLGdCQUFnQixHQUFHLFNBQUFBLENBQVMzQyxXQUFXLEVBQUU7SUFDN0MsTUFBTTRDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsSUFBSUMsbUJBQW1CLEdBQUcsRUFBRTtJQUU1QkQsYUFBYSxDQUFDTixPQUFPLENBQUVDLElBQUksSUFBSztNQUM5QixNQUFNTyxrQkFBa0IsR0FBRyxDQUFDOUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFdkMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHdUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQy9FLElBQUksQ0FBQ3pCLGVBQWUsQ0FBQ1osa0JBQWtCLENBQUM0QyxrQkFBa0IsQ0FBQyxJQUFJLENBQUNqRSxpRUFBa0IsQ0FBQ3FDLGlCQUFpQixFQUFFNEIsa0JBQWtCLENBQUMsSUFBSSxDQUFDakUsaUVBQWtCLENBQUMwQyxtQkFBbUIsRUFBRXVCLGtCQUFrQixDQUFDLEVBQUU7UUFDekxELG1CQUFtQixDQUFDckMsSUFBSSxDQUFDc0Msa0JBQWtCLENBQUM7TUFDOUM7SUFDRixDQUFDLENBQUM7SUFDRixPQUFPRCxtQkFBbUI7RUFDNUIsQ0FBQztFQUVELE1BQU1FLGNBQWMsR0FBRyxTQUFBQSxDQUFTL0IsTUFBTSxFQUFFO0lBRXRDLElBQUksQ0FBQ00sWUFBWSxFQUFFO01BQ2pCLElBQUlJLEdBQUcsRUFBRUksTUFBTTtNQUNmLElBQUlaLGlCQUFpQixDQUFDaEMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNsQyxDQUFDd0MsR0FBRyxFQUFFSSxNQUFNLENBQUMsR0FBR0wsWUFBWSxDQUFDVCxNQUFNLENBQUM7UUFDcEMyQixnQkFBZ0IsQ0FBQyxDQUFDakIsR0FBRyxFQUFFSSxNQUFNLENBQUMsQ0FBQyxDQUFDUSxPQUFPLENBQUV0QyxXQUFXLElBQUs7VUFBRXVCLG1CQUFtQixDQUFDZixJQUFJLENBQUNSLFdBQVcsQ0FBQztRQUFDLENBQUMsQ0FBQztNQUNyRyxDQUFDLE1BQU07UUFDTCxDQUFDMEIsR0FBRyxFQUFFSSxNQUFNLENBQUMsR0FBR1AsbUJBQW1CLENBQUNqQyxDQUFDLENBQUM7UUFDdEMwQixNQUFNLENBQUNGLGVBQWUsQ0FBQ0wsYUFBYSxDQUFDLENBQUNpQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDO1FBQ25EWixpQkFBaUIsQ0FBQ1YsSUFBSSxDQUFDLENBQUNrQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDYSxnQkFBZ0IsQ0FBQyxDQUFDakIsR0FBRyxFQUFFSSxNQUFNLENBQUMsQ0FBQyxDQUFDUSxPQUFPLENBQUV0QyxXQUFXLElBQUs7VUFBRXVCLG1CQUFtQixDQUFDZixJQUFJLENBQUNSLFdBQVcsQ0FBQztRQUFDLENBQUMsQ0FBQztRQUNuR1YsQ0FBQyxJQUFJLENBQUM7TUFDUjtNQUNBLElBQUkwQixNQUFNLENBQUNGLGVBQWUsQ0FBQ2YsVUFBVSxDQUFDLENBQUMyQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFDcERSLFlBQVksR0FBRyxJQUFJO1FBQ25CSCxnQkFBZ0IsR0FBRyxDQUFDTyxHQUFHLEVBQUVJLE1BQU0sQ0FBQztRQUNoQ0MsZ0JBQWdCLENBQUNaLGdCQUFnQixDQUFDLENBQUNlLG1CQUFtQixDQUFDSSxPQUFPLENBQUVDLElBQUksSUFBS25CLGdDQUFnQyxDQUFDWixJQUFJLENBQUMrQixJQUFJLENBQUMsQ0FBQztRQUNySFIsZ0JBQWdCLENBQUNaLGdCQUFnQixDQUFDLENBQUNnQixxQkFBcUIsQ0FBQ0csT0FBTyxDQUFFQyxJQUFJLElBQUtsQixrQ0FBa0MsQ0FBQ2IsSUFBSSxDQUFDK0IsSUFBSSxDQUFDLENBQUM7TUFDM0g7TUFDQSxPQUFPLENBQUNiLEdBQUcsRUFBRUksTUFBTSxDQUFDO0lBQ3RCLENBQUMsTUFBTTtNQUNMLE9BQU9PLGNBQWMsQ0FBQ3JCLE1BQU0sQ0FBQztJQUMvQjtFQUNGLENBQUM7RUFFRCxNQUFNZ0MsZ0JBQWdCLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0lBQ2xDLE1BQU1DLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkMsTUFBTUMsWUFBWSxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztJQUMvQyxJQUFJNUQsQ0FBQyxHQUFHLENBQUM7SUFFVCxPQUFPd0IsZUFBZSxDQUFDakIsZUFBZSxDQUFDWCxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ2pELE1BQU13QyxHQUFHLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO01BQzFDLE1BQU1DLE1BQU0sR0FBR0gsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7TUFDN0MsTUFBTXhCLFdBQVcsR0FBRzZDLFlBQVksQ0FBQ3ZCLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDL0QsTUFBTXNCLG1CQUFtQixHQUFHckMsZUFBZSxDQUFDWCxTQUFTLENBQUM4QyxXQUFXLENBQUMzRCxDQUFDLENBQUMsRUFBRSxDQUFDb0MsR0FBRyxFQUFFSSxNQUFNLENBQUMsRUFBRXpCLFdBQVcsQ0FBQztNQUNqRyxJQUFJOEMsbUJBQW1CLEVBQUU7UUFBRTdELENBQUMsSUFBSSxDQUFDO01BQUM7SUFDcEM7RUFDRixDQUFDO0VBRUQsTUFBTThELFlBQVksR0FBRyxTQUFBQSxDQUFTcEMsTUFBTSxFQUFFO0lBQ3BDLE1BQU0sQ0FBQ1UsR0FBRyxFQUFFSSxNQUFNLENBQUMsR0FBR2QsTUFBTSxDQUFDRixlQUFlLENBQUNqQixlQUFlLENBQUNQLENBQUMsQ0FBQyxDQUFDVSxXQUFXLENBQUN3QixDQUFDLENBQUM7SUFDOUVSLE1BQU0sQ0FBQ0YsZUFBZSxDQUFDTCxhQUFhLENBQUMsQ0FBQ2lCLEdBQUcsRUFBRUksTUFBTSxDQUFDLENBQUM7SUFDbkRaLGlCQUFpQixDQUFDVixJQUFJLENBQUMsQ0FBQ2tCLEdBQUcsRUFBRUksTUFBTSxDQUFDLENBQUM7SUFFckMsSUFBSU4sQ0FBQyxLQUFLUixNQUFNLENBQUNGLGVBQWUsQ0FBQ2pCLGVBQWUsQ0FBQ1AsQ0FBQyxDQUFDLENBQUNVLFdBQVcsQ0FBQ2QsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUMxRXNDLENBQUMsR0FBRyxDQUFDO01BQ0xsQyxDQUFDLElBQUksQ0FBQztJQUNSLENBQUMsTUFBTTtNQUNMa0MsQ0FBQyxJQUFJLENBQUM7SUFDUjtJQUVBLE9BQU8sQ0FBQ0UsR0FBRyxFQUFFSSxNQUFNLENBQUM7RUFFdEIsQ0FBQztFQUVELE9BQU87SUFBRWpCLFVBQVU7SUFBRUMsZUFBZTtJQUFFVyxZQUFZO0lBQUVZLGNBQWM7SUFBRVUsY0FBYztJQUFFSyxZQUFZO0lBQUVKO0VBQWlCLENBQUM7QUFDdEgsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4UUQsTUFBTUssV0FBVyxHQUFHLFNBQUFBLENBQUEsRUFBVztFQUM3QixNQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGVBQWUsQ0FBQztFQUV2REYsT0FBTyxDQUFDRyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDakMsQ0FBQztBQUVELE1BQU1DLFdBQVcsR0FBRyxTQUFBQSxDQUFBLEVBQVc7RUFDN0IsTUFBTUwsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFFdkRGLE9BQU8sQ0FBQ0csU0FBUyxDQUFDRyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ3BDLENBQUM7QUFFRCxNQUFNQyxRQUFRLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0VBQzFCLE1BQU1DLElBQUksR0FBR1AsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDO0VBRTVDTSxJQUFJLENBQUNMLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUM5QixDQUFDO0FBRUQsTUFBTUssUUFBUSxHQUFHLFNBQUFBLENBQUEsRUFBVztFQUMxQixNQUFNRCxJQUFJLEdBQUdQLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUU1Q00sSUFBSSxDQUFDTCxTQUFTLENBQUNHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDakMsQ0FBQztBQUVELE1BQU1JLGdCQUFnQixHQUFHLFNBQUFBLENBQUEsRUFBVztFQUNsQyxNQUFNQyxVQUFVLEdBQUdWLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUV4RFMsVUFBVSxDQUFDUixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDcEMsQ0FBQztBQUVELE1BQU1RLGdCQUFnQixHQUFHLFNBQUFBLENBQUEsRUFBVztFQUNsQyxNQUFNRCxVQUFVLEdBQUdWLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUV4RFMsVUFBVSxDQUFDUixTQUFTLENBQUNHLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDdkMsQ0FBQztBQUVELE1BQU1PLFNBQVMsR0FBRyxTQUFBQSxDQUFTQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtFQUMvQyxNQUFNQyxjQUFjLEdBQUdmLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDBDQUEwQyxDQUFDO0VBQ3pGLE1BQU1lLGNBQWMsR0FBR2hCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDBDQUEwQyxDQUFDO0VBRXpGYyxjQUFjLENBQUNFLFdBQVcsR0FBR0osU0FBUztFQUN0Q0csY0FBYyxDQUFDQyxXQUFXLEdBQUdILFNBQVM7QUFDeEMsQ0FBQztBQUVELE1BQU1JLGlCQUFpQixHQUFHLFNBQUFBLENBQVNDLFlBQVksRUFBRTtFQUMvQyxNQUFNWixJQUFJLEdBQUdQLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUM1QyxNQUFNbUIsYUFBYSxHQUFHcEIsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7RUFDL0QsTUFBTW9CLFVBQVUsR0FBR3JCLFFBQVEsQ0FBQ3NCLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFFbkRmLElBQUksQ0FBQ0wsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQzVCaUIsYUFBYSxDQUFDbEIsU0FBUyxDQUFDRyxNQUFNLENBQUMsUUFBUSxDQUFDO0VBRXhDZ0IsVUFBVSxDQUFDRSxFQUFFLEdBQUcsTUFBTTtFQUN0QkYsVUFBVSxDQUFDSixXQUFXLEdBQUcsV0FBVztFQUNwQ0csYUFBYSxDQUFDSSxXQUFXLENBQUNILFVBQVUsQ0FBQztFQUVyQ0EsVUFBVSxDQUFDSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUN6Q04sWUFBWSxDQUFDLENBQUM7SUFDZE8saUJBQWlCLENBQUMsQ0FBQztJQUNuQk4sYUFBYSxDQUFDTyxXQUFXLENBQUNOLFVBQVUsQ0FBQztFQUN2QyxDQUFDLENBQUM7QUFFSixDQUFDO0FBRUQsTUFBTUssaUJBQWlCLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0VBQ25DLE1BQU1uQixJQUFJLEdBQUdQLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUM1QyxNQUFNbUIsYUFBYSxHQUFHcEIsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7RUFFL0RNLElBQUksQ0FBQ0wsU0FBUyxDQUFDRyxNQUFNLENBQUMsUUFBUSxDQUFDO0VBQy9CZSxhQUFhLENBQUNsQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDdkMsQ0FBQztBQUVELE1BQU15QixlQUFlLEdBQUcsU0FBQUEsQ0FBU0MsTUFBTSxFQUFFQyxNQUFNLEVBQUU7RUFDL0MsS0FBSyxJQUFJL0YsQ0FBQyxHQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFDOEYsTUFBTSxDQUFDdEUsZUFBZSxDQUFDakIsZUFBZSxDQUFDWCxNQUFNLEVBQUVJLENBQUMsRUFBRSxFQUFFO0lBQ2xFLEtBQUssSUFBSWtDLENBQUMsR0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBQzRELE1BQU0sQ0FBQ3RFLGVBQWUsQ0FBQ2pCLGVBQWUsQ0FBQ1AsQ0FBQyxDQUFDLENBQUNVLFdBQVcsQ0FBQ2QsTUFBTSxFQUFFc0MsQ0FBQyxFQUFFLEVBQUU7TUFDakYsTUFBTThELElBQUksR0FBRy9CLFFBQVEsQ0FBQ0MsYUFBYSxDQUFFLGlCQUFnQjRCLE1BQU0sQ0FBQ3ZFLFVBQVcsZ0JBQWV1RSxNQUFNLENBQUN0RSxlQUFlLENBQUNqQixlQUFlLENBQUNQLENBQUMsQ0FBQyxDQUFDVSxXQUFXLENBQUN3QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsbUJBQWtCNEQsTUFBTSxDQUFDdEUsZUFBZSxDQUFDakIsZUFBZSxDQUFDUCxDQUFDLENBQUMsQ0FBQ1UsV0FBVyxDQUFDd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLElBQUcsQ0FBQztNQUNwTyxJQUFJLENBQUM4RCxJQUFJLENBQUM3QixTQUFTLENBQUM4QixRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFBQ0QsSUFBSSxDQUFDN0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO01BQUE7TUFBQztNQUMxRSxJQUFJMkIsTUFBTSxFQUFFO1FBQ1ZDLElBQUksQ0FBQzdCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztNQUM5QixDQUFDLE1BQU07UUFBRTRCLElBQUksQ0FBQzdCLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUFDO0lBQzNDO0VBQ0Y7RUFDQSxLQUFLLElBQUl0RSxDQUFDLEdBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUM4RixNQUFNLENBQUN0RSxlQUFlLENBQUNoQixlQUFlLENBQUNaLE1BQU0sRUFBRUksQ0FBQyxFQUFFLEVBQUU7SUFDbEUsTUFBTWdHLElBQUksR0FBRy9CLFFBQVEsQ0FBQ0MsYUFBYSxDQUFFLGlCQUFnQjRCLE1BQU0sQ0FBQ3ZFLFVBQVcsZ0JBQWV1RSxNQUFNLENBQUN0RSxlQUFlLENBQUNoQixlQUFlLENBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxtQkFBa0I4RixNQUFNLENBQUN0RSxlQUFlLENBQUNoQixlQUFlLENBQUNSLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxJQUFHLENBQUM7SUFDdE1nRyxJQUFJLENBQUM3QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxLQUFLLENBQUM7RUFDM0I7QUFDRixDQUFDO0FBRUQsTUFBTThCLGFBQWEsR0FBRyxTQUFBQSxDQUFTSixNQUFNLEVBQUVsRyxNQUFNLEVBQUU7RUFDN0MsTUFBTXVHLFdBQVcsR0FBR2xDLFFBQVEsQ0FBQ21DLGdCQUFnQixDQUFFLGlCQUFnQk4sTUFBTSxDQUFDdkUsVUFBVyxtQkFBa0IsQ0FBQztFQUNwRyxJQUFJOEUsVUFBVSxHQUFHLEVBQUU7RUFFbkIsTUFBTUMsUUFBUSxHQUFHLFNBQUFBLENBQVNDLEtBQUssRUFBRTtJQUMvQixNQUFNeEYsV0FBVyxHQUFHa0QsUUFBUSxDQUFDQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUNnQixXQUFXLENBQUNzQixXQUFXLENBQUMsQ0FBQztJQUNwRixNQUFNQyxLQUFLLEdBQUcsRUFBRTtJQUNoQixNQUFNLENBQUNyRSxHQUFHLEVBQUVJLE1BQU0sQ0FBQyxHQUFHLENBQUNrRSxNQUFNLENBQUNILEtBQUssQ0FBQzdFLE1BQU0sQ0FBQ2lGLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFRCxNQUFNLENBQUNILEtBQUssQ0FBQzdFLE1BQU0sQ0FBQ2lGLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRXZIQyxLQUFLLENBQUNDLElBQUksQ0FBQ1YsV0FBVyxDQUFDLENBQUNuRCxPQUFPLENBQUVnRCxJQUFJLElBQUtBLElBQUksQ0FBQzdCLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMvRitCLFVBQVUsR0FBRyxFQUFFO0lBRWYsSUFBSXRGLFdBQVcsS0FBSyxZQUFZLEVBQUU7TUFDaEMsS0FBSyxJQUFJZixDQUFDLEdBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUNKLE1BQU0sRUFBRUksQ0FBQyxFQUFFLEVBQUU7UUFDM0IsTUFBTWdHLElBQUksR0FBRy9CLFFBQVEsQ0FBQ0MsYUFBYSxDQUFFLGNBQWE5QixHQUFJLG1CQUFrQkksTUFBTSxHQUFHeEMsQ0FBRSxtQkFBa0I4RixNQUFNLENBQUN2RSxVQUFXLElBQUcsQ0FBQztRQUMzSGtGLEtBQUssQ0FBQ3ZGLElBQUksQ0FBQzhFLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUNGLE1BQU0sQ0FBQ3RFLGVBQWUsQ0FBQ2YsVUFBVSxDQUFDLENBQUMyQixHQUFHLEVBQUVJLE1BQU0sR0FBR3hDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzhGLE1BQU0sQ0FBQ3RFLGVBQWUsQ0FBQ1osa0JBQWtCLENBQUMsQ0FBQ3dCLEdBQUcsRUFBRUksTUFBTSxHQUFHeEMsQ0FBQyxDQUFDLENBQUMsRUFBRTtVQUMxSHFHLFVBQVUsQ0FBQ25GLElBQUksQ0FBQyxDQUFDa0IsR0FBRyxFQUFFSSxNQUFNLENBQUMsQ0FBQztRQUNoQztNQUNGO0lBQ0YsQ0FBQyxNQUFNO01BQ0wsS0FBSyxJQUFJeEMsQ0FBQyxHQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFDSixNQUFNLEVBQUVJLENBQUMsRUFBRSxFQUFFO1FBQzNCLE1BQU1nRyxJQUFJLEdBQUcvQixRQUFRLENBQUNDLGFBQWEsQ0FBRSxjQUFhOUIsR0FBRyxHQUFHcEMsQ0FBRSxtQkFBa0J3QyxNQUFPLG1CQUFrQnNELE1BQU0sQ0FBQ3ZFLFVBQVcsSUFBRyxDQUFDO1FBQzNIa0YsS0FBSyxDQUFDdkYsSUFBSSxDQUFDOEUsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQ0YsTUFBTSxDQUFDdEUsZUFBZSxDQUFDZixVQUFVLENBQUMsQ0FBQzJCLEdBQUcsR0FBR3BDLENBQUMsRUFBRXdDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQ3NELE1BQU0sQ0FBQ3RFLGVBQWUsQ0FBQ1osa0JBQWtCLENBQUMsQ0FBQ3dCLEdBQUcsR0FBR3BDLENBQUMsRUFBRXdDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7VUFDMUg2RCxVQUFVLENBQUNuRixJQUFJLENBQUMsQ0FBQ2tCLEdBQUcsRUFBRUksTUFBTSxDQUFDLENBQUM7UUFDaEM7TUFDRjtJQUNGO0lBRUEsS0FBSyxJQUFJeEMsQ0FBQyxHQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFDeUcsS0FBSyxDQUFDN0csTUFBTSxFQUFFSSxDQUFDLEVBQUUsRUFBRTtNQUNqQyxJQUFJeUcsS0FBSyxDQUFDekcsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCeUcsS0FBSyxDQUFDekQsT0FBTyxDQUFFZ0QsSUFBSSxJQUFLO1VBQ3RCLElBQUlBLElBQUksS0FBSyxJQUFJLEVBQUU7WUFBQ0EsSUFBSSxDQUFDN0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO1VBQUE7UUFDeEQsQ0FBQyxDQUFDO1FBQ0Y7TUFDRjtJQUNGO0lBQ0FxQyxLQUFLLENBQUN6RCxPQUFPLENBQUVnRCxJQUFJLElBQUtBLElBQUksQ0FBQzdCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTFEbUMsS0FBSyxDQUFDTyxlQUFlLENBQUMsQ0FBQztFQUN6QixDQUFDO0VBRUQsTUFBTUMsV0FBVyxHQUFHLFNBQUFBLENBQVNSLEtBQUssRUFBRTtJQUNsQyxJQUFJRixVQUFVLENBQUN6RyxNQUFNLEdBQUdBLE1BQU0sRUFBRTtNQUFFO0lBQU87SUFDekNnSCxLQUFLLENBQUNDLElBQUksQ0FBQ1YsV0FBVyxDQUFDLENBQUNuRCxPQUFPLENBQUVnRCxJQUFJLElBQUs7TUFDeENBLElBQUksQ0FBQ2dCLG1CQUFtQixDQUFDLFdBQVcsRUFBRVYsUUFBUSxDQUFDO01BQy9DTixJQUFJLENBQUM3QixTQUFTLENBQUNHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDO01BQ3BEMEIsSUFBSSxDQUFDZ0IsbUJBQW1CLENBQUMsT0FBTyxFQUFFRCxXQUFXLENBQUM7SUFDaEQsQ0FBQyxDQUFDO0lBRUZSLEtBQUssQ0FBQ08sZUFBZSxDQUFDLENBQUM7RUFDekIsQ0FBQztFQUVERixLQUFLLENBQUNDLElBQUksQ0FBQ1YsV0FBVyxDQUFDLENBQUNuRCxPQUFPLENBQUVnRCxJQUFJLElBQUs7SUFDeENBLElBQUksQ0FBQ04sZ0JBQWdCLENBQUMsV0FBVyxFQUFFWSxRQUFRLENBQUM7SUFDNUNOLElBQUksQ0FBQ04sZ0JBQWdCLENBQUMsT0FBTyxFQUFFcUIsV0FBVyxDQUFDO0VBQzdDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNRSxVQUFVLEdBQUcsU0FBQUEsQ0FBU3ZGLE1BQU0sRUFBRTtFQUNsQyxNQUFNd0YsV0FBVyxHQUFHakQsUUFBUSxDQUFDbUMsZ0JBQWdCLENBQUUsaUJBQWdCMUUsTUFBTSxDQUFDSCxVQUFXLG1CQUFrQixDQUFDO0VBRXBHLE1BQU0rRSxRQUFRLEdBQUcsU0FBQUEsQ0FBU0MsS0FBSyxFQUFFO0lBQy9CSyxLQUFLLENBQUNDLElBQUksQ0FBQ0ssV0FBVyxDQUFDLENBQUNsRSxPQUFPLENBQUVnRCxJQUFJLElBQUtBLElBQUksQ0FBQzdCLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hGaUMsS0FBSyxDQUFDN0UsTUFBTSxDQUFDeUMsU0FBUyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO0lBRTFDbUMsS0FBSyxDQUFDTyxlQUFlLENBQUMsQ0FBQztFQUN6QixDQUFDO0VBRUQsTUFBTUMsV0FBVyxHQUFHLFNBQUFBLENBQVNSLEtBQUssRUFBRTtJQUNsQyxJQUFJQSxLQUFLLENBQUM3RSxNQUFNLENBQUN5QyxTQUFTLENBQUM4QixRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7TUFBRTtJQUFPO0lBQ3JEVyxLQUFLLENBQUNDLElBQUksQ0FBQ0ssV0FBVyxDQUFDLENBQUNsRSxPQUFPLENBQUVnRCxJQUFJLElBQUs7TUFDeENBLElBQUksQ0FBQ2dCLG1CQUFtQixDQUFDLFdBQVcsRUFBRVYsUUFBUSxDQUFDO01BQy9DTixJQUFJLENBQUM3QixTQUFTLENBQUNHLE1BQU0sQ0FBQyxjQUFjLENBQUM7TUFDckMwQixJQUFJLENBQUNnQixtQkFBbUIsQ0FBQyxXQUFXLEVBQUVELFdBQVcsQ0FBQztJQUNwRCxDQUFDLENBQUM7SUFFRlIsS0FBSyxDQUFDTyxlQUFlLENBQUMsQ0FBQztFQUN6QixDQUFDO0VBRURGLEtBQUssQ0FBQ0MsSUFBSSxDQUFDSyxXQUFXLENBQUMsQ0FBQ2xFLE9BQU8sQ0FBRWdELElBQUksSUFBSztJQUN4Q0EsSUFBSSxDQUFDTixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUVZLFFBQVEsQ0FBQztJQUM1Q04sSUFBSSxDQUFDTixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUVxQixXQUFXLENBQUM7RUFDakQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU1JLEtBQUssR0FBRyxlQUFBQSxDQUFlQyxPQUFPLEVBQUVDLFVBQVUsRUFBRTtFQUNoRCxNQUFNWixLQUFLLEdBQUd4QyxRQUFRLENBQUNtQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7RUFDaEQsTUFBTWtCLGdCQUFnQixHQUFHckQsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDO0VBQ3hELE1BQU1xRCxpQkFBaUIsR0FBR0gsT0FBTyxDQUFDSSxLQUFLLENBQUMsRUFBRSxDQUFDO0VBRTNDWixLQUFLLENBQUNDLElBQUksQ0FBQ0osS0FBSyxDQUFDLENBQUN6RCxPQUFPLENBQUVnRCxJQUFJLElBQUs7SUFBQ0EsSUFBSSxDQUFDN0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDO0VBQUEsQ0FBQyxDQUFDO0VBQ3hFa0QsZ0JBQWdCLENBQUNwQyxXQUFXLEdBQUcsRUFBRTtFQUVqQyxLQUFLLElBQUlsRixDQUFDLEdBQUMsQ0FBQyxFQUFFQSxDQUFDLEdBQUN1SCxpQkFBaUIsQ0FBQzNILE1BQU0sRUFBRUksQ0FBQyxFQUFFLEVBQUU7SUFDN0MsTUFBTSxJQUFJeUgsT0FBTyxDQUFFQyxPQUFPLElBQUtDLFVBQVUsQ0FBQ0QsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZESixnQkFBZ0IsQ0FBQ3BDLFdBQVcsSUFBSXFDLGlCQUFpQixDQUFDdkgsQ0FBQyxDQUFDO0VBQ3REO0VBQ0EsTUFBTSxJQUFJeUgsT0FBTyxDQUFFQyxPQUFPLElBQUtDLFVBQVUsQ0FBQ0QsT0FBTyxFQUFFTCxVQUFVLENBQUMsQ0FBQztFQUMvRFQsS0FBSyxDQUFDQyxJQUFJLENBQUNKLEtBQUssQ0FBQyxDQUFDekQsT0FBTyxDQUFFZ0QsSUFBSSxJQUFLO0lBQUNBLElBQUksQ0FBQzdCLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLGFBQWEsQ0FBQztFQUFBLENBQUMsQ0FBQztBQUM3RSxDQUFDO0FBRUQsTUFBTXNELHVCQUF1QixHQUFHLFNBQUFBLENBQUEsRUFBVztFQUN6QyxNQUFNQyxpQkFBaUIsR0FBRzVELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGNBQWMsQ0FBQztFQUNoRTJELGlCQUFpQixDQUFDbkMsZ0JBQWdCLENBQUMsT0FBTyxFQUFHYSxLQUFLLElBQUs7SUFDckQsSUFBSUEsS0FBSyxDQUFDN0UsTUFBTSxDQUFDd0QsV0FBVyxLQUFLLFlBQVksRUFBRTtNQUM3Q3FCLEtBQUssQ0FBQzdFLE1BQU0sQ0FBQ3dELFdBQVcsR0FBRyxVQUFVO0lBQ3ZDLENBQUMsTUFBTTtNQUNMcUIsS0FBSyxDQUFDN0UsTUFBTSxDQUFDd0QsV0FBVyxHQUFHLFlBQVk7SUFDekM7RUFDRixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTTRDLGlCQUFpQixHQUFHLFNBQUFBLENBQUEsRUFBVztFQUNuQyxNQUFNckIsS0FBSyxHQUFHeEMsUUFBUSxDQUFDbUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO0VBRWhEUSxLQUFLLENBQUNDLElBQUksQ0FBQ0osS0FBSyxDQUFDLENBQUN6RCxPQUFPLENBQUVnRCxJQUFJLElBQUs7SUFDbENBLElBQUksQ0FBQzdCLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNqQzBCLElBQUksQ0FBQzdCLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLEtBQUssQ0FBQztJQUM1QjBCLElBQUksQ0FBQzdCLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLFFBQVEsQ0FBQztFQUNqQyxDQUFDLENBQUM7QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTjhDO0FBQzZKO0FBQ3pKO0FBRXBELE1BQU15RCxVQUFVLEdBQUcsU0FBQUEsQ0FBQSxFQUFXO0VBQzVCLE1BQU1DLFlBQVksR0FBRy9ELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBQzdELE1BQU0rRCxXQUFXLEdBQUdoRSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUM7RUFDMUQsTUFBTWdFLElBQUksR0FBR2pFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUM1QyxNQUFNaUUsTUFBTSxHQUFHbEUsUUFBUSxDQUFDQyxhQUFhLENBQUMsU0FBUyxDQUFDO0VBQ2hELE1BQU1rRSxJQUFJLEdBQUduRSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFDNUMsTUFBTW1FLFVBQVUsR0FBR3BFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUV4RDhELFlBQVksQ0FBQ3RDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0lBQzNDM0IsaURBQVcsQ0FBQyxDQUFDO0lBQ2JhLHNEQUFnQixDQUFDLENBQUM7SUFDbEJDLCtDQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztFQUNqQyxDQUFDLENBQUM7RUFFRm9ELFdBQVcsQ0FBQ3ZDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0lBQzFDM0IsaURBQVcsQ0FBQyxDQUFDO0lBQ2JVLDhDQUFRLENBQUMsQ0FBQztJQUNWNkQsZUFBZSxDQUFDLENBQUM7SUFDakJ6RCwrQ0FBUyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUM7RUFDbkMsQ0FBQyxDQUFDO0VBRUZxRCxJQUFJLENBQUN4QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUNuQyxNQUFNNkMsUUFBUSxHQUFHNUcscURBQVEsQ0FBQyxDQUFDO0lBQzNCK0Msc0RBQWdCLENBQUMsQ0FBQztJQUNsQkQsOENBQVEsQ0FBQyxDQUFDO0lBQ1YrRCxnQkFBZ0IsQ0FBQ0QsUUFBUSxFQUFFQSxRQUFRLENBQUNwRyxZQUFZLENBQUM7RUFDbkQsQ0FBQyxDQUFDO0VBRUZnRyxNQUFNLENBQUN6QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUNyQyxNQUFNNkMsUUFBUSxHQUFHNUcscURBQVEsQ0FBQyxDQUFDO0lBQzNCK0Msc0RBQWdCLENBQUMsQ0FBQztJQUNsQkQsOENBQVEsQ0FBQyxDQUFDO0lBQ1YrRCxnQkFBZ0IsQ0FBQ0QsUUFBUSxFQUFFQSxRQUFRLENBQUN4RixjQUFjLENBQUM7RUFDckQsQ0FBQyxDQUFDO0VBRUZxRixJQUFJLENBQUMxQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUNuQyxNQUFNNkMsUUFBUSxHQUFHNUcscURBQVEsQ0FBQyxDQUFDO0lBQzNCK0Msc0RBQWdCLENBQUMsQ0FBQztJQUNsQkQsOENBQVEsQ0FBQyxDQUFDO0lBQ1YrRCxnQkFBZ0IsQ0FBQ0QsUUFBUSxFQUFFQSxRQUFRLENBQUM5RSxjQUFjLENBQUM7RUFDckQsQ0FBQyxDQUFDO0VBRUY0RSxVQUFVLENBQUMzQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUN6QyxNQUFNNkMsUUFBUSxHQUFHNUcscURBQVEsQ0FBQyxDQUFDO0lBQzNCK0Msc0RBQWdCLENBQUMsQ0FBQztJQUNsQkQsOENBQVEsQ0FBQyxDQUFDO0lBQ1YrRCxnQkFBZ0IsQ0FBQ0QsUUFBUSxFQUFFQSxRQUFRLENBQUN6RSxZQUFZLENBQUM7RUFDbkQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0wRSxnQkFBZ0IsR0FBRyxlQUFBQSxDQUFlRCxRQUFRLEVBQUVFLGNBQWMsRUFBRTtFQUNoRSxNQUFNM0MsTUFBTSxHQUFHekUsbURBQU0sQ0FBQyxVQUFVLENBQUM7RUFDakMsTUFBTThFLFdBQVcsR0FBR2xDLFFBQVEsQ0FBQ21DLGdCQUFnQixDQUFDLHlDQUF5QyxDQUFDO0VBQ3hGLE1BQU1zQyxhQUFhLEdBQUd6RSxRQUFRLENBQUNtQyxnQkFBZ0IsQ0FBQyx5Q0FBeUMsQ0FBQztFQUMxRixNQUFNdUMsVUFBVSxHQUFHMUUsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDO0VBQ2xELE1BQU0wRSxLQUFLLEdBQUcsQ0FBQztJQUFDaEosTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFTLENBQUMsRUFBRTtJQUFDMUIsTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFZLENBQUMsRUFBRTtJQUFDMUIsTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFXLENBQUMsRUFBRTtJQUFDMUIsTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFXLENBQUMsRUFBRTtJQUFDMUIsTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFhLENBQUMsQ0FBQztFQUMvSyxJQUFJdEIsQ0FBQyxHQUFHLENBQUM7RUFFVCxNQUFNNkksUUFBUSxHQUFHLGVBQUFBLENBQUEsRUFBaUI7SUFDaEMsSUFBSS9DLE1BQU0sQ0FBQ3RFLGVBQWUsQ0FBQ0osU0FBUyxDQUFDLENBQUMsRUFBRTtNQUN0QyxNQUFNK0YsMkNBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7TUFDaEMsT0FBTyxJQUFJO0lBQ2I7SUFDQSxJQUFJb0IsUUFBUSxDQUFDL0csZUFBZSxDQUFDSixTQUFTLENBQUMsQ0FBQyxFQUFFO01BQ3hDLE1BQU0rRiwyQ0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7TUFDOUIsT0FBTyxJQUFJO0lBQ2I7SUFFQSxPQUFPLEtBQUs7RUFDZCxDQUFDO0VBRUQsTUFBTXRHLFNBQVMsR0FBRyxlQUFBQSxDQUFlMEYsS0FBSyxFQUFFO0lBQ3RDLE1BQU1uRSxHQUFHLEdBQUdzRSxNQUFNLENBQUNILEtBQUssQ0FBQzdFLE1BQU0sQ0FBQ2lGLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNbkUsTUFBTSxHQUFHa0UsTUFBTSxDQUFDSCxLQUFLLENBQUM3RSxNQUFNLENBQUNpRixZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0QsTUFBTTVGLFdBQVcsR0FBR2tELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDZ0IsV0FBVyxDQUFDc0IsV0FBVyxDQUFDLENBQUM7SUFDcEYsTUFBTTNDLG1CQUFtQixHQUFHaUMsTUFBTSxDQUFDdEUsZUFBZSxDQUFDWCxTQUFTLENBQUMrSCxLQUFLLENBQUM1SSxDQUFDLENBQUMsQ0FBQ0osTUFBTSxFQUFFLENBQUN3QyxHQUFHLEVBQUVJLE1BQU0sQ0FBQyxFQUFFekIsV0FBVyxDQUFDO0lBQ3pHLElBQUksQ0FBQzhDLG1CQUFtQixFQUFFO0lBQzFCZ0MscURBQWUsQ0FBQ0MsTUFBTSxFQUFFLEtBQUssQ0FBQztJQUM5QjlGLENBQUMsSUFBSSxDQUFDO0lBRU4sSUFBSUEsQ0FBQyxHQUFDLENBQUMsRUFBRTtNQUNQLE1BQU1tSCwyQ0FBSyxDQUFFLGNBQWF5QixLQUFLLENBQUM1SSxDQUFDLENBQUMsQ0FBQ3NCLElBQUssR0FBRSxFQUFFLENBQUMsQ0FBQztNQUM5QzRFLG1EQUFhLENBQUNKLE1BQU0sRUFBRThDLEtBQUssQ0FBQzVJLENBQUMsQ0FBQyxDQUFDSixNQUFNLENBQUM7TUFDdEM7SUFDRjtJQUVBZ0gsS0FBSyxDQUFDQyxJQUFJLENBQUNWLFdBQVcsQ0FBQyxDQUFDbkQsT0FBTyxDQUFFZ0QsSUFBSSxJQUFLQSxJQUFJLENBQUNnQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUVuRyxTQUFTLENBQUMsQ0FBQztJQUN2RixNQUFNc0csMkNBQUssQ0FBQywyQkFBMkIsRUFBRSxHQUFHLENBQUM7SUFDN0NvQixRQUFRLENBQUM3RSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNCbUMscURBQWUsQ0FBQzBDLFFBQVEsRUFBRSxJQUFJLENBQUM7SUFDL0IsTUFBTXBCLDJDQUFLLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDRixnREFBVSxDQUFDc0IsUUFBUSxDQUFDO0lBRXBCM0IsS0FBSyxDQUFDQyxJQUFJLENBQUM2QixhQUFhLENBQUMsQ0FBQzFGLE9BQU8sQ0FBRWdELElBQUksSUFBS0EsSUFBSSxDQUFDTixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVqRSxNQUFNLENBQUMsQ0FBQztJQUVuRjhFLEtBQUssQ0FBQ08sZUFBZSxDQUFDLENBQUM7RUFDekIsQ0FBQztFQUVELE1BQU1yRixNQUFNLEdBQUcsZUFBQUEsQ0FBZThFLEtBQUssRUFBRTtJQUNuQyxNQUFNbkUsR0FBRyxHQUFHc0UsTUFBTSxDQUFDSCxLQUFLLENBQUM3RSxNQUFNLENBQUNpRixZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsTUFBTW5FLE1BQU0sR0FBR2tFLE1BQU0sQ0FBQ0gsS0FBSyxDQUFDN0UsTUFBTSxDQUFDaUYsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRS9ELElBQUlwSCxpRUFBa0IsQ0FBQ2dKLFFBQVEsQ0FBQy9HLGVBQWUsQ0FBQ2hCLGVBQWUsRUFBRSxDQUFDNEIsR0FBRyxFQUFFSSxNQUFNLENBQUMsQ0FBQyxFQUFFO01BQy9FLE1BQU0yRSwyQ0FBSyxDQUFDLHNEQUFzRCxFQUFFLENBQUMsQ0FBQztNQUN0RTtJQUNGO0lBQ0FyQixNQUFNLENBQUNyRSxNQUFNLENBQUM4RyxRQUFRLEVBQUUsQ0FBQ25HLEdBQUcsRUFBRUksTUFBTSxDQUFDLENBQUM7SUFDdENxRCxxREFBZSxDQUFDMEMsUUFBUSxFQUFFLElBQUksQ0FBQztJQUMvQk8sY0FBYyxFQUNaLEtBQUssSUFBSTlJLENBQUMsR0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBQ3VJLFFBQVEsQ0FBQy9HLGVBQWUsQ0FBQ2pCLGVBQWUsQ0FBQ1gsTUFBTSxFQUFFSSxDQUFDLEVBQUUsRUFBRTtNQUNwRSxJQUFJVCxpRUFBa0IsQ0FBQ2dKLFFBQVEsQ0FBQy9HLGVBQWUsQ0FBQ2pCLGVBQWUsQ0FBQ1AsQ0FBQyxDQUFDLENBQUNVLFdBQVcsRUFBRSxDQUFDMEIsR0FBRyxFQUFFSSxNQUFNLENBQUMsQ0FBQyxFQUFFO1FBQzlGLElBQUkrRixRQUFRLENBQUMvRyxlQUFlLENBQUNqQixlQUFlLENBQUNQLENBQUMsQ0FBQyxDQUFDVyxJQUFJLENBQUNOLE1BQU0sQ0FBQyxDQUFDLEVBQUU7VUFDN0QsTUFBTThHLDJDQUFLLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDO1VBQ3BDLE1BQU0yQixjQUFjO1FBQ3RCO1FBQ0EsTUFBTTNCLDJDQUFLLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDO1FBQ25DLE1BQU0yQixjQUFjO01BQ3RCO01BQ0EsSUFBSTlJLENBQUMsS0FBS3VJLFFBQVEsQ0FBQy9HLGVBQWUsQ0FBQ2pCLGVBQWUsQ0FBQ1gsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUM3RCxNQUFNdUgsMkNBQUssQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDO01BQ2pDO0lBQ0Y7SUFFRixJQUFJLE1BQU0wQixRQUFRLENBQUMsQ0FBQyxFQUFFO01BQ3BCakMsS0FBSyxDQUFDQyxJQUFJLENBQUM2QixhQUFhLENBQUMsQ0FBQzFGLE9BQU8sQ0FBRWdELElBQUksSUFBS0EsSUFBSSxDQUFDZ0IsbUJBQW1CLENBQUMsT0FBTyxFQUFFdkYsTUFBTSxDQUFDLENBQUM7TUFDdEZrSCxVQUFVLENBQUN4RSxTQUFTLENBQUNHLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFFckNxRSxVQUFVLENBQUNqRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtRQUN6Q29DLHVEQUFpQixDQUFDLENBQUM7UUFDbkJ2RCw4Q0FBUSxDQUFDLENBQUM7UUFDVkYsaURBQVcsQ0FBQyxDQUFDO1FBQ2JzRSxVQUFVLENBQUN4RSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDcEMsQ0FBQyxDQUFDO01BQ0Y7SUFDRjtJQUVBd0MsS0FBSyxDQUFDQyxJQUFJLENBQUM2QixhQUFhLENBQUMsQ0FBQzFGLE9BQU8sQ0FBRWdELElBQUksSUFBS0EsSUFBSSxDQUFDZ0IsbUJBQW1CLENBQUMsT0FBTyxFQUFFdkYsTUFBTSxDQUFDLENBQUM7SUFDdEYsTUFBTTBGLDJDQUFLLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDO0lBQ3pDLE1BQU0sQ0FBQzRCLFdBQVcsRUFBRUMsY0FBYyxDQUFDLEdBQUdQLGNBQWMsQ0FBQzNDLE1BQU0sQ0FBQztJQUM1REQscURBQWUsQ0FBQ0MsTUFBTSxFQUFFLEtBQUssQ0FBQztJQUM5Qm1ELGdCQUFnQixFQUNkLEtBQUssSUFBSWpKLENBQUMsR0FBQyxDQUFDLEVBQUVBLENBQUMsR0FBQzhGLE1BQU0sQ0FBQ3RFLGVBQWUsQ0FBQ2pCLGVBQWUsQ0FBQ1gsTUFBTSxFQUFFSSxDQUFDLEVBQUUsRUFBRTtNQUNsRSxJQUFJVCxpRUFBa0IsQ0FBQ3VHLE1BQU0sQ0FBQ3RFLGVBQWUsQ0FBQ2pCLGVBQWUsQ0FBQ1AsQ0FBQyxDQUFDLENBQUNVLFdBQVcsRUFBRSxDQUFDcUksV0FBVyxFQUFFQyxjQUFjLENBQUMsQ0FBQyxFQUFFO1FBQzVHLElBQUlsRCxNQUFNLENBQUN0RSxlQUFlLENBQUNqQixlQUFlLENBQUNQLENBQUMsQ0FBQyxDQUFDVyxJQUFJLENBQUNOLE1BQU0sQ0FBQyxDQUFDLEVBQUU7VUFDM0QsTUFBTThHLDJDQUFLLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDO1VBQ3RDLE1BQU04QixnQkFBZ0I7UUFDeEI7UUFDQSxNQUFNOUIsMkNBQUssQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUM7UUFDckMsTUFBTThCLGdCQUFnQjtNQUN4QjtNQUNBLElBQUlqSixDQUFDLEtBQUs4RixNQUFNLENBQUN0RSxlQUFlLENBQUNqQixlQUFlLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDM0QsTUFBTXVILDJDQUFLLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQztNQUNuQztJQUNGO0lBRUYsSUFBSSxNQUFNMEIsUUFBUSxDQUFDLENBQUMsRUFBRTtNQUNwQmpDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDNkIsYUFBYSxDQUFDLENBQUMxRixPQUFPLENBQUVnRCxJQUFJLElBQUtBLElBQUksQ0FBQ2dCLG1CQUFtQixDQUFDLE9BQU8sRUFBRXZGLE1BQU0sQ0FBQyxDQUFDO01BQ3RGa0gsVUFBVSxDQUFDeEUsU0FBUyxDQUFDRyxNQUFNLENBQUMsUUFBUSxDQUFDO01BRXJDcUUsVUFBVSxDQUFDakQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDekNvQyx1REFBaUIsQ0FBQyxDQUFDO1FBQ25CdkQsOENBQVEsQ0FBQyxDQUFDO1FBQ1ZGLGlEQUFXLENBQUMsQ0FBQztRQUNic0UsVUFBVSxDQUFDeEUsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BQ3BDLENBQUMsQ0FBQztNQUNGO0lBQ0Y7SUFFQSxNQUFNK0MsMkNBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7SUFDdENGLGdEQUFVLENBQUNzQixRQUFRLENBQUM7SUFDcEIzQixLQUFLLENBQUNDLElBQUksQ0FBQzZCLGFBQWEsQ0FBQyxDQUFDMUYsT0FBTyxDQUFFZ0QsSUFBSSxJQUFLQSxJQUFJLENBQUNOLGdCQUFnQixDQUFDLE9BQU8sRUFBRWpFLE1BQU0sQ0FBQyxDQUFDO0lBRW5GOEUsS0FBSyxDQUFDTyxlQUFlLENBQUMsQ0FBQztFQUN6QixDQUFDO0VBRUQsTUFBTUssMkNBQUssQ0FBQyxxQkFBcUIsQ0FBQztFQUNsQ2pCLG1EQUFhLENBQUNKLE1BQU0sRUFBRSxDQUFDLENBQUM7RUFDeEJjLEtBQUssQ0FBQ0MsSUFBSSxDQUFDVixXQUFXLENBQUMsQ0FBQ25ELE9BQU8sQ0FBRWdELElBQUksSUFBS0EsSUFBSSxDQUFDTixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU3RSxTQUFTLENBQUMsQ0FBQztBQUN0RixDQUFDO0FBRUQsTUFBTXlILGVBQWUsR0FBRyxlQUFBQSxDQUFBLEVBQWlCO0VBQ3ZDLE1BQU14RCxTQUFTLEdBQUd6RCxtREFBTSxDQUFDLFVBQVUsQ0FBQztFQUNwQyxNQUFNMEQsU0FBUyxHQUFHMUQsbURBQU0sQ0FBQyxVQUFVLENBQUM7RUFDcEMsTUFBTTZILGNBQWMsR0FBR2pGLFFBQVEsQ0FBQ21DLGdCQUFnQixDQUFFLHlDQUF3QyxDQUFDO0VBQzNGLE1BQU0rQyxjQUFjLEdBQUdsRixRQUFRLENBQUNtQyxnQkFBZ0IsQ0FBRSx5Q0FBd0MsQ0FBQztFQUMzRixNQUFNdUMsVUFBVSxHQUFHMUUsUUFBUSxDQUFDQyxhQUFhLENBQUMsT0FBTyxDQUFDO0VBQ2xELE1BQU0wRSxLQUFLLEdBQUcsQ0FBQztJQUFDaEosTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFTLENBQUMsRUFBRTtJQUFDMUIsTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFZLENBQUMsRUFBRTtJQUFDMUIsTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFXLENBQUMsRUFBRTtJQUFDMUIsTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFXLENBQUMsRUFBRTtJQUFDMUIsTUFBTSxFQUFFLENBQUM7SUFBRTBCLElBQUksRUFBRTtFQUFhLENBQUMsQ0FBQztFQUMvSyxJQUFJdEIsQ0FBQyxHQUFHLENBQUM7RUFDVCxJQUFJb0osYUFBYSxHQUFHdEUsU0FBUztFQUM3QixJQUFJdUUsWUFBWTtFQUVoQixNQUFNUixRQUFRLEdBQUcsZUFBQUEsQ0FBQSxFQUFpQjtJQUNoQyxJQUFJL0QsU0FBUyxDQUFDdEQsZUFBZSxDQUFDSixTQUFTLENBQUMsQ0FBQyxFQUFFO01BQ3pDLE1BQU0rRiwyQ0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztNQUNoQyxPQUFPLElBQUk7SUFDYjtJQUNBLElBQUlwQyxTQUFTLENBQUN2RCxlQUFlLENBQUNKLFNBQVMsQ0FBQyxDQUFDLEVBQUU7TUFDekMsTUFBTStGLDJDQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO01BQ2hDLE9BQU8sSUFBSTtJQUNiO0lBRUEsT0FBTyxLQUFLO0VBQ2QsQ0FBQztFQUVELE1BQU10RyxTQUFTLEdBQUcsZUFBQUEsQ0FBZTBGLEtBQUssRUFBRTtJQUN0QyxNQUFNbkUsR0FBRyxHQUFHc0UsTUFBTSxDQUFDSCxLQUFLLENBQUM3RSxNQUFNLENBQUNpRixZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsTUFBTW5FLE1BQU0sR0FBR2tFLE1BQU0sQ0FBQ0gsS0FBSyxDQUFDN0UsTUFBTSxDQUFDaUYsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELE1BQU01RixXQUFXLEdBQUdrRCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQ2dCLFdBQVcsQ0FBQ3NCLFdBQVcsQ0FBQyxDQUFDO0lBQ3BGLE1BQU0zQyxtQkFBbUIsR0FBR3VGLGFBQWEsQ0FBQzVILGVBQWUsQ0FBQ1gsU0FBUyxDQUFDK0gsS0FBSyxDQUFDNUksQ0FBQyxDQUFDLENBQUNKLE1BQU0sRUFBRSxDQUFDd0MsR0FBRyxFQUFFSSxNQUFNLENBQUMsRUFBRXpCLFdBQVcsQ0FBQztJQUNoSCxJQUFJLENBQUM4QyxtQkFBbUIsRUFBRTtJQUMxQmdDLHFEQUFlLENBQUN1RCxhQUFhLEVBQUUsS0FBSyxDQUFDO0lBQ3JDcEosQ0FBQyxJQUFJLENBQUM7SUFFTixJQUFJQSxDQUFDLEdBQUMsQ0FBQyxFQUFFO01BQ1AsTUFBTW1ILDJDQUFLLENBQUUsY0FBYXlCLEtBQUssQ0FBQzVJLENBQUMsQ0FBQyxDQUFDc0IsSUFBSyxHQUFFLEVBQUUsQ0FBQyxDQUFDO01BQzlDNEUsbURBQWEsQ0FBQ2tELGFBQWEsRUFBRVIsS0FBSyxDQUFDNUksQ0FBQyxDQUFDLENBQUNKLE1BQU0sQ0FBQztNQUM3QztJQUNGO0lBRUFJLENBQUMsR0FBRyxDQUFDO0lBRUwsSUFBSW9KLGFBQWEsQ0FBQzdILFVBQVUsS0FBSyxVQUFVLEVBQUU7TUFDM0NxRixLQUFLLENBQUNDLElBQUksQ0FBQ3FDLGNBQWMsQ0FBQyxDQUFDbEcsT0FBTyxDQUFFZ0QsSUFBSSxJQUFLQSxJQUFJLENBQUNnQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUVuRyxTQUFTLENBQUMsQ0FBQztNQUMxRixNQUFNLElBQUk0RyxPQUFPLENBQUVDLE9BQU8sSUFBS0MsVUFBVSxDQUFDRCxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7TUFDeERkLEtBQUssQ0FBQ0MsSUFBSSxDQUFDcUMsY0FBYyxDQUFDLENBQUNsRyxPQUFPLENBQUVnRCxJQUFJLElBQUtBLElBQUksQ0FBQ04sZ0JBQWdCLENBQUMsT0FBTyxFQUFFN0UsU0FBUyxDQUFDLENBQUM7TUFDdkZzRSx1REFBaUIsQ0FBQyxZQUFZO1FBQzVCeUIsS0FBSyxDQUFDQyxJQUFJLENBQUNxQyxjQUFjLENBQUMsQ0FBQ2xHLE9BQU8sQ0FBRWdELElBQUksSUFBS0EsSUFBSSxDQUFDZ0IsbUJBQW1CLENBQUMsT0FBTyxFQUFFbkcsU0FBUyxDQUFDLENBQUM7UUFDMUYrRixLQUFLLENBQUNDLElBQUksQ0FBQ3NDLGNBQWMsQ0FBQyxDQUFDbkcsT0FBTyxDQUFFZ0QsSUFBSSxJQUFLQSxJQUFJLENBQUNOLGdCQUFnQixDQUFDLE9BQU8sRUFBRTdFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZGZ0YscURBQWUsQ0FBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQztRQUNoQ3NFLGFBQWEsR0FBR3JFLFNBQVM7UUFDekIsTUFBTW9DLDJDQUFLLENBQUMsK0JBQStCLENBQUM7UUFDNUNqQixtREFBYSxDQUFDbkIsU0FBUyxFQUFFLENBQUMsQ0FBQztNQUM3QixDQUFDLENBQUM7SUFDSixDQUFDLE1BQU07TUFDTDZCLEtBQUssQ0FBQ0MsSUFBSSxDQUFDc0MsY0FBYyxDQUFDLENBQUNuRyxPQUFPLENBQUVnRCxJQUFJLElBQUtBLElBQUksQ0FBQ2dCLG1CQUFtQixDQUFDLE9BQU8sRUFBRW5HLFNBQVMsQ0FBQyxDQUFDO01BQzFGLE1BQU0sSUFBSTRHLE9BQU8sQ0FBRUMsT0FBTyxJQUFLQyxVQUFVLENBQUNELE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztNQUN4RGQsS0FBSyxDQUFDQyxJQUFJLENBQUNzQyxjQUFjLENBQUMsQ0FBQ25HLE9BQU8sQ0FBRWdELElBQUksSUFBS0EsSUFBSSxDQUFDTixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU3RSxTQUFTLENBQUMsQ0FBQztNQUN2RnNFLHVEQUFpQixDQUFDLFlBQVk7UUFDNUJ5QixLQUFLLENBQUNDLElBQUksQ0FBQ3NDLGNBQWMsQ0FBQyxDQUFDbkcsT0FBTyxDQUFFZ0QsSUFBSSxJQUFLQSxJQUFJLENBQUNnQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUVuRyxTQUFTLENBQUMsQ0FBQztRQUMxRitGLEtBQUssQ0FBQ0MsSUFBSSxDQUFDc0MsY0FBYyxDQUFDLENBQUNuRyxPQUFPLENBQUVnRCxJQUFJLElBQUtBLElBQUksQ0FBQ04sZ0JBQWdCLENBQUMsT0FBTyxFQUFFakUsTUFBTSxDQUFDLENBQUM7UUFDcEZvRSxxREFBZSxDQUFDZCxTQUFTLEVBQUUsSUFBSSxDQUFDO1FBQ2hDYyxxREFBZSxDQUFDZixTQUFTLEVBQUUsS0FBSyxDQUFDO1FBQ2pDc0UsYUFBYSxHQUFHdEUsU0FBUztRQUN6QnVFLFlBQVksR0FBR3RFLFNBQVM7UUFDeEIsTUFBTW9DLDJDQUFLLENBQUMsNEJBQTRCLENBQUM7UUFDekNGLGdEQUFVLENBQUNvQyxZQUFZLENBQUM7TUFDMUIsQ0FBQyxDQUFDO0lBQ0o7RUFDRixDQUFDO0VBRUQsTUFBTTVILE1BQU0sR0FBRyxlQUFBQSxDQUFlOEUsS0FBSyxFQUFFO0lBQ25DLE1BQU1uRSxHQUFHLEdBQUdzRSxNQUFNLENBQUNILEtBQUssQ0FBQzdFLE1BQU0sQ0FBQ2lGLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6RCxNQUFNbkUsTUFBTSxHQUFHa0UsTUFBTSxDQUFDSCxLQUFLLENBQUM3RSxNQUFNLENBQUNpRixZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0QsTUFBTTJDLGtCQUFrQixHQUFHckYsUUFBUSxDQUFDbUMsZ0JBQWdCLENBQUUsaUJBQWdCZ0QsYUFBYSxDQUFDN0gsVUFBVyxtQkFBa0IsQ0FBQztJQUNsSCxNQUFNZ0ksaUJBQWlCLEdBQUd0RixRQUFRLENBQUNtQyxnQkFBZ0IsQ0FBRSxpQkFBZ0JpRCxZQUFZLENBQUM5SCxVQUFXLG1CQUFrQixDQUFDO0lBQ2hILElBQUloQyxpRUFBa0IsQ0FBQzhKLFlBQVksQ0FBQzdILGVBQWUsQ0FBQ2hCLGVBQWUsRUFBRSxDQUFDNEIsR0FBRyxFQUFFSSxNQUFNLENBQUMsQ0FBQyxFQUFFO01BQ25GLE1BQU0yRSwyQ0FBSyxDQUFFLG1DQUFrQ2lDLGFBQWEsQ0FBQzdILFVBQVcsb0JBQW1CLEVBQUUsQ0FBQyxDQUFDO01BQy9GO0lBQ0Y7SUFDQTZILGFBQWEsQ0FBQzNILE1BQU0sQ0FBQzRILFlBQVksRUFBRSxDQUFDakgsR0FBRyxFQUFFSSxNQUFNLENBQUMsQ0FBQztJQUNqRHFELHFEQUFlLENBQUN3RCxZQUFZLEVBQUUsSUFBSSxDQUFDO0lBQ25DUCxjQUFjLEVBQ1osS0FBSyxJQUFJOUksQ0FBQyxHQUFDLENBQUMsRUFBRUEsQ0FBQyxHQUFDcUosWUFBWSxDQUFDN0gsZUFBZSxDQUFDakIsZUFBZSxDQUFDWCxNQUFNLEVBQUVJLENBQUMsRUFBRSxFQUFFO01BQ3hFLElBQUlULGlFQUFrQixDQUFDOEosWUFBWSxDQUFDN0gsZUFBZSxDQUFDakIsZUFBZSxDQUFDUCxDQUFDLENBQUMsQ0FBQ1UsV0FBVyxFQUFFLENBQUMwQixHQUFHLEVBQUVJLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFDbEcsSUFBSTZHLFlBQVksQ0FBQzdILGVBQWUsQ0FBQ2pCLGVBQWUsQ0FBQ1AsQ0FBQyxDQUFDLENBQUNXLElBQUksQ0FBQ04sTUFBTSxDQUFDLENBQUMsRUFBRTtVQUNqRSxNQUFNOEcsMkNBQUssQ0FBRSxHQUFFaUMsYUFBYSxDQUFDN0gsVUFBVyxlQUFjLEVBQUUsR0FBRyxDQUFDO1VBQzVELE1BQU11SCxjQUFjO1FBQ3RCO1FBQ0EsTUFBTTNCLDJDQUFLLENBQUUsR0FBRWlDLGFBQWEsQ0FBQzdILFVBQVcsY0FBYSxFQUFFLEdBQUcsQ0FBQztRQUMzRCxNQUFNdUgsY0FBYztNQUN0QjtNQUNBLElBQUk5SSxDQUFDLEtBQUtxSixZQUFZLENBQUM3SCxlQUFlLENBQUNqQixlQUFlLENBQUNYLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDakUsTUFBTXVILDJDQUFLLENBQUUsR0FBRWlDLGFBQWEsQ0FBQzdILFVBQVcsVUFBUyxFQUFFLEdBQUcsQ0FBQztNQUN6RDtJQUNGO0lBRUYsSUFBSSxNQUFNc0gsUUFBUSxDQUFDLENBQUMsRUFBRTtNQUNwQmpDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDMEMsaUJBQWlCLENBQUMsQ0FBQ3ZHLE9BQU8sQ0FBRWdELElBQUksSUFBS0EsSUFBSSxDQUFDZ0IsbUJBQW1CLENBQUMsT0FBTyxFQUFFdkYsTUFBTSxDQUFDLENBQUM7TUFDMUZrSCxVQUFVLENBQUN4RSxTQUFTLENBQUNHLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDbkNxRSxVQUFVLENBQUNqRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtRQUN6Q29DLHVEQUFpQixDQUFDLENBQUM7UUFDbkJ2RCw4Q0FBUSxDQUFDLENBQUM7UUFDVkYsaURBQVcsQ0FBQyxDQUFDO1FBQ2JzRSxVQUFVLENBQUN4RSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDcEMsQ0FBQyxDQUFDO01BQ0o7SUFDRjtJQUNBd0MsS0FBSyxDQUFDQyxJQUFJLENBQUMwQyxpQkFBaUIsQ0FBQyxDQUFDdkcsT0FBTyxDQUFFZ0QsSUFBSSxJQUFLQSxJQUFJLENBQUNnQixtQkFBbUIsQ0FBQyxPQUFPLEVBQUV2RixNQUFNLENBQUMsQ0FBQztJQUMxRixNQUFNLElBQUlnRyxPQUFPLENBQUVDLE9BQU8sSUFBS0MsVUFBVSxDQUFDRCxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDeERkLEtBQUssQ0FBQ0MsSUFBSSxDQUFDMEMsaUJBQWlCLENBQUMsQ0FBQ3ZHLE9BQU8sQ0FBRWdELElBQUksSUFBS0EsSUFBSSxDQUFDTixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVqRSxNQUFNLENBQUMsQ0FBQztJQUN2RjBELHVEQUFpQixDQUFDLFlBQVk7TUFDNUJ5QixLQUFLLENBQUNDLElBQUksQ0FBQzBDLGlCQUFpQixDQUFDLENBQUN2RyxPQUFPLENBQUVnRCxJQUFJLElBQUtBLElBQUksQ0FBQ2dCLG1CQUFtQixDQUFDLE9BQU8sRUFBRXZGLE1BQU0sQ0FBQyxDQUFDO01BQzFGbUYsS0FBSyxDQUFDQyxJQUFJLENBQUN5QyxrQkFBa0IsQ0FBQyxDQUFDdEcsT0FBTyxDQUFFZ0QsSUFBSSxJQUFLQSxJQUFJLENBQUNOLGdCQUFnQixDQUFDLE9BQU8sRUFBRWpFLE1BQU0sQ0FBQyxDQUFDO01BQ3hGb0UscURBQWUsQ0FBQ3dELFlBQVksRUFBRSxLQUFLLENBQUM7TUFDcEN4RCxxREFBZSxDQUFDdUQsYUFBYSxFQUFFLElBQUksQ0FBQztNQUNwQyxNQUFNLENBQUNJLENBQUMsRUFBRUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQ0osWUFBWSxFQUFFRCxhQUFhLENBQUM7TUFDNUNDLFlBQVksR0FBR0ksQ0FBQztNQUNoQkwsYUFBYSxHQUFHSSxDQUFDO01BRWpCLE1BQU1yQywyQ0FBSyxDQUFFLEdBQUVpQyxhQUFhLENBQUM3SCxVQUFXLG9CQUFtQixDQUFDO01BQzVEMEYsZ0RBQVUsQ0FBQ29DLFlBQVksQ0FBQztJQUMxQixDQUFDLENBQUM7SUFFRjlDLEtBQUssQ0FBQ08sZUFBZSxDQUFDLENBQUM7RUFDekIsQ0FBQztFQUVELE1BQU1LLDJDQUFLLENBQUMsK0JBQStCLENBQUM7RUFDNUNqQixtREFBYSxDQUFDcEIsU0FBUyxFQUFFLENBQUMsQ0FBQztFQUMzQjhCLEtBQUssQ0FBQ0MsSUFBSSxDQUFDcUMsY0FBYyxDQUFDLENBQUNsRyxPQUFPLENBQUVnRCxJQUFJLElBQUtBLElBQUksQ0FBQ04sZ0JBQWdCLENBQUMsT0FBTyxFQUFFN0UsU0FBUyxDQUFDLENBQUM7QUFDekYsQ0FBQztBQUVELGlFQUFla0gsVUFBVTs7Ozs7Ozs7Ozs7Ozs7QUMzVEo7QUFDVztBQUNnQjtBQUVoREEsaURBQVUsQ0FBQyxDQUFDO0FBQ1pILDZEQUF1QixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTHpCO0FBQzBHO0FBQ2pCO0FBQ087QUFDaEcsNENBQTRDLG1JQUE2QztBQUN6Riw0Q0FBNEMsK0dBQW1DO0FBQy9FLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0YseUNBQXlDLHNGQUErQjtBQUN4RSx5Q0FBeUMsc0ZBQStCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLGFBQWEsbUNBQW1DO0FBQ2hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtQ0FBbUM7QUFDN0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLGdGQUFnRixZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxjQUFjLE1BQU0sVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLGFBQWEsTUFBTSxZQUFZLE1BQU0sS0FBSyxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxZQUFZLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLEtBQUssTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLGFBQWEsTUFBTSxZQUFZLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGNBQWMsTUFBTSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxLQUFLLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXJyYXktc2VhcmNoLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFycmF5SW5jbHVkZXNBcnJheSA9IGZ1bmN0aW9uKHBhcmVudEFycmF5LCBjaGlsZEFycmF5LCBnZXRJbmRleCA9IGZhbHNlLCBjdXJyZW50SW5kZXggPSAwKSB7XG4gIGlmIChwYXJlbnRBcnJheS5sZW5ndGggPT09IDApIHsgcmV0dXJuIGZhbHNlIH1cbiAgaWYgKHBhcmVudEFycmF5WzBdLmxlbmd0aCAhPT0gY2hpbGRBcnJheS5sZW5ndGgpIHtcbiAgICBwYXJlbnRBcnJheSA9IHBhcmVudEFycmF5LnNsaWNlKDEpO1xuICAgIHJldHVybiBhcnJheUluY2x1ZGVzQXJyYXkocGFyZW50QXJyYXksIGNoaWxkQXJyYXksIGdldEluZGV4LCBjdXJyZW50SW5kZXggKyAxKTtcbiAgfVxuICBmb3IgKGxldCBpPTA7IGk8Y2hpbGRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjaGlsZEFycmF5W2ldICE9PSBwYXJlbnRBcnJheVswXVtpXSkgeyBcbiAgICAgIHBhcmVudEFycmF5ID0gcGFyZW50QXJyYXkuc2xpY2UoMSk7XG4gICAgICByZXR1cm4gYXJyYXlJbmNsdWRlc0FycmF5KHBhcmVudEFycmF5LCBjaGlsZEFycmF5LCBnZXRJbmRleCwgY3VycmVudEluZGV4ICsgMSlcbiAgICB9XG4gIH1cbiAgaWYgKGdldEluZGV4KSB7IHJldHVybiBjdXJyZW50SW5kZXggfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCB7IGFycmF5SW5jbHVkZXNBcnJheSB9OyIsImltcG9ydCB7IGFycmF5SW5jbHVkZXNBcnJheSB9IGZyb20gXCIuL2FycmF5LXNlYXJjaFwiO1xuXG5jb25zdCBTaGlwID0gZnVuY3Rpb24obGVuZ3RoKSB7XG4gIGxldCBoaXRDb3VudCA9IDA7XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24oKSB7XG4gICAgaGl0Q291bnQgKz0gMTtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAobGVuZ3RoID09PSBoaXRDb3VudCkge1xuICAgICAgc3VuayA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzdW5rO1xuICB9O1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rIH07XG59XG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgc2hpcENvb3JkaW5hdGVzID0gW107XG4gIGxldCByZWNlaXZlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBpc09jY3VwaWVkID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBmb3IgKGxldCBpPTA7IGk8c2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KHNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgY29vcmRpbmF0ZXMpKSB7XG4gICAgICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXNbaV0uc2hpcDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGlzT3V0c2lkZUdhbWVib2FyZCA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKGNvb3JkaW5hdGVzWzBdIDwgMCB8fCBjb29yZGluYXRlc1swXSA+IDkgfHwgY29vcmRpbmF0ZXNbMV0gPCAwIHx8IGNvb3JkaW5hdGVzWzFdID4gOSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihsZW5ndGgsIHN0YXJ0Q29vcmQsIG9yaWVudGF0aW9uKSB7XG4gICAgY29uc3QgbmV3U2hpcCA9IFNoaXAobGVuZ3RoKTtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbc3RhcnRDb29yZF07XG4gICAgbGV0IGNsYXNoaW5nU2hpcHMgPSBmYWxzZTtcbiAgXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGk9MDsgKGk8bGVuZ3RoICYmIGNsYXNoaW5nU2hpcHMgPT09IGZhbHNlKTsgaSsrKSB7XG4gICAgICAgIGlmIChpc09jY3VwaWVkKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChpc091dHNpZGVHYW1lYm9hcmQoW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGk9MTsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpPTA7IChpPGxlbmd0aCAmJiBjbGFzaGluZ1NoaXBzID09PSBmYWxzZSk7IGkrKykge1xuICAgICAgICBpZiAoaXNPY2N1cGllZChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoaXNPdXRzaWRlR2FtZWJvYXJkKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpPTE7IGk8bGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaCh7IHNoaXA6IG5ld1NoaXAsIGNvb3JkaW5hdGVzIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGNvbnN0IHNoaXAgPSBpc09jY3VwaWVkKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoc2hpcCAhPT0gZmFsc2UpIHtcbiAgICAgIHNoaXAuaGl0KCk7XG4gICAgfVxuICAgIHJlY2VpdmVkQXR0YWNrcy5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICBjb25zdCBpc0FsbFN1bmsgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaTxzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChzaGlwQ29vcmRpbmF0ZXNbaV0uc2hpcC5pc1N1bmsoKSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgc2hpcENvb3JkaW5hdGVzLCByZWNlaXZlZEF0dGFja3MsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgaXNBbGxTdW5rLCBpc09jY3VwaWVkLCBpc091dHNpZGVHYW1lYm9hcmQgfTtcbn07XG5cbmNvbnN0IFBsYXllciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCwgY29vcmRpbmF0ZXMpIHtcbiAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIHJldHVybiB7IHBsYXllck5hbWUsIHBsYXllckdhbWVib2FyZCwgYXR0YWNrIH07XG59O1xuXG5jb25zdCBDb21wdXRlciA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gJ1BsYXllciAyJztcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGF0dGFja0Nvb3JkaW5hdGVzID0gW107XG4gIGxldCBzdWNjZXNzZnVsQXR0YWNrO1xuICBsZXQgc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQgPSBbXTtcbiAgbGV0IHN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQgPSBbXTtcbiAgbGV0IGFkamFjZW50TW9kZSA9IGZhbHNlO1xuICBsZXQgb3JpZW50YXRpb247XG4gIGxldCBkaWFnb25hbEF0dGFja1F1ZXVlID0gW107XG4gIGxldCBpID0gMDtcbiAgbGV0IGogPSAwO1xuXG4gIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoYXR0YWNrQ29vcmRpbmF0ZXMsIFtyb3csIGNvbHVtbl0pKSB7IGNvbnRpbnVlIH1cbiAgICAgIHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcbiAgICAgIGF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0QWRqYWNlbnRNb3ZlcyA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgdmVydGljYWxNb3ZlcyA9IFtbMSwgMF0sIFstMSwgMF1dO1xuICAgIGNvbnN0IGhvcml6b250YWxNb3ZlcyA9IFtbMCwgMV0sIFswLCAtMV1dO1xuICAgIGxldCB2ZXJ0aWNhbENvb3JkaW5hdGVzID0gW107XG4gICAgbGV0IGhvcml6b250YWxDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPHZlcnRpY2FsTW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkamFjZW50Q29vcmRpbmF0ZSA9IFtjb29yZGluYXRlc1swXSArIHZlcnRpY2FsTW92ZXNbaV1bMF0sIGNvb3JkaW5hdGVzWzFdICsgdmVydGljYWxNb3Zlc1tpXVsxXV07XG4gICAgICBpZiAoIXBsYXllckdhbWVib2FyZC5pc091dHNpZGVHYW1lYm9hcmQoYWRqYWNlbnRDb29yZGluYXRlKSAmJiAhYXJyYXlJbmNsdWRlc0FycmF5KGF0dGFja0Nvb3JkaW5hdGVzLCBhZGphY2VudENvb3JkaW5hdGUpKSB7XG4gICAgICAgIHZlcnRpY2FsQ29vcmRpbmF0ZXMucHVzaChbYWRqYWNlbnRDb29yZGluYXRlLCAndmVydGljYWwnXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaT0wOyBpPGhvcml6b250YWxNb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWRqYWNlbnRDb29yZGluYXRlID0gW2Nvb3JkaW5hdGVzWzBdICsgaG9yaXpvbnRhbE1vdmVzW2ldWzBdLCBjb29yZGluYXRlc1sxXSArIGhvcml6b250YWxNb3Zlc1tpXVsxXV07XG4gICAgICBpZiAoIXBsYXllckdhbWVib2FyZC5pc091dHNpZGVHYW1lYm9hcmQoYWRqYWNlbnRDb29yZGluYXRlKSAmJiAhYXJyYXlJbmNsdWRlc0FycmF5KGF0dGFja0Nvb3JkaW5hdGVzLCBhZGphY2VudENvb3JkaW5hdGUpKSB7XG4gICAgICAgIGhvcml6b250YWxDb29yZGluYXRlcy5wdXNoKFthZGphY2VudENvb3JkaW5hdGUsICdob3Jpem9udGFsJ10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHZlcnRpY2FsQ29vcmRpbmF0ZXMsIGhvcml6b250YWxDb29yZGluYXRlcyB9O1xuICB9O1xuXG4gIGNvbnN0IGFkamFjZW50QXR0YWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG5cbiAgICBpZiAoIWFkamFjZW50TW9kZSkge1xuICAgICAgY29uc3QgW3JvdywgY29sdW1uXSA9IHJhbmRvbUF0dGFjayh0YXJnZXQpO1xuXG4gICAgICBpZiAodGFyZ2V0LnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICAgIGFkamFjZW50TW9kZSA9IHRydWU7XG4gICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2sgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLnZlcnRpY2FsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICAgIGdldEFkamFjZW50TW92ZXMoc3VjY2Vzc2Z1bEF0dGFjaykuaG9yaXpvbnRhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJvdywgY29sdW1uO1xuICAgICAgbGV0IG9yaWVudGF0aW9uO1xuICAgICAgaWYgKHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50Lmxlbmd0aCA9PT0gMCB8fCBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIFtyb3csIGNvbHVtbl0gPSBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50LnNoaWZ0KClbMF07XG4gICAgICAgIG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgW3JvdywgY29sdW1uXSA9IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50LnNoaWZ0KClbMF07XG4gICAgICAgIG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5kZXggPSBhcnJheUluY2x1ZGVzQXJyYXkoZGlhZ29uYWxBdHRhY2tRdWV1ZSwgW3JvdywgY29sdW1uXSwgdHJ1ZSk7XG5cbiAgICAgIHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcbiAgICAgIGF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBpZiAoaW5kZXggIT09IGZhbHNlKSB7XG4gICAgICAgIGRpYWdvbmFsQXR0YWNrUXVldWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICBpZiAodGFyZ2V0LnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3csIGNvbHVtbl0pLmlzU3VuaygpKSB7XG4gICAgICAgICAgc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQgPSBbXTtcbiAgICAgICAgICBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50ID0gW107XG4gICAgICAgICAgYWRqYWNlbnRNb2RlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2sgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS5ob3Jpem9udGFsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudC5wdXNoKG1vdmUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VjY2Vzc2Z1bEF0dGFjayA9IFtyb3csIGNvbHVtbl07XG4gICAgICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLnZlcnRpY2FsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0RGlhZ29uYWxNb3ZlcyA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgcG9zc2libGVNb3ZlcyA9IFtbMSwgMV0sIFstMSwgMV0sIFsxLCAtMV0sIFstMSwgLTFdXTtcbiAgICBsZXQgZGlhZ29uYWxDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgcG9zc2libGVNb3Zlcy5mb3JFYWNoKChtb3ZlKSA9PiB7XG4gICAgICBjb25zdCBkaWFnb25hbENvb3JkaW5hdGUgPSBbY29vcmRpbmF0ZXNbMF0gKyBtb3ZlWzBdLCBjb29yZGluYXRlc1sxXSArIG1vdmVbMV1dO1xuICAgICAgaWYgKCFwbGF5ZXJHYW1lYm9hcmQuaXNPdXRzaWRlR2FtZWJvYXJkKGRpYWdvbmFsQ29vcmRpbmF0ZSkgJiYgIWFycmF5SW5jbHVkZXNBcnJheShhdHRhY2tDb29yZGluYXRlcywgZGlhZ29uYWxDb29yZGluYXRlKSAmJiAhYXJyYXlJbmNsdWRlc0FycmF5KGRpYWdvbmFsQXR0YWNrUXVldWUsIGRpYWdvbmFsQ29vcmRpbmF0ZSkpIHtcbiAgICAgICAgZGlhZ29uYWxDb29yZGluYXRlcy5wdXNoKGRpYWdvbmFsQ29vcmRpbmF0ZSk7XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZGlhZ29uYWxDb29yZGluYXRlcztcbiAgfTtcblxuICBjb25zdCBkaWFnb25hbEF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXG4gICAgaWYgKCFhZGphY2VudE1vZGUpIHtcbiAgICAgIGxldCByb3csIGNvbHVtbjtcbiAgICAgIGlmIChhdHRhY2tDb29yZGluYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgW3JvdywgY29sdW1uXSA9IHJhbmRvbUF0dGFjayh0YXJnZXQpO1xuICAgICAgICBnZXREaWFnb25hbE1vdmVzKFtyb3csIGNvbHVtbl0pLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7IGRpYWdvbmFsQXR0YWNrUXVldWUucHVzaChjb29yZGluYXRlcykgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtyb3csIGNvbHVtbl0gPSBkaWFnb25hbEF0dGFja1F1ZXVlW2ldO1xuICAgICAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XG4gICAgICAgIGF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICAgIGdldERpYWdvbmFsTW92ZXMoW3JvdywgY29sdW1uXSkuZm9yRWFjaCgoY29vcmRpbmF0ZXMpID0+IHsgZGlhZ29uYWxBdHRhY2tRdWV1ZS5wdXNoKGNvb3JkaW5hdGVzKSB9KVxuICAgICAgICBpICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0LnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICAgIGFkamFjZW50TW9kZSA9IHRydWU7XG4gICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2sgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLnZlcnRpY2FsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICAgIGdldEFkamFjZW50TW92ZXMoc3VjY2Vzc2Z1bEF0dGFjaykuaG9yaXpvbnRhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFkamFjZW50QXR0YWNrKHRhcmdldCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJhbmRvbVBsYWNlU2hpcHMgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgICBjb25zdCBvcmllbnRhdGlvbnMgPSBbJ2hvcml6b250YWwnLCAndmVydGljYWwnXTtcbiAgICBsZXQgaSA9IDA7XG5cbiAgICB3aGlsZSAocGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggPCA1KSB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgICBjb25zdCBzdWNjZXNzZnVsUGxhY2VtZW50ID0gcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3Roc1tpXSwgW3JvdywgY29sdW1uXSwgb3JpZW50YXRpb24pO1xuICAgICAgaWYgKHN1Y2Nlc3NmdWxQbGFjZW1lbnQpIHsgaSArPSAxIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdW5mYWlyQXR0YWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgY29uc3QgW3JvdywgY29sdW1uXSA9IHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzW2pdO1xuICAgIHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcbiAgICBhdHRhY2tDb29yZGluYXRlcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgIFxuICAgIGlmIChqID09PSB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICBqID0gMDtcbiAgICAgIGkgKz0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgaiArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xuXG4gIH1cblxuICByZXR1cm4geyBwbGF5ZXJOYW1lLCBwbGF5ZXJHYW1lYm9hcmQsIHJhbmRvbUF0dGFjaywgYWRqYWNlbnRBdHRhY2ssIGRpYWdvbmFsQXR0YWNrLCB1bmZhaXJBdHRhY2ssIHJhbmRvbVBsYWNlU2hpcHMgfTtcbn1cblxuZXhwb3J0IHsgU2hpcCwgR2FtZWJvYXJkLCBQbGF5ZXIsIENvbXB1dGVyIH07IiwiY29uc3QgaGlkZU9wdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLW9wdGlvbnMnKTtcblxuICBvcHRpb25zLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufTtcblxuY29uc3Qgc2hvd09wdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLW9wdGlvbnMnKTtcblxuICBvcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufTtcblxuY29uc3QgaGlkZUdhbWUgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG5cbiAgZ2FtZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IHNob3dHYW1lID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpO1xuXG4gIGdhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBoaWRlRGlmZmljdWx0aWVzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGRpZmZpY3VsdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlmZmljdWx0eScpO1xuXG4gIGRpZmZpY3VsdHkuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBzaG93RGlmZmljdWx0aWVzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGRpZmZpY3VsdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGlmZmljdWx0eScpO1xuXG4gIGRpZmZpY3VsdHkuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBzaG93TmFtZXMgPSBmdW5jdGlvbihwbGF5ZXJPbmUsIHBsYXllclR3bykge1xuICBjb25zdCBwbGF5ZXJPbmVUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tjbGFzcyo9XCJ0aXRsZVwiXVtkYXRhLXBsYXllcj1cIlBsYXllciAxXCJdJyk7XG4gIGNvbnN0IHBsYXllclR3b1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cInRpdGxlXCJdW2RhdGEtcGxheWVyPVwiUGxheWVyIDJcIl0nKTtcblxuICBwbGF5ZXJPbmVUaXRsZS50ZXh0Q29udGVudCA9IHBsYXllck9uZTtcbiAgcGxheWVyVHdvVGl0bGUudGV4dENvbnRlbnQgPSBwbGF5ZXJUd287XG59O1xuXG5jb25zdCBsb2FkUGFzc2luZ1NjcmVlbiA9IGZ1bmN0aW9uKG5leHRGdW5jdGlvbikge1xuICBjb25zdCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKTtcbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzaW5nLXNjcmVlbicpO1xuICBjb25zdCBuZXh0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgZ2FtZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgcGFzc2luZ1NjcmVlbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICBuZXh0QnV0dG9uLmlkID0gJ25leHQnO1xuICBuZXh0QnV0dG9uLnRleHRDb250ZW50ID0gJ05leHQgdHVybic7XG4gIHBhc3NpbmdTY3JlZW4uYXBwZW5kQ2hpbGQobmV4dEJ1dHRvbik7XG5cbiAgbmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBuZXh0RnVuY3Rpb24oKTtcbiAgICBzdG9wUGFzc2luZ1NjcmVlbigpO1xuICAgIHBhc3NpbmdTY3JlZW4ucmVtb3ZlQ2hpbGQobmV4dEJ1dHRvbik7XG4gIH0pO1xuXG59O1xuXG5jb25zdCBzdG9wUGFzc2luZ1NjcmVlbiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKTtcbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzaW5nLXNjcmVlbicpO1xuXG4gIGdhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIHBhc3NpbmdTY3JlZW4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59XG5cbmNvbnN0IHJlbmRlckdhbWVib2FyZCA9IGZ1bmN0aW9uKHBsYXllciwgaGlkZGVuKSB7XG4gIGZvciAobGV0IGk9MDsgaTxwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGo9MDsgajxwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBsYXllcj0nJHtwbGF5ZXIucGxheWVyTmFtZX0nXVtkYXRhLXJvdz0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXVswXX0nXVtkYXRhLWNvbHVtbj0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXVsxXX0nXWApO1xuICAgICAgaWYgKCFncmlkLmNsYXNzTGlzdC5jb250YWlucygnb2NjdXBpZWQnKSkge2dyaWQuY2xhc3NMaXN0LmFkZCgnb2NjdXBpZWQnKX07XG4gICAgICBpZiAoaGlkZGVuKSB7XG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgIH0gZWxzZSB7IGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykgfVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddW2RhdGEtcm93PScke3BsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzW2ldWzBdfSddW2RhdGEtY29sdW1uPScke3BsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzW2ldWzFdfSddYCk7XG4gICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgfVxufTtcblxuY29uc3Qgc2hvd1BsYWNlU2hpcCA9IGZ1bmN0aW9uKHBsYXllciwgbGVuZ3RoKSB7XG4gIGNvbnN0IHBsYXllckdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddW2NsYXNzKj0nZ3JpZCddYCk7XG4gIGxldCBzaG93bkdyaWRzID0gW107XG5cbiAgY29uc3QgYWRkQ2xhc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBncmlkcyA9IFtdO1xuICAgIGNvbnN0IFtyb3csIGNvbHVtbl0gPSBbTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpLCBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSldO1xuXG4gICAgQXJyYXkuZnJvbShwbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdob3Zlci1wbGFjZScsICdvdXRzaWRlLWdyaWQnKSk7XG4gICAgc2hvd25HcmlkcyA9IFtdO1xuXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGk9MDsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke3Jvd30nXVtkYXRhLWNvbHVtbj0nJHtjb2x1bW4gKyBpfSddW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddYCk7XG4gICAgICAgIGdyaWRzLnB1c2goZ3JpZCk7XG4gICAgICAgIGlmICghcGxheWVyLnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3csIGNvbHVtbiArIGldKSAmJiAhcGxheWVyLnBsYXllckdhbWVib2FyZC5pc091dHNpZGVHYW1lYm9hcmQoW3JvdywgY29sdW1uICsgaV0pKSB7XG4gICAgICAgICAgc2hvd25Hcmlkcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGk9MDsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke3JvdyArIGl9J11bZGF0YS1jb2x1bW49JyR7Y29sdW1ufSddW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddYCk7XG4gICAgICAgIGdyaWRzLnB1c2goZ3JpZCk7XG4gICAgICAgIGlmICghcGxheWVyLnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3cgKyBpLCBjb2x1bW5dKSAmJiAhcGxheWVyLnBsYXllckdhbWVib2FyZC5pc091dHNpZGVHYW1lYm9hcmQoW3JvdyArIGksIGNvbHVtbl0pKSB7XG4gICAgICAgICAgc2hvd25Hcmlkcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaT0wOyBpPGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZ3JpZHNbaV0gPT09IG51bGwpIHtcbiAgICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICAgIGlmIChncmlkICE9PSBudWxsKSB7Z3JpZC5jbGFzc0xpc3QuYWRkKCdvdXRzaWRlLWdyaWQnKX1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5jbGFzc0xpc3QuYWRkKCdob3Zlci1wbGFjZScpKTtcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoc2hvd25Hcmlkcy5sZW5ndGggPCBsZW5ndGgpIHsgcmV0dXJuIH1cbiAgICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGFkZENsYXNzKTtcbiAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXItcGxhY2UnLCAnb3V0c2lkZS1ncmlkJyk7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlRXZlbnQpO1xuICAgIH0pXG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBhZGRDbGFzcyk7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUV2ZW50KTtcbiAgfSlcbn07XG5cbmNvbnN0IHNob3dBdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgY29uc3QgdGFyZ2V0R3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9JyR7dGFyZ2V0LnBsYXllck5hbWV9J11bY2xhc3MqPSdncmlkJ11gKTtcblxuICBjb25zdCBhZGRDbGFzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgQXJyYXkuZnJvbSh0YXJnZXRHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdob3Zlci1hdHRhY2snKSk7XG4gICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hvdmVyLWF0dGFjaycpO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaXQnKSkgeyByZXR1cm4gfVxuICAgIEFycmF5LmZyb20odGFyZ2V0R3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgYWRkQ2xhc3MpO1xuICAgICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdob3Zlci1hdHRhY2snKTtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgcmVtb3ZlRXZlbnQpO1xuICAgIH0pXG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBBcnJheS5mcm9tKHRhcmdldEdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBhZGRDbGFzcyk7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCByZW1vdmVFdmVudCk7XG4gIH0pXG59O1xuXG5jb25zdCBwcmludCA9IGFzeW5jIGZ1bmN0aW9uKG1lc3NhZ2UsIGFmdGVyRGVsYXkpIHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCcpO1xuICBjb25zdCBtZXNzYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RleHQnKTtcbiAgY29uc3QgbWVzc2FnZUNoYXJhY3RlcnMgPSBtZXNzYWdlLnNwbGl0KCcnKTtcblxuICBBcnJheS5mcm9tKGdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7Z3JpZC5jbGFzc0xpc3QuYWRkKCd1bmNsaWNrYWJsZScpfSk7XG4gIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcblxuICBmb3IgKGxldCBpPTA7IGk8bWVzc2FnZUNoYXJhY3RlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAzMCkpO1xuICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgKz0gbWVzc2FnZUNoYXJhY3RlcnNbaV07XG4gIH1cbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgYWZ0ZXJEZWxheSkpO1xuICBBcnJheS5mcm9tKGdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7Z3JpZC5jbGFzc0xpc3QucmVtb3ZlKCd1bmNsaWNrYWJsZScpfSk7XG59O1xuXG5jb25zdCB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvcmllbnRhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmllbnRhdGlvbicpO1xuICBvcmllbnRhdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09ICdIb3Jpem9udGFsJykge1xuICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gJ1ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gJ0hvcml6b250YWwnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCByZXN0YXJ0R2FtZWJvYXJkcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG5cbiAgQXJyYXkuZnJvbShncmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnb2NjdXBpZWQnKTtcbiAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpO1xuICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH0pO1xuIH07XG5cbmV4cG9ydCB7IGhpZGVPcHRpb25zLCBzaG93T3B0aW9ucywgaGlkZUdhbWUsIHNob3dHYW1lLCBoaWRlRGlmZmljdWx0aWVzLCBzaG93RGlmZmljdWx0aWVzLCBzaG93TmFtZXMsIGxvYWRQYXNzaW5nU2NyZWVuLCBzdG9wUGFzc2luZ1NjcmVlbiwgcmVuZGVyR2FtZWJvYXJkLCBzaG93UGxhY2VTaGlwLCBzaG93QXR0YWNrLCBwcmludCwgdG9nZ2xlT3JpZW50YXRpb25CdXR0b24sIHJlc3RhcnRHYW1lYm9hcmRzIH07IiwiaW1wb3J0IHsgUGxheWVyLCBDb21wdXRlciB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBoaWRlT3B0aW9ucywgc2hvd09wdGlvbnMsIGhpZGVHYW1lLCBzaG93R2FtZSwgc2hvd0RpZmZpY3VsdGllcywgaGlkZURpZmZpY3VsdGllcywgc2hvd05hbWVzLCBsb2FkUGFzc2luZ1NjcmVlbiwgcmVuZGVyR2FtZWJvYXJkLCBzaG93UGxhY2VTaGlwLCBzaG93QXR0YWNrLCBwcmludCwgcmVzdGFydEdhbWVib2FyZHMgfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBhcnJheUluY2x1ZGVzQXJyYXkgfSBmcm9tICcuL2FycmF5LXNlYXJjaCc7XG5cbmNvbnN0IGhvbWVTY3JlZW4gPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgc2luZ2xlUGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpbmdsZS1wbGF5ZXInKTtcbiAgY29uc3QgbXVsdGlwbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbXVsdGlwbGF5ZXInKTtcbiAgY29uc3QgZWFzeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlYXN5Jyk7XG4gIGNvbnN0IG1lZGl1bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZWRpdW0nKTtcbiAgY29uc3QgaGFyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoYXJkJyk7XG4gIGNvbnN0IGltcG9zc2libGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW1wb3NzaWJsZScpO1xuXG4gIHNpbmdsZVBsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBoaWRlT3B0aW9ucygpO1xuICAgIHNob3dEaWZmaWN1bHRpZXMoKTtcbiAgICBzaG93TmFtZXMoJ1BsYXllcicsICdDb21wdXRlcicpO1xuICB9KTtcblxuICBtdWx0aXBsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBoaWRlT3B0aW9ucygpO1xuICAgIHNob3dHYW1lKCk7XG4gICAgbXVsdGlwbGF5ZXJHYW1lKCk7XG4gICAgc2hvd05hbWVzKCdQbGF5ZXIgMScsICdQbGF5ZXIgMicpO1xuICB9KTtcblxuICBlYXN5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyID0gQ29tcHV0ZXIoKTtcbiAgICBoaWRlRGlmZmljdWx0aWVzKCk7XG4gICAgc2hvd0dhbWUoKTtcbiAgICBzaW5nbGVQbGF5ZXJHYW1lKGNvbXB1dGVyLCBjb21wdXRlci5yYW5kb21BdHRhY2spO1xuICB9KTtcblxuICBtZWRpdW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICAgIGhpZGVEaWZmaWN1bHRpZXMoKTtcbiAgICBzaG93R2FtZSgpO1xuICAgIHNpbmdsZVBsYXllckdhbWUoY29tcHV0ZXIsIGNvbXB1dGVyLmFkamFjZW50QXR0YWNrKTtcbiAgfSk7XG5cbiAgaGFyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG4gICAgaGlkZURpZmZpY3VsdGllcygpO1xuICAgIHNob3dHYW1lKCk7XG4gICAgc2luZ2xlUGxheWVyR2FtZShjb21wdXRlciwgY29tcHV0ZXIuZGlhZ29uYWxBdHRhY2spO1xuICB9KTtcblxuICBpbXBvc3NpYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyID0gQ29tcHV0ZXIoKTtcbiAgICBoaWRlRGlmZmljdWx0aWVzKCk7XG4gICAgc2hvd0dhbWUoKTtcbiAgICBzaW5nbGVQbGF5ZXJHYW1lKGNvbXB1dGVyLCBjb21wdXRlci51bmZhaXJBdHRhY2spO1xuICB9KVxufTtcblxuY29uc3Qgc2luZ2xlUGxheWVyR2FtZSA9IGFzeW5jIGZ1bmN0aW9uKGNvbXB1dGVyLCBhdHRhY2tGdW5jdGlvbikge1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoJ1BsYXllciAxJyk7XG4gIGNvbnN0IHBsYXllckdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWVyPVwiUGxheWVyIDFcIl1bY2xhc3MqPVwiZ3JpZFwiXScpO1xuICBjb25zdCBjb21wdXRlckdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWVyPVwiUGxheWVyIDJcIl1bY2xhc3MqPVwiZ3JpZFwiXScpO1xuICBjb25zdCBob21lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvbWUnKTtcbiAgY29uc3Qgc2hpcHMgPSBbe2xlbmd0aDogNSwgbmFtZTogJ0NhcnJpZXInfSwge2xlbmd0aDogNCwgbmFtZTogJ0JhdHRsZXNoaXAnfSwge2xlbmd0aDogMywgbmFtZTogJ0Rlc3Ryb3llcid9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnU3VibWFyaW5lJ30sIHtsZW5ndGg6IDIsIG5hbWU6ICdQYXRyb2wgQm9hdCd9XTtcbiAgbGV0IGkgPSAwO1xuXG4gIGNvbnN0IGNoZWNrRW5kID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgIGF3YWl0IHByaW50KCdDb21wdXRlciB3aW5zLicsIDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgIGF3YWl0IHByaW50KCdQbGF5ZXIgd2lucy4nLCAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBhc3luYyBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWxQbGFjZW1lbnQgPSBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwc1tpXS5sZW5ndGgsIFtyb3csIGNvbHVtbl0sIG9yaWVudGF0aW9uKTtcbiAgICBpZiAoIXN1Y2Nlc3NmdWxQbGFjZW1lbnQpIHJldHVybjtcbiAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyLCBmYWxzZSk7XG4gICAgaSArPSAxO1xuXG4gICAgaWYgKGk8NSkge1xuICAgICAgYXdhaXQgcHJpbnQoYFBsYWNlIHlvdXIgJHtzaGlwc1tpXS5uYW1lfS5gLCAwKTtcbiAgICAgIHNob3dQbGFjZVNoaXAocGxheWVyLCBzaGlwc1tpXS5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIEFycmF5LmZyb20ocGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICBhd2FpdCBwcmludCgnQ29tcHV0ZXIgcGxhY2luZyBzaGlwcy4uLicsIDYwMCk7XG4gICAgY29tcHV0ZXIucmFuZG9tUGxhY2VTaGlwcygpO1xuICAgIHJlbmRlckdhbWVib2FyZChjb21wdXRlciwgdHJ1ZSk7XG4gICAgYXdhaXQgcHJpbnQoJ1lvdXIgdHVybiB0byBhdHRhY2suJywgMCk7XG4gICAgc2hvd0F0dGFjayhjb21wdXRlcik7XG5cbiAgICBBcnJheS5mcm9tKGNvbXB1dGVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IGFzeW5jIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgIGNvbnN0IGNvbHVtbiA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcblxuICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrcywgW3JvdywgY29sdW1uXSkpIHtcbiAgICAgIGF3YWl0IHByaW50KCdZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGlzIHNwb3QuIFlvdXIgdHVybiB0byBhdHRhY2suJywgMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBsYXllci5hdHRhY2soY29tcHV0ZXIsIFtyb3csIGNvbHVtbl0pO1xuICAgIHJlbmRlckdhbWVib2FyZChjb21wdXRlciwgdHJ1ZSk7XG4gICAgY2hlY2tQbGF5ZXJIaXQ6IFxuICAgICAgZm9yIChsZXQgaT0wOyBpPGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLCBbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICAgIGlmIChjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaW50KCdZb3Ugc3VuayBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICAgIGJyZWFrIGNoZWNrUGxheWVySGl0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBwcmludCgnWW91IGhpdCBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ1lvdSBtaXNzZWQuJywgNDAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIFxuICAgIGlmIChhd2FpdCBjaGVja0VuZCgpKSB7XG4gICAgICBBcnJheS5mcm9tKGNvbXB1dGVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHJlc3RhcnRHYW1lYm9hcmRzKCk7XG4gICAgICAgIGhpZGVHYW1lKCk7XG4gICAgICAgIHNob3dPcHRpb25zKCk7XG4gICAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgIGF3YWl0IHByaW50KCdFbmVteSBpcyBhdHRhY2tpbmcuLi4nLCAzMDApO1xuICAgIGNvbnN0IFtjb21wdXRlclJvdywgY29tcHV0ZXJDb2x1bW5dID0gYXR0YWNrRnVuY3Rpb24ocGxheWVyKTtcbiAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyLCBmYWxzZSk7XG4gICAgY2hlY2tDb21wdXRlckhpdDogXG4gICAgICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgW2NvbXB1dGVyUm93LCBjb21wdXRlckNvbHVtbl0pKSB7XG4gICAgICAgICAgaWYgKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaW50KCdFbmVteSBzdW5rIGEgc2hpcCEnLCA0MDApO1xuICAgICAgICAgICAgYnJlYWsgY2hlY2tDb21wdXRlckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ0VuZW15IGhpdCBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICBicmVhayBjaGVja0NvbXB1dGVySGl0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ0VuZW15IG1pc3NlZC4nLCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBpZiAoYXdhaXQgY2hlY2tFbmQoKSkge1xuICAgICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gICAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXN0YXJ0R2FtZWJvYXJkcygpO1xuICAgICAgICBoaWRlR2FtZSgpO1xuICAgICAgICBzaG93T3B0aW9ucygpO1xuICAgICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBwcmludCgnWW91ciB0dXJuIHRvIGF0dGFjay4nLCAwKVxuICAgIHNob3dBdHRhY2soY29tcHV0ZXIpO1xuICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgYXdhaXQgcHJpbnQoJ1BsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgc2hvd1BsYWNlU2hpcChwbGF5ZXIsIDUpO1xuICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG59O1xuXG5jb25zdCBtdWx0aXBsYXllckdhbWUgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgY29uc3QgcGxheWVyT25lID0gUGxheWVyKCdQbGF5ZXIgMScpO1xuICBjb25zdCBwbGF5ZXJUd28gPSBQbGF5ZXIoJ1BsYXllciAyJyk7XG4gIGNvbnN0IHBsYXllck9uZUdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGxheWVyPSdQbGF5ZXIgMSddW2NsYXNzKj1cImdyaWRcIl1gKTtcbiAgY29uc3QgcGxheWVyVHdvR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9J1BsYXllciAyJ11bY2xhc3MqPVwiZ3JpZFwiXWApO1xuICBjb25zdCBob21lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvbWUnKTtcbiAgY29uc3Qgc2hpcHMgPSBbe2xlbmd0aDogNSwgbmFtZTogJ0NhcnJpZXInfSwge2xlbmd0aDogNCwgbmFtZTogJ0JhdHRsZXNoaXAnfSwge2xlbmd0aDogMywgbmFtZTogJ0Rlc3Ryb3llcid9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnU3VibWFyaW5lJ30sIHtsZW5ndGg6IDIsIG5hbWU6ICdQYXRyb2wgQm9hdCd9XTtcbiAgbGV0IGkgPSAwO1xuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgbGV0IHRhcmdldFBsYXllcjtcblxuICBjb25zdCBjaGVja0VuZCA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGlmIChwbGF5ZXJPbmUucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICBhd2FpdCBwcmludCgnUGxheWVyIDIgd2lucy4nLCAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAocGxheWVyVHdvLnBsYXllckdhbWVib2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgYXdhaXQgcHJpbnQoJ1BsYXllciAxIHdpbnMuJywgMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBzdWNjZXNzZnVsUGxhY2VtZW50ID0gY3VycmVudFBsYXllci5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHNoaXBzW2ldLmxlbmd0aCwgW3JvdywgY29sdW1uXSwgb3JpZW50YXRpb24pO1xuICAgIGlmICghc3VjY2Vzc2Z1bFBsYWNlbWVudCkgcmV0dXJuO1xuICAgIHJlbmRlckdhbWVib2FyZChjdXJyZW50UGxheWVyLCBmYWxzZSk7XG4gICAgaSArPSAxO1xuXG4gICAgaWYgKGk8NSkge1xuICAgICAgYXdhaXQgcHJpbnQoYFBsYWNlIHlvdXIgJHtzaGlwc1tpXS5uYW1lfS5gLCAwKTtcbiAgICAgIHNob3dQbGFjZVNoaXAoY3VycmVudFBsYXllciwgc2hpcHNbaV0ubGVuZ3RoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpID0gMDtcblxuICAgIGlmIChjdXJyZW50UGxheWVyLnBsYXllck5hbWUgPT09ICdQbGF5ZXIgMScpIHtcbiAgICAgIEFycmF5LmZyb20ocGxheWVyT25lR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDcwMCkpO1xuICAgICAgQXJyYXkuZnJvbShwbGF5ZXJPbmVHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgbG9hZFBhc3NpbmdTY3JlZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKHBsYXllck9uZUdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllck9uZSwgdHJ1ZSk7XG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUd29cbiAgICAgICAgYXdhaXQgcHJpbnQoJ1BsYXllciAyLCBwbGFjZSB5b3VyIENhcnJpZXIuJyk7XG4gICAgICAgIHNob3dQbGFjZVNoaXAocGxheWVyVHdvLCA1KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBBcnJheS5mcm9tKHBsYXllclR3b0dyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCA3MDApKTtcbiAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgIGxvYWRQYXNzaW5nU2NyZWVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgQXJyYXkuZnJvbShwbGF5ZXJUd29HcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgICBBcnJheS5mcm9tKHBsYXllclR3b0dyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXJUd28sIHRydWUpO1xuICAgICAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyT25lLCBmYWxzZSk7XG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gICAgICAgIHRhcmdldFBsYXllciA9IHBsYXllclR3bztcbiAgICAgICAgYXdhaXQgcHJpbnQoXCJQbGF5ZXIgMSdzIHR1cm4gdG8gYXR0YWNrLlwiKTtcbiAgICAgICAgc2hvd0F0dGFjayh0YXJnZXRQbGF5ZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IGFzeW5jIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgIGNvbnN0IGNvbHVtbiA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICBjb25zdCBjdXJyZW50UGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9JyR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSddW2NsYXNzKj0nZ3JpZCddYCk7XG4gICAgY29uc3QgdGFyZ2V0UGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9JyR7dGFyZ2V0UGxheWVyLnBsYXllck5hbWV9J11bY2xhc3MqPSdncmlkJ11gKTtcbiAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzLCBbcm93LCBjb2x1bW5dKSkgeyBcbiAgICAgIGF3YWl0IHByaW50KGBZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGlzIHNwb3QuICR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSdzIHR1cm4gdG8gYXR0YWNrLmAsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjdXJyZW50UGxheWVyLmF0dGFjayh0YXJnZXRQbGF5ZXIsIFtyb3csIGNvbHVtbl0pO1xuICAgIHJlbmRlckdhbWVib2FyZCh0YXJnZXRQbGF5ZXIsIHRydWUpO1xuICAgIGNoZWNrUGxheWVySGl0OiBcbiAgICAgIGZvciAobGV0IGk9MDsgaTx0YXJnZXRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLCBbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICAgIGlmICh0YXJnZXRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9IHN1bmsgYSBzaGlwIWAsIDQwMCk7XG4gICAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoYCR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSBoaXQgYSBzaGlwIWAsIDQwMCk7XG4gICAgICAgICAgYnJlYWsgY2hlY2tQbGF5ZXJIaXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9IG1pc3NlZC5gLCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgXG4gICAgaWYgKGF3YWl0IGNoZWNrRW5kKCkpIHtcbiAgICAgIEFycmF5LmZyb20odGFyZ2V0UGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgcmVzdGFydEdhbWVib2FyZHMoKTtcbiAgICAgICAgICBoaWRlR2FtZSgpO1xuICAgICAgICAgIHNob3dPcHRpb25zKCk7XG4gICAgICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgQXJyYXkuZnJvbSh0YXJnZXRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDcwMCkpO1xuICAgIEFycmF5LmZyb20odGFyZ2V0UGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICBsb2FkUGFzc2luZ1NjcmVlbihhc3luYyAoKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHRhcmdldFBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICBBcnJheS5mcm9tKGN1cnJlbnRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgcmVuZGVyR2FtZWJvYXJkKHRhcmdldFBsYXllciwgZmFsc2UpO1xuICAgICAgcmVuZGVyR2FtZWJvYXJkKGN1cnJlbnRQbGF5ZXIsIHRydWUpO1xuICAgICAgY29uc3QgW2EsIGJdID0gW3RhcmdldFBsYXllciwgY3VycmVudFBsYXllcl07XG4gICAgICB0YXJnZXRQbGF5ZXIgPSBiO1xuICAgICAgY3VycmVudFBsYXllciA9IGE7XG4gIFxuICAgICAgYXdhaXQgcHJpbnQoYCR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSdzIHR1cm4gdG8gYXR0YWNrLmApO1xuICAgICAgc2hvd0F0dGFjayh0YXJnZXRQbGF5ZXIpO1xuICAgIH0pO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgYXdhaXQgcHJpbnQoJ1BsYXllciAxLCBwbGFjZSB5b3VyIENhcnJpZXIuJyk7XG4gIHNob3dQbGFjZVNoaXAocGxheWVyT25lLCA1KTtcbiAgQXJyYXkuZnJvbShwbGF5ZXJPbmVHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBob21lU2NyZWVuOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGhvbWVTY3JlZW4gZnJvbSAnLi9nYW1lJztcbmltcG9ydCB7IHRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uIH0gZnJvbSAnLi9kb20nO1xuXG5ob21lU2NyZWVuKCk7XG50b2dnbGVPcmllbnRhdGlvbkJ1dHRvbigpOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCJmb250cy9KZXJzZXkyNS1SZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcImltYWdlcy93YXRlci5qcGdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBAZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IGplcnNleTtcbiAgc3JjOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7XG59XG5cbmJvZHkge1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG5kaXYsIHAsIGJ1dHRvbiB7XG4gIGNvbG9yOiAjY2RkNWRjO1xuICBmb250LWZhbWlseTogamVyc2V5O1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgd29yZC1zcGFjaW5nOiA1cHg7XG59XG5cbmJ1dHRvbiB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQxNDc3ODtcbiAgcGFkZGluZzogOHB4O1xuICBib3gtc2hhZG93OiBpbnNldCAtMC4xZW0gLTAuMmVtIDAuMmVtIGJsYWNrO1xufVxuXG5idXR0b246aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE1NjgzO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbiNnYW1lLXRpdGxlIHtcbiAgZm9udC1zaXplOiAycmVtO1xufVxuXG4jZ2FtZSB7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjRweDtcbn1cblxuI21lc3NhZ2Uge1xuICBoZWlnaHQ6IDY0cHg7XG4gIHBhZGRpbmc6IDAgNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXI6IDJweCBzb2xpZCAjY2RkNWRjO1xuXG4gICNjaGFyYWN0ZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuXG4gICN0ZXh0Ym94IHtcbiAgICBwYWRkaW5nOiAwIDhweDtcbiAgICB3aWR0aDogMjQwcHg7XG4gICAgaGVpZ2h0OiA0OHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgICN0ZXh0IHtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgIH1cbiAgfVxufVxuXG4jZ2FtZWJvYXJkLWNvbnRhaW5lciB7XG4gIHdpZHRoOiA5MCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTZweDtcblxuICBwIHtcbiAgICBtYXJnaW46IDRweCAwIDAgMDtcbiAgfVxuXG4gICNwbGF5ZXItMSwgI3BsYXllci0yIHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICB9XG59XG5cbi5nYW1lYm9hcmQge1xuICB3aWR0aDogMjQwcHg7XG4gIGhlaWdodDogMjQwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMWZyKSAvIHJlcGVhdCgxMCwgMWZyKTtcbiAgcm93LWdhcDogMnB4O1xuICBjb2x1bW4tZ2FwOiAycHg7XG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xuXG4gIC5ncmlkIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2RkNWRjO1xuICB9XG59XG5cbi5ob3Zlci1wbGFjZSwgLmhvdmVyLWF0dGFjaywgLm9jY3VwaWVkLmhpZGRlbi5ob3Zlci1hdHRhY2sge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ3LCAxNjgsIDE4MSk7XG59XG5cbi5vY2N1cGllZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzNywgMTczLCA4Mik7XG59XG5cbi5ob3Zlci1wbGFjZS5vY2N1cGllZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzMywgNDAsIDU3KTtcbn1cblxuLm91dHNpZGUtZ3JpZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLmhpdCwgLmhvdmVyLWF0dGFjay5oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xufVxuXG4ub2NjdXBpZWQuaGlkZGVuIHtcbiAgZGlzcGxheTpibG9jaztcbiAgYmFja2dyb3VuZDogbm9uZTtcbn1cblxuLm9jY3VwaWVkLmhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuYm9keSA+IGRpdi5oaWRkZW4sIGJ1dHRvbi5oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG59XG5cbmRpdi5oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udW5jbGlja2FibGUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuI2dhbWUtb3B0aW9ucyB7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA1NnB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgXG4gICNnYW1lLXRpdGxlIHtcbiAgICBtYXJnaW46IDA7XG4gICAgbWFyZ2luLXRvcDogLTU2cHg7XG4gIH1cblxuICAjb3B0aW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDI0cHg7XG4gIH1cbn1cblxuI2RpZmZpY3VsdHkge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDI0cHg7XG59XG5cbiNwYXNzaW5nLXNjcmVlbiB7XG4gIGhlaWdodDogODAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA1NDBweCkge1xuICAjZ2FtZWJvYXJkLWNvbnRhaW5lciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGdhcDogMjRweDtcbiAgfVxuXG4gIC5nYW1lYm9hcmQge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogYXV0bztcbiAgICBhc3BlY3QtcmF0aW86IDEvMTtcbiAgfVxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQiw0Q0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLHlEQUF1QztFQUN2QyxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLDJDQUEyQztBQUM3Qzs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxZQUFZO0VBQ1osY0FBYztFQUNkLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIseUJBQXlCOztFQUV6QjtJQUNFLGFBQWE7SUFDYixtQkFBbUI7RUFDckI7O0VBRUE7SUFDRSxjQUFjO0lBQ2QsWUFBWTtJQUNaLFlBQVk7SUFDWixhQUFhO0lBQ2IsbUJBQW1COztJQUVuQjtNQUNFLGlCQUFpQjtJQUNuQjtFQUNGO0FBQ0Y7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsU0FBUzs7RUFFVDtJQUNFLGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLFVBQVU7SUFDVixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixRQUFRO0VBQ1Y7QUFDRjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLGdEQUFnRDtFQUNoRCxZQUFZO0VBQ1osZUFBZTtFQUNmLGlCQUFpQjs7RUFFakI7SUFDRSx5QkFBeUI7RUFDM0I7QUFDRjs7QUFFQTtFQUNFLG9DQUFvQztBQUN0Qzs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLG1CQUFtQjs7RUFFbkI7SUFDRSxTQUFTO0lBQ1QsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsYUFBYTtJQUNiLFNBQVM7RUFDWDtBQUNGOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRTtJQUNFLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsU0FBUztFQUNYOztFQUVBO0lBQ0UsV0FBVztJQUNYLFlBQVk7SUFDWixpQkFBaUI7RUFDbkI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBqZXJzZXk7XFxuICBzcmM6IHVybChmb250cy9KZXJzZXkyNS1SZWd1bGFyLnR0Zik7XFxufVxcblxcbmJvZHkge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGltYWdlcy93YXRlci5qcGcpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuXFxuZGl2LCBwLCBidXR0b24ge1xcbiAgY29sb3I6ICNjZGQ1ZGM7XFxuICBmb250LWZhbWlseTogamVyc2V5O1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICB3b3JkLXNwYWNpbmc6IDVweDtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBhcHBlYXJhbmNlOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQxNDc3ODtcXG4gIHBhZGRpbmc6IDhweDtcXG4gIGJveC1zaGFkb3c6IGluc2V0IC0wLjFlbSAtMC4yZW0gMC4yZW0gYmxhY2s7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTE1NjgzO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jZ2FtZS10aXRsZSB7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbiNnYW1lIHtcXG4gIG1hcmdpbi10b3A6IDE2cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDI0cHg7XFxufVxcblxcbiNtZXNzYWdlIHtcXG4gIGhlaWdodDogNjRweDtcXG4gIHBhZGRpbmc6IDAgNnB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXI6IDJweCBzb2xpZCAjY2RkNWRjO1xcblxcbiAgI2NoYXJhY3RlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuXFxuICAjdGV4dGJveCB7XFxuICAgIHBhZGRpbmc6IDAgOHB4O1xcbiAgICB3aWR0aDogMjQwcHg7XFxuICAgIGhlaWdodDogNDhweDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG4gICAgI3RleHQge1xcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xcbiAgICB9XFxuICB9XFxufVxcblxcbiNnYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDE2cHg7XFxuXFxuICBwIHtcXG4gICAgbWFyZ2luOiA0cHggMCAwIDA7XFxuICB9XFxuXFxuICAjcGxheWVyLTEsICNwbGF5ZXItMiB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGdhcDogOHB4O1xcbiAgfVxcbn1cXG5cXG4uZ2FtZWJvYXJkIHtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIGhlaWdodDogMjQwcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xcbiAgcm93LWdhcDogMnB4O1xcbiAgY29sdW1uLWdhcDogMnB4O1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxuXFxuICAuZ3JpZCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZGQ1ZGM7XFxuICB9XFxufVxcblxcbi5ob3Zlci1wbGFjZSwgLmhvdmVyLWF0dGFjaywgLm9jY3VwaWVkLmhpZGRlbi5ob3Zlci1hdHRhY2sge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NywgMTY4LCAxODEpO1xcbn1cXG5cXG4ub2NjdXBpZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDM3LCAxNzMsIDgyKTtcXG59XFxuXFxuLmhvdmVyLXBsYWNlLm9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigzMywgNDAsIDU3KTtcXG59XFxuXFxuLm91dHNpZGUtZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5oaXQsIC5ob3Zlci1hdHRhY2suaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5vY2N1cGllZC5oaWRkZW4ge1xcbiAgZGlzcGxheTpibG9jaztcXG4gIGJhY2tncm91bmQ6IG5vbmU7XFxufVxcblxcbi5vY2N1cGllZC5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG5ib2R5ID4gZGl2LmhpZGRlbiwgYnV0dG9uLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XFxufVxcblxcbmRpdi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnVuY2xpY2thYmxlIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4jZ2FtZS1vcHRpb25zIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiA1NnB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgXFxuICAjZ2FtZS10aXRsZSB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgbWFyZ2luLXRvcDogLTU2cHg7XFxuICB9XFxuXFxuICAjb3B0aW9ucyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGdhcDogMjRweDtcXG4gIH1cXG59XFxuXFxuI2RpZmZpY3VsdHkge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjRweDtcXG59XFxuXFxuI3Bhc3Npbmctc2NyZWVuIHtcXG4gIGhlaWdodDogODAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNTQwcHgpIHtcXG4gICNnYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgZ2FwOiAyNHB4O1xcbiAgfVxcblxcbiAgLmdhbWVib2FyZCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICAgIGFzcGVjdC1yYXRpbzogMS8xO1xcbiAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJhcnJheUluY2x1ZGVzQXJyYXkiLCJwYXJlbnRBcnJheSIsImNoaWxkQXJyYXkiLCJnZXRJbmRleCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImN1cnJlbnRJbmRleCIsInNsaWNlIiwiaSIsIlNoaXAiLCJoaXRDb3VudCIsInN1bmsiLCJoaXQiLCJpc1N1bmsiLCJHYW1lYm9hcmQiLCJzaGlwQ29vcmRpbmF0ZXMiLCJyZWNlaXZlZEF0dGFja3MiLCJpc09jY3VwaWVkIiwiY29vcmRpbmF0ZXMiLCJzaGlwIiwiaXNPdXRzaWRlR2FtZWJvYXJkIiwicGxhY2VTaGlwIiwic3RhcnRDb29yZCIsIm9yaWVudGF0aW9uIiwibmV3U2hpcCIsImNsYXNoaW5nU2hpcHMiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImlzQWxsU3VuayIsIlBsYXllciIsIm5hbWUiLCJwbGF5ZXJOYW1lIiwicGxheWVyR2FtZWJvYXJkIiwiYXR0YWNrIiwidGFyZ2V0IiwiQ29tcHV0ZXIiLCJhdHRhY2tDb29yZGluYXRlcyIsInN1Y2Nlc3NmdWxBdHRhY2siLCJzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudCIsInN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQiLCJhZGphY2VudE1vZGUiLCJkaWFnb25hbEF0dGFja1F1ZXVlIiwiaiIsInJhbmRvbUF0dGFjayIsInJvdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbHVtbiIsImdldEFkamFjZW50TW92ZXMiLCJ2ZXJ0aWNhbE1vdmVzIiwiaG9yaXpvbnRhbE1vdmVzIiwidmVydGljYWxDb29yZGluYXRlcyIsImhvcml6b250YWxDb29yZGluYXRlcyIsImFkamFjZW50Q29vcmRpbmF0ZSIsImFkamFjZW50QXR0YWNrIiwiZm9yRWFjaCIsIm1vdmUiLCJzaGlmdCIsImluZGV4Iiwic3BsaWNlIiwiZ2V0RGlhZ29uYWxNb3ZlcyIsInBvc3NpYmxlTW92ZXMiLCJkaWFnb25hbENvb3JkaW5hdGVzIiwiZGlhZ29uYWxDb29yZGluYXRlIiwiZGlhZ29uYWxBdHRhY2siLCJyYW5kb21QbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJvcmllbnRhdGlvbnMiLCJzdWNjZXNzZnVsUGxhY2VtZW50IiwidW5mYWlyQXR0YWNrIiwiaGlkZU9wdGlvbnMiLCJvcHRpb25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiYWRkIiwic2hvd09wdGlvbnMiLCJyZW1vdmUiLCJoaWRlR2FtZSIsImdhbWUiLCJzaG93R2FtZSIsImhpZGVEaWZmaWN1bHRpZXMiLCJkaWZmaWN1bHR5Iiwic2hvd0RpZmZpY3VsdGllcyIsInNob3dOYW1lcyIsInBsYXllck9uZSIsInBsYXllclR3byIsInBsYXllck9uZVRpdGxlIiwicGxheWVyVHdvVGl0bGUiLCJ0ZXh0Q29udGVudCIsImxvYWRQYXNzaW5nU2NyZWVuIiwibmV4dEZ1bmN0aW9uIiwicGFzc2luZ1NjcmVlbiIsIm5leHRCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJhcHBlbmRDaGlsZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdG9wUGFzc2luZ1NjcmVlbiIsInJlbW92ZUNoaWxkIiwicmVuZGVyR2FtZWJvYXJkIiwicGxheWVyIiwiaGlkZGVuIiwiZ3JpZCIsImNvbnRhaW5zIiwic2hvd1BsYWNlU2hpcCIsInBsYXllckdyaWRzIiwicXVlcnlTZWxlY3RvckFsbCIsInNob3duR3JpZHMiLCJhZGRDbGFzcyIsImV2ZW50IiwidG9Mb3dlckNhc2UiLCJncmlkcyIsIk51bWJlciIsImdldEF0dHJpYnV0ZSIsIkFycmF5IiwiZnJvbSIsInN0b3BQcm9wYWdhdGlvbiIsInJlbW92ZUV2ZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNob3dBdHRhY2siLCJ0YXJnZXRHcmlkcyIsInByaW50IiwibWVzc2FnZSIsImFmdGVyRGVsYXkiLCJtZXNzYWdlQ29udGFpbmVyIiwibWVzc2FnZUNoYXJhY3RlcnMiLCJzcGxpdCIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsInRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uIiwib3JpZW50YXRpb25CdXR0b24iLCJyZXN0YXJ0R2FtZWJvYXJkcyIsImhvbWVTY3JlZW4iLCJzaW5nbGVQbGF5ZXIiLCJtdWx0aXBsYXllciIsImVhc3kiLCJtZWRpdW0iLCJoYXJkIiwiaW1wb3NzaWJsZSIsIm11bHRpcGxheWVyR2FtZSIsImNvbXB1dGVyIiwic2luZ2xlUGxheWVyR2FtZSIsImF0dGFja0Z1bmN0aW9uIiwiY29tcHV0ZXJHcmlkcyIsImhvbWVCdXR0b24iLCJzaGlwcyIsImNoZWNrRW5kIiwiY2hlY2tQbGF5ZXJIaXQiLCJjb21wdXRlclJvdyIsImNvbXB1dGVyQ29sdW1uIiwiY2hlY2tDb21wdXRlckhpdCIsInBsYXllck9uZUdyaWRzIiwicGxheWVyVHdvR3JpZHMiLCJjdXJyZW50UGxheWVyIiwidGFyZ2V0UGxheWVyIiwiY3VycmVudFBsYXllckdyaWRzIiwidGFyZ2V0UGxheWVyR3JpZHMiLCJhIiwiYiJdLCJzb3VyY2VSb290IjoiIn0=