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
    }
    receivedAttacks.push(coordinates);
  };

  const isAllSunk = function() {
    for (let i = 0; i<shipCoordinates.length; i++) {
      if (shipCoordinates[i].ship.isSunk() === false) return false;
    }
    return true;
  };

  return { shipCoordinates, receivedAttacks, placeShip, receiveAttack, isAllSunk };
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
  const playerName = 'player-2';
  const playerGameboard = Gameboard();
  const attackCoordinates = [];

  const randomAttack = function(target) {
    while (true) {
      let noDuplicates = true;
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);

      for (let i=0; i<attackCoordinates.length; i++) {
        if (attackCoordinates[i][0] === row && attackCoordinates[i][1] === column) {noDuplicates = false};
      }
      if (!noDuplicates) { continue }
      target.playerGameboard.receiveAttack([row, column]);
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
  };

  return { playerName, playerGameboard, randomAttack, randomPlaceShips };
}

export { Ship, Gameboard, Player, Computer };