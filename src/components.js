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

export { Ship };