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
    max-width: 520px;
    height: auto;
    aspect-ratio: 1/1;
  }
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,4CAAoC;AACtC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,yDAAuC;EACvC,sBAAsB;AACxB;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,YAAY;EACZ,yBAAyB;EACzB,YAAY;EACZ,2CAA2C;AAC7C;;AAEA;EACE,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,YAAY;EACZ,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,yBAAyB;;EAEzB;IACE,aAAa;IACb,mBAAmB;EACrB;;EAEA;IACE,cAAc;IACd,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;;IAEnB;MACE,iBAAiB;IACnB;EACF;AACF;;AAEA;EACE,UAAU;EACV,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;;EAET;IACE,iBAAiB;EACnB;;EAEA;IACE,UAAU;IACV,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,QAAQ;EACV;AACF;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,aAAa;EACb,gDAAgD;EAChD,YAAY;EACZ,eAAe;EACf,iBAAiB;;EAEjB;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,uBAAuB;EACvB,mBAAmB;;EAEnB;IACE,SAAS;IACT,iBAAiB;EACnB;;EAEA;IACE,aAAa;IACb,SAAS;EACX;AACF;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,WAAW;EACX,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE;IACE,aAAa;IACb,mBAAmB;IACnB,SAAS;EACX;;EAEA;IACE,WAAW;IACX,gBAAgB;IAChB,YAAY;IACZ,iBAAiB;EACnB;AACF","sourcesContent":["@font-face {\n  font-family: jersey;\n  src: url(fonts/Jersey25-Regular.ttf);\n}\n\nbody {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-image: url(images/water.jpg);\n  background-size: cover;\n}\n\ndiv, p, button {\n  color: #cdd5dc;\n  font-family: jersey;\n  font-size: 1.2rem;\n  word-spacing: 5px;\n}\n\nbutton {\n  outline: none;\n  appearance: none;\n  border: none;\n  background-color: #414778;\n  padding: 8px;\n  box-shadow: inset -0.1em -0.2em 0.2em black;\n}\n\nbutton:hover {\n  background-color: #515683;\n  cursor: pointer;\n}\n\n#game-title {\n  font-size: 2rem;\n}\n\n#game {\n  margin-top: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 24px;\n}\n\n#message {\n  height: 64px;\n  padding: 0 6px;\n  display: flex;\n  align-items: center;\n  border: 2px solid #cdd5dc;\n\n  #character {\n    display: flex;\n    align-items: center;\n  }\n\n  #textbox {\n    padding: 0 8px;\n    width: 240px;\n    height: 48px;\n    display: flex;\n    align-items: center;\n\n    #text {\n      font-size: 1.1rem;\n    }\n  }\n}\n\n#gameboard-container {\n  width: 90%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n\n  p {\n    margin: 4px 0 0 0;\n  }\n\n  #player-1, #player-2 {\n    width: 50%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 8px;\n  }\n}\n\n.gameboard {\n  width: 240px;\n  height: 240px;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n  row-gap: 2px;\n  column-gap: 2px;\n  cursor: crosshair;\n\n  .grid {\n    border: 1px solid #cdd5dc;\n  }\n}\n\n.hover-place, .hover-attack, .occupied.hidden.hover-attack {\n  background-color: rgb(147, 168, 181);\n}\n\n.occupied {\n  background-color: rgb(37, 173, 82);\n}\n\n.hover-place.occupied {\n  background-color: rgb(33, 40, 57);\n}\n\n.outside-grid {\n  background-color: red;\n}\n\n.hit, .hover-attack.hit {\n  background-color: blue;\n}\n\n.occupied.hidden {\n  display:block;\n  background: none;\n}\n\n.occupied.hit {\n  background-color: red;\n}\n\nbody > div.hidden, button.hidden {\n  display: none !important;\n}\n\ndiv.hidden {\n  display: none;\n}\n\n.unclickable {\n  pointer-events: none;\n}\n\n#game-options {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 56px;\n  justify-content: center;\n  align-items: center;\n  \n  #game-title {\n    margin: 0;\n    margin-top: -56px;\n  }\n\n  #options {\n    display: flex;\n    gap: 24px;\n  }\n}\n\n#difficulty {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 24px;\n}\n\n#passing-screen {\n  height: 80%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n@media only screen and (min-width: 540px) {\n  #gameboard-container {\n    display: flex;\n    flex-direction: row;\n    gap: 24px;\n  }\n\n  .gameboard {\n    width: 100%;\n    max-width: 520px;\n    height: auto;\n    aspect-ratio: 1/1;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sZ0ZBQWdGLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLGNBQWMsTUFBTSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsYUFBYSxNQUFNLFlBQVksTUFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFlBQVksS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsS0FBSyxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsYUFBYSxNQUFNLFlBQVksTUFBTSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksY0FBYyxNQUFNLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLEtBQUssTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxLQUFLLFVBQVUsWUFBWSxXQUFXLE1B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bEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNuRmE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDakNhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcnJheS1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXJyYXlJbmNsdWRlc0FycmF5ID0gZnVuY3Rpb24ocGFyZW50QXJyYXksIGNoaWxkQXJyYXksIGdldEluZGV4ID0gZmFsc2UsIGN1cnJlbnRJbmRleCA9IDApIHtcbiAgaWYgKHBhcmVudEFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAocGFyZW50QXJyYXlbMF0ubGVuZ3RoICE9PSBjaGlsZEFycmF5Lmxlbmd0aCkge1xuICAgIHBhcmVudEFycmF5ID0gcGFyZW50QXJyYXkuc2xpY2UoMSk7XG4gICAgcmV0dXJuIGFycmF5SW5jbHVkZXNBcnJheShwYXJlbnRBcnJheSwgY2hpbGRBcnJheSwgZ2V0SW5kZXgsIGN1cnJlbnRJbmRleCArIDEpO1xuICB9XG4gIGZvciAobGV0IGk9MDsgaTxjaGlsZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNoaWxkQXJyYXlbaV0gIT09IHBhcmVudEFycmF5WzBdW2ldKSB7IFxuICAgICAgcGFyZW50QXJyYXkgPSBwYXJlbnRBcnJheS5zbGljZSgxKTtcbiAgICAgIHJldHVybiBhcnJheUluY2x1ZGVzQXJyYXkocGFyZW50QXJyYXksIGNoaWxkQXJyYXksIGdldEluZGV4LCBjdXJyZW50SW5kZXggKyAxKVxuICAgIH1cbiAgfVxuICBpZiAoZ2V0SW5kZXgpIHsgcmV0dXJuIGN1cnJlbnRJbmRleCB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IHsgYXJyYXlJbmNsdWRlc0FycmF5IH07IiwiaW1wb3J0IHsgYXJyYXlJbmNsdWRlc0FycmF5IH0gZnJvbSBcIi4vYXJyYXktc2VhcmNoXCI7XG5cbmNvbnN0IFNoaXAgPSBmdW5jdGlvbihsZW5ndGgpIHtcbiAgbGV0IGhpdENvdW50ID0gMDtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSBmdW5jdGlvbigpIHtcbiAgICBoaXRDb3VudCArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChsZW5ndGggPT09IGhpdENvdW50KSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bms7XG4gIH07XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmsgfTtcbn1cblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24oKSB7XG4gIGxldCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IHJlY2VpdmVkQXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IGlzT2NjdXBpZWQgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGZvciAobGV0IGk9MDsgaTxzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLCBjb29yZGluYXRlcykpIHtcbiAgICAgICAgcmV0dXJuIHNoaXBDb29yZGluYXRlc1tpXS5zaGlwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgaXNPdXRzaWRlR2FtZWJvYXJkID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAoY29vcmRpbmF0ZXNbMF0gPCAwIHx8IGNvb3JkaW5hdGVzWzBdID4gOSB8fCBjb29yZGluYXRlc1sxXSA8IDAgfHwgY29vcmRpbmF0ZXNbMV0gPiA5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uKGxlbmd0aCwgc3RhcnRDb29yZCwgb3JpZW50YXRpb24pIHtcbiAgICBjb25zdCBuZXdTaGlwID0gU2hpcChsZW5ndGgpO1xuICAgIGxldCBjb29yZGluYXRlcyA9IFtzdGFydENvb3JkXTtcbiAgICBsZXQgY2xhc2hpbmdTaGlwcyA9IGZhbHNlO1xuICBcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgZm9yIChsZXQgaT0wOyAoaTxsZW5ndGggJiYgY2xhc2hpbmdTaGlwcyA9PT0gZmFsc2UpOyBpKyspIHtcbiAgICAgICAgaWYgKGlzT2NjdXBpZWQoW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGlzT3V0c2lkZUdhbWVib2FyZChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaT0xOyBpPGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGk9MDsgKGk8bGVuZ3RoICYmIGNsYXNoaW5nU2hpcHMgPT09IGZhbHNlKTsgaSsrKSB7XG4gICAgICAgIGlmIChpc09jY3VwaWVkKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChpc091dHNpZGVHYW1lYm9hcmQoW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGk9MTsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHsgc2hpcDogbmV3U2hpcCwgY29vcmRpbmF0ZXMgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3Qgc2hpcCA9IGlzT2NjdXBpZWQoY29vcmRpbmF0ZXMpO1xuICAgIGlmIChzaGlwICE9PSBmYWxzZSkge1xuICAgICAgc2hpcC5oaXQoKTtcbiAgICB9XG4gICAgcmVjZWl2ZWRBdHRhY2tzLnB1c2goY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIGNvbnN0IGlzQWxsU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpPHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geyBzaGlwQ29vcmRpbmF0ZXMsIHJlY2VpdmVkQXR0YWNrcywgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBpc0FsbFN1bmssIGlzT2NjdXBpZWQsIGlzT3V0c2lkZUdhbWVib2FyZCB9O1xufTtcblxuY29uc3QgUGxheWVyID0gZnVuY3Rpb24obmFtZSkge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG5cbiAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24odGFyZ2V0LCBjb29yZGluYXRlcykge1xuICAgIHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH07XG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgcGxheWVyR2FtZWJvYXJkLCBhdHRhY2sgfTtcbn07XG5cbmNvbnN0IENvbXB1dGVyID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSAnUGxheWVyIDInO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgYXR0YWNrQ29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IHN1Y2Nlc3NmdWxBdHRhY2s7XG4gIGxldCBzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudCA9IFtdO1xuICBsZXQgc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudCA9IFtdO1xuICBsZXQgYWRqYWNlbnRNb2RlID0gZmFsc2U7XG4gIGxldCBvcmllbnRhdGlvbjtcbiAgbGV0IGRpYWdvbmFsQXR0YWNrUXVldWUgPSBbXTtcbiAgbGV0IGkgPSAwO1xuICBsZXQgaiA9IDA7XG5cbiAgY29uc3QgcmFuZG9tQXR0YWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShhdHRhY2tDb29yZGluYXRlcywgW3JvdywgY29sdW1uXSkpIHsgY29udGludWUgfVxuICAgICAgdGFyZ2V0LnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFtyb3csIGNvbHVtbl0pO1xuICAgICAgYXR0YWNrQ29vcmRpbmF0ZXMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXRBZGphY2VudE1vdmVzID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCB2ZXJ0aWNhbE1vdmVzID0gW1sxLCAwXSwgWy0xLCAwXV07XG4gICAgY29uc3QgaG9yaXpvbnRhbE1vdmVzID0gW1swLCAxXSwgWzAsIC0xXV07XG4gICAgbGV0IHZlcnRpY2FsQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICBsZXQgaG9yaXpvbnRhbENvb3JkaW5hdGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8dmVydGljYWxNb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWRqYWNlbnRDb29yZGluYXRlID0gW2Nvb3JkaW5hdGVzWzBdICsgdmVydGljYWxNb3Zlc1tpXVswXSwgY29vcmRpbmF0ZXNbMV0gKyB2ZXJ0aWNhbE1vdmVzW2ldWzFdXTtcbiAgICAgIGlmICghcGxheWVyR2FtZWJvYXJkLmlzT3V0c2lkZUdhbWVib2FyZChhZGphY2VudENvb3JkaW5hdGUpICYmICFhcnJheUluY2x1ZGVzQXJyYXkoYXR0YWNrQ29vcmRpbmF0ZXMsIGFkamFjZW50Q29vcmRpbmF0ZSkpIHtcbiAgICAgICAgdmVydGljYWxDb29yZGluYXRlcy5wdXNoKFthZGphY2VudENvb3JkaW5hdGUsICd2ZXJ0aWNhbCddKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8aG9yaXpvbnRhbE1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhZGphY2VudENvb3JkaW5hdGUgPSBbY29vcmRpbmF0ZXNbMF0gKyBob3Jpem9udGFsTW92ZXNbaV1bMF0sIGNvb3JkaW5hdGVzWzFdICsgaG9yaXpvbnRhbE1vdmVzW2ldWzFdXTtcbiAgICAgIGlmICghcGxheWVyR2FtZWJvYXJkLmlzT3V0c2lkZUdhbWVib2FyZChhZGphY2VudENvb3JkaW5hdGUpICYmICFhcnJheUluY2x1ZGVzQXJyYXkoYXR0YWNrQ29vcmRpbmF0ZXMsIGFkamFjZW50Q29vcmRpbmF0ZSkpIHtcbiAgICAgICAgaG9yaXpvbnRhbENvb3JkaW5hdGVzLnB1c2goW2FkamFjZW50Q29vcmRpbmF0ZSwgJ2hvcml6b250YWwnXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdmVydGljYWxDb29yZGluYXRlcywgaG9yaXpvbnRhbENvb3JkaW5hdGVzIH07XG4gIH07XG5cbiAgY29uc3QgYWRqYWNlbnRBdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcblxuICAgIGlmICghYWRqYWNlbnRNb2RlKSB7XG4gICAgICBjb25zdCBbcm93LCBjb2x1bW5dID0gcmFuZG9tQXR0YWNrKHRhcmdldCk7XG5cbiAgICAgIGlmICh0YXJnZXQucGxheWVyR2FtZWJvYXJkLmlzT2NjdXBpZWQoW3JvdywgY29sdW1uXSkpIHtcbiAgICAgICAgYWRqYWNlbnRNb2RlID0gdHJ1ZTtcbiAgICAgICAgc3VjY2Vzc2Z1bEF0dGFjayA9IFtyb3csIGNvbHVtbl07XG4gICAgICAgIGdldEFkamFjZW50TW92ZXMoc3VjY2Vzc2Z1bEF0dGFjaykudmVydGljYWxDb29yZGluYXRlcy5mb3JFYWNoKChtb3ZlKSA9PiBzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudC5wdXNoKG1vdmUpKTtcbiAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS5ob3Jpem9udGFsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudC5wdXNoKG1vdmUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcm93LCBjb2x1bW47XG4gICAgICBsZXQgb3JpZW50YXRpb247XG4gICAgICBpZiAoc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQubGVuZ3RoID09PSAwIHx8IG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgW3JvdywgY29sdW1uXSA9IHN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQuc2hpZnQoKVswXTtcbiAgICAgICAgb3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbcm93LCBjb2x1bW5dID0gc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQuc2hpZnQoKVswXTtcbiAgICAgICAgb3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmRleCA9IGFycmF5SW5jbHVkZXNBcnJheShkaWFnb25hbEF0dGFja1F1ZXVlLCBbcm93LCBjb2x1bW5dLCB0cnVlKTtcblxuICAgICAgdGFyZ2V0LnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFtyb3csIGNvbHVtbl0pO1xuICAgICAgYXR0YWNrQ29vcmRpbmF0ZXMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIGlmIChpbmRleCAhPT0gZmFsc2UpIHtcbiAgICAgICAgZGlhZ29uYWxBdHRhY2tRdWV1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAodGFyZ2V0LnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICAgIGlmICh0YXJnZXQucGxheWVyR2FtZWJvYXJkLmlzT2NjdXBpZWQoW3JvdywgY29sdW1uXSkuaXNTdW5rKCkpIHtcbiAgICAgICAgICBzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudCA9IFtdO1xuICAgICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQgPSBbXTtcbiAgICAgICAgICBhZGphY2VudE1vZGUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgc3VjY2Vzc2Z1bEF0dGFjayA9IFtyb3csIGNvbHVtbl07XG4gICAgICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLmhvcml6b250YWxDb29yZGluYXRlcy5mb3JFYWNoKChtb3ZlKSA9PiBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWNjZXNzZnVsQXR0YWNrID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgICAgIGdldEFkamFjZW50TW92ZXMoc3VjY2Vzc2Z1bEF0dGFjaykudmVydGljYWxDb29yZGluYXRlcy5mb3JFYWNoKChtb3ZlKSA9PiBzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudC5wdXNoKG1vdmUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnZXREaWFnb25hbE1vdmVzID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBwb3NzaWJsZU1vdmVzID0gW1sxLCAxXSwgWy0xLCAxXSwgWzEsIC0xXSwgWy0xLCAtMV1dO1xuICAgIGxldCBkaWFnb25hbENvb3JkaW5hdGVzID0gW107XG5cbiAgICBwb3NzaWJsZU1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcbiAgICAgIGNvbnN0IGRpYWdvbmFsQ29vcmRpbmF0ZSA9IFtjb29yZGluYXRlc1swXSArIG1vdmVbMF0sIGNvb3JkaW5hdGVzWzFdICsgbW92ZVsxXV07XG4gICAgICBpZiAoIXBsYXllckdhbWVib2FyZC5pc091dHNpZGVHYW1lYm9hcmQoZGlhZ29uYWxDb29yZGluYXRlKSAmJiAhYXJyYXlJbmNsdWRlc0FycmF5KGF0dGFja0Nvb3JkaW5hdGVzLCBkaWFnb25hbENvb3JkaW5hdGUpICYmICFhcnJheUluY2x1ZGVzQXJyYXkoZGlhZ29uYWxBdHRhY2tRdWV1ZSwgZGlhZ29uYWxDb29yZGluYXRlKSkge1xuICAgICAgICBkaWFnb25hbENvb3JkaW5hdGVzLnB1c2goZGlhZ29uYWxDb29yZGluYXRlKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBkaWFnb25hbENvb3JkaW5hdGVzO1xuICB9O1xuXG4gIGNvbnN0IGRpYWdvbmFsQXR0YWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG5cbiAgICBpZiAoIWFkamFjZW50TW9kZSkge1xuICAgICAgbGV0IHJvdywgY29sdW1uO1xuICAgICAgaWYgKGF0dGFja0Nvb3JkaW5hdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBbcm93LCBjb2x1bW5dID0gcmFuZG9tQXR0YWNrKHRhcmdldCk7XG4gICAgICAgIGdldERpYWdvbmFsTW92ZXMoW3JvdywgY29sdW1uXSkuZm9yRWFjaCgoY29vcmRpbmF0ZXMpID0+IHsgZGlhZ29uYWxBdHRhY2tRdWV1ZS5wdXNoKGNvb3JkaW5hdGVzKSB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgW3JvdywgY29sdW1uXSA9IGRpYWdvbmFsQXR0YWNrUXVldWVbaV07XG4gICAgICAgIHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcbiAgICAgICAgYXR0YWNrQ29vcmRpbmF0ZXMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgICAgZ2V0RGlhZ29uYWxNb3Zlcyhbcm93LCBjb2x1bW5dKS5mb3JFYWNoKChjb29yZGluYXRlcykgPT4geyBkaWFnb25hbEF0dGFja1F1ZXVlLnB1c2goY29vcmRpbmF0ZXMpIH0pXG4gICAgICAgIGkgKz0gMTtcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXQucGxheWVyR2FtZWJvYXJkLmlzT2NjdXBpZWQoW3JvdywgY29sdW1uXSkpIHtcbiAgICAgICAgYWRqYWNlbnRNb2RlID0gdHJ1ZTtcbiAgICAgICAgc3VjY2Vzc2Z1bEF0dGFjayA9IFtyb3csIGNvbHVtbl07XG4gICAgICAgIGdldEFkamFjZW50TW92ZXMoc3VjY2Vzc2Z1bEF0dGFjaykudmVydGljYWxDb29yZGluYXRlcy5mb3JFYWNoKChtb3ZlKSA9PiBzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudC5wdXNoKG1vdmUpKTtcbiAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS5ob3Jpem9udGFsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudC5wdXNoKG1vdmUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYWRqYWNlbnRBdHRhY2sodGFyZ2V0KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmFuZG9tUGxhY2VTaGlwcyA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuICAgIGNvbnN0IG9yaWVudGF0aW9ucyA9IFsnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCddO1xuICAgIGxldCBpID0gMDtcblxuICAgIHdoaWxlIChwbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aCA8IDUpIHtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gb3JpZW50YXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NmdWxQbGFjZW1lbnQgPSBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHNoaXBMZW5ndGhzW2ldLCBbcm93LCBjb2x1bW5dLCBvcmllbnRhdGlvbik7XG4gICAgICBpZiAoc3VjY2Vzc2Z1bFBsYWNlbWVudCkgeyBpICs9IDEgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCB1bmZhaXJBdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICBjb25zdCBbcm93LCBjb2x1bW5dID0gdGFyZ2V0LnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXNbal07XG4gICAgdGFyZ2V0LnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFtyb3csIGNvbHVtbl0pO1xuICAgIGF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgXG4gICAgaWYgKGogPT09IHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgIGogPSAwO1xuICAgICAgaSArPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBqICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG5cbiAgfVxuXG4gIHJldHVybiB7IHBsYXllck5hbWUsIHBsYXllckdhbWVib2FyZCwgcmFuZG9tQXR0YWNrLCBhZGphY2VudEF0dGFjaywgZGlhZ29uYWxBdHRhY2ssIHVuZmFpckF0dGFjaywgcmFuZG9tUGxhY2VTaGlwcyB9O1xufVxuXG5leHBvcnQgeyBTaGlwLCBHYW1lYm9hcmQsIFBsYXllciwgQ29tcHV0ZXIgfTsiLCJjb25zdCBoaWRlT3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtb3B0aW9ucycpO1xuXG4gIG9wdGlvbnMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBzaG93T3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtb3B0aW9ucycpO1xuXG4gIG9wdGlvbnMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBoaWRlR2FtZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKTtcblxuICBnYW1lLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufTtcblxuY29uc3Qgc2hvd0dhbWUgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG5cbiAgZ2FtZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IGhpZGVEaWZmaWN1bHRpZXMgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZGlmZmljdWx0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWZmaWN1bHR5Jyk7XG5cbiAgZGlmZmljdWx0eS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IHNob3dEaWZmaWN1bHRpZXMgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZGlmZmljdWx0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWZmaWN1bHR5Jyk7XG5cbiAgZGlmZmljdWx0eS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IHNob3dOYW1lcyA9IGZ1bmN0aW9uKHBsYXllck9uZSwgcGxheWVyVHdvKSB7XG4gIGNvbnN0IHBsYXllck9uZVRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2NsYXNzKj1cInRpdGxlXCJdW2RhdGEtcGxheWVyPVwiUGxheWVyIDFcIl0nKTtcbiAgY29uc3QgcGxheWVyVHdvVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbY2xhc3MqPVwidGl0bGVcIl1bZGF0YS1wbGF5ZXI9XCJQbGF5ZXIgMlwiXScpO1xuXG4gIHBsYXllck9uZVRpdGxlLnRleHRDb250ZW50ID0gcGxheWVyT25lO1xuICBwbGF5ZXJUd29UaXRsZS50ZXh0Q29udGVudCA9IHBsYXllclR3bztcbn07XG5cbmNvbnN0IGxvYWRQYXNzaW5nU2NyZWVuID0gZnVuY3Rpb24obmV4dEZ1bmN0aW9uKSB7XG4gIGNvbnN0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpO1xuICBjb25zdCBwYXNzaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bhc3Npbmctc2NyZWVuJyk7XG4gIGNvbnN0IG5leHRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuICBnYW1lLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICBwYXNzaW5nU2NyZWVuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gIG5leHRCdXR0b24uaWQgPSAnbmV4dCc7XG4gIG5leHRCdXR0b24udGV4dENvbnRlbnQgPSAnTmV4dCB0dXJuJztcbiAgcGFzc2luZ1NjcmVlbi5hcHBlbmRDaGlsZChuZXh0QnV0dG9uKTtcblxuICBuZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG5leHRGdW5jdGlvbigpO1xuICAgIHN0b3BQYXNzaW5nU2NyZWVuKCk7XG4gICAgcGFzc2luZ1NjcmVlbi5yZW1vdmVDaGlsZChuZXh0QnV0dG9uKTtcbiAgfSk7XG5cbn07XG5cbmNvbnN0IHN0b3BQYXNzaW5nU2NyZWVuID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpO1xuICBjb25zdCBwYXNzaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bhc3Npbmctc2NyZWVuJyk7XG5cbiAgZ2FtZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgcGFzc2luZ1NjcmVlbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgcmVuZGVyR2FtZWJvYXJkID0gZnVuY3Rpb24ocGxheWVyLCBoaWRkZW4pIHtcbiAgZm9yIChsZXQgaT0wOyBpPHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaj0wOyBqPHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddW2RhdGEtcm93PScke3BsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzW2pdWzBdfSddW2RhdGEtY29sdW1uPScke3BsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzW2pdWzFdfSddYCk7XG4gICAgICBpZiAoIWdyaWQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvY2N1cGllZCcpKSB7Z3JpZC5jbGFzc0xpc3QuYWRkKCdvY2N1cGllZCcpfTtcbiAgICAgIGlmIChoaWRkZW4pIHtcbiAgICAgICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgfSBlbHNlIHsgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSB9XG4gICAgfVxuICB9XG4gIGZvciAobGV0IGk9MDsgaTxwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wbGF5ZXI9JyR7cGxheWVyLnBsYXllck5hbWV9J11bZGF0YS1yb3c9JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3NbaV1bMF19J11bZGF0YS1jb2x1bW49JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3NbaV1bMV19J11gKTtcbiAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICB9XG59O1xuXG5jb25zdCBzaG93UGxhY2VTaGlwID0gZnVuY3Rpb24ocGxheWVyLCBsZW5ndGgpIHtcbiAgY29uc3QgcGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9JyR7cGxheWVyLnBsYXllck5hbWV9J11bY2xhc3MqPSdncmlkJ11gKTtcbiAgbGV0IHNob3duR3JpZHMgPSBbXTtcblxuICBjb25zdCBhZGRDbGFzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGdyaWRzID0gW107XG4gICAgY29uc3QgW3JvdywgY29sdW1uXSA9IFtOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSksIE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKV07XG5cbiAgICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyLXBsYWNlJywgJ291dHNpZGUtZ3JpZCcpKTtcbiAgICBzaG93bkdyaWRzID0gW107XG5cbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgZm9yIChsZXQgaT0wOyBpPGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7cm93fSddW2RhdGEtY29sdW1uPScke2NvbHVtbiArIGl9J11bZGF0YS1wbGF5ZXI9JyR7cGxheWVyLnBsYXllck5hbWV9J11gKTtcbiAgICAgICAgZ3JpZHMucHVzaChncmlkKTtcbiAgICAgICAgaWYgKCFwbGF5ZXIucGxheWVyR2FtZWJvYXJkLmlzT2NjdXBpZWQoW3JvdywgY29sdW1uICsgaV0pICYmICFwbGF5ZXIucGxheWVyR2FtZWJvYXJkLmlzT3V0c2lkZUdhbWVib2FyZChbcm93LCBjb2x1bW4gKyBpXSkpIHtcbiAgICAgICAgICBzaG93bkdyaWRzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaT0wOyBpPGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1yb3c9JyR7cm93ICsgaX0nXVtkYXRhLWNvbHVtbj0nJHtjb2x1bW59J11bZGF0YS1wbGF5ZXI9JyR7cGxheWVyLnBsYXllck5hbWV9J11gKTtcbiAgICAgICAgZ3JpZHMucHVzaChncmlkKTtcbiAgICAgICAgaWYgKCFwbGF5ZXIucGxheWVyR2FtZWJvYXJkLmlzT2NjdXBpZWQoW3JvdyArIGksIGNvbHVtbl0pICYmICFwbGF5ZXIucGxheWVyR2FtZWJvYXJkLmlzT3V0c2lkZUdhbWVib2FyZChbcm93ICsgaSwgY29sdW1uXSkpIHtcbiAgICAgICAgICBzaG93bkdyaWRzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpPTA7IGk8Z3JpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChncmlkc1tpXSA9PT0gbnVsbCkge1xuICAgICAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICAgICAgaWYgKGdyaWQgIT09IG51bGwpIHtncmlkLmNsYXNzTGlzdC5hZGQoJ291dHNpZGUtZ3JpZCcpfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBncmlkcy5mb3JFYWNoKChncmlkKSA9PiBncmlkLmNsYXNzTGlzdC5hZGQoJ2hvdmVyLXBsYWNlJykpO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChzaG93bkdyaWRzLmxlbmd0aCA8IGxlbmd0aCkgeyByZXR1cm4gfVxuICAgIEFycmF5LmZyb20ocGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgYWRkQ2xhc3MpO1xuICAgICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdob3Zlci1wbGFjZScsICdvdXRzaWRlLWdyaWQnKTtcbiAgICAgIGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZW1vdmVFdmVudCk7XG4gICAgfSlcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIEFycmF5LmZyb20ocGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGFkZENsYXNzKTtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlRXZlbnQpO1xuICB9KVxufTtcblxuY29uc3Qgc2hvd0F0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICBjb25zdCB0YXJnZXRHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nJHt0YXJnZXQucGxheWVyTmFtZX0nXVtjbGFzcyo9J2dyaWQnXWApO1xuXG4gIGNvbnN0IGFkZENsYXNzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBBcnJheS5mcm9tKHRhcmdldEdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyLWF0dGFjaycpKTtcbiAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaG92ZXItYXR0YWNrJyk7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpdCcpKSB7IHJldHVybiB9XG4gICAgQXJyYXkuZnJvbSh0YXJnZXRHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBhZGRDbGFzcyk7XG4gICAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyLWF0dGFjaycpO1xuICAgICAgZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCByZW1vdmVFdmVudCk7XG4gICAgfSlcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIEFycmF5LmZyb20odGFyZ2V0R3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGFkZENsYXNzKTtcbiAgICBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHJlbW92ZUV2ZW50KTtcbiAgfSlcbn07XG5cbmNvbnN0IHByaW50ID0gYXN5bmMgZnVuY3Rpb24obWVzc2FnZSwgYWZ0ZXJEZWxheSkge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG4gIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGV4dCcpO1xuICBjb25zdCBtZXNzYWdlQ2hhcmFjdGVycyA9IG1lc3NhZ2Uuc3BsaXQoJycpO1xuXG4gIEFycmF5LmZyb20oZ3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtncmlkLmNsYXNzTGlzdC5hZGQoJ3VuY2xpY2thYmxlJyl9KTtcbiAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnO1xuXG4gIGZvciAobGV0IGk9MDsgaTxtZXNzYWdlQ2hhcmFjdGVycy5sZW5ndGg7IGkrKykge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDMwKSk7XG4gICAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCArPSBtZXNzYWdlQ2hhcmFjdGVyc1tpXTtcbiAgfVxuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBhZnRlckRlbGF5KSk7XG4gIEFycmF5LmZyb20oZ3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ3VuY2xpY2thYmxlJyl9KTtcbn07XG5cbmNvbnN0IHRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG9yaWVudGF0aW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJyk7XG4gIG9yaWVudGF0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0hvcml6b250YWwnKSB7XG4gICAgICBldmVudC50YXJnZXQudGV4dENvbnRlbnQgPSAnVmVydGljYWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC50YXJnZXQudGV4dENvbnRlbnQgPSAnSG9yaXpvbnRhbCc7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlc3RhcnRHYW1lYm9hcmRzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQnKTtcblxuICBBcnJheS5mcm9tKGdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdvY2N1cGllZCcpO1xuICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGl0Jyk7XG4gICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgfSk7XG4gfTtcblxuZXhwb3J0IHsgaGlkZU9wdGlvbnMsIHNob3dPcHRpb25zLCBoaWRlR2FtZSwgc2hvd0dhbWUsIGhpZGVEaWZmaWN1bHRpZXMsIHNob3dEaWZmaWN1bHRpZXMsIHNob3dOYW1lcywgbG9hZFBhc3NpbmdTY3JlZW4sIHN0b3BQYXNzaW5nU2NyZWVuLCByZW5kZXJHYW1lYm9hcmQsIHNob3dQbGFjZVNoaXAsIHNob3dBdHRhY2ssIHByaW50LCB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiwgcmVzdGFydEdhbWVib2FyZHMgfTsiLCJpbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCB7IGhpZGVPcHRpb25zLCBzaG93T3B0aW9ucywgaGlkZUdhbWUsIHNob3dHYW1lLCBzaG93RGlmZmljdWx0aWVzLCBoaWRlRGlmZmljdWx0aWVzLCBzaG93TmFtZXMsIGxvYWRQYXNzaW5nU2NyZWVuLCByZW5kZXJHYW1lYm9hcmQsIHNob3dQbGFjZVNoaXAsIHNob3dBdHRhY2ssIHByaW50LCByZXN0YXJ0R2FtZWJvYXJkcyB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGFycmF5SW5jbHVkZXNBcnJheSB9IGZyb20gJy4vYXJyYXktc2VhcmNoJztcblxuY29uc3QgaG9tZVNjcmVlbiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBzaW5nbGVQbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBsYXllcicpO1xuICBjb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtdWx0aXBsYXllcicpO1xuICBjb25zdCBlYXN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vhc3knKTtcbiAgY29uc3QgbWVkaXVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lZGl1bScpO1xuICBjb25zdCBoYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hhcmQnKTtcbiAgY29uc3QgaW1wb3NzaWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbXBvc3NpYmxlJyk7XG5cbiAgc2luZ2xlUGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGhpZGVPcHRpb25zKCk7XG4gICAgc2hvd0RpZmZpY3VsdGllcygpO1xuICAgIHNob3dOYW1lcygnUGxheWVyJywgJ0NvbXB1dGVyJyk7XG4gIH0pO1xuXG4gIG11bHRpcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGhpZGVPcHRpb25zKCk7XG4gICAgc2hvd0dhbWUoKTtcbiAgICBtdWx0aXBsYXllckdhbWUoKTtcbiAgICBzaG93TmFtZXMoJ1BsYXllciAxJywgJ1BsYXllciAyJyk7XG4gIH0pO1xuXG4gIGVhc3kuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICAgIGhpZGVEaWZmaWN1bHRpZXMoKTtcbiAgICBzaG93R2FtZSgpO1xuICAgIHNpbmdsZVBsYXllckdhbWUoY29tcHV0ZXIsIGNvbXB1dGVyLnJhbmRvbUF0dGFjayk7XG4gIH0pO1xuXG4gIG1lZGl1bS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG4gICAgaGlkZURpZmZpY3VsdGllcygpO1xuICAgIHNob3dHYW1lKCk7XG4gICAgc2luZ2xlUGxheWVyR2FtZShjb21wdXRlciwgY29tcHV0ZXIuYWRqYWNlbnRBdHRhY2spO1xuICB9KTtcblxuICBoYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyID0gQ29tcHV0ZXIoKTtcbiAgICBoaWRlRGlmZmljdWx0aWVzKCk7XG4gICAgc2hvd0dhbWUoKTtcbiAgICBzaW5nbGVQbGF5ZXJHYW1lKGNvbXB1dGVyLCBjb21wdXRlci5kaWFnb25hbEF0dGFjayk7XG4gIH0pO1xuXG4gIGltcG9zc2libGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICAgIGhpZGVEaWZmaWN1bHRpZXMoKTtcbiAgICBzaG93R2FtZSgpO1xuICAgIHNpbmdsZVBsYXllckdhbWUoY29tcHV0ZXIsIGNvbXB1dGVyLnVuZmFpckF0dGFjayk7XG4gIH0pXG59O1xuXG5jb25zdCBzaW5nbGVQbGF5ZXJHYW1lID0gYXN5bmMgZnVuY3Rpb24oY29tcHV0ZXIsIGF0dGFja0Z1bmN0aW9uKSB7XG4gIGNvbnN0IHBsYXllciA9IFBsYXllcignUGxheWVyIDEnKTtcbiAgY29uc3QgcGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbGF5ZXI9XCJQbGF5ZXIgMVwiXVtjbGFzcyo9XCJncmlkXCJdJyk7XG4gIGNvbnN0IGNvbXB1dGVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbGF5ZXI9XCJQbGF5ZXIgMlwiXVtjbGFzcyo9XCJncmlkXCJdJyk7XG4gIGNvbnN0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9tZScpO1xuICBjb25zdCBzaGlwcyA9IFt7bGVuZ3RoOiA1LCBuYW1lOiAnQ2Fycmllcid9LCB7bGVuZ3RoOiA0LCBuYW1lOiAnQmF0dGxlc2hpcCd9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnRGVzdHJveWVyJ30sIHtsZW5ndGg6IDMsIG5hbWU6ICdTdWJtYXJpbmUnfSwge2xlbmd0aDogMiwgbmFtZTogJ1BhdHJvbCBCb2F0J31dO1xuICBsZXQgaSA9IDA7XG5cbiAgY29uc3QgY2hlY2tFbmQgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBpZiAocGxheWVyLnBsYXllckdhbWVib2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgYXdhaXQgcHJpbnQoJ0NvbXB1dGVyIHdpbnMuJywgMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgYXdhaXQgcHJpbnQoJ1BsYXllciB3aW5zLicsIDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGFzeW5jIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgIGNvbnN0IGNvbHVtbiA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmllbnRhdGlvbicpLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3Qgc3VjY2Vzc2Z1bFBsYWNlbWVudCA9IHBsYXllci5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHNoaXBzW2ldLmxlbmd0aCwgW3JvdywgY29sdW1uXSwgb3JpZW50YXRpb24pO1xuICAgIGlmICghc3VjY2Vzc2Z1bFBsYWNlbWVudCkgcmV0dXJuO1xuICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXIsIGZhbHNlKTtcbiAgICBpICs9IDE7XG5cbiAgICBpZiAoaTw1KSB7XG4gICAgICBhd2FpdCBwcmludChgUGxhY2UgeW91ciAke3NoaXBzW2ldLm5hbWV9LmAsIDApO1xuICAgICAgc2hvd1BsYWNlU2hpcChwbGF5ZXIsIHNoaXBzW2ldLmxlbmd0aCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgQXJyYXkuZnJvbShwbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgIGF3YWl0IHByaW50KCdDb21wdXRlciBwbGFjaW5nIHNoaXBzLi4uJywgNjAwKTtcbiAgICBjb21wdXRlci5yYW5kb21QbGFjZVNoaXBzKCk7XG4gICAgcmVuZGVyR2FtZWJvYXJkKGNvbXB1dGVyLCB0cnVlKTtcbiAgICBhd2FpdCBwcmludCgnWW91ciB0dXJuIHRvIGF0dGFjay4nLCAwKTtcbiAgICBzaG93QXR0YWNrKGNvbXB1dGVyKTtcblxuICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuXG4gICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzLCBbcm93LCBjb2x1bW5dKSkge1xuICAgICAgYXdhaXQgcHJpbnQoJ1lvdSBhbHJlYWR5IGF0dGFja2VkIHRoaXMgc3BvdC4gWW91ciB0dXJuIHRvIGF0dGFjay4nLCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGxheWVyLmF0dGFjayhjb21wdXRlciwgW3JvdywgY29sdW1uXSk7XG4gICAgcmVuZGVyR2FtZWJvYXJkKGNvbXB1dGVyLCB0cnVlKTtcbiAgICBjaGVja1BsYXllckhpdDogXG4gICAgICBmb3IgKGxldCBpPTA7IGk8Y29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMsIFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICAgICAgaWYgKGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgYXdhaXQgcHJpbnQoJ1lvdSBzdW5rIGEgc2hpcCEnLCA0MDApO1xuICAgICAgICAgICAgYnJlYWsgY2hlY2tQbGF5ZXJIaXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHByaW50KCdZb3UgaGl0IGEgc2hpcCEnLCA0MDApO1xuICAgICAgICAgIGJyZWFrIGNoZWNrUGxheWVySGl0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSBjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBhd2FpdCBwcmludCgnWW91IG1pc3NlZC4nLCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgXG4gICAgaWYgKGF3YWl0IGNoZWNrRW5kKCkpIHtcbiAgICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVzdGFydEdhbWVib2FyZHMoKTtcbiAgICAgICAgaGlkZUdhbWUoKTtcbiAgICAgICAgc2hvd09wdGlvbnMoKTtcbiAgICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIH0pXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgYXdhaXQgcHJpbnQoJ0VuZW15IGlzIGF0dGFja2luZy4uLicsIDMwMCk7XG4gICAgY29uc3QgW2NvbXB1dGVyUm93LCBjb21wdXRlckNvbHVtbl0gPSBhdHRhY2tGdW5jdGlvbihwbGF5ZXIpO1xuICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXIsIGZhbHNlKTtcbiAgICBjaGVja0NvbXB1dGVySGl0OiBcbiAgICAgIGZvciAobGV0IGk9MDsgaTxwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLCBbY29tcHV0ZXJSb3csIGNvbXB1dGVyQ29sdW1uXSkpIHtcbiAgICAgICAgICBpZiAocGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgYXdhaXQgcHJpbnQoJ0VuZW15IHN1bmsgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgICBicmVhayBjaGVja0NvbXB1dGVySGl0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBwcmludCgnRW5lbXkgaGl0IGEgc2hpcCEnLCA0MDApO1xuICAgICAgICAgIGJyZWFrIGNoZWNrQ29tcHV0ZXJIaXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBhd2FpdCBwcmludCgnRW5lbXkgbWlzc2VkLicsIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIGlmIChhd2FpdCBjaGVja0VuZCgpKSB7XG4gICAgICBBcnJheS5mcm9tKGNvbXB1dGVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHJlc3RhcnRHYW1lYm9hcmRzKCk7XG4gICAgICAgIGhpZGVHYW1lKCk7XG4gICAgICAgIHNob3dPcHRpb25zKCk7XG4gICAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHByaW50KCdZb3VyIHR1cm4gdG8gYXR0YWNrLicsIDApXG4gICAgc2hvd0F0dGFjayhjb21wdXRlcik7XG4gICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBhd2FpdCBwcmludCgnUGxhY2UgeW91ciBDYXJyaWVyLicpO1xuICBzaG93UGxhY2VTaGlwKHBsYXllciwgNSk7XG4gIEFycmF5LmZyb20ocGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbn07XG5cbmNvbnN0IG11bHRpcGxheWVyR2FtZSA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBjb25zdCBwbGF5ZXJPbmUgPSBQbGF5ZXIoJ1BsYXllciAxJyk7XG4gIGNvbnN0IHBsYXllclR3byA9IFBsYXllcignUGxheWVyIDInKTtcbiAgY29uc3QgcGxheWVyT25lR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9J1BsYXllciAxJ11bY2xhc3MqPVwiZ3JpZFwiXWApO1xuICBjb25zdCBwbGF5ZXJUd29HcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nUGxheWVyIDInXVtjbGFzcyo9XCJncmlkXCJdYCk7XG4gIGNvbnN0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9tZScpO1xuICBjb25zdCBzaGlwcyA9IFt7bGVuZ3RoOiA1LCBuYW1lOiAnQ2Fycmllcid9LCB7bGVuZ3RoOiA0LCBuYW1lOiAnQmF0dGxlc2hpcCd9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnRGVzdHJveWVyJ30sIHtsZW5ndGg6IDMsIG5hbWU6ICdTdWJtYXJpbmUnfSwge2xlbmd0aDogMiwgbmFtZTogJ1BhdHJvbCBCb2F0J31dO1xuICBsZXQgaSA9IDA7XG4gIGxldCBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuICBsZXQgdGFyZ2V0UGxheWVyO1xuXG4gIGNvbnN0IGNoZWNrRW5kID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBsYXllck9uZS5wbGF5ZXJHYW1lYm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgIGF3YWl0IHByaW50KCdQbGF5ZXIgMiB3aW5zLicsIDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChwbGF5ZXJUd28ucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICBhd2FpdCBwcmludCgnUGxheWVyIDEgd2lucy4nLCAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBhc3luYyBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWxQbGFjZW1lbnQgPSBjdXJyZW50UGxheWVyLnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcHNbaV0ubGVuZ3RoLCBbcm93LCBjb2x1bW5dLCBvcmllbnRhdGlvbik7XG4gICAgaWYgKCFzdWNjZXNzZnVsUGxhY2VtZW50KSByZXR1cm47XG4gICAgcmVuZGVyR2FtZWJvYXJkKGN1cnJlbnRQbGF5ZXIsIGZhbHNlKTtcbiAgICBpICs9IDE7XG5cbiAgICBpZiAoaTw1KSB7XG4gICAgICBhd2FpdCBwcmludChgUGxhY2UgeW91ciAke3NoaXBzW2ldLm5hbWV9LmAsIDApO1xuICAgICAgc2hvd1BsYWNlU2hpcChjdXJyZW50UGxheWVyLCBzaGlwc1tpXS5sZW5ndGgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGkgPSAwO1xuXG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIucGxheWVyTmFtZSA9PT0gJ1BsYXllciAxJykge1xuICAgICAgQXJyYXkuZnJvbShwbGF5ZXJPbmVHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNzAwKSk7XG4gICAgICBBcnJheS5mcm9tKHBsYXllck9uZUdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICBsb2FkUGFzc2luZ1NjcmVlbihhc3luYyAoKSA9PiB7XG4gICAgICAgIEFycmF5LmZyb20ocGxheWVyT25lR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgICAgQXJyYXkuZnJvbShwbGF5ZXJUd29HcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyT25lLCB0cnVlKTtcbiAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR3b1xuICAgICAgICBhd2FpdCBwcmludCgnUGxheWVyIDIsIHBsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgICAgICAgc2hvd1BsYWNlU2hpcChwbGF5ZXJUd28sIDUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDcwMCkpO1xuICAgICAgQXJyYXkuZnJvbShwbGF5ZXJUd29HcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgbG9hZFBhc3NpbmdTY3JlZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKHBsYXllclR3b0dyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllclR3bywgdHJ1ZSk7XG4gICAgICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXJPbmUsIGZhbHNlKTtcbiAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgICAgICAgdGFyZ2V0UGxheWVyID0gcGxheWVyVHdvO1xuICAgICAgICBhd2FpdCBwcmludChcIlBsYXllciAxJ3MgdHVybiB0byBhdHRhY2suXCIpO1xuICAgICAgICBzaG93QXR0YWNrKHRhcmdldFBsYXllcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9J11bY2xhc3MqPSdncmlkJ11gKTtcbiAgICBjb25zdCB0YXJnZXRQbGF5ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nJHt0YXJnZXRQbGF5ZXIucGxheWVyTmFtZX0nXVtjbGFzcyo9J2dyaWQnXWApO1xuICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkodGFyZ2V0UGxheWVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3MsIFtyb3csIGNvbHVtbl0pKSB7IFxuICAgICAgYXdhaXQgcHJpbnQoYFlvdSBhbHJlYWR5IGF0dGFja2VkIHRoaXMgc3BvdC4gJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9J3MgdHVybiB0byBhdHRhY2suYCwgMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGN1cnJlbnRQbGF5ZXIuYXR0YWNrKHRhcmdldFBsYXllciwgW3JvdywgY29sdW1uXSk7XG4gICAgcmVuZGVyR2FtZWJvYXJkKHRhcmdldFBsYXllciwgdHJ1ZSk7XG4gICAgY2hlY2tQbGF5ZXJIaXQ6IFxuICAgICAgZm9yIChsZXQgaT0wOyBpPHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkodGFyZ2V0UGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMsIFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICAgICAgaWYgKHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaW50KGAke2N1cnJlbnRQbGF5ZXIucGxheWVyTmFtZX0gc3VuayBhIHNoaXAhYCwgNDAwKTtcbiAgICAgICAgICAgIGJyZWFrIGNoZWNrUGxheWVySGl0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9IGhpdCBhIHNoaXAhYCwgNDAwKTtcbiAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gdGFyZ2V0UGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGF3YWl0IHByaW50KGAke2N1cnJlbnRQbGF5ZXIucGxheWVyTmFtZX0gbWlzc2VkLmAsIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBcbiAgICBpZiAoYXdhaXQgY2hlY2tFbmQoKSkge1xuICAgICAgQXJyYXkuZnJvbSh0YXJnZXRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICByZXN0YXJ0R2FtZWJvYXJkcygpO1xuICAgICAgICAgIGhpZGVHYW1lKCk7XG4gICAgICAgICAgc2hvd09wdGlvbnMoKTtcbiAgICAgICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBBcnJheS5mcm9tKHRhcmdldFBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNzAwKSk7XG4gICAgQXJyYXkuZnJvbSh0YXJnZXRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgIGxvYWRQYXNzaW5nU2NyZWVuKGFzeW5jICgpID0+IHtcbiAgICAgIEFycmF5LmZyb20odGFyZ2V0UGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgIEFycmF5LmZyb20oY3VycmVudFBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICByZW5kZXJHYW1lYm9hcmQodGFyZ2V0UGxheWVyLCBmYWxzZSk7XG4gICAgICByZW5kZXJHYW1lYm9hcmQoY3VycmVudFBsYXllciwgdHJ1ZSk7XG4gICAgICBjb25zdCBbYSwgYl0gPSBbdGFyZ2V0UGxheWVyLCBjdXJyZW50UGxheWVyXTtcbiAgICAgIHRhcmdldFBsYXllciA9IGI7XG4gICAgICBjdXJyZW50UGxheWVyID0gYTtcbiAgXG4gICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9J3MgdHVybiB0byBhdHRhY2suYCk7XG4gICAgICBzaG93QXR0YWNrKHRhcmdldFBsYXllcik7XG4gICAgfSk7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBhd2FpdCBwcmludCgnUGxheWVyIDEsIHBsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgc2hvd1BsYWNlU2hpcChwbGF5ZXJPbmUsIDUpO1xuICBBcnJheS5mcm9tKHBsYXllck9uZUdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVTY3JlZW47IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgaG9tZVNjcmVlbiBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgdG9nZ2xlT3JpZW50YXRpb25CdXR0b24gfSBmcm9tICcuL2RvbSc7XG5cbmhvbWVTY3JlZW4oKTtcbnRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uKCk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcImZvbnRzL0plcnNleTI1LVJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiaW1hZ2VzL3dhdGVyLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogamVyc2V5O1xuICBzcmM6IHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX199KTtcbn1cblxuYm9keSB7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSk7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG5cbmRpdiwgcCwgYnV0dG9uIHtcbiAgY29sb3I6ICNjZGQ1ZGM7XG4gIGZvbnQtZmFtaWx5OiBqZXJzZXk7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICB3b3JkLXNwYWNpbmc6IDVweDtcbn1cblxuYnV0dG9uIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDE0Nzc4O1xuICBwYWRkaW5nOiA4cHg7XG4gIGJveC1zaGFkb3c6IGluc2V0IC0wLjFlbSAtMC4yZW0gMC4yZW0gYmxhY2s7XG59XG5cbmJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1MTU2ODM7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuI2dhbWUtdGl0bGUge1xuICBmb250LXNpemU6IDJyZW07XG59XG5cbiNnYW1lIHtcbiAgbWFyZ2luLXRvcDogMTZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAyNHB4O1xufVxuXG4jbWVzc2FnZSB7XG4gIGhlaWdodDogNjRweDtcbiAgcGFkZGluZzogMCA2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNjZGQ1ZGM7XG5cbiAgI2NoYXJhY3RlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB9XG5cbiAgI3RleHRib3gge1xuICAgIHBhZGRpbmc6IDAgOHB4O1xuICAgIHdpZHRoOiAyNDBweDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgI3RleHQge1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgfVxuICB9XG59XG5cbiNnYW1lYm9hcmQtY29udGFpbmVyIHtcbiAgd2lkdGg6IDkwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxNnB4O1xuXG4gIHAge1xuICAgIG1hcmdpbjogNHB4IDAgMCAwO1xuICB9XG5cbiAgI3BsYXllci0xLCAjcGxheWVyLTIge1xuICAgIHdpZHRoOiA1MCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gIH1cbn1cblxuLmdhbWVib2FyZCB7XG4gIHdpZHRoOiAyNDBweDtcbiAgaGVpZ2h0OiAyNDBweDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xuICByb3ctZ2FwOiAycHg7XG4gIGNvbHVtbi1nYXA6IDJweDtcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XG5cbiAgLmdyaWQge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjZGQ1ZGM7XG4gIH1cbn1cblxuLmhvdmVyLXBsYWNlLCAuaG92ZXItYXR0YWNrLCAub2NjdXBpZWQuaGlkZGVuLmhvdmVyLWF0dGFjayB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDcsIDE2OCwgMTgxKTtcbn1cblxuLm9jY3VwaWVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDM3LCAxNzMsIDgyKTtcbn1cblxuLmhvdmVyLXBsYWNlLm9jY3VwaWVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMzLCA0MCwgNTcpO1xufVxuXG4ub3V0c2lkZS1ncmlkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uaGl0LCAuaG92ZXItYXR0YWNrLmhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG59XG5cbi5vY2N1cGllZC5oaWRkZW4ge1xuICBkaXNwbGF5OmJsb2NrO1xuICBiYWNrZ3JvdW5kOiBub25lO1xufVxuXG4ub2NjdXBpZWQuaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG5ib2R5ID4gZGl2LmhpZGRlbiwgYnV0dG9uLmhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cblxuZGl2LmhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi51bmNsaWNrYWJsZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4jZ2FtZS1vcHRpb25zIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDU2cHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBcbiAgI2dhbWUtdGl0bGUge1xuICAgIG1hcmdpbjogMDtcbiAgICBtYXJnaW4tdG9wOiAtNTZweDtcbiAgfVxuXG4gICNvcHRpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogMjRweDtcbiAgfVxufVxuXG4jZGlmZmljdWx0eSB7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMjRweDtcbn1cblxuI3Bhc3Npbmctc2NyZWVuIHtcbiAgaGVpZ2h0OiA4MCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDU0MHB4KSB7XG4gICNnYW1lYm9hcmQtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgZ2FwOiAyNHB4O1xuICB9XG5cbiAgLmdhbWVib2FyZCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiA1MjBweDtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgYXNwZWN0LXJhdGlvOiAxLzE7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxtQkFBbUI7RUFDbkIsNENBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtFQUN0Qix5REFBdUM7RUFDdkMsc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsY0FBYztFQUNkLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWiwyQ0FBMkM7QUFDN0M7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGNBQWM7RUFDZCxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHlCQUF5Qjs7RUFFekI7SUFDRSxhQUFhO0lBQ2IsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsY0FBYztJQUNkLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLG1CQUFtQjs7SUFFbkI7TUFDRSxpQkFBaUI7SUFDbkI7RUFDRjtBQUNGOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFNBQVM7O0VBRVQ7SUFDRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxVQUFVO0lBQ1YsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsUUFBUTtFQUNWO0FBQ0Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYixnREFBZ0Q7RUFDaEQsWUFBWTtFQUNaLGVBQWU7RUFDZixpQkFBaUI7O0VBRWpCO0lBQ0UseUJBQXlCO0VBQzNCO0FBQ0Y7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsU0FBUztFQUNULHVCQUF1QjtFQUN2QixtQkFBbUI7O0VBRW5CO0lBQ0UsU0FBUztJQUNULGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLGFBQWE7SUFDYixTQUFTO0VBQ1g7QUFDRjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFNBQVM7RUFDWDs7RUFFQTtJQUNFLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLGlCQUFpQjtFQUNuQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IGplcnNleTtcXG4gIHNyYzogdXJsKGZvbnRzL0plcnNleTI1LVJlZ3VsYXIudHRmKTtcXG59XFxuXFxuYm9keSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaW1hZ2VzL3dhdGVyLmpwZyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG5cXG5kaXYsIHAsIGJ1dHRvbiB7XFxuICBjb2xvcjogI2NkZDVkYztcXG4gIGZvbnQtZmFtaWx5OiBqZXJzZXk7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIHdvcmQtc3BhY2luZzogNXB4O1xcbn1cXG5cXG5idXR0b24ge1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGFwcGVhcmFuY2U6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDE0Nzc4O1xcbiAgcGFkZGluZzogOHB4O1xcbiAgYm94LXNoYWRvdzogaW5zZXQgLTAuMWVtIC0wLjJlbSAwLjJlbSBibGFjaztcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1MTU2ODM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiNnYW1lLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuI2dhbWUge1xcbiAgbWFyZ2luLXRvcDogMTZweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjRweDtcXG59XFxuXFxuI21lc3NhZ2Uge1xcbiAgaGVpZ2h0OiA2NHB4O1xcbiAgcGFkZGluZzogMCA2cHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICNjZGQ1ZGM7XFxuXFxuICAjY2hhcmFjdGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG5cXG4gICN0ZXh0Ym94IHtcXG4gICAgcGFkZGluZzogMCA4cHg7XFxuICAgIHdpZHRoOiAyNDBweDtcXG4gICAgaGVpZ2h0OiA0OHB4O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgICAjdGV4dCB7XFxuICAgICAgZm9udC1zaXplOiAxLjFyZW07XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuI2dhbWVib2FyZC1jb250YWluZXIge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTZweDtcXG5cXG4gIHAge1xcbiAgICBtYXJnaW46IDRweCAwIDAgMDtcXG4gIH1cXG5cXG4gICNwbGF5ZXItMSwgI3BsYXllci0yIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZ2FwOiA4cHg7XFxuICB9XFxufVxcblxcbi5nYW1lYm9hcmQge1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgaGVpZ2h0OiAyNDBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XFxuICByb3ctZ2FwOiAycHg7XFxuICBjb2x1bW4tZ2FwOiAycHg7XFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXG5cXG4gIC5ncmlkIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NkZDVkYztcXG4gIH1cXG59XFxuXFxuLmhvdmVyLXBsYWNlLCAuaG92ZXItYXR0YWNrLCAub2NjdXBpZWQuaGlkZGVuLmhvdmVyLWF0dGFjayB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ3LCAxNjgsIDE4MSk7XFxufVxcblxcbi5vY2N1cGllZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzcsIDE3MywgODIpO1xcbn1cXG5cXG4uaG92ZXItcGxhY2Uub2NjdXBpZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDMzLCA0MCwgNTcpO1xcbn1cXG5cXG4ub3V0c2lkZS1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLmhpdCwgLmhvdmVyLWF0dGFjay5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG59XFxuXFxuLm9jY3VwaWVkLmhpZGRlbiB7XFxuICBkaXNwbGF5OmJsb2NrO1xcbiAgYmFja2dyb3VuZDogbm9uZTtcXG59XFxuXFxuLm9jY3VwaWVkLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbmJvZHkgPiBkaXYuaGlkZGVuLCBidXR0b24uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcXG59XFxuXFxuZGl2LmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udW5jbGlja2FibGUge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbiNnYW1lLW9wdGlvbnMge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDU2cHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBcXG4gICNnYW1lLXRpdGxlIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBtYXJnaW4tdG9wOiAtNTZweDtcXG4gIH1cXG5cXG4gICNvcHRpb25zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZ2FwOiAyNHB4O1xcbiAgfVxcbn1cXG5cXG4jZGlmZmljdWx0eSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyNHB4O1xcbn1cXG5cXG4jcGFzc2luZy1zY3JlZW4ge1xcbiAgaGVpZ2h0OiA4MCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA1NDBweCkge1xcbiAgI2dhbWVib2FyZC1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBnYXA6IDI0cHg7XFxuICB9XFxuXFxuICAuZ2FtZWJvYXJkIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIG1heC13aWR0aDogNTIwcHg7XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgYXNwZWN0LXJhdGlvOiAxLzE7XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbImFycmF5SW5jbHVkZXNBcnJheSIsInBhcmVudEFycmF5IiwiY2hpbGRBcnJheSIsImdldEluZGV4IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY3VycmVudEluZGV4Iiwic2xpY2UiLCJpIiwiU2hpcCIsImhpdENvdW50Iiwic3VuayIsImhpdCIsImlzU3VuayIsIkdhbWVib2FyZCIsInNoaXBDb29yZGluYXRlcyIsInJlY2VpdmVkQXR0YWNrcyIsImlzT2NjdXBpZWQiLCJjb29yZGluYXRlcyIsInNoaXAiLCJpc091dHNpZGVHYW1lYm9hcmQiLCJwbGFjZVNoaXAiLCJzdGFydENvb3JkIiwib3JpZW50YXRpb24iLCJuZXdTaGlwIiwiY2xhc2hpbmdTaGlwcyIsInB1c2giLCJyZWNlaXZlQXR0YWNrIiwiaXNBbGxTdW5rIiwiUGxheWVyIiwibmFtZSIsInBsYXllck5hbWUiLCJwbGF5ZXJHYW1lYm9hcmQiLCJhdHRhY2siLCJ0YXJnZXQiLCJDb21wdXRlciIsImF0dGFja0Nvb3JkaW5hdGVzIiwic3VjY2Vzc2Z1bEF0dGFjayIsInN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50Iiwic3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudCIsImFkamFjZW50TW9kZSIsImRpYWdvbmFsQXR0YWNrUXVldWUiLCJqIiwicmFuZG9tQXR0YWNrIiwicm93IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiY29sdW1uIiwiZ2V0QWRqYWNlbnRNb3ZlcyIsInZlcnRpY2FsTW92ZXMiLCJob3Jpem9udGFsTW92ZXMiLCJ2ZXJ0aWNhbENvb3JkaW5hdGVzIiwiaG9yaXpvbnRhbENvb3JkaW5hdGVzIiwiYWRqYWNlbnRDb29yZGluYXRlIiwiYWRqYWNlbnRBdHRhY2siLCJmb3JFYWNoIiwibW92ZSIsInNoaWZ0IiwiaW5kZXgiLCJzcGxpY2UiLCJnZXREaWFnb25hbE1vdmVzIiwicG9zc2libGVNb3ZlcyIsImRpYWdvbmFsQ29vcmRpbmF0ZXMiLCJkaWFnb25hbENvb3JkaW5hdGUiLCJkaWFnb25hbEF0dGFjayIsInJhbmRvbVBsYWNlU2hpcHMiLCJzaGlwTGVuZ3RocyIsIm9yaWVudGF0aW9ucyIsInN1Y2Nlc3NmdWxQbGFjZW1lbnQiLCJ1bmZhaXJBdHRhY2siLCJoaWRlT3B0aW9ucyIsIm9wdGlvbnMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJzaG93T3B0aW9ucyIsInJlbW92ZSIsImhpZGVHYW1lIiwiZ2FtZSIsInNob3dHYW1lIiwiaGlkZURpZmZpY3VsdGllcyIsImRpZmZpY3VsdHkiLCJzaG93RGlmZmljdWx0aWVzIiwic2hvd05hbWVzIiwicGxheWVyT25lIiwicGxheWVyVHdvIiwicGxheWVyT25lVGl0bGUiLCJwbGF5ZXJUd29UaXRsZSIsInRleHRDb250ZW50IiwibG9hZFBhc3NpbmdTY3JlZW4iLCJuZXh0RnVuY3Rpb24iLCJwYXNzaW5nU2NyZWVuIiwibmV4dEJ1dHRvbiIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0b3BQYXNzaW5nU2NyZWVuIiwicmVtb3ZlQ2hpbGQiLCJyZW5kZXJHYW1lYm9hcmQiLCJwbGF5ZXIiLCJoaWRkZW4iLCJncmlkIiwiY29udGFpbnMiLCJzaG93UGxhY2VTaGlwIiwicGxheWVyR3JpZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2hvd25HcmlkcyIsImFkZENsYXNzIiwiZXZlbnQiLCJ0b0xvd2VyQ2FzZSIsImdyaWRzIiwiTnVtYmVyIiwiZ2V0QXR0cmlidXRlIiwiQXJyYXkiLCJmcm9tIiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlRXZlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2hvd0F0dGFjayIsInRhcmdldEdyaWRzIiwicHJpbnQiLCJtZXNzYWdlIiwiYWZ0ZXJEZWxheSIsIm1lc3NhZ2VDb250YWluZXIiLCJtZXNzYWdlQ2hhcmFjdGVycyIsInNwbGl0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwidG9nZ2xlT3JpZW50YXRpb25CdXR0b24iLCJvcmllbnRhdGlvbkJ1dHRvbiIsInJlc3RhcnRHYW1lYm9hcmRzIiwiaG9tZVNjcmVlbiIsInNpbmdsZVBsYXllciIsIm11bHRpcGxheWVyIiwiZWFzeSIsIm1lZGl1bSIsImhhcmQiLCJpbXBvc3NpYmxlIiwibXVsdGlwbGF5ZXJHYW1lIiwiY29tcHV0ZXIiLCJzaW5nbGVQbGF5ZXJHYW1lIiwiYXR0YWNrRnVuY3Rpb24iLCJjb21wdXRlckdyaWRzIiwiaG9tZUJ1dHRvbiIsInNoaXBzIiwiY2hlY2tFbmQiLCJjaGVja1BsYXllckhpdCIsImNvbXB1dGVyUm93IiwiY29tcHV0ZXJDb2x1bW4iLCJjaGVja0NvbXB1dGVySGl0IiwicGxheWVyT25lR3JpZHMiLCJwbGF5ZXJUd29HcmlkcyIsImN1cnJlbnRQbGF5ZXIiLCJ0YXJnZXRQbGF5ZXIiLCJjdXJyZW50UGxheWVyR3JpZHMiLCJ0YXJnZXRQbGF5ZXJHcmlkcyIsImEiLCJiIl0sInNvdXJjZVJvb3QiOiIifQ==