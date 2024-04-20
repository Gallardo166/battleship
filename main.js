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
    console.log(event.target);
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
      grid.removeEventListener('click', removeEvent);
    });
    event.stopPropagation();
  };
  Array.from(targetGrids).forEach(grid => {
    grid.addEventListener('mouseover', addClass);
    grid.addEventListener('click', removeEvent);
  });
};
const print = async function (message, afterDelay) {
  const grids = document.querySelectorAll('.grid');
  const messageContainer = document.querySelector('#message');
  const messageCharacters = message.split('');
  Array.from(grids).forEach(grid => {
    grid.classList.add('unclickable');
  });
  messageContainer.textContent = '';
  for (let i = 0; i < messageCharacters.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 300));
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
  });
  multiplayer.addEventListener('click', () => {
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideOptions)();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showGame)();
    multiplayerGame();
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
  const playerGrids = document.querySelectorAll('[data-player="Player 1"]');
  const computerGrids = document.querySelectorAll('[data-player="Player 2"]');
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
  const playerOneGrids = document.querySelectorAll(`[data-player='Player 1']`);
  const playerTwoGrids = document.querySelectorAll(`[data-player='Player 2']`);
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
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showPlaceShip)(currentPlayer, ships[i].length);
      await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)(`Place your ${ships[i].name}.`, 0);
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
    const currentPlayerGrids = document.querySelectorAll(`[data-player='${currentPlayer.playerName}']`);
    const targetPlayerGrids = document.querySelectorAll(`[data-player='${targetPlayer.playerName}']`);
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

#orientation-container, #message, #home {
  align-self: center;
}

#gameboard-container {
  display: flex;
  gap: 16px;
}

.gameboard {
  width: 90%;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
}

.grid {
  border: 1px solid black;
}

.hover-place, .hover-attack, .occupied.hidden.hover-attack {
  background-color: rgb(169, 168, 168);
}

.occupied {
  background-color: rgb(87, 85, 85);
}

.hover-place.occupied {
  background-color: rgb(28, 28, 28);
}

.outside-grid {
  background-color: red;
}

.hit, .hover-attack.hit {
  background-color: blue;
}

.occupied.hidden {
  display:block;
  background-color:white;
}

.occupied.hit {
  background-color: red;
}

.hidden {
  display: none;
}

.unclickable {
  pointer-events: none;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,aAAa;EACb,gDAAgD;AAClD;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,oBAAoB;AACtB","sourcesContent":["body {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n#orientation-container, #message, #home {\n  align-self: center;\n}\n\n#gameboard-container {\n  display: flex;\n  gap: 16px;\n}\n\n.gameboard {\n  width: 90%;\n  aspect-ratio: 1 / 1;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n}\n\n.grid {\n  border: 1px solid black;\n}\n\n.hover-place, .hover-attack, .occupied.hidden.hover-attack {\n  background-color: rgb(169, 168, 168);\n}\n\n.occupied {\n  background-color: rgb(87, 85, 85);\n}\n\n.hover-place.occupied {\n  background-color: rgb(28, 28, 28);\n}\n\n.outside-grid {\n  background-color: red;\n}\n\n.hit, .hover-attack.hit {\n  background-color: blue;\n}\n\n.occupied.hidden {\n  display:block;\n  background-color:white;\n}\n\n.occupied.hit {\n  background-color: red;\n}\n\n.hidden {\n  display: none;\n}\n\n.unclickable {\n  pointer-events: none;\n}"],"sourceRoot":""}]);
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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FycmF5LXNlYXJjaC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcnJheUluY2x1ZGVzQXJyYXkgPSBmdW5jdGlvbihwYXJlbnRBcnJheSwgY2hpbGRBcnJheSwgZ2V0SW5kZXggPSBmYWxzZSwgY3VycmVudEluZGV4ID0gMCkge1xuICBpZiAocGFyZW50QXJyYXkubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZSB9XG4gIGlmIChwYXJlbnRBcnJheVswXS5sZW5ndGggIT09IGNoaWxkQXJyYXkubGVuZ3RoKSB7XG4gICAgcGFyZW50QXJyYXkgPSBwYXJlbnRBcnJheS5zbGljZSgxKTtcbiAgICByZXR1cm4gYXJyYXlJbmNsdWRlc0FycmF5KHBhcmVudEFycmF5LCBjaGlsZEFycmF5LCBnZXRJbmRleCwgY3VycmVudEluZGV4ICsgMSk7XG4gIH1cbiAgZm9yIChsZXQgaT0wOyBpPGNoaWxkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2hpbGRBcnJheVtpXSAhPT0gcGFyZW50QXJyYXlbMF1baV0pIHsgXG4gICAgICBwYXJlbnRBcnJheSA9IHBhcmVudEFycmF5LnNsaWNlKDEpO1xuICAgICAgcmV0dXJuIGFycmF5SW5jbHVkZXNBcnJheShwYXJlbnRBcnJheSwgY2hpbGRBcnJheSwgZ2V0SW5kZXgsIGN1cnJlbnRJbmRleCArIDEpXG4gICAgfVxuICB9XG4gIGlmIChnZXRJbmRleCkgeyByZXR1cm4gY3VycmVudEluZGV4IH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5leHBvcnQgeyBhcnJheUluY2x1ZGVzQXJyYXkgfTsiLCJpbXBvcnQgeyBhcnJheUluY2x1ZGVzQXJyYXkgfSBmcm9tIFwiLi9hcnJheS1zZWFyY2hcIjtcblxuY29uc3QgU2hpcCA9IGZ1bmN0aW9uKGxlbmd0aCkge1xuICBsZXQgaGl0Q291bnQgPSAwO1xuICBsZXQgc3VuayA9IGZhbHNlO1xuXG4gIGNvbnN0IGhpdCA9IGZ1bmN0aW9uKCkge1xuICAgIGhpdENvdW50ICs9IDE7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGxlbmd0aCA9PT0gaGl0Q291bnQpIHtcbiAgICAgIHN1bmsgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc3VuaztcbiAgfTtcblxuICByZXR1cm4geyBoaXQsIGlzU3VuayB9O1xufVxuXG5jb25zdCBHYW1lYm9hcmQgPSBmdW5jdGlvbigpIHtcbiAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuICBsZXQgcmVjZWl2ZWRBdHRhY2tzID0gW107XG5cbiAgY29uc3QgaXNPY2N1cGllZCA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgZm9yIChsZXQgaT0wOyBpPHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShzaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMsIGNvb3JkaW5hdGVzKSkge1xuICAgICAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzW2ldLnNoaXA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBpc091dHNpZGVHYW1lYm9hcmQgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGlmIChjb29yZGluYXRlc1swXSA8IDAgfHwgY29vcmRpbmF0ZXNbMF0gPiA5IHx8IGNvb3JkaW5hdGVzWzFdIDwgMCB8fCBjb29yZGluYXRlc1sxXSA+IDkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gZnVuY3Rpb24obGVuZ3RoLCBzdGFydENvb3JkLCBvcmllbnRhdGlvbikge1xuICAgIGNvbnN0IG5ld1NoaXAgPSBTaGlwKGxlbmd0aCk7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gW3N0YXJ0Q29vcmRdO1xuICAgIGxldCBjbGFzaGluZ1NoaXBzID0gZmFsc2U7XG4gIFxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICBmb3IgKGxldCBpPTA7IChpPGxlbmd0aCAmJiBjbGFzaGluZ1NoaXBzID09PSBmYWxzZSk7IGkrKykge1xuICAgICAgICBpZiAoaXNPY2N1cGllZChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoaXNPdXRzaWRlR2FtZWJvYXJkKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpPTE7IGk8bGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaT0wOyAoaTxsZW5ndGggJiYgY2xhc2hpbmdTaGlwcyA9PT0gZmFsc2UpOyBpKyspIHtcbiAgICAgICAgaWYgKGlzT2NjdXBpZWQoW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGlzT3V0c2lkZUdhbWVib2FyZChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaT0xOyBpPGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hpcENvb3JkaW5hdGVzLnB1c2goeyBzaGlwOiBuZXdTaGlwLCBjb29yZGluYXRlcyB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBjb25zdCBzaGlwID0gaXNPY2N1cGllZChjb29yZGluYXRlcyk7XG4gICAgaWYgKHNoaXAgIT09IGZhbHNlKSB7XG4gICAgICBzaGlwLmhpdCgpO1xuICAgIH1cbiAgICByZWNlaXZlZEF0dGFja3MucHVzaChjb29yZGluYXRlcyk7XG4gIH07XG5cbiAgY29uc3QgaXNBbGxTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGk8c2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiB7IHNoaXBDb29yZGluYXRlcywgcmVjZWl2ZWRBdHRhY2tzLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGlzQWxsU3VuaywgaXNPY2N1cGllZCwgaXNPdXRzaWRlR2FtZWJvYXJkIH07XG59O1xuXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQsIGNvb3JkaW5hdGVzKSB7XG4gICAgdGFyZ2V0LnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJOYW1lLCBwbGF5ZXJHYW1lYm9hcmQsIGF0dGFjayB9O1xufTtcblxuY29uc3QgQ29tcHV0ZXIgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgcGxheWVyTmFtZSA9ICdQbGF5ZXIgMic7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBhdHRhY2tDb29yZGluYXRlcyA9IFtdO1xuICBsZXQgc3VjY2Vzc2Z1bEF0dGFjaztcbiAgbGV0IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50ID0gW107XG4gIGxldCBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50ID0gW107XG4gIGxldCBhZGphY2VudE1vZGUgPSBmYWxzZTtcbiAgbGV0IG9yaWVudGF0aW9uO1xuICBsZXQgZGlhZ29uYWxBdHRhY2tRdWV1ZSA9IFtdO1xuICBsZXQgaSA9IDA7XG4gIGxldCBqID0gMDtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KGF0dGFja0Nvb3JkaW5hdGVzLCBbcm93LCBjb2x1bW5dKSkgeyBjb250aW51ZSB9XG4gICAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XG4gICAgICBhdHRhY2tDb29yZGluYXRlcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldEFkamFjZW50TW92ZXMgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGNvbnN0IHZlcnRpY2FsTW92ZXMgPSBbWzEsIDBdLCBbLTEsIDBdXTtcbiAgICBjb25zdCBob3Jpem9udGFsTW92ZXMgPSBbWzAsIDFdLCBbMCwgLTFdXTtcbiAgICBsZXQgdmVydGljYWxDb29yZGluYXRlcyA9IFtdO1xuICAgIGxldCBob3Jpem9udGFsQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGk9MDsgaTx2ZXJ0aWNhbE1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhZGphY2VudENvb3JkaW5hdGUgPSBbY29vcmRpbmF0ZXNbMF0gKyB2ZXJ0aWNhbE1vdmVzW2ldWzBdLCBjb29yZGluYXRlc1sxXSArIHZlcnRpY2FsTW92ZXNbaV1bMV1dO1xuICAgICAgaWYgKCFwbGF5ZXJHYW1lYm9hcmQuaXNPdXRzaWRlR2FtZWJvYXJkKGFkamFjZW50Q29vcmRpbmF0ZSkgJiYgIWFycmF5SW5jbHVkZXNBcnJheShhdHRhY2tDb29yZGluYXRlcywgYWRqYWNlbnRDb29yZGluYXRlKSkge1xuICAgICAgICB2ZXJ0aWNhbENvb3JkaW5hdGVzLnB1c2goW2FkamFjZW50Q29vcmRpbmF0ZSwgJ3ZlcnRpY2FsJ10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGk9MDsgaTxob3Jpem9udGFsTW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkamFjZW50Q29vcmRpbmF0ZSA9IFtjb29yZGluYXRlc1swXSArIGhvcml6b250YWxNb3Zlc1tpXVswXSwgY29vcmRpbmF0ZXNbMV0gKyBob3Jpem9udGFsTW92ZXNbaV1bMV1dO1xuICAgICAgaWYgKCFwbGF5ZXJHYW1lYm9hcmQuaXNPdXRzaWRlR2FtZWJvYXJkKGFkamFjZW50Q29vcmRpbmF0ZSkgJiYgIWFycmF5SW5jbHVkZXNBcnJheShhdHRhY2tDb29yZGluYXRlcywgYWRqYWNlbnRDb29yZGluYXRlKSkge1xuICAgICAgICBob3Jpem9udGFsQ29vcmRpbmF0ZXMucHVzaChbYWRqYWNlbnRDb29yZGluYXRlLCAnaG9yaXpvbnRhbCddKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyB2ZXJ0aWNhbENvb3JkaW5hdGVzLCBob3Jpem9udGFsQ29vcmRpbmF0ZXMgfTtcbiAgfTtcblxuICBjb25zdCBhZGphY2VudEF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXG4gICAgaWYgKCFhZGphY2VudE1vZGUpIHtcbiAgICAgIGNvbnN0IFtyb3csIGNvbHVtbl0gPSByYW5kb21BdHRhY2sodGFyZ2V0KTtcblxuICAgICAgaWYgKHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICBhZGphY2VudE1vZGUgPSB0cnVlO1xuICAgICAgICBzdWNjZXNzZnVsQXR0YWNrID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS52ZXJ0aWNhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLmhvcml6b250YWxDb29yZGluYXRlcy5mb3JFYWNoKChtb3ZlKSA9PiBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByb3csIGNvbHVtbjtcbiAgICAgIGxldCBvcmllbnRhdGlvbjtcbiAgICAgIGlmIChzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudC5sZW5ndGggPT09IDAgfHwgb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICBbcm93LCBjb2x1bW5dID0gc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudC5zaGlmdCgpWzBdO1xuICAgICAgICBvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtyb3csIGNvbHVtbl0gPSBzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudC5zaGlmdCgpWzBdO1xuICAgICAgICBvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGluZGV4ID0gYXJyYXlJbmNsdWRlc0FycmF5KGRpYWdvbmFsQXR0YWNrUXVldWUsIFtyb3csIGNvbHVtbl0sIHRydWUpO1xuXG4gICAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XG4gICAgICBhdHRhY2tDb29yZGluYXRlcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgaWYgKGluZGV4ICE9PSBmYWxzZSkge1xuICAgICAgICBkaWFnb25hbEF0dGFja1F1ZXVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICh0YXJnZXQucGxheWVyR2FtZWJvYXJkLmlzT2NjdXBpZWQoW3JvdywgY29sdW1uXSkpIHtcbiAgICAgICAgaWYgKHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93LCBjb2x1bW5dKS5pc1N1bmsoKSkge1xuICAgICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50ID0gW107XG4gICAgICAgICAgc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudCA9IFtdO1xuICAgICAgICAgIGFkamFjZW50TW9kZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICBzdWNjZXNzZnVsQXR0YWNrID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgICAgIGdldEFkamFjZW50TW92ZXMoc3VjY2Vzc2Z1bEF0dGFjaykuaG9yaXpvbnRhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2sgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS52ZXJ0aWNhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldERpYWdvbmFsTW92ZXMgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGNvbnN0IHBvc3NpYmxlTW92ZXMgPSBbWzEsIDFdLCBbLTEsIDFdLCBbMSwgLTFdLCBbLTEsIC0xXV07XG4gICAgbGV0IGRpYWdvbmFsQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgIHBvc3NpYmxlTW92ZXMuZm9yRWFjaCgobW92ZSkgPT4ge1xuICAgICAgY29uc3QgZGlhZ29uYWxDb29yZGluYXRlID0gW2Nvb3JkaW5hdGVzWzBdICsgbW92ZVswXSwgY29vcmRpbmF0ZXNbMV0gKyBtb3ZlWzFdXTtcbiAgICAgIGlmICghcGxheWVyR2FtZWJvYXJkLmlzT3V0c2lkZUdhbWVib2FyZChkaWFnb25hbENvb3JkaW5hdGUpICYmICFhcnJheUluY2x1ZGVzQXJyYXkoYXR0YWNrQ29vcmRpbmF0ZXMsIGRpYWdvbmFsQ29vcmRpbmF0ZSkgJiYgIWFycmF5SW5jbHVkZXNBcnJheShkaWFnb25hbEF0dGFja1F1ZXVlLCBkaWFnb25hbENvb3JkaW5hdGUpKSB7XG4gICAgICAgIGRpYWdvbmFsQ29vcmRpbmF0ZXMucHVzaChkaWFnb25hbENvb3JkaW5hdGUpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGRpYWdvbmFsQ29vcmRpbmF0ZXM7XG4gIH07XG5cbiAgY29uc3QgZGlhZ29uYWxBdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcblxuICAgIGlmICghYWRqYWNlbnRNb2RlKSB7XG4gICAgICBsZXQgcm93LCBjb2x1bW47XG4gICAgICBpZiAoYXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIFtyb3csIGNvbHVtbl0gPSByYW5kb21BdHRhY2sodGFyZ2V0KTtcbiAgICAgICAgZ2V0RGlhZ29uYWxNb3Zlcyhbcm93LCBjb2x1bW5dKS5mb3JFYWNoKChjb29yZGluYXRlcykgPT4geyBkaWFnb25hbEF0dGFja1F1ZXVlLnB1c2goY29vcmRpbmF0ZXMpIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbcm93LCBjb2x1bW5dID0gZGlhZ29uYWxBdHRhY2tRdWV1ZVtpXTtcbiAgICAgICAgdGFyZ2V0LnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFtyb3csIGNvbHVtbl0pO1xuICAgICAgICBhdHRhY2tDb29yZGluYXRlcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgICBnZXREaWFnb25hbE1vdmVzKFtyb3csIGNvbHVtbl0pLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7IGRpYWdvbmFsQXR0YWNrUXVldWUucHVzaChjb29yZGluYXRlcykgfSlcbiAgICAgICAgaSArPSAxO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICBhZGphY2VudE1vZGUgPSB0cnVlO1xuICAgICAgICBzdWNjZXNzZnVsQXR0YWNrID0gW3JvdywgY29sdW1uXTtcbiAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS52ZXJ0aWNhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLmhvcml6b250YWxDb29yZGluYXRlcy5mb3JFYWNoKChtb3ZlKSA9PiBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50LnB1c2gobW92ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhZGphY2VudEF0dGFjayh0YXJnZXQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByYW5kb21QbGFjZVNoaXBzID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgY29uc3Qgb3JpZW50YXRpb25zID0gWydob3Jpem9udGFsJywgJ3ZlcnRpY2FsJ107XG4gICAgbGV0IGkgPSAwO1xuXG4gICAgd2hpbGUgKHBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIDwgNSkge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xuICAgICAgY29uc3Qgc3VjY2Vzc2Z1bFBsYWNlbWVudCA9IHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aHNbaV0sIFtyb3csIGNvbHVtbl0sIG9yaWVudGF0aW9uKTtcbiAgICAgIGlmIChzdWNjZXNzZnVsUGxhY2VtZW50KSB7IGkgKz0gMSB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVuZmFpckF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIGNvbnN0IFtyb3csIGNvbHVtbl0gPSB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXTtcbiAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XG4gICAgYXR0YWNrQ29vcmRpbmF0ZXMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICBcbiAgICBpZiAoaiA9PT0gdGFyZ2V0LnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgaiA9IDA7XG4gICAgICBpICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGogKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcblxuICB9XG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgcGxheWVyR2FtZWJvYXJkLCByYW5kb21BdHRhY2ssIGFkamFjZW50QXR0YWNrLCBkaWFnb25hbEF0dGFjaywgdW5mYWlyQXR0YWNrLCByYW5kb21QbGFjZVNoaXBzIH07XG59XG5cbmV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyLCBDb21wdXRlciB9OyIsImNvbnN0IGhpZGVPcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1vcHRpb25zJyk7XG5cbiAgb3B0aW9ucy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IHNob3dPcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1vcHRpb25zJyk7XG5cbiAgb3B0aW9ucy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IGhpZGVHYW1lID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpO1xuXG4gIGdhbWUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBzaG93R2FtZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKTtcblxuICBnYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufTtcblxuY29uc3QgaGlkZURpZmZpY3VsdGllcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBkaWZmaWN1bHR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpZmZpY3VsdHknKTtcblxuICBkaWZmaWN1bHR5LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufTtcblxuY29uc3Qgc2hvd0RpZmZpY3VsdGllcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBkaWZmaWN1bHR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpZmZpY3VsdHknKTtcblxuICBkaWZmaWN1bHR5LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufVxuXG5jb25zdCBsb2FkUGFzc2luZ1NjcmVlbiA9IGZ1bmN0aW9uKG5leHRGdW5jdGlvbikge1xuICBjb25zdCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKTtcbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzaW5nLXNjcmVlbicpO1xuICBjb25zdCBuZXh0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cbiAgZ2FtZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgcGFzc2luZ1NjcmVlbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICBuZXh0QnV0dG9uLmlkID0gJ25leHQnO1xuICBuZXh0QnV0dG9uLnRleHRDb250ZW50ID0gJ05leHQgdHVybic7XG4gIHBhc3NpbmdTY3JlZW4uYXBwZW5kQ2hpbGQobmV4dEJ1dHRvbik7XG5cbiAgbmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBuZXh0RnVuY3Rpb24oKTtcbiAgICBzdG9wUGFzc2luZ1NjcmVlbigpO1xuICAgIHBhc3NpbmdTY3JlZW4ucmVtb3ZlQ2hpbGQobmV4dEJ1dHRvbik7XG4gIH0pO1xuXG59O1xuXG5jb25zdCBzdG9wUGFzc2luZ1NjcmVlbiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKTtcbiAgY29uc3QgcGFzc2luZ1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXNzaW5nLXNjcmVlbicpO1xuXG4gIGdhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIHBhc3NpbmdTY3JlZW4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59XG5cbmNvbnN0IHJlbmRlckdhbWVib2FyZCA9IGZ1bmN0aW9uKHBsYXllciwgaGlkZGVuKSB7XG4gIGZvciAobGV0IGk9MDsgaTxwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGo9MDsgajxwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBsYXllcj0nJHtwbGF5ZXIucGxheWVyTmFtZX0nXVtkYXRhLXJvdz0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXVswXX0nXVtkYXRhLWNvbHVtbj0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXVsxXX0nXWApO1xuICAgICAgaWYgKCFncmlkLmNsYXNzTGlzdC5jb250YWlucygnb2NjdXBpZWQnKSkge2dyaWQuY2xhc3NMaXN0LmFkZCgnb2NjdXBpZWQnKX07XG4gICAgICBpZiAoaGlkZGVuKSB7XG4gICAgICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgIH0gZWxzZSB7IGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJykgfVxuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddW2RhdGEtcm93PScke3BsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzW2ldWzBdfSddW2RhdGEtY29sdW1uPScke3BsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzW2ldWzFdfSddYCk7XG4gICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgfVxufTtcblxuY29uc3Qgc2hvd1BsYWNlU2hpcCA9IGZ1bmN0aW9uKHBsYXllciwgbGVuZ3RoKSB7XG4gIGNvbnN0IHBsYXllckdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddW2NsYXNzKj0nZ3JpZCddYCk7XG4gIGxldCBzaG93bkdyaWRzID0gW107XG5cbiAgY29uc3QgYWRkQ2xhc3MgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBncmlkcyA9IFtdO1xuICAgIGNvbnN0IFtyb3csIGNvbHVtbl0gPSBbTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpLCBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSldO1xuXG4gICAgQXJyYXkuZnJvbShwbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdob3Zlci1wbGFjZScsICdvdXRzaWRlLWdyaWQnKSk7XG4gICAgc2hvd25HcmlkcyA9IFtdO1xuXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGk9MDsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke3Jvd30nXVtkYXRhLWNvbHVtbj0nJHtjb2x1bW4gKyBpfSddW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddYCk7XG4gICAgICAgIGdyaWRzLnB1c2goZ3JpZCk7XG4gICAgICAgIGlmICghcGxheWVyLnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3csIGNvbHVtbiArIGldKSAmJiAhcGxheWVyLnBsYXllckdhbWVib2FyZC5pc091dHNpZGVHYW1lYm9hcmQoW3JvdywgY29sdW1uICsgaV0pKSB7XG4gICAgICAgICAgc2hvd25Hcmlkcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGk9MDsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PScke3JvdyArIGl9J11bZGF0YS1jb2x1bW49JyR7Y29sdW1ufSddW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddYCk7XG4gICAgICAgIGdyaWRzLnB1c2goZ3JpZCk7XG4gICAgICAgIGlmICghcGxheWVyLnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3cgKyBpLCBjb2x1bW5dKSAmJiAhcGxheWVyLnBsYXllckdhbWVib2FyZC5pc091dHNpZGVHYW1lYm9hcmQoW3JvdyArIGksIGNvbHVtbl0pKSB7XG4gICAgICAgICAgc2hvd25Hcmlkcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaT0wOyBpPGdyaWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZ3JpZHNbaV0gPT09IG51bGwpIHtcbiAgICAgICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgICAgIGlmIChncmlkICE9PSBudWxsKSB7Z3JpZC5jbGFzc0xpc3QuYWRkKCdvdXRzaWRlLWdyaWQnKX1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5jbGFzc0xpc3QuYWRkKCdob3Zlci1wbGFjZScpKTtcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoc2hvd25Hcmlkcy5sZW5ndGggPCBsZW5ndGgpIHsgcmV0dXJuIH1cbiAgICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGFkZENsYXNzKTtcbiAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXItcGxhY2UnLCAnb3V0c2lkZS1ncmlkJyk7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlRXZlbnQpO1xuICAgIH0pXG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBhZGRDbGFzcyk7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUV2ZW50KTtcbiAgfSlcbn07XG5cbmNvbnN0IHNob3dBdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgY29uc3QgdGFyZ2V0R3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9JyR7dGFyZ2V0LnBsYXllck5hbWV9J11bY2xhc3MqPSdncmlkJ11gKTtcblxuICBjb25zdCBhZGRDbGFzcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KVxuICAgIEFycmF5LmZyb20odGFyZ2V0R3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXItYXR0YWNrJykpO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdob3Zlci1hdHRhY2snKTtcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGl0JykpIHsgcmV0dXJuIH1cbiAgICBBcnJheS5mcm9tKHRhcmdldEdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGFkZENsYXNzKTtcbiAgICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXItYXR0YWNrJyk7XG4gICAgICBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVtb3ZlRXZlbnQpO1xuICAgIH0pXG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBBcnJheS5mcm9tKHRhcmdldEdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBhZGRDbGFzcyk7XG4gICAgZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlbW92ZUV2ZW50KTtcbiAgfSlcbn07XG5cbmNvbnN0IHByaW50ID0gYXN5bmMgZnVuY3Rpb24obWVzc2FnZSwgYWZ0ZXJEZWxheSkge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG4gIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xuICBjb25zdCBtZXNzYWdlQ2hhcmFjdGVycyA9IG1lc3NhZ2Uuc3BsaXQoJycpO1xuXG4gIEFycmF5LmZyb20oZ3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtncmlkLmNsYXNzTGlzdC5hZGQoJ3VuY2xpY2thYmxlJyl9KTtcbiAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnO1xuXG4gIGZvciAobGV0IGk9MDsgaTxtZXNzYWdlQ2hhcmFjdGVycy5sZW5ndGg7IGkrKykge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDMwMCkpO1xuICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgKz0gbWVzc2FnZUNoYXJhY3RlcnNbaV07XG4gIH1cbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgYWZ0ZXJEZWxheSkpO1xuICBBcnJheS5mcm9tKGdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7Z3JpZC5jbGFzc0xpc3QucmVtb3ZlKCd1bmNsaWNrYWJsZScpfSk7XG59O1xuXG5jb25zdCB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvcmllbnRhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmllbnRhdGlvbicpO1xuICBvcmllbnRhdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09ICdIb3Jpem9udGFsJykge1xuICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gJ1ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gJ0hvcml6b250YWwnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCByZXN0YXJ0R2FtZWJvYXJkcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG5cbiAgQXJyYXkuZnJvbShncmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnb2NjdXBpZWQnKTtcbiAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpO1xuICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH0pO1xuIH07XG5cbmV4cG9ydCB7IGhpZGVPcHRpb25zLCBzaG93T3B0aW9ucywgaGlkZUdhbWUsIHNob3dHYW1lLCBoaWRlRGlmZmljdWx0aWVzLCBzaG93RGlmZmljdWx0aWVzLCBsb2FkUGFzc2luZ1NjcmVlbiwgc3RvcFBhc3NpbmdTY3JlZW4sIHJlbmRlckdhbWVib2FyZCwgc2hvd1BsYWNlU2hpcCwgc2hvd0F0dGFjaywgcHJpbnQsIHRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uLCByZXN0YXJ0R2FtZWJvYXJkcyB9OyIsImltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgaGlkZU9wdGlvbnMsIHNob3dPcHRpb25zLCBoaWRlR2FtZSwgc2hvd0dhbWUsIHNob3dEaWZmaWN1bHRpZXMsIGhpZGVEaWZmaWN1bHRpZXMsIGxvYWRQYXNzaW5nU2NyZWVuLCByZW5kZXJHYW1lYm9hcmQsIHNob3dQbGFjZVNoaXAsIHNob3dBdHRhY2ssIHByaW50LCByZXN0YXJ0R2FtZWJvYXJkcyB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGFycmF5SW5jbHVkZXNBcnJheSB9IGZyb20gJy4vYXJyYXktc2VhcmNoJztcblxuY29uc3QgaG9tZVNjcmVlbiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBzaW5nbGVQbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2luZ2xlLXBsYXllcicpO1xuICBjb25zdCBtdWx0aXBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtdWx0aXBsYXllcicpO1xuICBjb25zdCBlYXN5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Vhc3knKTtcbiAgY29uc3QgbWVkaXVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lZGl1bScpO1xuICBjb25zdCBoYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hhcmQnKTtcbiAgY29uc3QgaW1wb3NzaWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbXBvc3NpYmxlJyk7XG5cbiAgc2luZ2xlUGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGhpZGVPcHRpb25zKCk7XG4gICAgc2hvd0RpZmZpY3VsdGllcygpO1xuICB9KTtcblxuICBtdWx0aXBsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBoaWRlT3B0aW9ucygpO1xuICAgIHNob3dHYW1lKCk7XG4gICAgbXVsdGlwbGF5ZXJHYW1lKCk7XG4gIH0pO1xuXG4gIGVhc3kuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICAgIGhpZGVEaWZmaWN1bHRpZXMoKTtcbiAgICBzaG93R2FtZSgpO1xuICAgIHNpbmdsZVBsYXllckdhbWUoY29tcHV0ZXIsIGNvbXB1dGVyLnJhbmRvbUF0dGFjayk7XG4gIH0pO1xuXG4gIG1lZGl1bS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG4gICAgaGlkZURpZmZpY3VsdGllcygpO1xuICAgIHNob3dHYW1lKCk7XG4gICAgc2luZ2xlUGxheWVyR2FtZShjb21wdXRlciwgY29tcHV0ZXIuYWRqYWNlbnRBdHRhY2spO1xuICB9KTtcblxuICBoYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyID0gQ29tcHV0ZXIoKTtcbiAgICBoaWRlRGlmZmljdWx0aWVzKCk7XG4gICAgc2hvd0dhbWUoKTtcbiAgICBzaW5nbGVQbGF5ZXJHYW1lKGNvbXB1dGVyLCBjb21wdXRlci5kaWFnb25hbEF0dGFjayk7XG4gIH0pO1xuXG4gIGltcG9zc2libGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICAgIGhpZGVEaWZmaWN1bHRpZXMoKTtcbiAgICBzaG93R2FtZSgpO1xuICAgIHNpbmdsZVBsYXllckdhbWUoY29tcHV0ZXIsIGNvbXB1dGVyLnVuZmFpckF0dGFjayk7XG4gIH0pXG59O1xuXG5jb25zdCBzaW5nbGVQbGF5ZXJHYW1lID0gYXN5bmMgZnVuY3Rpb24oY29tcHV0ZXIsIGF0dGFja0Z1bmN0aW9uKSB7XG4gIGNvbnN0IHBsYXllciA9IFBsYXllcignUGxheWVyIDEnKTtcbiAgY29uc3QgcGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbGF5ZXI9XCJQbGF5ZXIgMVwiXScpO1xuICBjb25zdCBjb21wdXRlckdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWVyPVwiUGxheWVyIDJcIl0nKTtcbiAgY29uc3QgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNob21lJyk7XG4gIGNvbnN0IHNoaXBzID0gW3tsZW5ndGg6IDUsIG5hbWU6ICdDYXJyaWVyJ30sIHtsZW5ndGg6IDQsIG5hbWU6ICdCYXR0bGVzaGlwJ30sIHtsZW5ndGg6IDMsIG5hbWU6ICdEZXN0cm95ZXInfSwge2xlbmd0aDogMywgbmFtZTogJ1N1Ym1hcmluZSd9LCB7bGVuZ3RoOiAyLCBuYW1lOiAnUGF0cm9sIEJvYXQnfV07XG4gIGxldCBpID0gMDtcblxuICBjb25zdCBjaGVja0VuZCA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGlmIChwbGF5ZXIucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICBhd2FpdCBwcmludCgnQ29tcHV0ZXIgd2lucy4nLCAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICBhd2FpdCBwcmludCgnUGxheWVyIHdpbnMuJywgMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBzdWNjZXNzZnVsUGxhY2VtZW50ID0gcGxheWVyLnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcHNbaV0ubGVuZ3RoLCBbcm93LCBjb2x1bW5dLCBvcmllbnRhdGlvbik7XG4gICAgaWYgKCFzdWNjZXNzZnVsUGxhY2VtZW50KSByZXR1cm47XG4gICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllciwgZmFsc2UpO1xuICAgIGkgKz0gMTtcblxuICAgIGlmIChpPDUpIHtcbiAgICAgIGF3YWl0IHByaW50KGBQbGFjZSB5b3VyICR7c2hpcHNbaV0ubmFtZX0uYCwgMCk7XG4gICAgICBzaG93UGxhY2VTaGlwKHBsYXllciwgc2hpcHNbaV0ubGVuZ3RoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgYXdhaXQgcHJpbnQoJ0NvbXB1dGVyIHBsYWNpbmcgc2hpcHMuLi4nLCA2MDApO1xuICAgIGNvbXB1dGVyLnJhbmRvbVBsYWNlU2hpcHMoKTtcbiAgICByZW5kZXJHYW1lYm9hcmQoY29tcHV0ZXIsIHRydWUpO1xuICAgIGF3YWl0IHByaW50KCdZb3VyIHR1cm4gdG8gYXR0YWNrLicsIDApO1xuICAgIHNob3dBdHRhY2soY29tcHV0ZXIpO1xuXG4gICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSBhc3luYyBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG5cbiAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3MsIFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICBhd2FpdCBwcmludCgnWW91IGFscmVhZHkgYXR0YWNrZWQgdGhpcyBzcG90LiBZb3VyIHR1cm4gdG8gYXR0YWNrLicsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLCBbcm93LCBjb2x1bW5dKTtcbiAgICByZW5kZXJHYW1lYm9hcmQoY29tcHV0ZXIsIHRydWUpO1xuICAgIGNoZWNrUGxheWVySGl0OiBcbiAgICAgIGZvciAobGV0IGk9MDsgaTxjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgW3JvdywgY29sdW1uXSkpIHtcbiAgICAgICAgICBpZiAoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmludCgnWW91IHN1bmsgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ1lvdSBoaXQgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgYnJlYWsgY2hlY2tQbGF5ZXJIaXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGF3YWl0IHByaW50KCdZb3UgbWlzc2VkLicsIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBcbiAgICBpZiAoYXdhaXQgY2hlY2tFbmQoKSkge1xuICAgICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHJlc3RhcnRHYW1lYm9hcmRzKCk7XG4gICAgICAgIGhpZGVHYW1lKCk7XG4gICAgICAgIHNob3dPcHRpb25zKCk7XG4gICAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgIGF3YWl0IHByaW50KCdFbmVteSBpcyBhdHRhY2tpbmcuLi4nLCAzMDApO1xuICAgIGNvbnN0IFtjb21wdXRlclJvdywgY29tcHV0ZXJDb2x1bW5dID0gYXR0YWNrRnVuY3Rpb24ocGxheWVyKTtcbiAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyLCBmYWxzZSk7XG4gICAgY2hlY2tDb21wdXRlckhpdDogXG4gICAgICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgW2NvbXB1dGVyUm93LCBjb21wdXRlckNvbHVtbl0pKSB7XG4gICAgICAgICAgaWYgKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaW50KCdFbmVteSBzdW5rIGEgc2hpcCEnLCA0MDApO1xuICAgICAgICAgICAgYnJlYWsgY2hlY2tDb21wdXRlckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ0VuZW15IGhpdCBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICBicmVhayBjaGVja0NvbXB1dGVySGl0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ0VuZW15IG1pc3NlZC4nLCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBpZiAoYXdhaXQgY2hlY2tFbmQoKSkge1xuICAgICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gICAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXN0YXJ0R2FtZWJvYXJkcygpO1xuICAgICAgICBoaWRlR2FtZSgpO1xuICAgICAgICBzaG93T3B0aW9ucygpO1xuICAgICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBwcmludCgnWW91ciB0dXJuIHRvIGF0dGFjay4nLCAwKVxuICAgIHNob3dBdHRhY2soY29tcHV0ZXIpO1xuICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgYXdhaXQgcHJpbnQoJ1BsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgc2hvd1BsYWNlU2hpcChwbGF5ZXIsIDUpO1xuICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG59O1xuXG5jb25zdCBtdWx0aXBsYXllckdhbWUgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgY29uc3QgcGxheWVyT25lID0gUGxheWVyKCdQbGF5ZXIgMScpO1xuICBjb25zdCBwbGF5ZXJUd28gPSBQbGF5ZXIoJ1BsYXllciAyJyk7XG4gIGNvbnN0IHBsYXllck9uZUdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGxheWVyPSdQbGF5ZXIgMSddYCk7XG4gIGNvbnN0IHBsYXllclR3b0dyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtcGxheWVyPSdQbGF5ZXIgMiddYCk7XG4gIGNvbnN0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9tZScpO1xuICBjb25zdCBzaGlwcyA9IFt7bGVuZ3RoOiA1LCBuYW1lOiAnQ2Fycmllcid9LCB7bGVuZ3RoOiA0LCBuYW1lOiAnQmF0dGxlc2hpcCd9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnRGVzdHJveWVyJ30sIHtsZW5ndGg6IDMsIG5hbWU6ICdTdWJtYXJpbmUnfSwge2xlbmd0aDogMiwgbmFtZTogJ1BhdHJvbCBCb2F0J31dO1xuICBsZXQgaSA9IDA7XG4gIGxldCBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuICBsZXQgdGFyZ2V0UGxheWVyO1xuXG4gIGNvbnN0IGNoZWNrRW5kID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBsYXllck9uZS5wbGF5ZXJHYW1lYm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgIGF3YWl0IHByaW50KCdQbGF5ZXIgMiB3aW5zLicsIDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChwbGF5ZXJUd28ucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICBhd2FpdCBwcmludCgnUGxheWVyIDEgd2lucy4nLCAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBhc3luYyBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWxQbGFjZW1lbnQgPSBjdXJyZW50UGxheWVyLnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcHNbaV0ubGVuZ3RoLCBbcm93LCBjb2x1bW5dLCBvcmllbnRhdGlvbik7XG4gICAgaWYgKCFzdWNjZXNzZnVsUGxhY2VtZW50KSByZXR1cm47XG4gICAgcmVuZGVyR2FtZWJvYXJkKGN1cnJlbnRQbGF5ZXIsIGZhbHNlKTtcbiAgICBpICs9IDE7XG5cbiAgICBpZiAoaTw1KSB7XG4gICAgICBzaG93UGxhY2VTaGlwKGN1cnJlbnRQbGF5ZXIsIHNoaXBzW2ldLmxlbmd0aCk7XG4gICAgICBhd2FpdCBwcmludChgUGxhY2UgeW91ciAke3NoaXBzW2ldLm5hbWV9LmAsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGkgPSAwO1xuXG4gICAgaWYgKGN1cnJlbnRQbGF5ZXIucGxheWVyTmFtZSA9PT0gJ1BsYXllciAxJykge1xuICAgICAgQXJyYXkuZnJvbShwbGF5ZXJPbmVHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNzAwKSk7XG4gICAgICBBcnJheS5mcm9tKHBsYXllck9uZUdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICBsb2FkUGFzc2luZ1NjcmVlbihhc3luYyAoKSA9PiB7XG4gICAgICAgIEFycmF5LmZyb20ocGxheWVyT25lR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgICAgQXJyYXkuZnJvbShwbGF5ZXJUd29HcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyT25lLCB0cnVlKTtcbiAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR3b1xuICAgICAgICBhd2FpdCBwcmludCgnUGxheWVyIDIsIHBsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgICAgICAgc2hvd1BsYWNlU2hpcChwbGF5ZXJUd28sIDUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDcwMCkpO1xuICAgICAgQXJyYXkuZnJvbShwbGF5ZXJUd29HcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgbG9hZFBhc3NpbmdTY3JlZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKHBsYXllclR3b0dyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllclR3bywgdHJ1ZSk7XG4gICAgICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXJPbmUsIGZhbHNlKTtcbiAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgICAgICAgdGFyZ2V0UGxheWVyID0gcGxheWVyVHdvO1xuICAgICAgICBhd2FpdCBwcmludChcIlBsYXllciAxJ3MgdHVybiB0byBhdHRhY2suXCIpO1xuICAgICAgICBzaG93QXR0YWNrKHRhcmdldFBsYXllcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9J11gKTtcbiAgICBjb25zdCB0YXJnZXRQbGF5ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nJHt0YXJnZXRQbGF5ZXIucGxheWVyTmFtZX0nXWApO1xuICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkodGFyZ2V0UGxheWVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3MsIFtyb3csIGNvbHVtbl0pKSB7IFxuICAgICAgYXdhaXQgcHJpbnQoYFlvdSBhbHJlYWR5IGF0dGFja2VkIHRoaXMgc3BvdC4gJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9J3MgdHVybiB0byBhdHRhY2suYCwgMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGN1cnJlbnRQbGF5ZXIuYXR0YWNrKHRhcmdldFBsYXllciwgW3JvdywgY29sdW1uXSk7XG4gICAgcmVuZGVyR2FtZWJvYXJkKHRhcmdldFBsYXllciwgdHJ1ZSk7XG4gICAgY2hlY2tQbGF5ZXJIaXQ6IFxuICAgICAgZm9yIChsZXQgaT0wOyBpPHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkodGFyZ2V0UGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMsIFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICAgICAgaWYgKHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaW50KGAke2N1cnJlbnRQbGF5ZXIucGxheWVyTmFtZX0gc3VuayBhIHNoaXAhYCwgNDAwKTtcbiAgICAgICAgICAgIGJyZWFrIGNoZWNrUGxheWVySGl0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9IGhpdCBhIHNoaXAhYCwgNDAwKTtcbiAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gdGFyZ2V0UGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGF3YWl0IHByaW50KGAke2N1cnJlbnRQbGF5ZXIucGxheWVyTmFtZX0gbWlzc2VkLmAsIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBcbiAgICBpZiAoYXdhaXQgY2hlY2tFbmQoKSkge1xuICAgICAgQXJyYXkuZnJvbSh0YXJnZXRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICByZXN0YXJ0R2FtZWJvYXJkcygpO1xuICAgICAgICAgIGhpZGVHYW1lKCk7XG4gICAgICAgICAgc2hvd09wdGlvbnMoKTtcbiAgICAgICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBBcnJheS5mcm9tKHRhcmdldFBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNzAwKSk7XG4gICAgQXJyYXkuZnJvbSh0YXJnZXRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgIGxvYWRQYXNzaW5nU2NyZWVuKGFzeW5jICgpID0+IHtcbiAgICAgIEFycmF5LmZyb20odGFyZ2V0UGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgIEFycmF5LmZyb20oY3VycmVudFBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICByZW5kZXJHYW1lYm9hcmQodGFyZ2V0UGxheWVyLCBmYWxzZSk7XG4gICAgICByZW5kZXJHYW1lYm9hcmQoY3VycmVudFBsYXllciwgdHJ1ZSk7XG4gICAgICBjb25zdCBbYSwgYl0gPSBbdGFyZ2V0UGxheWVyLCBjdXJyZW50UGxheWVyXTtcbiAgICAgIHRhcmdldFBsYXllciA9IGI7XG4gICAgICBjdXJyZW50UGxheWVyID0gYTtcbiAgXG4gICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9J3MgdHVybiB0byBhdHRhY2suYCk7XG4gICAgICBzaG93QXR0YWNrKHRhcmdldFBsYXllcik7XG4gICAgfSk7XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBhd2FpdCBwcmludCgnUGxheWVyIDEsIHBsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgc2hvd1BsYWNlU2hpcChwbGF5ZXJPbmUsIDUpO1xuICBBcnJheS5mcm9tKHBsYXllck9uZUdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVTY3JlZW47IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgaG9tZVNjcmVlbiBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgdG9nZ2xlT3JpZW50YXRpb25CdXR0b24gfSBmcm9tICcuL2RvbSc7XG5cbmhvbWVTY3JlZW4oKTtcbnRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uKCk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGJvZHkge1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA4cHg7XG59XG5cbiNvcmllbnRhdGlvbi1jb250YWluZXIsICNtZXNzYWdlLCAjaG9tZSB7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbn1cblxuI2dhbWVib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDE2cHg7XG59XG5cbi5nYW1lYm9hcmQge1xuICB3aWR0aDogOTAlO1xuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XG59XG5cbi5ncmlkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5ob3Zlci1wbGFjZSwgLmhvdmVyLWF0dGFjaywgLm9jY3VwaWVkLmhpZGRlbi5ob3Zlci1hdHRhY2sge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTY5LCAxNjgsIDE2OCk7XG59XG5cbi5vY2N1cGllZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig4NywgODUsIDg1KTtcbn1cblxuLmhvdmVyLXBsYWNlLm9jY3VwaWVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI4LCAyOCwgMjgpO1xufVxuXG4ub3V0c2lkZS1ncmlkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uaGl0LCAuaG92ZXItYXR0YWNrLmhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG59XG5cbi5vY2N1cGllZC5oaWRkZW4ge1xuICBkaXNwbGF5OmJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xufVxuXG4ub2NjdXBpZWQuaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnVuY2xpY2thYmxlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtFQUN0QixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFFBQVE7QUFDVjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixnREFBZ0Q7QUFDbEQ7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDhweDtcXG59XFxuXFxuI29yaWVudGF0aW9uLWNvbnRhaW5lciwgI21lc3NhZ2UsICNob21lIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuI2dhbWVib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTZweDtcXG59XFxuXFxuLmdhbWVib2FyZCB7XFxuICB3aWR0aDogOTAlO1xcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5ncmlkIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uaG92ZXItcGxhY2UsIC5ob3Zlci1hdHRhY2ssIC5vY2N1cGllZC5oaWRkZW4uaG92ZXItYXR0YWNrIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNjksIDE2OCwgMTY4KTtcXG59XFxuXFxuLm9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig4NywgODUsIDg1KTtcXG59XFxuXFxuLmhvdmVyLXBsYWNlLm9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyOCwgMjgsIDI4KTtcXG59XFxuXFxuLm91dHNpZGUtZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5oaXQsIC5ob3Zlci1hdHRhY2suaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5vY2N1cGllZC5oaWRkZW4ge1xcbiAgZGlzcGxheTpibG9jaztcXG4gIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XFxufVxcblxcbi5vY2N1cGllZC5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi51bmNsaWNrYWJsZSB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJhcnJheUluY2x1ZGVzQXJyYXkiLCJwYXJlbnRBcnJheSIsImNoaWxkQXJyYXkiLCJnZXRJbmRleCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImN1cnJlbnRJbmRleCIsInNsaWNlIiwiaSIsIlNoaXAiLCJoaXRDb3VudCIsInN1bmsiLCJoaXQiLCJpc1N1bmsiLCJHYW1lYm9hcmQiLCJzaGlwQ29vcmRpbmF0ZXMiLCJyZWNlaXZlZEF0dGFja3MiLCJpc09jY3VwaWVkIiwiY29vcmRpbmF0ZXMiLCJzaGlwIiwiaXNPdXRzaWRlR2FtZWJvYXJkIiwicGxhY2VTaGlwIiwic3RhcnRDb29yZCIsIm9yaWVudGF0aW9uIiwibmV3U2hpcCIsImNsYXNoaW5nU2hpcHMiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImlzQWxsU3VuayIsIlBsYXllciIsIm5hbWUiLCJwbGF5ZXJOYW1lIiwicGxheWVyR2FtZWJvYXJkIiwiYXR0YWNrIiwidGFyZ2V0IiwiQ29tcHV0ZXIiLCJhdHRhY2tDb29yZGluYXRlcyIsInN1Y2Nlc3NmdWxBdHRhY2siLCJzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudCIsInN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQiLCJhZGphY2VudE1vZGUiLCJkaWFnb25hbEF0dGFja1F1ZXVlIiwiaiIsInJhbmRvbUF0dGFjayIsInJvdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbHVtbiIsImdldEFkamFjZW50TW92ZXMiLCJ2ZXJ0aWNhbE1vdmVzIiwiaG9yaXpvbnRhbE1vdmVzIiwidmVydGljYWxDb29yZGluYXRlcyIsImhvcml6b250YWxDb29yZGluYXRlcyIsImFkamFjZW50Q29vcmRpbmF0ZSIsImFkamFjZW50QXR0YWNrIiwiZm9yRWFjaCIsIm1vdmUiLCJzaGlmdCIsImluZGV4Iiwic3BsaWNlIiwiZ2V0RGlhZ29uYWxNb3ZlcyIsInBvc3NpYmxlTW92ZXMiLCJkaWFnb25hbENvb3JkaW5hdGVzIiwiZGlhZ29uYWxDb29yZGluYXRlIiwiZGlhZ29uYWxBdHRhY2siLCJyYW5kb21QbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJvcmllbnRhdGlvbnMiLCJzdWNjZXNzZnVsUGxhY2VtZW50IiwidW5mYWlyQXR0YWNrIiwiaGlkZU9wdGlvbnMiLCJvcHRpb25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiYWRkIiwic2hvd09wdGlvbnMiLCJyZW1vdmUiLCJoaWRlR2FtZSIsImdhbWUiLCJzaG93R2FtZSIsImhpZGVEaWZmaWN1bHRpZXMiLCJkaWZmaWN1bHR5Iiwic2hvd0RpZmZpY3VsdGllcyIsImxvYWRQYXNzaW5nU2NyZWVuIiwibmV4dEZ1bmN0aW9uIiwicGFzc2luZ1NjcmVlbiIsIm5leHRCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0b3BQYXNzaW5nU2NyZWVuIiwicmVtb3ZlQ2hpbGQiLCJyZW5kZXJHYW1lYm9hcmQiLCJwbGF5ZXIiLCJoaWRkZW4iLCJncmlkIiwiY29udGFpbnMiLCJzaG93UGxhY2VTaGlwIiwicGxheWVyR3JpZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2hvd25HcmlkcyIsImFkZENsYXNzIiwiZXZlbnQiLCJ0b0xvd2VyQ2FzZSIsImdyaWRzIiwiTnVtYmVyIiwiZ2V0QXR0cmlidXRlIiwiQXJyYXkiLCJmcm9tIiwic3RvcFByb3BhZ2F0aW9uIiwicmVtb3ZlRXZlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2hvd0F0dGFjayIsInRhcmdldEdyaWRzIiwiY29uc29sZSIsImxvZyIsInByaW50IiwibWVzc2FnZSIsImFmdGVyRGVsYXkiLCJtZXNzYWdlQ29udGFpbmVyIiwibWVzc2FnZUNoYXJhY3RlcnMiLCJzcGxpdCIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsInRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uIiwib3JpZW50YXRpb25CdXR0b24iLCJyZXN0YXJ0R2FtZWJvYXJkcyIsImhvbWVTY3JlZW4iLCJzaW5nbGVQbGF5ZXIiLCJtdWx0aXBsYXllciIsImVhc3kiLCJtZWRpdW0iLCJoYXJkIiwiaW1wb3NzaWJsZSIsIm11bHRpcGxheWVyR2FtZSIsImNvbXB1dGVyIiwic2luZ2xlUGxheWVyR2FtZSIsImF0dGFja0Z1bmN0aW9uIiwiY29tcHV0ZXJHcmlkcyIsImhvbWVCdXR0b24iLCJzaGlwcyIsImNoZWNrRW5kIiwiY2hlY2tQbGF5ZXJIaXQiLCJjb21wdXRlclJvdyIsImNvbXB1dGVyQ29sdW1uIiwiY2hlY2tDb21wdXRlckhpdCIsInBsYXllck9uZSIsInBsYXllclR3byIsInBsYXllck9uZUdyaWRzIiwicGxheWVyVHdvR3JpZHMiLCJjdXJyZW50UGxheWVyIiwidGFyZ2V0UGxheWVyIiwiY3VycmVudFBsYXllckdyaWRzIiwidGFyZ2V0UGxheWVyR3JpZHMiLCJhIiwiYiJdLCJzb3VyY2VSb290IjoiIn0=