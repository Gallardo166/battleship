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
  if (parentArray.length === 0) {
    return false;
  }
  if (parentArray[0].length !== childArray.length) {
    parentArray = parentArray.slice(1);
    return arrayIncludesArray(parentArray, childArray);
  }
  for (let i = 0; i < childArray.length; i++) {
    if (childArray[i] !== parentArray[0][i]) {
      parentArray = parentArray.slice(1);
      return arrayIncludesArray(parentArray, childArray);
    }
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
    isAllSunk
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
/* harmony export */   hideOptions: () => (/* binding */ hideOptions),
/* harmony export */   loadPassingScreen: () => (/* binding */ loadPassingScreen),
/* harmony export */   print: () => (/* binding */ print),
/* harmony export */   renderGameboard: () => (/* binding */ renderGameboard),
/* harmony export */   restartGameboards: () => (/* binding */ restartGameboards),
/* harmony export */   showOptions: () => (/* binding */ showOptions),
/* harmony export */   stopPassingScreen: () => (/* binding */ stopPassingScreen),
/* harmony export */   toggleOrientationButton: () => (/* binding */ toggleOrientationButton)
/* harmony export */ });
const hideOptions = function () {
  const options = document.querySelector('#game-options');
  const game = document.querySelector('#game');
  options.classList.add('hidden');
  game.classList.remove('hidden');
};
const showOptions = function () {
  const options = document.querySelector('#game-options');
  const game = document.querySelector('#game');
  options.classList.remove('hidden');
  game.classList.add('hidden');
};
const loadPassingScreen = function (nextFunction) {
  const options = document.querySelector('#game-options');
  const game = document.querySelector('#game');
  const passingScreen = document.querySelector('#passing-screen');
  const nextButton = document.createElement('button');
  options.classList.add('hidden');
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
  const options = document.querySelector('#game-options');
  const game = document.querySelector('#game');
  const passingScreen = document.querySelector('#passing-screen');
  options.classList.remove('hidden');
  game.classList.remove('hidden');
  passingScreen.add('hidden');
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
      }
      ;
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
  singlePlayer.addEventListener('click', () => {
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideOptions)();
    singlePlayerGame();
  });
  multiplayer.addEventListener('click', () => {
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.hideOptions)();
    multiplayerGame();
  });
};
const singlePlayerGame = async function () {
  const player = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Player)('Player 1');
  const computer = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Computer)();
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
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showOptions)();
        homeButton.classList.add('hidden');
      });
      return;
    }
    Array.from(computerGrids).forEach(grid => grid.removeEventListener('click', attack));
    await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Enemy is attacking...', 300);
    const [computerRow, computerColumn] = computer.randomAttack(player);
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
    await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Your turn to attack.', 0);
    Array.from(computerGrids).forEach(grid => grid.addEventListener('click', attack));
    if (await checkEnd()) {
      Array.from(computerGrids).forEach(grid => grid.removeEventListener('click', attack));
      homeButton.classList.remove('hidden');
      homeButton.addEventListener('click', () => {
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.restartGameboards)();
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.showOptions)();
        homeButton.classList.add('hidden');
      });
      return;
    }
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
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(playerOne, true);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadPassingScreen)(async () => {
        Array.from(playerOneGrids).forEach(grid => grid.removeEventListener('click', placeShip));
        Array.from(playerTwoGrids).forEach(grid => grid.addEventListener('click', placeShip));
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(playerOne, false);
        currentPlayer = playerTwo;
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Player 2, place your Carrier.');
      });
    } else {
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(playerTwo, true);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadPassingScreen)(async () => {
        Array.from(playerTwoGrids).forEach(grid => grid.removeEventListener('click', placeShip));
        Array.from(playerTwoGrids).forEach(grid => grid.addEventListener('click', attack));
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(playerTwo, false);
        currentPlayer = playerOne;
        targetPlayer = playerTwo;
        await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)("Player 1's turn to attack.");
      });
    }
  };
  const attack = async function (event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const currentPlayerGrids = document.querySelector(`[data-player='${currentPlayer.playerName}']`);
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
        homeScreen();
        homeButton.classList.add('hidden');
      });
      return;
    }
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.loadPassingScreen)(async () => {
      Array.from(targetPlayerGrids).forEach(grid => grid.removeEventListener('click', attack));
      Array.from(currentPlayerGrids).forEach(grid => grid.addEventListener('click', attack));
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(targetPlayer, false);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.renderGameboard)(currentPlayer, true);
      targetPlayer = playerOne;
      currentPlayer = playerTwo;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FycmF5LXNlYXJjaC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcnJheUluY2x1ZGVzQXJyYXkgPSBmdW5jdGlvbihwYXJlbnRBcnJheSwgY2hpbGRBcnJheSkge1xuICBpZiAocGFyZW50QXJyYXkubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZSB9XG4gIGlmIChwYXJlbnRBcnJheVswXS5sZW5ndGggIT09IGNoaWxkQXJyYXkubGVuZ3RoKSB7XG4gICAgcGFyZW50QXJyYXkgPSBwYXJlbnRBcnJheS5zbGljZSgxKTtcbiAgICByZXR1cm4gYXJyYXlJbmNsdWRlc0FycmF5KHBhcmVudEFycmF5LCBjaGlsZEFycmF5KTtcbiAgfVxuICBmb3IgKGxldCBpPTA7IGk8Y2hpbGRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjaGlsZEFycmF5W2ldICE9PSBwYXJlbnRBcnJheVswXVtpXSkgeyBcbiAgICAgIHBhcmVudEFycmF5ID0gcGFyZW50QXJyYXkuc2xpY2UoMSk7XG4gICAgICByZXR1cm4gYXJyYXlJbmNsdWRlc0FycmF5KHBhcmVudEFycmF5LCBjaGlsZEFycmF5KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZXhwb3J0IHsgYXJyYXlJbmNsdWRlc0FycmF5IH07IiwiaW1wb3J0IHsgYXJyYXlJbmNsdWRlc0FycmF5IH0gZnJvbSBcIi4vYXJyYXktc2VhcmNoXCI7XG5cbmNvbnN0IFNoaXAgPSBmdW5jdGlvbihsZW5ndGgpIHtcbiAgbGV0IGhpdENvdW50ID0gMDtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSBmdW5jdGlvbigpIHtcbiAgICBoaXRDb3VudCArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChsZW5ndGggPT09IGhpdENvdW50KSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bms7XG4gIH07XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmsgfTtcbn1cblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24oKSB7XG4gIGxldCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IHJlY2VpdmVkQXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IGlzT2NjdXBpZWQgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGZvciAobGV0IGk9MDsgaTxzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLCBjb29yZGluYXRlcykpIHtcbiAgICAgICAgcmV0dXJuIHNoaXBDb29yZGluYXRlc1tpXS5zaGlwO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgaXNPdXRzaWRlR2FtZWJvYXJkID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBpZiAoY29vcmRpbmF0ZXNbMF0gPCAwIHx8IGNvb3JkaW5hdGVzWzBdID4gOSB8fCBjb29yZGluYXRlc1sxXSA8IDAgfHwgY29vcmRpbmF0ZXNbMV0gPiA5KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGZ1bmN0aW9uKGxlbmd0aCwgc3RhcnRDb29yZCwgb3JpZW50YXRpb24pIHtcbiAgICBjb25zdCBuZXdTaGlwID0gU2hpcChsZW5ndGgpO1xuICAgIGxldCBjb29yZGluYXRlcyA9IFtzdGFydENvb3JkXTtcbiAgICBsZXQgY2xhc2hpbmdTaGlwcyA9IGZhbHNlO1xuICBcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgZm9yIChsZXQgaT0wOyAoaTxsZW5ndGggJiYgY2xhc2hpbmdTaGlwcyA9PT0gZmFsc2UpOyBpKyspIHtcbiAgICAgICAgaWYgKGlzT2NjdXBpZWQoW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGlzT3V0c2lkZUdhbWVib2FyZChbc3RhcnRDb29yZFswXSwgc3RhcnRDb29yZFsxXSArIGldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaT0xOyBpPGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGk9MDsgKGk8bGVuZ3RoICYmIGNsYXNoaW5nU2hpcHMgPT09IGZhbHNlKTsgaSsrKSB7XG4gICAgICAgIGlmIChpc09jY3VwaWVkKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChpc091dHNpZGVHYW1lYm9hcmQoW3N0YXJ0Q29vcmRbMF0gKyBpLCBzdGFydENvb3JkWzFdXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGk9MTsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNoaXBDb29yZGluYXRlcy5wdXNoKHsgc2hpcDogbmV3U2hpcCwgY29vcmRpbmF0ZXMgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgY29uc3Qgc2hpcCA9IGlzT2NjdXBpZWQoY29vcmRpbmF0ZXMpO1xuICAgIGlmIChzaGlwICE9PSBmYWxzZSkge1xuICAgICAgc2hpcC5oaXQoKTtcbiAgICB9XG4gICAgcmVjZWl2ZWRBdHRhY2tzLnB1c2goY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIGNvbnN0IGlzQWxsU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpPHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4geyBzaGlwQ29vcmRpbmF0ZXMsIHJlY2VpdmVkQXR0YWNrcywgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBpc0FsbFN1bmsgfTtcbn07XG5cbmNvbnN0IFBsYXllciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuXG4gIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCwgY29vcmRpbmF0ZXMpIHtcbiAgICB0YXJnZXQucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIHJldHVybiB7IHBsYXllck5hbWUsIHBsYXllckdhbWVib2FyZCwgYXR0YWNrIH07XG59O1xuXG5jb25zdCBDb21wdXRlciA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gJ1BsYXllciAyJztcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGNvbnN0IGF0dGFja0Nvb3JkaW5hdGVzID0gW107XG5cbiAgY29uc3QgcmFuZG9tQXR0YWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShhdHRhY2tDb29yZGluYXRlcywgW3JvdywgY29sdW1uXSkpIHsgY29udGludWUgfVxuICAgICAgdGFyZ2V0LnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFtyb3csIGNvbHVtbl0pO1xuICAgICAgYXR0YWNrQ29vcmRpbmF0ZXMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIHJldHVybiBbcm93LCBjb2x1bW5dO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCByYW5kb21QbGFjZVNoaXBzID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gICAgY29uc3Qgb3JpZW50YXRpb25zID0gWydob3Jpem9udGFsJywgJ3ZlcnRpY2FsJ107XG4gICAgbGV0IGkgPSAwO1xuXG4gICAgd2hpbGUgKHBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIDwgNSkge1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xuICAgICAgY29uc3Qgc3VjY2Vzc2Z1bFBsYWNlbWVudCA9IHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aHNbaV0sIFtyb3csIGNvbHVtbl0sIG9yaWVudGF0aW9uKTtcbiAgICAgIGlmIChzdWNjZXNzZnVsUGxhY2VtZW50KSB7IGkgKz0gMSB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IHBsYXllck5hbWUsIHBsYXllckdhbWVib2FyZCwgcmFuZG9tQXR0YWNrLCByYW5kb21QbGFjZVNoaXBzIH07XG59XG5cbmV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyLCBDb21wdXRlciB9OyIsImNvbnN0IGhpZGVPcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1vcHRpb25zJyk7XG4gIGNvbnN0IGdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZScpO1xuXG4gIG9wdGlvbnMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIGdhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59O1xuXG5jb25zdCBzaG93T3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtb3B0aW9ucycpO1xuICBjb25zdCBnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUnKTtcblxuICBvcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICBnYW1lLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufTtcblxuY29uc3QgbG9hZFBhc3NpbmdTY3JlZW4gPSBmdW5jdGlvbihuZXh0RnVuY3Rpb24pIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLW9wdGlvbnMnKTtcbiAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc2luZy1zY3JlZW4nKTtcbiAgY29uc3QgbmV4dEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXG4gIG9wdGlvbnMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIGdhbWUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIHBhc3NpbmdTY3JlZW4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cbiAgbmV4dEJ1dHRvbi5pZCA9ICduZXh0JztcbiAgbmV4dEJ1dHRvbi50ZXh0Q29udGVudCA9ICdOZXh0IHR1cm4nO1xuICBwYXNzaW5nU2NyZWVuLmFwcGVuZENoaWxkKG5leHRCdXR0b24pO1xuXG4gIG5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbmV4dEZ1bmN0aW9uKCk7XG4gICAgc3RvcFBhc3NpbmdTY3JlZW4oKTtcbiAgICBwYXNzaW5nU2NyZWVuLnJlbW92ZUNoaWxkKG5leHRCdXR0b24pO1xuICB9KTtcblxufTtcblxuY29uc3Qgc3RvcFBhc3NpbmdTY3JlZW4gPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLW9wdGlvbnMnKTtcbiAgY29uc3QgZ2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lJyk7XG4gIGNvbnN0IHBhc3NpbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFzc2luZy1zY3JlZW4nKTtcblxuICBvcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICBnYW1lLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICBwYXNzaW5nU2NyZWVuLmFkZCgnaGlkZGVuJyk7XG59XG5cbmNvbnN0IHJlbmRlckdhbWVib2FyZCA9IGZ1bmN0aW9uKHBsYXllciwgaGlkZGVuKSB7XG4gIGZvciAobGV0IGk9MDsgaTxwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGo9MDsgajxwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBsYXllcj0nJHtwbGF5ZXIucGxheWVyTmFtZX0nXVtkYXRhLXJvdz0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXVswXX0nXVtkYXRhLWNvbHVtbj0nJHtwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXVsxXX0nXWApO1xuICAgICAgaWYgKCFncmlkLmNsYXNzTGlzdC5jb250YWlucygnb2NjdXBpZWQnKSkge2dyaWQuY2xhc3NMaXN0LmFkZCgnb2NjdXBpZWQnKX07XG4gICAgICBpZiAoaGlkZGVuKSB7Z3JpZC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKX07XG4gICAgfVxuICB9XG4gIGZvciAobGV0IGk9MDsgaTxwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wbGF5ZXI9JyR7cGxheWVyLnBsYXllck5hbWV9J11bZGF0YS1yb3c9JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3NbaV1bMF19J11bZGF0YS1jb2x1bW49JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3NbaV1bMV19J11gKTtcbiAgICBncmlkLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICB9XG59O1xuXG5jb25zdCBwcmludCA9IGFzeW5jIGZ1bmN0aW9uKG1lc3NhZ2UsIGFmdGVyRGVsYXkpIHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCcpO1xuICBjb25zdCBtZXNzYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21lc3NhZ2UnKTtcbiAgY29uc3QgbWVzc2FnZUNoYXJhY3RlcnMgPSBtZXNzYWdlLnNwbGl0KCcnKTtcblxuICBBcnJheS5mcm9tKGdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7Z3JpZC5jbGFzc0xpc3QuYWRkKCd1bmNsaWNrYWJsZScpfSk7XG4gIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSAnJztcblxuICBmb3IgKGxldCBpPTA7IGk8bWVzc2FnZUNoYXJhY3RlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAzMCkpO1xuICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgKz0gbWVzc2FnZUNoYXJhY3RlcnNbaV07XG4gIH1cbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgYWZ0ZXJEZWxheSkpO1xuICBBcnJheS5mcm9tKGdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiB7Z3JpZC5jbGFzc0xpc3QucmVtb3ZlKCd1bmNsaWNrYWJsZScpfSk7XG59O1xuXG5jb25zdCB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvcmllbnRhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmllbnRhdGlvbicpO1xuICBvcmllbnRhdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09ICdIb3Jpem9udGFsJykge1xuICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gJ1ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gJ0hvcml6b250YWwnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCByZXN0YXJ0R2FtZWJvYXJkcyA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBncmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkJyk7XG5cbiAgQXJyYXkuZnJvbShncmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnb2NjdXBpZWQnKTtcbiAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpdCcpO1xuICAgIGdyaWQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gIH0pO1xuIH07XG5cbmV4cG9ydCB7IGhpZGVPcHRpb25zLCBzaG93T3B0aW9ucywgbG9hZFBhc3NpbmdTY3JlZW4sIHN0b3BQYXNzaW5nU2NyZWVuLCByZW5kZXJHYW1lYm9hcmQsIHByaW50LCB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiwgcmVzdGFydEdhbWVib2FyZHMgfTsiLCJpbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCB7IGhpZGVPcHRpb25zLCBzaG93T3B0aW9ucywgbG9hZFBhc3NpbmdTY3JlZW4sIHN0b3BQYXNzaW5nU2NyZWVuLCByZW5kZXJHYW1lYm9hcmQsIHByaW50LCB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiwgcmVzdGFydEdhbWVib2FyZHMgfSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgeyBhcnJheUluY2x1ZGVzQXJyYXkgfSBmcm9tICcuL2FycmF5LXNlYXJjaCc7XG5cbmNvbnN0IGhvbWVTY3JlZW4gPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgc2luZ2xlUGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpbmdsZS1wbGF5ZXInKTtcbiAgY29uc3QgbXVsdGlwbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbXVsdGlwbGF5ZXInKTtcblxuICBzaW5nbGVQbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaGlkZU9wdGlvbnMoKTtcbiAgICBzaW5nbGVQbGF5ZXJHYW1lKCk7XG4gIH0pO1xuICBtdWx0aXBsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBoaWRlT3B0aW9ucygpO1xuICAgIG11bHRpcGxheWVyR2FtZSgpO1xuICB9KTtcbn07XG5cbmNvbnN0IHNpbmdsZVBsYXllckdhbWUgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKCdQbGF5ZXIgMScpO1xuICBjb25zdCBjb21wdXRlciA9IENvbXB1dGVyKCk7XG4gIGNvbnN0IHBsYXllckdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWVyPVwiUGxheWVyIDFcIl0nKTtcbiAgY29uc3QgY29tcHV0ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsYXllcj1cIlBsYXllciAyXCJdJyk7XG4gIGNvbnN0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaG9tZScpO1xuICBjb25zdCBzaGlwcyA9IFt7bGVuZ3RoOiA1LCBuYW1lOiAnQ2Fycmllcid9LCB7bGVuZ3RoOiA0LCBuYW1lOiAnQmF0dGxlc2hpcCd9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnRGVzdHJveWVyJ30sIHtsZW5ndGg6IDMsIG5hbWU6ICdTdWJtYXJpbmUnfSwge2xlbmd0aDogMiwgbmFtZTogJ1BhdHJvbCBCb2F0J31dO1xuICBsZXQgaSA9IDA7XG5cbiAgY29uc3QgY2hlY2tFbmQgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBpZiAocGxheWVyLnBsYXllckdhbWVib2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgYXdhaXQgcHJpbnQoJ0NvbXB1dGVyIHdpbnMuJywgMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgYXdhaXQgcHJpbnQoJ1BsYXllciB3aW5zLicsIDApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IGFzeW5jIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgIGNvbnN0IGNvbHVtbiA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmllbnRhdGlvbicpLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3Qgc3VjY2Vzc2Z1bFBsYWNlbWVudCA9IHBsYXllci5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHNoaXBzW2ldLmxlbmd0aCwgW3JvdywgY29sdW1uXSwgb3JpZW50YXRpb24pO1xuICAgIGlmICghc3VjY2Vzc2Z1bFBsYWNlbWVudCkgcmV0dXJuO1xuICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXIsIGZhbHNlKTtcbiAgICBpICs9IDE7XG5cbiAgICBpZiAoaTw1KSB7XG4gICAgICBhd2FpdCBwcmludChgUGxhY2UgeW91ciAke3NoaXBzW2ldLm5hbWV9LmAsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIEFycmF5LmZyb20ocGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICBhd2FpdCBwcmludCgnQ29tcHV0ZXIgcGxhY2luZyBzaGlwcy4uLicsIDYwMCk7XG4gICAgY29tcHV0ZXIucmFuZG9tUGxhY2VTaGlwcygpO1xuICAgIHJlbmRlckdhbWVib2FyZChjb21wdXRlciwgdHJ1ZSk7XG4gICAgYXdhaXQgcHJpbnQoJ1lvdXIgdHVybiB0byBhdHRhY2suJywgMCk7XG5cbiAgICBBcnJheS5mcm9tKGNvbXB1dGVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgfTtcblxuICBjb25zdCBhdHRhY2sgPSBhc3luYyBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzLCBbcm93LCBjb2x1bW5dKSkgeyBcbiAgICAgIGF3YWl0IHByaW50KCdZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGlzIHNwb3QuIFlvdXIgdHVybiB0byBhdHRhY2suJywgMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBsYXllci5hdHRhY2soY29tcHV0ZXIsIFtyb3csIGNvbHVtbl0pO1xuICAgIHJlbmRlckdhbWVib2FyZChjb21wdXRlciwgdHJ1ZSk7XG4gICAgY2hlY2tQbGF5ZXJIaXQ6IFxuICAgICAgZm9yIChsZXQgaT0wOyBpPGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLCBbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICAgIGlmIChjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaW50KCdZb3Ugc3VuayBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICAgIGJyZWFrIGNoZWNrUGxheWVySGl0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBhd2FpdCBwcmludCgnWW91IGhpdCBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ1lvdSBtaXNzZWQuJywgNDAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIFxuICAgIGlmIChhd2FpdCBjaGVja0VuZCgpKSB7XG4gICAgICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVzdGFydEdhbWVib2FyZHMoKTtcbiAgICAgICAgc2hvd09wdGlvbnMoKTtcbiAgICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIH0pXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgYXdhaXQgcHJpbnQoJ0VuZW15IGlzIGF0dGFja2luZy4uLicsIDMwMCk7XG4gICAgY29uc3QgW2NvbXB1dGVyUm93LCBjb21wdXRlckNvbHVtbl0gPSBjb21wdXRlci5yYW5kb21BdHRhY2socGxheWVyKTtcbiAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyLCBmYWxzZSk7XG4gICAgY2hlY2tDb21wdXRlckhpdDogXG4gICAgICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5SW5jbHVkZXNBcnJheShwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgW2NvbXB1dGVyUm93LCBjb21wdXRlckNvbHVtbl0pKSB7XG4gICAgICAgICAgaWYgKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgIGF3YWl0IHByaW50KCdFbmVteSBzdW5rIGEgc2hpcCEnLCA0MDApO1xuICAgICAgICAgICAgYnJlYWsgY2hlY2tDb21wdXRlckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ0VuZW15IGhpdCBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICBicmVhayBjaGVja0NvbXB1dGVySGl0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ0VuZW15IG1pc3NlZC4nLCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBhd2FpdCBwcmludCgnWW91ciB0dXJuIHRvIGF0dGFjay4nLCAwKVxuICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuXG4gICAgaWYgKGF3YWl0IGNoZWNrRW5kKCkpIHtcbiAgICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcblxuICAgICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcmVzdGFydEdhbWVib2FyZHMoKTtcbiAgICAgICAgc2hvd09wdGlvbnMoKTtcbiAgICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgIH0pXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgYXdhaXQgcHJpbnQoJ1BsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgQXJyYXkuZnJvbShwbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xufTtcblxuY29uc3QgbXVsdGlwbGF5ZXJHYW1lID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHBsYXllck9uZSA9IFBsYXllcignUGxheWVyIDEnKTtcbiAgY29uc3QgcGxheWVyVHdvID0gUGxheWVyKCdQbGF5ZXIgMicpO1xuICBjb25zdCBwbGF5ZXJPbmVHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nUGxheWVyIDEnXWApO1xuICBjb25zdCBwbGF5ZXJUd29HcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nUGxheWVyIDInXWApO1xuICBjb25zdCBob21lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvbWUnKTtcbiAgY29uc3Qgc2hpcHMgPSBbe2xlbmd0aDogNSwgbmFtZTogJ0NhcnJpZXInfSwge2xlbmd0aDogNCwgbmFtZTogJ0JhdHRsZXNoaXAnfSwge2xlbmd0aDogMywgbmFtZTogJ0Rlc3Ryb3llcid9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnU3VibWFyaW5lJ30sIHtsZW5ndGg6IDIsIG5hbWU6ICdQYXRyb2wgQm9hdCd9XTtcbiAgbGV0IGkgPSAwO1xuICBsZXQgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgbGV0IHRhcmdldFBsYXllcjtcblxuICBjb25zdCBjaGVja0VuZCA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGlmIChwbGF5ZXJPbmUucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICBhd2FpdCBwcmludCgnUGxheWVyIDIgd2lucy4nLCAwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAocGxheWVyVHdvLnBsYXllckdhbWVib2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgYXdhaXQgcHJpbnQoJ1BsYXllciAxIHdpbnMuJywgMCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI29yaWVudGF0aW9uJykudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBzdWNjZXNzZnVsUGxhY2VtZW50ID0gY3VycmVudFBsYXllci5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHNoaXBzW2ldLmxlbmd0aCwgW3JvdywgY29sdW1uXSwgb3JpZW50YXRpb24pO1xuICAgIGlmICghc3VjY2Vzc2Z1bFBsYWNlbWVudCkgcmV0dXJuO1xuICAgIHJlbmRlckdhbWVib2FyZChjdXJyZW50UGxheWVyLCBmYWxzZSk7XG4gICAgaSArPSAxO1xuXG4gICAgaWYgKGk8NSkge1xuICAgICAgYXdhaXQgcHJpbnQoYFBsYWNlIHlvdXIgJHtzaGlwc1tpXS5uYW1lfS5gLCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpID0gMDtcblxuICAgIGlmIChjdXJyZW50UGxheWVyLnBsYXllck5hbWUgPT09ICdQbGF5ZXIgMScpIHtcbiAgICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXJPbmUsIHRydWUpO1xuICAgICAgbG9hZFBhc3NpbmdTY3JlZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICBBcnJheS5mcm9tKHBsYXllck9uZUdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgICAgIEFycmF5LmZyb20ocGxheWVyVHdvR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllck9uZSwgZmFsc2UpO1xuICAgICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyVHdvO1xuICAgICAgICBhd2FpdCBwcmludCgnUGxheWVyIDIsIHBsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyVHdvLCB0cnVlKTtcbiAgICAgIGxvYWRQYXNzaW5nU2NyZWVuKGFzeW5jICgpID0+IHtcbiAgICAgICAgQXJyYXkuZnJvbShwbGF5ZXJUd29HcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYWNlU2hpcCkpO1xuICAgICAgICBBcnJheS5mcm9tKHBsYXllclR3b0dyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICAgIHJlbmRlckdhbWVib2FyZChwbGF5ZXJUd28sIGZhbHNlKTtcbiAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgICAgICAgdGFyZ2V0UGxheWVyID0gcGxheWVyVHdvO1xuICAgICAgICBhd2FpdCBwcmludChcIlBsYXllciAxJ3MgdHVybiB0byBhdHRhY2suXCIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IGFzeW5jIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93JykpO1xuICAgIGNvbnN0IGNvbHVtbiA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbHVtbicpKTtcbiAgICBjb25zdCBjdXJyZW50UGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wbGF5ZXI9JyR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSddYCk7XG4gICAgY29uc3QgdGFyZ2V0UGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9JyR7dGFyZ2V0UGxheWVyLnBsYXllck5hbWV9J11gKTtcbiAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzLCBbcm93LCBjb2x1bW5dKSkgeyBcbiAgICAgIGF3YWl0IHByaW50KGBZb3UgYWxyZWFkeSBhdHRhY2tlZCB0aGlzIHNwb3QuICR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSdzIHR1cm4gdG8gYXR0YWNrLmAsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjdXJyZW50UGxheWVyLmF0dGFjayh0YXJnZXRQbGF5ZXIsIFtyb3csIGNvbHVtbl0pO1xuICAgIHJlbmRlckdhbWVib2FyZCh0YXJnZXRQbGF5ZXIsIHRydWUpO1xuICAgIGNoZWNrUGxheWVySGl0OiBcbiAgICAgIGZvciAobGV0IGk9MDsgaTx0YXJnZXRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLCBbcm93LCBjb2x1bW5dKSkge1xuICAgICAgICAgIGlmICh0YXJnZXRQbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9IHN1bmsgYSBzaGlwIWAsIDQwMCk7XG4gICAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoYCR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSBoaXQgYSBzaGlwIWAsIDQwMCk7XG4gICAgICAgICAgYnJlYWsgY2hlY2tQbGF5ZXJIaXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IHRhcmdldFBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBhd2FpdCBwcmludChgJHtjdXJyZW50UGxheWVyLnBsYXllck5hbWV9IG1pc3NlZC5gLCA0MDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgXG4gICAgaWYgKGF3YWl0IGNoZWNrRW5kKCkpIHtcbiAgICAgIEFycmF5LmZyb20odGFyZ2V0UGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgIGhvbWVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgcmVzdGFydEdhbWVib2FyZHMoKTtcbiAgICAgICAgICBob21lU2NyZWVuKCk7XG4gICAgICAgICAgaG9tZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfSlcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2FkUGFzc2luZ1NjcmVlbihhc3luYyAoKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHRhcmdldFBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICBBcnJheS5mcm9tKGN1cnJlbnRQbGF5ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgICAgcmVuZGVyR2FtZWJvYXJkKHRhcmdldFBsYXllciwgZmFsc2UpO1xuICAgICAgcmVuZGVyR2FtZWJvYXJkKGN1cnJlbnRQbGF5ZXIsIHRydWUpO1xuICAgICAgdGFyZ2V0UGxheWVyID0gcGxheWVyT25lO1xuICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR3bztcblxuICAgICAgYXdhaXQgcHJpbnQoYCR7Y3VycmVudFBsYXllci5wbGF5ZXJOYW1lfSdzIHR1cm4gdG8gYXR0YWNrLmApO1xuICAgIH0pO1xuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH07XG5cbiAgYXdhaXQgcHJpbnQoJ1BsYXllciAxLCBwbGFjZSB5b3VyIENhcnJpZXIuJyk7XG4gIEFycmF5LmZyb20ocGxheWVyT25lR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaG9tZVNjcmVlbjsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBob21lU2NyZWVuIGZyb20gJy4vZ2FtZSc7XG5pbXBvcnQgeyB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiB9IGZyb20gJy4vZG9tJztcblxuaG9tZVNjcmVlbigpO1xudG9nZ2xlT3JpZW50YXRpb25CdXR0b24oKTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgYm9keSB7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDhweDtcbn1cblxuI29yaWVudGF0aW9uLWNvbnRhaW5lciwgI21lc3NhZ2UsICNob21lIHtcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xufVxuXG4jZ2FtZWJvYXJkLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTZweDtcbn1cblxuI3BsYXllci0xIHtcbiAgd2lkdGg6IDkwJTtcbiAgYXNwZWN0LXJhdGlvOiAxIC8gMTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xufVxuXG4jcGxheWVyLTIge1xuICB3aWR0aDogOTAlO1xuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XG59XG5cbi5ncmlkIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG59XG5cbi5vY2N1cGllZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xufVxuXG4uaGl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcbn1cblxuLm9jY3VwaWVkLmhpZGRlbiB7XG4gIGRpc3BsYXk6YmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XG59XG5cbi5vY2N1cGllZC5oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udW5jbGlja2FibGUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsUUFBUTtBQUNWOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGdEQUFnRDtBQUNsRDs7QUFFQTtFQUNFLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGdEQUFnRDtBQUNsRDs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogOHB4O1xcbn1cXG5cXG4jb3JpZW50YXRpb24tY29udGFpbmVyLCAjbWVzc2FnZSwgI2hvbWUge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4jZ2FtZWJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxNnB4O1xcbn1cXG5cXG4jcGxheWVyLTEge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4jcGxheWVyLTIge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZ3JpZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLm9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5vY2N1cGllZC5oaWRkZW4ge1xcbiAgZGlzcGxheTpibG9jaztcXG4gIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XFxufVxcblxcbi5vY2N1cGllZC5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi51bmNsaWNrYWJsZSB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJhcnJheUluY2x1ZGVzQXJyYXkiLCJwYXJlbnRBcnJheSIsImNoaWxkQXJyYXkiLCJsZW5ndGgiLCJzbGljZSIsImkiLCJTaGlwIiwiaGl0Q291bnQiLCJzdW5rIiwiaGl0IiwiaXNTdW5rIiwiR2FtZWJvYXJkIiwic2hpcENvb3JkaW5hdGVzIiwicmVjZWl2ZWRBdHRhY2tzIiwiaXNPY2N1cGllZCIsImNvb3JkaW5hdGVzIiwic2hpcCIsImlzT3V0c2lkZUdhbWVib2FyZCIsInBsYWNlU2hpcCIsInN0YXJ0Q29vcmQiLCJvcmllbnRhdGlvbiIsIm5ld1NoaXAiLCJjbGFzaGluZ1NoaXBzIiwicHVzaCIsInJlY2VpdmVBdHRhY2siLCJpc0FsbFN1bmsiLCJQbGF5ZXIiLCJuYW1lIiwicGxheWVyTmFtZSIsInBsYXllckdhbWVib2FyZCIsImF0dGFjayIsInRhcmdldCIsIkNvbXB1dGVyIiwiYXR0YWNrQ29vcmRpbmF0ZXMiLCJyYW5kb21BdHRhY2siLCJyb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJyYW5kb21QbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJvcmllbnRhdGlvbnMiLCJzdWNjZXNzZnVsUGxhY2VtZW50IiwiaGlkZU9wdGlvbnMiLCJvcHRpb25zIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZ2FtZSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInNob3dPcHRpb25zIiwibG9hZFBhc3NpbmdTY3JlZW4iLCJuZXh0RnVuY3Rpb24iLCJwYXNzaW5nU2NyZWVuIiwibmV4dEJ1dHRvbiIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RvcFBhc3NpbmdTY3JlZW4iLCJyZW1vdmVDaGlsZCIsInJlbmRlckdhbWVib2FyZCIsInBsYXllciIsImhpZGRlbiIsImoiLCJncmlkIiwiY29udGFpbnMiLCJwcmludCIsIm1lc3NhZ2UiLCJhZnRlckRlbGF5IiwiZ3JpZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWVzc2FnZUNvbnRhaW5lciIsIm1lc3NhZ2VDaGFyYWN0ZXJzIiwic3BsaXQiLCJBcnJheSIsImZyb20iLCJmb3JFYWNoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwidG9nZ2xlT3JpZW50YXRpb25CdXR0b24iLCJvcmllbnRhdGlvbkJ1dHRvbiIsImV2ZW50IiwicmVzdGFydEdhbWVib2FyZHMiLCJob21lU2NyZWVuIiwic2luZ2xlUGxheWVyIiwibXVsdGlwbGF5ZXIiLCJzaW5nbGVQbGF5ZXJHYW1lIiwibXVsdGlwbGF5ZXJHYW1lIiwiY29tcHV0ZXIiLCJwbGF5ZXJHcmlkcyIsImNvbXB1dGVyR3JpZHMiLCJob21lQnV0dG9uIiwic2hpcHMiLCJjaGVja0VuZCIsIk51bWJlciIsImdldEF0dHJpYnV0ZSIsInRvTG93ZXJDYXNlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNoZWNrUGxheWVySGl0IiwiY29tcHV0ZXJSb3ciLCJjb21wdXRlckNvbHVtbiIsImNoZWNrQ29tcHV0ZXJIaXQiLCJzdG9wUHJvcGFnYXRpb24iLCJwbGF5ZXJPbmUiLCJwbGF5ZXJUd28iLCJwbGF5ZXJPbmVHcmlkcyIsInBsYXllclR3b0dyaWRzIiwiY3VycmVudFBsYXllciIsInRhcmdldFBsYXllciIsImN1cnJlbnRQbGF5ZXJHcmlkcyIsInRhcmdldFBsYXllckdyaWRzIl0sInNvdXJjZVJvb3QiOiIifQ==