import { arrayIncludesArray } from "./array-search";

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
  let receivedAttacks = [];

  const isOccupied = function(coordinates) {
    for (let i=0; i<shipCoordinates.length; i++) {
      if (arrayIncludesArray(shipCoordinates[i].coordinates, coordinates)) {
        return shipCoordinates[i].ship;
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
    }
    receivedAttacks.push(coordinates);
  };

  const isAllSunk = function() {
    for (let i = 0; i<shipCoordinates.length; i++) {
      if (shipCoordinates[i].ship.isSunk() === false) return false;
    }
    return true;
  };

  return { shipCoordinates, receivedAttacks, placeShip, receiveAttack, isAllSunk, isOccupied, isOutsideGameboard };
};

const Player = function(name) {
  const playerName = name;
  const playerGameboard = Gameboard();

  const attack = function(target, coordinates) {
    target.playerGameboard.receiveAttack(coordinates);
  };

  return { playerName, playerGameboard, attack };
};

const Computer = function() {
  const playerName = 'Player 2';
  const playerGameboard = Gameboard();
  const attackCoordinates = [];
  let successfulAttack;
  let successfulAttackVerticalAdjacent = [];
  let successfulAttackHorizontalAdjacent = [];
  let adjacentMode = false;
  let orientation;

  const randomAttack = function(target) {
    while (true) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);

      if (arrayIncludesArray(attackCoordinates, [row, column])) { continue }
      target.playerGameboard.receiveAttack([row, column]);
      attackCoordinates.push([row, column]);
      return [row, column];
    }
  };

  const adjacentAttack = function(target) {

    const adjacentMoves = function(coordinates) {
      const verticalMoves = [[1, 0], [-1, 0]];
      const horizontalMoves = [[0, 1], [0, -1]];
      let verticalCoordinates = [];
      let horizontalCoordinates = [];

      for (let i=0; i<verticalMoves.length; i++) {
        const adjacentCoordinate = [coordinates[0] + verticalMoves[i][0], coordinates[1] + verticalMoves[i][1]];
        if (!playerGameboard.isOutsideGameboard(adjacentCoordinate) && !arrayIncludesArray(attackCoordinates, adjacentCoordinate)) {
          verticalCoordinates.push([adjacentCoordinate, 'vertical']);
        }
      }

      for (let i=0; i<horizontalMoves.length; i++) {
        const adjacentCoordinate = [coordinates[0] + horizontalMoves[i][0], coordinates[1] + horizontalMoves[i][1]];
        if (!playerGameboard.isOutsideGameboard(adjacentCoordinate) && !arrayIncludesArray(attackCoordinates, adjacentCoordinate)) {
          horizontalCoordinates.push([adjacentCoordinate, 'horizontal']);
        }
      }

      return { verticalCoordinates, horizontalCoordinates };
    };

      if (!adjacentMode) {
        const [row, column] = randomAttack(target);

        if (target.playerGameboard.isOccupied([row, column])) {
          if (target.playerGameboard.isAllSunk()) {
            adjacentMode = false;
          } else {
            adjacentMode = true;
            successfulAttack = [row, column];
            adjacentMoves(successfulAttack).verticalCoordinates.forEach((move) => successfulAttackVerticalAdjacent.push(move));
            adjacentMoves(successfulAttack).horizontalCoordinates.forEach((move) => successfulAttackHorizontalAdjacent.push(move));
          }
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

        target.playerGameboard.receiveAttack([row, column]);
        attackCoordinates.push([row, column]);
        
        if (target.playerGameboard.isOccupied([row, column])) {
          if (target.playerGameboard.isOccupied([row, column]).isSunk()) {
            successfulAttackVerticalAdjacent = [];
            successfulAttackHorizontalAdjacent = [];
            adjacentMode = false;
          } else {
            if (orientation === 'horizontal') {
              successfulAttack = [row, column];
              adjacentMoves(successfulAttack).horizontalCoordinates.forEach((move) => successfulAttackHorizontalAdjacent.push(move));
            } else {
              successfulAttack = [row, column];
              adjacentMoves(successfulAttack).verticalCoordinates.forEach((move) => successfulAttackVerticalAdjacent.push(move));
            }
          }
        }
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
  };

  return { playerName, playerGameboard, randomAttack, adjacentAttack, randomPlaceShips };
}

export { Ship, Gameboard, Player, Computer };