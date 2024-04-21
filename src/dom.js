const hideOptions = function() {
  const options = document.querySelector('#game-options');

  options.classList.add('hidden');
};

const showOptions = function() {
  const options = document.querySelector('#game-options');

  options.classList.remove('hidden');
};

const hideGame = function() {
  const game = document.querySelector('#game');

  game.classList.add('hidden');
};

const showGame = function() {
  const game = document.querySelector('#game');

  game.classList.remove('hidden');
};

const hideDifficulties = function() {
  const difficulty = document.querySelector('#difficulty');

  difficulty.classList.add('hidden');
};

const showDifficulties = function() {
  const difficulty = document.querySelector('#difficulty');

  difficulty.classList.remove('hidden');
};

const showNames = function(playerOne, playerTwo) {
  const playerOneTitle = document.querySelector('[class*="title"][data-player="Player 1"]');
  const playerTwoTitle = document.querySelector('[class*="title"][data-player="Player 2"]');

  playerOneTitle.textContent = playerOne;
  playerTwoTitle.textContent = playerTwo;
};

const loadPassingScreen = function(nextFunction) {
  const game = document.querySelector('#game');
  const passingScreen = document.querySelector('#passing-screen');
  const nextButton = document.createElement('button');

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

const stopPassingScreen = function() {
  const game = document.querySelector('#game');
  const passingScreen = document.querySelector('#passing-screen');

  game.classList.remove('hidden');
  passingScreen.classList.add('hidden');
}

const renderGameboard = function(player, hidden) {
  for (let i=0; i<player.playerGameboard.shipCoordinates.length; i++) {
    for (let j=0; j<player.playerGameboard.shipCoordinates[i].coordinates.length; j++) {
      const grid = document.querySelector(`[data-player='${player.playerName}'][data-row='${player.playerGameboard.shipCoordinates[i].coordinates[j][0]}'][data-column='${player.playerGameboard.shipCoordinates[i].coordinates[j][1]}']`);
      if (!grid.classList.contains('occupied')) {grid.classList.add('occupied')};
      if (hidden) {
        grid.classList.add('hidden')
      } else { grid.classList.remove('hidden') }
    }
  }
  for (let i=0; i<player.playerGameboard.receivedAttacks.length; i++) {
    const grid = document.querySelector(`[data-player='${player.playerName}'][data-row='${player.playerGameboard.receivedAttacks[i][0]}'][data-column='${player.playerGameboard.receivedAttacks[i][1]}']`);
    grid.classList.add('hit');
  }
};

const showPlaceShip = function(player, length) {
  const playerGrids = document.querySelectorAll(`[data-player='${player.playerName}'][class*='grid']`);
  let shownGrids = [];

  const addClass = function(event) {
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const grids = [];
    const [row, column] = [Number(event.target.getAttribute('data-row')), Number(event.target.getAttribute('data-column'))];

    Array.from(playerGrids).forEach((grid) => grid.classList.remove('hover-place', 'outside-grid'));
    shownGrids = [];

    if (orientation === 'horizontal') {
      for (let i=0; i<length; i++) {
        const grid = document.querySelector(`[data-row='${row}'][data-column='${column + i}'][data-player='${player.playerName}']`);
        grids.push(grid);
        if (!player.playerGameboard.isOccupied([row, column + i]) && !player.playerGameboard.isOutsideGameboard([row, column + i])) {
          shownGrids.push([row, column]);
        }
      }
    } else {
      for (let i=0; i<length; i++) {
        const grid = document.querySelector(`[data-row='${row + i}'][data-column='${column}'][data-player='${player.playerName}']`);
        grids.push(grid);
        if (!player.playerGameboard.isOccupied([row + i, column]) && !player.playerGameboard.isOutsideGameboard([row + i, column])) {
          shownGrids.push([row, column]);
        }
      }
    }

    for (let i=0; i<grids.length; i++) {
      if (grids[i] === null) {
        grids.forEach((grid) => {
          if (grid !== null) {grid.classList.add('outside-grid')}
        });
        return;
      }
    }
    grids.forEach((grid) => grid.classList.add('hover-place'));

    event.stopPropagation();
  };

  const removeEvent = function(event) {
    if (shownGrids.length < length) { return }
    Array.from(playerGrids).forEach((grid) => {
      grid.removeEventListener('mouseover', addClass);
      grid.classList.remove('hover-place', 'outside-grid');
      grid.removeEventListener('click', removeEvent);
    })

    event.stopPropagation();
  };

  Array.from(playerGrids).forEach((grid) => {
    grid.addEventListener('mouseover', addClass);
    grid.addEventListener('click', removeEvent);
  })
};

const showAttack = function(target) {
  const targetGrids = document.querySelectorAll(`[data-player='${target.playerName}'][class*='grid']`);

  const addClass = function(event) {
    Array.from(targetGrids).forEach((grid) => grid.classList.remove('hover-attack'));
    event.target.classList.add('hover-attack');

    event.stopPropagation();
  };

  const removeEvent = function(event) {
    if (event.target.classList.contains('hit')) { return }
    Array.from(targetGrids).forEach((grid) => {
      grid.removeEventListener('mouseover', addClass);
      grid.classList.remove('hover-attack');
      grid.removeEventListener('mousedown', removeEvent);
    })

    event.stopPropagation();
  };

  Array.from(targetGrids).forEach((grid) => {
    grid.addEventListener('mouseover', addClass);
    grid.addEventListener('mousedown', removeEvent);
  })
};

const print = async function(message, afterDelay) {
  const grids = document.querySelectorAll('.grid');
  const messageContainer = document.querySelector('#text');
  const messageCharacters = message.split('');

  Array.from(grids).forEach((grid) => {grid.classList.add('unclickable')});
  messageContainer.textContent = '';

  for (let i=0; i<messageCharacters.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    messageContainer.textContent += messageCharacters[i];
  }
  await new Promise((resolve) => setTimeout(resolve, afterDelay));
  Array.from(grids).forEach((grid) => {grid.classList.remove('unclickable')});
};

const toggleOrientationButton = function() {
  const orientationButton = document.querySelector('#orientation');
  orientationButton.addEventListener('click', (event) => {
    if (event.target.textContent === 'Horizontal') {
      event.target.textContent = 'Vertical';
    } else {
      event.target.textContent = 'Horizontal';
    }
  });
};

const restartGameboards = function() {
  const grids = document.querySelectorAll('.grid');

  Array.from(grids).forEach((grid) => {
    grid.classList.remove('occupied');
    grid.classList.remove('hit');
    grid.classList.remove('hidden');
  });
 };

export { hideOptions, showOptions, hideGame, showGame, hideDifficulties, showDifficulties, showNames, loadPassingScreen, stopPassingScreen, renderGameboard, showPlaceShip, showAttack, print, toggleOrientationButton, restartGameboards };