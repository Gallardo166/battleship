import game from "./game";
import { checkEnd } from "./game";

const renderGameboard = function(player, coordinates, hidden) {
  for (let i=0; i<coordinates.length; i++) {
    const grid = document.querySelector(`[data-player='${player}'][data-row='${coordinates[i][0]}'][data-column='${coordinates[i][1]}']`);
    if (!grid.classList.contains('occupied') && !hidden) {grid.classList.add('occupied')};
  }
}

const makeGameboardAttackable = function(player, computer) {
  const computerGameboard = document.querySelector('#player-2');
  const message = document.querySelector('#message');

  const attackEvent = async function(event) {
    if (event.target.classList.contains('attacked') || (event.target.id === 'player-2')) {
      return;
    }
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    player.attack(computer.playerGameboard, [row, column]);
    event.target.classList.add('attacked');
    computerGameboard.removeEventListener('click', attackEvent);
    message.textContent = 'Computer is attacking...';
    await new Promise(resolve => setTimeout(resolve, 600));
    const [computerRow, computerColumn] = computer.randomAttack(player.playerGameboard);
    const playerGrid = document.querySelector(`[data-player='player-1'][data-row='${computerRow}'][data-column='${computerColumn}']`);
    playerGrid.classList.add('attacked');
    computerGameboard.addEventListener('click', attackEvent);
    message.textContent = 'Your turn to attack';

    if (checkEnd(player, computer) !== false) {
      computerGameboard.removeEventListener('click', attackEvent);
      return;
    }
  }

  computerGameboard.addEventListener('click', attackEvent);

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

const placeShips = function(player, computer) {
  toggleOrientationButton();
  
  const message = document.querySelector('#message');
  const playerGrids = document.querySelectorAll('[data-player="player-1"]');
  const ships = [[5, 'Carrier'], [4, 'Battleship'], [3, 'Destroyer'], [3, 'Submarine'], [2, 'Patrol Boat']];
  let i = 0;

  const placeShip = async function(event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const successfulPlacement = player.playerGameboard.placeShip(ships[i][0], [row, column], orientation);

    if (!successfulPlacement) return;
    renderGameboard('player-1', player.playerGameboard.getCoordinates());
    i += 1;

    if (i < 5) {
      message.textContent = `Place your ${ships[i][1]}`;
      return;
    }

    message.textContent = 'Computer placing ships...';
    Array.from(playerGrids).forEach((grid) => grid.removeEventListener('click', placeShip));
    await new Promise(resolve => setTimeout(resolve, 1000));
    computer.randomPlaceShips();
    message.textContent = 'Your turn to attack';
    makeGameboardAttackable(player, computer);
  }

  message.textContent = `Place your ${ships[i][1]}`;
  Array.from(playerGrids).forEach((grid) => grid.addEventListener('click', placeShip));

};

const displayResults = function(winner) {
  const message = document.querySelector('#message');
  const restartButton = document.querySelector('#restart');
  message.textContent = `${winner} wins! Play again?`;
  restartButton.classList.remove('hidden');
  restartGame();
};

const restartGame = function() {
  const restartButton = document.querySelector('#restart');
  const grids = document.querySelectorAll('.grid');

  restartButton.addEventListener('click', (event) => {
    Array.from(grids).forEach((grid) => {
      grid.classList.remove('occupied');
      grid.classList.remove('attacked');
      grid.classList.remove('hidden');
    });
    restartButton.classList.add('hidden');
    game();
  })
}

export { renderGameboard, makeGameboardAttackable, placeShips, displayResults };