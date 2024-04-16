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
  const playerName = 'player-2';
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
/* harmony export */   print: () => (/* binding */ print),
/* harmony export */   renderGameboard: () => (/* binding */ renderGameboard),
/* harmony export */   restartGameboards: () => (/* binding */ restartGameboards),
/* harmony export */   toggleOrientationButton: () => (/* binding */ toggleOrientationButton)
/* harmony export */ });
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



const game = async function () {
  const player = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Player)('player-1');
  const computer = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Computer)();
  const playerGrids = document.querySelectorAll(`[data-player='${player.playerName}']`);
  const computerGrids = document.querySelectorAll(`[data-player='${computer.playerName}']`);
  const restartButton = document.querySelector('#restart');
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
  await (0,_dom__WEBPACK_IMPORTED_MODULE_1__.print)('Place your Carrier.');
  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.toggleOrientationButton)();
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
    if (await checkEnd(player, computer)) {
      Array.from(computerGrids).forEach(grid => grid.removeEventListener('click', attack));
      restartButton.classList.remove('hidden');
      restartButton.addEventListener('click', () => {
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.restartGameboards)();
        game();
        restartButton.classList.add('hidden');
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
    if (await checkEnd(player, computer)) {
      Array.from(computerGrids).forEach(grid => grid.removeEventListener('click', attack));
      restartButton.classList.remove('hidden');
      restartButton.addEventListener('click', () => {
        (0,_dom__WEBPACK_IMPORTED_MODULE_1__.restartGameboards)();
        game();
        restartButton.classList.add('hidden');
      });
      return;
    }
    event.stopPropagation();
  };
  Array.from(playerGrids).forEach(grid => grid.addEventListener('click', placeShip));
};
const checkEnd = async function (player, computer) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game.js");


(0,_game__WEBPACK_IMPORTED_MODULE_1__["default"])();

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

#orientation-container, #message, #restart {
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
  background-color:white;
}

.occupied.hit {
  background-color: red;
}

button.hidden {
  display: none;
}

.unclickable {
  pointer-events: none;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,aAAa;EACb,gDAAgD;AAClD;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,aAAa;EACb,gDAAgD;AAClD;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,oBAAoB;AACtB","sourcesContent":["body {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n#orientation-container, #message, #restart {\n  align-self: center;\n}\n\n#gameboard-container {\n  display: flex;\n  gap: 16px;\n}\n\n#player-1 {\n  width: 90%;\n  aspect-ratio: 1 / 1;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n}\n\n#player-2 {\n  width: 90%;\n  aspect-ratio: 1 / 1;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n}\n\n.grid {\n  border: 1px solid black;\n}\n\n.occupied {\n  background-color: black;\n}\n\n.hit {\n  background-color: blue;\n}\n\n.occupied.hidden {\n  background-color:white;\n}\n\n.occupied.hit {\n  background-color: red;\n}\n\nbutton.hidden {\n  display: none;\n}\n\n.unclickable {\n  pointer-events: none;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcnJheS1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXJyYXlJbmNsdWRlc0FycmF5ID0gZnVuY3Rpb24ocGFyZW50QXJyYXksIGNoaWxkQXJyYXkpIHtcbiAgaWYgKHBhcmVudEFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZmFsc2UgfVxuICBpZiAocGFyZW50QXJyYXlbMF0ubGVuZ3RoICE9PSBjaGlsZEFycmF5Lmxlbmd0aCkge1xuICAgIHBhcmVudEFycmF5ID0gcGFyZW50QXJyYXkuc2xpY2UoMSk7XG4gICAgcmV0dXJuIGFycmF5SW5jbHVkZXNBcnJheShwYXJlbnRBcnJheSwgY2hpbGRBcnJheSk7XG4gIH1cbiAgZm9yIChsZXQgaT0wOyBpPGNoaWxkQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2hpbGRBcnJheVtpXSAhPT0gcGFyZW50QXJyYXlbMF1baV0pIHsgXG4gICAgICBwYXJlbnRBcnJheSA9IHBhcmVudEFycmF5LnNsaWNlKDEpO1xuICAgICAgcmV0dXJuIGFycmF5SW5jbHVkZXNBcnJheShwYXJlbnRBcnJheSwgY2hpbGRBcnJheSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydCB7IGFycmF5SW5jbHVkZXNBcnJheSB9OyIsImltcG9ydCB7IGFycmF5SW5jbHVkZXNBcnJheSB9IGZyb20gXCIuL2FycmF5LXNlYXJjaFwiO1xuXG5jb25zdCBTaGlwID0gZnVuY3Rpb24obGVuZ3RoKSB7XG4gIGxldCBoaXRDb3VudCA9IDA7XG4gIGxldCBzdW5rID0gZmFsc2U7XG5cbiAgY29uc3QgaGl0ID0gZnVuY3Rpb24oKSB7XG4gICAgaGl0Q291bnQgKz0gMTtcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAobGVuZ3RoID09PSBoaXRDb3VudCkge1xuICAgICAgc3VuayA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzdW5rO1xuICB9O1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rIH07XG59XG5cbmNvbnN0IEdhbWVib2FyZCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgc2hpcENvb3JkaW5hdGVzID0gW107XG4gIGxldCByZWNlaXZlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBpc09jY3VwaWVkID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBmb3IgKGxldCBpPTA7IGk8c2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXJyYXlJbmNsdWRlc0FycmF5KHNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgY29vcmRpbmF0ZXMpKSB7XG4gICAgICAgIHJldHVybiBzaGlwQ29vcmRpbmF0ZXNbaV0uc2hpcDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGlzT3V0c2lkZUdhbWVib2FyZCA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKGNvb3JkaW5hdGVzWzBdIDwgMCB8fCBjb29yZGluYXRlc1swXSA+IDkgfHwgY29vcmRpbmF0ZXNbMV0gPCAwIHx8IGNvb3JkaW5hdGVzWzFdID4gOSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihsZW5ndGgsIHN0YXJ0Q29vcmQsIG9yaWVudGF0aW9uKSB7XG4gICAgY29uc3QgbmV3U2hpcCA9IFNoaXAobGVuZ3RoKTtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbc3RhcnRDb29yZF07XG4gICAgbGV0IGNsYXNoaW5nU2hpcHMgPSBmYWxzZTtcbiAgXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGk9MDsgKGk8bGVuZ3RoICYmIGNsYXNoaW5nU2hpcHMgPT09IGZhbHNlKTsgaSsrKSB7XG4gICAgICAgIGlmIChpc09jY3VwaWVkKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChpc091dHNpZGVHYW1lYm9hcmQoW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGk9MTsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpPTA7IChpPGxlbmd0aCAmJiBjbGFzaGluZ1NoaXBzID09PSBmYWxzZSk7IGkrKykge1xuICAgICAgICBpZiAoaXNPY2N1cGllZChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoaXNPdXRzaWRlR2FtZWJvYXJkKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpPTE7IGk8bGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaCh7IHNoaXA6IG5ld1NoaXAsIGNvb3JkaW5hdGVzIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGNvbnN0IHNoaXAgPSBpc09jY3VwaWVkKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoc2hpcCAhPT0gZmFsc2UpIHtcbiAgICAgIHNoaXAuaGl0KCk7XG4gICAgfVxuICAgIHJlY2VpdmVkQXR0YWNrcy5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICBjb25zdCBpc0FsbFN1bmsgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaTxzaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChzaGlwQ29vcmRpbmF0ZXNbaV0uc2hpcC5pc1N1bmsoKSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgc2hpcENvb3JkaW5hdGVzLCByZWNlaXZlZEF0dGFja3MsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgaXNBbGxTdW5rIH07XG59O1xuXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICBjb25zdCBwbGF5ZXJHYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbih0YXJnZXQsIGNvb3JkaW5hdGVzKSB7XG4gICAgdGFyZ2V0LnBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJOYW1lLCBwbGF5ZXJHYW1lYm9hcmQsIGF0dGFjayB9O1xufTtcblxuY29uc3QgQ29tcHV0ZXIgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgcGxheWVyTmFtZSA9ICdwbGF5ZXItMic7XG4gIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICBjb25zdCBhdHRhY2tDb29yZGluYXRlcyA9IFtdO1xuXG4gIGNvbnN0IHJhbmRvbUF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoYXR0YWNrQ29vcmRpbmF0ZXMsIFtyb3csIGNvbHVtbl0pKSB7IGNvbnRpbnVlIH1cbiAgICAgIHRhcmdldC5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbcm93LCBjb2x1bW5dKTtcbiAgICAgIGF0dGFja0Nvb3JkaW5hdGVzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICByZXR1cm4gW3JvdywgY29sdW1uXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmFuZG9tUGxhY2VTaGlwcyA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xuICAgIGNvbnN0IG9yaWVudGF0aW9ucyA9IFsnaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCddO1xuICAgIGxldCBpID0gMDtcblxuICAgIHdoaWxlIChwbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aCA8IDUpIHtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gb3JpZW50YXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NmdWxQbGFjZW1lbnQgPSBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKHNoaXBMZW5ndGhzW2ldLCBbcm93LCBjb2x1bW5dLCBvcmllbnRhdGlvbik7XG4gICAgICBpZiAoc3VjY2Vzc2Z1bFBsYWNlbWVudCkgeyBpICs9IDEgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJOYW1lLCBwbGF5ZXJHYW1lYm9hcmQsIHJhbmRvbUF0dGFjaywgcmFuZG9tUGxhY2VTaGlwcyB9O1xufVxuXG5leHBvcnQgeyBTaGlwLCBHYW1lYm9hcmQsIFBsYXllciwgQ29tcHV0ZXIgfTsiLCJjb25zdCByZW5kZXJHYW1lYm9hcmQgPSBmdW5jdGlvbihwbGF5ZXIsIGhpZGRlbikge1xuICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqPTA7IGo8cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1wbGF5ZXI9JyR7cGxheWVyLnBsYXllck5hbWV9J11bZGF0YS1yb3c9JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXNbal1bMF19J11bZGF0YS1jb2x1bW49JyR7cGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXNbal1bMV19J11gKTtcbiAgICAgIGlmICghZ3JpZC5jbGFzc0xpc3QuY29udGFpbnMoJ29jY3VwaWVkJykpIHtncmlkLmNsYXNzTGlzdC5hZGQoJ29jY3VwaWVkJyl9O1xuICAgICAgaWYgKGhpZGRlbikge2dyaWQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyl9O1xuICAgIH1cbiAgfVxuICBmb3IgKGxldCBpPTA7IGk8cGxheWVyLnBsYXllckdhbWVib2FyZC5yZWNlaXZlZEF0dGFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcGxheWVyPScke3BsYXllci5wbGF5ZXJOYW1lfSddW2RhdGEtcm93PScke3BsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzW2ldWzBdfSddW2RhdGEtY29sdW1uPScke3BsYXllci5wbGF5ZXJHYW1lYm9hcmQucmVjZWl2ZWRBdHRhY2tzW2ldWzFdfSddYCk7XG4gICAgZ3JpZC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgfVxufTtcblxuY29uc3QgcHJpbnQgPSBhc3luYyBmdW5jdGlvbihtZXNzYWdlLCBhZnRlckRlbGF5KSB7XG4gIGNvbnN0IGdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQnKTtcbiAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJyk7XG4gIGNvbnN0IG1lc3NhZ2VDaGFyYWN0ZXJzID0gbWVzc2FnZS5zcGxpdCgnJyk7XG5cbiAgQXJyYXkuZnJvbShncmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge2dyaWQuY2xhc3NMaXN0LmFkZCgndW5jbGlja2FibGUnKX0pO1xuICBtZXNzYWdlQ29udGFpbmVyLnRleHRDb250ZW50ID0gJyc7XG5cbiAgZm9yIChsZXQgaT0wOyBpPG1lc3NhZ2VDaGFyYWN0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMzApKTtcbiAgICBtZXNzYWdlQ29udGFpbmVyLnRleHRDb250ZW50ICs9IG1lc3NhZ2VDaGFyYWN0ZXJzW2ldO1xuICB9XG4gIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIGFmdGVyRGVsYXkpKTtcbiAgQXJyYXkuZnJvbShncmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4ge2dyaWQuY2xhc3NMaXN0LnJlbW92ZSgndW5jbGlja2FibGUnKX0pO1xufTtcblxuY29uc3QgdG9nZ2xlT3JpZW50YXRpb25CdXR0b24gPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgb3JpZW50YXRpb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKTtcbiAgb3JpZW50YXRpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID09PSAnSG9yaXpvbnRhbCcpIHtcbiAgICAgIGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9ICdWZXJ0aWNhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9ICdIb3Jpem9udGFsJztcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgcmVzdGFydEdhbWVib2FyZHMgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgZ3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZCcpO1xuXG4gIEFycmF5LmZyb20oZ3JpZHMpLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ29jY3VwaWVkJyk7XG4gICAgZ3JpZC5jbGFzc0xpc3QucmVtb3ZlKCdoaXQnKTtcbiAgICBncmlkLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICB9KTtcbiB9O1xuXG5leHBvcnQgeyByZW5kZXJHYW1lYm9hcmQsIHByaW50LCB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiwgcmVzdGFydEdhbWVib2FyZHMgfTsiLCJpbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCB7IHJlbmRlckdhbWVib2FyZCwgcHJpbnQsIHRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uLCByZXN0YXJ0R2FtZWJvYXJkcyB9IGZyb20gJy4vZG9tJztcbmltcG9ydCB7IGFycmF5SW5jbHVkZXNBcnJheSB9IGZyb20gJy4vYXJyYXktc2VhcmNoJztcblxuY29uc3QgZ2FtZSA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoJ3BsYXllci0xJyk7XG4gIGNvbnN0IGNvbXB1dGVyID0gQ29tcHV0ZXIoKTtcbiAgY29uc3QgcGxheWVyR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1wbGF5ZXI9JyR7cGxheWVyLnBsYXllck5hbWV9J11gKTtcbiAgY29uc3QgY29tcHV0ZXJHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXBsYXllcj0nJHtjb21wdXRlci5wbGF5ZXJOYW1lfSddYCk7XG4gIGNvbnN0IHJlc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdGFydCcpO1xuICBjb25zdCBzaGlwcyA9IFt7bGVuZ3RoOiA1LCBuYW1lOiAnQ2Fycmllcid9LCB7bGVuZ3RoOiA0LCBuYW1lOiAnQmF0dGxlc2hpcCd9LCB7bGVuZ3RoOiAzLCBuYW1lOiAnRGVzdHJveWVyJ30sIHtsZW5ndGg6IDMsIG5hbWU6ICdTdWJtYXJpbmUnfSwge2xlbmd0aDogMiwgbmFtZTogJ1BhdHJvbCBCb2F0J31dO1xuICBsZXQgaSA9IDA7XG5cbiAgYXdhaXQgcHJpbnQoJ1BsYWNlIHlvdXIgQ2Fycmllci4nKTtcbiAgdG9nZ2xlT3JpZW50YXRpb25CdXR0b24oKTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBhc3luYyBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWxQbGFjZW1lbnQgPSBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwc1tpXS5sZW5ndGgsIFtyb3csIGNvbHVtbl0sIG9yaWVudGF0aW9uKTtcbiAgICBpZiAoIXN1Y2Nlc3NmdWxQbGFjZW1lbnQpIHJldHVybjtcbiAgICByZW5kZXJHYW1lYm9hcmQocGxheWVyLCBmYWxzZSk7XG4gICAgaSArPSAxO1xuXG4gICAgaWYgKGk8NSkge1xuICAgICAgYXdhaXQgcHJpbnQoYFBsYWNlIHlvdXIgJHtzaGlwc1tpXS5uYW1lfS5gLCAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBBcnJheS5mcm9tKHBsYXllckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxhY2VTaGlwKSk7XG4gICAgYXdhaXQgcHJpbnQoJ0NvbXB1dGVyIHBsYWNpbmcgc2hpcHMuLi4nLCA2MDApO1xuICAgIGNvbXB1dGVyLnJhbmRvbVBsYWNlU2hpcHMoKTtcbiAgICByZW5kZXJHYW1lYm9hcmQoY29tcHV0ZXIsIHRydWUpO1xuICAgIGF3YWl0IHByaW50KCdZb3VyIHR1cm4gdG8gYXR0YWNrLicsIDApO1xuXG4gICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gIH07XG5cbiAgY29uc3QgYXR0YWNrID0gYXN5bmMgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKSk7XG4gICAgY29uc3QgY29sdW1uID0gTnVtYmVyKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sdW1uJykpO1xuICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnJlY2VpdmVkQXR0YWNrcywgW3JvdywgY29sdW1uXSkpIHsgXG4gICAgICBhd2FpdCBwcmludCgnWW91IGFscmVhZHkgYXR0YWNrZWQgdGhpcyBzcG90LiBZb3VyIHR1cm4gdG8gYXR0YWNrLicsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyLCBbcm93LCBjb2x1bW5dKTtcbiAgICByZW5kZXJHYW1lYm9hcmQoY29tcHV0ZXIsIHRydWUpO1xuICAgIGNoZWNrUGxheWVySGl0OiBcbiAgICAgIGZvciAobGV0IGk9MDsgaTxjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcywgW3JvdywgY29sdW1uXSkpIHtcbiAgICAgICAgICBpZiAoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmludCgnWW91IHN1bmsgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgICBicmVhayBjaGVja1BsYXllckhpdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXdhaXQgcHJpbnQoJ1lvdSBoaXQgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgYnJlYWsgY2hlY2tQbGF5ZXJIaXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IGNvbXB1dGVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGF3YWl0IHByaW50KCdZb3UgbWlzc2VkLicsIDQwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBcbiAgICBpZiAoYXdhaXQgY2hlY2tFbmQocGxheWVyLCBjb21wdXRlcikpIHtcbiAgICAgICBBcnJheS5mcm9tKGNvbXB1dGVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcbiAgICAgICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gICAgICByZXN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXN0YXJ0R2FtZWJvYXJkcygpO1xuICAgICAgICBnYW1lKCk7XG4gICAgICAgIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIEFycmF5LmZyb20oY29tcHV0ZXJHcmlkcykuZm9yRWFjaCgoZ3JpZCkgPT4gZ3JpZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGF0dGFjaykpO1xuICAgIGF3YWl0IHByaW50KCdFbmVteSBpcyBhdHRhY2tpbmcuLi4nLCAzMDApO1xuICAgIGNvbnN0IFtjb21wdXRlclJvdywgY29tcHV0ZXJDb2x1bW5dID0gY29tcHV0ZXIucmFuZG9tQXR0YWNrKHBsYXllcik7XG4gICAgcmVuZGVyR2FtZWJvYXJkKHBsYXllciwgZmFsc2UpO1xuICAgIGNoZWNrQ29tcHV0ZXJIaXQ6IFxuICAgICAgZm9yIChsZXQgaT0wOyBpPHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuc2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJheUluY2x1ZGVzQXJyYXkocGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXMsIFtjb21wdXRlclJvdywgY29tcHV0ZXJDb2x1bW5dKSkge1xuICAgICAgICAgIGlmIChwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICBhd2FpdCBwcmludCgnRW5lbXkgc3VuayBhIHNoaXAhJywgNDAwKTtcbiAgICAgICAgICAgIGJyZWFrIGNoZWNrQ29tcHV0ZXJIaXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGF3YWl0IHByaW50KCdFbmVteSBoaXQgYSBzaGlwIScsIDQwMCk7XG4gICAgICAgICAgYnJlYWsgY2hlY2tDb21wdXRlckhpdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gcGxheWVyLnBsYXllckdhbWVib2FyZC5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGF3YWl0IHByaW50KCdFbmVteSBtaXNzZWQuJywgNDAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgYXdhaXQgcHJpbnQoJ1lvdXIgdHVybiB0byBhdHRhY2suJywgMClcbiAgICBBcnJheS5mcm9tKGNvbXB1dGVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhdHRhY2spKTtcblxuICAgIGlmIChhd2FpdCBjaGVja0VuZChwbGF5ZXIsIGNvbXB1dGVyKSkge1xuICAgICAgQXJyYXkuZnJvbShjb21wdXRlckdyaWRzKS5mb3JFYWNoKChncmlkKSA9PiBncmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrKSk7XG4gICAgICByZXN0YXJ0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuXG4gICAgICByZXN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICByZXN0YXJ0R2FtZWJvYXJkcygpO1xuICAgICAgICBnYW1lKCk7XG4gICAgICAgIHJlc3RhcnRCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9O1xuXG4gIEFycmF5LmZyb20ocGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbn07XG5cbmNvbnN0IGNoZWNrRW5kID0gYXN5bmMgZnVuY3Rpb24ocGxheWVyLCBjb21wdXRlcikge1xuICBpZiAocGxheWVyLnBsYXllckdhbWVib2FyZC5pc0FsbFN1bmsoKSkge1xuICAgIGF3YWl0IHByaW50KCdDb21wdXRlciB3aW5zLicsIDApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICBhd2FpdCBwcmludCgnUGxheWVyIHdpbnMuJywgMCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lOyIsImltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lJztcblxuZ2FtZSgpOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGBib2R5IHtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogOHB4O1xufVxuXG4jb3JpZW50YXRpb24tY29udGFpbmVyLCAjbWVzc2FnZSwgI3Jlc3RhcnQge1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG59XG5cbiNnYW1lYm9hcmQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxNnB4O1xufVxuXG4jcGxheWVyLTEge1xuICB3aWR0aDogOTAlO1xuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XG59XG5cbiNwbGF5ZXItMiB7XG4gIHdpZHRoOiA5MCU7XG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMWZyKSAvIHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLmdyaWQge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLm9jY3VwaWVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG59XG5cbi5oaXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xufVxuXG4ub2NjdXBpZWQuaGlkZGVuIHtcbiAgYmFja2dyb3VuZC1jb2xvcjp3aGl0ZTtcbn1cblxuLm9jY3VwaWVkLmhpdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuYnV0dG9uLmhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi51bmNsaWNrYWJsZSB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsU0FBUztBQUNYOztBQUVBO0VBQ0UsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsZ0RBQWdEO0FBQ2xEOztBQUVBO0VBQ0UsVUFBVTtFQUNWLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsZ0RBQWdEO0FBQ2xEOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDhweDtcXG59XFxuXFxuI29yaWVudGF0aW9uLWNvbnRhaW5lciwgI21lc3NhZ2UsICNyZXN0YXJ0IHtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuI2dhbWVib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTZweDtcXG59XFxuXFxuI3BsYXllci0xIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMWZyKSAvIHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuI3BsYXllci0yIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMWZyKSAvIHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmdyaWQge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5vY2N1cGllZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ub2NjdXBpZWQuaGlkZGVuIHtcXG4gIGJhY2tncm91bmQtY29sb3I6d2hpdGU7XFxufVxcblxcbi5vY2N1cGllZC5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG5cXG5idXR0b24uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi51bmNsaWNrYWJsZSB7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJhcnJheUluY2x1ZGVzQXJyYXkiLCJwYXJlbnRBcnJheSIsImNoaWxkQXJyYXkiLCJsZW5ndGgiLCJzbGljZSIsImkiLCJTaGlwIiwiaGl0Q291bnQiLCJzdW5rIiwiaGl0IiwiaXNTdW5rIiwiR2FtZWJvYXJkIiwic2hpcENvb3JkaW5hdGVzIiwicmVjZWl2ZWRBdHRhY2tzIiwiaXNPY2N1cGllZCIsImNvb3JkaW5hdGVzIiwic2hpcCIsImlzT3V0c2lkZUdhbWVib2FyZCIsInBsYWNlU2hpcCIsInN0YXJ0Q29vcmQiLCJvcmllbnRhdGlvbiIsIm5ld1NoaXAiLCJjbGFzaGluZ1NoaXBzIiwicHVzaCIsInJlY2VpdmVBdHRhY2siLCJpc0FsbFN1bmsiLCJQbGF5ZXIiLCJuYW1lIiwicGxheWVyTmFtZSIsInBsYXllckdhbWVib2FyZCIsImF0dGFjayIsInRhcmdldCIsIkNvbXB1dGVyIiwiYXR0YWNrQ29vcmRpbmF0ZXMiLCJyYW5kb21BdHRhY2siLCJyb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJyYW5kb21QbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJvcmllbnRhdGlvbnMiLCJzdWNjZXNzZnVsUGxhY2VtZW50IiwicmVuZGVyR2FtZWJvYXJkIiwicGxheWVyIiwiaGlkZGVuIiwiaiIsImdyaWQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImFkZCIsInByaW50IiwibWVzc2FnZSIsImFmdGVyRGVsYXkiLCJncmlkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJtZXNzYWdlQ29udGFpbmVyIiwibWVzc2FnZUNoYXJhY3RlcnMiLCJzcGxpdCIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJ0ZXh0Q29udGVudCIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsInJlbW92ZSIsInRvZ2dsZU9yaWVudGF0aW9uQnV0dG9uIiwib3JpZW50YXRpb25CdXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJyZXN0YXJ0R2FtZWJvYXJkcyIsImdhbWUiLCJjb21wdXRlciIsInBsYXllckdyaWRzIiwiY29tcHV0ZXJHcmlkcyIsInJlc3RhcnRCdXR0b24iLCJzaGlwcyIsIk51bWJlciIsImdldEF0dHJpYnV0ZSIsInRvTG93ZXJDYXNlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNoZWNrUGxheWVySGl0IiwiY2hlY2tFbmQiLCJjb21wdXRlclJvdyIsImNvbXB1dGVyQ29sdW1uIiwiY2hlY2tDb21wdXRlckhpdCIsInN0b3BQcm9wYWdhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=