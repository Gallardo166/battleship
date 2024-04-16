const renderGameboard = function(player, hidden) {
  for (let i=0; i<player.playerGameboard.shipCoordinates.length; i++) {
    for (let j=0; j<player.playerGameboard.shipCoordinates[i].coordinates.length; j++) {
      const grid = document.querySelector(`[data-player='${player.playerName}'][data-row='${player.playerGameboard.shipCoordinates[i].coordinates[j][0]}'][data-column='${player.playerGameboard.shipCoordinates[i].coordinates[j][1]}']`);
      if (!grid.classList.contains('occupied')) {grid.classList.add('occupied')};
      if (hidden) {grid.classList.add('hidden')};
    }
  }
  for (let i=0; i<player.playerGameboard.receivedAttacks.length; i++) {
    const grid = document.querySelector(`[data-player='${player.playerName}'][data-row='${player.playerGameboard.receivedAttacks[i][0]}'][data-column='${player.playerGameboard.receivedAttacks[i][1]}']`);
    grid.classList.add('hit');
  }
};

const print = async function(message, afterDelay) {
  const grids = document.querySelectorAll('.grid');
  const messageContainer = document.querySelector('#message');
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

export { renderGameboard, print, toggleOrientationButton, restartGameboards };