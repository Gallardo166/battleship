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

  const placeShip = function(length, startCoord, orientation) {
    const newShip = Ship(length);
    let coordinates = [startCoord];
  
    if (orientation === 'horizontal') {
      for (let i=1; i<length; i++) {
        coordinates.push([startCoord[0], startCoord[1] + i]);
      }
    } else {
      for (let i=1; i<length; i++) {
        coordinates.push([startCoord[0] + i, startCoord[1]]);
      }
    }

    shipCoordinates.push({ship: newShip, coordinates })
  };

  const receiveAttack = function(attackCoordinates) {
    for (let i=0; i<shipCoordinates.length; i++) {
      for (let j=0; j<shipCoordinates[i].coordinates.length; j++) {
        if (shipCoordinates[i].coordinates[j][0] === attackCoordinates[0] && shipCoordinates[i].coordinates[j][1] === attackCoordinates[1]) {
          shipCoordinates[i].ship.hit();
          return
        }
      }
    }
    missedAttacks.push(attackCoordinates);
  }

  const isAllSunk = function() {
    for (let i = 0; i<shipCoordinates.length; i++) {
      if (shipCoordinates[i].ship.isSunk() === false) return false;
    }
    return true;
  }

  return { shipCoordinates, placeShip, receiveAttack, isAllSunk }
}

export { Ship, Gameboard };