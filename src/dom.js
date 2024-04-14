import { checkEnd } from "./game";

const renderGameboard = function(player, coordinates, hidden) {
  for (let i=0; i<coordinates.length; i++) {
    const grid = document.querySelector(`[data-player='${player}'][data-row='${coordinates[i][0]}'][data-column='${coordinates[i][1]}']`);
    if (!grid.classList.contains('occupied') && !hidden) {grid.classList.add('occupied')};
  }
}

const makeGameboardAttackable = function(player, computer) {
  const computerGameboard = document.querySelector('#player-2');

  const attackEvent = function(event) {
    if (event.target.classList.contains('attacked') || (event.target.id === 'player-2')) {
      return;
    }
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    player.attack(computer.playerGameboard, [row, column]);
    event.target.classList.add('attacked');

    const [computerRow, computerColumn] = computer.randomAttack(player.playerGameboard);
    const playerGrid = document.querySelector(`[data-player='player-1'][data-row='${computerRow}'][data-column='${computerColumn}']`);
    playerGrid.classList.add('attacked');

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

  const playerGrids = document.querySelectorAll('[data-player="player-1"]');
  const shipLengths = [5, 4, 3, 3, 2];
  let i = 0;

  const placeShip = function(event) {
    const row = Number(event.target.getAttribute('data-row'));
    const column = Number(event.target.getAttribute('data-column'));
    const orientation = document.querySelector('#orientation').textContent.toLowerCase();
    const successfulPlacement = player.playerGameboard.placeShip(shipLengths[i], [row, column], orientation);

    if (!successfulPlacement) return;
    renderGameboard('player-1', player.playerGameboard.getCoordinates());
    i += 1;

    if (i === 5) {
      Array.from(playerGrids).forEach((grid) => grid.removeEventListener('click', placeShip));
      computer.randomPlaceShips();
      makeGameboardAttackable(player, computer);
    }
  }

  Array.from(playerGrids).forEach((grid) => grid.addEventListener('click', placeShip));

};

export { renderGameboard, makeGameboardAttackable, placeShips };