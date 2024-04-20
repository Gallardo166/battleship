const arrayIncludesArray = function(parentArray, childArray, getIndex = false, currentIndex = 0) {
  if (parentArray.length === 0) { return false }
  if (parentArray[0].length !== childArray.length) {
    parentArray = parentArray.slice(1);
    return arrayIncludesArray(parentArray, childArray, getIndex, currentIndex + 1);
  }
  for (let i=0; i<childArray.length; i++) {
    if (childArray[i] !== parentArray[0][i]) { 
      parentArray = parentArray.slice(1);
      return arrayIncludesArray(parentArray, childArray, getIndex, currentIndex + 1)
    }
  }
  if (getIndex) { return currentIndex }
  return true;
};

export { arrayIncludesArray };