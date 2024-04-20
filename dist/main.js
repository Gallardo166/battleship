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
  return {
    playerName,
    playerGameboard,
    randomAttack,
    adjacentAttack,
    diagonalAttack,
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
/* harmony export */   showDifficulties: () => (/* binding */ showDifficulties),
/* harmony export */   showGame: () => (/* binding */ showGame),
/* harmony export */   showOptions: () => (/* binding */ showOptions),
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
const print = async function (message, afterDelay) {
  const grids = document.querySelectorAll('.grid');
  const messageContainer = document.querySelector('#message');
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
      return;
    }
    Array.from(playerGrids).forEach(grid => grid.removeEventListener('click', placeShip));
    await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Computer placing ships...', 600);
    computer.randomPlaceShips();
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(computer, true);
    await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Your turn to attack.', 0);
    Array.from(computerGrids).forEach(grid => grid.addEventListener('click', attack));
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
    Array.from(computerGrids).forEach(grid => grid.addEventListener('click', attack));
    event.stopPropagation();
  };
  await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Place your Carrier.');
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
    });
    event.stopPropagation();
  };
  await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Player 1, place your Carrier.');
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

#player-1 {
  width: 90%;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
}

#player-2 {
  width: 90%;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
}

.grid {
  border: 1px solid black;
}

.occupied {
  background-color: black;
}

.hit {
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,aAAa;EACb,gDAAgD;AAClD;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,aAAa;EACb,gDAAgD;AAClD;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,oBAAoB;AACtB","sourcesContent":["body {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n#orientation-container, #message, #home {\n  align-self: center;\n}\n\n#gameboard-container {\n  display: flex;\n  gap: 16px;\n}\n\n#player-1 {\n  width: 90%;\n  aspect-ratio: 1 / 1;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n}\n\n#player-2 {\n  width: 90%;\n  aspect-ratio: 1 / 1;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n}\n\n.grid {\n  border: 1px solid black;\n}\n\n.occupied {\n  background-color: black;\n}\n\n.hit {\n  background-color: blue;\n}\n\n.occupied.hidden {\n  display:block;\n  background-color:white;\n}\n\n.occupied.hit {\n  background-color: red;\n}\n\n.hidden {\n  display: none;\n}\n\n.unclickable {\n  pointer-events: none;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcnJheS1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXJyYXlJbmNsdWRlc0FycmF5ID0gZnVuY3Rpb24ocGFyZW50QXJyYXksIGNoaWxkQXJyYXksIGdldEluZGV4ID0gZmFsc2UsIGN1cnJlbnRJbmRleCA9IDApIHtcbiAgaWYgKHBhcmVudEFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAocGFyZW50QXJyYXlbMF0ubGVuZ3RoICE9PSBjaGlsZEFycmF5Lmxlbmd0aCkge1xuICAgIHBhcmVudEFycmF5ID0gcGFyZW50QXJyYXkuc2xpY2UoMSk7XG4gICAgcmV0dXJuIGFycmF5SW5jbHVkZXNBcnJheShwYXJlbnRBcnJheSwgY2hpbGRBcnJheSwgZ2V0SW5kZXgsIGN1cnJlbnRJbmRleCArIDEpO1xuICB9XG4gIGZvciAobGV0IGk9MDsgaTxjaGlsZEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNoaWxkQXJyYXlbaV0gIT09IHBhcmVudEFycmF5WzBdW2ldKSB7IFxuICAgICAgcGFyZW50QXJyYXkgPSBwYXJlbnRBcnJheS5zbGljZSgxKTtcbiAgICAgIHJldHVybiBhcnJheUluY2x1ZGVzQXJyYXkocGFyZW50QXJyYXksIGNoaWxkQXJyYXksIGdldEluZGV4LCBjdXJyZW50SW5kZXggKyAxKVxuICAgIH1cbiAgfVxuICBpZiAoZ2V0SW5kZXgpIHsgcmV0dXJuIGN1cnJlbnRJbmRleCB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IHsgYXJyYXlJbmNsdWRlc0FycmF5IH07IiwiaW1wb3J0IHsgYXJyYXlJbmNsdWRlc0FycmF5IH0gZnJvbSBcIi4vYXJyYXktc2VhcmNoXCI7XG5cbmNvbnN0IFNoaXAgPSBmdW5jdGlvbihsZW5ndGgpIHtcbiAgbGV0IGhpdENvdW50ID0gMDtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSBmdW5jdGlvbigpIHtcbiAgICBoaXRDb3VudCArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChsZW5ndGggPT09IGhpdENvdW50KSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bms7XG4gIH07XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmsgfTtcbn1cblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24oKSB7XG4gIGxldCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IHJlY2VpdmVkQXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IGlzT2NjdXBpZWQgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGZvciAobGV0IGk9MDsgaTxzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLCBjb29yZGluYXRlcykpIHtcbiAgICAgICAgcmV0dXJuIHNoaXBDb29yZGluYXRlc1tpXS5zaGlwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgaXNPdXRzaWRlR2FtZWJvYXJkID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAoY29vcmRpbmF0ZXNbMF0gPCAwIHx8IGNvb3JkaW5hdGVzWzBdID4gOSB8fCBjb29yZGluYXRlc1sxXSA8IDAgfHwgY29vcmRpbmF0ZXNbMV0gPiA5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uKGxlbmd0aCwgc3RhcnRDb29yZCwgb3JpZW50YXRpb24pIHtcbiAgICBjb25zdCBuZXdTaGlwID0gU2hpcChsZW5ndGgpO1xuICAgIGxldCBjb29yZGluYXRlcyA9IFtzdGFydENvb3JkXTtcbiAgICBsZXQgY2xhc2hpbmdTaGlwcyA9IGZhbHNlO1xuICBcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgZm9yIChsZXQgaT0wOyAoaTxsZW5ndGggJiYgY2xhc2hpbmdTaGlwcyA9PT0gZmFsc2UpOyBpKyspIHtcbiAgICAgICAgaWYgKGlzT2NjdXBpZWQoW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGlzT3V0c2lkZUdhbWVib2FyZChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaT0xOyBpPGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGk9MDsgKGk8bGVuZ3RoICYmIGNsYXNoaW5nU2hpcHMgPT09IGZhbHNlKTsgaSsrKSB7XG4gICAgICAgIGlmIChpc09jY3VwaWVkKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChpc091dHNpZGVHYW1lYm9hcmQoW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGk9MTsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHsgc2hpcDogbmV3U2hpcCwgY29vcmRpbmF0ZXMgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3Qgc2hpcCA9IGlzT2NjdXBpZWQoY29vcmRpbmF0ZXMpO1xuICAgIGlmIChzaGlwICE9PSBmYWxzZSkge1xuICAgICAgc2hpcC5oaXQoKTtcbiAgICB9XG4gICAgcmVjZWl2ZWRBdHRhY2tzLnB1c2goY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIGNvbnN0IGlzQWxsU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpPHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geyBzaGlwQ29vcmRpbmF0ZXMsIHJlY2VpdmVkQXR0YWNrcywgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBpc0FsbFN1bmssIGlzT2NjdXBpZWQsIGlzT3V0c2lkZUdhbWVib2FyZCB9O1xufTtcblxuY29uc3QgUGxheWVyID0gZnVuY3Rpb24obmFtZSkge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG5cbiAgY29uc3QgYXR0YWNrID0gZnVuY3Rpb24odGFyZ2V0LCBjb29yZGluYXRlcykge1xuICAgIHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcyk7XG4gIH07XG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgcGxheWVyR2FtZWJvYXJkLCBhdHRhY2sgfTtcbn07XG5cbmNvbnN0IENvbXB1dGVyID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSAnUGxheWVyIDInO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgY29uc3QgYXR0YWNrQ29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IHN1Y2Nlc3NmdWxBdHRhY2s7XG4gIGxldCBzdWNjZXNzZnVsQXR0YWNrVmVydGljYWxBZGphY2VudCA9IFtdO1xuICBsZXQgc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudCA9IFtdO1xuICBsZXQgYWRqYWNlbnRNb2RlID0gZmFsc2U7XG4gIGxldCBvcmllbnRhdGlvbjtcbiAgbGV0IGRpYWdvbmFsQXR0YWNrUXVldWUgPSBbXTtcbiAgbGV0IGkgPSAwO1xuXG4gIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoYXR0YWNrQ29vcmRpbmF0ZXMsIFtyb3csIGNvbHVtbl0pKSB7IGNvbnRpbnVlIH1cbiAgICAgIHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcbiAgICAgIGF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0QWRqYWNlbnRNb3ZlcyA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgdmVydGljYWxNb3ZlcyA9IFtbMSwgMF0sIFstMSwgMF1dO1xuICAgIGNvbnN0IGhvcml6b250YWxNb3ZlcyA9IFtbMCwgMV0sIFswLCAtMV1dO1xuICAgIGxldCB2ZXJ0aWNhbENvb3JkaW5hdGVzID0gW107XG4gICAgbGV0IGhvcml6b250YWxDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpPHZlcnRpY2FsTW92ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFkamFjZW50Q29vcmRpbmF0ZSA9IFtjb29yZGluYXRlc1swXSArIHZlcnRpY2FsTW92ZXNbaV1bMF0sIGNvb3JkaW5hdGVzWzFdICsgdmVydGljYWxNb3Zlc1tpXVsxXV07XG4gICAgICBpZiAoIXBsYXllckdhbWVib2FyZC5pc091dHNpZGVHYW1lYm9hcmQoYWRqYWNlbnRDb29yZGluYXRlKSAmJiAhYXJyYXlJbmNsdWRlc0FycmF5KGF0dGFja0Nvb3JkaW5hdGVzLCBhZGphY2VudENvb3JkaW5hdGUpKSB7XG4gICAgICAgIHZlcnRpY2FsQ29vcmRpbmF0ZXMucHVzaChbYWRqYWNlbnRDb29yZGluYXRlLCAndmVydGljYWwnXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaT0wOyBpPGhvcml6b250YWxNb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYWRqYWNlbnRDb29yZGluYXRlID0gW2Nvb3JkaW5hdGVzWzBdICsgaG9yaXpvbnRhbE1vdmVzW2ldWzBdLCBjb29yZGluYXRlc1sxXSArIGhvcml6b250YWxNb3Zlc1tpXVsxXV07XG4gICAgICBpZiAoIXBsYXllckdhbWVib2FyZC5pc091dHNpZGVHYW1lYm9hcmQoYWRqYWNlbnRDb29yZGluYXRlKSAmJiAhYXJyYXlJbmNsdWRlc0FycmF5KGF0dGFja0Nvb3JkaW5hdGVzLCBhZGphY2VudENvb3JkaW5hdGUpKSB7XG4gICAgICAgIGhvcml6b250YWxDb29yZGluYXRlcy5wdXNoKFthZGphY2VudENvb3JkaW5hdGUsICdob3Jpem9udGFsJ10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IHZlcnRpY2FsQ29vcmRpbmF0ZXMsIGhvcml6b250YWxDb29yZGluYXRlcyB9O1xuICB9O1xuXG4gIGNvbnN0IGFkamFjZW50QXR0YWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG5cbiAgICBpZiAoIWFkamFjZW50TW9kZSkge1xuICAgICAgY29uc3QgW3JvdywgY29sdW1uXSA9IHJhbmRvbUF0dGFjayh0YXJnZXQpO1xuXG4gICAgICBpZiAodGFyZ2V0LnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICAgIGFkamFjZW50TW9kZSA9IHRydWU7XG4gICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2sgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLnZlcnRpY2FsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICAgIGdldEFkamFjZW50TW92ZXMoc3VjY2Vzc2Z1bEF0dGFjaykuaG9yaXpvbnRhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJvdywgY29sdW1uO1xuICAgICAgbGV0IG9yaWVudGF0aW9uO1xuICAgICAgaWYgKHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50Lmxlbmd0aCA9PT0gMCB8fCBvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIFtyb3csIGNvbHVtbl0gPSBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50LnNoaWZ0KClbMF07XG4gICAgICAgIG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgW3JvdywgY29sdW1uXSA9IHN1Y2Nlc3NmdWxBdHRhY2tWZXJ0aWNhbEFkamFjZW50LnNoaWZ0KClbMF07XG4gICAgICAgIG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5kZXggPSBhcnJheUluY2x1ZGVzQXJyYXkoZGlhZ29uYWxBdHRhY2tRdWV1ZSwgW3JvdywgY29sdW1uXSwgdHJ1ZSk7XG5cbiAgICAgIHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcbiAgICAgIGF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBpZiAoaW5kZXggIT09IGZhbHNlKSB7XG4gICAgICAgIGRpYWdvbmFsQXR0YWNrUXVldWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQuaXNPY2N1cGllZChbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICBpZiAodGFyZ2V0LnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3csIGNvbHVtbl0pLmlzU3VuaygpKSB7XG4gICAgICAgICAgc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQgPSBbXTtcbiAgICAgICAgICBzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50ID0gW107XG4gICAgICAgICAgYWRqYWNlbnRNb2RlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2sgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICAgICAgZ2V0QWRqYWNlbnRNb3ZlcyhzdWNjZXNzZnVsQXR0YWNrKS5ob3Jpem9udGFsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja0hvcml6b250YWxBZGphY2VudC5wdXNoKG1vdmUpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VjY2Vzc2Z1bEF0dGFjayA9IFtyb3csIGNvbHVtbl07XG4gICAgICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLnZlcnRpY2FsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0RGlhZ29uYWxNb3ZlcyA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3QgcG9zc2libGVNb3ZlcyA9IFtbMSwgMV0sIFstMSwgMV0sIFsxLCAtMV0sIFstMSwgLTFdXTtcbiAgICBsZXQgZGlhZ29uYWxDb29yZGluYXRlcyA9IFtdO1xuXG4gICAgcG9zc2libGVNb3Zlcy5mb3JFYWNoKChtb3ZlKSA9PiB7XG4gICAgICBjb25zdCBkaWFnb25hbENvb3JkaW5hdGUgPSBbY29vcmRpbmF0ZXNbMF0gKyBtb3ZlWzBdLCBjb29yZGluYXRlc1sxXSArIG1vdmVbMV1dO1xuICAgICAgaWYgKCFwbGF5ZXJHYW1lYm9hcmQuaXNPdXRzaWRlR2FtZWJvYXJkKGRpYWdvbmFsQ29vcmRpbmF0ZSkgJiYgIWFycmF5SW5jbHVkZXNBcnJheShhdHRhY2tDb29yZGluYXRlcywgZGlhZ29uYWxDb29yZGluYXRlKSAmJiAhYXJyYXlJbmNsdWRlc0FycmF5KGRpYWdvbmFsQXR0YWNrUXVldWUsIGRpYWdvbmFsQ29vcmRpbmF0ZSkpIHtcbiAgICAgICAgZGlhZ29uYWxDb29yZGluYXRlcy5wdXNoKGRpYWdvbmFsQ29vcmRpbmF0ZSk7XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZGlhZ29uYWxDb29yZGluYXRlcztcbiAgfTtcblxuICBjb25zdCBkaWFnb25hbEF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXG4gICAgaWYgKCFhZGphY2VudE1vZGUpIHtcbiAgICAgIGxldCByb3csIGNvbHVtbjtcbiAgICAgIGlmIChhdHRhY2tDb29yZGluYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgW3JvdywgY29sdW1uXSA9IHJhbmRvbUF0dGFjayh0YXJnZXQpO1xuICAgICAgICBnZXREaWFnb25hbE1vdmVzKFtyb3csIGNvbHVtbl0pLmZvckVhY2goKGNvb3JkaW5hdGVzKSA9PiB7IGRpYWdvbmFsQXR0YWNrUXVldWUucHVzaChjb29yZGluYXRlcykgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFtyb3csIGNvbHVtbl0gPSBkaWFnb25hbEF0dGFja1F1ZXVlW2ldO1xuICAgICAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XG4gICAgICAgIGF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICAgIGdldERpYWdvbmFsTW92ZXMoW3JvdywgY29sdW1uXSkuZm9yRWFjaCgoY29vcmRpbmF0ZXMpID0+IHsgZGlhZ29uYWxBdHRhY2tRdWV1ZS5wdXNoKGNvb3JkaW5hdGVzKSB9KVxuICAgICAgICBpICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0LnBsYXllckdhbWVib2FyZC5pc09jY3VwaWVkKFtyb3csIGNvbHVtbl0pKSB7XG4gICAgICAgIGFkamFjZW50TW9kZSA9IHRydWU7XG4gICAgICAgIHN1Y2Nlc3NmdWxBdHRhY2sgPSBbcm93LCBjb2x1bW5dO1xuICAgICAgICBnZXRBZGphY2VudE1vdmVzKHN1Y2Nlc3NmdWxBdHRhY2spLnZlcnRpY2FsQ29vcmRpbmF0ZXMuZm9yRWFjaCgobW92ZSkgPT4gc3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICAgIGdldEFkamFjZW50TW92ZXMoc3VjY2Vzc2Z1bEF0dGFjaykuaG9yaXpvbnRhbENvb3JkaW5hdGVzLmZvckVhY2goKG1vdmUpID0+IHN1Y2Nlc3NmdWxBdHRhY2tIb3Jpem9udGFsQWRqYWNlbnQucHVzaChtb3ZlKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFkamFjZW50QXR0YWNrKHRhcmdldCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJhbmRvbVBsYWNlU2hpcHMgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgICBjb25zdCBvcmllbnRhdGlvbnMgPSBbJ2hvcml6b250YWwnLCAndmVydGljYWwnXTtcbiAgICBsZXQgaSA9IDA7XG5cbiAgICB3aGlsZSAocGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggPCA1KSB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgICBjb25zdCBzdWNjZXNzZnVsUGxhY2VtZW50ID0gcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3Roc1tpXSwgW3JvdywgY29sdW1uXSwgb3JpZW50YXRpb24pO1xuICAgICAgaWYgKHN1Y2Nlc3NmdWxQbGFjZW1lbnQpIHsgaSArPSAxIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgcGxheWVyTmFtZSwgcGxheWVyR2FtZWJvYXJkLCByYW5kb21BdHRhY2ssIGFkamFjZW50QXR0YWNrLCBkaWFnb25hbEF0dGFjaywgcmFuZG9tUGxhY2VTaGlwcyB9O1xufVxuXG5leHBvcnQgeyBTaGlwLCBHYW1lYm9hcmQsIFBsYXllciwgQ29tcHV0ZXIgfTsiLCJjb25zdCBoaWRlT3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtb3B0aW9ucycpO1xuXG4gIG9wdGlvbnMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBzaG93T3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtb3B0aW9ucycpO1xuXG4gIG9wdGlvbnMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBoaWRlR2FtZSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKTtcblxuICBnYW1lLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufTtcblxuY29uc3Qgc2hvd0dhbWUgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG5cbiAgZ2FtZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IGhpZGVEaWZmaWN1bHRpZXMgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZGlmZmljdWx0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWZmaWN1bHR5Jyk7XG5cbiAgZGlmZmljdWx0eS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn07XG5cbmNvbnN0IHNob3dEaWZmaWN1bHRpZXMgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZGlmZmljdWx0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaWZmaWN1bHR5Jyk7XG5cbiAgZGlmZmljdWx0eS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn1cblxuY29uc3QgbG9hZFBhc3NpbmdTY3JlZW4gPSBmdW5jdGlvbihuZXh0RnVuY3Rpb24pIHtcbiAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc2luZy1zY3JlZW4nKTtcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gIGdhbWUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIHBhc3NpbmdTY3JlZW4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgbmV4dEJ1dHRvbi5pZCA9ICduZXh0JztcbiAgbmV4dEJ1dHRvbi50ZXh0Q29udGVudCA9ICdOZXh0IHR1cm4nO1xuICBwYXNzaW5nU2NyZWVuLmFwcGVuZENoaWxkKG5leHRCdXR0b24pO1xuXG4gIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbmV4dEZ1bmN0aW9uKCk7XG4gICAgc3RvcFBhc3NpbmdTY3JlZW4oKTtcbiAgICBwYXNzaW5nU2NyZWVuLnJlbW92ZUNoaWxkKG5leHRCdXR0b24pO1xuICB9KTtcblxufTtcblxuY29uc3Qgc3RvcFBhc3NpbmdTY3JlZW4gPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc2luZy1zY3JlZW4nKTtcblxuICBnYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICBwYXNzaW5nU2NyZWVuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufVxuXG5jb25zdCByZW5kZXJHYW1lYm9hcmQgPSBmdW5jdGlvbihwbGF5ZXIsIGhpZGRlbikge1xuICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqPTA7IGo8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wbGF5ZXI9JyR7cGxheWVyLnBsYXllck5hbWV9J11bZGF0YS1yb3c9JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXNbal1bMF19J11bZGF0YS1jb2x1bW49JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXNbal1bMV19J11gKTtcbiAgICAgIGlmICghZ3JpZC5jbGFzc0xpc3QuY29udGFpbnMoJ29jY3VwaWVkJykpIHtncmlkLmNsYXNzTGlzdC5hZGQoJ29jY3VwaWVkJyl9O1xuICAgICAgaWYgKGhpZGRlbikge1xuICAgICAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICB9IGVsc2UgeyBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpIH1cbiAgICB9XG4gIH1cbiAgZm9yIChsZXQgaT0wOyBpPHBsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBsYXllcj0nJHtwbGF5ZXIucGxheWVyTmFtZX0nXVtkYXRhLXJvdz0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrc1tpXVswXX0nXVtkYXRhLWNvbHVtbj0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrc1tpXVsxXX0nXWApO1xuICAgIGdyaWQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gIH1cbn07XG5cbmNvbnN0IHByaW50ID0gYXN5bmMgZnVuY3Rpb24obWVzc2FnZSwgYWZ0ZXJEZWxheSkge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG4gIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVzc2FnZScpO1xuICBjb25zdCBtZXNzYWdlQ2hhcmFjdGVycyA9IG1lc3NhZ2Uuc3BsaXQoJycpO1xuXG4gIEFycmF5LmZyb20oZ3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtncmlkLmNsYXNzTGlzdC5hZGQoJ3VuY2xpY2thYmxlJyl9KTtcbiAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnO1xuXG4gIGZvciAobGV0IGk9MDsgaTxtZXNzYWdlQ2hhcmFjdGVycy5sZW5ndGg7IGkrKykge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDMwKSk7XG4gICAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCArPSBtZXNzYWdlQ2hhcmFjdGVyc1tpXTtcbiAgfVxuICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBhZnRlckRlbGF5KSk7XG4gIEFycmF5LmZyb20oZ3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ3VuY2xpY2thYmxlJyl9KTtcbn07XG5cbmNvbnN0IHRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG9yaWVudGF0aW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJyk7XG4gIG9yaWVudGF0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PT0gJ0hvcml6b250YWwnKSB7XG4gICAgICBldmVudC50YXJnZXQudGV4dENvbnRlbnQgPSAnVmVydGljYWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudC50YXJnZXQudGV4dENvbnRlbnQgPSAnSG9yaXpvbnRhbCc7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHJlc3RhcnRHYW1lYm9hcmRzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQnKTtcblxuICBBcnJheS5mcm9tKGdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdvY2N1cGllZCcpO1xuICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGl0Jyk7XG4gICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgfSk7XG4gfTtcblxuZXhwb3J0IHsgaGlkZU9wdGlvbnMsIHNob3dPcHRpb25zLCBoaWRlR2FtZSwgc2hvd0dhbWUsIGhpZGVEaWZmaWN1bHRpZXMsIHNob3dEaWZmaWN1bHRpZXMsIGxvYWRQYXNzaW5nU2NyZWVuLCBzdG9wUGFzc2luZ1NjcmVlbiwgcmVuZGVyR2FtZWJvYXJkLCBwcmludCwgdG9nZ2xlT3JpZW50YXRpb25CdXR0b24sIHJlc3RhcnRHYW1lYm9hcmRzIH07IiwiaW1wb3J0IHsgUGxheWVyLCBDb21wdXRlciB9IGZyb20gJy4vY29tcG9uZW50cyc7XG5pbXBvcnQgeyBoaWRlT3B0aW9ucywgc2hvd09wdGlvbnMsIGhpZGVHYW1lLCBzaG93R2FtZSwgc2hvd0RpZmZpY3VsdGllcywgaGlkZURpZmZpY3VsdGllcywgbG9hZFBhc3NpbmdTY3JlZW4sIHJlbmRlckdhbWVib2FyZCwgcHJpbnQsIHJlc3RhcnRHYW1lYm9hcmRzIH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IHsgYXJyYXlJbmNsdWRlc0FycmF5IH0gZnJvbSAnLi9hcnJheS1zZWFyY2gnO1xuXG5jb25zdCBob21lU2NyZWVuID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHNpbmdsZVBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaW5nbGUtcGxheWVyJyk7XG4gIGNvbnN0IG11bHRpcGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI211bHRpcGxheWVyJyk7XG4gIGNvbnN0IGVhc3kgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWFzeScpO1xuICBjb25zdCBtZWRpdW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVkaXVtJyk7XG4gIGNvbnN0IGhhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGFyZCcpO1xuXG4gIHNpbmdsZVBsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBoaWRlT3B0aW9ucygpO1xuICAgIHNob3dEaWZmaWN1bHRpZXMoKTtcbiAgfSk7XG5cbiAgbXVsdGlwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaGlkZU9wdGlvbnMoKTtcbiAgICBzaG93R2FtZSgpO1xuICAgIG11bHRpcGxheWVyR2FtZSgpO1xuICB9KTtcblxuICBlYXN5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvbXB1dGVyID0gQ29tcHV0ZXIoKTtcbiAgICBoaWRlRGlmZmljdWx0aWVzKCk7XG4gICAgc2hvd0dhbWUoKTtcbiAgICBzaW5nbGVQbGF5ZXJHYW1lKGNvbXB1dGVyLCBjb21wdXRlci5yYW5kb21BdHRhY2spO1xuICB9KTtcblxuICBtZWRpdW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBDb21wdXRlcigpO1xuICAgIGhpZGVEaWZmaWN1bHRpZXMoKTtcbiAgICBzaG93R2FtZSgpO1xuICAgIHNpbmdsZVBsYXllckdhbWUoY29tcHV0ZXIsIGNvbXB1dGVyLmFkamFjZW50QXR0YWNrKTtcbiAgfSk7XG5cbiAgaGFyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG4gICAgaGlkZURpZmZpY3VsdGllcygpO1xuICAgIHNob3dHYW1lKCk7XG4gICAgc2luZ2xlUGxheWVyR2FtZShjb21wdXRlciwgY29tcHV0ZXIuZGlhZ29uYWxBdHRhY2spO1xuICB9KTtcbn07XG5cbmNvbnN0IHNpbmdsZVBsYXllckdhbWUgPSBhc3luYyBmdW5jdGlvbihjb21wdXRlciwgYXR0YWNrRnVuY3Rpb24pIHtcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKCdQbGF5ZXIgMScpO1xuICBjb25zdCBwbGF5ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXllcj1cIlBsYXllciAxXCJdJyk7XG4gIGNvbnN0IGNvbXB1dGVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbGF5ZXI9XCJQbGF5ZXIgMlwiXScpO1xuICBjb25zdCBob21lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvbWUnKTtcbiAgY29uc3Qgc2hpcHMgPSBbe2xlbmd0aDogNSwgbmFtZTogJ0NhcnJpZXInfSwge2xlbmd0aDogNCwgbmFtZTogJ0JhdHRsZXNoaXAnfSwge2xlbmd0aDogMywgbmFtZTogJ0Rlc3Ryb3llcid9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnU3VibWFyaW5lJ30sIHtsZW5ndGg6IDIsIG5hbWU6ICdQYXRyb2wgQm9hdCd9XTtcbiAgbGV0IGkgPSAwO1xuXG4gIGNvbnN0IGNoZWNrRW5kID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgIGF3YWl0IHByaW50KCdDb21wdXRlciB3aW5zLicsIDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgIGF3YWl0IHByaW50KCdQbGF5ZXIgd2lucy4nLCAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBhc3luYyBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWxQbGFjZW1lbnQgPSBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwc1tpXS5sZW5ndGgsIFtyb3csIGNvbHVtbl0sIG9yaWVudGF0aW9uKTtcbiAgICBpZiAoIXN1Y2Nlc3NmdWxQbGFjZW1lbnQpIHJldHVybjtcbiAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyLCBmYWxzZSk7XG4gICAgaSArPSAxO1xuXG4gICAgaWYgKGk8NSkge1xuICAgICAgYXdhaXQgcHJpbnQoYFBsYWNlIHlvdXIgJHtzaGlwc1tpXS5uYW1lfS5gLCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgYXdhaXQgcHJpbnQoJ0NvbXB1dGVyIHBsYWNpbmcgc2hpcHMuLi4nLCA2MDApO1xuICAgIGNvbXB1dGVyLnJhbmRvbVBsYWNlU2hpcHMoKTtcbiAgICByZW5kZXJHYW1lYm9hcmQoY29tcHV0ZXIsIHRydWUpO1xuICAgIGF3YWl0IHByaW50KCdZb3VyIHR1cm4gdG8gYXR0YWNrLicsIDApO1xuXG4gICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrcywgW3JvdywgY29sdW1uXSkpIHsgXG4gICAgICBhd2FpdCBwcmludCgnWW91IGFscmVhZHkgYXR0YWNrZWQgdGhpcyBzcG90LiBZb3VyIHR1cm4gdG8gYXR0YWNrLicsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLCBbcm93LCBjb2x1bW5dKTtcbiAgICByZW5kZXJHYW1lYm9hcmQoY29tcHV0ZXIsIHRydWUpO1xuICAgIGNoZWNrUGxheWVySGl0OiBcbiAgICAgIGZvciAobGV0IGk9MDsgaTxjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgW3JvdywgY29sdW1uXSkpIHtcbiAgICAgICAgICBpZiAoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmludCgnWW91IHN1bmsgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ1lvdSBoaXQgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgYnJlYWsgY2hlY2tQbGF5ZXJIaXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGF3YWl0IHByaW50KCdZb3UgbWlzc2VkLicsIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBcbiAgICBpZiAoYXdhaXQgY2hlY2tFbmQoKSkge1xuICAgICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHJlc3RhcnRHYW1lYm9hcmRzKCk7XG4gICAgICAgIGhpZGVHYW1lKCk7XG4gICAgICAgIHNob3dPcHRpb25zKCk7XG4gICAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgIGF3YWl0IHByaW50KCdFbmVteSBpcyBhdHRhY2tpbmcuLi4nLCAzMDApO1xuICAgIGNvbnN0IFtjb21wdXRlclJvdywgY29tcHV0ZXJDb2x1bW5dID0gYXR0YWNrRnVuY3Rpb24ocGxheWVyKTtcbiAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyLCBmYWxzZSk7XG4gICAgY2hlY2tDb21wdXRlckhpdDogXG4gICAgICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgW2NvbXB1dGVyUm93LCBjb21wdXRlckNvbHVtbl0pKSB7XG4gICAgICAgICAgaWYgKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaW50KCdFbmVteSBzdW5rIGEgc2hpcCEnLCA0MDApO1xuICAgICAgICAgICAgYnJlYWsgY2hlY2tDb21wdXRlckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ0VuZW15IGhpdCBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICBicmVhayBjaGVja0NvbXB1dGVySGl0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ0VuZW15IG1pc3NlZC4nLCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBpZiAoYXdhaXQgY2hlY2tFbmQoKSkge1xuICAgICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gICAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXN0YXJ0R2FtZWJvYXJkcygpO1xuICAgICAgICBoaWRlR2FtZSgpO1xuICAgICAgICBzaG93T3B0aW9ucygpO1xuICAgICAgICBob21lQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBwcmludCgnWW91ciB0dXJuIHRvIGF0dGFjay4nLCAwKVxuICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgYXdhaXQgcHJpbnQoJ1BsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgQXJyYXkuZnJvbShwbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xufTtcblxuY29uc3QgbXVsdGlwbGF5ZXJHYW1lID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHBsYXllck9uZSA9IFBsYXllcignUGxheWVyIDEnKTtcbiAgY29uc3QgcGxheWVyVHdvID0gUGxheWVyKCdQbGF5ZXIgMicpO1xuICBjb25zdCBwbGF5ZXJPbmVHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nUGxheWVyIDEnXWApO1xuICBjb25zdCBwbGF5ZXJUd29HcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nUGxheWVyIDInXWApO1xuICBjb25zdCBob21lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvbWUnKTtcbiAgY29uc3Qgc2hpcHMgPSBbe2xlbmd0aDogNSwgbmFtZTogJ0NhcnJpZXInfSwge2xlbmd0aDogNCwgbmFtZTogJ0JhdHRsZXNoaXAnfSwge2xlbmd0aDogMywgbmFtZTogJ0Rlc3Ryb3llcid9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnU3VibWFyaW5lJ30sIHtsZW5ndGg6IDIsIG5hbWU6ICdQYXRyb2wgQm9hdCd9XTtcbiAgbGV0IGkgPSAwO1xuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgbGV0IHRhcmdldFBsYXllcjtcblxuICBjb25zdCBjaGVja0VuZCA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGlmIChwbGF5ZXJPbmUucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICBhd2FpdCBwcmludCgnUGxheWVyIDIgd2lucy4nLCAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAocGxheWVyVHdvLnBsYXllckdhbWVib2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgYXdhaXQgcHJpbnQoJ1BsYXllciAxIHdpbnMuJywgMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBzdWNjZXNzZnVsUGxhY2VtZW50ID0gY3VycmVudFBsYXllci5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHNoaXBzW2ldLmxlbmd0aCwgW3JvdywgY29sdW1uXSwgb3JpZW50YXRpb24pO1xuICAgIGlmICghc3VjY2Vzc2Z1bFBsYWNlbWVudCkgcmV0dXJuO1xuICAgIHJlbmRlckdhbWVib2FyZChjdXJyZW50UGxheWVyLCBmYWxzZSk7XG4gICAgaSArPSAxO1xuXG4gICAgaWYgKGk8NSkge1xuICAgICAgYXdhaXQgcHJpbnQoYFBsYWNlIHlvdXIgJHtzaGlwc1tpXS5uYW1lfS5gLCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpID0gMDtcblxuICAgIGlmIChjdXJyZW50UGxheWVyLnBsYXllck5hbWUgPT09ICdQbGF5ZXIgMScpIHtcbiAgICAgIEFycmF5LmZyb20ocGxheWVyT25lR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDcwMCkpO1xuICAgICAgQXJyYXkuZnJvbShwbGF5ZXJPbmVHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgbG9hZFBhc3NpbmdTY3JlZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKHBsYXllck9uZUdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllck9uZSwgdHJ1ZSk7XG4gICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUd287XG4gICAgICAgIGF3YWl0IHByaW50KCdQbGF5ZXIgMiwgcGxhY2UgeW91ciBDYXJyaWVyLicpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDcwMCkpO1xuICAgICAgQXJyYXkuZnJvbShwbGF5ZXJUd29HcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgbG9hZFBhc3NpbmdTY3JlZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKHBsYXllclR3b0dyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllclR3bywgdHJ1ZSk7XG4gICAgICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXJPbmUsIGZhbHNlKTtcbiAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgICAgICAgdGFyZ2V0UGxheWVyID0gcGxheWVyVHdvO1xuICAgICAgICBhd2FpdCBwcmludChcIlBsYXllciAxJ3MgdHVybiB0byBhdHRhY2suXCIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IGFzeW5jIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgIGNvbnN0IGNvbHVtbiA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICBjb25zdCBjdXJyZW50UGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9JyR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSddYCk7XG4gICAgY29uc3QgdGFyZ2V0UGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9JyR7dGFyZ2V0UGxheWVyLnBsYXllck5hbWV9J11gKTtcbiAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzLCBbcm93LCBjb2x1bW5dKSkgeyBcbiAgICAgIGF3YWl0IHByaW50KGBZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGlzIHNwb3QuICR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSdzIHR1cm4gdG8gYXR0YWNrLmAsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjdXJyZW50UGxheWVyLmF0dGFjayh0YXJnZXRQbGF5ZXIsIFtyb3csIGNvbHVtbl0pO1xuICAgIHJlbmRlckdhbWVib2FyZCh0YXJnZXRQbGF5ZXIsIHRydWUpO1xuICAgIGNoZWNrUGxheWVySGl0OiBcbiAgICAgIGZvciAobGV0IGk9MDsgaTx0YXJnZXRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLCBbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICAgIGlmICh0YXJnZXRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9IHN1bmsgYSBzaGlwIWAsIDQwMCk7XG4gICAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoYCR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSBoaXQgYSBzaGlwIWAsIDQwMCk7XG4gICAgICAgICAgYnJlYWsgY2hlY2tQbGF5ZXJIaXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9IG1pc3NlZC5gLCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgXG4gICAgaWYgKGF3YWl0IGNoZWNrRW5kKCkpIHtcbiAgICAgIEFycmF5LmZyb20odGFyZ2V0UGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgcmVzdGFydEdhbWVib2FyZHMoKTtcbiAgICAgICAgICBoaWRlR2FtZSgpO1xuICAgICAgICAgIHNob3dPcHRpb25zKCk7XG4gICAgICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgQXJyYXkuZnJvbSh0YXJnZXRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDcwMCkpO1xuICAgIEFycmF5LmZyb20odGFyZ2V0UGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICBsb2FkUGFzc2luZ1NjcmVlbihhc3luYyAoKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHRhcmdldFBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICBBcnJheS5mcm9tKGN1cnJlbnRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgcmVuZGVyR2FtZWJvYXJkKHRhcmdldFBsYXllciwgZmFsc2UpO1xuICAgICAgcmVuZGVyR2FtZWJvYXJkKGN1cnJlbnRQbGF5ZXIsIHRydWUpO1xuICAgICAgY29uc3QgW2EsIGJdID0gW3RhcmdldFBsYXllciwgY3VycmVudFBsYXllcl07XG4gICAgICB0YXJnZXRQbGF5ZXIgPSBiO1xuICAgICAgY3VycmVudFBsYXllciA9IGE7XG5cbiAgICAgIGF3YWl0IHByaW50KGAke2N1cnJlbnRQbGF5ZXIucGxheWVyTmFtZX0ncyB0dXJuIHRvIGF0dGFjay5gKTtcbiAgICB9KTtcblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIGF3YWl0IHByaW50KCdQbGF5ZXIgMSwgcGxhY2UgeW91ciBDYXJyaWVyLicpO1xuICBBcnJheS5mcm9tKHBsYXllck9uZUdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVTY3JlZW47IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgaG9tZVNjcmVlbiBmcm9tICcuL2dhbWUnO1xuaW1wb3J0IHsgdG9nZ2xlT3JpZW50YXRpb25CdXR0b24gfSBmcm9tICcuL2RvbSc7XG5cbmhvbWVTY3JlZW4oKTtcbnRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uKCk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGJvZHkge1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA4cHg7XG59XG5cbiNvcmllbnRhdGlvbi1jb250YWluZXIsICNtZXNzYWdlLCAjaG9tZSB7XG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcbn1cblxuI2dhbWVib2FyZC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDE2cHg7XG59XG5cbiNwbGF5ZXItMSB7XG4gIHdpZHRoOiA5MCU7XG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMWZyKSAvIHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuI3BsYXllci0yIHtcbiAgd2lkdGg6IDkwJTtcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4uZ3JpZCB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xufVxuXG4ub2NjdXBpZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbn1cblxuLmhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XG59XG5cbi5vY2N1cGllZC5oaWRkZW4ge1xuICBkaXNwbGF5OmJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xufVxuXG4ub2NjdXBpZWQuaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnVuY2xpY2thYmxlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtFQUN0QixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFFBQVE7QUFDVjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixnREFBZ0Q7QUFDbEQ7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixnREFBZ0Q7QUFDbEQ7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDhweDtcXG59XFxuXFxuI29yaWVudGF0aW9uLWNvbnRhaW5lciwgI21lc3NhZ2UsICNob21lIHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuI2dhbWVib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTZweDtcXG59XFxuXFxuI3BsYXllci0xIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMWZyKSAvIHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuI3BsYXllci0yIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMWZyKSAvIHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmdyaWQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5vY2N1cGllZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ub2NjdXBpZWQuaGlkZGVuIHtcXG4gIGRpc3BsYXk6YmxvY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOndoaXRlO1xcbn1cXG5cXG4ub2NjdXBpZWQuaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udW5jbGlja2FibGUge1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiXSwibmFtZXMiOlsiYXJyYXlJbmNsdWRlc0FycmF5IiwicGFyZW50QXJyYXkiLCJjaGlsZEFycmF5IiwiZ2V0SW5kZXgiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjdXJyZW50SW5kZXgiLCJzbGljZSIsImkiLCJTaGlwIiwiaGl0Q291bnQiLCJzdW5rIiwiaGl0IiwiaXNTdW5rIiwiR2FtZWJvYXJkIiwic2hpcENvb3JkaW5hdGVzIiwicmVjZWl2ZWRBdHRhY2tzIiwiaXNPY2N1cGllZCIsImNvb3JkaW5hdGVzIiwic2hpcCIsImlzT3V0c2lkZUdhbWVib2FyZCIsInBsYWNlU2hpcCIsInN0YXJ0Q29vcmQiLCJvcmllbnRhdGlvbiIsIm5ld1NoaXAiLCJjbGFzaGluZ1NoaXBzIiwicHVzaCIsInJlY2VpdmVBdHRhY2siLCJpc0FsbFN1bmsiLCJQbGF5ZXIiLCJuYW1lIiwicGxheWVyTmFtZSIsInBsYXllckdhbWVib2FyZCIsImF0dGFjayIsInRhcmdldCIsIkNvbXB1dGVyIiwiYXR0YWNrQ29vcmRpbmF0ZXMiLCJzdWNjZXNzZnVsQXR0YWNrIiwic3VjY2Vzc2Z1bEF0dGFja1ZlcnRpY2FsQWRqYWNlbnQiLCJzdWNjZXNzZnVsQXR0YWNrSG9yaXpvbnRhbEFkamFjZW50IiwiYWRqYWNlbnRNb2RlIiwiZGlhZ29uYWxBdHRhY2tRdWV1ZSIsInJhbmRvbUF0dGFjayIsInJvdyIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbHVtbiIsImdldEFkamFjZW50TW92ZXMiLCJ2ZXJ0aWNhbE1vdmVzIiwiaG9yaXpvbnRhbE1vdmVzIiwidmVydGljYWxDb29yZGluYXRlcyIsImhvcml6b250YWxDb29yZGluYXRlcyIsImFkamFjZW50Q29vcmRpbmF0ZSIsImFkamFjZW50QXR0YWNrIiwiZm9yRWFjaCIsIm1vdmUiLCJzaGlmdCIsImluZGV4Iiwic3BsaWNlIiwiZ2V0RGlhZ29uYWxNb3ZlcyIsInBvc3NpYmxlTW92ZXMiLCJkaWFnb25hbENvb3JkaW5hdGVzIiwiZGlhZ29uYWxDb29yZGluYXRlIiwiZGlhZ29uYWxBdHRhY2siLCJyYW5kb21QbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJvcmllbnRhdGlvbnMiLCJzdWNjZXNzZnVsUGxhY2VtZW50IiwiaGlkZU9wdGlvbnMiLCJvcHRpb25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiYWRkIiwic2hvd09wdGlvbnMiLCJyZW1vdmUiLCJoaWRlR2FtZSIsImdhbWUiLCJzaG93R2FtZSIsImhpZGVEaWZmaWN1bHRpZXMiLCJkaWZmaWN1bHR5Iiwic2hvd0RpZmZpY3VsdGllcyIsImxvYWRQYXNzaW5nU2NyZWVuIiwibmV4dEZ1bmN0aW9uIiwicGFzc2luZ1NjcmVlbiIsIm5leHRCdXR0b24iLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0b3BQYXNzaW5nU2NyZWVuIiwicmVtb3ZlQ2hpbGQiLCJyZW5kZXJHYW1lYm9hcmQiLCJwbGF5ZXIiLCJoaWRkZW4iLCJqIiwiZ3JpZCIsImNvbnRhaW5zIiwicHJpbnQiLCJtZXNzYWdlIiwiYWZ0ZXJEZWxheSIsImdyaWRzIiwicXVlcnlTZWxlY3RvckFsbCIsIm1lc3NhZ2VDb250YWluZXIiLCJtZXNzYWdlQ2hhcmFjdGVycyIsInNwbGl0IiwiQXJyYXkiLCJmcm9tIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwidG9nZ2xlT3JpZW50YXRpb25CdXR0b24iLCJvcmllbnRhdGlvbkJ1dHRvbiIsImV2ZW50IiwicmVzdGFydEdhbWVib2FyZHMiLCJob21lU2NyZWVuIiwic2luZ2xlUGxheWVyIiwibXVsdGlwbGF5ZXIiLCJlYXN5IiwibWVkaXVtIiwiaGFyZCIsIm11bHRpcGxheWVyR2FtZSIsImNvbXB1dGVyIiwic2luZ2xlUGxheWVyR2FtZSIsImF0dGFja0Z1bmN0aW9uIiwicGxheWVyR3JpZHMiLCJjb21wdXRlckdyaWRzIiwiaG9tZUJ1dHRvbiIsInNoaXBzIiwiY2hlY2tFbmQiLCJOdW1iZXIiLCJnZXRBdHRyaWJ1dGUiLCJ0b0xvd2VyQ2FzZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjaGVja1BsYXllckhpdCIsImNvbXB1dGVyUm93IiwiY29tcHV0ZXJDb2x1bW4iLCJjaGVja0NvbXB1dGVySGl0Iiwic3RvcFByb3BhZ2F0aW9uIiwicGxheWVyT25lIiwicGxheWVyVHdvIiwicGxheWVyT25lR3JpZHMiLCJwbGF5ZXJUd29HcmlkcyIsImN1cnJlbnRQbGF5ZXIiLCJ0YXJnZXRQbGF5ZXIiLCJjdXJyZW50UGxheWVyR3JpZHMiLCJ0YXJnZXRQbGF5ZXJHcmlkcyIsImEiLCJiIl0sInNvdXJjZVJvb3QiOiIifQ==