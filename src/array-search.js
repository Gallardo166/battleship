const arrayIncludesArray = function(parentArray, childArray) {
  if (parentArray.length === 0) { return false }
  if (parentArray[0].length !== childArray.length) {
    parentArray = parentArray.slice(1);
    return arrayIncludesArray(parentArray, childArray);
  }
  for (let i=0; i<childArray.length; i++) {
    if (childArray[i] !== parentArray[0][i]) { 
      parentArray = parentArray.slice(1);
      return arrayIncludesArray(parentArray, childArray)
    }
  }

  return true;
};

export { arrayIncludesArray };