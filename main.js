"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["main"],{

/***/ "./src/components.js":
/*!***************************!*\
  !*** ./src/components.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard),
/* harmony export */   Player: () => (/* binding */ Player),
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");

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
  let missedAttacks = [];
  const isOccupied = function (coordinates) {
    for (let i = 0; i < shipCoordinates.length; i++) {
      for (let j = 0; j < shipCoordinates[i].coordinates.length; j++) {
        if (shipCoordinates[i].coordinates[j][0] === coordinates[0] && shipCoordinates[i].coordinates[j][1] === coordinates[1]) {
          return shipCoordinates[i].ship;
        }
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
      return;
    }
    missedAttacks.push(coordinates);
  };
  const isAllSunk = function () {
    for (let i = 0; i < shipCoordinates.length; i++) {
      if (shipCoordinates[i].ship.isSunk() === false) return false;
    }
    return true;
  };
  const getCoordinates = function () {
    let coordinates = [];
    for (let i = 0; i < shipCoordinates.length; i++) {
      for (let j = 0; j < shipCoordinates[i].coordinates.length; j++) {
        coordinates.push(shipCoordinates[i].coordinates[j]);
      }
    }
    return coordinates;
  };
  return {
    shipCoordinates,
    placeShip,
    receiveAttack,
    isAllSunk,
    getCoordinates
  };
};
const Player = function () {
  const playerGameboard = Gameboard();
  let attackCoordinates = [];
  const attack = function (targetGameboard, coordinates) {
    for (let i = 0; i < attackCoordinates.length; i++) {
      if (attackCoordinates[i][0] === coordinates[0] && attackCoordinates[i][1] === coordinates[1]) return;
    }
    targetGameboard.receiveAttack(coordinates);
    attackCoordinates.push(coordinates);
  };
  const randomAttack = function (targetGameboard) {
    while (true) {
      let noDuplicates = true;
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      for (let i = 0; i < attackCoordinates.length; i++) {
        if (attackCoordinates[i][0] === row && attackCoordinates[i][1] === column) {
          noDuplicates = false;
        }
        ;
      }
      if (!noDuplicates) {
        continue;
      }
      targetGameboard.receiveAttack([row, column]);
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
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderGameboard)('player-2', playerGameboard.getCoordinates(), true);
  };
  return {
    playerGameboard,
    attack,
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
/* harmony export */   makeGameboardAttackable: () => (/* binding */ makeGameboardAttackable),
/* harmony export */   placeShips: () => (/* binding */ placeShips),
/* harmony export */   renderGameboard: () => (/* binding */ renderGameboard)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");

const renderGameboard = function (player, coordinates, hidden) {
  for (let i = 0; i < coordinates.length; i++) {
    const grid = document.querySelector(`[data-player='${player}'][data-row='${coordinates[i][0]}'][data-column='${coordinates[i][1]}']`);
    if (!grid.classList.contains('occupied') && !hidden) {
      grid.classList.add('occupied');
    }
    ;
  }
};
const makeGameboardAttackable = function (player, computer) {
  const computerGameboard = document.querySelector('#player-2');
  const attackEvent = function (event) {
    if (event.target.classList.contains('attacked') || event.target.id === 'player-2') {
      return;
    }
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    player.attack(computer.playerGameboard, [row, column]);
    event.target.classList.add('attacked');
    const [computerRow, computerColumn] = computer.randomAttack(player.playerGameboard);
    const playerGrid = document.querySelector(`[data-player='player-1'][data-row='${computerRow}'][data-column='${computerColumn}']`);
    playerGrid.classList.add('attacked');
    if ((0,_game__WEBPACK_IMPORTED_MODULE_0__.checkEnd)(player, computer) !== false) {
      computerGameboard.removeEventListener('click', attackEvent);
      return;
    }
  };
  computerGameboard.addEventListener('click', attackEvent);
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
const placeShips = function (player, computer) {
  toggleOrientationButton();
  const playerGrids = document.querySelectorAll('[data-player="player-1"]');
  const shipLengths = [5, 4, 3, 3, 2];
  let i = 0;
  const placeShip = function (event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const successfulPlacement = player.playerGameboard.placeShip(shipLengths[i], [row, column], orientation);
    if (!successfulPlacement) return;
    renderGameboard('player-1', player.playerGameboard.getCoordinates());
    i += 1;
    if (i === 5) {
      Array.from(playerGrids).forEach(grid => grid.removeEventListener('click', placeShip));
      computer.randomPlaceShips();
      makeGameboardAttackable(player, computer);
    }
  };
  Array.from(playerGrids).forEach(grid => grid.addEventListener('click', placeShip));
};


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkEnd: () => (/* binding */ checkEnd),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/components.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


const game = function () {
  const player = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Player)();
  const computer = (0,_components__WEBPACK_IMPORTED_MODULE_0__.Player)();
  (0,_dom__WEBPACK_IMPORTED_MODULE_1__.placeShips)(player, computer);
};
const checkEnd = function (player, computer) {
  if (player.playerGameboard.isAllSunk()) {
    console.log('Computer wins!');
    return true;
  }
  if (computer.playerGameboard.isAllSunk()) {
    console.log('Player wins!');
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

#orientation-container {
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

.attacked {
  background-color: red;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,aAAa;EACb,UAAU;EACV,SAAS;EACT,sBAAsB;EACtB,aAAa;EACb,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,aAAa;EACb,gDAAgD;AAClD;;AAEA;EACE,UAAU;EACV,mBAAmB;EACnB,aAAa;EACb,gDAAgD;AAClD;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,qBAAqB;AACvB","sourcesContent":["body {\n  width: 100vw;\n  height: 100vh;\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n#orientation-container {\n  align-self: center;\n}\n\n#gameboard-container {\n  display: flex;\n  gap: 16px;\n}\n\n#player-1 {\n  width: 90%;\n  aspect-ratio: 1 / 1;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n}\n\n#player-2 {\n  width: 90%;\n  aspect-ratio: 1 / 1;\n  display: grid;\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\n}\n\n.grid {\n  border: 1px solid black;\n}\n\n.occupied {\n  background-color: black;\n}\n\n.attacked {\n  background-color: red;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixHQUFHLENBQUk7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyR2FtZWJvYXJkIH0gZnJvbSBcIi4vZG9tXCI7XG5cbmNvbnN0IFNoaXAgPSBmdW5jdGlvbihsZW5ndGgpIHtcbiAgbGV0IGhpdENvdW50ID0gMDtcbiAgbGV0IHN1bmsgPSBmYWxzZTtcblxuICBjb25zdCBoaXQgPSBmdW5jdGlvbigpIHtcbiAgICBoaXRDb3VudCArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChsZW5ndGggPT09IGhpdENvdW50KSB7XG4gICAgICBzdW5rID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bms7XG4gIH07XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmsgfTtcbn1cblxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24oKSB7XG4gIGxldCBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbiAgbGV0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBpc09jY3VwaWVkID0gZnVuY3Rpb24oY29vcmRpbmF0ZXMpIHtcbiAgICBmb3IgKGxldCBpPTA7IGk8c2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqPTA7IGo8c2hpcENvb3JkaW5hdGVzW2ldLmNvb3JkaW5hdGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChzaGlwQ29vcmRpbmF0ZXNbaV0uY29vcmRpbmF0ZXNbal1bMF0gPT09IGNvb3JkaW5hdGVzWzBdICYmIHNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXVsxXSA9PT0gY29vcmRpbmF0ZXNbMV0pIHtcbiAgICAgICAgICByZXR1cm4gc2hpcENvb3JkaW5hdGVzW2ldLnNoaXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGlzT3V0c2lkZUdhbWVib2FyZCA9IGZ1bmN0aW9uKGNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKGNvb3JkaW5hdGVzWzBdIDwgMCB8fCBjb29yZGluYXRlc1swXSA+IDkgfHwgY29vcmRpbmF0ZXNbMV0gPCAwIHx8IGNvb3JkaW5hdGVzWzFdID4gOSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihsZW5ndGgsIHN0YXJ0Q29vcmQsIG9yaWVudGF0aW9uKSB7XG4gICAgY29uc3QgbmV3U2hpcCA9IFNoaXAobGVuZ3RoKTtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBbc3RhcnRDb29yZF07XG4gICAgbGV0IGNsYXNoaW5nU2hpcHMgPSBmYWxzZTtcbiAgXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIGZvciAobGV0IGk9MDsgKGk8bGVuZ3RoICYmIGNsYXNoaW5nU2hpcHMgPT09IGZhbHNlKTsgaSsrKSB7XG4gICAgICAgIGlmIChpc09jY3VwaWVkKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChpc091dHNpZGVHYW1lYm9hcmQoW3N0YXJ0Q29vcmRbMF0sIHN0YXJ0Q29vcmRbMV0gKyBpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGk9MTsgaTxsZW5ndGg7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtzdGFydENvb3JkWzBdLCBzdGFydENvb3JkWzFdICsgaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpPTA7IChpPGxlbmd0aCAmJiBjbGFzaGluZ1NoaXBzID09PSBmYWxzZSk7IGkrKykge1xuICAgICAgICBpZiAoaXNPY2N1cGllZChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoaXNPdXRzaWRlR2FtZWJvYXJkKFtzdGFydENvb3JkWzBdICsgaSwgc3RhcnRDb29yZFsxXV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpPTE7IGk8bGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbc3RhcnRDb29yZFswXSArIGksIHN0YXJ0Q29vcmRbMV1dKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzaGlwQ29vcmRpbmF0ZXMucHVzaCh7IHNoaXA6IG5ld1NoaXAsIGNvb3JkaW5hdGVzIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbihjb29yZGluYXRlcykge1xuICAgIGNvbnN0IHNoaXAgPSBpc09jY3VwaWVkKGNvb3JkaW5hdGVzKTtcbiAgICBpZiAoc2hpcCAhPT0gZmFsc2UpIHtcbiAgICAgIHNoaXAuaGl0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG1pc3NlZEF0dGFja3MucHVzaChjb29yZGluYXRlcyk7XG4gIH07XG5cbiAgY29uc3QgaXNBbGxTdW5rID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGk8c2hpcENvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc2hpcENvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGdldENvb3JkaW5hdGVzID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gW107XG4gICAgZm9yIChsZXQgaT0wOyBpPHNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaj0wOyBqPHNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHNoaXBDb29yZGluYXRlc1tpXS5jb29yZGluYXRlc1tqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuXG4gIHJldHVybiB7IHNoaXBDb29yZGluYXRlcywgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBpc0FsbFN1bmssIGdldENvb3JkaW5hdGVzIH07XG59O1xuXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gIGxldCBhdHRhY2tDb29yZGluYXRlcyA9IFtdO1xuXG4gIGNvbnN0IGF0dGFjayA9IGZ1bmN0aW9uKHRhcmdldEdhbWVib2FyZCwgY29vcmRpbmF0ZXMpIHtcbiAgICBmb3IgKGxldCBpPTA7IGk8YXR0YWNrQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhdHRhY2tDb29yZGluYXRlc1tpXVswXSA9PT0gY29vcmRpbmF0ZXNbMF0gJiYgYXR0YWNrQ29vcmRpbmF0ZXNbaV1bMV0gPT09IGNvb3JkaW5hdGVzWzFdKSByZXR1cm47XG4gICAgfVxuICAgIHRhcmdldEdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKTtcbiAgICBhdHRhY2tDb29yZGluYXRlcy5wdXNoKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICBjb25zdCByYW5kb21BdHRhY2sgPSBmdW5jdGlvbih0YXJnZXRHYW1lYm9hcmQpIHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgbGV0IG5vRHVwbGljYXRlcyA9IHRydWU7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgIGZvciAobGV0IGk9MDsgaTxhdHRhY2tDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXR0YWNrQ29vcmRpbmF0ZXNbaV1bMF0gPT09IHJvdyAmJiBhdHRhY2tDb29yZGluYXRlc1tpXVsxXSA9PT0gY29sdW1uKSB7bm9EdXBsaWNhdGVzID0gZmFsc2V9O1xuICAgICAgfVxuICAgICAgaWYgKCFub0R1cGxpY2F0ZXMpIHsgY29udGludWUgfVxuICAgICAgdGFyZ2V0R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW3JvdywgY29sdW1uXSk7XG4gICAgICBhdHRhY2tDb29yZGluYXRlcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgcmV0dXJuIFtyb3csIGNvbHVtbl07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHJhbmRvbVBsYWNlU2hpcHMgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgICBjb25zdCBvcmllbnRhdGlvbnMgPSBbJ2hvcml6b250YWwnLCAndmVydGljYWwnXTtcbiAgICBsZXQgaSA9IDA7XG5cbiAgICB3aGlsZSAocGxheWVyR2FtZWJvYXJkLnNoaXBDb29yZGluYXRlcy5sZW5ndGggPCA1KSB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgICBjb25zdCBzdWNjZXNzZnVsUGxhY2VtZW50ID0gcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3Roc1tpXSwgW3JvdywgY29sdW1uXSwgb3JpZW50YXRpb24pO1xuICAgICAgaWYgKHN1Y2Nlc3NmdWxQbGFjZW1lbnQpIHsgaSArPSAxIH1cbiAgICB9XG4gICAgcmVuZGVyR2FtZWJvYXJkKCdwbGF5ZXItMicsIHBsYXllckdhbWVib2FyZC5nZXRDb29yZGluYXRlcygpLCB0cnVlKTtcbiAgfTtcblxuICByZXR1cm4geyBwbGF5ZXJHYW1lYm9hcmQsIGF0dGFjaywgcmFuZG9tQXR0YWNrLCByYW5kb21QbGFjZVNoaXBzIH07XG59XG5cbmV4cG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyIH07IiwiaW1wb3J0IHsgY2hlY2tFbmQgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmNvbnN0IHJlbmRlckdhbWVib2FyZCA9IGZ1bmN0aW9uKHBsYXllciwgY29vcmRpbmF0ZXMsIGhpZGRlbikge1xuICBmb3IgKGxldCBpPTA7IGk8Y29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtcGxheWVyPScke3BsYXllcn0nXVtkYXRhLXJvdz0nJHtjb29yZGluYXRlc1tpXVswXX0nXVtkYXRhLWNvbHVtbj0nJHtjb29yZGluYXRlc1tpXVsxXX0nXWApO1xuICAgIGlmICghZ3JpZC5jbGFzc0xpc3QuY29udGFpbnMoJ29jY3VwaWVkJykgJiYgIWhpZGRlbikge2dyaWQuY2xhc3NMaXN0LmFkZCgnb2NjdXBpZWQnKX07XG4gIH1cbn1cblxuY29uc3QgbWFrZUdhbWVib2FyZEF0dGFja2FibGUgPSBmdW5jdGlvbihwbGF5ZXIsIGNvbXB1dGVyKSB7XG4gIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci0yJyk7XG5cbiAgY29uc3QgYXR0YWNrRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhdHRhY2tlZCcpIHx8IChldmVudC50YXJnZXQuaWQgPT09ICdwbGF5ZXItMicpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgcGxheWVyLmF0dGFjayhjb21wdXRlci5wbGF5ZXJHYW1lYm9hcmQsIFtyb3csIGNvbHVtbl0pO1xuICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhdHRhY2tlZCcpO1xuXG4gICAgY29uc3QgW2NvbXB1dGVyUm93LCBjb21wdXRlckNvbHVtbl0gPSBjb21wdXRlci5yYW5kb21BdHRhY2socGxheWVyLnBsYXllckdhbWVib2FyZCk7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXBsYXllcj0ncGxheWVyLTEnXVtkYXRhLXJvdz0nJHtjb21wdXRlclJvd30nXVtkYXRhLWNvbHVtbj0nJHtjb21wdXRlckNvbHVtbn0nXWApO1xuICAgIHBsYXllckdyaWQuY2xhc3NMaXN0LmFkZCgnYXR0YWNrZWQnKTtcblxuICAgIGlmIChjaGVja0VuZChwbGF5ZXIsIGNvbXB1dGVyKSAhPT0gZmFsc2UpIHtcbiAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrRXZlbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGNvbXB1dGVyR2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXR0YWNrRXZlbnQpO1xuXG59O1xuXG5jb25zdCB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbiA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBvcmllbnRhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNvcmllbnRhdGlvbicpO1xuICBvcmllbnRhdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGlmIChldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT09ICdIb3Jpem9udGFsJykge1xuICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gJ1ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnQudGFyZ2V0LnRleHRDb250ZW50ID0gJ0hvcml6b250YWwnO1xuICAgIH1cbiAgfSk7XG59O1xuXG5jb25zdCBwbGFjZVNoaXBzID0gZnVuY3Rpb24ocGxheWVyLCBjb21wdXRlcikge1xuICB0b2dnbGVPcmllbnRhdGlvbkJ1dHRvbigpO1xuXG4gIGNvbnN0IHBsYXllckdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxheWVyPVwicGxheWVyLTFcIl0nKTtcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XG4gIGxldCBpID0gMDtcblxuICBjb25zdCBwbGFjZVNoaXAgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHJvdyA9IE51bWJlcihldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpKTtcbiAgICBjb25zdCBjb2x1bW4gPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2x1bW4nKSk7XG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3JpZW50YXRpb24nKS50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWxQbGFjZW1lbnQgPSBwbGF5ZXIucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3Roc1tpXSwgW3JvdywgY29sdW1uXSwgb3JpZW50YXRpb24pO1xuXG4gICAgaWYgKCFzdWNjZXNzZnVsUGxhY2VtZW50KSByZXR1cm47XG4gICAgcmVuZGVyR2FtZWJvYXJkKCdwbGF5ZXItMScsIHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuZ2V0Q29vcmRpbmF0ZXMoKSk7XG4gICAgaSArPSAxO1xuXG4gICAgaWYgKGkgPT09IDUpIHtcbiAgICAgIEFycmF5LmZyb20ocGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcbiAgICAgIGNvbXB1dGVyLnJhbmRvbVBsYWNlU2hpcHMoKTtcbiAgICAgIG1ha2VHYW1lYm9hcmRBdHRhY2thYmxlKHBsYXllciwgY29tcHV0ZXIpO1xuICAgIH1cbiAgfVxuXG4gIEFycmF5LmZyb20ocGxheWVyR3JpZHMpLmZvckVhY2goKGdyaWQpID0+IGdyaWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXApKTtcblxufTtcblxuZXhwb3J0IHsgcmVuZGVyR2FtZWJvYXJkLCBtYWtlR2FtZWJvYXJkQXR0YWNrYWJsZSwgcGxhY2VTaGlwcyB9OyIsImltcG9ydCB7IFNoaXAsIEdhbWVib2FyZCwgUGxheWVyIH0gZnJvbSAnLi9jb21wb25lbnRzJztcbmltcG9ydCB7IHJlbmRlckdhbWVib2FyZCwgbWFrZUdhbWVib2FyZEF0dGFja2FibGUsIHBsYWNlU2hpcHMsIH0gZnJvbSAnLi9kb20nO1xuXG5jb25zdCBnYW1lID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHBsYXllciA9IFBsYXllcigpO1xuICBjb25zdCBjb21wdXRlciA9IFBsYXllcigpO1xuXG4gIHBsYWNlU2hpcHMocGxheWVyLCBjb21wdXRlcik7XG59O1xuXG5jb25zdCBjaGVja0VuZCA9IGZ1bmN0aW9uKHBsYXllciwgY29tcHV0ZXIpIHtcbiAgaWYgKHBsYXllci5wbGF5ZXJHYW1lYm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICBjb25zb2xlLmxvZygnQ29tcHV0ZXIgd2lucyEnKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoY29tcHV0ZXIucGxheWVyR2FtZWJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgY29uc29sZS5sb2coJ1BsYXllciB3aW5zIScpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTtcbmV4cG9ydCB7IGNoZWNrRW5kIH07IiwiaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUnO1xuXG5nYW1lKCk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYGJvZHkge1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA4cHg7XG59XG5cbiNvcmllbnRhdGlvbi1jb250YWluZXIge1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG59XG5cbiNnYW1lYm9hcmQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxNnB4O1xufVxuXG4jcGxheWVyLTEge1xuICB3aWR0aDogOTAlO1xuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XG59XG5cbiNwbGF5ZXItMiB7XG4gIHdpZHRoOiA5MCU7XG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMWZyKSAvIHJlcGVhdCgxMCwgMWZyKTtcbn1cblxuLmdyaWQge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbn1cblxuLm9jY3VwaWVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG59XG5cbi5hdHRhY2tlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsUUFBUTtBQUNWOztBQUVBO0VBQ0Usa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTtFQUNFLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGdEQUFnRDtBQUNsRDs7QUFFQTtFQUNFLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGdEQUFnRDtBQUNsRDs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJib2R5IHtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiA4cHg7XFxufVxcblxcbiNvcmllbnRhdGlvbi1jb250YWluZXIge1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbn1cXG5cXG4jZ2FtZWJvYXJkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxNnB4O1xcbn1cXG5cXG4jcGxheWVyLTEge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4jcGxheWVyLTIge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4uZ3JpZCB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLm9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uYXR0YWNrZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbInJlbmRlckdhbWVib2FyZCIsIlNoaXAiLCJsZW5ndGgiLCJoaXRDb3VudCIsInN1bmsiLCJoaXQiLCJpc1N1bmsiLCJHYW1lYm9hcmQiLCJzaGlwQ29vcmRpbmF0ZXMiLCJtaXNzZWRBdHRhY2tzIiwiaXNPY2N1cGllZCIsImNvb3JkaW5hdGVzIiwiaSIsImoiLCJzaGlwIiwiaXNPdXRzaWRlR2FtZWJvYXJkIiwicGxhY2VTaGlwIiwic3RhcnRDb29yZCIsIm9yaWVudGF0aW9uIiwibmV3U2hpcCIsImNsYXNoaW5nU2hpcHMiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImlzQWxsU3VuayIsImdldENvb3JkaW5hdGVzIiwiUGxheWVyIiwicGxheWVyR2FtZWJvYXJkIiwiYXR0YWNrQ29vcmRpbmF0ZXMiLCJhdHRhY2siLCJ0YXJnZXRHYW1lYm9hcmQiLCJyYW5kb21BdHRhY2siLCJub0R1cGxpY2F0ZXMiLCJyb3ciLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjb2x1bW4iLCJyYW5kb21QbGFjZVNoaXBzIiwic2hpcExlbmd0aHMiLCJvcmllbnRhdGlvbnMiLCJzdWNjZXNzZnVsUGxhY2VtZW50IiwiY2hlY2tFbmQiLCJwbGF5ZXIiLCJoaWRkZW4iLCJncmlkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJhZGQiLCJtYWtlR2FtZWJvYXJkQXR0YWNrYWJsZSIsImNvbXB1dGVyIiwiY29tcHV0ZXJHYW1lYm9hcmQiLCJhdHRhY2tFdmVudCIsImV2ZW50IiwidGFyZ2V0IiwiaWQiLCJOdW1iZXIiLCJnZXRBdHRyaWJ1dGUiLCJjb21wdXRlclJvdyIsImNvbXB1dGVyQ29sdW1uIiwicGxheWVyR3JpZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwidG9nZ2xlT3JpZW50YXRpb25CdXR0b24iLCJvcmllbnRhdGlvbkJ1dHRvbiIsInRleHRDb250ZW50IiwicGxhY2VTaGlwcyIsInBsYXllckdyaWRzIiwicXVlcnlTZWxlY3RvckFsbCIsInRvTG93ZXJDYXNlIiwiQXJyYXkiLCJmcm9tIiwiZm9yRWFjaCIsImdhbWUiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==