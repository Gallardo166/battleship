import { renderGameboard } from "./dom";

const Ship = function(length) {
  let hitCount = 0;
  let sunk = false;

  const hit = function() {
    hitCount += 1;
  };

  const isSunk = function() {
    if (length === hitCount) {
      sunk = true;
    }
    return sunk;
  };

  return { hit, isSunk };
}

const Gameboard = function() {
  let shipCoordinates = [];
  let missedAttacks = [];

  const isOccupied = function(coordinates) {
    for (let i=0; i<shipCoordinates.length; i++) {
      for (let j=0; j<shipCoordinates[i].coordinates.length; j++) {
        if (shipCoordinates[i].coordinates[j][0] === coordinates[0] && shipCoordinates[i].coordinates[j][1] === coordinates[1]) {
          return shipCoordinates[i].ship;
        }
      }
    }
    return false;
  };

  const isOutsideGameboard = function(coordinates) {
    if (coordinates[0] < 0 || coordinates[0] > 9 || coordinates[1] < 0 || coordinates[1] > 9) {
      return true;
    }
    return false;
  };

  const placeShip = function(length, startCoord, orientation) {
    const newShip = Ship(length);
    let coordinates = [startCoord];
    let clashingShips = false;
  
    if (orientation === 'horizontal') {
      for (let i=0; (i<length && clashingShips === false); i++) {
        if (isOccupied([startCoord[0], startCoord[1] + i])) return false;
        if (isOutsideGameboard([startCoord[0], startCoord[1] + i])) return false;
      }
      for (let i=1; i<length; i++) {
        coordinates.push([startCoord[0], startCoord[1] + i]);
      }
    } else {
      for (let i=0; (i<length && clashingShips === false); i++) {
        if (isOccupied([startCoord[0] + i, startCoord[1]])) return false;
        if (isOutsideGameboard([startCoord[0] + i, startCoord[1]])) return false;
      }
      for (let i=1; i<length; i++) {
        coordinates.push([startCoord[0] + i, startCoord[1]]);
      }
    }

    shipCoordinates.push({ ship: newShip, coordinates });
    return true;
  };

  const receiveAttack = function(coordinates) {
    const ship = isOccupied(coordinates);
    if (ship !== false) {
      ship.hit();
      return;
    }
    missedAttacks.push(coordinates);
  };

  const isAllSunk = function() {
    for (let i = 0; i<shipCoordinates.length; i++) {
      if (shipCoordinates[i].ship.isSunk() === false) return false;
    }
    return true;
  };

  const getCoordinates = function() {
    let coordinates = [];
    for (let i=0; i<shipCoordinates.length; i++) {
      for (let j=0; j<shipCoordinates[i].coordinates.length; j++) {
        coordinates.push(shipCoordinates[i].coordinates[j]);
      }
    }
    return coordinates;
  }

  return { shipCoordinates, placeShip, receiveAttack, isAllSunk, getCoordinates };
};

const Player = function() {
  const playerGameboard = Gameboard();
  let attackCoordinates = [];

  const attack = function(targetGameboard, coordinates) {
    for (let i=0; i<attackCoordinates.length; i++) {
      if (attackCoordinates[i][0] === coordinates[0] && attackCoordinates[i][1] === coordinates[1]) return;
    }
    targetGameboard.receiveAttack(coordinates);
    attackCoordinates.push(coordinates);
  };

  const randomAttack = function(targetGameboard) {
    while (true) {
      let noDuplicates = true;
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);

      for (let i=0; i<attackCoordinates.length; i++) {
        if (attackCoordinates[i][0] === row && attackCoordinates[i][1] === column) {noDuplicates = false};
      }
      if (!noDuplicates) { continue }
      targetGameboard.receiveAttack([row, column]);
      attackCoordinates.push([row, column]);
      return [row, column];
    }
  };

  const randomPlaceShips = function() {
    const shipLengths = [5, 4, 3, 3, 2];
    const orientations = ['horizontal', 'vertical'];
    let i = 0;

    while (playerGameboard.shipCoordinates.length < 5) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const orientation = orientations[Math.floor(Math.random() * 2)];
      const successfulPlacement = playerGameboard.placeShip(shipLengths[i], [row, column], orientation);
      if (successfulPlacement) { i += 1 }
    }
    renderGameboard('player-2', playerGameboard.getCoordinates(), true);
  };

  return { playerGameboard, attack, randomAttack, randomPlaceShips };
}

export { Ship, Gameboard, Player };